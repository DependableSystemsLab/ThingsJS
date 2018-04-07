var Module = require('module');
var path = require('path');

function randKey(length, charset){
	var text = "";
	if (!length) length = 8;
	if (!charset) charset = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for( var i=0; i < length; i++ ){
    	text += charset.charAt(Math.floor(Math.random() * charset.length));
    }
    return text;
};

function requireFromString(code, filename){
	// taken from https://github.com/floatdrop/require-from-string
	filename = filename || '';
	var paths = Module._nodeModulePaths(path.dirname(filename));
	var m = new Module(filename, module.parent);
	m.filename = filename;
	m.paths = paths;
	m._compile(code, filename);
	
	return m.exports;
};

function defer(){
	var deferred = {
		promise: null,
		resolve: null,
		reject: null
	};
	deferred.promise = new Promise(function(resolve, reject){
		deferred.resolve = resolve;
		deferred.reject = reject;
	});
	return deferred;
};

function indent(len){
	return ' '.repeat(len);
};

module.exports = {
	randKey: randKey,
	requireFromString: requireFromString,
	defer: defer,
	indent: indent
}