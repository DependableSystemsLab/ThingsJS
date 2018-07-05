var things = require('../things.js');
var helper = require('./SchedulerHelper.js');
var fs = require('fs');
var EventEmitter = require('events').EventEmitter;

var PROGRAM_MONITOR_NAMESPACE = 'program-monitor';
var ENGINE_REGISTRY_NAMESPACE = 'engine-registry';

function SchedulerService(){
	var self = this;
	EventEmitter.apply(this);
	this.pubsub = new things.Pubsub();
	this.helper = new SchedulerHelper();

	function ready(obj){
		return new Promise(function(resolve){
			obj.on('ready', function(){
				resolve();
			});
		});
	}
	Promise.all([ready(self.pubsub), ready(self.helper)], function(){
		self.emit('ready');
	});
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
	var devices = this._currentDevices();
	var comps = this._currentComponents();

	return new Promise(function(resolve){
		Promise.all([devices, comps], function(data){
			var deviceStats = data[0];
			var compStats = data[1];

			/* TODO INVOKE SCHEDULER ALGORITHM HERE */
			var schedule;
			resolve(schedule);
		});
	});
}


SchedulerService.prototype._currentComponents = function(){
	var self = this;
	return new Promise(function(resolve){
		var instances = [];

		self.pubsub.publish(PROGRAM_MONITOR_NAMESPACE + '/bcast', { ctrl: 'report' });
		self.pubsub.subscribe(PROGRAM_MONITOR_NAMESPACE, function(data){
			instances.push(data);
		});
		setTimeout(function(){
			var instanceStats = {};
			self.pubsub.unsubscribe(PROGRAM_MONITOR_NAMESPACE);

			instances.forEach(function(instance){
				var name = instance.code_name;
				var id = instance.instance_id;

				self.pubsub.subscribe(name+'/'id+'/resource', function(data){
					instanceStats[id] = { code_name: name, resources: data };
				});
			});

			setTimeout(function(){
				instances.forEach(function(instance){
					self.pubsub.unsubscribe(instance.code_name+'/'+instance.instance_id+'/resource');
				});
				resolve(instanceStats);
			}, 2000);

		}, 2000);
	});
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
				resolve(deviceStats);
			}, 2000);
		}, 2000);
	});
}

module.exports = SchedulerService;

