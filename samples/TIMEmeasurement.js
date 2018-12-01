var things = require('things-js');

var subscribeTopic = 'iotbench/processing';
var pubsub_url = 'mqtt://localhost';

var components = {
	spout: 'spout', 
	parse: 'parse',
	rangefilter: 'rangefilter',
	bloomfilter: 'bloomfilter',
	interpolate: 'interpolate',
	annotate: 'annotate',
	csvtosenml: 'csvtosenml'
};

var components_train = {
	spout: 'spout', 
	parse: 'parse',
	decisiontreetrain:"decisiontreetrain",
	multiregtrain:"multiregtrain",
	decisiontreeclassify:"decisiontreeclassify"
}
var timestamps = {};

var pubsub = new things.Pubsub(pubsub_url);

function analyze(data) {
	var endComponent = components_train.multiregtrain;
	data = JSON.parse(data);
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