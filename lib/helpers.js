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

function measureSync(func, args){
	var started = Date.now();
	var result = func.apply(this, args);
	var elapsed = Date.now() - started;
	return {
		result: result,
		elapsed: elapsed
	}
};

function StopWatch(){
	if (!(this instanceof StopWatch)) return new StopWatch();
	this.started = null;
	this.ended = null;
}
StopWatch.prototype.start = function(){
	this.ended = null, this.started = Date.now();
	return this;
}
StopWatch.prototype.stop = function(){
	this.ended = Date.now(), this.elapsed = (this.ended - this.started);
	return this;
}

var CONFIDENCE_Z = {
	'80': 1.282,
	'85': 1.440,
	'90': 1.645,
	'95': 1.960,
	'99': 2.576,
	'99.5': 2.807,
	'99.9': 3.291
}
function analyzeArray(vals, conf){
	var min = Infinity, max = -Infinity;
	var mean = vals.reduce(function(acc, item){ 
		if (item < min) min = item;
		if (item > max) max = item;
		return item + acc
	}, 0) / vals.length;
	var stdev = Math.sqrt( vals.reduce(function(acc, item){ return acc + Math.pow(item - mean, 2) }, 0) / vals.length );
	var confidence = CONFIDENCE_Z[conf] * stdev / Math.sqrt(vals.length);
	return {
		min: min,
		max: max,
		mean: mean,
		stdev: stdev,
		confidence: confidence
	}
}

module.exports = {
	randKey: randKey,
	requireFromString: requireFromString,
	defer: defer,
	indent: indent,
	measureSync: measureSync,
	StopWatch: StopWatch,
	analyzeArray: analyzeArray
}