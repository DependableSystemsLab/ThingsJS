<<<<<<< HEAD
var things = require('../../../lib/things.js');
var fs = require('fs');
=======
var things = require('things-js');
var fs = require('fs');
var mongoUrl = 'mongodb://localhost:27017/things-js-fs';
var GFS = require('things-js').addons.gfs(mongoUrl);
>>>>>>> dev

var pubsub_url = 'mqtt://localhost';
var pubsub_topic = 'thingsjs/IoTBench/STATS/KalmanFilter';
var publish_topic = 'thingsjs/IoTBench/STATS/SLR';
<<<<<<< HEAD

=======
var coefficients = [-0.08823332241427906,0.0024496898226796376];
>>>>>>> dev
var pubsub = new things.Pubsub(pubsub_url);

/* linear regression fields */
var MODEL_PATH, USE_MSG_FIELDLIST;
var b_0, b_1;

function setup(){
	var args = process.argv.slice(2);
	var properties;

	// default to TAXI property set if no specific property file is given
	if(!args.length){
<<<<<<< HEAD
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
=======
		args = ['./TAXI_properties.json'];
	}

	GFS.readFile(args[0], function(err2, data) {
        if (err2) {
            console.log('\x1b[44m%s\x1b[0m', 'Couldn\'t fetch properties: ' + err2);
            process.exit();
        }
	    properties = JSON.parse(data);
		USE_MSG_FIELDLIST = properties['PREDICT.SIMPLE_LINEAR_REGRESSION.USE_MSG_FIELD_LIST'];
		MODEL_PATH = properties['PREDICT.SIMPLE_LINEAR_REGRESSION.MODEL_PATH'];
		b_0 = coefficients[0];
		b_1 = coefficients[1];
		console.log('Beginning linear regression');
		pubsub.subscribe(pubsub_topic, linearRegression);
		});
	}
>>>>>>> dev

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
<<<<<<< HEAD
	console.log('Beginning linear regression');
	pubsub.subscribe(pubsub_topic, linearRegression);
});

=======
});
>>>>>>> dev
