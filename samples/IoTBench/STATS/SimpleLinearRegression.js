var things = require('things-js');
var fs = require('fs');

var pubsub_url = 'mqtt://localhost';
var pubsub_topic = 'thingsjs/IoTBench/STATS/KalmanFilter';
var publish_topic = 'thingsjs/IoTBench/STATS/SLR';

var pubsub = new things.Pubsub(pubsub_url);

/* linear regression fields */
var MODEL_PATH, USE_MSG_FIELDLIST;
var b_0, b_1;

function setup(){
	var args = process.argv.slice(2);
	var properties;

	// default to TAXI property set if no specific property file is given
	if(!args.length){
		args = ['./TAXI_properties.json'];
	}
	try{
		properties = JSON.parse(fs.readFileSync(args[0], 'utf-8'));
	}
	catch(e){
		console.log('Problem reading properties file: ' + e);
		process.exit();
	}
	USE_MSG_FIELDLIST = properties['PREDICT.SIMPLE_LINEAR_REGRESSION.USE_MSG_FIELD_LIST'];
	MODEL_PATH = properties['PREDICT.SIMPLE_LINEAR_REGRESSION.MODEL_PATH'];
	try{
		console.log(MODEL_PATH);
		var coefficients = JSON.parse(fs.readFileSync(MODEL_PATH, 'utf-8'));
		b_0 = coefficients[0];
		b_1 = coefficients[1];
	}
	catch(e){
		console.log('Problem fetching linear regression model from file path: ' + e);
		process.exit();
	}
}

function linearRegression(data){
	var xKey = USE_MSG_FIELDLIST[0];
	var yKey = USE_MSG_FIELDLIST[1];
	var prediction = b_0 + b_1 * data[xKey];
	console.log('Prediction: ' +prediction +'. Actual: '+data[yKey]);

	var predictionJSON = {};
	predictionJSON[yKey + '_prediction'] = prediction;
	predictionJSON[yKey + '_actual'] = data[yKey];
	pubsub.publish(publish_topic, predictionJSON);
}

pubsub.on('ready', function(){
	setup();
	console.log('Beginning linear regression');
	pubsub.subscribe(pubsub_topic, linearRegression);
});
