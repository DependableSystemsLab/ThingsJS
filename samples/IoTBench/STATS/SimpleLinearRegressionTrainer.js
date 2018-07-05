var things = require('../../../lib/things.js');
var slr = require('ml-regression').SLR;
var fs = require('fs');

var pubsub_url = 'mqtt://localhost';
var pubsub_topic = 'thingsjs/IoTBench/ETL/SenMLParse';

/* training variables */
var TRAINING_SIZE, USE_MSG_FIELDLIST, MODEL_PATH;
var X = [];
var Y = [];
var regressionModel;
var done = false;

var pubsub = new things.Pubsub(pubsub_url);

function setup(){
	var args = process.argv.slice(2);
	var properties;

	// default to TAXI property set if no specific property file is given
	if(!args.length){
		args = ['../ETL/TAXI_properties.json'];
	}
	try{
		properties = JSON.parse(fs.readFileSync(args[0], 'utf-8'));
	}
	catch(e){
		console.log('Problem reading properties file: ' + e);
		process.exit();
	}
	USE_MSG_FIELDLIST = properties['PREDICT.SIMPLE_LINEAR_REGRESSION.USE_MSG_FIELD_LIST'];
	TRAINING_SIZE = properties['PREDICT.SIMPLE_LINEAR_REGRESSION.WINDOW_SIZE_TRAIN'] || 10;
	MODEL_PATH = properties['PREDICT.SIMPLE_LINEAR_REGRESSION.MODEL_PATH'];
}

function train(data){
	if(done){
		return;
	}
	if(X.length === TRAINING_SIZE){
		done = true;
		console.log('Finished training with '+ TRAINING_SIZE + ' points');
		regressionModel = new slr(X, Y);
		// save b_0 and b_1 coefficients into the model file
		fs.writeFile(MODEL_PATH, JSON.stringify(regressionModel.coefficients), function(err){
			if(err){
				console.log('Error with writing regression to path: ' + err);
			}
			else{
				console.log('Finished writing regression model to '+MODEL_PATH);
			}
			process.exit();
		});
	}
	else{
		var xKey = USE_MSG_FIELDLIST[0];
		var yKey = USE_MSG_FIELDLIST[1];

		X.push(Number(data[xKey]));
		Y.push(Number(data[yKey]));
	}
}

pubsub.on('ready', function(){
	setup();
	console.log('Beginning training for linear regression');
	pubsub.subscribe(pubsub_topic, train);
});