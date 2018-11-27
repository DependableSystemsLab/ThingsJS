/* Interpolation file adapted from RIoTbench
 * modified for processing rate measurements
 */
var things = require('things-js');
var fs = require('fs');

/* configurable variables */
var pubsubUrl = 'mqtt://test.mosquitto.org';
var processingTopic = 'iotbench/processing';
var subscribeTopic = processingTopic + '/bloomfilter';
var publishTopic = processingTopic + '/interpolate';
var propertiesPath = './TAXI_properties.json';

var pubsub = new things.Pubsub(pubsubUrl);

/* interpolation properties */
var ID = 'ID';
var USE_MSG_FIELD_LIST, WINDOW_SIZE;
var valuesMap = {};

function setup() {
	var properties;
	try {
		properties = JSON.parse(fs.readFileSync(propertiesPath, 'utf-8'));
		USE_MSG_FIELD_LIST = properties['INTERPOLATION.USE_MSG_FIELD_LIST'];
		WINDOW_SIZE = properties['INTERPOLATION.WINDOW_SIZE'] || 0;

		if (!USE_MSG_FIELD_LIST) {
			console.log('No fields to interpolate');
			process.exit();
		}
	} catch(e) {
		console.log('Couldn\'t fetch properties: ' + e);
		process.exit();
	}
}

function interpolate(msg) {
	var start = Date.now();
	var end;
	var data = JSON.parse(msg);
	var id = data.id;
	var content = data.content;

	if (WINDOW_SIZE === 0) {
		// do nothing with the data and just publish
		console.log('No interpolation needed.');
		end = Date.now();
	} else {
		USE_MSG_FIELD_LIST.forEach(function(field) { 
			var key = ID + field;
			if (field in content) {
				if (key in valuesMap) {
					if (content[field] === null) {
						var count = 0;
						valuesMap[key].forEach(function(val) {
							count += val;
						});
						var newValue = (count) / (valuesMap[key].length);
						console.log('Interpolated field' + field + 'with new value: ' + newValue);
						content[field] = newValue;

					} else {
						// add the new data in
						if (valuesMap[key].length === WINDOW_SIZE) {
							valuesMap.splice(0, 1);
						}
						valuesMap[key].push(content[field]);
					}

				} else if (content[field] !== null) {
					valuesMap[key] = [content[field]];
				}
			}
		});
		end = Date.now();
	}
	var elapsed = end - start;
	pubsub.publish(processingTopic, { id: id, component: 'interpolate', time: elapsed });
	pubsub.publish(publishTopic, JSON.stringify({ id: id, content: content }));
}

pubsub.on('ready', function(){
	setup();
	console.log('Beginning Interpolation');
	pubsub.subscribe(subscribeTopic, interpolate);
});
