var fs = require('fs');
var chalk = require('chalk');
var Pubsub = require('./Pubsub.js');
var Code = require('./Code.js');
var helpers = require('../helpers.js');

function Dispatcher(config, options){
	var self = this;
	this.config = Object.assign({
		pubsub_url: 'mqtt://localhost'
	}, config);
	this.id = (this.config.id || 'dispatcher-'+helpers.randKey());
	this.options = Object.assign({}, options);
	console.log(chalk.green('[Dispatcher:'+this.id+'] Initialized'));

	this.pubsub = new Pubsub(this.config.pubsub_url);
	
	this.engines = {};

	this.pubsub.on('ready', function(){
		console.log(chalk.green('[Dispatcher:'+self.id+'] connected to Pub/Sub at '+self.pubsub.url));
	});
	this.pubsub.subscribe('engine-registry', function(message){
		self.engines[message.id] = message;
		// console.log(chalk.green('[Dispatcher:'+self.id+'] engine status update ')+message.id+' - '+message.status);
		self.printEngines();
	});
};
Dispatcher.prototype.sendCommand = function(engine_id, ctrl, kwargs){
	this.pubsub.publish(engine_id+'/cmd', { 
		ctrl: ctrl,
		kwargs: kwargs
	});
};
Dispatcher.prototype.runCode = function(engine_id, code){
	this.sendCommand(engine_id, 'run_code', {
		// mode: 'raw',
		mode: 'file_system',
		code_name: code,
		source: code
	})
};
Dispatcher.prototype.moveCode = function(from_id, to_id, code_name){
	this.sendCommand(from_id, 'migrate_code', {
		engine: to_id,
		code_name: code_name
	})
};
Dispatcher.prototype.spawnCode = function(from_id, to_ids, code_name){
	this.sendCommand(from_id, 'spawn_code', {
		engines: to_ids,
		code_name: code_name
	})
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

module.exports = Dispatcher;