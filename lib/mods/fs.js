var fs = require('fs');
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

	self.pubsub.preventDisconnect([self.codeId+'/fs-daemon/readFile',
									self.codeId+'/fs-daemon/writeFile',
									self.codeId+'/fs-daemon/appendFile']);
}

function FSProxy(gScope, proxyOnly){
	this.codeId = gScope._codeId;
	this.pubsub = gScope._pubsub;

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

module.exports = function(gScope, proxyOnly){
	return new FSProxy(gScope, proxyOnly);
}