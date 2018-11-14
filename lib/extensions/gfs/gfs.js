/** Global File System for ThingsJS
 *    - Technically this is just a wrapper object providing an API for talking to the GFS service provider.
 *    - GFS provider is assumed to be an external service accessible over the network.
 *    - Default GFS provider is ThingsJS distributed file system.
 *    - To set an alternative GFS provider (e.g. Hadoop, Google FS, Amazon S3),
 *      the developer must provide the read and write functions and the appropriate credentials.
 */


var mongoose = require('mongoose');
var FSObject = require('./FSObject.js');

var DEBUG = (process.env.DEBUG === 'true') || true;

/*
 TODO:
   - handle the worker execution environment such as "current working directory"
	 -implement GridFS on top of this, to enable sharding
	 -implement more prototypes tor copying, moving and truncating for the file.


 NOTES:
   - Promise API commented out as Node v8.11.* does not support it
 */

/** The API provided by this object mirrors the native 'fs' API
 *   so that it is trivial for a user to switch to using GFS instead.
 *   e.g.
 *       var fs = require('fs');							// this line is replaced by the line below
 *       var fs = require('things-js').gfs(globalScope);	// globalScope needs to be passed in to link the Pubsub instance
 * @constructor
 */
function GFS(mongoUrl){
	var self = this;
	this.mongoUrl = mongoUrl ||  'mongodb://localhost/things-js-fs';
	this.db = null;

	mongoose.connect(this.mongoUrl, { useNewUrlParser: true });

	mongoose.connection.on('connected', function(){
		(DEBUG && console.log('Connected to mongodb at: ' + self.mongoUrl));
		self.db = mongoose.connection;
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

	return FSObject.getNode(path)
		.then(function(node){
			// console.log(data);
			if (node.type === 'file'){
				var buf = Buffer.from(node.content || '');
				callback(null, buf);
				return buf;
			}
			else if (node.type === 'directory'){
				var error = new Error("Not A File");
				callback(error);
				// return Promise.reject(error)
			}
			else {
				var error = new Error("UnknownFSObjectError");
				callback(error);
				// return Promise.reject(error)
			}
		}, function(err){
			// console.log(err);
			callback(err);
			// return Promise.reject(err);
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

		return FSObject.getNode(path)
			.then(function(node){
				if(node.type == 'file'){
					var content = data;
					return FSObject.findOneAndUpdate({ _id: node._id }, {
						content : content
					}).exec(function(err, file){
						if (err){
							callback(err);
						}
						else{
							callback(null);
						}
					});
				}
				else if (node.type === 'directory'){
					var error = new Error("Not A File");
					callback(error);
					// return Promise.reject(error)
				}
				else {
					var error = new Error("UnknownFSObjectError");
					callback(error);
					// return Promise.reject(error)
				}
			}, function(err){
				// console.log(err);
				if (err.code === 'ENOENT'){
					(DEBUG && console.log('[DEBUG] File Not Found, creating one at ', err.context.tokens.join('/')) );
					var file = new FSObject({
						parent: null,	// TODO: handle other paths/cases
						type: 'file',
						name: err.context.filename,
						content: data	// assuming data is a string for now - TODO: handle Buffer type
					});
					return file.save()
						.then(function(result){
							callback(null);
							// return Promise.resolve();
						}, function(error){
							callback(error);
							// return Promise.reject(error);
						})
				}
				else if (err === 'Not Found'){
					var parentPath = path.split('/');
					var filename = parentPath.pop();
					return FSObject.getNode(parentPath.join('/'))
						.then(function(node){
							if(node.type === 'directory'){
								var file = new FSObject({
									parent: node._id,
									type: 'file',
									name: filename,
									content: data
								});
								return file.save()
									.then(function(result){
										callback(null);
									}, function(error){
										callback(error);
									})
							}
							else{
								var error = new Error("NotADirectoryError");
								callback(error);
							}
						}, function(err){
							callback(err);
						});
				}
				else {
					callback(err);
					// return Promise.reject(err);
				}
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

	return FSObject.getNode(path)
		.then(function(node){
			// console.log(node);
			if (node.type === 'file'){
				var content = node.content + data;	// assuming data is a string for now - TODO: handle Buffer type
				return FSObject.findOneAndUpdate({ _id: node._id }, {
					content: content
				}).exec(function(err, file){
					if (err){
						callback(err);
						// return Promise.reject(err);
					}
					else {
						callback(null);
						// return Promise.resolve();
					}
				});
			}
			else if (node.type === 'directory'){
				var error = new Error("Not A File");
				callback(error);
				// return Promise.reject(error)
			}
			else {
				var error = new Error("UnknownFSObjectError");
				callback(error);
				// return Promise.reject(error)
			}
		}, function(err){
			// console.log(err);
			if (err.code === 'ENOENT'){
				(DEBUG && console.log('[DEBUG] File Not Found, creating one at ', err.context.tokens.join('/')) );
				console.log(err.context);
				var file = new FSObject({
					parent: null,	// TODO: handle other paths/cases
					type: 'file',
					name: err.context.filename,
					content: data	// assuming data is a string for now - TODO: handle Buffer type
				});
				return file.save()
					.then(function(result){
						callback(null);
						// return Promise.resolve();
					}, function(error){
						callback(error);
						// return Promise.reject(error);
					})
			}
			else {
				callback(err);
				// return Promise.reject(err);
			}
		})

}

GFS.prototype.unlink = function(path, callback){
	if (!(typeof path === 'string' || path instanceof Buffer)){
		throw new TypeError("path must be a string or Buffer");
	}
	if (typeof callback !== 'function'){
		console.log('[DEP0013] DeprecationWarning');	// Deprecation warning
	}
	return FSObject.getNode(path)
		.then(function(node){
			console.log(node);
			if (node.type === 'file'){
				return FSObject.findOneAndDelete({ _id: node._id})
				.exec(function(err, file){
					if (err){
						callback(err);
						// return Promise.reject(err);
					}
					else {
						callback(null);
						// return Promise.resolve();
					}
				});
			}
			else if (node.type === 'directory'){
				var error = new Error("Not A File");
				callback(error);
				// return Promise.reject(error)
			}
			else {
				var error = new Error("UnknownFSObjectError");
				callback(error);
				// return Promise.reject(error)
			}
		}, function(err){
			// console.log(err);
			callback(err);
		})
}

/* To be implemented: */
GFS.prototype.exists = function(path, callback){ }
GFS.prototype.copyFile = function(src, arg1, arg2, arg3){ }
GFS.prototype.createReadStream = function(path, options){ }
GFS.prototype.createWriteStream = function(path, options){ }
GFS.prototype.mkdir = function(path, arg1, arg2){ }
GFS.prototype.readdir = function(path, arg1, arg2){ }
GFS.prototype.rmdir = function(path, callback){ }
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

module.exports = GFS.bootstrap;