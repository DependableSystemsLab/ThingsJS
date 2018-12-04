var things = require('things-js');
var fs = require('fs');
var mongoUrl = 'mongodb://localhost:27017/things-js-fs';
var GFS = require('things-js').GFS(mongoUrl);

/* configurable variables */
var gfsFlag = true;
var pubsubUrl = 'mqtt://test.mosquitto.org';
var processingTopic = 'iotbench/processing';
var subscribeTopics = ['/slr', '/average', '/dac'];
var publishTopic = processingTopic + '/accumulator';
var propertiesPath = './TAXI_properties.json';

/* accumulator fields */
var WINDOW_SIZE, start;
var ids = [];
var accumulation = {};
var counter = 0;

var pubsub = new things.Pubsub(pubsubUrl);

function beginComponent(properties) {
	WINDOW_SIZE = properties['AGGREGATE.ACCUMULATOR.TUPLE_WINDOW_SIZE'];
	console.log('Beginning accumulation');
	subscribeTopics.forEach(function(topic) {
		pubsub.subscribe(processingTopic + topic, accumulate);
	});
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

function accumulate(msg) {
	counter++;
	var data = JSON.parse(msg);
	var id = data.id;
	var content = data.content;
	ids.push(id);

	if (counter == 1) {
		start = Date.now();
	}

	for (field in content) {
		var obj = { value: content[field], ts: Date.now() };
		if (field in accumulation) {
			accumulation[field].push(obj);
		} else {
			accumulation[field] = [obj];
		}
	}

	if (counter === WINDOW_SIZE) {
		var end = Date.now();
		var elapsed = end - start;
		pubsub.publish(processingTopic, { ids: ids, component: 'accumulator', time: elapsed });
		pubsub.publish(publishTopic, JSON.stringify({ ids: ids, content: content }));
		console.log(JSON.stringify(accumulation));

		counter = 0;
		accumulation = {};
		ids = [];
	}
}

pubsub.on('ready', function() {
	setup();
});
