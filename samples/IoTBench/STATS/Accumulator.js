var things = require('things-js');
var fs = require('fs');

var pubsub_url = 'mqtt://localhost';
var pubsub_topics = ['SLR', 'DistinctApproxCount', 'BlockWindowAverage']
var pubsub_heading = 'thingsjs/IoTBench/STATS/';
var publish_topic = 'thingsjs/IoTBench/STATS/Accumulator';

/* accumulator fields */
var WINDOW_SIZE;
var accumulation = {};
var counter = 0;

var pubsub = new things.Pubsub(pubsub_url);

function setup(){
	var args = process.argv.slice(2);
	var properties;

	// default to TAXI property set if no specific property file is given
	if(!args.length){
		args = ['../TAXI_properties.json'];
	}
	try{
		properties = JSON.parse(fs.readFileSync(args[0], 'utf-8'));
	}
	catch(e){
		console.log('Problem reading properties file: ' + e);
		process.exit();
	}
	WINDOW_SIZE = properties['AGGREGATE.ACCUMULATOR.TUPLE_WINDOW_SIZE'];
}

function accumulate(data){
	counter++;
	var time = Date.now();

	for(field in data){
		var obj = { value: data[field], ts: time };
		if(field in accumulation){
			accumulation[field].push(obj);
		}
		else{
			accumulation[field] = [obj];
		}
	}
	if(counter === WINDOW_SIZE){
		console.log(JSON.stringify(accumulation));
		pubsub.publish(publish_topic, accumulation);
		accumulation = {};
		counter = 0;
	}
}

pubsub.on('ready', function(){
	setup();
	console.log('Beginning accumulation');
	pubsub_topics.forEach(function(topic){
		pubsub.subscribe(pubsub_heading + topic, accumulate);
	});
});
