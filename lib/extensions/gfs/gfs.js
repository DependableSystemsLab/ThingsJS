/* Global File System for ThingsJS
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

/* The API provided by this object mirrors the native 'fs' API
 *   so that it is trivial for a user to switch to using GFS instead.
 *   e.g.
 *       var fs = require('fs');							// this line is replaced by the line below
 *       var fs = require('things-js').gfs(globalScope);	// globalScope needs to be passed in to link the Pubsub instance
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

//Reading from the file
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

//Writing to the File
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
					return FSObject.create({ content : content}).exec(function(err, file){
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
				else {
					callback(err);
					// return Promise.reject(err);
				}
			})

}

//Appending
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
				return FSObject.findOneAndUpdate( { _id: node._id }, {  
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

//Deleting a file

GFS.prototype.deleteFile = function deleteFile(path, arg1, arg2){
	var options, callback;
	if (typeof arg1 === 'function'){
		callback = arg1;
	}
	else if (typeof arg1 === 'object' && typeof arg2 === 'function'){
		options = arg1;
		callback = arg2;
	}
	else {
		throw "deleteFile(path, data[,options], callback): You need to provide a callback function";
	}

	return FSObject.getNode(path)
		.then(function(node){
			// console.log(node);
			if (node.type === 'file'){
				return FSObject.findOneAndDelete( { _id: node._id }, {  
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







GFS.bootstrap = function(mongoUrl){
	return new GFS(mongoUrl);
}

module.exports = GFS.bootstrap;
