/* bloom filter training model
 */ 
var things = require('things-js');
var bloom = require('bloomfilter').BloomFilter;
var fs = require('fs');

/* configurable variables */
var pubsubUrl = 'mqtt://test.mosquitto.org';
var subscribeTopic = 'iotbench/processing/parse';
var propertiesPath = './TAXI_properties.json';

/* bloom filter properties */
var DEFAULT_FALSEPOSITIVE = 0.1;
var DEFAULT_INSERTIONS = 20000000
var bloomFilter, testingRange, useMsgField, modelPath, k, newBloomFilter, n;

var pubsub = new things.Pubsub(pubsubUrl);

function getFilterSize(n, fpp) {
	return (-1) * Math.ceil( ( n * Math.log(fpp) ) / Math.pow(Math.log(2), 2) );
}

function getNumHashes(m, n) {
	return Math.ceil((m / n) * Math.log(2));
}

function serializeBloom() {
	var array = [].slice.call(bloomFilter.buckets);
	fs.writeFile(modelPath, JSON.stringify(array), function(err) {
		if (err) {
			console.log(err);
		} else {
			console.log('Serialized bloom filter to ' + modelPath);
		}
		process.exit();
	});
}

function setup() {
	var properties;

	try {
		properties = JSON.parse(fs.readFileSync(propertiesPath, 'utf-8'));
	} catch (e) {
		console.log('Couldn\'t fetch properties: ' + e);
		process.exit();
	}
	useMsgField = properties['BLOOMFILTER.USE_MSG_FIELD'] || 0;
	n = properties['BLOOMFILTER.EXPECTED_INSERTIONS'] || DEFAULT_INSERTIONS;
	var m = getFilterSize(n, properties['BLOOMFILTER.FALSEPOSITIVE_RATIO'] || DEFAULT_FALSEPOSITIVE);
	k = getNumHashes(m, n);
	testingRange = Math.floor(n/2);

	modelPath = properties['BLOOMFILTER.MODEL_PATH'];
	if (!modelPath) {
		console.log('Couldn\'t locate path to save model');
		process.exit();
	}
	bloomFilter = new bloom(m, k);
	populateBloomFilter();
}

function populateBloomFilter(m, k) {
	if (useMsgField > 0) {
		var numInsertions = n;
		pubsub.subscribe(subscribeTopic, function(msg) {
			data = JSON.parse(msg);
			content = data.content;

			var key = Object.keys(content)[useMsgField - 1];
			console.log('Inserting ' + content[key] + ' into bloom filter');
			bloomFilter.add(String(content[key]));
			numInsertions--;
			if (numInsertions <= 0) {
				console.log('Finished populating filter with field ');
				pubsub.unsubscribe(subscribeTopic); 
				serializeBloom();
			}
		});
	} else {
		for (var i = 0; i < testingRange; i++) {
			bloomFilter.add(String(i));
		}
		console.log('Finished populating bloom filter');
		serializeBloom();
	}

}

pubsub.on('ready', function() {
	setup();
});