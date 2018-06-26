var things = require('../things.js');
var fs = require('fs');
var EventEmitter = require('events').EventEmitter;

function Scheduler(){
	var self = this;
	EventEmitter.call(this);
	this.dispatcher = new things.Dispatcher();
	this.instanceMappings = {};
	this.pubsub = new things.Pubsub();
	this.dispatcher.on('ready', function(){
		self.pubsub.on('ready', function(){
			self.emit('ready');
		});
	});
}
Scheduler.prototype = new EventEmitter();
Scheduler.prototype.constructor = Scheduler;


Scheduler.prototype.getDeviceMemory = function(device){
	var self = this;
	if(device in self.dispatcher.engines){
		// get the last timestamp reading
		var stats = self.dispatcher.engines[device].stats;
		var latestStat = stats[stats.length-1];
		console.log(JSON.stringify(latestStat['memory']));
	}
}

Scheduler.prototype.runSchedule = function(schedule){
	var self = this;
	for(device in schedule){
		var instances = schedule[device];

		instances.forEach(function(instance){
			var fileName = instance.substring(0, instance.indexOf('/'));
			rawCode = fs.readFileSync(fileName, 'utf-8');
			console.log('Trying to run:');
			console.log(device, instance);
			self.dispatcher.runCode(device, fileName, rawCode).then(function(data){
				self.instanceMappings[instance] = data.id;
				console.log(data.id);
			});
		});
	}
}

Scheduler.prototype.reSchedule = function(newSchedule){
	var self = this;
	var runCmds = newSchedule['run'];
	var stopCmds = newSchedule['stop'];
	var migrateCmds = newSchedule['migrate'];

	var schedule = {};
	runCmds.forEach(function(run){
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

	stopCmds.forEach(function(stop){
		var device = stop.device;
		var code = stop.app;
	});

	migrateCmds.forEach(function(migrate){
		console.log("TRYING TO MIGRATE: " + JSON.stringify(migrate));
		var instanceId = self.instanceMappings[migrate.app];
		var fromDevice = migrate.from;
		var codeName = migrate.app.substring(0, migrate.app.indexOf('/'));
		var toDevice = migrate.to;
		self.dispatcher.moveCode(fromDevice, toDevice, codeName, instanceId).then(function(data){
			console.log(data);
		});
	});
}


var schedule = 
{ 'pi0-1': [ 'sprinkler.js/0', 'shade-contr.js/1' ],
 'pi3-3': [ 'sprinkler.js/1', 'shade-contr.js/2' ],
 'pi3-1': [ 'sprinkler.js/2', 'shade-contr.js/3' ],
 'pi3-2': [ 'sprinkler.js/3', 'temp-reg.js/0' ],
 'i7-1': [ 'shade-contr.js/0', 'temp-reg.js/1' ] };

var schedule2 = 
{ run: [ { app: 'shade-contr.js/5', device: 'pi3-3' } ],
 stop:
  [ { app: 'sprinkler.js/0', device: 'pi0-1' },
    { app: 'shade-contr.js/0', device: 'pi-1' } ],
 continueRun:
  [ { app: 'temp-reg.js/0', device: 'pi3-2' } ],
 migrate: [ { app: 'sprinkler.js/3', from: 'pi3-2', to: 'pi0-1' } ] };

// example usage
var scheduler = new Scheduler();
scheduler.on('ready', function(){

	// wait for devices to be registered
	setTimeout(function(){
		scheduler.runSchedule(schedule);
		console.log('Before');
		scheduler.getDeviceMemory('pi0-1');

		// new schedule after 15s
		setTimeout(function(){
			scheduler.reSchedule(schedule2);
		}, 15000);

	}, 2000);
});

module.exports = Scheduler;