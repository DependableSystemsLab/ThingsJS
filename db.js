var mongo = require('mongodb');
var mongoose = require('mongoose');
var FSObject = require('./FSObject.js');
var Schema = mongoose.Schema;


/* @param host : e.g. mongodb://localhost:27017/<database>
 */
function ThingsDatabase(host){
	this.host = host;
	this.db = undefined;
	this.cache = {};
	this.stale = false;

	this._initialize();
}

/* Initialize the database
 */
ThingsDatabase.prototype._initialize = function(){
	var self = this;
	mongoose.connect(self.host);

	mongoose.connection.on('connected', function(){
		console.log('Connected to mongodb at: ' + self.host);
		self.db = mongoose.connection;
	})

	mongoose.connection.on('error', function(err){
		console.log('Mongoose connection error: ' + err);
	})
}

/* Core function to view the filesystem from the client
 * @param tokens : tokens of the absolute path
 */
ThingsDatabase.prototype.viewFileObject = function(path){
	console.log('<T> db.js -- viewFileObject: ' + path);
	var self = this;

	// parse the path into tokens
	tokens = path.split('/');
	// ignore excess deliminators that leave empty elements
	for(var i = 0; i < tokens.length; i++){
		if(tokens[i] == ''){
			tokens.splice(i, 1);
		}
	}

	if(tokens.join('/') in this.cache && !this.stale){
		return new Promise(function(resolve, reject){
			resolve(self.cache[path]);
		});
	}

	return this._viewFileHelper(0, tokens, null);
}

/* Recursive function to view a file object
 * @param depth    : current depth of the file tree we are searching in
 * @param tokens   : tokens of the absolute path
 * @param parentId : parent of the token we are currently searching for
 */
ThingsDatabase.prototype._viewFileHelper = function(depth, tokens, parentId){
	var self = this;
	var fs = new FSObject();

	return new Promise(function(resolve, reject){
		var that = self;
		var recurseFind = function(depth, tokens, parentId, resolve){
			console.log('<T> db.js -- _viewFileHelper: ' + tokens[depth]);
			fs.getFileObject(tokens[depth], parentId)
				.then(function(data){
					if(!data){
						resolve({});
						return;
					}
					if(depth == tokens.length - 1){
						if(data.type == 'file'){
							that.cache[tokens.join('/')] = data;
							that.stale = false;
							resolve(data);
						} 
						else{
							fs.getChildren(data._id)
								.then(function(children){
									data.content = children;
									that.cache['/' + tokens.join('/')] = data;
									that.stale = false;
									resolve(data);
								});
							}
					} 
					else{
						recurseFind(++depth, tokens, data._id, resolve);
					}
				});
		}

		recurseFind(depth, tokens, parentId, resolve);
	},
	function(error){
		reject(error);
	});
}

ThingsDatabase.prototype.cloneFile = function(id){
	return this._cloneFileHelper(id, 0);
}

/* @param name     : must be unique to the destination path
 * @param filepath : the path of the file to clone
 * @param destPath : the destination path of the file to clone into
 */
ThingsDatabase.prototype.cloneFileFromPath = function(filePath){
	var self = this;
	return new Promise(function(resolve, reject){
		self.viewFileObject(filePath).then(function(data){
			/* TODO: error checking */
			resolve(self.cloneFile(data._id));
		})
	})
}

ThingsDatabase.prototype._cloneFileHelper = function(id, depth, name){
	console.log('<T> db.js -- _cloneFileHelper: ' + id + ' ' + depth);
	var self = this;
	var fs = new FSObject();

	return new Promise(function(resolve, reject){
		var that = self;
		var deepClone = function(depth, id, parentId, resolve){
			console.log('<T> db.js -- deepClone: ' + depth);
			fs.getFileObjectById(id)
				.then(function(data){
					var newId = new mongoose.Types.ObjectId();
					if(depth == 0){
						/* TO-DO: REGEX */
						var fname = data.name + '(1)';
						that.createFile(fname, data.parent, data.type == 'file', data.content, newId);
					}
					else{
						that.createFile(data.name, parentId, data.type == 'file', data.content, newId);
					}
					if(data.type == 'directory'){
						depth++;
						fs.getChildren(id).then(function(children){
							if(children.length == 0){
								resolve();
								return;
							}
							for(var i = 0; i < children.length; i++){
								console.log('<D> db.js -- deepClone: child name ' + children[i].name);
								deepClone(depth, children[i]._id, newId, resolve);
							}
						});
					}
					else{
						resolve();
						return;
					}
				});
		}
		deepClone(depth, id, null, resolve);
	});
}

/* @param name       : name of the file or directory
 * @param parentId   : id of the parent 
 * @param isFile     : flag to check if the object is a file or directory 
 * @param content    : content of a file, directory is null
 * @param id         : id of the object
 */
ThingsDatabase.prototype.createFile = function(name, parentId, isFile, content, id){
	var self = this;
	var fsobj = new FSObject({
		_id  : (id) ? id : new mongoose.Types.ObjectId(),
		name : name,
		type : (isFile) ? 'file' : 'directory',
		parent: parentId
	});
	if(isFile){
		fsobj.content = content;
	}
	fsobj.save(function(err){
		if(err){
			console.log('<E> db.js -- createFile: ' + err);
			return;
		}
		self.stale = true;
		console.log('<D> db.js -- createFile: ' + name + ' created');
	});
}

ThingsDatabase.prototype.createFileFromPath = function(name, parentPath, isFile, fileContent){
	var self = this;
	return new Promise(function(resolve, reject){
		self.viewFileObject(parentPath).then(function(data){
			if(!data){
				resolve('<D> Parent path does not exist');
				return;
			}
			resolve(self.createFile(name, data._id, isFile, fileContent));
		});
	});
}

/* @param id : _id field of the file object to delete
 */
ThingsDatabase.prototype.deleteFile = function(id){
	console.log('<T> db.js -- deleteFile: ' + id);
	var fs = new FSObject();
	this.stale = true; 
	return fs.deleteFileObject(id);
}

/* @param path: implicit path of the file object
 */
ThingsDatabase.prototype.deleteFileFromPath = function(path){
	var self = this;
	return new Promise(function(resolve, reject){
		self.viewFileObject(path).then(function(data){
			resolve(self.deleteFile(data._id));
		});
	});
}

/* @param id         : _id field of the file to update
 * @param newContent : the content that will replace the previous file content
 */
ThingsDatabase.prototype.updateFile = function(id, newContent){
	console.log('<T> db.js -- updateFile: ' + id);
	var fs = new FSObject();
	this.stale = true;
	return fs.overwriteFile(id, newContent);
}

ThingsDatabase.prototype.updateFileFromPath = function(filePath, newContent){
	var self = this;
	return new Promise(function(resolve, reject){
		self.viewFileObject(filePath).then(function(data){
			resolve(self.updateFile(data._id, newContent));
		});
	});
}

/* Moves a file given its id and the id of its new parent
 * @param id          : _id field of the file object
 * @param newParentId : _id field of the new parent directory 
 */
ThingsDatabase.prototype.moveFile = function(id, newParentId){
	console.log('<T> db.js -- moveFile: ' + id + ', ' + newParentId);
	var fs = new FSObject();
	this.stale = true;
	return fs.updateParent(id, newParentId);
}

/* Change the name of a file object
 * @param id      : _id field of the object
 * @param newName : the new name of the file object
 */
ThingsDatabase.prototype.changeName = function(id, newName){
	console.log('<T> db.js -- changeName: ' + id);
	var fs = new FSObject();
	this.stale = true;
	return fs.updateName(id, newName);
}

/* Moves a file located at path
 * @param path       : implicit path of the file
 * @parma parentPath : new parent path 
 */
ThingsDatabase.prototype.moveFileFromPath = function(filePath, parentPath){
	var self = this;

	return new Promise(function(resolve, reject){
		self.viewFileObject(filePath).then(function(data){
			self.viewFileObject(parentPath).then(function(parentData){
				resolve(self.moveFile(data._id, parentData._id));
			});
		});
	});
}


module.exports = ThingsDatabase;

