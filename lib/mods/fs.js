'use strict'
var fs = require('fs');
var stream = require('stream');
var randomKey = require('../common.js').randomKey;
var defer = require('../common.js').defer;

/* TODO: 
 *   - Deal with very large files being fragmented over TCP
 *   - Guarantee data integrity over transport with MD5 or SHA checksum
 *   - Deal with binary files (currently we assume file content is string)
 *   - Support for the streams API
 * 
 * Food for thought:
 *   - Is pub/sub an appropriate transport mechanism for this? what about end-to-end socket streaming?
 */

/* A FSDaemon process is left at the source node, publishing to the ReadStream. */
function ReadStream(path, codeId, pubsub){
	if (!(this instanceof ReadStream)) return new ReadStream(path);
	stream.Readable.call(this, {});
	var self = this;
	this.id = randomKey();
	this.path = path;		// fs.ReadStream property
	this.bytesRead = 0;		// fs.ReadStream property

	pubsub.subscribe(codeId+'/fs/ReadStream/'+self.id, function(message){
		self.push(message);
	});
	
	this._read = function(size){
		this.bytesRead += size;
	}
}
ReadStream.prototype = new stream.Readable();

/* A FSDaemon process is left at the source node, subscribed to the WriteStream. */
function WriteStream(path, codeId, pubsub){
	if (!(this instanceof WriteStream)) return new WriteStream(path);
	stream.Writable.call(this, {});
	var self = this;
	this.id = randomKey();
	this.path = path;		// fs.ReadStream property
	this.bytesRead = 0;		// fs.ReadStream property

	var requests = {}
	
	pubsub.subscribe(codeId+'/fs/WriteStream/'+self.id+'/ack', function(message){
		if (message.request in requests) requests[message.request].resolve(true);
		else reject("Request already resolved");
		delete requests[message.request];
	})

	this._write = function(chunk, encoding, callback){
		var request = randomKey();
		requests[request] = defer();
		requests[request].promise.then(function(){
			callback(null);
		}, function(err){
			callback(err);
		});

		pubsub.publish(codeId+'/fs/WriteStream/'+self.id, {
			request: request,
			data: chunk.toString() // TODO: support for binary data
		});
	}
}
WriteStream.prototype = new stream.Writable();

function FSDaemon(gScope){
	this.codeId = gScope._codeId;
	this.pubsub = gScope._pubsub;

	this.initialize();
}
FSDaemon.prototype.initialize = function(){
	var self = this;
	self.pubsub.subscribe(self.codeId+'/fs-daemon/readFile', function(message){
		fs.readFile(message.path, message.options, function(err, data){
			if (err){
				self.pubsub.publish(self.codeId+'/fs/readFile', {
					callId: message.callId,
					data: null,
					error: err
				});
			}
			else {
				self.pubsub.publish(self.codeId+'/fs/readFile', {
					callId: message.callId,
					data: data.toString(),
					error: null
				});
			}
		});
	});

	self.pubsub.subscribe(self.codeId+'/fs-daemon/writeFile', function(message){
		fs.writeFile(message.path, message.data, message.options, function(err){
			self.pubsub.publish(self.codeId+'/fs/writeFile', {
				callId: message.callId,
				error: err
			});
		});
	});
	self.pubsub.subscribe(self.codeId+'/fs-daemon/appendFile', function(message){
		fs.appendFile(message.path, message.data, message.options, function(err){
			self.pubsub.publish(self.codeId+'/fs/appendFile', {
				callId: message.callId,
				error: err
			});
		});
	});

	self.pubsub.subscribe(self.codeId+'/fs-daemon/createReadStream', function(message){
		self.createReadStream(message.path, message.options, message.streamId);
		// send acknowledgement (this might be unnecessary)
		self.pubsub.publish(self.codeId+'/fs/createReadStream', {
			callId: message.callId
		})
	});

	self.pubsub.subscribe(self.codeId+'/fs-daemon/createWriteStream', function(message){
		self.createWriteStream(message.path, message.options, message.streamId);
		// send acknowledgement (this might be unnecessary)
		self.pubsub.publish(self.codeId+'/fs/createWriteStream', {
			callId: message.callId
		})
	});

	self.pubsub.preventDisconnect([self.codeId+'/fs-daemon/readFile',
									self.codeId+'/fs-daemon/writeFile',
									self.codeId+'/fs-daemon/appendFile']);
}
FSDaemon.prototype.createReadStream = function createReadStream(path, options, proxyId){
	var self = this;
	var rstream = fs.createReadStream(path, options);
	rstream.on('data', function(chunk){
		self.pubsub.publish(self.codeId+'/fs/ReadStream/'+proxyId, chunk, true);
	})
	rstream.on('end', function(){
		self.pubsub.publish(self.codeId+'/fs/ReadStream/'+proxyId, null);	
	})
	return rstream;
}
FSDaemon.prototype.createWriteStream = function createWriteStream(path, options, proxyId){
	var self = this;
	var wstream = fs.createWriteStream(path, options);

	self.pubsub.subscribe(self.codeId+'/fs/WriteStream/'+proxyId, function(message){
		wstream.write(message.data, function(err){
			self.pubsub.publish(self.codeId+'/fs/WriteStream/'+proxyId+'/ack', {
				request: message.request
			});
		})

	});

	return wstream;
}

function FSProxy(gScope, proxyOnly){
	this.codeId = gScope._codeId;
	this.pubsub = gScope._pubsub;

	this.isSourceNode = !proxyOnly;

	this.initialize();
	if (!(proxyOnly)) this.daemon = new FSDaemon(gScope);

	this.calls = {};
}
FSProxy.prototype.initialize = function(){
	var self = this;
	self.pubsub.subscribe(self.codeId+'/fs/readFile', function(message){
		if (!message.error) self.calls[message.callId].resolve(new Buffer(message.data));
		else self.calls[message.callId].reject(message.error);
		delete self.calls[message.callId];
	});
	self.pubsub.subscribe(self.codeId+'/fs/writeFile', function(message){
		if (!message.error) self.calls[message.callId].resolve(true);
		else self.calls[message.callId].reject(message.error);
		delete self.calls[message.callId];
	});
	self.pubsub.subscribe(self.codeId+'/fs/appendFile', function(message){
		if (!message.error) self.calls[message.callId].resolve(true);
		else self.calls[message.callId].reject(message.error);
		delete self.calls[message.callId];
	});

	self.pubsub.subscribe(self.codeId+'/fs/createReadStream', function(message){
		if (!message.error) self.calls[message.callId].resolve(true);
		else self.calls[message.callId].reject(message.error);
		delete self.calls[message.callId];
	});
}
/* Replacement for fs.readFile(path[,options], callback) */
FSProxy.prototype.readFile = function readFile(path, arg1, arg2){
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

	if (this.isSourceNode){
		fs.readFile(path, options, callback);
	}
	else {
		var callId = randomKey();
		this.calls[callId] = defer();
		this.calls[callId].promise.then(function(data){
			callback(null, data);
		}, function(error){
			callback(error);
		});

		this.pubsub.publish(this.codeId+'/fs-daemon/readFile', {
			callId: callId,
			path: path,
			options: options
		});
		// console.log('reading file ['+path+'] through proxy');
	}
}
/* Replacement for fs.writeFile(file, data[,options], callback) */
FSProxy.prototype.writeFile = function writeFile(path, data, arg1, arg2){
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

	if (this.isSourceNode){
		fs.writeFile(path, data, options, callback);
	}
	else {
		var callId = randomKey();
		this.calls[callId] = defer();
		this.calls[callId].promise.then(function(){
			callback(null);
		}, function(error){
			callback(error);
		});

		this.pubsub.publish(this.codeId+'/fs-daemon/writeFile', {
			callId: callId,
			path: path,
			data: data,
			options: options
		});
		// console.log('writing to file ['+path+'] through proxy');
	}
}
/* Replacement for fs.appendFile(file, data[,options], callback) */
FSProxy.prototype.appendFile = function appendFile(path, data, arg1, arg2){
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

	if (this.isSourceNode){
		fs.appendFile(path, data, options, callback);
	}
	else {
		var callId = randomKey();
		this.calls[callId] = defer();
		this.calls[callId].promise.then(function(){
			callback(null);
		}, function(error){
			callback(error);
		});

		this.pubsub.publish(this.codeId+'/fs-daemon/appendFile', {
			callId: callId,
			path: path,
			data: data,
			options: options
		});
		// console.log('appending to file ['+path+'] through proxy');
	}
}
/* Replacement for fs.createReadStream(path[,options]) */
FSProxy.prototype.createReadStream = function createReadStream(path, options){
	options = options || {};

	var rstream = new ReadStream(path, this.codeId, this.pubsub);
	if (this.isSourceNode && this.daemon){
		this.daemon.createReadStream(path, options, rstream.id);
	}
	else {
		var callId = randomKey();
		this.calls[callId] = defer();
		this.calls[callId].promise.then(function(){
			// console.log('createReadStream via proxy : success');
		}, function(error){
			console.log('createReadStream via proxy : error');
			callback(error);
		});

		this.pubsub.publish(this.codeId+'/fs-daemon/createReadStream', {
			callId: callId,
			streamId: rstream.id,
			path: path,
			options: options
		});
	}
	return rstream;
}
/* Replacement for fs.createWriteStream(path[,options]) */
FSProxy.prototype.createWriteStream = function createWriteStream(path, options){
	options = options || {};

	var wstream = new WriteStream(path, this.codeId, this.pubsub);
	if (this.isSourceNode && this.daemon){
		this.daemon.createWriteStream(path, options, wstream.id);
	}
	else {
		var callId = randomKey();
		this.calls[callId] = defer();
		this.calls[callId].promise.then(function(){
			// console.log('createWriteStream via proxy : success');
		}, function(error){
			console.log('createWriteStream via proxy : error');
			// callback(error);
		});

		this.pubsub.publish(this.codeId+'/fs-daemon/createWriteStream', {
			callId: callId,
			streamId: wstream.id,
			path: path,
			options: options
		});
	}

	return wstream;
}

module.exports = function(gScope, proxyOnly){
	return new FSProxy(gScope, proxyOnly);
}