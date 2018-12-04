var things = require('things-js');
var fs = require('fs');
var crypto = require('crypto');
var mongoUrl = 'mongodb://localhost:27017/things-js-fs';
var GFS = require('things-js').GFS(mongoUrl);

/* configurable variables */
var gfsFlag = true;
var pubsubUrl = 'mqtt://test.mosquitto.org';
var processingTopic = 'iotbench/processing';
var subscribeTopic = processingTopic + '/parse';
var publishTopic = processingTopic + '/dac';
var propertiesPath = './TAXI_properties.json';

var pubsub = new things.Pubsub(pubsubUrl);

/* DAC properties */
var BUCKET_SIZE, USE_MSG_FIELD, USE_MSG_FIELD_LIST;
var maxZeroes = [];
var numBuckets;

function beginComponent(properties) {
	BUCKET_SIZE = properties['AGGREGATE.DISTINCT_APPROX_COUNT.BUCKETS'] || 10;
	if (BUCKET_SIZE > 31) {
		console.log('Bucket size is too large. Must be less than or equal to 31');
		process.exit();
	}
	numBuckets = 1 << BUCKET_SIZE;

	USE_MSG_FIELD = properties['AGGREGATE.DISTINCT_APPROX_COUNT.USE_MSG_FIELD'] || 0;
	USE_MSG_FIELD_LIST = properties['AGGREGATE.DISTINCT_APPROX_COUNT.USE_MSG_FIELD_LIST'];

	for (var i = 0; i < numBuckets; i++) {
		maxZeroes[i] = 0;
	}
	console.log('Beginning Distinct Approx. Count');
	pubsub.subscribe(subscribeTopic, doUniqueCount);
}

function doUniqueCount(msg) {
	var start = Date.now();
	var data = JSON.parse(msg);
	var content = data.content;
	var id = data.id;
	var field;

	if (USE_MSG_FIELD > 0) {
		field = USE_MSG_FIELD_LIST[USE_MSG_FIELD - 1];
	} else if (USE_MSG_FIELD == 0) {
		field = USE_MSG_FIELD_LIST;
	} else {
		var keys = Object.keys(content);
		var ranIndex = Math.ceil(Math.random() * keys.length);
		field = keys[ranIndex];
	}
	var count = countUniqueItems(content[field]);
	var uniqueCount = {};
	uniqueCount[field + '_distinctCount'] = count;

	var end = Date.now();
	var elapsed = end - start;
	pubsub.publish(processingTopic, { id: id, component: 'dac', time: elapsed });

	console.log('Approx ' + count + ' unique items in ' + field);
	pubsub.publish(publishTopic, JSON.stringify({ id: id, content: uniqueCount }));

}

function countUniqueItems(item) {

	function sha1(str) {
		var sha = crypto.createHash('sha1');
		var hex = sha.update(str).digest('hex');
		return hex;
	}

	var magicNum = 0.79402;
	var hashValue = parseInt(sha1(item), 16);
	var bucketId = hashValue & (numBuckets - 1);

	var currMax = maxZeroes[bucketId];
	maxZeroes[bucketId] = Math.max(currMax, countTrailZeroes(hashValue >> BUCKET_SIZE));

	var sumMaxZeroes = 0;
	for (var i = 0; i < numBuckets; i++) {
		sumMaxZeroes += maxZeroes[i];
	}
	var E = (magicNum * numBuckets * Math.pow(2, sumMaxZeroes / numBuckets));
	return E;
}

function countTrailZeroes(val) {
	if (val === 0) {
		return 31;
	} else {
		var p = 0;
		while (((val >> p) & 1) === 0) {
			p++;
		}
		return p;
	}
}

pubsub.on('ready', function() {
	setup();
});
