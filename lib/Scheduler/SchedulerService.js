var things = require('../things.js');
var SchedulerHelper = require('./SchedulerHelper.js');
var FilesystemHelper = require('./FilesystemHelper.js');
var ComputeDifference = require('./Schedule.js').ComputeDifference;
var ParseDifference = require('./schedule.js').ParseDifference;
var Schedule = require('./Scheduler.js').Schedule;
var fs = require('fs');
var EventEmitter = require('events').EventEmitter;

var PROGRAM_MONITOR_NAMESPACE = 'program-monitor';
var ENGINE_REGISTRY_NAMESPACE = 'engine-registry';

var RUN_APPLICATION_NAMESPACE = 'runApplication';
var STOP_APPLICATION_NAMESPACE = 'stopApplication';

var REPLY_APPLICATION_NAMESPACE = 'applicationDetails';
var MIGRATION_NOTIFICATION_NAMESPACE = 'migrateDetails';
var COMPONENT_DELIMINATOR = '*';

var SCHEDULE_UPDATE_TOPIC = 'scheduleUpdate';

var THRESHOLD_TIME = 2000;
var WINDOW_SIZE = 10;
var RESCHEDULE_TIMEFRAME = 10 * 1000;

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
		self.clearRecords().then(function(){
			self.emit('ready');	
		});

		// user notification to RUN an application
		self.runApplicationTrigger();
		// user notification to STOP an application
		self.stopApplicationTrigger();

		// cache data from device self-reporting
		self.pubsub.publish(ENGINE_REGISTRY_NAMESPACE+'/bcast', { ctrl: 'report' });
		self.pubsub.subscribe(ENGINE_REGISTRY_NAMESPACE, function(deviceData){
			self.subscribeToDevice(deviceData.id);
		});
		// cache data from component self-reporting
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
		self.stop();
		var components = runData.components;
		var replyTopic = REPLY_APPLICATION_NAMESPACE + '/' + runData.id + '/run';

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
			console.log('[Scheduler Service] Replying to user with instance details on '+replyTopic);
			self.pubsub.publish(replyTopic, { id: runData.id, instances: instanceData });
			self.run();
		})
		.catch(function(err){
			self.run();
			console.log('[Scheduler Service] Failed to run application '+ runData.id + '. Error: '+err);
			self.pubsub.publish(replyTopic, { id: runData.id, instances: [] });
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
		self.stop();
		var appId = Object.keys(stopData)[0];
		var stopComponents = stopData[appId];
		var replyTopic = REPLY_APPLICATION_NAMESPACE + '/' + appId + '/stop';

		stopComponents.forEach(function(component){
			var componentId = self.helper.instanceMappings[component.instance_id];
			if(componentId){
				self.componentsToStop.push(componentId);
			}
			// invoke rescheduling
			self.schedule({ STOP: true }).then(function(data){
				console.log('[Scheduler Service] Replying to STOP request on '+replyTopic);
				self.pubsub.publish(replyTopic, { id: appId, status: true });
				self.run();
			})
			.catch(function(err){
				console.log('[Scheduler Service] Failed to stop an application '+err);
				self.pubsub.publish(replyTopic, { id: appId, status: false });
				self.run();
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
		// for now, ignore the components we did not invoke
		if(!userId){
			return;
		}

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
		console.log('\x1b[31m%s\x1b[0m', '[Scheduler Service] New scheduling period');
		self.schedule().then(function(){
		})
		.catch(function(err){
			console.log('[Scheduler Service] Failed to generate a schedule: '+err);
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

	return new Promise(function(resolve, reject){
		Promise.all([devices, comps]).then(function(data){
			var deviceStats = data[0];
			var compStats = data[1];

			var schedule = Schedule(deviceStats, compStats);
			console.log('[Schedule Service] Schedule computed: '+JSON.stringify(schedule));
			self.apply(schedule).then(function(res){
				console.log('[Scheduler Service] Schedule applied');
				self.appendToHistory(schedule).then(function(){
					resolve(res);
				});
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
 * and their instance_id. If no schedule is applied, the Promise object rejects
 */
SchedulerService.prototype.apply = function(schedule){
	var self = this;
	self.fsHelper.navigateTo('schedule/current', true);

	return new Promise(function(resolve, reject){
		var currPath = self.fsHelper.cur_path;

		if(!schedule){
			console.log('[SchedulerService] No schedule to run');
			reject(new Error('Schedule is null'));
		}

		/* we compute the difference between two schedules to get the operations to invoke
		 */
		var diff = ComputeDifference(schedule, self.currentSchedule || {});
		var parsedDiff = ParseDifference(diff);
		console.log('\x1b[33m%s\x1b[0m','[Scheduler Service] parsed difference: \n'+JSON.stringify(parsedDiff));
		
		/* if the two schedules are the same, there is no need to 'apply it'. 
		   This check is implementation specific to the current scheduling algorithm
		 */
		if((diff['run'].length | diff['stop'].length | diff['migrate'].length) === 0){

			/* if there is no diff, there may still be new devices added. Check if
			 * both schedules have the same key length
			   @@ HACKY CHECK
			 */
			if(Object.keys(schedule).length !== (Object.keys(self.currentSchedule || {}).length)){
				// append these new devices to the current schedule, but don't apply the schedule
				self.appendToHistory(schedule).then(function(){
					console.log('[Scheduler Service] Device list updated in schedule');

					reject(new Error('No diff detected. Nothing to apply'));
					return;
				})
				.catch(function(err){
					console.log('[Scheduler Service] Problem updating schedule with new devices');
					reject(new Error('No diff detected. Nothing to apply'));
					return; 
				});
			}
			reject(new Error('No change in schedule. Nothing to apply'));
			return;
		}

		self.helper.reSchedule(diff).then(function(data){
			// save the operations into the filesystem
			self.appendOperations(parsedDiff).then(function(){	
				console.log('[Scheduler Service] Added operations to fs');
			})
			.catch(function(err){
				console.log('[Scheduler Service] Error adding operations to fs');
			});
			resolve(data);
		})
		.catch(function(err){
			console.log('[Scheduler Service] Error running schedule: '+err +'\n'+err.stack);
			reject(err);
		});
	});
}

/**
 * Clears all schedules from /history and /current
 *
 * @return {Promise} Promise object represents successful deletion of schedule files
 */
SchedulerService.prototype.clearRecords = function(){
	var self = this;
	self.fsHelper.navigateTo('', true);

	// function to create an empty history and current folder
	function reAddFolders(){
		self.fsHelper.navigateTo('schedule', true);
		var history = self.fsHelper.makeDir('history');
		var current = self.fsHelper.makeDir('current');
		var operations = self.fsHelper.makeDir('operations');

		return Promise.all([history, current, operations]).then(function(){
			console.log('[Scheduler Service] Successfully created empty history and current folders');
		})
		.catch(function(err){
			console.log('[Scheduler Service] Error occurred creating history and current folders! '+err);
		});
	}

	return new Promise(function(resolve, reject){
		// delete and recreate a schedule folder, populating it with the history and current subfolders
		self.fsHelper.checkDirExists('schedule').then(function(exist){
			if(exist){
				self.fsHelper.deleteTarget('schedule').then(function(){
					self.fsHelper.makeDir('schedule').then(function(){
						reAddFolders().then(function(){
							resolve();
						})
						.catch(function(err){
							reject(err);
						});
					})
					.catch(function(err){
						console.log('[Scheduler Service] Unable to create schedule folder: '+err);
						reject();
					});
				})
				.catch(function(err){
					console.log('[Scheduler Service] Error deleting schedule folder! '+err);
					reject();
				});
			}
			else{
				self.fsHelper.makeDir('schedule').then(function(){
					reAddFolders().then(function(){
						resolve();
					})
					.catch(function(err){
						reject(err);
					});
				})
				.catch(function(err){
					console.log('[Scheduler Service] Unable to create schedule folder: '+err);
					reject();
				});
			}
		});
	});
}

SchedulerService.prototype.appendOperations = function(diff){
	var self = this;
	self.fsHelper.navigateTo('schedule', true);
	var currPath = self.fsHelper.cur_path;
	var fname = (self.version == 0) ? (self.version) : (self.version + 1);

	return new Promise(function(resolve, reject){
		var p1 = self.fsHelper.writeFile(self.fsHelper.joinPath(currPath, 'operations'),
			diff, fname+'.json');

		p1.then(function(){
			resolve();
		})
		.catch(function(err){
			reject();
		});
	});
}

/** 
 * Appends a schedule to the filesystem, caching the current schedule
 *
 * @param {Object} schedule - a mapping of devices to the components they run
 * @return {Promise} Promise object represents successful insertion of new schedule
 * to the filesystem
 */
 SchedulerService.prototype.appendToHistory = function(schedule){
 	var self = this;
 	self.fsHelper.navigateTo('schedule', true);
 	var currPath = self.fsHelper.cur_path;
 	var p1, p2;

 	return new Promise(function(resolve, reject){
		if(self.currentSchedule){
			self.version++;
			// write the current schedule to history if it exists
			p1 = self.fsHelper.writeFile(self.fsHelper.joinPath(currPath, 'history'), 
				 self.currentSchedule, self.version+'.json');
		}
		// update the newly applied schedule as the current schedule
		var currSchedPath = self.fsHelper.joinPath(currPath, 'current');
		p2 = self.fsHelper.writeFile(currSchedPath, schedule, 'current.json');

		Promise.all([p1, p2]).then(function(){
			console.log('[Scheduler Service] Successfully appended schedule to history');
			// notify user over pubsub
			self.pubsub.publish(SCHEDULE_UPDATE_TOPIC, schedule);

			self.currentSchedule = schedule;
			console.log('\x1b[36m%s\x1b[0m', '[Scheduler Service] New schedule:\n'+JSON.stringify(self.currentSchedule));
			resolve();
		})
		.catch(function(err){
			console.log('[Scheduler Service] An error occurred appending the schedule: '+err);
			reject(err);
		});
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
	var components = {}; // mapping of componentId to requirements
	var currDate = Date.now();

	var options = options || {};
	var runTriggered = (options.RUN) ? true : false;
	var stopTriggered = (options.STOP) ? true : false;

	for(componentId in self.componentsLog){
		var componentStats = self.componentsLog[componentId];
		var lastReading = componentStats[componentStats.length - 1];
		// components must have reported within a threshold
		if(Math.abs(lastReading.timestamp - currDate) > THRESHOLD_TIME){
			continue;
		}

		components[componentId] = {};
		var numReports = 0;
	 	// go through history of reports for each component, summing the field values
	 	componentStats.forEach(function(report){
	 		numReports++;
	 		var memUsage = report.memory;

	 		for(requirement in memUsage){
	 			var value = memUsage[requirement];
	 			components[componentId][requirement] = components[componentId][requirement] || 0;
	 			components[componentId][requirement] += value;
	 		}
	 	});
	 	// average out the readings
	 	for(field in components[componentId]){
	 		components[componentId][field] = components[componentId][field] / numReports;
	 	}
	}
	// append components that need to be run
	if(runTriggered){
		for(compName in self.componentsToRun){
			var compRequirements = self.componentsToRun[compName];
			components[compName] = {};
			Object.assign(components[compName], compRequirements);
		}
		self.componentsToRun = {};
	}
	// remove components that need to be stopped
	if(stopTriggered){
		self.componentsToStop.forEach(function(comp){
			delete components[comp];
		});
		self.componentsToStop = [];
	}

	var parsedComponents = self._parseComponentList(components);
	console.log('[Scheduler Service] Current components: '+JSON.stringify(parsedComponents));
	return parsedComponents;
}

/**
 * Provide a list of available devices for the next schedule
 * 
 * @return {Object[]} An array of devices
 */
SchedulerService.prototype._currentDevices = function(){
	var self = this;
	var deadDevices = [];
	var currDate = Date.now();

	return new Promise(function(resolve, reject){
		var deviceStats = {};

		for(device in self.devicesLog){
			var stats = self.devicesLog[device];

			/* check that this engine reported within a threshold time,
			   otherwise it should be considered 'dead'
			*/
			if(Math.abs(stats.timestamp - currDate) > THRESHOLD_TIME){
				deadDevices.push(device);
				continue;
			}
			// we do not include memory taken up by things.js components running on the device
			var runningComponents = [];
			if(self.currentSchedule && self.currentSchedule[device]){
				runningComponents = self.currentSchedule[device];
			}
			//take the last heap used reading for all the components running on the device
			var componentMemory = runningComponents.reduce(function(sum, compId){
				var stat = self.componentsLog[compId] ? self.componentsLog[compId].slice(-1).pop().memory : { heapUsed : 0 };
				return sum + stat.heapUsed;
			}, 0);
			stats.device_memory += componentMemory;
			deviceStats[device] = stats;
		}

		// adjust our current schedule based on all dead devices
		self._adjustSchedule(deadDevices).then(function(result){
			var parsedDevices = self._parseDeviceList(deviceStats);
			console.log('[Scheduler Service] Current devices: '+JSON.stringify(parsedDevices));
			resolve(parsedDevices);
		})
		.catch(function(err){
			console.log('[Scheduler Service] Cannot provide an accurate view of the system');
			reject(err);
		});

	});
}

/**
 * Adjust the current schedule when a dead device is detected
 */
SchedulerService.prototype._adjustSchedule = function(deadDevices){
	var self = this;
	var adjustmentsMade = false;

	return new Promise(function(resolve, reject){
		if(deadDevices.length === 0 || !self.currentSchedule){
			console.log('[Scheduler Service] No schedule to adjust');
			resolve(adjustmentsMade);
			return;
		}

		var updatedSchedule = Object.assign({}, self.currentSchedule);
		deadDevices.forEach(function(deviceId){
			if(self.currentSchedule[deviceId]){
				adjustmentsMade = true;
				delete updatedSchedule[deviceId];
				delete self.devicesLog[deviceId];
			}
		});

		// only append new schedule to history if there were changes
		if(adjustmentsMade){
			self.appendToHistory(updatedSchedule).then(function(){
				console.log('[Scheduler Service] Schedule adjusted because of a dead device');
				resolve(adjustmentsMade);
			})
			.catch(function(err){
				console.log('[Scheduler Service] Could not adjust schedule based on a dead device '+err);
				reject(err);
			});
		}
		else{
			console.log('[Scheduler Service] No adjustments made to schedule');
			resolve(adjustmentsMade);
		}

	});
}

module.exports = SchedulerService;