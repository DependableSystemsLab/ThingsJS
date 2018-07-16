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

var SCHEDULE_UPDATE_TOPIC = 'scheduleUpdate';

var THRESHOLD_TIME = 2000;
var WINDOW_SIZE = 10;

function SchedulerService(){
	var self = this;
	EventEmitter.apply(this);

	this.components = {}; // key: componentId, value: # current instances
	this.componentsToRun = {}; // key: componentId, value: requirements
	this.componentsToStop = []; 
	this.componentsLog = {}; // key: componentId/instanceId, value: mem usage
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
		self.pubsub.subscribe(RUN_APPLICATION_NAMESPACE, function(data){
			var components = data.components;

			Object.keys(components).forEach(function(name){
				var instances = components[name]['num_instances'];
				var requiredMem = components[name]['required_memory'];
				var currInstances = self.components[name] || 0;

				for(var i = 0; i < instances; i++){
					var compId = name + '/' + (++currInstances);
					self.componentsToRun[compId] = { heapUsed: requiredMem };
				}
				// update the number of instances of that component
				self.components[name] = currInstances;
			});
			// invoke a rescheduling
			self.schedule({ RUN: true }).then(function(data){
				// subscribe to resources
				for(code in data){
					var instances = data[code];
					instances.forEach(function(instance){
						self.subscribeToInstance(code, instance);
					});
				}
				console.log('[Scheduler Service] Replying to user with instance details');
				self.pubsub.publish(REPLY_APPLICATION_NAMESPACE, { id: data.id, instances: data });
			})
			.catch(function(err){
				console.log('[Scheduler Service] Failed to run application '+ data.id);
				self.pubsub.publish(REPLY_APPLICATION_NAMESPACE, { id: data.id, instances: [] });
			});
		});

		// user notification to STOP an application
		self.pubsub.subscribe(STOP_APPLICATION_NAMESPACE, function(comps){
			comps.forEach(function(component){
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

		// component self-reporting
		self.pubsub.publish(PROGRAM_MONITOR_NAMESPACE+'/bcast', { ctrl: 'report' });
		self.pubsub.subscribe(PROGRAM_MONITOR_NAMESPACE, function(data){
			self.subscribeToInstance(data.code_name, data.instance_id);
		});

	});
}
SchedulerService.prototype = new EventEmitter();
SchedulerService.prototype.constructor = SchedulerService;

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

SchedulerService.prototype.run = function(){
	console.log('[Scheduler Service] Running');
	var self = this;
	this.runSchedule = setInterval(function(){
		self.schedule().then(function(){

		})
		.catch(function(err){
			console.log('[Scheduler Service] Failed to generate a schedule');
		});
	}, 20 * 1000);
}

SchedulerService.prototype.stop = function(){
	console.log('[Scheduler Service] Stopping');
	var self = this;
	clearInterval(self.runSchedule);
}

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

SchedulerService.prototype.apply = function(schedule){
	var self = this;
	self.fsHelper.navigateTo('schedule/current', true);

	return new Promise(function(resolve, reject){
		var currPath = self.fsHelper.cur_path;

		self.fsHelper.getFile(currPath + '/current.json').then(function(currSched){
			var diff = ComputeDifference(schedule, currSched.content);
			console.log('[Scheduler Service] Diff calculated: '+ JSON.stringify(diff));

			self.helper.reSchedule(diff).then(function(data){
				resolve(data);
			})
			.catch(function(err){
				console.log('[Scheduler Service] Error running schedule: '+ err);
				reject(err);
			});
		})
		.catch(function(err){
			// a current schedule currently does not exist, run without computing difference
			self.helper.runSchedule(schedule).then(function(data){
				resolve(data);
			})
			.catch(function(err){
				console.log('[Scheduler Service] Error running schedule: '+ err);
				reject(err);
			});	
		})
	});
}

/**
 * Clears all schedules from /history and /current
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
 */
SchedulerService.prototype.appendToHistory = function(schedule){
	var self = this;
	self.fsHelper.navigateTo('', true);

	return new Promise(function(resolve, reject){
		self.fsHelper.navigateTo('', true);
		self.fsHelper.checkDirExists('schedule').then(function(res){
			if(res){
				console.log('[Scheduler Service] Schedule folder exists');
				append(resolve, reject);
			}
			else{
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

				if(!exists[0]){
					console.log('[Scheduler Service] A history folder DNE. Making one...');
					p3 = self.fsHelper.makeDir('history');
				}	
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
						p6 = self.fsHelper.writeFile(self.fsHelper.joinPath(currPath, 'current'), schedule, 'current.json')
							.then(function(){
								resolve();
							})
							.catch(function(err){
								console.log('[Scheduler Service] Cannot write current.json: '+err);
								reject(err);
							});
					}
					// self.fsHelper.getFile(fpath).then(function(data){
					// 	var currSchedule = data.content;
					// 	console.log('[Scheduler Service] Fetched current schedule: '+currSchedule);
					// 	self.version++;

					// 	p5 = self.fsHelper.writeFile(self.fsHelper.joinPath(currPath, 'history'), currSchedule, self.version+'.json');
					// 	p6 = self.fsHelper.writeFile(self.fsHelper.joinPath(currPath, 'current'), schedule, 'current.json');

					// 	Promise.all([p5, p6]).then(function(){
					// 		console.log('[Scheduler Service] Successfully appended history');
					// 		resolve();
					// 	})
					// 	.catch(function(err){
					// 		console.log('[Scheduler Service] Error appending history :'+err);
					// 		reject(err);
					// 	});
					// })
					// .catch(function(err){
					// 	p6 = self.fsHelper.writeFile(self.fsHelper.joinPath(currPath, 'current'), schedule, 'current.json')
					// 		.then(function(){
					// 			resolve();
					// 		})
					// 		.catch(function(err){
					// 			console.log('[Scheduler Service] Cannot write current.json: '+err);
					// 			reject(err);
					// 		});
					// });
				})
				.catch(function(err){
					console.log('[Scheduler Service] Problem creating HISTORY/CURRENT folder: '+err);
					reject(err);
				});
			});
		}

	});

}

SchedulerService.prototype._parseDeviceList = function(devices){
	var deviceArray = [];

	for(device in devices){
		deviceArray.push({ id: device, memory: devices[device].device_memory });
	}
	return deviceArray;
}

SchedulerService.prototype._parseComponentList = function(components){
	var compArray = [];

	for(comp in components){
		compArray.push({ name: comp, required_memory: components[comp].heapUsed });
	}
	return compArray;
}

/** 
 * Provide a list of components to run in the next schedule
 */
SchedulerService.prototype._currentComponents = function(options){
	var self = this;
	var components = {};
	var currDate = Date.now();

	var runTriggered = false;
	var stopTriggered = false;

	if(options){
		if(options.RUN){
			runTriggered = true;
		}
		if(options.STOP){
			stopTriggered = true;
		}
	}

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
	//return components;
}

SchedulerService.prototype._currentDevices = function(){
	var self = this;
	return new Promise(function(resolve){
		var devices = [];

		self.pubsub.publish(ENGINE_REGISTRY_NAMESPACE + '/bcast', { ctrl: 'report' });
		self.pubsub.subscribe(ENGINE_REGISTRY_NAMESPACE, function(data){
			devices.push(data);
		});
		setTimeout(function(){
			var deviceStats = {};
			self.pubsub.unsubscribe(ENGINE_REGISTRY_NAMESPACE);

			devices.forEach(function(device){
				self.pubsub.subscribe(device.id + '/resource', function(res){
					self.pubsub.unsubscribe(device.id);
					deviceStats[device.id] = res;

					self.pubsub.unsubscribe(device.id + '/resource');
				});
			});

			setTimeout(function(){
				console.log('[Scheduler Service] Current devices: '+JSON.stringify(deviceStats));
				resolve(self._parseDeviceList(deviceStats));
			}, 2000);
		}, 2000);
	});
}


module.exports = SchedulerService;