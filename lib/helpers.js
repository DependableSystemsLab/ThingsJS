var Module = require('module');
var path = require('path');
var fs = require('fs');
var crypto = require('crypto');
var jsonschema = require('jsonschema');
var chalk = require('chalk');

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

// Wrapper around jsonschema.Validator
function validateJSON(){
	var config, schema;
	if (typeof arguments[0] === 'string'){
		config = JSON.parse( fs.readFileSync(arguments[0]).toString() );
	}
	else if (typeof arguments[0] === 'object'){
		config = arguments[0];
	}
	else {
		throw 'Unsupported argument type for config (arguments[0])';
	}

	if (typeof arguments[1] === 'object'){
		schema = arguments[1];
	}
	else {
		throw 'Unsupported argument type for schema (arguments[1])';
	}

	var validator = new jsonschema.Validator();
	var result = validator.validate(config, schema);

	if (result.errors.length === 0){
		return config;
	}
	else {
		console.log("!!! Error validating configuration:");
		for (var i=0; i < result.errors.length; i++){
			console.log(result.errors[i].message);
		}
		throw "JSONValidationError";
	}
}

function Debugger(entity){
	this.entity = entity;
}
Debugger.prototype.log = function(){
	var self = this;
	var args = Array.from(arguments);
	args = args.map(function(arg){
		return chalk.yellow(self.entity)+'\t'+arg;
	})
	console.log.apply(null, args);
}

/** Compute the hash of a given string using the specified hashing algorithm
 * default hashing algorithm = md5
 */
function checksum(content, algo){
	algo = algo || 'md5';
	var hash = crypto.createHash(algo);
	hash.update(content);
	return hash.digest('hex');
}
function checksumJSON(obj, algo){
	return checksum(Object.keys(obj).sort().map(function(key){
		if (typeof obj[key] === 'object') return key+':'+checksumJSON(obj[key], algo);
		else return key+':'+obj[key];
	}).join(','), algo)
}

module.exports = {
	randKey: randKey,
	requireFromString: requireFromString,
	defer: defer,
	indent: indent,
	measureSync: measureSync,
	StopWatch: StopWatch,
	analyzeArray: analyzeArray,
	validateJSON: validateJSON,
	Debugger: Debugger,
	checksum: checksum,
	checksumJSON: checksumJSON
}