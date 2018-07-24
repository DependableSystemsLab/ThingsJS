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
					componentIds.push(componentId);
				});
			}
			Promise.all(promises).then(function(data){
				var instances = {};

				data.forEach(function(instance, index){
					var compId = componentIds[index];
					var compName = compId;
					//var compName = componentIds[index].split(COMPONENT_DELIMINATOR)[0];

					self.componentMappings[compId] = instance.id;
					self.instanceMappings[instance.id] = compId;

					if(!instances[compName]){
						instances[compName] = [instance.id];
					}
					else{
						instances[compName].push(instance.id);
					}
				});
				resolve(instances);
			})
			.catch(function(err){
				console.log('[SchedulerHelper] encountered an error trying to run code on a device');
				reject();
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
	});
	console.log('[SchedulerHelper] Number of moves: '+promises.length);

	return new Promise(function(resolve, reject){
		getInstances.then(function(runData){
			Promise.all(promises).then(function(results){
				resolve(runData);
			})
			.catch(function(err){
				console.log('[SchedulerHelper] Failed to reschedule: '+err);
				reject(err);
			});
		})
		.catch(function(err){
			console.log('[SchedulerHelper] Could not perform rescheduling! '+err);
			reject(err);
		});
	});
}

/**
 * Returns an index of unsuccessful operations
 */
SchedulerHelper.prototype.catchFailedOperations = function(promises){
	var failedIndexes = [];
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
		Promise.all(caughtPromises).then(function(resolutions){
			resolutions.forEach(function(operation, index){
				try{
					if("error" in operation){
						failedIndexes.push(index);
					}
				}
				catch(e){
					return;
				}
			});
			resolve(failedIndexes);
		});
	});
}

SchedulerHelper.prototype.getComponentId = function(instanceId){
	return self.instanceMappings[instanceId];
}

module.exports = SchedulerHelper;