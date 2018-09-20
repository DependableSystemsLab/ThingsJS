var things = require('things-js');

var pubsub_url = 'mqtt://localhost';
var pubsub_topic = 'thingsjs/IoTBench/ETL/Interpolation';
var publish_topic = 'thingsjs/IoTBench/ETL/Join'

var pubsub = new things.Pubsub(pubsub_url);



function setup(){
}

function join(data){
	pubsub.publish(data, publish_topic);
}

pubsub.on('ready', function(){
	setup();
	console.log('Beginning Join');
	pubsub.subscribe(pubsub_topic, join);
});

