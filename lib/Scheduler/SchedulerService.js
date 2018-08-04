/**
 * module dependencies
 */
var things = require('../things.js');
var randKey = require('../helpers.js').randKey;
var SchedulerHelper = require('./SchedulerHelper.js');
var FilesystemHelper = require('./FilesystemHelper.js');
var ComputeDifference = require('./Schedule.js').ComputeDifference;
var ParseDifference = require('./schedule.js').ParseDifference;
var Schedule = require('./Scheduler.js').Schedule;
var fs = require('fs');
var EventEmitter = require('events').EventEmitter;

/**
 * pubsub channels
 */
var PROGRAM_MONITOR_NAMESPACE = 'program-monitor';
var ENGINE_REGISTRY_NAMESPACE = 'engine-registry';
var RUN_APPLICATION_NAMESPACE = 'runApplication';
var STOP_APPLICATION_NAMESPACE = 'stopApplication';
var REPLY_APPLICATION_NAMESPACE = 'applicationDetails';
var SCHEDULE_UPDATE_TOPIC = 'scheduleUpdate';

/**
 * constants
 */
var COMPONENT_DELIMINATOR = '*';
var THRESHOLD_TIME = 2000;
var WINDOW_SIZE = 10;
var RESCHEDULE_TIMEFRAME = 10 * 1000;

/**
 * user-defined application
 *
 * @constructor
 * @param {string} id
 * @param {string} status
 * @param {string} name
 */
function Application(id, status, name){
	var self = this;

	this.id = id;
	this.status = status;
	this.name = name;
	this.components = {};

	this.addComponent = function(componentId, requirements){
		self.components[componentId] = requirements;
	}
	this.componentList = function(){
		return Object.keys(self.components);
	}
}

/**
 * valid application statuses
 */
Application.status = {
	PENDING: 'PENDING',
	RUN_FAILED: 'RUN FAILED', 
	RUNNING: 'RUNNING',
	STOP_FAILED: 'STOP FAILED',
	STOPPED: 'STOPPED'
}

/**
 * @constructor
 */
function SchedulerService(){
	var self = this;
	EventEmitter.apply(this);

	this.componentsToApplication = {};
	this.applications = {};

	this.components = {}; // key: component name, value: # current instances
	this.componentsLog = {}; // key: componentId/instanceId, value: mem usage
	this.devicesLog = {};
	this.inSchedule = { status: false, queue: [] };

	this.currentMapping = undefined;
	this.currentSchedule = undefined;

	this.pubsub = new things.Pubsub();
	this.helper = new SchedulerHelper();

	this.fsHelper = new FilesystemHelper();
	this.version = 0;

	this.doneTask = function(taskName){
		process.nextTick(function(){
			self.emit(taskName);
		});
	}

	this.waitTask = function(taskName){
		return new Promise(function(resolve){
			self.once(taskName, function(){
				resolve();
			});
		});
	}

	this.startScheduling = function(){
		return new Promise(function(resolve){
			if(self.inSchedule.status){
				var waitToken = randKey();
				self.inSchedule.queue.push(waitToken);
				console.log('\x1b[44m%s\x1b[0m', '[Scheduler Service] Pending a rescheduling...')
				
				self.waitTask(waitToken).then(function(){
					console.log('\x1b[44m%s\x1b[0m', '[Scheduler Service] Wait finished...')
					self.inSchedule.status = true;
					resolve();
				});
			}
			else{
				self.inSchedule.status = true;
				resolve();
			}
		});
	}

	/* we don't immediately report that scheduling has finished to allow
     * components to have a chance to self-report before the next scheduling 
     */
	this.finishedScheduling = function(){
		setTimeout(function(){
			if(self.inSchedule.queue[0]){
				var waitToken = self.inSchedule.queue[0];
				self.inSchedule.queue.shift();
				self.doneTask(waitToken);
			}
			self.inSchedule.status = false;
		}, THRESHOLD_TIME);
	}

	function ready(obj){
		return new Promise(function(resolve){
			obj.once('ready', function(){
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
 * Initializes a subscription to run user-defined applications
 */
SchedulerService.prototype.runApplicationTrigger = function(){
	var self = this;

	self.pubsub.subscribe(RUN_APPLICATION_NAMESPACE, function(runData){
		self.stop();

		// generate an id for this new application instance
		var appId = randKey();
		var components = runData.components || [];
		var replyToken = runData.request_token;
		var appName = runData.name;

		var app = new Application(appId, Application.status.PENDING, appName);
		self.applications[appId] = app;

		Object.keys(components).forEach(function(compName){
			var instances = components[compName]['num_instances'];
			var requiredMem = Number(components[compName]['required_memory']);
			var currInstances = self.components[compName] || 0;

			/* create unique ids for each component by appending a number
			 * to each potential instance 
			 */
			for(var i = 0; i < instances; i++){
				var compId = compName + COMPONENT_DELIMINATOR + (++currInstances);
				self.componentsToApplication[compId] = appId;
				self.applications[appId].addComponent(compId, { heapUsed: requiredMem });
			}
			self.components[compName] = currInstances;
		});

		var replyTopic = REPLY_APPLICATION_NAMESPACE + '/' + replyToken + '/run';
		var replyData = { status: Application.status.PENDING, application_id: appId, name: appName };
		var statusSent = false;

		/* invoke a rescheduling with a RUN flag to indicate we want to run
		 * components indicated in the specified application_id
		 */
		if(self.inSchedule.status){
			self.pubsub.publish(replyTopic, replyData);
			statusSent = true;
		}
		self.schedule({ RUN: appId }).then(function(instanceData){
			console.log('[Scheduler Service] Replying to user for application_id ' + appId);
			replyData.status = Application.status.RUNNING;
			if(statusSent){
				self.pubsub.publish(REPLY_APPLICATION_NAMESPACE, replyData);
			}
			else{
				self.pubsub.publish(replyTopic, replyData);
			}
			self.applications[appId].status = Application.status.RUNNING;
			self.finishedScheduling();
			self.run();
		})
		.catch(function(err){
			console.log('[Scheduler Service] Can\`t run app. Notifying user');
			replyData.status = Application.status.RUN_FAILED;
			if(statusSent){
				self.pubsub.publish(REPLY_APPLICATION_NAMESPACE, replyData);
			}
			else{
				self.pubsub.publish(replyTopic, replyData);
			}
			self.applications[appId].status = Application.status.RUN_FAILED;
			self.finishedScheduling();
			self.run();
		});

	});
}

/**
 * Initializes a subscription to stop user-defined applications
 */
SchedulerService.prototype.stopApplicationTrigger = function(){
	var self = this;

	self.pubsub.subscribe(STOP_APPLICATION_NAMESPACE, function(stopData){
		self.stop();

		var appId = stopData.application_id;
		var replyToken = stopData.request_token;
		var replyTopic = REPLY_APPLICATION_NAMESPACE + '/' + replyToken + '/stop';
		var statusSent = false;

		if(!self.applications[appId]){
			console.log('[Scheduler Service] Received an application ID we do not recognize: '+appId);

			self.finishedScheduling();
			self.run();
			return;
		}

		var replyData = { 
			application_id: appId, 
			name: self.applications[appId].name,
			status: Application.status.PENDING
		};

		if((self.applications[appId].status === Application.status.STOPPED) || 
			(self.applications[appId].status === Application.status.STOP_FAILED)){

			replyData.status = self.applications[appId].status;
			self.pubsub.publish(replyTopic, replyData);

			self.finishedScheduling();
			self.run();
			return;
		}

		/* invoke a rescheduling with a STOP flag to indicate we want to 
		 * remove all components in the specified application 
		 */
		if(self.inSchedule.status){
			self.pubsub.publish(replyTopic, replyData);
			statusSent = true;
		}
		self.schedule({ STOP: appId }).then(function(data){
			console.log('[Scheduler Service] Replying to STOP request on '+replyTopic);
			replyData.status = Application.status.STOPPED;
			self.applications[appId].status = Application.status.STOPPED;

			if(statusSent){
				self.pubsub.publish(REPLY_APPLICATION_NAMESPACE, replyData);
			}
			else{
				self.pubsub.publish(replyTopic, replyData);
			}
			self.finishedScheduling();
			self.run();
		})
		.catch(function(err){
			console.log('[Scheduler Service] Failed to stop application with id '+appId);
			replyData.status = Application.status.STOP_FAILED;
			self.applications[appId].status = Application.status.STOP_FAILED;

			if(statusSent){
				self.pubsub.publish(REPLY_APPLICATION_NAMESPACE, replyData);
			}
			else{
				self.pubsub.publish(replyTopic, replyData);
			}
			self.finishedScheduling();
			self.run();
		});

	});
}

/**
 * Subscribe to a specific device's resource report and caches the received
 * data. Only keeps most recent report
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
		// when a new scheduling period occurs, stop the timer until we finish scheduling
		self.stop();
		console.log('\x1b[31m%s\x1b[0m', '[Scheduler Service] New scheduling period');
		self.schedule().then(function(){
			self.finishedScheduling();
			self.run();
		})
		.catch(function(err){
			console.log('[Scheduler Service] Failed to generate a schedule: '+err);
			self.finishedScheduling();
			self.run();
		});

	}, RESCHEDULE_TIMEFRAME);
}

/**
 * Pauses the rescheduling from being triggered every RESCHEDULE_TIMEFRAME ms
 */
SchedulerService.prototype.stop = function(){
	console.log('[Scheduler Service] Rescheduling timer stopped');
	var self = this;
	clearInterval(self.runSchedule);
}

/**
 * Creates a new schedule and applies it, saving it to the filesystem
 *
 * @param {Object} options - flag to indicate if the scheduling is 
 * triggered by a user wishing to RUN or STOP an application over pubsub
 *
 * @returns {Promise} Promise object rejects if no schedule was applied
 */
SchedulerService.prototype.schedule = function(options){
	var self = this;

	return new Promise(function(resolve, reject){
		self.startScheduling().then(function(){

			var devices = self._currentDevices();
			var comps = self._currentComponents(options);

			Promise.all([devices, comps]).then(function(data){
				var deviceStats = data[0];
				var compStats = data[1];

				var schedule = Schedule(deviceStats, compStats, self.currentMapping || {});
				console.log('[Schedule Service] Schedule computed: '+JSON.stringify(schedule));

				self.apply(schedule).then(function(res){
					console.log('[Scheduler Service] Schedule updated');
					var formattedSchedule = self.formatSchedule(schedule, deviceStats, compStats);

					self.currentMapping = schedule.mapping;
					self.appendToHistory(formattedSchedule).then(function(){
						resolve(res);
					});
				})
				.catch(function(err){
					if(err instanceof Error){
						reject(err);
						return;
					}
					// fix the schedule upon a Promise rejection from being unable to fully apply the schedule
					console.log('\x1b[41m%s\x1b[0m', '[Scheduler Service] An error occurred. Trying to roll forward...');
					var newMapping = { timestamp: Date.now(), mapping: self.fixSchedule(err) };
					self.currentMapping = newMapping.mapping;
					var formattedSchedule = self.formatSchedule(newMapping, deviceStats, compStats);

					self.appendToHistory(formattedSchedule).then(function(){
						reject(new Error('Schedule could not be applied fully'));
					})
					.catch(function(err){
						reject(new Error('Schedule could not be applied fully'));
					});
				});
			});
		});
	});
}

/**
 * Formats a schedule mapping to include details about device and component memory usage
 * 
 * @returns {Object} A nested JSON that represents a schedule, including the mapping between
 * devices to components, and the resource availability/usage of these devices and components
 */
SchedulerService.prototype.formatSchedule = function(schedule, deviceDescriptions, componentDescriptions){
	var self = this;
	var newSched = {};
	newSched.timestamp = schedule.timestamp;
	newSched.mapping = {};

	Object.keys(schedule.mapping).forEach(function(deviceId){
		var deviceMem = deviceDescriptions[deviceId].device_memory;
		var deviceProcesses = {};

		schedule.mapping[deviceId].forEach(function(componentId){
			var appToken = self.componentsToApplication[componentId];
			var memUsage = componentDescriptions[componentId].heapUsed;

			deviceProcesses[componentId] = { 
				memory_usage: memUsage, 
				app_token: appToken, 
				instance_id: self.helper.componentMappings[componentId]
			};
		});
		newSched.mapping[deviceId] = { available_memory: deviceMem, processes: deviceProcesses };
	});

	return newSched;
}

/**
 * Applies a schedule 
 * 
 * @param {Object} schedule - a mapping of devices to the components they should run
 * @return {Promise} Promise object represents the result of all operations when applying the mapping.
 *  If no schedule is applied or if the schedule fails to apply, the Promise object rejects
 */
SchedulerService.prototype.apply = function(schedule){
	var self = this;
	self.fsHelper.navigateTo('schedule/current', true);

	return new Promise(function(resolve, reject){
		var currPath = self.fsHelper.cur_path;

		if(!schedule || !schedule.mapping){
			console.log('[SchedulerService] No schedule to run');
			reject(new Error('Schedule is empty'));
			return;
		}

		// we compute the difference between two schedules to get the operations to invoke
		var currMapping = (self.currentMapping) ? self.currentMapping : {};
		var diff = ComputeDifference(schedule.mapping, currMapping);
		var parsedDiff = ParseDifference(diff);
		console.log('\x1b[33m%s\x1b[0m','[Scheduler Service] parsed difference: \n'+JSON.stringify(parsedDiff));
		
		/* if the two schedules are the same, there is no need to 'apply it'. 
		   This check is implementation specific to the current scheduling algorithm
		 */
		if((diff['run'].length | diff['stop'].length | diff['migrate'].length) === 0){
			/* if there is no diff, there may still be new devices added. Check if
			 * both schedules have the same key length
			 * @@ HACKY CHECK
			 */
			if(Object.keys(schedule.mapping).length !== (Object.keys(currMapping).length)){
				// resolve without applying the schedule
				console.log('[Scheduler Service] Device list changed');
				self.currentMapping = schedule.mapping;
				resolve();
				return;
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
		.catch(function(errLog){
			console.log('[Scheduler Service] Error encountered applying schedule');
			reject(errLog);
		});
	});
}

/** 
 * A roll-forward approach to 'fixing' a schedule that failed to fully apply
 *
 * @param {Object} errLog: A mapping of successful and failed operations
 * @returns {Object} A corrected mapping of devices to components
 */
SchedulerService.prototype.fixSchedule = function(errLog){
	var self = this;
	var updatedMapping = Object.assign({}, self.currentMapping);

	// apply all successful operations to the current mapping
	errLog[true].forEach(function(successOp){
		var operation = successOp.op;
		var result = successOp.result;

		switch(operation.cmd){
			case 'run':
				if(updatedMapping[operation.device]){
					updatedMapping[operation.device].push(operation.component);
				}
				else{
					updatedMapping[operation.device] = [operation.component];
				}
				break;

			case 'stop':
				var device = operation.device;
				var compId = operation.component;

				var index = updatedMapping[device].indexOf(compId);
				updatedMapping[device].splice(index, 1);
				break;

			case 'migrate':
				var compId = operation.component;
				var from = operation.from;
				var to = operation.to;

				var index = updatedMapping[from].indexOf(compId);
				updatedMapping[from].splice(index, 1);

				if(updatedMapping[to]){
					updatedMapping[to].push(compId);
				}
				else{
					updatedMapping[to] = [compId];
				}
				break;
		}
	});

	// adjust schedule for all failed operations
	errLog[false].forEach(function(failedOp){
		var operation = failedOp.op;

		switch(operation.cmd){
			/*  In the current migration case, a device migrating code 
			 * to another device will kill the component they are running,
			 * so we must delete that mapping
			 */
			case 'migrate':
				var compId = operation.component;
				var from = operation.from;
				var to = operation.to;

				var index = updatedMapping[from].indexOf(compId);
				updatedMapping[from].splice(index, 1);
				break;
		}
	});

	console.log('\x1b[41m%s\x1b[0m', '[Scheduler Service] corrective mapping' +JSON.stringify(updatedMapping));
	return updatedMapping;
}

/**
 * Clears the schedule folder and re-initializes subfolders /history, /operations, and /current
 *
 * @return {Promise} Promise object represents successful deletion and re-creation of schedule files
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
	var fname = self.version;

	return new Promise(function(resolve, reject){
		var p1 = self.fsHelper.writeFile(self.fsHelper.joinPath(currPath, 'operations'),
			diff, fname);

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
				 self.currentSchedule, self.version);
		}
		// update the newly applied schedule as the current schedule in the fs
		var currSchedPath = self.fsHelper.joinPath(currPath, 'current');
		p2 = self.fsHelper.writeFile(currSchedPath, schedule, 'current');

		Promise.all([p1, p2]).then(function(){
			// update the current schedule 
			self.currentSchedule = schedule;
			console.log('[Scheduler Service] Successfully appended schedule to filesystem');
			// notify user over pubsub that schedule has updated
			self.pubsub.publish(SCHEDULE_UPDATE_TOPIC, schedule);
			console.log('\x1b[36m%s\x1b[0m', '[Scheduler Service] New schedule:\n'+JSON.stringify(schedule));
			resolve();
		})
		.catch(function(err){
			console.log('[Scheduler Service] An error occurred appending the schedule: '+err);
			reject(err);
		});
 	});
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
	var deadComponents = [];
	var components = {}; // mapping of componentId to requirements
	var currDate = Date.now();

	var options = options || {};
	var runTriggered = (options.RUN) ? true : false;
	var stopTriggered = (options.STOP) ? true : false;

	for(var componentId in self.componentsLog){
		var componentStats = self.componentsLog[componentId];
		var lastReading = componentStats[componentStats.length - 1];
		// components must have reported within a threshold
		if(Math.abs(lastReading.timestamp - currDate) > THRESHOLD_TIME){
			delete self.componentsLog[componentId];
			deadComponents.push(componentId);
			continue;
		}

		components[componentId] = {};
		var numReports = 0;
	 	// go through history of reports for each component, summing the field values
	 	componentStats.forEach(function(report){
	 		numReports++;
	 		var memUsage = report.memory;

	 		for(var requirement in memUsage){
	 			var value = memUsage[requirement];
	 			components[componentId][requirement] = components[componentId][requirement] || 0;
	 			components[componentId][requirement] += value;
	 		}
	 	});
	 	// average out the readings
	 	for(var field in components[componentId]){
	 		components[componentId][field] = components[componentId][field] / numReports;
	 	}
	}
	// append components that need to be run
	if(runTriggered){
		var runId = options.RUN;
		for(var compName in self.applications[runId].components){
			var compRequirements = self.applications[runId].components[compName];
			components[compName] = compRequirements;
		}
	}
	// remove components that need to be stopped
	if(stopTriggered){
		var stopId = options.STOP;
		self.applications[stopId].componentList().forEach(function(compName){
			delete components[compName];
		});
	}

	console.log('[Scheduler Service] Current components: '+JSON.stringify(components));

	// adjust our schedule based on all dead components before returning the component list
	return new Promise(function(resolve, reject){
		self._adjustComponents(deadComponents).then(function(){
			resolve(components);
		})
		.catch(function(err){
			reject(err);
		});
	});
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

		for(var device in self.devicesLog){
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
			if(self.currentMapping && self.currentMapping[device]){
				runningComponents = self.currentMapping[device];
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
		self._adjustDevices(deadDevices).then(function(result){
			console.log('[Scheduler Service] Current devices: '+JSON.stringify(deviceStats));
			resolve(deviceStats);
		})
		.catch(function(err){
			console.log('[Scheduler Service] Cannot provide an accurate view of the system');
			reject(err);
		});

	});
}

/**
 * Removes dead components from the current schedule. This function
 * must wait for this._adjustDevices to finish to avoid race conditions 
 * from modifying the same variable
 * 
 * @param {string[]} deadComponents - a list of component ids
 * @return {Promise} Promise object represents successful update to the 
 * current mapping to reflect removal of dead components
 */
SchedulerService.prototype._adjustComponents = function(deadComponents){
	var self = this;
	var adjustmentsMade = false;

	return new Promise(function(resolve, reject){
		// to avoid race conditions, listen for device adjustments to finish first
		self.waitTask('device adjust').then(function(){

			if(deadComponents.length === 0 || !self.currentSchedule){
				resolve(adjustmentsMade);
				return;
			}

			var updatedSchedule = JSON.parse(JSON.stringify(self.currentSchedule));
			deadComponents.forEach(function(compId){
				// search for which device this component belongs to
				for(var device in self.currentSchedule.mapping){

					if(self.currentSchedule.mapping[device].processes[compId]){
						if(self.currentMapping[device]){
							var index = self.currentMapping[device].indexOf(compId);
							self.currentMapping[device].splice(index, 1);
						}
						delete updatedSchedule.mapping[device].processes[compId];
						adjustmentsMade = true;
						break;
					}
				}
			});
			// only append new schedule to FS if changes were made
			if(adjustmentsMade){
				updatedSchedule.timestamp = Date.now();
				self.appendToHistory(updatedSchedule).then(function(){
					console.log('\x1b[41m%s\x1b[0m','[Scheduler Service] Schedule adjusted because of a dead component');	
					resolve(adjustmentsMade);
				})
				.catch(function(err){
					reject(err);
				});

			}
			else{
				resolve(adjustmentsMade);
			}
		});
	});
}

/**
 * Adjust the current schedule when a dead device is detected. This 
 * function currently emits a 'done' signal in order for this._adjustComponents
 * to begin
 *
 * @param {string[]} deadDevices - a list of device ids
 * @returns {Promise} Promise object represents successful update 
 * to the current mapping to reflect removal of dead devices
 */
SchedulerService.prototype._adjustDevices = function(deadDevices){
	var self = this;
	var adjustmentsMade = false;

	return new Promise(function(resolve, reject){
		if(deadDevices.length === 0 || !self.currentMapping){
			self.doneTask('device adjust');
			resolve(adjustmentsMade);
			return;
		}

		var updatedSchedule = JSON.parse(JSON.stringify(self.currentSchedule));
		deadDevices.forEach(function(deviceId){
			if(self.currentMapping[deviceId]){
				adjustmentsMade = true;
				delete self.currentMapping[deviceId];
				delete self.devicesLog[deviceId];
				delete updatedSchedule.mapping[deviceId];
			}
		});
		// only append new schedule to FS if changes were made
		if(adjustmentsMade){
			updatedSchedule.timestamp = Date.now();

			self.appendToHistory(updatedSchedule).then(function(){
				console.log('\x1b[41m%s\x1b[0m','[Scheduler Service] Schedule adjusted because of a dead device');

				self.doneTask('device adjust');
				resolve(adjustmentsMade);
			})
			.catch(function(err){
				console.log('[Scheduler Service] Could not adjust schedule based on a dead device '+err);

				self.doneTask('device adjust');
				reject(err);
			});
		}
		else{
			self.doneTask('device adjust');
			resolve(adjustmentsMade);
		}

	});
}

module.exports = SchedulerService;
