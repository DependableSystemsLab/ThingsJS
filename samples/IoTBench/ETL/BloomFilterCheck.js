var things = require('../../../lib/things.js');
var bloom = require('bloomfilter').BloomFilter;
var fs = require('fs');

var pubsub_url = 'mqtt://localhost';
var pubsub_topic = 'thingsjs/IoTBench/ETL/RangeFilterCheck';
var publish_topic = 'thingsJS/IoTBench/ETL/BloomFilterCheck';

/* bloom filter properties */
var DEFAULT_FALSEPOSITIVE = 0.1;
var DEFAULT_INSERTIONS = 20000000
var bloomFilter, testingRange, useMsgField;

var pubsub = new things.Pubsub(pubsub_url);

function getFilterSize(n, fpp){
	return (-1) * Math.ceil( ( n * Math.log(fpp) ) / Math.pow(Math.log(2), 2) );
}

function getNumHashes(m, n){
	return Math.ceil((m / n) * Math.log(2));
}

function createBloomFilter(){
	var args = process.argv.slice(2);
	var properties;

	if(!args.length){
		console.log('Please provide path for bloom filter properties');
		process.exit();
	}
	try{
		properties = JSON.parse(fs.readFileSync(args[0], 'utf-8'));
	}
	catch(e){
		console.log('Couldn\'t fetch properties: ' + e);
		process.exit();
	}
	useMsgField = properties['BLOOMFILTER.USE_MSG_FIELD'] || 0;
	testingRange = properties['BLOOMFILTER.EXPECTED_INSERTIONS'] || DEFAULT_INSERTIONS
	var m = getFilterSize(testingRange, properties['BLOOMFILTER.FALSEPOSITIVE_RATIO'] || DEFAULT_FALSEPOSITIVE);
	var k = getNumHashes(m, testingRange);

	var modelPath = properties['BLOOMFILTER.MODEL_PATH'];
	if(!modelPath){
		console.log('Couldn\'t find existing model');
		process.exit();
	}
	try{
		var model = fs.readFileSync(modelPath);
		bloomFilter = new bloom(JSON.parse(model), k);
	}
	catch(c){
		console.log('A problem occured: ' + c);
		process.exit();
	}
}

function doBloomFilter(data){
	var value;
	// if user specified they want to use a specific field value
	if(useMsgField > 0){
		var keys = Object.keys(data);
		value = data[keys[useMsgField-1]];
	}
	else{
		// generate a random value between 0 - testingRange
		value = Math.floor(Math.random() * testingRange + 1);
	}
	var res = bloomFilter.test(String(value));
	console.log('Bloom filter tested: ' + res);
	if(res){
		pubsub.publish(publish_topic, data);
	}
}

pubsub.on('ready', function(){
	createBloomFilter();
	console.log('Beginning bloom filter');
	pubsub.subscribe(pubsub_topic, doBloomFilter);
});

