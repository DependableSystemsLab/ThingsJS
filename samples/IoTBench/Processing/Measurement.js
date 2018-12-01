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
	csvtosenml: 'csvtosenml',

	mlrtrain: 'mlrtrain',
	decisiontreetrain: 'decisiontreetrain',
	decisiontreeclassify: 'decisiontreeclassify'
};

var endComponents = {
	mltrain: 'mltrain',
	decisiontreetrain: 'decisiontreetrain',
	csvtosenml: 'csvtosenml'
}

var timestamps = {};

var pubsub = new things.Pubsub(pubsubUrl);

function analyze(data) {
	var ids = ('id' in data) ? [data.id] : data.ids;
	var comp = data.component;
	var time = data.time;

	console.log(ids.join(','), comp, time);

	ids.forEach(function(tag) {
		if (timestamps[tag]) {
			timestamps[tag] += time;
		} else {
			timestamps[tag] = time;
		}
	});

	if (comp in endComponents) {
		ids.forEach(function(tag) {
			console.log('RTT', tag, timestamps[tag]);
			timestamps[tag] -= time;
		});
	}
}

pubsub.on('ready', function() {
	pubsub.subscribe(subscribeTopic, analyze);
});