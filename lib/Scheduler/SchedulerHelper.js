var things = require('../things.js');
var fs = require('fs');
var EventEmitter = require('events').EventEmitter;

/**
 * A dispatcher wrapper to run schedules
 */
function SchedulerHelper(){
	var self = this;
	EventEmitter.call(this);

	this.dispatcher = new things.Dispatcher();
	this.instanceMappings = {};

	this.dispatcher.on('ready', function(){
		self.emit('ready');
	});
}
SchedulerHelper.prototype = new EventEmitter();
SchedulerHelper.prototype.constructor = SchedulerHelper;

/**
 * Runs code on specified devices based on a schedule
 *
 */
SchedulerHelper.prototype.runSchedule = function(schedule){
	var self = this;

	for(device in schedule){
		var codes = schedule[device];

		codes.forEach(function(code){
			var file = code.substring(0, code.indexOf('/'));
			var rawCode;
			try{
				rawCode = fs.readFileSync(file, 'utf-8');
			}
			catch(e){
				console.log('[Scheduler] Could not locate code');
				return;
			}
			console.log('[Scheduler] Trying to run: ');
			console.log(device, code);

			self.dispatcher.runCode(device, file, rawCode).then(function(data){
				self.instanceMappings[code] = data.id;
			})
			.catch(function(err){
				console.log('[Scheduler] Unable to run ' +code +' on device ' +device);
			});
		});
	}
}

/**
 * Executes subsequent schedules
 */
SchedulerHelper.prototype.reSchedule = function(newSchedule){
	var self = this;
	var schedule = {};

	var runSchedule = newSchedule['run'];
	var stopSchedule = newSchedule['stop'];
	var migrateSchedule = newSchedule['migrate'];

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
	self.runSchedule(schedule);

	stopSchedule.forEach(function(stop){
		var device = stop.device;
		var instanceId = self.instanceMappings[stop.app];
		var codeName = stop.app.substring(0, stop.app.indexOf('/'));

		self.dispatcher.killCode(device, codeName, instanceId).then(function(data){
			console.log('[Scheduler]', data);
		})
		.catch(function(err){
			console.log('[Scheduler] Unable to stop '+codeName);
		});

	});

	migrateSchedule.forEach(function(migrate){
		var instanceId = self.instanceMappings[migrate.app];
		var fromDevice = migrate.from;
		var codeName = migrate.app.substring(0, migrate.app.indexOf('/'));
		var toDevice = migrate.to;
		self.dispatcher.moveCode(fromDevice, toDevice, codeName, instanceId).then(function(data){
			console.log('[Scheduler]', data);
		})
		.catch(function(err){
			console.log('[Scheduler] Unable to migrate ' +codeName);
		});
	});
}

/***********************************************
      SAMPLE SCHEDULE JSON
***********************************************/

module.exports = SchedulerHelper;