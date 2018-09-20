SchedulerService = require('./SchedulerService.js');
var things = require('../things.js');

var scheduler = new SchedulerService();
scheduler.on('ready', function(){
	scheduler.run();
});
