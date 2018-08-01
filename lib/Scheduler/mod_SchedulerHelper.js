var things = require('../things.js');
var FilesystemHelper = require('./FilesystemHelper.js');
var fs = require('fs');
var http = require('http');
var EventEmitter = require('events').EventEmitter;

var COMPONENT_DELIMINATOR = '*';

/**
 * A dispatcher wrapper to run schedules
 */
function SchedulerHelper(){
	var self = this;
	EventEmitter.call(this);

	this.cache = {};
	this.helper = new FilesystemHelper();
	this.dispatcher = new things.Dispatcher();
	this.componentMappings = {}; // maps componentId : instanceId
	this.instanceMappings = {};  // maps instanceId : componentId

	this.dispatcher.on('ready', function(){
		console.log('[SchedulerHelper] Ready');
		self.emit('ready');
	});
}
SchedulerHelper.prototype = new EventEmitter();
SchedulerHelper.prototype.constructor = SchedulerHelper;

SchedulerHelper.prototype.runSchedule = function(schedule){
	var self = this;
	var ops = [];
	
	return new Promise(function(resolve, reject){
		var rawCodes = [];

		for(device in schedule){
			var codesToRun = schedule[device];

			codesToRun.forEach(function(componentId){
				var file = componentId.substring(0, componentId.indexOf(COMPONENT_DELIMINATOR));
				if(!self.cache[file]){
					var getFile = self.fetchCode(file);
					rawCodes.push(getFile);
				}
			});
		}
		// all files have been fetched at this point
		Promise.all(rawCodes).then(function(data){
			var promises = [];
			var componentIds = [];

			for(device in schedule){
				var codesToRun = schedule[device];

				codesToRun.forEach(function(componentId){
					var file = componentId.split(COMPONENT_DELIMINATOR)[0];
					console.log('[SchedulerHelper] Trying to run: ');
					console.log(device, componentId);

					// @@ BUGFIX WOKAROUND
					var run = self.dispatcher.runCode(device, componentId, self.cache[file].content);
					//var run = self.dispatcher.runCode(device, file, self.cache[file].content);
					promises.push(run);
					ops.push({ cmd: 'run', component: componentId, device: device });
					componentIds.push(componentId);
				});
			}
			self.catchFailedOperations(promises, ops).then(function(data){
				if(data[false].length > 0){
					console.log('[SchedulerHelper] At least one run command failed');
				}
				data[true].forEach(function(successOp){
					self.componentMappings[successOp.op.component] = successOp.result.id;
					self.instanceMappings[successOp.result.id] = successOp.op.component;
				});
				resolve(data);
			});
		});
	});
}

/** 
 * Fetch a file from the code repository
 */
SchedulerHelper.prototype.fetchCode = function(file){
	var self = this;
	return this.helper.getFile(file).then(function(fileData){
		self.cache[file] = fileData;
		return fileData;
	});
}

/**
 * Executes subsequent schedules
 */
SchedulerHelper.prototype.reSchedule = function(newSchedule){
	console.log('[SchedulerHelper] Rescheduling');
	var self = this;
	var schedule = {};
	var promises = [];
	var ops = [];

	var runSchedule = newSchedule['run'] || [];
	var stopSchedule = newSchedule['stop'] || [];
	var migrateSchedule = newSchedule['migrate'] || [];

	runSchedule.forEach(function(run){
		var device = run.device;
		var code = run.app;
		if(device in schedule){
			schedule[device].push(code);
		}
		else{
			schedule[device] = [code];
		}
	});
	var getInstances = self.runSchedule(schedule);

	stopSchedule.forEach(function(stop){
		var device = stop.device;
		var nameTokens = stop.app.split(COMPONENT_DELIMINATOR);
		var instanceId = self.componentMappings[stop.app] || nameTokens[1];
		var codeName = nameTokens[0];

		// @@ BUGFIX WORKAROUND
		var kill = self.dispatcher.killCode(device, stop.app, instanceId);
		//var kill = self.dispatcher.killCode(device, codeName, instanceId);
		promises.push(kill);
		ops.push({ cmd: 'kill', component: stop.app, device: device });
	});

	migrateSchedule.forEach(function(migrate){
		var nameTokens = migrate.app.split(COMPONENT_DELIMINATOR);
		var instanceId = self.componentMappings[migrate.app] || nameTokens[1];
		var fromDevice = migrate.from;
		var codeName = nameTokens[0];
		var toDevice = migrate.to;
		console.log('[SchedulerHelper] Migrating '+instanceId +' from '+ fromDevice +' to '+toDevice);

		// @@ BUGFIX WORKAROUND
		var migrate = self.dispatcher.moveCode(fromDevice, toDevice, migrate.app, instanceId);
		//var migrate = self.dispatcher.moveCode(fromDevice, toDevice, codeName, instanceId);
		promises.push(migrate);
		ops.push({ cmd: 'migrate', component: migrate.app, from: fromDevice, to: toDevice });
	});
	console.log('[SchedulerHelper] Number of moves: '+promises.length);

	return new Promise(function(resolve, reject){
		getInstances.then(function(runData){
			self.catchFailedOperations(promises, ops).then(function(otherData){
				if(otherData[false].length > 0){
					console.log('[SchedulerHelper] At least one migrate/kill operation failed');
				}
				// concatenate both results
				var response = {};
				response[false] = runData[false].concat(otherData[false]);
				response[true] = runData[true].concat(otherData[true]);

				if(response[false].length > 0){
					reject(response);
				}
				else{
					resolve(response);
				}
			});
		});
	});
}

/**
 * Returns an index of unsuccessful operations
 */
SchedulerHelper.prototype.catchFailedOperations = function(promises, ops){
	/* catches all exceptions in the array of promises so we can process them
	   in a Promise.all call
	 */
	var caughtPromises = promises.map(function(p){
		return p.then(function(result){
			return result;
		})
		.catch(function(err){
			return { error: err };
		});
	});

	return new Promise(function(resolve){
		var result = {};
		result[false] = []; // all failed operations
		result[true] = [];  // all successful operations

		Promise.all(caughtPromises).then(function(resolutions){
			resolutions.forEach(function(operation, index){
				if(operation["error"]){
					result[false].push({ op: ops[index], result: operation.err });
				}
				else{
					result[true].push({ op: ops[index], result: operation });
				}
			});
			resolve(result);
		});
	});
}

SchedulerHelper.prototype.getComponentId = function(instanceId){
	return self.instanceMappings[instanceId];
}

module.exports = SchedulerHelper;