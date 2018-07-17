SchedulerService = require('./SchedulerService.js');
var things = require('../things.js');

var RUN_APPLICATION_NAMESPACE = 'runApplication';
var STOP_APPLICATION_NAMESPACE = 'stopApplication';
var REPLY_APPLICATION_NAMESPACE = 'applicationDetails';

var req = 
{
	name: 'NEW_APP',
	id: '1337',
	components: { 'Test.js': { 'num_instances': 2, 'required_memory': 100000 } }
}


function test(){

	function testNewSchedule(pubsub, request){
		console.log('==== Testing creating a schedule over pubsub ====');
		pubsub.publish(RUN_APPLICATION_NAMESPACE, request);
	}


	var service = new SchedulerService();
	service.on('ready', function(){
		var pubsub = new things.Pubsub();

		pubsub.on('ready', function(){
			console.log('Waiting 2s for devices to register first...');
			// wait a few seconds until devices register
			setTimeout(function(){
				console.log('Finished waiting...');
				testNewSchedule(pubsub, req);
				service.run();
			}, 2000);
		});
	});

}
test();