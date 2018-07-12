schedulerservice = require('./SchedulerService.js');

function test(){
	var service = new schedulerservice();
	service.on('ready', function(){
		console.log('Waiting 20s...');
		setTimeout(function(){
			console.log('Finished waiting!');
			var data = service._currentComponents();
			console.log(JSON.stringify(data));
		}, 20000);
	});
}
test();