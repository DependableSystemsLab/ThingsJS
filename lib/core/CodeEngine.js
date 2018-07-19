var fs = require('fs');
var EventEmitter = require('events').EventEmitter;
var pidusage = require('pidusage');
var os = require('os');
var chalk = require('chalk');
var Pubsub = require('./Pubsub.js');
var Code = require('./CodeV3.js');
var helpers = require('../helpers.js');

var DEBUG = (process.env.DEBUG === 'true') || false;

var DEFAULT_PUBSUB_URL = 'mqtt://localhost';
var ENGINE_REGISTRY_NAMESPACE = 'engine-registry';
var PROGRAM_MONITOR_NAMESPACE = 'program-monitor';	// Pubsub topic for code status

function CodeEngine(config, options){
	if (!(this instanceof CodeEngine)) return new CodeEngine(config, options);
	EventEmitter.call(this);
	var self = this;
	this.config = Object.assign({
		pubsub_url: DEFAULT_PUBSUB_URL
	}, config);
	this.id = (this.config.id || 'engine-'+helpers.randKey());
	this.options = Object.assign({}, options);
	console.log(chalk.green('[Engine:'+this.id+'] Initialized'));

	this.pubsub = new Pubsub(this.config.pubsub_url);
	this.status = 'idle';
	this.codes = {};

	this.reportTimer = null;

	this._requests = {};

	this.pubsub.on('ready', function(){
		self.emit('ready');
		self.reportStatus();
		console.log(chalk.green('[Engine:'+self.id+'] connected to Pub/Sub at '+self.pubsub.url));
	});
	this.pubsub.subscribe(this.id+'/cmd', function(message){
		if (message.ctrl in CodeEngine.Behaviours){
			CodeEngine.Behaviours[message.ctrl](self, message.kwargs)
				.then(function(result){
					// console.log(result);
					self.reportStatus();

					if (message.request_id && message.reply_to){
						self.pubsub.publish(message.reply_to, {
							reply_id: message.request_id,
							payload: result
						})
					}
				}, function(err){
					console.log(err);
				});
		}
		else if (message.reply_id){
			self._requests[message.reply_id].resolve(message.payload);
			clearTimeout(self._requests[message.reply_id].timer);
			delete self._requests[message.reply_id];
		}
		else {
			console.log(chalk.red('[Engine:'+self.id+'] Received unexpected message'));
		}
	});

	// Listen to broadcast messages
	this.pubsub.subscribe(ENGINE_REGISTRY_NAMESPACE+'/bcast', function(message){
		if (message.ctrl === 'report'){
			self.reportStatus();
		}
		else {
			console.log(chalk.blue('[Broadcast] ')+JSON.stringify(message));
		}
	})
	// this.pubsub.subscribe(PROGRAM_MONITOR_NAMESPACE+'/bcast', function(message){
	// 	if (message.ctrl === 'report'){
	// 		Object.values(self.codes).forEach(function(code){
	// 			code.reportStatus();
	// 		})
	// 	}
	// 	else {
	// 		console.log(chalk.blue('[Broadcast] ')+JSON.stringify(message));
	// 	}
	// })

	this.reportTimer = setInterval(function(){
		self.reportResource()
	}, 1000);
}
CodeEngine.prototype = new EventEmitter();
CodeEngine.prototype.constructor = CodeEngine;

CodeEngine.prototype.reportStatus = function(){
	var self = this;
	var codes = {};
	Object.keys(this.codes).forEach(function(code_name){
		codes[code_name] = {};
		Object.keys(self.codes[code_name].processes).forEach(function(instance_id){
			codes[code_name][instance_id] = self.codes[code_name].processes[instance_id].status;
		})
	})
	return this.pubsub.publish(ENGINE_REGISTRY_NAMESPACE, {
		id: this.id,
		status: this.status,
		meta: {
			device: this.config.device
		},
		codes: codes
	});
}
CodeEngine.prototype.reportResource = function(){
	var self = this;
	pidusage.stat(process.pid, function(err, stat) {
		self.pubsub.publish(self.id+'/resource', {
			timestamp: Date.now(),
			memory: process.memoryUsage(),
			cpu: stat.cpu,
			device_memory: os.freemem()
		})
	});
}
// Similar to Engine.prototype.sendCommand in Dispatcher.js, this should be used privately
CodeEngine.prototype.ackedPublish = function(topic, ctrl, kwargs){
	var self = this;
	var deferred = helpers.defer();
	var request_id = helpers.randKey(16);
	self._requests[request_id] = deferred;

	self.pubsub.publish(topic, {
		request_id: request_id,
		reply_to: self.id+'/cmd',
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

/** Augmented console.log function for debugging purposes, the log is published to pubsub */
CodeEngine.prototype.log = function(){
	console.log.apply(null, arguments);
	this.pubsub.publish(this.id+'/console', Array.from(arguments));
}
/** "Behaviour" functions
 *    the reason the following functions are defined in this particular style
 *    is because we consider these operations to be "behaviour"s in the actor model,
 *    which can be triggered by external signals. For example in our case the external signal comes from Pubsub.
 *    Of course, the functions can be called directly as well.
 */
CodeEngine.prototype.run_code = function(kwargs){
	return CodeEngine.Behaviours.run_code(this, kwargs);
}
// CodeEngine.prototype.pause_code = function(kwargs){
// 	return CodeEngine.Behaviours.pause_code(this, kwargs);
// }
// CodeEngine.prototype.resume_code = function(kwargs){
// 	return CodeEngine.Behaviours.resume_code(this, kwargs);
// }
// CodeEngine.prototype.snapshot_code = function(kwargs){
// 	return CodeEngine.Behaviours.snapshot_code(this, kwargs);
// }
CodeEngine.prototype.restore_code = function(kwargs){
	return CodeEngine.Behaviours.restore_code(this, kwargs);
}
CodeEngine.prototype.migrate_code = function(kwargs){
	return CodeEngine.Behaviours.migrate_code(this, kwargs);
}
/* End of Behaviour functions */

CodeEngine.prototype.kill = function(){
	var self = this;
	this.status = 'dead';
	clearInterval(this.reportTimer);
	Object.values(this.codes).forEach(function(code){
		code.kill();
	});
	return this.reportStatus()
		.then(function(){
			console.log(chalk.green('[Engine:'+self.id+'] Killed gracefully'));
			return self.pubsub.kill()
		})
}

CodeEngine.validateConfig = function(file_path){
	var config = fs.readFileSync(file_path).toString().trim();
	config = JSON.parse(config);
	config.pubsub_url = config.pubsub_url || DEFAULT_PUBSUB_URL;
	return config;
}

CodeEngine.initCode = {
	raw: function(self, kwargs){
		return Code.fromString(self.pubsub, kwargs.code_name, kwargs.source);
	},
	file_system: function(self, kwargs){
		return Code.fromFile(self.pubsub, kwargs.source);
	},
	repository: function(self, kwargs){
		return Code.fromFile(self.pubsub, kwargs.source);
	}
}
/**
 * Defines a set of "behaviours" for the CodeEngine. (Actor pattern)
 *   these behaviours are either triggered via Pubsub or directly called by the instance.
 *   All of these should return a Promise object as they are all asynchronous.
 */
CodeEngine.Behaviours = {
	run_code: function(self, kwargs){
		kwargs = Object.assign({
			mode: 'raw',
			code_name: helpers.randKey()
		}, kwargs);
		// console.log("RUN CODE ",kwargs);
		var code;
		if (kwargs.code_name in self.codes){
			code = self.codes[kwargs.code_name];
		}
		else {
			code = CodeEngine.initCode[kwargs.mode](self, kwargs);
			self.codes[code.name] = code;
		}

		self.log('Executing : '+code.name);
		(DEBUG && console.log(code.source));

		return code.run({ engine: self.id }).then(function(instance){
			instance.on('status-update', function(status){
				self.reportStatus();
			})
			return {
				engine: self.id,
				id: instance.id,
				pid: instance.obj.pid,
				status: instance.status
			}
		})
	},
	pause_code: function(self, kwargs){
		return self.codes[kwargs.code_name].pause(kwargs.instance_id);
	},
	kill_code : function(self,kwargs){
		return self.codes[kwargs.code_name].processes[kwargs.instance_id].kill();
	},
	// resume_code: function(self, kwargs){
	// 	return self.codes[kwargs.code_name].resume(kwargs.instance_id)
	// },
	// snapshot_code: function(self, kwargs){
	// 	return self.codes[kwargs.code_name].snapshot(kwargs.instance_id)
	// },
	restore_code: function(self, kwargs){
		// console.log(kwargs.snapshot);
		var code = Code.fromSnapshot(kwargs.snapshot);
		self.log('Executing : '+code.name+' (Restored)');
		(DEBUG && console.log(code.source));
		self.codes[code.name] = code;
		return code.run().then(function(instance){
			return {
				engine: self.id,
				id: instance.id,
				pid: instance.pid,
				status: instance.status
			}
		})
	},
	migrate_code: function(self, kwargs){
		return self.codes[kwargs.code_name].processes[kwargs.instance_id].snapshot(true)
					.then(function(snapshot){
						self.codes[kwargs.code_name].processes[kwargs.instance_id].kill();
						return self.ackedPublish(kwargs.engine+'/cmd', 'restore_code', { snapshot: snapshot });
					})
	},
	// Experimental
	spawn_code: function(self, kwargs){
		return self.codes[kwargs.code_name].processes[kwargs.instance_id].snapshot(true)
			.then(function(snapshot){
				var promises = [];
				kwargs.engines.forEach(function(engine_id){
					promises.push(self.ackedPublish(engine_id+'/cmd', 'restore_code', { snapshot: snapshot }));
				})
				return Promise.all(promises);
			})
	}
}

module.exports = CodeEngine