var things = require('things-js');
var fs = require('fs');

var subscribeTopic = 'iotbench/processing';
var pubsubUrl = 'mqtt://test.mosquitto.org';

var components = {
	spout: 'spout', 
	parse: 'parse',
	rangefilter: 'rangefilter',
	bloomfilter: 'bloomfilter',
	interpolate: 'interpolate',
	annotate: 'annotate',
	csvtosenml: 'csvtosenml'
};

var timestamps = {};

var pubsub = new things.Pubsub(pubsubUrl);

function analyze(data) {
	var endComponent = components.csvtosenml;

	id = data.id;
	comp = data.component;
	time = data.time;
	console.log(id, comp, time);

	if (timestamps[id]) {
		timestamps[id] += time;
	} else {
		timestamps[id] = time;
	}

	if (comp === endComponent) {
		console.log('RTT: ' + timestamps[id]);
		console.log('Avg processing time: ' + timestamps[id] / Object.keys(components).length);
	}
}

pubsub.on('ready', function() {
	pubsub.subscribe(subscribeTopic, analyze);
});