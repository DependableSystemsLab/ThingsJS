var things = require('things-js');
var fs = require('fs');
var mongoUrl = 'mongodb://localhost:27017/things-js-fs';
var GFS = require('things-js').addons.gfs(mongoUrl);

var pubsub_url = 'mqtt://localhost';
var pubsub_topic = 'thingsjs/IoTBench/SenMLParse';
var publish_topic = 'thingsjs/IoTBench/STATS/KalmanFilter';

var pubsub = new things.Pubsub(pubsub_url);

/* kalman filter properties */
var PROCESS_NOISE, SENSOR_NOISE, USE_MSG_FIELD, USE_MSG_FIELDLIST;
var previousEstimation;
var prevErrorCovariance;

function setup(){
	var args = process.argv.slice(2);
	var properties;

	// default to TAXI property set if no specific property file is given
	if(!args.length){
		args = ['./TAXI_properties.json'];
	}
	GFS.readFile(args[0], function(err2, data) {
        if (err2) {
            console.log('\x1b[44m%s\x1b[0m', 'Couldn\'t fetch properties: ' + err2);
            process.exit();
        }
        properties = JSON.parse(data);
		USE_MSG_FIELD = properties['STATISTICS.KALMAN_FILTER.USE_MSG_FIELD'] || 0;
		USE_MSG_FIELDLIST = properties['STATISTICS.KALMAN_FILTER.USE_MSG_FIELD_LIST'];
		SENSOR_NOISE = properties['STATISTICS.KALMAN_FILTER.SENSOR_NOISE'] || 0.1;
		PROCESS_NOISE = properties['STATISTICS.KALMAN_FILTER.PROCESS_NOISE'] || 0.1;
		prevErrorCovariance = properties['STATISTICS.KALMAN_FILTER.ESTIMATED_ERROR'] || 1;
		previousEstimation = 0;
		console.log('Beginning Kalman Filter');
		pubsub.subscribe(pubsub_topic, kalmanfilter);
});
}

function kalmanfilter(data){
	var z_measureValue;
	var field;

	if(USE_MSG_FIELD > 0){
		field = USE_MSG_FIELDLIST[USE_MSG_FIELD-1];
		z_measureValue = data[field];
	}
	else if(USE_MSG_FIELD == 0){
		z_measureValue = data[USE_MSG_FIELDLIST];
	}
	else{
		// generate a value of 10 +/- 1.0
		z_measureValue = 10 + ((Math.random() >= 0.5) ? -1 : 1) * (Math.random().toFixed(1));
	}

	var currErrorCovariance = prevErrorCovariance + PROCESS_NOISE;
	var kalmanGain = currErrorCovariance / (currErrorCovariance + SENSOR_NOISE);
	var currentEstimation = previousEstimation + kalmanGain * (z_measureValue - previousEstimation);

	currErrorCovariance = ( 1 - kalmanGain ) * currErrorCovariance;
	previousEstimation = currentEstimation;
	prevErrorCovariance = currErrorCovariance;

	if(USE_MSG_FIELD >= 0){
		console.log("Fixed value for field " + field + " from " + z_measureValue + " to " + currentEstimation);
		data[field] = currentEstimation;
	}
	pubsub.publish(publish_topic, data);
}

pubsub.on('ready', function(){
	setup();
});
