var Module = require('module');
var fs = require('fs');
var path = require('path');
var jsonschema = require('jsonschema');

var SCHEMA = {
	'config': {
	    type: 'object',
	    properties: {
	        pubsub_url: { type: 'string' },
	        node_id: { type: 'string' },
	        device: { type: 'string' }
	    },
	    required: ['pubsub_url'],
	}
}


/* Validates a config file,
 * returns an object if successful,
 * throws error if invalid
 * 
 * this function is run synchronously, as an invalid config should not be used
 * and error should be thrown to prevent further execution.
 */
function validateConfig(filePath, schema){
	if (!schema) schema = 'config';
	
	try {
		var content = fs.readFileSync(filePath, 'utf8');
	}
	catch (err){
		console.log("!!! Could not read Config file at "+filePath);
		console.log("    ... using things-default.conf");
		filePath = path.resolve(__dirname, '../bin/things-default.conf');
		var content = fs.readFileSync(filePath, 'utf8');
	}
	
	var config = JSON.parse( content.toString() );
	var validator = new jsonschema.Validator();
	
	if (typeof schema === 'string'){
		var result = validator.validate(config, SCHEMA[schema]);	
	}
	else {
		var result = validator.validate(config, schema);
	}
	
	if (result.errors.length === 0){
		return config;
	}
	else {
		console.log("!!! Error validating Config file at "+filePath);
		for (var i=0; i < result.errors.length; i++){
			console.log(result.errors[i].message);
		}
		throw "ConfigValidationError";
	}
}

/* Helper function for generating random ids.
 * TODO: replace this later with a more robust and secure version 
 */
function randomKey(length, charset){
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

module.exports = {
		validateConfig: validateConfig,
		randomKey: randomKey,
		requireFromString: requireFromString,
		defer: defer
};