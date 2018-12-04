var things = require('things-js');
var fs = require('fs');
var mongoUrl = 'mongodb://localhost:27017/things-js-fs';
var GFS = require('things-js').GFS(mongoUrl);

/* configurable variables */
var gfsFlag = true;
var pubsubUrl = 'mqtt://test.mosquitto.org';
var processingTopic = 'iotbench/processing';
var subscribeTopic = processingTopic + '/parse';
var publishTopic = processingTopic + '/blockwindowavg';
var propertiesPath = './TAXI_properties.json';

/* avg fields */
var BLOCK_AVG, USE_MSG_FIELD, USE_MSG_FIELD_LIST;
var aggCount = 0, aggSum = 0, start;
var ids = [];

var pubsub = new things.Pubsub(pubsubUrl);

function beginComponent(properties) {
	BLOCK_AVG = properties['AGGREGATE.BLOCK_COUNT.WINDOW_SIZE'];
	USE_MSG_FIELD = properties['AGGREGATE.BLOCK_COUNT.USE_MSG_FIELD'] || 0;
	USE_MSG_FIELD_LIST = properties['AGGREGATE.BLOCK_COUNT.USE_MSG_FIELD_LIST'];

	console.log('Beginning Average');
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
	var data = JSON.parse(msg);
	var id = data.id;
	var content = data.content;

	if (aggCount === 0) {
		start = Date.now();
	}

	var fields;
	if (USE_MSG_FIELD_LIST > 0) {
		field = USE_MSG_FIELD_LIST[USE_MSG_FIELD - 1];
	} else {
		var keys = Object.keys(content);
		var ranIndex = math.ceil(Math.random() * keys.length);
		field = keys[ranIndex];
	}

	try {
		aggSum += Number(content[field]);
	} catch(e) {
		console.log('Field value must be a number');
		return;
	}

	if (aggCount > BLOCK_AVG) {
		var aggRes = aggSum / BLOCK_AVG;

		var end = Date.now();
		var elapsed = end - start;
		pubsub.publish(subscribeTopic, { ids: ids, component: 'blockwindowavg', time: elapsed });

		var avg = {};
		avg[field + '_average'] = aggRes;
		pubsub.publish(publishTopic, JSON.stringify({ ids: ids, content: avg }));

		aggCount = 0;
		aggSum = 0;
		ids = [];
	}
	aggCount++;
}

pubsub.on('ready', function() {
	setup();
});
