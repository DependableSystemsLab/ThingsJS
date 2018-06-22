var things = require('../../../lib/things.js');

var pubsub_url = 'mqtt://localhost';
var topics = ['KalmanFilter', 'DistinctApproxCount', 'Average']
var pubsub_topic = 'thingsjs/IoTBench/STATS/';
var publish_topic = 'thingsjs/IoTBench/STATS/Average';

var pubsub = new things.Pubsub(pubsub_url);

function setup(){
	var args = process.argv.slice(2);
	var properties;

	if(!args.length){
		process.exit();
	}


}

function average(data){
	pubsub.publish(data, publish_topic);
}

pubsub.on('ready', function(){
	setup();
	console.log('Beginning Average');
	pubsub.subscribe(pubsub_topic, average);
});

