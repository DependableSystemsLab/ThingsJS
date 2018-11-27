var things = require('things-js');
var slr = require('ml-regression').SLR;
var fs = require('fs');

var pubsubUrl = 'mqtt://test.mosquitto.org';
var processingTopic = 'iotbench/processing';
var subscribeTopic = processingTopic + '/parse';
var propertiesPath = './TAXI_properties.json';

/* training variables */
var TRAINING_SIZE, USE_MSG_FIELDLIST, MODEL_PATH;
var X = [];
var Y = [];
var regressionModel;

var pubsub = new things.Pubsub(pubsubUrl);

function setup() {
	var properties;

	try {
		properties = JSON.parse(fs.readFileSync(propertiesPath, 'utf-8'));
	} catch(e) {
		console.log('Problem reading properties file: ' + e);
		process.exit();
	}
	USE_MSG_FIELDLIST = properties['PREDICT.SIMPLE_LINEAR_REGRESSION.USE_MSG_FIELD_LIST'];
	TRAINING_SIZE = properties['PREDICT.SIMPLE_LINEAR_REGRESSION.WINDOW_SIZE_TRAIN'] || 300;
	MODEL_PATH = properties['PREDICT.SIMPLE_LINEAR_REGRESSION.MODEL_PATH'];
}

function train(msg) {
	var data = JSON.parse(msg);
	var content = data.content;

	if (X.length === TRAINING_SIZE) {
		done = true;
		console.log('Finished training with ' + TRAINING_SIZE + ' points ');
		regressionModel = new slr(X, Y);

		fs.writeFile(MODEL_PATH, JSON.stringify(regressionModel.coefficients), function(err) {
			if (err) {
				console.log('Error with writing regression to path: ' + err);
			} else {
				console.log('Finished writing regression model to ' + MODEL_PATH);
			}
			process.exit();
		});
	} else {
		var xKey = USE_MSG_FIELDLIST[0];
		var yKey = USE_MSG_FIELDLIST[1];

		X.push(Number(content[xKey]));
		Y.push(Number(content[yKey]));
	}
}

pubsub.on('ready', function() {
	setup();
	console.log('Beginning training for linear regression');
	pubsub.subscribe(subscribeTopic, train);
});