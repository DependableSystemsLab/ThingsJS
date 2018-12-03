/* BlockWindowAverage adapted from RIoTBench 
 * modified for processing rate measurements
 */
var things = require('things-js');
var fs = require('fs');
var mongoUrl = 'mongodb://localhost:27017/things-js-fs';
var GFS = require('things-js').GFS(mongoUrl);

/* configurable variables */
var gfsFlag = true;
var pubsubUrl = 'mqtt://test.mosquitto.org';
var processingTopic = 'iotbench/processing';
var subscribeTopic = processingTopic + '/parse';
var publishTopic = processingTopic + '/average';
var propertiesPath = './TAXI_properties.json';

var pubsub = new things.Pubsub(pubsubUrl);

/* avg fields */
var BLOCK_AVG, USE_MSG_FIELD, USE_MSG_FIELDLIST;
var aggCount, aggSum, aggRes;

function beginComponent(properties) {
	BLOCK_AVG = properties['AGGREGATE.BLOCK_COUNT.WINDOW_SIZE'];
	USE_MSG_FIELD = properties['AGGREGATE.BLOCK_COUNT.USE_MSG_FIELD'] || 0;
	USE_MSG_FIELDLIST = properties['AGGREGATE.BLOCK_COUNT.USE_MSG_FIELD_LIST'];
	aggCount, aggSum = 0;	
	console.log('Beginning averaging');
	pubsub.subscribe(subscribeTopic, average);
}

function setup() {
	var properties;
	if (gfsFlag) {
		GFS.readFile(propertiesPath, function(err, data) {
			if (err) {
				console.log('Problem fetching properties: ' + err);
				process.exit();
			}
			properties = JSON.parse(data);
			beginComponent(properties);
		});
	} else {
		try {
			properties = JSON.parse(fs.readFileSync(propertiesPath, 'utf-8'));
		} catch (e) {
			console.log('Problem fetching properties: ' + e);
			process.exit();
		}
		beginComponent(properties);
	}
}

function average(msg) {
	var start = Date.now();
	
	var data = JSON.parse(msg);
	var id = data.id;
	var content = data.content;

	var field;
	if (USE_MSG_FIELD > 0) {
		field = USE_MSG_FIELDLIST[USE_MSG_FIELD - 1];
	} else {
		var keys = Object.keys(content);
		var ranIndex = Math.ceil(Math.random() * keys.length);
		field = keys[ranIndex];
	}

	try {
		aggSum += Number(data[field]);
	} catch (e) {
		console.log('Field value must be a number');
		return;
	}
	aggCount++;

	if (aggCount > BLOCK_AVG) { 
		aggRes = aggSum / BLOCK_AVG; 
		aggCount, aggSum = 0;

		console.log('Average ' + field + ' over ' + BLOCK_AVG + ' values: ' + aggRes);
		var avgJSON = {};
		avgJSON[field + '_average'] = aggRes;
		pubsub.publish(publishTopic, avgJSON);
	}
}


pubsub.on('ready', function() {
	setup();
});	
