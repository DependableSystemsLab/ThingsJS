/* Global File System for ThingsJS
 *    - Technically this is just a wrapper object providing an API for talking to the GFS service provider.
 *    - GFS provider is assumed to be an external service accessible over the network.
 *    - Default GFS provider is ThingsJS distributed file system.
 *    - To set an alternative GFS provider (e.g. Hadoop, Google FS, Amazon S3),
 *      the developer must provide the read and write functions and the appropriate credentials.
 */


/* The API provided by this object mirrors the native 'fs' API
 *   so that it is trivial for a user to switch to using GFS instead.
 *   e.g.
 *       var fs = require('fs');							// this line is replaced by the line below
 *       var fs = require('things-js').gfs(globalScope);	// globalScope needs to be passed in to link the Pubsub instance
 */
function GFS(globalScope){

}
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
}
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

}
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

}
GFS.prototype.createReadStream = function createReadStream(path, options){
	options = options || {};
	
}
GFS.prototype.createWriteStream = function createWriteStream(path, options){
	options = options || {};

}

GFS.bootstrap = function(globalScope){
	return new GFS(globalScope);
}

module.exports = GFS.bootstrap;