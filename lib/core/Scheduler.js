var EventEmitter = require('events').EventEmitter;
var Dispatcher = require('./Dispatcher.js');
var helpers = require('../helpers.js');
var chalk = require('chalk');

var DEBUG = true;

function Scheduler(config){
	if (!(this instanceof Scheduler)) return new Scheduler(config);
	config = Object.assign(config, {
		id: (config.id || 'scheduler-'+helpers.randKey())
	})
	Dispatcher.call(this, config);
	var self = this;

	self.history = [];
	self.queue = [];

	this.pubsub.subscribe(this.id+'/cmd', function(message){
		if (message.ctrl in Scheduler.Behaviours){
			Scheduler.Behaviours[message.ctrl](self, message.kwargs)
				.then(function(result){
					// console.log(result);
					// self.reportStatus();

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
			console.log(chalk.red('[Scheduler:'+self.id+'] Received unexpected message'));
		}
	});

	self.on('engine-registry-update', function(engine, message){
		console.log('Engine Registry Updated', engine.id);
		// console.log(message);
		self.logEvent('engine-registry-update', {
			engine: engine.id,
			status: engine.status,
			eventName: message.eventName,
			codes: engine.codes
		});
	});
	self.on('program-monitor-update', function(program, message){
		console.log('Program Monitor Updated', program.code_name+':'+program.id);
		self.logEvent('program-monitor-update', {
			code_name: program.code_name,
			instance_id: program.id,
			engine: program.engine,
			status: program.status,
			eventName: message.eventName
		});
	});

	self.logEvent('scheduler-event', {
		phase: 'boot'
	});

	setInterval(function(){
		self.invoke();
	}, 10000);
}
Scheduler.prototype = Object.create(Dispatcher.prototype);
Scheduler.prototype.constructor = Scheduler;

Scheduler.prototype.ackedPublish = function(topic, ctrl, kwargs){
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

Scheduler.prototype.logEvent = function(type, data){
	var event = {
		key: helpers.randKey(16),
		timestamp: Date.now(),
		type: type,
		data: data
	};
	this.history.push(event);
	// console.log(event);
	this.pubsub.publish('scheduler/events', event);
}

Scheduler.prototype._assess = function(){
	var self = this;
	return new Promise(function(resolve, reject){
		var queue = self.queue;
		self.queue = [];

		var tasks = [];
		queue.forEach(function(request){
			for (var i=0; i < request.count; i++){
				tasks.push({
					id: request.code_name+':'+i,
					code_name: request.code_name,
					source: request.source,
					required_memory: 5,
					token: request.token
				})
			}
		});

		var mapping = {};
		Object.values(self.engines).forEach(function(engine){
			if (engine.status !== 'dead'){
				var stat = engine.getStat();
				mapping[engine.id] = {
					available_memory: (stat.device_memory / 1000000),
					processes: {}
				};
			}
		});

		Object.values(self.programs).forEach(function(proc){
			if (self.engines[proc.engine].status !== 'dead'){
				mapping[proc.engine].processes[proc.id] = {
					id: proc.id,
					code_name: proc.code_name,
					status: proc.status,
					resource: proc.getStat(),
					required_memory: 5
				};
			}
		});

		self.logEvent('scheduler-event', {
			phase: 'invoke',
			mapping: mapping
		});

		resolve({
			engines: Object.values(self.engines).filter(function(engine){ return engine.status !== 'dead' }).map(function(engine){ 
				engine.available_memory = (engine.getStat().device_memory / 1000000);
				return engine 
			}),
			// processes: Object.values(self.programs).map(function(proc){ proc.id = proc.instance_id; proc.required_memory = 50; return proc }),
			mapping: mapping,
			tasks: tasks
		})

	});
}
Scheduler.prototype._compute = function(state){
	var self = this;
	return new Promise(function(resolve, reject){
		console.log('Current Mapping', state.mapping);
		var new_mapping = Scheduler.Algorithms['first_fit'](state.engines, state.tasks, state.mapping);
		console.log('New Mapping', new_mapping);

		var actions = Scheduler.computeActions(state.mapping, new_mapping);

		// self.logEvent('scheduler-event', {
		// 	phase: 'compute',
		// 	mapping: new_mapping
		// });

		resolve({
			prev_mapping: state.mapping,
			mapping: new_mapping,
			actions: actions
		});
	});
}
Scheduler.prototype._apply = function(result){
	// this.logEvent('scheduler-event', {
	// 	phase: 'apply',
	// 	actions: result.actions
	// });
	return this.applyActions(result.actions)
		.then(function(results){
			return result;
		})
}

Scheduler.prototype.invoke = function(){
	var self = this;
	(DEBUG && console.log(chalk.red('[Scheduler] Invoke start')))
	// self.logEvent('scheduler-event', {
	// 	phase: 'invoke'
	// });
	return self._assess()
		.then(function(state){
			return self._compute(state)
		})
		.then(function(actions){
			return self._apply(actions)
		})
		.then(function(result){
			self.logEvent('scheduler-event', {
				phase: 'resolve',
				prev_mapping: result.prev_mapping,
				mapping: result.mapping,
				actions: result.actions
			});
			(DEBUG && console.log(chalk.green('[Scheduler] Invoke finished')))
			return result;
		})
}

Scheduler.Behaviours = {
	'run_application': function(self, kwargs){
		(DEBUG && console.log(chalk.red('[Scheduler] Run Application Requested')));
		// console.log(kwargs);

		var trx_token = helpers.randKey();

		Object.keys(kwargs.components).forEach(function(code_name){
			self.queue.push({
				code_name: code_name,
				source: kwargs.components[code_name].source,
				count: kwargs.components[code_name].count,
				token: trx_token
			});
		});

		return self.invoke()
			.then(function(result){
				(DEBUG && console.log(chalk.green('[Scheduler] Run Application Successfully Finished')));
				// console.log(result);
				return result;
			});
	}
}

/**
 * Scheduler Algorithms - all functions should accept devices, tasks, mapping as arguments
 * @param {Array} devices - [{ id, available_memory }]
 * @param {Array} tasks - [{ id, required_memory }]
 * @param {Object} [cur_mapping] - Current mapping
 */
Scheduler.Algorithms = {
	'first_fit': function(devices, tasks, cur_mapping){
		// devices = devices.sort(function(a, b){ return b.available_memory - a.available_memory });
		tasks = tasks.sort(function(a, b){ return b.required_memory - a.required_memory });

		var mapping = {};
		devices.forEach(function(device){
			mapping[device.id] = {
				available_memory: device.available_memory,
				processes: {}
			}
		});

		Object.keys(cur_mapping).forEach(function(device_id){
			if (device_id in mapping){
				mapping[device_id].processes = helpers.deepCopy(cur_mapping[device_id].processes);
			}
		});

		tasks.forEach(function(task){
			var most_space = Object.keys(mapping).reduce(function(acc, id){
				return (mapping[id].available_memory > mapping[acc].available_memory) ? id : acc;
			}, devices[0].id);

			if (mapping[most_space].available_memory > task.required_memory){
				mapping[most_space].available_memory -= task.required_memory;
				mapping[most_space].processes[task.id] = task;
			}
			else {
				throw Error("Not enough memory to run task, no solution found using [first_fit] Algorithm");
			}

		})

		return mapping;
	}
}

Scheduler.computeActions = function(cur_mapping, next_mapping){
	var cur_tasks = {}, next_tasks = {}, actions = [];
	Object.keys(cur_mapping).forEach(function(id){
		var engine = cur_mapping[id];
		Object.keys(engine.processes).forEach(function(instance_id){
			cur_tasks[instance_id] = {
				engine: id,
				code_name: engine.processes[instance_id].code_name
			};
		})
	});
	Object.keys(next_mapping).forEach(function(id){
		var engine = next_mapping[id];
		Object.keys(engine.processes).forEach(function(instance_id){
			next_tasks[instance_id] = {
				engine: id,
				code_name: engine.processes[instance_id].code_name,
				source: engine.processes[instance_id].source
			};
		})
	});

	Object.keys(next_tasks).forEach(function(instance_id){
		var task = next_tasks[instance_id];
		if (instance_id in cur_tasks){
			if (cur_tasks[instance_id].engine !== task.engine){
				actions.push({
					type: 'migrate',
					args: [ cur_tasks[instance_id].engine, task.engine, task.code_name, instance_id ]
				})
			}
			delete cur_tasks[instance_id];
		}
		else {
			actions.push({
				type: 'run',
				args: [ task.engine, task.code_name, task.source ]
			})
		}
	});

	Object.keys(cur_tasks).forEach(function(instance_id){
		var task = cur_tasks[instance_id];
		actions.push({
			type: 'kill',
			args: [ instance_id ]
		})
	});

	console.log(actions);

	return actions;
}

module.exports = Scheduler;