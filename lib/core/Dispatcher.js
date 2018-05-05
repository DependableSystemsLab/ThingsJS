var fs = require('fs');
var EventEmitter = require('events').EventEmitter;
var chalk = require('chalk');
var Pubsub = require('./Pubsub.js');
var Code = require('./Code.js');
var helpers = require('../helpers.js');

var ENGINE_REGISTRY_NAMESPACE = 'engine-registry';
var PROGRAM_MONITOR_NAMESPACE = 'program-monitor';

/** Engine is a client-side abstraction for CodeEngine.
 *    Similar object is defined in the client-side library "things.js"
 */
function Engine(pubsub, id, meta){
	var self = this;
	this.pubsub = pubsub;
	this.id = id;
	this.meta = meta;
	this.status = "unknown";
	this.stats = [];
	this.console = [];
	this.codes = {};

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
Engine.prototype.runCode = function(code_name, source){
	this.pubsub.publish(this.id+'/cmd', {
		ctrl: 'run_code',
		kwargs: {
			mode: 'raw',
			code_name: code_name,
			source: source
		}
	})
}
Engine.prototype.pauseCode = function(code_name, instance_id){
	this.pubsub.publish(this.id+'/cmd', {
		ctrl: 'pause_code',
		kwargs: {
			code_name: code_name,
			instance_id: instance_id
		}
	})
}
Engine.prototype.resumeCode = function(code_name, instance_id){
	this.pubsub.publish(this.id+'/cmd', {
		ctrl: 'resume_code',
		kwargs: {
			code_name: code_name,
			instance_id: instance_id
		}
	})
}
Engine.prototype.migrateCode = function(code_name, instance_id, target_engine){
	this.pubsub.publish(this.id+'/cmd', {
		ctrl: 'migrate_code',
		kwargs: {
			code_name: code_name,
			instance_id: instance_id,
			engine: target_engine
		}
	})
}
Engine.prototype.spawnCode = function(code_name, instance_id, target_engines){
	this.pubsub.publish(this.id+'/cmd', {
		ctrl: 'spawn_code',
		kwargs: {
			code_name: code_name,
			instance_id: instance_id,
			engines: target_engines
		}
	})
}

/** 
 */
function Program(pubsub, code_name, instance_id, source){
	var self = this;
	this.pubsub = pubsub;
	this.code_name = code_name;
	this.id = instance_id;
	this.source = source;
	this.status = undefined;

	this.stats = [];
	this.console = [];
	this.snapshots = [];

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
			self.engines[message.id] = new Engine(self.pubsub, message.id, message.meta);
		}
		self.engines[message.id].status = message.status;
		self.engines[message.id].meta = message.meta;
		self.engines[message.id].codes = message.codes;
		// console.log(self.engines);
		// self.emit('update');
		self.printEngines();
	});

	this.pubsub.subscribe(PROGRAM_MONITOR_NAMESPACE, function(message, topic){
		self.engines[message.id] = message;
		// console.log(chalk.green('[Dispatcher:'+self.id+'] engine status update ')+message.id+' - '+message.status);
		// self.printEngines();

		// console.log(topic, message);
		if (!(message.instance_id in self.programs)){
			self.programs[message.instance_id] = new Program(self.pubsub, message.code_name, message.instance_id, message.source);
		}
		// self.programs[message.instance_id].engine = message.engine;
		self.programs[message.instance_id].status = message.status;
		if (message.source) self.programs[message.instance_id].source = message.source;

		self.printPrograms();
	});

	this.pubsub.on('ready', function(){
		console.log(chalk.green('[Dispatcher:'+self.id+'] connected to Pub/Sub at '+self.pubsub.url));
		self.pubsub.publish(ENGINE_REGISTRY_NAMESPACE+'/bcast', { ctrl: 'report' });
	});
};
Dispatcher.prototype = new EventEmitter();
Dispatcher.prototype.constructor = Dispatcher;

Dispatcher.prototype.runCode = function(engine_id, code_name, source){
	this.engines[engine_id].runCode(code_name, source);
};
Dispatcher.prototype.pauseCode = function(engine_id, code_name, instance_id){
	this.engines[engine_id].pauseCode(code_name, instance_id);
};
Dispatcher.prototype.moveCode = function(from_id, to_id, code_name, instance_id){
	this.engines[from_id].migrateCode(code_name, instance_id, to_id);
};
Dispatcher.prototype.spawnCode = function(from_id, to_ids, code_name, instance_id){
	this.engines[from_id].spawnCode(code_name, instance_id, to_ids);
};

Dispatcher.prototype.kill = function(){
	console.log(chalk.green('[Dispatcher:'+this.id+'] Killed gracefully'));
	return this.pubsub.kill()
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