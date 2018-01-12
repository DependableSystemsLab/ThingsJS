var esprima = require('esprima');
var escodegen = require('escodegen');
var fs = require('fs');
var jsBeautify = require('js-beautify').js_beautify;
var Pubsub = require('../pubsub/Pubsub.js');
var randomKey = require('../common.js').randomKey;
var requireFromString = require('../common.js').requireFromString;

var DEBUG_MODE = false;
var MEASUREMENTS = {}

var PHONETIC_ALPHABET = ['alpha', 'bravo', 'charlie', 'delta', 'echo',
                         'foxtrot', 'golf', 'hotel', 'india', 'juliet',
                         'kilo', 'lima', 'mike', 'november', 'oscar',
                         'papa', 'quebec', 'romeo', 'sierra', 'tango',
                         'uniform', 'victor', 'whiskey', 'xray', 'yankee', 'zulu']

function ThingsError(type, value, why){
	this.type = type;
	this.value = value;
	this.why = why;
}

function Timer(type, callback, timedelta, timerId){
	this.id = (timerId || randomKey(16));
	this.ref = null;
	this.type = type;
	this.callback = callback;
	this.scope = callback.pScope;
	this.timedelta = timedelta || 0;
	this.createdAt = Date.now();
	this.calledAt = undefined;
	this.clearedAt = undefined;
	this.stoppedAt = undefined;
	this.cleared = false;
	this.stopped = false;
};
Timer.prototype.getRemainingTime = function(){
	if (this.clearedAt) return this.stoppedAt - this.clearedAt;
	else return this.stoppedAt - this.calledAt;
};
Timer.RUN_MAPPING = { 'Timeout': setTimeout, 'Interval': setInterval, 'Immediate': setImmediate };
Timer.STOP_MAPPING = { 'Timeout': clearTimeout, 'Interval': clearInterval, 'Immediate': clearImmediate };
Timer.prototype.run = function(){
	var self = this;
	self.calledAt = Date.now();
	self.ref = Timer.RUN_MAPPING[self.type](function(){
		self.callback();
		self.clearedAt = Date.now();
		if (self.type === 'Timeout' || self.type === 'Immediate'){
			self.cleared = true;
			
			self.callback.pScope.protect = false;
		}
	}, self.timedelta);
};
Timer.prototype.stop = function(){
	Timer.STOP_MAPPING[this.type](this.ref);
	this.stoppedAt = Date.now();
	this.stopped = true;
};
Timer.deconstruct = function(timer){
	var serialized = {
		id: timer.id,
		type: timer.type,
		callback: { scope: timer.callback.pScope.getURI(), name: timer.callback.name, fnid: timer.callback.fnid },
		scope: timer.scope.getURI(),
		timedelta: timer.timedelta,
		createdAt: timer.createdAt,
		calledAt: timer.calledAt,
		clearedAt: timer.clearedAt,
		stoppedAt: timer.stoppedAt,
		cleared: timer.cleared,
		stopped: timer.stopped
	}
	return serialized;
};
Timer.reconstruct = function(data, rootScope, functionTable){
	var scope = rootScope.getScope(data.scope);
	var callback = scope.functions[data.callback.name];
	var timedelta;
	
	if (data.type === "Interval"){
		timedelta = data.timedelta;
	}
	else if (data.type === "Timeout"){
		timedelta = data.timedelta - ( data.stoppedAt - data.calledAt );
	}
	var timer = new Timer(data.type, callback, timedelta, data.id);
	timer.calledAt = data.calledAt;
	timer.clearedAt = data.clearedAt;
	timer.stoppedAt = data.stoppedAt;
	
	return timer;
};

function Scope(name, parent, creator, setUID){
	this.uid = setUID || randomKey(16);
	this.uri = this.uid; //URI is global instance identifier. e.g. uid1/uid2/uid3 
	this.name = name;
	this.parent = null; //this parent will be set by the parent's addChild function
	this.creator = creator || null;
	this.children = {};
	this.params = {};
	this.variables = {};
	this.functions = {};
	this.requires = {};
	
	this._timers = {
		'timeouts': [],
		'intervals': [],
		'immediates': []
	}
	
	if (parent instanceof Scope){
		parent.addChild(this);
	}
};
Scope.prototype.addChild = function(childScope){
	childScope.parent = this;
	
	this.children[childScope.uid] = childScope;
	childScope.uri = childScope.getURI(); // cache URI here
	
	// childScope should never have any timer objects;
	// timers is removed lazily here because a childScope temporarily has no parent when reconstructing from snapshot
	childScope._timers = undefined;
};
Scope.prototype.removeChild = function(childScope){
	childScope.parent = undefined;
	delete this.children[childScope.uid];
	childScope.uri = childScope.getURI(); // refresh URI, but this childScope should not be reachable
};
Scope.prototype.destroy = function(){
	// If there are no dependent child scopes, detach from parent scope
	// then propagate destroy up the chain of scopes
	// TODO: this mechanism should be carefully reviewed as it seems to destroy scopes that should not be destroyed
	
	if (Object.keys(this.children).length === 0 && !this.protect){
		var parent = this.parent;
		if (parent){
			parent.removeChild(this);
			
//			console.log(this.getUID()+" ["+this.uid+"] "+this.name+" destroyed!");
			parent.destroy();
		}
		else {
			//Not doing anything for now, but if this code is called, then maybe program has finished running.
//			console.log("!!! SCOPE DESTROY called on GLOBAL scope !!! - has the program finished its execution?");
		}
	}
	
};
Scope.prototype.returnAndDestroy = function(returnVal){
	this.destroy();
	return returnVal;
};
Scope.prototype.getUID = function(){
	var parent = this.parent;
	var name = this.name;
	while (parent){
		name = parent.name +"_"+ name;
		parent = parent.parent;
	}
	return name;
};
Scope.prototype.getRank = function(){
	var rank = 0;
	var parent = this;
	while (parent.parent){
		parent = parent.parent;
		rank ++;
	}
	return rank;
};
//Use only for debugging
Scope.prototype.getIndent = function(){
	var parent = this.parent;
	var indent = "";
	while (parent){
		indent += "    ";
		parent = parent.parent;
	}
	return indent;
};
Scope.prototype.getURI = function(){
	var parent = this.parent;
	var uid = this.uid;
	while (parent){
		uid = parent.uid +"/"+ uid;
		parent = parent.parent;
	}
	return uid;
};
Scope.prototype.printDebug = function(){
	if (DEBUG_MODE){
		console.log("\n"+this.getIndent()+"Scope:  "+this.getURI());	
	}
};
Scope.prototype.getScope = function(uri){
	//This function can only be called on the root scope because it uses absolute URI and not relative URI.
	var scopeNames = uri.split("/");
	var scope = this;
	for (var i=1; i < scopeNames.length; i++){
		scope = scope.children[scopeNames[i]];
//		console.log(scope.name);
	}
	return scope;
};

Scope.prototype.isOffspringOf = function(scope){
	// if provided scope === this, it's considered offspring (a scope is considered offspring of itself)
	var parent = this;
	while (parent){
		if (parent.uid === scope.uid){
			return true;
		}
		parent = parent.parent;
	}
	return false;
};
Scope.prototype.isAncestorOf = function(scope){
	var parent = scope;
	while (parent){
		if (parent.uid === this.uid){
			return true;
		}
		parent = parent.parent;
	}
	return false;
};

Scope.prototype.getFunction = function(funcURI){
	//This function should be called by root scope only, otherwise it won't work
	var tokens = funcURI.split(".");
	return this.getScope(tokens[0]).functions[tokens[1]];
};
Scope.prototype.getRoot = function(){
	var parent = this;
	while (parent.parent !== null){
		parent = parent.parent;
	}
	return parent;
};
Scope.prototype.addFunction = function(func, fnid, scope){
	func.fnid = fnid;
	func.pScope = this;
	if (scope){
//		console.log("Adding function "+fnid);
		this.protectAncestorScopes(scope);
	}
	this.functions[func.name] = func; //if anonymous, use fnid
	
	return func;
};
Scope.prototype.protectAncestorScopes = function(scope){
	var parent = this;
//	console.log(scope);
	if (scope.getRank() <= parent.getRank()){
		parent.protect = true;
		while (parent && parent.getUID() !== scope.getUID()){
			parent = parent.parent;
			parent.protect = true;
//			console.log("[RUNTIME] Protecting "+parent.getUID());
		}
//		console.log("[RUNTIME] FINALLY protecting "+parent.getUID());	
	}
//	else {
//		console.log("[RUNTIME] Current scope "+this.getUID()+" equal or higher than scope "+scope.getUID());
//	}
};

// These functions should be called ONLY by the rootScope (global scope) and at the beginning of the instrumented code
Scope.prototype.setPubsub = function(codeId, pubsubUrl, migrationCount){
	var self = this;
	self._codeId = codeId;
	return new Promise(function(resolve, reject){
		self._pubsub = new Pubsub(codeId, pubsubUrl);
		self._pubsub.connect(function() {
		    console.log("<CODE> ["+codeId+"] : Connected to MQTT Server at " + pubsubUrl);
		    self._pubsub.subscribe(codeId+'/cmd', function onNewMessage(msg) {
		        console.log("<CODE> ["+codeId+"] : Received command [" + msg.command + "] : " + msg.message);
		        if (msg.command === "snapshot") {
		            var snapshot = Scope.snapshot(self, codeId, pubsubUrl, migrationCount);
		            self._pubsub.publish(codeId+'/snapshots', snapshot);
		            if (msg.flush) {
		            	self.flush();
		            }
		        } else if (msg.command === "flush") {
		        	self.flush();
		        }
		    });
		    resolve(true);
		});
	});
};
Scope.prototype.flush = function(){
	var self = this;
	self._timers['timeouts'] = [];
	self._timers['intervals'] = [];
	self._timers['immediates'] = [];
	self.functionTable = undefined;
	
	self._pubsub.publish(self._codeId+'/signals', 'flush');
	self._pubsub.unsubscribe(self._codeId+'/cmd');
	self._pubsub.disconnect();
};
Scope.prototype.setTimeout = function(callback, delay, timerId){
	//This function should only be called by the root scope.
	var timer = new Timer('Timeout', callback, delay, timerId);
	callback.pScope.protect = true;
	timer.run();
	this._timers['timeouts'].push(timer);
	return timer.id;
};
Scope.prototype.setInterval = function(callback, interval, timerId){
	//This function should only be called by the root scope.
	var timer = new Timer('Interval', callback, interval, timerId);
	callback.pScope.protect = true;
	timer.run();
	this._timers['intervals'].push(timer);
	return timer.id;
};
Scope.prototype.setImmediate = function(callback, timerId){
	//This function should only be called by the root scope.
	var timer = new Timer('Immediate', callback, null, timerId);
	callback.pScope.protect = true;
	timer.run();
	this._timers['immediates'].push(timer);
	return timer.id;
};
Scope.prototype.stopAllTimers = function(){
	this._timers['immediates'].map(function(timer){ timer.stop(); });
	this._timers['timeouts'].map(function(timer){ timer.stop(); });
	this._timers['intervals'].map(function(timer){ timer.stop(); });
};
Scope.prototype.clearTimeout = function(timerId){
	var timer = this._timers['timeouts'].filter(function(timer){ return timer.id === timerId; })[0];
	timer.stop();
};
Scope.prototype.clearInterval = function(timerId){
	var timer = this._timers['intervals'].filter(function(timer){ return timer.id === timerId; })[0];
	timer.stop();
};
Scope.prototype.clearImmediate = function(timerId){
	var timer = this._timers['immediates'].filter(function(timer){ return timer.id === timerId; })[0];
	timer.stop();
};
Scope.prototype.log = function(text){
	console.log(text);
	this._pubsub.publish(this._codeId+'/console', text);
};
Scope.prototype.createObject = function(data, constructorURI){
	var obj;
	if (constructorURI){
		obj = Object.create(this.getFunction(constructorURI).prototype);
//		var ConstructorFunction = this.getFunction(constructorURI);
//		obj = new ConstructorFunction(); //This will be problematic if there are call expressions in the constructor function
	}
	else {
		obj = {};
	}
	for (var key in data){
		obj[key] = data[key];
	}
	return obj;
};

/* Static Functions and variables */
/*  static variables will hold objects like timers like setTimeout and setInterval, as these are tied to the global scope */
var NATIVE_CONSTRUCTORS = [ 'Date', 'Buffer' ];
var NATIVE_OBJECT_HANDLERS = {
	'Date': {
		serialize: function(date){
			return date.toISOString();
		},
		deserialize: function(dateStr){
			return new Date(dateStr);
		},
		as_code: function(date){
			return "new Date("+date.valueOf()+")";
		}
	},
	'Buffer': {
		serialize: function(buf){
			return buf.toString('hex');
		},
		deserialize: function(bufStr){
			return Buffer.from(bufStr, 'hex');
		},
		as_code: function(buf){
			return "Buffer.from('"+buf.toString('hex')+"', 'hex')";
		}
	}
}
var THINGSJS_CONSTRUCTORS = [ Pubsub ];
var THINGSJS_OBJECT_HANDLERS = {
	'Pubsub': {
		serialize: function(scope, pubsub){
			var handlers = {};
			for (var key in pubsub.handlers){
				handlers[key] = Scope.deconstructVariable(scope, pubsub.handlers[key]);
			}
			return {
				id: pubsub.id,
				clientName: pubsub.clientName,
				pubsub_url: pubsub.pubsub_url,
			    handlers: handlers
			}
		},
		deserialize: function(scope, data, functionTable){
			var handlers = {};
			for (var key in data.handlers){
				handlers[key] = Scope.reconstructVariable(scope, data.handlers[key], functionTable);
			}
			
			return new Pubsub(data.clientName, data.pubsub_url, handlers);
		}
	}
}

var THINGSJS_RESERVED = [ 'fnid', 'pScope' ];
function removeFromArray(list, removeItems){
	removeItems.map(function(keyword){
		if (list.indexOf(keyword) > -1){
			list.splice(list.indexOf(keyword), 1);
		}
	})
	return list;
}
Scope.deconstructVariable = function deconstructVariable(scope, variable){
	if ((typeof variable === 'boolean') || (typeof variable === 'number') || (typeof variable === 'string')){
		return variable;
	}
	else if (variable instanceof Array){
		return { type: 'Array', value: variable.map(function(item){ return deconstructVariable(scope, item); }) }
	}
	else if (variable === null){
		return { type: 'null', value: null };
	}
	else if (variable === undefined){
		return { type: 'undefined', value: undefined };
	}
	else if (typeof variable === 'object'){
//		console.log(variable);
//		console.log(Object.keys(variable));
//		console.log(Object.getPrototypeOf(variable));
		if (NATIVE_CONSTRUCTORS.indexOf(variable.constructor.name) > -1){
//			console.log(variable.constructor.name);
//			console.log(serialized);
			return { type: 'object',
				 	 constructorData: { name: variable.constructor.name },
				 	 value: NATIVE_OBJECT_HANDLERS[variable.constructor.name].serialize(variable) };
		}
		else if (THINGSJS_CONSTRUCTORS.indexOf(variable.constructor) > -1){
			return { type: 'object',
				 	 constructorData: { name: variable.constructor.name },
				 	 value: THINGSJS_OBJECT_HANDLERS[variable.constructor.name].serialize(scope, variable) };
		}
		else if (variable.constructor._deconstruct){
			// If some object defines a custom way to serialize, use it.
			// The _deconstruct method of the constructor must be implemented to support this
			return { type: 'object',
					 constructorData: { name: variable.constructor.name, 
						 				value: variable.constructor.fnid, 
						 				scope: variable.constructor.pScope.getURI() },
					 value: variable.constructor._deconstruct(variable) };
		}
		else {
			var serialized = {};
			var keys = Object.keys(variable);
			//Cannot use for ... in here because we don't want the stuff in the prototype
			for (var i=0; i < keys.length; i++){
				console.log(keys[i]);
				serialized[keys[i]] = deconstructVariable(scope, variable[keys[i]]);
			}
			
			if (variable.__proto__ === Object.prototype){
				return { type: 'object', value: serialized };
			}
			else {
//				console.log("Deconstructing Object");
//				console.log(variable);
//				console.log(variable.constructor.name);
				return { type: 'object',
						 constructorData: { name: variable.constructor.name, 
							 				value: variable.constructor.fnid, 
							 				scope: variable.constructor.pScope.getURI() },
						 value: serialized };
			}
		}
	}
	else if (typeof variable === 'function'){
//		console.log("Deconstructing Function");
//		console.log(scope.name+" - "+scope.uid);
//		console.log(variable.name);
//		console.log(variable);
		return { type: 'function', 
				 value: variable.fnid,
				 scope: variable.pScope.getURI(),
				 name: variable.name,
				 isDeclaration: (variable.pScope.uri === scope.uri) };
	}
};
Scope.deconstructFunction = function(scope, func){
	
	var data = {
		fnid: func.fnid,
		scope: func.pScope.uri,
		name: func.name,
		properties: {},
		protoObject: {}
	}
	
	var props = removeFromArray(Object.keys(func), THINGSJS_RESERVED);
//	console.log(Object.keys(func), props);
	for (var i=0; i < props.length; i++){
		data.properties[props[i]] = Scope.deconstructVariable(scope, func[props[i]]);
	}
//	console.log(func.name);
	data.protoObject = Scope.deconstructVariable(scope, func.prototype);
//	console.log(data.protoObject);
		
	return data;
};
Scope.deconstruct = function(scope){
	var serialized = { uid: scope.uid,
					   name: scope.name,
					   parentName: (scope.parent ? scope.parent.name : null),
					   uri: scope.uri,
					   creator: scope.creator,
					   instanceNumber: scope.instanceNumber,
					   params : {},
					   variables: {},
					   functions: {},
					   requires: {},
					   children: {} };
//	console.log("Deconstructing "+scope.name);
//	console.log(Object.keys(scope.variables));
	for (var param in scope.params){
		serialized.params[param] = Scope.deconstructVariable(scope, scope.params[param]);
	}
	for (var varName in scope.variables){
		// console.log(varName);
		serialized.variables[varName] = Scope.deconstructVariable(scope, scope.variables[varName]);
	}
	for (var funcName in scope.functions){
		serialized.functions[funcName] = Scope.deconstructFunction(scope, scope.functions[funcName]);
	}
	for (var varName in scope.requires){
		serialized.requires[varName] = scope.requires[varName];
	}
	
	for (var child in scope.children){
		serialized.children[child] = Scope.deconstruct(scope.children[child]);
	}
	return serialized;
};
Scope.serialize = function(scope, codeId, pubsubUrl, migrationCount){
	//scope: this MUST be the global scope
	
	//MEASUREMENT:
	MEASUREMENTS['snapshot'] = { start: Date.now(), end: undefined };
	
	//Stop all running timers
	scope.stopAllTimers();
	
	//Deconstruct the state into serializable format
	var snapshot = {
		"codeId": codeId, //replace this with id given by Code
		"pubsubUrl": pubsubUrl, //replace this with Pubsub Url injected by Code
		"migrationCount": (migrationCount || 0),
		"snapshotTime": Date.now(),
		"scopeTree": Scope.deconstruct(scope),
		"timers": {
			"timeouts": scope._timers["timeouts"].filter(function(timer){ return timer.cleared === false; }).map(function(timer){ return Timer.deconstruct(timer); }),
			"intervals": scope._timers["intervals"].filter(function(timer){ return timer.cleared === false; }).map(function(timer){ return Timer.deconstruct(timer); }),
			"immediates": scope._timers["immediates"].filter(function(timer){ return timer.cleared === false; }).map(function(timer){ return Timer.deconstruct(timer); })
		},
		"functionTable": scope.functionTable
	}
	
	//TODO: Handle code containing string "\n" - these characters cause encoding error when serializing - deserializing as JSON string
	
	//Serialize the state
	var serialized = JSON.stringify(snapshot);
	
	//MEASUREMENT:
	MEASUREMENTS['snapshot'].end = Date.now();
	console.log("<CODE> ["+codeId+"] : Snapshot Serialization time - "+(MEASUREMENTS['snapshot'].end - MEASUREMENTS['snapshot'].start)+" ms")
	if (DEBUG_MODE){
		fs.appendFileSync("records/serialization.log", (codeId+";"+(MEASUREMENTS['snapshot'].end - MEASUREMENTS['snapshot'].start)+"\n") );	
	}
	
	return serialized;
};
Scope.snapshot = Scope.serialize; //Alias for serialize

Scope.reconstructVariable = function reconstructVariable(scope, data, functionTable){
	try { // might fail in the first pass

		if ((typeof data === 'boolean') || (typeof data === 'number') || (typeof data === 'string')){
			return data;
		}
		else if (data.type === 'null'){
			return null;
		}
		else if (data.type === 'undefined'){
			return undefined;
		}
		else if (data.type === 'Array'){
			return data.value.map(function(item){ return reconstructVariable(scope, item, functionTable); })
		}
		else if (data.type === 'object'){
	//		console.log("Reconstructing object");
	//		console.log(data);
			if (data.constructorData){
				
				if (NATIVE_CONSTRUCTORS.indexOf(data.constructorData.name) > -1){
					return NATIVE_OBJECT_HANDLERS[data.constructorData.name].deserialize(data.value);
				}
				else if (data.constructorData.name in THINGSJS_OBJECT_HANDLERS){
					return THINGSJS_OBJECT_HANDLERS[data.constructorData.name].deserialize(scope, data.value, functionTable);
				}
				else {
					var ConstructorFunction = scope.getRoot().getFunction(data.constructorData.scope+"."+data.constructorData.name);
					
					//use Object.create as we don't want to invoke the constructor function itself
					// any calls or initializations inside the constructor would've been called, so constructor should not be invoked.
					var instance = Object.create(ConstructorFunction.prototype);
					instance.__proto__.constructor = ConstructorFunction;
//					console.log("[[[ Created Custom Object ]]] "+ConstructorFunction.name);
//					console.log(instance.__proto__);
//					console.log(instance.__proto__.constructor.name);
				}			
			}
			else {
				var instance = {};
			}
	//		console.log(instance.constructor);
	//		console.log(instance.__proto__);
	
			for (var key in data.value){
//				console.log(key);
				instance[key] = reconstructVariable(scope, data.value[key], functionTable);
			}
			
			return instance;
		}
		else if (data.type === 'function'){
//			console.log("RECONSTRUCTING variable function "+data.scope+" ."+data.value);
//			console.log(scope.getRoot().getScope(data.scope).functions[data.name]);
			
			var parentScope = scope.getRoot().getScope(data.scope);
			
			if (data.isDeclaration && !(data.name in parentScope.functions)){
				
				var func = requireFromString("module.exports = "+functionTable[data.value].code);
					func.fnid = data.value;
					func.pScope = scope;
				return func;
				
			}
			else {
				
				var func = parentScope.functions[data.name];
//				console.log("    found function "+data.name);
				
				return func;	
			}
		}
	
	}
	catch (err){
		console.log("Could not reconstruct variable in the first pass. Will try again in the second pass");
//		console.log(data);
//		console.log(err);
		throw new ThingsError("ReconstructionError", data, err);
	}
};
Scope.reconstructFunction = function(scope, data, functionTable){
//	console.log(data);
	var func = requireFromString("module.exports = "+functionTable[data.fnid].code);
		func.fnid = data.fnid;
		func.pScope = scope;
		scope.functions[func.name] = func;
		
		for (var key in data.properties){
			try {
				func[key] = Scope.reconstructVariable(scope, data.properties[key], functionTable);	
			}
			catch (err){
				console.log("   Error recovering "+func.name+"."+key);
				throw err;
			}
		}
		
//		console.log(data.protoObject);
		func.prototype = Scope.reconstructVariable(scope, data.protoObject, functionTable);		
		
	return func;
};
Scope.reconstruct = function(data, functionTable, parentScope){
	
	var scope = new Scope(data.name, (parentScope || null), data.creator, data.uid);
	
	//Bottom-up pass
	
	for (var param in data.params){
		scope.params[param] = Scope.reconstructVariable( scope, data.params[param], functionTable );
//		console.log(typeof scope.params[param], param, scope.params[param]);
	}
	
	for (var varName in data.requires){
		scope.requires[varName] = data.requires[varName];
	}
	
	var processFuncsAfter = {};
	for (var funcName in data.functions){
		try {
			scope.functions[funcName] = Scope.reconstructFunction( scope, data.functions[funcName], functionTable);	
		}
		catch (err){
			if (err.type === "ReconstructionError"){
				console.log("   !!! Could not reconstruct FUNCTION ["+funcName+"] in the first pass. will try again");
				processFuncsAfter[funcName] = data.functions[funcName];
			}
			else {
				throw err;
			}
		}
	}
	
	var processAfter = {};
	for (var varName in data.variables){
		try {
			scope.variables[varName] = Scope.reconstructVariable( scope, data.variables[varName], functionTable );	
		}
		catch (err){
			if (err.type === "ReconstructionError"){
				console.log("COULD NOT RECONSTRUCT variable ["+varName+"] in the first pass. Will try again in the second pass");
//				console.log(err.value);
//				console.log(err.why);
				
				processAfter[varName] = data.variables[varName];
			}
			else {
				throw err;
			}
		}
	}
	
	//Top-down pass
	for (var child in data.children){
		Scope.reconstruct(data.children[child], functionTable, scope);
	}
	
	for (var varName in processAfter){
		try {
			scope.variables[varName] = Scope.reconstructVariable( scope, data.variables[varName], functionTable );	
		}
		catch (err){
			console.log("    Failed to RECONSTRUCT again! "+varName);
			console.log(err.why);
			throw err
		}
	}
	
	for (var funcName in processFuncsAfter){
		scope.functions[funcName] = Scope.reconstructFunction( scope, processFuncsAfter[funcName], functionTable);
	}
	
	return scope;
};
Scope.deserialize = function(snapshotString){
	//Deserialize string
	var snapshot = JSON.parse(snapshotString);
	
	//TODO: Handle code containing string "\n"
	
	//Reconstruct state
	snapshot.scopeTree = Scope.reconstruct(snapshot.scopeTree, snapshot.functionTable);
	snapshot.timers.timeouts = snapshot.timers.timeouts.map(function(data){ return Timer.reconstruct(data, snapshot.scopeTree, snapshot.functionTable); });
	snapshot.timers.intervals= snapshot.timers.intervals.map(function(data){ return Timer.reconstruct(data, snapshot.scopeTree, snapshot.functionTable); });
	snapshot.timers.immediates = snapshot.timers.immediates.map(function(data){ return Timer.reconstruct(data, snapshot.scopeTree, snapshot.functionTable); });
	snapshot.scopeTree.functionTable = snapshot.functionTable;
	
	return snapshot;
};
Scope._processVariable = function(scope, variable, functionTable, childScopesReady){
//	console.log(typeof variable, variable, variable.constructor.name);
	if (variable === undefined){
		return "undefined";
	}
	else if (variable === null){
		return "null";
	}
	else if (typeof variable === 'boolean'){
		return variable;
	}
	else if (typeof variable === 'number'){
		return variable;
	}
	else if (typeof variable === 'string'){
		return '"'+variable+'"';
	}
	else if (variable instanceof Array){
		return "["+variable.map(function(item){ return Scope._processVariable(scope, item, functionTable, childScopesReady); }).join(", ")+"]";
	}
	else if (typeof variable === 'function'){
//		console.log("Processing Function Instance: "+scope.name+" . "+variable.name+" - "+variable.pScope.uri);
		
		// case: function was declared in this scope
		if (scope.uid === variable.pScope.uid){
			
			if (variable.__processed){
				return variable.name;
			}
			else {
				return functionTable[variable.fnid].code;	
			}
			
		}
		// case: function was declared in an ancestor scope, it is available for fetch
		else if (scope.isOffspringOf(variable.pScope)){
			return "Σ_global.getFunction('"+variable.pScope.uri+"."+variable.name+"')";
		}
		// case: function was declared in an offspring scope, so we should wait until offspring scope is realized
		else if (scope.isAncestorOf(variable.pScope)){
			if (childScopesReady){
				return "Σ_global.getFunction('"+variable.pScope.uri+"."+variable.name+"')";
			}
			throw new ThingsError("ChildScopeUninitialized", variable.pScope.uri);
		}
		// case: function was declared in an adjacent scope chain, we should wait until the rest of the scopes are realized
		else {
			throw new ThingsError("ScopeUninitialized", variable.pScope.uri);
		}
		
		var code = functionTable[variable.fnid].code;
		return code;
		
	}
	else if (typeof variable === 'object'){
//		console.log("Generating code for object");
//		console.log(variable);
//		console.log(variable.constructor);
		if (NATIVE_CONSTRUCTORS.indexOf(variable.constructor.name) > -1){
			return NATIVE_OBJECT_HANDLERS[variable.constructor.name].as_code(variable);
		}
		else if (variable.constructor === Pubsub){
			return "new things_js.Pubsub('" + variable.id + "', '"+variable.pubsub_url+"', "+Scope._processVariable(scope, variable.handlers, functionTable, childScopesReady)+", true)";
		}
		else {
			var serialized = "{\n";
			var keys = Object.keys(variable);
			for (var i=0; i < keys.length; i ++){
				
				serialized += '"'+keys[i]+'" : '+Scope._processVariable(scope, variable[keys[i]], functionTable, childScopesReady)+",\n";
				
			}
			serialized += "}";
			if (variable.constructor.fnid){
				serialized = "Σ_global.createObject(" + serialized + ", '"+variable.constructor.pScope.getURI()+"."+variable.constructor.name+"')";	
			}
			return serialized;
		}
	}
	else {
		console.log("Unknown variable type");
		console.log(typeof variable);
		console.log(variable);
		throw new ThingsError("UnknownVariableType", variable);
	}
};
Scope._processFunction = function(scope, func, functionTable, isChildFunction){
	var funcInfo = functionTable[func.fnid];
	var code = "";
	if (funcInfo.isProtoFunctionOf === "undefined"
		&& (scope.uri === func.pScope.uri)
//		&& (funcInfo.hoisted || isChildFunction)
		){
		
		var identifier;
		identifier = funcInfo.name;
		code = funcInfo.code+";\n";
			
//		console.log("---  GENERATING FUNCTION CODE  --- "+scope.name+" > "+identifier+" ("+scope.uri+")");
		
		if (funcInfo.protect){
			code += "Σ_"+scope.getUID()+".addFunction("+identifier+", '"+funcInfo.fnid+"', Σ_"+funcInfo.protect+");\n";
		}
		else {
			code += "Σ_"+scope.getUID()+".addFunction("+identifier+", '"+funcInfo.fnid+"');\n";
		}
		
		code += identifier+".prototype = "+Scope._processVariable(scope, func.prototype, functionTable)+";\n";
		
		var props = removeFromArray(Object.keys(func), THINGSJS_RESERVED);
//		console.log(Object.keys(func), props);
		
		for (var i=0; i < props.length; i++){
			
			if (typeof func[props[i]] !== 'function'){
				code += identifier+"."+props[i]+" = "+Scope._processVariable(scope, func[props[i]], functionTable)+";\n";	
			}
			else {
//				console.log("___ CREATING CHILD FUNCTIONS ___"+props[i]);
				code += identifier+"."+props[i]+" = "+func[props[i]].name+";\n";
			}
		}
		
		func.__processed = true;
	}
	return code;
};
Scope._processScope = function(scope, functionTable){
	var code = "";
	var scopeCreator = null;
	if (scope.creator){
		//Scope was created by a function
		
		scopeCreator = functionTable[scope.creator];
		
		code += "var Σ_"+scope.getUID()+" = new things_js.Scope('"+scope.name+"', Σ_"+scope.parent.getUID()+", '"+scope.creator+"', '"+scope.uid+"');\n";
		
		for (var varName in scope.params){
			code += "Σ_"+scope.getUID()+".params['"+varName+"'] = "+varName+";\n";
		}
	}
	
	for (var varName in scope.requires){
		code += "var "+varName+" = require('"+scope.requires[varName]+"');\n";
		code += "Σ_"+scope.getUID()+".requires['"+varName+"'] = '"+scope.requires[varName]+"';\n";
	}
	
	for (var funcName in scope.functions){
		code += Scope._processFunction(scope, scope.functions[funcName], functionTable);
	}
	
	var processAfter = {};
	for (var varName in scope.variables){
//		console.log(varName);
		try {
			code += "var "+varName+" = "+Scope._processVariable(scope, scope.variables[varName], functionTable)+";\n";
			
			if (typeof scope.variables[varName] === 'function'
				&& scope.variables[varName].pScope.uid === scope.uid ){
				var func = functionTable[scope.variables[varName].fnid];
				if (func.protect){
					code += "Σ_"+scope.getUID()+".addFunction("+varName+", '"+func.fnid+"', Σ_"+func.protect+");\n";
				}
				else {
					code += "Σ_"+scope.getUID()+".addFunction("+varName+", '"+func.fnid+"');\n";	
				}
			}
			
			code += "Σ_"+scope.getUID()+".variables['"+varName+"'] = "+varName+";\n";
		}
		catch (err){
			if (err.type === "ChildScopeUninitialized"){
				console.log("Child Scope Unavailable for : "+scope.name+" . "+varName);
//				console.log(err.value);
				processAfter[varName] = scope.variables[varName];
				
				code += "var "+varName+";\n";
				code += "Σ_"+scope.getUID()+".variables['"+varName+"'] = "+varName+";\n";
			}
			else {
				console.log("ERROR Processing (top-down pass) : "+varName);
				console.log(scope.variables[varName]);
				console.log(err);
				throw err;
			}
		}
	}
	
	for (var child in scope.children){
		code += Scope._processScope(scope.children[child], functionTable);
	}
	
	// process variables that failed due to dependent scopes being uninitialized
//	console.log("----- PROCESSING FAILED VARIABLES -----");
	for (var varName in processAfter){
		code += varName+" = "+Scope._processVariable(scope, scope.variables[varName], functionTable, true)+";\n";
		code += "Σ_"+scope.getUID()+".variables['"+varName+"'] = "+varName+";\n";
	}
	
	var signature = Object.keys(scope.params).join(", ");
	
	var args = [];
	for (var varName in scope.params){
		var snippet = Scope._processVariable(scope, scope.params[varName], functionTable, true);
		if (typeof scope.params[varName] === 'function'){
//			console.log("Param "+varName, scope.params[varName]);
			args.push("Σ_global.getScope('"+scope.params[varName].pScope.getURI()+"').functions['"+scope.params[varName].name+"']")
			
		}
		else {
			args.push(snippet)
		}
	}
	args = args.join(", ");
	
	code = "(function("+signature+"){"+code+"}("+args+"));\n";
	return code;
};
Scope._processTimers = function(snapshot){
	var code = ""
	snapshot.timers.timeouts.map(function(timer){
		code += "(function(){ var callback = Σ_global.getScope('"+timer.scope.getURI()+"').functions['"+timer.callback.name+"']; Σ_global.setTimeout(callback, "+timer.timedelta+", '"+timer.id+"'); }());\n";
	});
	snapshot.timers.intervals.map(function(timer){
//		console.log(timer.scope.getURI()+"."+timer.callback.name+" Elapsed = "+(timer.timedelta - (timer.stoppedAt - timer.clearedAt)));
//		console.log(timer.getRemainingTime());
		code += "(function(){ var callback = Σ_global.getScope('"+timer.scope.getURI()+"').functions['"+timer.callback.name+"']; setTimeout(function(){ callback(); Σ_global.setInterval(callback, "+timer.timedelta+", '"+timer.id+"'); }, "+timer.getRemainingTime()+") }());\n";
	});
	snapshot.timers.immediates.map(function(timer){
		code += "(function(){ var callback = Σ_global.getScope('"+timer.scope.getURI()+"').functions['"+timer.callback.name+"']; Σ_global.setImmediate(callback, '"+timer.id+"'); }());\n";
	});
	return code;
};
Scope._processFunctionTable = function(snapshot){
	var code = "Σ_global.functionTable = {\n";
	for (var funcKey in snapshot.functionTable){
		var func = snapshot.functionTable[funcKey];
		code += "'"+funcKey+"' : { scope: '"+func.scope
								+"', name: '"+func.name
								+"', fnid: '"+func.fnid
								+"', assignedName: '"+func.assignedName
								+"', fullIdentifier: '"+func.fullIdentifier
								+"', hoisted: "+func.hoisted
								+", protect: '"+(func.protect || "")
								+"', signature: '"+func.signature
								+"', code: `"+func.code+"`, prototypeFunctions: { "
								+Object.keys(func.prototypeFunctions).map(function(key){ return key+" : '"+func.prototypeFunctions[key]+"'" }).join(", ")
								+" }, isProtoFunctionOf: '"+func.isProtoFunctionOf+"' },\n";
	}
	code += "};"
	return code;
};
Scope.generateProgram = function(snapshot){
	snapshot.migrationCount += 1;
	
	var header = `var things_js = require('things-js');
	  			  var Σ_global = new things_js.Scope('global');
	  			  Σ_global.setPubsub('${snapshot.codeId}', '${snapshot.pubsubUrl}', ${snapshot.migrationCount})`;
	
	var closures = Scope._processScope(snapshot.scopeTree, snapshot.functionTable);
	var functionTable = Scope._processFunctionTable(snapshot);
	var timers = Scope._processTimers(snapshot);
	
	var program = header + ".then(function(){\n" + closures + timers + "\n});\n" + functionTable;
	
	//MEASUREMENT:
	MEASUREMENTS['restore'].end = Date.now();
	console.log("<CODE> ["+snapshot.codeId+"] : Restoration time - "+(MEASUREMENTS['restore'].end - MEASUREMENTS['restore'].start)+" ms");
	
	if (DEBUG_MODE){
		fs.appendFileSync("records/restoration.log", (snapshot.codeId+";"+(MEASUREMENTS['restore'].end - MEASUREMENTS['restore'].start)+"\n") );
		return jsBeautify(program, { indent_size: 4 });	
	}
	else return program;
};
Scope.restore = function(snapshotString){
	//MEASUREMENT:
	MEASUREMENTS['restore'] = { start: Date.now(), end: undefined };
	
	var snapshot = Scope.deserialize(snapshotString);
	var program = Scope.generateProgram(snapshot);
	return { codeId: snapshot.codeId, pubsubUrl: snapshot.pubsubUrl, code: program, migrationCount: snapshot.migrationCount };
};
Scope.flush = function(scope, codeId){
	
	scope._timers['timeouts'] = [];
	scope._timers['intervals'] = [];
	scope._timers['immediates'] = [];
	
	scope.functionTable = undefined;
	
};

module.exports = Scope;