/* KalmanFilter adapted from RIoTBench
 * modified for measuring processing time
 */
var things = require('things-js');
var fs = require('fs');

/* configurable variables */
var pubsubUrl = 'mqtt://test.mosquitto.org';
var processingTopic = 'iotbench/processing';
var subscribeTopic = processingTopic + '/parse';
var publishTopic = processingTopic + '/kalmanfilter';
var propertiesPath = './TAXI_properties.json';

var pubsub = new things.Pubsub(pubsubUrl);

/* kalman filter properties */
var PROCESS_NOISE, SENSOR_NOISE, USE_MSG_FIELD, USE_MSG_FIELDLIST;
var previousEstimation;
var prevErrorCovariance;

function setup() {
	var properties; 
	try {
		properties = JSON.parse(fs.readFileSync(propertiesPath, 'utf-8'));
	} catch(e) {
		console.log('Problem reading properties file: ' + e);
		process.exit();
	}
	USE_MSG_FIELD = properties['STATISTICS.KALMAN_FILTER.USE_MSG_FIELD'] || 0;
	USE_MSG_FIELDLIST = properties['STATISTICS.KALMAN_FILTER.USE_MSG_FIELD_LIST'];
	SENSOR_NOISE = properties['STATISTICS.KALMAN_FILTER.SENSOR_NOISE'] || 0.1;
	PROCESS_NOISE = properties['STATISTICS.KALMAN_FILTER.PROCESS_NOISE'] || 0.1;
	prevErrorCovariance = properties['STATISTICS.KALMAN_FILTER.ESTIMATED_ERROR'] || 1;
	previousEstimation = 0;
}

function kalmanfilter(msg) {
	var start = Date.now();
	var data = JSON.parse(msg);
	var content = data.content;

	var zMeasureValue;
	var field;

	if (USE_MSG_FIELD > 0) {
		field = USE_MSG_FIELDLIST[USE_MSG_FIELD - 1];
		zMeasureValue = content[field];
	} else if (USE_MSG_FIELD == 0) {
		zMeasureValue = data[USE_MSG_FIELDLIST];
	} else {
		// generate a value of 10 +/- 1.0
		zMeasureValue = 10 + ((Math.random() >= 0.5) ? -1 : 1) * (Math.random().toFixed(1));
	}
	var currErrorCovariance = prevErrorCovariance + PROCESS_NOISE;
	var kalmanGain = currErrorCovariance / (currErrorCovariance + SENSOR_NOISE);
	var currentEstimation = previousEstimation + kalmanGain * (zMeasureValue - previousEstimation);

	currErrorCovariance = (1 - kalmanGain) * currErrorCovariance;
	previousEstimation = currentEstimation;
	prevErrorCovariance = currErrorCovariance;

	var end = Date.now();
	var elapsed = end - start;
	pubsub.publish(processingTopic, { id: id, component: 'kalmanfilter', time: elapsed });

	if (USE_MSG_FIELD >= 0) {
		console.log('Fixed value for field ' + field + ' from ' + zMeasureValue + ' to ' + currentEstimation);
		content[field] = currentEstimation;
	}
	pubsub.publish(publishTopic, JSON.stringify({ id: id, content: content }));
}

pubsub.on('ready', function() {
	setup();
	console.log('Beginning Kalman Filter');
	pubsub.subscribe(subscribeTopic, kalmanfilter);
});
