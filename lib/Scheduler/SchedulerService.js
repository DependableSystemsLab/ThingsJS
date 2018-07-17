var things = require('../things.js');
var SchedulerHelper = require('./SchedulerHelper.js');
var FilesystemHelper = require('./FilesystemHelper.js');
var ComputeDifference = require('./Schedule.js').ComputeDifference;
var Schedule = require('./Scheduler.js').Schedule;
var fs = require('fs');
var EventEmitter = require('events').EventEmitter;

var PROGRAM_MONITOR_NAMESPACE = 'program-monitor';
var ENGINE_REGISTRY_NAMESPACE = 'engine-registry';

var RUN_APPLICATION_NAMESPACE = 'runApplication';
var STOP_APPLICATION_NAMESPACE = 'stopApplication';
var REPLY_APPLICATION_NAMESPACE = 'applicationDetails';
var COMPONENT_DELIMINATOR = '/';

var SCHEDULE_UPDATE_TOPIC = 'scheduleUpdate';

var THRESHOLD_TIME = 2000;
var WINDOW_SIZE = 10;
var RESCHEDULE_TIMEFRAME = 20 * 1000;

/**
 * @constructor
 */
function SchedulerService(){
	var self = this;
	EventEmitter.apply(this);

	this.components = {}; // key: componentId, value: # current instances
	this.componentsToRun = {}; // key: componentId, value: requirements
	this.componentsToStop = []; 
	this.componentsLog = {}; // key: componentId/instanceId, value: mem usage
	this.devicesLog = {};
	this.currentSchedule = undefined;

	this.pubsub = new things.Pubsub();
	this.helper = new SchedulerHelper();

	this.fsHelper = new FilesystemHelper();
	this.version = 0;

	function ready(obj){
		return new Promise(function(resolve){
			obj.on('ready', function(){
				resolve();
			});
		});
	}

	Promise.all([ready(self.pubsub), ready(self.helper)]).then(function(){
		self.emit('ready');
		self.clearRecords();

		// user notification to RUN an application
		self.runApplicationTrigger();
		// user notification to STOP an application
		self.stopApplicationTrigger();

		// device self-reporting
		self.pubsub.publish(ENGINE_REGISTRY_NAMESPACE+'/bcast', { ctrl: 'report' });
		self.pubsub.subscribe(ENGINE_REGISTRY_NAMESPACE, function(deviceData){
			self.subscribeToDevice(deviceData.id);
		});
		// component self-reporting
		self.pubsub.publish(PROGRAM_MONITOR_NAMESPACE+'/bcast', { ctrl: 'report' });
		self.pubsub.subscribe(PROGRAM_MONITOR_NAMESPACE, function(data){
			self.subscribeToInstance(data.code_name, data.instance_id);
		});

	});
}
SchedulerService.prototype = new EventEmitter();
SchedulerService.prototype.constructor = SchedulerService;

/**
 * Subscribe to the namespace that requests to run an application,
 * and trigger a rescheduling
 */
SchedulerService.prototype.runApplicationTrigger = function(){
	var self = this;

	self.pubsub.subscribe(RUN_APPLICATION_NAMESPACE, function(runData){
		var components = runData.components;

		Object.keys(components).forEach(function(name){
			var instances = components[name]['num_instances'];
			var requiredMem = components[name]['required_memory'];
			var currInstances = self.components[name] || 0;

			// create a unique id for each component
			for(var i = 0; i < instances; i++){
				var compId = name + COMPONENT_DELIMINATOR + (++currInstances);
				self.componentsToRun[compId] = { heapUsed: requiredMem };
			}
			// update the number of instances of that component
			self.components[name] = currInstances;
		});
		// invoke a rescheduling
		self.schedule({ RUN: true }).then(function(instanceData){
			// subscribe to resources for the running component
			for(code in instanceData){
				var instances = instanceData[code];
				instances.forEach(function(instance){
					self.subscribeToInstance(code, instance);
				});
			}
			console.log('[Scheduler Service] Replying to user with instance details');
			self.pubsub.publish(REPLY_APPLICATION_NAMESPACE+'/'+runData.id, { id: runData.id, instances: instanceData });
		})
		.catch(function(err){
			console.log('[Scheduler Service] Failed to run application '+ runData.id);
			self.pubsub.publish(REPLY_APPLICATION_NAMESPACE+'/'+runData.id, { id: runData.id, error: err });
		});
	});
}

/**
 * Subscribe to the namespace that requests to stop an application,
 * and trigger a rescheduling 
 */
SchedulerService.prototype.stopApplicationTrigger = function(){
	var self = this;

	self.pubsub.subscribe(STOP_APPLICATION_NAMESPACE, function(stopData){
		stopData.forEach(function(component){
			var key = component.code_name + '/' + component.instance_id;
			var componentId = self.helper.getComponentId(key);
			if(componentId){
				self.componentsToStop.push(componentId);
			}
			// invoke a rescheduling
			self.schedule({ STOP: true }).then(function(data){
				console.log('[Scheduler Service] Replying to STOP request');
				self.pubsub.publish(REPLY_APPLICATION_NAMESPACE, { id: data.id });
			})
			.catch(function(err){
				console.log('[Scheduler Service] Failed to stop application '+ data.id);
				self.pubsub.publish(REPLY_APPLICATION_NAMESPACE, { error: err });
			});
		});
	});
}

/**
 * Subscribe to a specific device's resource report and caches the received
 * data
 *
 * @param {string} deviceId - the unique id of the Code Engine
 */
SchedulerService.prototype.subscribeToDevice = function(deviceId){
	var self = this;
	self.pubsub.subscribe(deviceId+'/resource', function(res){
		self.devicesLog[deviceId] = res;
	});
}

/**
 * Subscribe to a specific instance's resource report and caches the last
 * WINDOW_SIZE readings
 *
 * @param {string} codeName - the name of the running instance
 * @param {string} instanceId - the unique id of the instance generated at runtime
 */
SchedulerService.prototype.subscribeToInstance = function(codeName, instanceId){
	var self = this;
	self.pubsub.subscribe(codeName+'/'+instanceId+'/resource', function(res){

		// check if we invoked this component ourselves
		var userId = self.helper.instanceMappings[instanceId];
		var generatedId = codeName + '/' + instanceId;
		var key = userId || instanceId;

		// only keep one record of this running component
		if(userId && self.componentsLog[generatedId]){
			var data = self.componentsLog[generatedId];
			self.componentsLog[userId] = data;
			delete self.componentsLog[generatedId];
		}
		if(!self.componentsLog[key]){
			self.componentsLog[key] = [res];
		}
		else{
			if(self.componentsLog[key].length === WINDOW_SIZE){
				self.componentsLog[key].shift();
			}
			self.componentsLog[key].push(res);
		}
	});
}

/**
 * Triggers a rescheduling every RESCHEDULE_TIMEFRAME ms
 *
 */
SchedulerService.prototype.run = function(){
	console.log('[Scheduler Service] Running');
	var self = this;
	this.runSchedule = setInterval(function(){
		self.schedule().then(function(){
		})
		.catch(function(err){
			console.log('[Scheduler Service] Failed to generate a schedule');
		});
	}, RESCHEDULE_TIMEFRAME);
}

/**
 * Pauses the rescheduling from being triggered every RESCHEDULE_TIMEFRAME ms
 */
SchedulerService.prototype.stop = function(){
	console.log('[Scheduler Service] Stopping');
	var self = this;
	clearInterval(self.runSchedule);
}

/**
 * Creates a new schedule and applies it, saving it to the filesystem
 *
 * @param {Object} options - flag to indicate if the scheduling is 
 * triggered by a user wishing to RUN or STOP an application over pubsub
 *
 * @returns {Promise} Promise object represents a mapping between newly running components
 * and their instance_id
 */
SchedulerService.prototype.schedule = function(options){
	var self = this;
	var devices = this._currentDevices();
	var comps = this._currentComponents(options);
	console.log('[Scheduler Service] Creating a new schedule and applying...');

	return new Promise(function(resolve, reject){
		Promise.all([devices, comps]).then(function(data){
			var deviceStats = data[0];
			var compStats = data[1];

			var schedule = Schedule(deviceStats, compStats);
			if(schedule === null){
				console.log('[Scheduler Service] No schedule could be created!');
				reject();
				return;
			}
			console.log('[Schedule Service] Schedule computed: '+JSON.stringify(schedule));
			self.apply(schedule).then(function(res){
				// cache the current schedule
				self.currentSchedule = schedule;
				// notify subscribers of new schedule and update to filesystem
				console.log('[Scheduler Service] Schedule applied');
				self.appendToHistory(schedule);
				self.pubsub.publish(SCHEDULE_UPDATE_TOPIC, schedule);
				resolve(res);
			})
			.catch(function(err){
				reject(err);
			});
		});
	});
}

/**
 * Applies a schedule 
 * 
 * @param {Object} schedule - a mapping of devices to the components they should run
 * @return {Promise} Promise object represents a mapping between newly running components
 * and their instance_id
 */
SchedulerService.prototype.apply = function(schedule){
	var self = this;
	self.fsHelper.navigateTo('schedule/current', true);

	return new Promise(function(resolve, reject){
		var currPath = self.fsHelper.cur_path;

		if(self.currentSchedule){
			// if a current schedule exists, we compute the difference between two schedules
			var diff = ComputeDifference(schedule, self.currentSchedule);
			console.log('[Scheduler Service] Diff calculated: ' + JSON.stringify(diff));

			self.helper.reSchedule(diff).then(function(data){
				resolve(data);
			})
			.catch(function(err){
				console.log('[Scheduler Service] Error running shcedule: '+err);
				reject(err);
			});
		}
		else{
			// a current schedule currently does not exist, run without computing difference
			self.helper.runSchedule(schedule).then(function(data){
				resolve(data);
			})
			.catch(function(err){
				console.log('[Scheduler Service] Error running schedule: '+err);
				reject(err);
			});
		}
	});
}

/**
 * Clears all schedules from /history and /current
 *
 * @return {Promise} Promise object represents successful deletion of schedule files
 */
SchedulerService.prototype.clearRecords = function(){
	var self = this;
	self.fsHelper.navigateTo('schedule', true);

	return new Promise(function(resolve, reject){
		var p1 = self.fsHelper.checkDirExists('history');
		var p2 = self.fsHelper.checkDirExists('current');

		Promise.all([p1, p2]).then(function(exists){
			var p3, p4;

			// DELETE respective folders if they exist
			if(exists[0]){
				p3 = self.fsHelper.deleteTarget('history');
			}
			if(exists[1]){
				p4 = self.fsHelper.deleteTarget('current');
			}
			// CREATE empty history and current folders
			Promise.all([p3, p4]).then(function(){
				var p5 = self.fsHelper.makeDir('current');
				var p6 = self.fsHelper.makeDir('history');

				Promise.all([p5, p6]).then(function(){
					console.log('[Scheduler Service] Successfully cleared records');
					resolve();
				})
				.catch(function(err){
					console.log('[Scheduler Service] Failed to make empty HISTORY/CURRENT folder: '+err);
					reject(err);
				});
			})
			.catch(function(err){
				console.log('[Scheduler Service] Failed to delete CURRENT/HISTORY: '+err);
				reject(err);
			})
		})
		.catch(function(err){
			console.log('[Scheduler Service] Failed to clear schedule records: '+err);
			reject(err);
		});
	});
}

/** 
 * Appends a schedule to the filesystem
 *
 * @param {Object} schedule - a mapping of devices to the components they run
 * @return {Promise} Promise object represents successful insertion of new schedule
 * to the filesystem
 */
SchedulerService.prototype.appendToHistory = function(schedule){
	var self = this;

	return new Promise(function(resolve, reject){
		self.fsHelper.navigateTo('', true);

		self.fsHelper.checkDirExists('schedule').then(function(exist){
			if(exist){
				console.log('[Scheduler Service] Schedule folder exists');
				append(resolve, reject);
			}
			else{
				// we must first create a schedule folder if it doesn't already exist
				self.fsHelper.makeDir('schedule').then(function(){
					console.log('[Scheduler Service] Created Schedule folder');
					append(resolve, reject);
				})
				.catch(function(err){
					console.log('[Scheduler Service] Could not create Schedule folder: '+err);
					reject();
				});
			}
		});

		function append(resolve, reject){
			self.fsHelper.navigateTo('schedule', true);
			var p1 = self.fsHelper.checkDirExists('history');
			var p2 = self.fsHelper.checkDirExists('current');

			Promise.all([p1, p2]).then(function(exists){
				var p3, p4;

				// check if folder /schedule/history exists
				if(!exists[0]){
					console.log('[Scheduler Service] A history folder DNE. Making one...');
					p3 = self.fsHelper.makeDir('history');
				}
				// check if folder /schedule/current exists	
				if(!exists[1]){
					console.log('[Scheduler Service] A current folder DNE. Making one...');
					p4 = self.fsHelper.makeDir('current');
				}

				Promise.all([p3, p4]).then(function(){
					console.log('[Scheduler Service] History and Current folder exists');
					var p5, p6;
					var currPath = self.fsHelper.cur_path;
					var fpath = self.fsHelper.joinPath(currPath, 'current') + '/current.json';

					// fetch the current schedule
					if(self.currentSchedule){
						var currSched = self.currentSchedule;
						console.log('[Scheduler Service] Fetched current schedule from cache: '+JSON.stringify(currSched));
						self.version++;

						// write the current schedule to history, add the new schedule as the current
						p5 = self.fsHelper.writeFile(self.fsHelper.joinPath(currPath, 'history'), currSched, self.version+'.json');
						p6 = self.fsHelper.writeFile(self.fsHelper.joinPath(currPath, 'current'), schedule, 'current.json');

						Promise.all([p5, p6]).then(function(){
							console.log('[Scheduler Service] Successfully appended history');
							resolve();
						})
						.catch(function(err){
							console.log('[Scheduler Service] Error appending history: '+err);
							reject(err);
						});
					}
					else{
						// if there is no current schedule, we only need to append the new schedule to the filesystem
						p6 = self.fsHelper.writeFile(self.fsHelper.joinPath(currPath, 'current'), schedule, 'current.json')
							.then(function(){
								resolve();
							})
							.catch(function(err){
								console.log('[Scheduler Service] Cannot write current.json: '+err);
								reject(err);
							});
					}
				})
				.catch(function(err){
					console.log('[Scheduler Service] Problem creating HISTORY/CURRENT folder: '+err);
					reject(err);
				});
			});
		}

	});

}

/**
 * Formats the list of devices to be taken by the Scheduler class
 *
 * @param {Object} devices - a mapping of CodeEngine id to its resources
 * @returns {Object[]} An array of objects with field id and memory
 */
SchedulerService.prototype._parseDeviceList = function(devices){
	var deviceArray = [];

	for(device in devices){
		deviceArray.push({ id: device, memory: devices[device].device_memory });
	}
	return deviceArray;
}

/**
 * Formats the list of components to be taken by the Scheduler class
 *
 * @param {Object} components - a mapping of component ids to its resource usages
 * @returns {Object[]} An array of objects with field name and required_memory
 */
SchedulerService.prototype._parseComponentList = function(components){
	var compArray = [];

	for(comp in components){
		compArray.push({ name: comp, required_memory: components[comp].heapUsed });
	}
	return compArray;
}

/** 
 * Provide a list of components to run in the next schedule
 *
 * @param {Object} options - a flag to indicate if the user wishes to RUN pending components
 * or STOP pending components
 *
 * @return {Object[]} An array of components
 */
SchedulerService.prototype._currentComponents = function(options){
	var self = this;
	var components = {};
	var currDate = Date.now();

	var options = options || {};
	var runTriggered = (options.RUN) ? true : false;
	var stopTriggered = (options.STOP) ? true : false;

	for(instance in self.componentsLog){
		var comp = self.componentsLog[instance];
		var lastReading = comp[comp.length - 1];
		if(Math.abs(lastReading.timestamp - currDate) > THRESHOLD_TIME){
			return;
		}
		components[instance] = {};
		var numReports = 0;
		// go through the history of reports for each component
		comp.forEach(function(report, index){
			var memUsage = report.memory;
			for(field in memUsage){
				if(index === 0){
					components[instance][field] = memUsage[field];
				}
				else{
					components[instance][field] += memUsage[field];
				}
			}
			numReports++;
		});
		// average out the readings 
		for(stat in components[instance]){
			var data = components[instance][stat];
			components[instance][stat] = data / numReports;
		}
	}
	// append components that need to be run
	if(runTriggered){
		for(compName in self.componentsToRun){
			var component = self.componentsToRun[compName];

			for(requirement in component){
				var val = component[requirement];
				components[compName] = {};
				components[compName][requirement] = val;
			}
			delete self.componentsToRun[compName];
		}
	}
	// remove components that need to be stopped
	if(stopTriggered){
		self.componentsToStop.forEach(function(comp){
			delete components[comp];
		});
	}

	console.log('[Scheduler Service] Current components: '+JSON.stringify(components));
	return self._parseComponentList(components);
}

/**
 * Provide a list of available devices for the next schedule
 * 
 * @return {Object[]} An array of devices
 */
SchedulerService.prototype._currentDevices = function(){
	var self = this;
	var currDate = Date.now();

	return new Promise(function(resolve){
		var deviceStats = {};
		for(device in self.devicesLog){
			var stats = self.devicesLog[device];

			// check that this engine reported within a threshold time
			if(Math.abs(stats.timestamp - currDate) > THRESHOLD_TIME){
				delete self.devicesLog[device];
				continue;
			}
			deviceStats[device] = stats;
		}
		console.log('[Scheduler Service] Current devices: '+JSON.stringify(deviceStats));
		resolve(self._parseDeviceList(deviceStats));
	});
}


module.exports = SchedulerService;