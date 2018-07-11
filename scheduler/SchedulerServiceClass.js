var things = require('../things.js');
var SchedulerHelper = require('./SchedulerHelper.js');
var Scheduler= require('./Scheduler.js');
var Schedule = require('./schedule.js');
var fs = require('fs');
var EventEmitter = require('events').EventEmitter;

var PROGRAM_MONITOR_NAMESPACE = 'program-monitor';
var ENGINE_REGISTRY_NAMESPACE = 'engine-registry';
var THRESHOLD_TIME = 2000;
var WINDOW_SIZE = 10;

function SchedulerService(){
	var self = this;
	this.currentScheduleNumber=0;
	EventEmitter.apply(this);
	this.componentsLog = {};
	this.pubsub = new things.Pubsub();
	this.helper = new SchedulerHelper();

	function ready(obj){
		return new Promise(function(resolve){
			obj.on('ready', function(){
				resolve();
			});
		});
	}

	Promise.all([ready(self.pubsub), ready(self.helper)]).then(function(){
		self.emit('ready');

		self.pubsub.publish(PROGRAM_MONITOR_NAMESPACE+'/bcast', { ctrl: 'report' });
		self.pubsub.subscribe(PROGRAM_MONITOR_NAMESPACE, function(data){
			var codeName = data.code_name;
			var instanceId = data.instance_id;

			self.pubsub.subscribe(codeName+'/'+instanceId+'/resource', function(res){
				var key = codeName + '/' + instanceId;
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
		});

	});
	clearHistory();
}
SchedulerService.prototype = new EventEmitter();
SchedulerService.prototype.constructor = SchedulerService;

SchedulerService.prototype.run = function(){
	var self = this;
	this.runSchedule = setInterval(function(){
		self.schedule();
	}, 60 * 1000);
}

SchedulerService.prototype.stop = function(){
	var self = this;
	clearInterval(self.runSchedule);
}

SchedulerService.prototype.schedule = function(){
	var devices = this._listDevices();
	var comps = this._listComponents();
	currentScheduleNumber ++; 

	var newSchedule= Scheduler.Scheduling(devices, comps);

	return newSchedule;
}

SchedulerService.prototype._currentComponents = function(){
	var self = this;
	var components = {};
	var currDate = Date.now();

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
	return components;
}


// SchedulerService.prototype._currentComponents = function(){
// 	var self = this;
// 	return new Promise(function(resolve){
// 		var instances = [];

// 		self.pubsub.publish(PROGRAM_MONITOR_NAMESPACE + '/bcast', { ctrl: 'report' });
// 		self.pubsub.subscribe(PROGRAM_MONITOR_NAMESPACE, function(data){
// 			instances.push(data);
// 		});
// 		setTimeout(function(){
// 			var instanceStats = {};
// 			self.pubsub.unsubscribe(PROGRAM_MONITOR_NAMESPACE);

// 			instances.forEach(function(instance){
// 				var name = instance.code_name;
// 				var id = instance.instance_id;

// 				self.pubsub.subscribe(name+'/'id+'/resource', function(data){
// 					instanceStats[id] = { code_name: name, resources: data };
// 				});
// 			});

// 			setTimeout(function(){
// 				instances.forEach(function(instance){
// 					self.pubsub.unsubscribe(instance.code_name+'/'+instance.instance_id+'/resource');
// 				});
// 				resolve(instanceStats);
// 			}, 2000);

// 		}, 2000);
// 	});
// }

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
				resolve(deviceStats);
			}, 2000);
		}, 2000);
	});
}

SchedulerService.prototype._listDevices = function(){
	var self= this;
	var listDevices= [];
	var currentDevices = _currentDevices();
	var currentDevicesValues= Object.values(currentDevices);
	var currentDevicesKeys= Object.keys(currentDevices);
	for (var i = 0; i < keys.length; i++) {
		var availableRam= (currentDevicesValues[i].device_memory) - (currentDevicesValues[i].memory['heapUsed']);
 		listDevices.push({id: currentDevicesKeys[i],
 				memory: availableRam});
	}

	return (listDevices)

};

SchedulerService.prototype._listComponents = function(){
	var self= this;
	var currentComponents = _currentComponents();
	var currentComponentsValues= Object.values(currentComponents);
	var currentComponentsKeys= Object.keys(currentComponents);
	var listComponents = [];
	for (var i = 0; i < currentComponentsKeys.length; i++) {

		listComponents.push({ name: currentComponentsKeys[i],
						required_memory: currentComponentsValues[i].heapUsed
					});	
	}

	return (listComponents)

}

SchedulerService.prototype.apply= function(schedule){
	var newSchedule = schedule();
	// if first call runSchedule otherwise reschedule
	if (currentScheduleNumber === 0){
		SchedulerHelper.runSchedule(newSchedule);
	}
	else{
		// will get current schedule from FS
	var diffSchedule= Schedule.computeDifference(newSchedule, currentSchedule);
	SchedulerHelper.reSchedule(diffSchedule);
	appendToHistory(newSchedule);
	}

};
// save into the fs, not finished too
SchedulerService.prototype.appendToHistory= function(schedule){
	
	fs.appendFile('schedule.txt', schedule, function(err){
		if (err) throw err;
		console.log('The data to append was appended to file');
	});

};

SchedulerService.prototype.clearHistory= function(){

	// delete current
	fs.unlink('/schedule/current', (err) => {
		if (err) throw err;
		console.log('/schedule/current was deleted');
	});

	fs.unlink('/schedule/history/*', (err) => {
		if (err) throw err;
		console.log('/schedule/history was deleted');
	});

};



module.exports = SchedulerService;