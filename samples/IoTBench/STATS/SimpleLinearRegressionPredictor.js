var things = require('things-js');
var fs = require('fs');

var pubsub_url = 'mqtt://localhost';
var pubsub_topic = 'thingsjs/IoTBench/STATS/KalmanFilter';
var publish_topic = 'thingsjs/IoTBench/STATS/SLR';

var pubsub = new things.Pubsub(pubsub_url);

/* linear regression variables */
var USE_MSG_FIELD, TRAIN_WINDOW_SIZE, PREDICT_WINDOW_SIZE;
var trailWindowItems = [];
var itemCount = 0;
var predictions = [];


function setup(){
	var args = process.argv.slice(2);
	var properties;

	if(!args.length){
		console.log('Please provide a properties file');
		process.exit();
	}
	try{
		properties = JSON.parse(fs.readFileSync(args[0], 'utf-8'));
	}
	catch(e){
		console.log('Unable to read properties file: ' + e);
		process.exit();
	}
	USE_MSG_FIELD = properties['PREDICT.SIMPLE_LINEAR_REGRESSION.USE_MSG_FIELD'] || 0;
	TRAIN_WINDOW_SIZE = properties['PREDICT.SIMPLE_LINEAR_REGRESSION.WINDOW_SIZE_TRAIN'] || 10;
	PREDICT_WINDOW_SIZE = properties['PREDICT.SIMPLE_LINEAR_REGRESSION.WINDOW_SIZE_PREDICT'] || 10;
}

function doRegression(data){
	pubsub.publish(data, publish_topic);
}

pubsub.on('ready', function(){
	setup();
	console.log('Beginning simple linear regression');
	pubsub.subscribe(pubsub_topic, doRegression);
});

