/*
 * Publishes filtered SenML data (already parsed) over pub sub, adopted from RIoTBench
 * modified for processing rate measurements
 */
var things = require('things-js');
var fs = require('fs');
var mongoUrl = 'mongodb://localhost:27017/things-js-fs';
var GFS = require('things-js').GFS(mongoUrl);

/* configurable variables */
var gfsFlag = false;
var pubsubUrl = 'mqtt://test.mosquitto.org';
var processingTopic = 'iotbench/processing';
var subscribeTopic = processingTopic + '/parse';
var publishTopic = processingTopic + '/rangefilter';
var propertiesPath = './TAXI_properties.json';

var pubsub = new things.Pubsub(pubsubUrl);

/* range filter definitions */
var ranges = {};

function MinMax(min, max){
	this.min = min;
	this.max = max;
}

function beginComponent(properties) {
	var validRanges = properties['FILTER.RANGE_FILTER.VALID_RANGE'];

	for (field in validRanges) {
		var tokens = validRanges[field].split(':');
		try {
			var rng = new MinMax(parseFloat(tokens[0]), parseFloat(tokens[1]));
			ranges[field] = rng;
		} catch(e) {
			console.log('Error parsing value: ' + e);
			process.exit();
		}
	}
	console.log('Beginning range filter');
	pubsub.subscribe(subscribeTopic, checkRange);	
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

function checkRange(msg) {
	var start = Date.now();
	var success = true;
	var data = JSON.parse(msg);
	var id = data.id;
	var content = data.content;

	for (field in ranges) {
		if (field in content) {
			if ((content[field] > ranges[field].max) || (content[field] < ranges[field].min)) {
				success = false;
			}
		}
	}

	var end = Date.now();
	var elapsed = end - start;
	pubsub.publish(processingTopic, { id: id, component: 'rangefilter', time: elapsed });
	if (success) {
		console.log('Data for line ' + id + ' met the range criteria');
		pubsub.publish(publishTopic, JSON.stringify({ id: id, content: content }));
	} else {
		console.log('Data for line ' + id + ' failed to meet range criteria');
	}
}


pubsub.on('ready', function(){
	setup();
});
