var fs = require('fs');
var EventEmitter = require('events').EventEmitter;
var chalk = require('chalk');
var Pubsub = require('./Pubsub.js');
var helpers = require('../helpers.js');

var ENGINE_REGISTRY_NAMESPACE = 'engine-registry';
var PROGRAM_MONITOR_NAMESPACE = 'program-monitor';

/** Engine provides a **client-side** interface for CodeEngine.
 *    Similar object is defined in the client-side library "things.js"
 */
function Engine(dispatcher, id, meta){
	var self = this;
	this.dispatcher = dispatcher;
	this.pubsub = dispatcher.pubsub;
	this.id = id;
	this.meta = meta;
	this.status = "unknown";
	this.stats = [];
	this.console = [];
	this.codes = {};

	this._requests = {};
	this.pubsub.subscribe(this.dispatcher.id+'/'+this.id, function(message, topic){
		if (message.reply_id in self._requests){
			self._requests[message.reply_id].resolve(message.payload);
			clearTimeout(self._requests[message.reply_id].timer);
			delete self._requests[message.reply_id];
		}
		else {
			console.log(chalk.red('[Dispatcher:'+this.dispatcher.id+'] Received unexpected message'));
		}
	});

	this.pubsub.subscribe(this.id+'/resource', function(message, topic){
		self.stats.push(message);
	});
	this.pubsub.subscribe(this.id+'/console', function(message, topic){
		// console.log(message);
		message.forEach(function(line){
			self.console.push(line);
			if (self.console.length > 200) self.console.shift();
		});
	})
	console.log('Engine '+id+' connected');
}
Engine.prototype.getStat = function(){
	return this.stats[this.stats.length-1];
}
Engine.prototype.sendCommand = function(ctrl, kwargs){
	var self = this;
	var deferred = helpers.defer();
	var request_id = helpers.randKey(16);
	this._requests[request_id] = deferred;
	this.pubsub.publish(this.id+'/cmd', {
		request_id: request_id,
		reply_to: this.dispatcher.id+'/'+this.id,
		ctrl: ctrl,
		kwargs: kwargs
	})
	deferred.timer = setTimeout(function(){
		if (request_id in self._requests){
			deferred.reject('PubsubCommandTimeout');
			delete self._requests[request_id];
		}
	}, 10000); // assume failure if reply not received
	return deferred.promise
}
Engine.prototype.runCode = function(code_name, source){
	return this.sendCommand('run_code', {
		mode: 'raw',
		code_name: code_name,
		source: source
	});
}
// Engine.prototype.pauseCode = function(code_name, instance_id){
// 	return this.sendCommand('pause_code', {
// 		code_name: code_name,
// 		instance_id: instance_id
// 	});
// }
// Engine.prototype.resumeCode = function(code_name, instance_id){
// 	return this.sendCommand('resume_code', {
// 		code_name: code_name,
// 		instance_id: instance_id
// 	});
// }
Engine.prototype.killCode = function(code_name, instance_id){
	return this.sendCommand('kill_code', {
		code_name: code_name,
		instance_id: instance_id
	});
}
Engine.prototype.migrateCode = function(code_name, instance_id, target_engine){
	return this.sendCommand('migrate_code', {
		code_name: code_name,
		instance_id: instance_id,
		engine: target_engine
	});
}
Engine.prototype.spawnCode = function(code_name, instance_id, target_engines){
	return this.sendCommand('spawn_code', {
		code_name: code_name,
		instance_id: instance_id,
		engines: target_engines
	});
}

/** Program provides a **client-side** interface for CodeEngine.
 */
function Program(dispatcher, code_name, instance_id, source){
	var self = this;
	this.dispatcher = dispatcher;
	this.pubsub = dispatcher.pubsub;
	this.code_name = code_name;
	this.id = instance_id;
	this.source = source;
	this.status = undefined;
	this.engine = undefined;

	this.stats = [];
	this.console = [];
	this.snapshots = [];

	this._requests = {};
	this.pubsub.subscribe(this.dispatcher.id+'/'+this.id, function(message, topic){
		// console.log(message);
		if (message.reply_id in self._requests){
			self._requests[message.reply_id].resolve(message.payload);
			clearTimeout(self._requests[message.reply_id].timer);
			delete self._requests[message.reply_id];
		}
		else {
			console.log(chalk.red('[Dispatcher:'+this.dispatcher.id+'] Received unexpected message'));
		}
	});
	this.pubsub.subscribe(this.code_name+'/'+this.id+'/resource', function(message, topic){
		self.stats.push(message);
		// console.log(message);
	});
	this.pubsub.subscribe(this.code_name+'/'+this.id+'/console', function(message, topic){
		message.forEach(function(line){
			self.console.push(line);
		});
		// console.log(message);
	});
	this.pubsub.subscribe(this.code_name+'/'+this.id+'/snapshots', function(message, topic){
		self.snapshots.push(message);
		// console.log(message);
	});
}
Program.prototype.getStat = function(){
	return this.stats[this.stats.length-1];
}
Program.prototype.sendCommand = function(ctrl, kwargs){
	var self = this;
	var deferred = helpers.defer();
	var request_id = helpers.randKey(16);
	self._requests[request_id] = deferred;
	self.pubsub.publish(self.code_name+'/'+self.id+'/cmd', {
		request_id: request_id,
		reply_to: self.dispatcher.id+'/'+self.id,
		ctrl: ctrl,
		kwargs: kwargs
	})
	deferred.timer = setTimeout(function(){
		if (request_id in self._requests){
			deferred.reject('PubsubCommandTimeout');
			delete self._requests[request_id];
		}
	}, 10000); // assume failure if reply not received
	
	// console.log(self._requests);
	return deferred.promise
}
Program.prototype.pause = function(){
	return this.sendCommand('pause')
}
Program.prototype.resume = function(){
	return this.sendCommand('resume')
}
Program.prototype.kill = function(){
	return this.sendCommand('kill')
}

/**
 * This object is used to control the CodeEngine instances in the network (i.e. connected to the same Pub/Sub service)
 * @constructor
 * @param {object} config - Configuration for the Dispatcher
 * @param {string} config.pubsub_url - URL of the Pub/Sub server. Defaults to mqtt://localhost
 * @param {object} options - options object for customizing Dispatcher behaviour
 */
function Dispatcher(config, options){
	EventEmitter.call(this);
	var self = this;
	this.config = Object.assign({
		pubsub_url: 'mqtt://localhost'
	}, config);
	this.id = (this.config.id || 'dispatcher-'+helpers.randKey());
	this.options = Object.assign({}, options);
	console.log(chalk.green('[Dispatcher:'+this.id+'] Initialized'));

	this.pubsub = new Pubsub(this.config.pubsub_url);
	
	this.engines = {};
	this.programs = {};

	this.pubsub.subscribe(ENGINE_REGISTRY_NAMESPACE, function(message, topic){
		// self.engines[message.id] = message;
		// console.log(chalk.green('[Dispatcher:'+self.id+'] engine status update ')+message.id+' - '+message.status);
		
		// console.log(topic, message);
		if (!(message.id in self.engines)){
			self.engines[message.id] = new Engine(self, message.id, message.meta);
		}
		self.engines[message.id].status = message.status;
		self.engines[message.id].meta = message.meta;
		self.engines[message.id].codes = message.codes;
		// console.log(self.engines);
		// self.emit('update');
		// self.printEngines();
		self.emit('engine-registry-update', self.engines[message.id], message);
	});

	this.pubsub.subscribe(PROGRAM_MONITOR_NAMESPACE, function(message, topic){
		// self.engines[message.id] = message;
		// console.log(chalk.green('[Dispatcher:'+self.id+'] engine status update ')+message.id+' - '+message.status);
		// self.printEngines();

		// console.log(topic, message);
		if (!(message.instance_id in self.programs)){
			self.programs[message.instance_id] = new Program(self, message.code_name, message.instance_id, message.source);
		}
		self.programs[message.instance_id].engine = message.engine;
		self.programs[message.instance_id].status = message.status;
		if (message.source) self.programs[message.instance_id].source = message.source;

		// self.printPrograms();
		self.emit('program-monitor-update', self.programs[message.instance_id], message);
	});

	this.pubsub.on('ready', function(){
		self.emit('ready');
		console.log(chalk.green('[Dispatcher:'+self.id+'] connected to Pub/Sub at '+self.pubsub.url));
		self.requestStatusReports();
	});
};
Dispatcher.prototype = new EventEmitter();
Dispatcher.prototype.constructor = Dispatcher;

/**
 * Send command to a CodeEngine to run a program.
 * @param  {string} engine_id - The ID of the CodeEngine instance
 * @param  {string} code_name - Human readable code name (e.g. example.js)
 * @param  {string} source - Source code in UTF-8 string
 * @return {Promise} - The Promise object returned is resolved when Dispatcher receives acknowledgment from the CodeEngine.
 */
Dispatcher.prototype.runCode = function(engine_id, code_name, source){
	return this.engines[engine_id].runCode(code_name, source);
};

/**
 * [moveCode description]
 * @param  {String} from_id     [description]
 * @param  {String} to_id       [description]
 * @param  {String} code_name   [description]
 * @param  {String} instance_id [description]
 * @return {Promise}             [description]
 */
Dispatcher.prototype.moveCode = function(from_id, to_id, code_name, instance_id){
	return this.engines[from_id].migrateCode(code_name, instance_id, to_id);
};

/**
 * [spawnCode description]
 * @param  {String} from_id     [description]
 * @param  {Array} to_ids      [description]
 * @param  {String} code_name   [description]
 * @param  {String} instance_id [description]
 * @return {Promise}             [description]
 */
Dispatcher.prototype.spawnCode = function(from_id, to_ids, code_name, instance_id){
	return this.engines[from_id].spawnCode(code_name, instance_id, to_ids);
};

/**
 * [pauseCode description]
 * @param  {String} instance_id [description]
 * @return {Promise}             [description]
 */
Dispatcher.prototype.pauseCode = function(instance_id){
	// return this.engines[engine_id].pauseCode(code_name, instance_id);
	return this.programs[instance_id].pause();
};

/**
 * [resumeCode description]
 * @param  {String} instance_id [description]
 * @return {Promise}             [description]
 */
Dispatcher.prototype.resumeCode = function(instance_id){
	// return this.engines[engine_id].pauseCode(code_name, instance_id);
	return this.programs[instance_id].resume();
};

/**
 * [killCode description]
 * @param  {String} instance_id [description]
 * @return {Promise}             [description]
 */
Dispatcher.prototype.killCode = function(instance_id){
	// return this.engines[engine_id].killCode(code_name, instance_id);
	return this.programs[instance_id].kill();
};

/**
 * [kill description]
 * @return {Promise} [description]
 */
Dispatcher.prototype.kill = function(){
	console.log(chalk.green('[Dispatcher:'+this.id+'] Killed gracefully'));
	return this.pubsub.kill()
};

var ACTION_MAP = {
	'run': 'runCode',
	'pause': 'pauseCode',
	'resume': 'resumeCode',
	'kill': 'killCode',
	'migrate': 'moveCode'
};
/** 
 * Apply the given list of actions concurrently
 * @param  {Array} actions - Array of objects describing actions to perform
 * @return {Promise} - Promise that resolves when all actions are successful
 */
Dispatcher.prototype.applyActions = function(actions){
	var self = this;
	var promises = actions.map(function(action){
		return self[ACTION_MAP[action.type]].apply(self, action.args);
	});
	return Promise.all(promises);
};

/**
 * Send a Pub/Sub broadcast message to request status reports from all the CodeEngine instances
 * @return {undefined} - Does not return anything, as we cannot know for sure if all CodeEngines have reported.
 */
Dispatcher.prototype.requestStatusReports = function(){
	this.pubsub.publish(ENGINE_REGISTRY_NAMESPACE+'/bcast', { ctrl: 'report' });
	this.pubsub.publish(PROGRAM_MONITOR_NAMESPACE+'/bcast', { ctrl: 'report' });
};

Dispatcher.prototype.printEngines = function(){
	return console.log(Object.values(this.engines).map(function(engine){
		return [engine.id, (engine.status === 'idle' ? chalk.green(engine.status) : chalk.red(engine.status))].join('\t')
	}).join('\n'));
};
Dispatcher.prototype.printPrograms = function(){
	return console.log(Object.values(this.programs).map(function(program){
		return [program.id, (program.status === 'idle' ? chalk.green(program.status) : chalk.red(program.status))].join('\t')
	}).join('\n'));
};

module.exports = Dispatcher;