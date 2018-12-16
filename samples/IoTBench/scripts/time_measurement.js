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
	decisiontreeclassify: 'decisiontreeclassify',

	accumulator: 'accumulator',
	blockwindowavg: 'blockwindowavg', 
	dac: 'dac',
	kalmanfilter: 'kalmanfilter',
	slr: 'slr',

	average: 'average',
	decisiontreepred: 'decisiontreepred',
	mlrpredict: 'mlrpredict',
	residualerror: 'residualerror'

};

var endComponents = {
	accumulator: 'accumulator',
	mltrain: 'mltrain',
	decisiontreetrain: 'decisiontreetrain',
	csvtosenml: 'csvtosenml',
	residualerror: 'residualerror',
	decisiontreepredict: 'decisiontreepredict'
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
			console.log('TOTAL', tag, timestamps[tag]);
			timestamps[tag] -= time;
		});
	}
}

pubsub.on('ready', function() {
	pubsub.subscribe(subscribeTopic, analyze);
});