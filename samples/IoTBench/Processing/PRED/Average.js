var things = require('things-js');

/* configurable variables */
var pubsubUrl = 'mqtt://test.mosquitto.org';
var processingTopic = 'iotbench/processing';
var subscribeTopic = processingTopic + '/parse';
var publishTopic = processingTopic + '/average';
var propertiesPath = './TAXI_properties.json';

/* avg fields */
var AVERAGE_TARGET, aggCount = 0, aggSum = 0;
var dataList = [], ids = [], start;
var WINDOW_SIZE = 10;

var pubsub = new things.Pubsub(pubsubUrl);

function setup() {
	var properties;
	try {
		properties = JSON.parse(fs.readFileSync(propertiesPath, 'utf-8'));
	} catch(e) {
		console.log('Could not fetch properties');
		process.exit();
	}
	AVERAGE_TARGET = properties['AVERAGE.MULTIPLELINEAR_REGRESSION'];
}

function average(msg) {
	if (aggCount === 0) {
		start = Date.now();
	}
	aggCount++;
	var data = JSON.parse(msg);
	var id = data.id;
	var content = data.content;
	dataList.push(content);
	ids.push(id);

	if (aggCount > WINDOW_SIZE) {
		var tempSum = 0;
		dataList.forEach(function(element) {
			tempSum += Number(element[AVERAGE_TARGET]);
		});
		var avg = (tempSum) / (aggCount + 1);
		aggCount = 0;
		dataList = [];
		ids = [];

		var end = Date.now();
		var elapsed = end - start;
		pubsub.publish(processingTopic, { ids: ids, component: 'average', time: elapsed });
		pubsub.publish(publishTopic, JSON.stringify({ ids: ids, content: avg }));
	}
}


pubsub.on('ready', function() {
	setup();
	console.log('Beginning average');
	pubsub.subscribe(subscribeTopic, average);
});
