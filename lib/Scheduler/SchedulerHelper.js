var things = require('../things.js');
var FilesystemHelper = require('./FilesystemHelper.js');
var fs = require('fs');
var http = require('http');
var EventEmitter = require('events').EventEmitter;

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
		var componentIds = [];

		for(device in schedule){
			var codesToRun = schedule[device];

			codesToRun.forEach(function(componentId){
				var file = componentId.substring(0, componentId.indexOf('/'));
				if(!self.cache[file]){
					var getFile = self.fetchCode(file);
					rawCodes.push(getFile);
				}
			});
		}
		Promise.all(rawCodes).then(function(data){
			var promises = [];

			for(device in schedule){
				var codesToRun = schedule[device];

				codesToRun.forEach(function(componentId){
					var file = componentId.substring(0, componentId.indexOf('/'));
					console.log('[SchedulerHelper] Trying to run: ');
					console.log(device, componentId);

					var run = self.dispatcher.runCode(device, file, self.cache[file].content);
					promises.push(run);
					componentIds.push(componentId);
				});
			}
			Promise.all(promises).then(function(data){
				var instances = {};

				data.forEach(function(instance, index){
					var compId = componentIds[index];
					var compName = componentIds[index].split('/')[0];

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


// SchedulerHelper.prototype.runSchedule = function(schedule){
// 	var self = this;

// 	return new Promise(function(resolve, reject){
// 		var componentIds = [];
// 		var codeToContent = {};
// 		var rawCodes = [];

// 		for(device in schedule){
// 			var codes = schedule[device];
// 			codes.forEach(function(code){
// 				var file = code.substring(0, code.indexOf('/'));

// 				// only fetch code once for each component
// 				if(codeToContent[file]){
// 					rawCodes.push(codeToContent[file]);
// 				}
// 				else{
// 					var fileData = self.fetchCode(file);
// 					rawCodes.push(fileData);
// 					codeToContent[file] = fileData;
// 				}
// 			});
// 		}

// 		Promise.all(rawCodes).then(function(codeData){
// 			var promises = [];
// 			var pointer = 0;

// 			for(device in schedule){
// 				var codes = schedule[device];

// 				for(var i = 0; i < codes.length; i++){
// 					var file = codes[i].substring(0, codes[i].indexOf('/'));
// 					console.log('[SchedulerHelper] Trying to run: ');
// 					console.log(device, codes[i]);

// 					var location = i + pointer;
// 					var run = self.dispatcher.runCode(device, file, codeData[location].content);

// 					componentIds.push(codes[i]);
// 					promises.push(run);
// 				}
// 				pointer += codes.length;
// 			}

// 			Promise.all(promises).then(function(data){
// 				var instances = {};

// 				data.forEach(function(instance, index){
// 					var compId = componentIds[index];
// 					var compName = componentIds[index].split('/')[0];

// 					self.componentMappings[compId] = instance.id;
// 					self.instanceMappings[instance.id] = compId;

// 					if(!instances[compName]){
// 						instances[compName] = [instance.id];
// 					}
// 					else{
// 						instances[compName].push(instance.id);
// 					}
// 				});
// 				resolve(instances);
// 			})
// 			.catch(function(err){
// 				console.log('[SchedulerHelper] encountered an error trying to run code on a device');
// 				reject();
// 			});

// 		});

// 	});

// }
/**
 * Runs code on specified devices based on a schedule
 * @param {Object} schedule: A mapping of device names to an array of components
 *
 */
// SchedulerHelper.prototype.runSchedule = function(schedule){
// 	var self = this;

// 	return new Promise(function(resolve, reject){
// 		var promises = [];
// 		var componentIds = [];

// 		for(device in schedule){
// 			var codes = schedule[device];

// 			codes.forEach(function(code){
// 				// TODO: read the code from the filesystem instead
// 				var file = code.substring(0, code.indexOf('/'));
// 				var rawCode;
// 				self.fetchCode(file).then(function(data){
// 					rawCode = data.content;
// 					console.log('[SchedulerHelper] Trying to run: ');
// 					console.log(device, code);

// 					var run = self.dispatcher.runCode(device, file, rawCode);
// 					promises.push(run);
// 					componentIds.push(code);			
// 				})
// 				// try{
// 				// 	rawCode = fs.readFileSync(file, 'utf-8');
// 				// }
// 				// catch(e){
// 				// 	console.log('[SchedulerHelper] Could not locate code');
// 				// 	reject();
// 				// }
// 				// console.log('[SchedulerHelper] Trying to run: ');
// 				// console.log(device, code);

// 				// var run = self.dispatcher.runCode(device, file, rawCode);
// 				// promises.push(run);
// 				// componentIds.push(code);
// 			});
// 		}
			
// 		Promise.all(promises).then(function(data){
// 			var instances = {};

// 			data.forEach(function(instance, index){
// 				var compId = componentIds[index];
// 				var compName = componentIds[index].split('/')[0];

// 				self.componentMappings[compId] = instance.id;
// 				self.instanceMappings[instance.id] = compId;

// 				if(!instances[compName]){
// 					instances[compName] = [instance.id];
// 				}
// 				else{
// 					instances[compName].push(instance.id);
// 				}
// 			});
// 			resolve(instances);
// 		})
// 		.catch(function(err){
// 			console.log('[SchedulerHelper] encountered an error trying to run code on a device');
// 			reject();
// 		});

// 	});

// }

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
		var nameTokens = stop.app.split('/');
		var instanceId = self.componentMappings[stop.app] || nameTokens[1];
		var codeName = nameTokens[0];

		self.dispatcher.killCode(device, codeName, instanceId).then(function(data){
			console.log('[SchedulerHelper]', data);
		})
		.catch(function(err){
			console.log('[SchedulerHelper] Unable to stop '+codeName);
		});

	});

	migrateSchedule.forEach(function(migrate){
		var nameTokens = migrate.app.split('/');
		var instanceId = self.componentMappings[migrate.app] || nameTokens[1];
		var fromDevice = migrate.from;
		var codeName = nameTokens[0];
		var toDevice = migrate.to;
		self.dispatcher.moveCode(fromDevice, toDevice, codeName, instanceId).then(function(data){
			console.log('[SchedulerHelper]', data);
		})
		.catch(function(err){
			console.log('[SchedulerHelper] Unable to migrate ' +codeName);
		});
	});

	return new Promise(function(resolve, reject){
		getInstances.then(function(data){
			resolve(data);
		})
		.catch(function(err){
			reject(err);
		});
	});
}

SchedulerHelper.prototype.getComponentId = function(instanceId){
	return self.instanceMappings[instanceId];
}

module.exports = SchedulerHelper;