/* BloomFilterCheck file adapted from RIoTBench
 * modified for processing rate measurements
 */
var things = require('things-js');
var bloom = require('bloomfilter').BloomFilter;
var fs = require('fs');

/* configurable variables */
var pubsubUrl = 'mqtt://test.mosquitto.org';
var processingTopic = 'iotbench/processing';
var subscribeTopic = processingTopic + '/rangefilter';
var publishTopic = processingTopic + '/bloomfilter';
var propertiesPath = './TAXI_properties.json';

/* bloom filter properties */
var DEFAULT_FALSEPOSITIVE = 0.1;
var DEFAULT_INSERTIONS = 20000000
var bloomFilter, testingRange, useMsgField, model;

var pubsub = new things.Pubsub(pubsubUrl);

function getFilterSize(n, fpp) {
    return (-1) * Math.ceil((n * Math.log(fpp)) / Math.pow(Math.log(2), 2));
}

function getNumHashes(m, n) {
    return Math.ceil((m / n) * Math.log(2));
}

function loadBloomFilter() {
	var properties = JSON.parse(fs.readFileSync(propertiesPath));
	var modelPath = properties['BLOOMFILTER.MODEL_PATH'];
	useMsgField = properties['BLOOMFILTER.USE_MSG_FIELD'] || 0;
	testingRange = properties['BLOOMFILTER.EXPECTED_INSERTIONS'] || DEFAULT_INSERTIONS;

	model = JSON.parse(fs.readFileSync(modelPath, 'utf-8'));

	var m = getFilterSize(testingRange, properties['BLOOMFILTER.FALSEPOSITIVE_RATIO'] || DEFAULT_FALSEPOSITIVE);
	var k = getNumHashes(m, testingRange);

	try {
		bloomFilter = new bloom(model, k);
		console.log('Bloom filter loaded. Component now running');
		pubsub.subscribe(subscribeTopic, doBloomFilter);
	} catch(c) {
		console.log('A problem occurred: ' + c);
		process.exit();
	}
}

function doBloomFilter(msg) {
	var start = Date.now();

	var data = JSON.parse(msg);
	var content = data.content;
	var id = data.id;
	var value; 

    if (useMsgField > 0) {
        var keys = Object.keys(content);
        value = content[keys[useMsgField - 1]];
    } else {
        // generate a random value between 0 - testingRange
        value = Math.floor(Math.random() * testingRange + 1);
    }
    var res = bloomFilter.test(String(value));
    var end = Date.now();
    var elapsed = end - start;
    pubsub.publish(processingTopic, { id: id, component: 'bloomfilter', time: elapsed });
    console.log('Bloom filter tested: ' + res + ' for line ' + id);
    if (res) {
        pubsub.publish(publishTopic, JSON.stringify({ id: id, content: content }));
    }
}

pubsub.on('ready', function() {
    loadBloomFilter();
});