var fs = require('fs');
var os = require('os');
var EventEmitter = require('events').EventEmitter;
var pidusage = require('pidusage');
var chalk = require('chalk');
var Pubsub = require('./Pubsub.js');
var Code = require('./Code.js');
var helpers = require('../helpers.js');

var DEBUG = (process.env.DEBUG === 'true') || false;

var DEFAULT_PUBSUB_URL = 'mqtt://localhost';
var ENGINE_REGISTRY_NAMESPACE = 'engine-registry';
var PROGRAM_MONITOR_NAMESPACE = 'program-monitor';	// Pubsub topic for code status

/**
 * CodeEngine is an abstraction for a "worker" in a ThingsJS network.
 * A CodeEngine instance connects to the Publish/Subscribe service at the provided URL.
 * Once connected, CodeEngine listens for incoming commands by subscribing to a unique topic. (e.g. "${engine.id}/cmd")
 * @constructor
 * @param {Object} config - The configuration object used to initialize the CodeEngine instance
 * @param {string} config.pubsub_url - URL of the Publish/Subscribe service
 * @param {string} [config.id] - ID to assign to the CodeEngine instance
 * @param {Object} [options] - Additional options object for customizing the CodeEngine behaviour
 */
function CodeEngine(config, options){
	if (!(this instanceof CodeEngine)) return new CodeEngine(config, options);
	EventEmitter.call(this);
	var self = this;
	this.config = Object.assign({
		pubsub_url: DEFAULT_PUBSUB_URL
	}, config);
	this.id = (this.config.id || 'engine-'+helpers.randKey());
	this.options = Object.assign({
		mute_code_output: false
	}, options);
	console.log(chalk.green('[Engine:'+this.id+'] Initialized'));

	this.pubsub = new Pubsub(this.config.pubsub_url);
	this.status = 'idle';
	this.codes = {};
	this.procs = {};

	this.reportTimer = null;

	this._requests = {};

	this.pubsub.on('ready', function(){
		self.emit('ready');
		self.reportStatus('boot');
		console.log(chalk.green('[Engine:'+self.id+'] connected to Pub/Sub at '+self.pubsub.url));
	});
	this.pubsub.subscribe(this.id+'/cmd', function(message){
		if (message.ctrl in CodeEngine.Behaviours){
			CodeEngine.Behaviours[message.ctrl](self, message.kwargs)
				.then(function(result){
					// console.log(result);
					self.reportStatus(message.ctrl);

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

/**
 * Publish its status to ENGINE_REGISTRY_NAMESPACE
 * @param  {String} eventName - In addition to the default message published, the message object can have an additional "eventName" field to further categorize the message.
 * @return {Promise} - resolves to `true`, as per Pubsub.prototype.publish
 */
CodeEngine.prototype.reportStatus = function(eventName){
	var self = this;
	var codes = {};
	var busy = false;
	// Object.keys(this.codes).forEach(function(code_name){
	// 	codes[code_name] = {};
	// 	Object.keys(self.codes[code_name].processes).forEach(function(instance_id){
	// 		codes[code_name][instance_id] = self.codes[code_name].processes[instance_id].status;
	// 		busy = busy || (self.codes[code_name].processes[instance_id].status === 'Running');
	// 	})
	// });
	var procs = {};
	Object.keys(this.procs).forEach(function(instance_id){
		procs[instance_id] = self.procs[instance_id].toJSON();
	});

	var codes = {};
	Object.values(this.procs).forEach(function(proc){
		if (!(proc.code.name in codes)) codes[proc.code.name] = {};
		codes[proc.code.name][proc.id] = proc.status;
		busy = busy || (proc.status === 'Running');
	})

	this.status = (eventName === 'kill') ? 'dead' : (busy ? 'busy' : 'idle');
	return this.pubsub.publish(ENGINE_REGISTRY_NAMESPACE, {
		id: this.id,
		status: this.status,
		meta: {
			device: this.config.device
		},
		codes: codes,
		procs: procs,
		eventName: eventName
	})
	// The following catch is added for cases where the Pubsub object is already killed.
	// It can happen when a Pubsub object is killed before the CodeEngine is gracefully killed.
	// In such cases, reportStatus failure can be tolerated (Pubsub is "down")
	// However, this scenario should happen in exceptional cases such as when running unit tests.
	.catch(function(err){
		(DEBUG && console.log("Failed to report Engine status", err))
	})
}

/**
 * Publish its resource usage
 * @return {undefined} [description]
 */
CodeEngine.prototype.reportResource = function(){
	var self = this;
	pidusage.stat(process.pid, function(err, stat) {
		self.pubsub.publish(self.id+'/resource', {
			timestamp: Date.now(),
			memory: process.memoryUsage(),
			cpu: stat.cpu,
			device_memory: os.freemem()
		})
		// The following catch is added for cases where the Pubsub object is already killed.
		// It can happen when a Pubsub object is killed before the CodeEngine is gracefully killed.
		// In such cases, reportStatus failure can be tolerated (Pubsub is "down")
		// However, this scenario should happen in exceptional cases such as when running unit tests.
		.catch(function(err){
			(DEBUG && console.log("Failed to report Engine statistics", err))
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

/** 
 * Augmented console.log function for debugging purposes,
 * the log is published to pubsub so we can see the debug messages on the dashboard as well
 */
CodeEngine.prototype.log = function(){
	console.log.apply(null, arguments);
	this.pubsub.publish(this.id+'/console', Array.from(arguments));
}

/** [restore_code description] */
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

/** [restore_code description] */
CodeEngine.prototype.restore_code = function(kwargs){
	return CodeEngine.Behaviours.restore_code(this, kwargs);
}

/** [migrate_code description] */
CodeEngine.prototype.migrate_code = function(kwargs){
	return CodeEngine.Behaviours.migrate_code(this, kwargs);
}
/* End of Behaviour functions */

/** [kill description] */
CodeEngine.prototype.kill = function(){
	var self = this;
	this.status = 'dead';
	clearInterval(this.reportTimer);

	return Promise.all(([self.reportStatus('kill')])
			.concat(Object.values(self.codes)
				.map(function(code){
					return code.kill(self.pubsub !== code.pubsub);
				})
			)
		)
		.then(function(){
			console.log(chalk.green('[Engine:'+self.id+'] Killed gracefully'));
			return self.pubsub.kill()
		}).catch(function(err){
			console.log(err);
			console.log(chalk.green('[Engine:'+self.id+'] Killed forcibly'));
			return self.pubsub.kill()
		});
}

CodeEngine.validateConfig = function(file_path){
	var config = fs.readFileSync(file_path).toString().trim();
	config = JSON.parse(config);
	config.pubsub_url = config.pubsub_url || DEFAULT_PUBSUB_URL;
	return config;
}

/* @type {Object} [description] */
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

/** CodeEngine Behaviours are a set of functions with the following
 *  signature: function(self, kwargs), where self points to the
 *  CodeEngine instance, and kwargs is an object carrying
 *  additional arguments. The function must return a Promise object
 *  that resolves to a JSON-serializable object; the result will be
 *  transmitted over the network via HTTP/MQTT.
 *  These functions are invoked when a CodeEngine receives a message.
 */
CodeEngine.Behaviours = {
	/**
	 * Run the given code as a ThingsJS process.
	 * @param  {CodeEngine} self - The CodeEngine instance to run on
	 * @param  {object} kwargs - extra arguments
	 * @param  {object} kwargs.source - the source code to run
	 * @param  {object} [kwargs.code_name] - name to assign to the Code instance
	 * @return {Promise} - resolves to the JSON object representing a ThingsJS process
	 */
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

		return code.run({ engine: self.id, silent: self.options.mute_code_output })
			.then(function(instance){
				self.procs[instance.id] = instance;
				instance.on('status-update', function(status){
					self.reportStatus('process-status');
				})
				return instance.toJSON();
				// return {
				// 	engine: self.id,
				// 	id: instance.id,
				// 	pid: instance.obj.pid,
				// 	status: instance.status
				// }
			})
	},
	// kill_code: function(self, kwargs){
	// 	return self.codes[kwargs.code_name].processes[kwargs.instance_id].kill();
	// },
	// pause_code: function(self, kwargs){
	// 	return self.codes[kwargs.code_name].pause(kwargs.instance_id);
	// },
	// resume_code: function(self, kwargs){
	// 	return self.codes[kwargs.code_name].resume(kwargs.instance_id)
	// },
	// snapshot_code: function(self, kwargs){
	// 	return self.codes[kwargs.code_name].snapshot(kwargs.instance_id)
	// },
	/**
	 * Restore the given JSON snapshot as a ThingsJS process.
	 * @param  {CodeEngine} self - The CodeEngine instance to run on
	 * @param  {object} kwargs - extra arguments
	 * @param  {object} kwargs.snapshot - the JSON snapshot
	 * @return {Promise} - resolves to the JSON object representing a ThingsJS process
	 */
	restore_code: function(self, kwargs){
		// console.log(kwargs.snapshot);
		var code = Code.fromSnapshot(kwargs.snapshot);
		self.log('Executing : '+code.name+' (Restored)');
		(DEBUG && console.log(code.source));
		self.codes[code.name+'-'+kwargs.snapshot.meta.timestamp] = code;
		return code.run({ engine: self.id, silent: self.options.mute_code_output })
			.then(function(instance){
				self.procs[instance.id] = instance;
				instance.on('status-update', function(status){
					self.reportStatus('process-status');
				})
				return {
					engine: self.id,
					id: instance.id,
					pid: instance.pid,
					status: instance.status
				}
			})
	},
	/**
	 * Migrate the specified ThingsJS process to another CodeEngine.
	 * @param  {CodeEngine} self - The CodeEngine instance to migrate from
	 * @param  {object} kwargs - extra arguments
	 * @param  {object} kwargs.instance_id - the ID of the ThingsJS process
	 * @param  {object} kwargs.engine - the ID of the CodeEngine to migrate to
	 * @return {Promise} - resolves to the JSON object representing a ThingsJS process
	 */
	migrate_code: function(self, kwargs){
		// return self.codes[kwargs.code_name].processes[kwargs.instance_id].snapshot(true)
		return self.procs[kwargs.instance_id].snapshot(true)
					.then(function(snapshot){
						// self.codes[kwargs.code_name].processes[kwargs.instance_id].kill();
						self.procs[kwargs.instance_id].kill();
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