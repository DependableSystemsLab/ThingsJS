var fs = require('fs');
var path = require('path');
var uuidv4 = require('uuid/v4');
var express = require('express');
var mongoose = require('mongoose');
mongoose.Promise = global.Promise;

var helpers = require('../helpers.js');

var DEBUG = true;

var FSIndexSchema = new mongoose.Schema({
	uuid: { type: String, index: true, unique: true },
	owner: { type: String, unique: true },
	created : { type: Date, default: Date.now },
	updated : { type: Date, default: Date.now },
	root: { type: mongoose.Schema.Types.Mixed }
}, {
	toObject: {
		transform: function(doc, ret){
			delete ret.__v;
		}
	},
	toJSON: {
		transform: function(doc, ret){
			delete ret.__v;
		}
	}
});

/* guarantee uniqueness */
FSIndexSchema.index({ onwer: 1 }, { unique: true });

// The root field needs to be serialized because of
// issues with keys containing "." (dot) character.
// mongodb prohibits the use of a dot character because of the
// ambiguity arising from the dotted-query syntax.
// 
// https://docs.mongodb.com/manual/core/document/#field-names
FSIndexSchema.post('init', function(doc){
	if (!this.root) this.root = {};
	else this.root = JSON.parse(this.root);
});
FSIndexSchema.pre('validate', function(next){
	this.root = JSON.stringify(this.root);
	next();
});

FSIndexSchema.statics.getDefault = function(){
	var self = this;
	return self.findOne({ uuid: 'default-global-index' })
		.then(function(found){
			if (found) return found;
			else return self.create({
					uuid: 'default-global-index',
					owner: 'none'
				}).then(function(doc){
					// Need to initialize the root property here
					// because Mongoose does not invoke the post init hook upon create,
					// resulting in doc.root being a JSON string, instead of an object. (i.e. "{}" not {})
					doc.root = {};
					return doc;
				})
		})
		.catch(function(err){
			console.log(err);
			return Promise.reject(err);
		})
}

FSIndexSchema.methods.read = function(abs_path, depth){
	depth = (depth === 0) ? depth : (depth || 1);
	var self = this;

	var tokens = abs_path.split('/').slice(1); // For now we assume it starts with a forward-slash
	if (tokens[tokens.length-1] === '') tokens.pop();
	var obj_ref = helpers.getNestedProperty(this.root, tokens);
	if (obj_ref){
		if (typeof obj_ref === 'string'){
			return this.model('FSHandle').findOne({ uuid: obj_ref })
				.then(function(handle){
					if (handle) return handle.read().then(function(data){
							return {
								type: 'file',
								name: handle.name,
								content: data // Currently only supports utf-8 strings...
							}
						});
					else return Promise.reject(new Error("FSHandle reference exists in the FSIndex, but Document '"+obj_ref+"' cannot be found."))
				})
		}
		else if (typeof obj_ref === 'object'){
			if (depth > 0){
				var completed = helpers.defer();
				Promise.all(
					Object.keys(obj_ref)
						.map(function(name){
							return self.read(path.join(abs_path, name), depth - 1)
								.then(function(data){
									return {
										key: name,
										value: data
									}
								})
						})
					)
					.then(function(results){
						var result = {
							type: 'directory',
							name: tokens[tokens.length-1],
							content: helpers.deepCopy(obj_ref)
						}
						results.forEach(function(item){
							result.content[item.key] = item.value;
						})
						completed.resolve(result);
					})
					.catch(function(err){
						console.log(err);
						completed.reject(err);
					})

				return completed.promise;
			}
			else {
				return Promise.resolve({
					type: 'directory',
					name: tokens[tokens.length-1],
					content: helpers.deepCopy(obj_ref)
				})
			}
		}
		else {
			return Promise.reject(new Error("Mongoose returned an unexpected object"));
		}
	}
	else return Promise.reject(new Error("Not Found"))
}

FSIndexSchema.methods.write = function(abs_path, content, mode){
	var self = this;
	var tokens = abs_path.split('/').slice(1); // For now we assume it starts with a forward-slash
	if (tokens[tokens.length-1] === '') tokens.pop();

	var name = tokens[tokens.length-1];
	var parent_tokens = tokens.slice(0, tokens.length-1);
	var parent = helpers.getNestedProperty(this.root, parent_tokens);
	if (parent){
		if (typeof parent === 'object'){
			var preCommit = helpers.defer();
			var commit = helpers.defer();
			
			var existing = parent[name];

			if (typeof existing === 'string'){
				if (mode === 'append'){
					this.model('FSHandle').findOne({ uuid: existing })
						.then(function(handle){
							if (handle) return handle.read()
							else throw new Error("FSHandle reference exists in the FSIndex, but Document '"+existing+"' cannot be found.")
						})
						.then(function(data){
							preCommit.resolve(content + data);
						})
						.catch(function(err){
							console.log(err);
							preCommit.reject(err);
						})
				}
				else preCommit.resolve(content);
			}
			else if (typeof existing === 'object'){
				preCommit.reject(new Error("Cannot overwrite a directory"));
			}
			else preCommit.resolve(content);

			preCommit.promise
				.then(function(write_content){

					var uuid = uuidv4();

					return Promise.all([
							// Commit the FSHandle
							self.model('FSHandle').create({ 
								uuid: uuid,
								name: name,
								storage: 'db',
								content: write_content,
								owner: '',
								sharing: 'public',
								previous: existing
							}),
							// Commit the FSIndex
							(function(resolve, reject){
								// need to do it this way (deepCopy) because of the way mongoose "watches"
								// the model's fields - https://github.com/Automattic/mongoose/issues/1204
								//   related FAQ - https://mongoosejs.com/docs/faq.html
								var copy = helpers.deepCopy(self.root);
								helpers.setNestedProperty(copy, tokens, uuid);
								self.root = copy;
								return self.save()
							})()
						])
				})
				.then(function(results){
					// console.log(results[1]);
					// skipping read to save round trip
					commit.resolve({
						type: 'file',
						name: name,
						content: results[0].content // Currently only supports utf-8 strings...
					})
				})
				.catch(function(err){
					// console.log(err);
					commit.reject(err);
				})

			return commit.promise;
		}
		else if (typeof parent === 'string'){
			return Promise.reject(new Error("Cannot create file inside a file"));
		}
		else {
			return Promise.reject(new Error("Mongoose returned an unexpected object"));
		}
	}
	else return Promise.reject(new Error('Parent directory "'+parent_tokens.join('/')+'" does not exist'));
}

FSIndexSchema.methods.makeDirectory = function(abs_path){
	var self = this;
	var tokens = abs_path.split('/').slice(1); // For now we assume it starts with a forward-slash
	if (tokens[tokens.length-1] === '') tokens.pop();

	var name = tokens[tokens.length-1];
	var parent_tokens = tokens.slice(0, tokens.length-1);
	var parent = helpers.getNestedProperty(this.root, parent_tokens);
	if (parent){
		if (typeof parent === 'object'){
			if (parent[name]){
				return Promise.reject(new Error(abs_path+" exists, cannot create directory."));
			}
			else {
				// need to do it this way (deepCopy) because of the way mongoose "watches"
				// the model's fields - https://github.com/Automattic/mongoose/issues/1204
				//   related FAQ - https://mongoosejs.com/docs/faq.html
				var copy = helpers.deepCopy(self.root);
				helpers.setNestedProperty(copy, tokens, {});
				self.root = copy;
				return self.save().then(function(data){
					return {
						type: 'directory',
						name: name,
						content: {}
					}
				})
			}
		}
		else if (typeof parent === 'string'){
			return Promise.reject(new Error("Cannot create file inside a file"));
		}
		else {
			return Promise.reject(new Error("Mongoose returned an unexpected object"));
		}
	}
	else return Promise.reject(new Error('Parent directory "'+parent_tokens.join('/')+'" does not exist'));
}

FSIndexSchema.methods.removePath = function(abs_path, rmdir){
	// var self = this;
	var tokens = abs_path.split('/').slice(1); // For now we assume it starts with a forward-slash
	if (tokens[tokens.length-1] === '') tokens.pop();

	var obj_ref = helpers.getNestedProperty(this.root, tokens);
	if (obj_ref){
		if (typeof obj_ref === 'string'){
			// need to do it this way (deepCopy) because of the way mongoose "watches"
			// the model's fields - https://github.com/Automattic/mongoose/issues/1204
			//   related FAQ - https://mongoosejs.com/docs/faq.html
			var copy = helpers.deepCopy(this.root);
			helpers.deleteNestedProperty(copy, tokens);
			this.root = copy;
			return this.save()
				.then(function(){
					return {
						type: 'file',
						path: abs_path
					}
				})
		}
		else if (typeof obj_ref === 'object'){
			if (rmdir){
				return Promise.resolve({
					type: 'directory',
					path: abs_path
				})
			}
			else return Promise.reject(new Error("To delete a directory, need to set the second argument to true"));
		}
		else {
			return Promise.reject(new Error("Mongoose returned an unexpected object"));
		}
	}
	else return Promise.reject(new Error("Not Found"))
}

var FSHandleSchema = new mongoose.Schema({
	uuid: { type: String, index: true, unique: true },
	name: { type: String, default: 'New File' },
	owner: { type: String },
	sharing: { type: String },
	storage: { type: String },
	content: { type: String },
	previous: { type: String } // this is used to track the history of the file
}, {
	toObject: {
		transform: function(doc, ret){
			delete ret.__v;
		}
	},
	toJSON: {
		transform: function(doc, ret){
			delete ret.__v;
		}
	}
})

FSHandleSchema.methods.read = function(){
	var self = this;
	if (this.storage === 'db') return Promise.resolve(this.content);
	else if (this.storage === 'fs') return new Promise(function(resolve, reject){
		// when storage option is 'fs',
		// the path will be the cwd (current working directory) of the current process
		fs.readFile(self.content, function(err, data){
			// console.log(err, data);
			if (err) reject(err);
			else resolve(data.toString());	// Currently only supports utf-8 string
		});
	})
	else return Promise.reject(new Error('Storage Error - Unsupported storage type'));
}

/** FSIndex is a Mongoose Model representing a directory tree */
var FSIndex = mongoose.model('FSIndex', FSIndexSchema);

/** FSHandle is a Mongoose Model representing a File */
var FSHandle = mongoose.model('FSHandle', FSHandleSchema);


/** This is a "userland" object, meant to be explicitly `require`d and used by a user.
 *   The API provided by this object mirrors the native 'fs' API
 *   so that it is trivial for a user to switch to using GFS instead.
 *   e.g.
 *       var fs = require('fs');							// this line is replaced by the line below
 *       var fs = require('things-js').gfs(globalScope);	// globalScope needs to be passed in to link the Pubsub instance
 * @constructor
 */
function GFS(mongoUrl){
	var self = this;
	this.mongoUrl = mongoUrl;
	this.db = null;

	mongoose.connect(this.mongoUrl, { 
		useNewUrlParser: true,
		useCreateIndex: true
	});
	this.db = mongoose.connection;

	mongoose.connection.on('connected', function(){
		(DEBUG && console.log('Connected to mongodb at: ' + self.mongoUrl));
	})

	mongoose.connection.on('error', function(err){
		(DEBUG && console.log('Mongoose connection error: ' + err));
	})
}

/** Read from a file asynchronously; it has the same interface as fs.readFile
 * @param {string} path - absolute path to the file (currently relative paths cannot be resolved)
 * @param {Function|Object} arg1 - if given a function, it is used as the callback. if given an object, it is used as the options object
 * @param {Function} arg2 - if arg1 is an object, this is used as the callback.
 */
GFS.prototype.readFile = function readFile(path, arg1, arg2){
	var options, callback;
	if (typeof arg1 === 'function'){
		callback = arg1;
	}
	else if (typeof arg1 === 'object' && typeof arg2 === 'function'){
		options = arg1;
		callback = arg2;
	}
	else {
		throw "readFile(path[,options], callback): You need to provide a callback function";
	}

	FSIndex.getDefault()
		.then(function(index){
			// console.log(index);
			return index.read(path);
		})
		.then(function(instance){
			// console.log(instance);
			if (instance.type === 'file') callback(null, Buffer.from(instance.content));
			else if (instance.type === 'directory') callback(new Error(path+' is a directory'));
			else callback(new Error('Unknown FSHandle type'));
		})
		.catch(function(err){
			// console.log(err);
			callback(err);
		})
}

/** Write to a file asynchronously; it has the same interface as fs.writeFile
 * @param {string} path - absolute path to the file
 * @param {string} data - text to write (currently only supports string)
 * @param {Function|Object} arg1 - if given a function, it is used as the callback. if given an object, it is used as the options object
 * @param {Function} arg2 - if arg1 is an object, this is used as the callback.
 */
GFS.prototype.writeFile = function writeFile(path, data, arg1, arg2){
	var options, callback;
	if (typeof arg1 === 'function'){
		callback = arg1;
	}
	else if (typeof arg1 === 'object' && typeof arg2 === 'function'){
		options = arg1;
		callback = arg2;
	}
	else {
		throw "writeFile(path, data[,options], callback): You need to provide a callback function";
	}

	FSIndex.getDefault()
		.then(function(index){
			// console.log(index);
			return index.write(path, data);
		})
		.then(function(instance){
			// console.log(instance);
			if (instance.type === 'file') callback(null);
			else callback(new Error('FSHandle write result returned incorrect FSHandle type'));
		})
		.catch(function(err){
			console.log(err);
			callback(err);
		})
}

/** Append to a file asynchronously; it has the same interface as fs.appendFile
 * @param {string} path - absolute path to the file
 * @param {string} data - text to write (currently only supports string)
 * @param {Function|Object} arg1 - if given a function, it is used as the callback. if given an object, it is used as the options object
 * @param {Function} arg2 - if arg1 is an object, this is used as the callback.
 */
GFS.prototype.appendFile = function appendFile(path, data, arg1, arg2){
	var options, callback;
	if (typeof arg1 === 'function'){
		callback = arg1;
	}
	else if (typeof arg1 === 'object' && typeof arg2 === 'function'){
		options = arg1;
		callback = arg2;
	}
	else {
		throw "appendFile(path, data[,options], callback): You need to provide a callback function";
	}

	FSIndex.getDefault()
		.then(function(index){
			// console.log(index);
			return index.write(path, data, 'append');
		})
		.then(function(instance){
			// console.log(instance);
			if (instance.type === 'file') callback(null);
			else callback(new Error('FSHandle write result returned incorrect FSHandle type'));
		})
		.catch(function(err){
			callback(err);
		})
}

GFS.prototype.unlink = function(path, callback){
	if (!(typeof path === 'string' || path instanceof Buffer)){
		throw new TypeError("path must be a string or Buffer");
	}
	if (typeof callback !== 'function'){
		console.log('[DEP0013] DeprecationWarning');	// Deprecation warning
	}
	
	FSIndex.getDefault()
		.then(function(index){
			// console.log(index);
			return index.removePath(path);
		})
		.then(function(instance){
			// console.log(instance);
			if (instance.type === 'file') callback(null);
			else callback(new Error('FSHandle write result returned incorrect FSHandle type'));
		})
		.catch(function(err){
			callback(err);
		})
}

GFS.prototype.mkdir = function(path, arg1, arg2){
	var mode, callback;
	if (typeof arg1 === 'function'){
		callback = arg1;
	}
	else if (typeof arg1 === 'object' && typeof arg2 === 'function'){
		mode = arg1;
		callback = arg2;
	}
	else {
		throw "mkdir(path[,mode], callback): You need to provide a callback function";
	}
	FSIndex.getDefault()
		.then(function(index){
			// console.log(index);
			return index.makeDirectory(path);
		})
		.then(function(instance){
			// console.log('Write successful', instance);
			if (instance.type === 'directory') callback(null);
			else callback(new Error('FSIndex makeDirectory result returned incorrect data type'));
		})
		.catch(function(err){
			console.log(err);
			callback(err);
		})
}

GFS.prototype.readdir = function(path, arg1, arg2){ 
	var options, callback;
	if (typeof arg1 === 'function'){
		callback = arg1;
	}
	else if (typeof arg1 === 'object' && typeof arg2 === 'function'){
		options = arg1;
		callback = arg2;
	}
	else {
		throw "readdir(path[,options], callback): You need to provide a callback function";
	}

	FSIndex.getDefault()
		.then(function(index){
			// console.log(index);
			return index.read(path);
		})
		.then(function(instance){
			// console.log(instance);
			if (instance.type === 'directory') callback(null, Object.keys(instance.content));
			else if (instance.type === 'file') callback(new Error(path+' is a file'));
			else callback(new Error('Unknown FSHandle type'));
		})
		.catch(function(err){
			// console.log(err);
			callback(err);
		})
}
GFS.prototype.rmdir = function(path, callback){
	if (!(typeof path === 'string' || path instanceof Buffer)){
		throw new TypeError("path must be a string or Buffer");
	}
	if (typeof callback !== 'function'){
		console.log('[DEP0013] DeprecationWarning');	// Deprecation warning
	}
	
	FSIndex.getDefault()
		.then(function(index){
			// console.log(index);
			return index.removePath(path, true);
		})
		.then(function(instance){
			// console.log(instance);
			if (instance.type === 'directory') callback(null);
			else callback(new Error('FSHandle write result returned incorrect FSHandle type'));
		})
		.catch(function(err){
			callback(err);
		})
}

/* To be implemented: */
GFS.prototype.exists = function(path, callback){ }
GFS.prototype.copyFile = function(src, arg1, arg2, arg3){ }
GFS.prototype.createReadStream = function(path, options){ }
GFS.prototype.createWriteStream = function(path, options){ }
GFS.prototype.rename = function(oldPath, newPath, callback){ }

// TODO: Create read and write stream for faster access of data.
// TODO: Implement GridFS on top of MongoDB for sharding and storing date and other binary formats

/** This is the function that is exported as the gfs module, used to bootstrap the file system.
 *  After a user `require`s this module, it can be used thus:
 *  var fs = require('things-js').gfs('mongodb://localhost/my-database');
 */
GFS.bootstrap = function(mongoUrl){
	return new GFS(mongoUrl);
}

function createRouter(mongooseConnection){
	/** FSIndex is a Mongoose Model representing a directory tree */
	var FSIndex = mongooseConnection.model('FSIndex', FSIndexSchema);

	/** FSHandle is a Mongoose Model representing a File */
	var FSHandle = mongooseConnection.model('FSHandle', FSHandleSchema);

	/** FSRouter can be mounted in an express app, serving the filesystem's RESTful API at the mounted path */
	var FSRouter = express.Router();
	FSRouter.use(express.json());
	FSRouter.use(express.urlencoded({ extended: true }));
	// FSRouter.use(function(req, res, next){
	// 	res.header("Access-Control-Allow-Origin", "*");
	// 	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	// 	next();
	// })

	FSRouter.route(':abs_path(*)')
		.get(function(req, res, next){
			console.log('[GFS] GET '+req.params.abs_path);
			FSIndex.getDefault()
				.then(function(index){
					// console.log(index);
					return index.read(req.params.abs_path);
				})
				.then(function(instance){
					// console.log(instance);
					res.json(instance);
				})
				.catch(function(err){
					console.log(err);
					res.status(500).json(err.message);
				})
		})
		.post(function(req, res, next){
			console.log('[GFS] POST '+req.params.abs_path);
			// console.log(req.body);
			var writePath = path.join(req.params.abs_path, req.body.name);
			FSIndex.getDefault()
				.then(function(index){
					// console.log(index);
					if (req.body.type === 'file'){
						return index.write(writePath, req.body.content);
					}
					else if (req.body.type === 'directory'){
						return index.makeDirectory(writePath);
					}
					else {
						return Promise.reject(new Error("Unrecognized data type"))
					}
				})
				.then(function(instance){
					res.json(instance);
				})
				.catch(function(err){
					console.log(err);
					res.status(500).json(err.message);
				})
		})
		.delete(function(req, res, next){
			console.log('[GFS] DELETE '+req.params.abs_path);
			// var ids = req.query.ids.split(',');
			FSIndex.getDefault()
				.then(function(index){
					// console.log(index);
					return index.removePath(req.params.abs_path, true);
				})
				.then(function(instance){
					res.json(instance);
				})
				.catch(function(err){
					console.log(err);
					res.status(500).json(err.message);
				})
		});

	return FSRouter;
}

/** Return an express app serving the filesystem's RESTful API */
function createServer(port, db_url, onListening){
	mongoose.connect(db_url, {
		useNewUrlParser: true,
		useCreateIndex: true
	});
	var db = mongoose.connection;
	db.on('error', function(){
		console.log('[DB] Connection ERROR');
	});
	db.once('open', function(){
		console.log('[DB] Connection SUCCESS')
	});

	var app = express();
	app.use('/', createRouter(db));
	app.listen(port, function(){
		console.log('GFS RESTful Server bound to port '+port);
		if (onListening) onListening();
	})
	return app;
}

module.exports = {
	devland: {
		createRouter: createRouter,
		createServer: createServer
	},
	bootstrap: GFS.bootstrap
}
