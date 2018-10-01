var things = require('things-js');
var bloom = require('bloomfilter').BloomFilter;
var fs = require('fs');
var EventEmitter = require('events').EventEmitter;
var mongoUrl = 'mongodb://localhost:27017/things-js-fs';
var GFS = require('things-js').addons.gfs(mongoUrl);
/* bloom filter properties */
var DEFAULT_FALSEPOSITIVE = 0.1;
var DEFAULT_INSERTIONS = 20000000
var bloomFilter, testingRange, useMsgField, modelPath, k, newBloomFilter, n;

/* pubsub topics */
var pubsub_topic = 'thingsjs/IoTBench/SenMLParse';

var pubsub = new things.Pubsub();
var emitter = new EventEmitter();

function getFilterSize(n, fpp){
	return (-1) * Math.ceil( ( n * Math.log(fpp) ) / Math.pow(Math.log(2), 2) );
}

function getNumHashes(m, n){
	return Math.ceil((m / n) * Math.log(2));
}

function serializeBloom(){
	var array = [].slice.call(bloomFilter.buckets);
	fs.writeFile(modelPath, JSON.stringify(array), function(err){
		if(err){
			console.log(err);
			process.exit();
		}
		else{
			console.log('Serialized bloom filter to ' + modelPath);
			process.exit();
		}
	});
}

function createBloomFilter(){
	var args = process.argv.slice(2);
	var properties;

	if(!args.length){
		args = ['./TAXI_properties.json'];
	}
	try{
		properties = JSON.parse(fs.readFileSync(args[0], 'utf-8'));
	}
	catch(e){
		console.log('Couldn\'t fetch properties: ' + e);
		process.exit();
	}
	useMsgField = properties['BLOOMFILTER.USE_MSG_FIELD'] || 0;
	n = properties['BLOOMFILTER.EXPECTED_INSERTIONS'] || DEFAULT_INSERTIONS
	var m = getFilterSize(n, properties['BLOOMFILTER.FALSEPOSITIVE_RATIO'] || DEFAULT_FALSEPOSITIVE);
	k = getNumHashes(m, n);
	testingRange = Math.floor( n / 2 );

	modelPath = properties['BLOOMFILTER.MODEL_PATH'];
	if(!modelPath){
		console.log('Couldn\'t find existing model');
		process.exit();
	}
	bloomFilter = new bloom(m, k);
	populateBloomFilter();
}

/**
 * Currently populates with values below range/2 unless specified
 */
function populateBloomFilter(){
	if(useMsgField > 0){
		var numInsertions = n;
		pubsub.subscribe(pubsub_topic, function(data){
			var key = Object.keys(data)[useMsgField-1];
			console.log('Inserting: ' + data[key]);
			bloomFilter.add(String(data[key]));
			numInsertions--;
			console.log(numInsertions);
			if(numInsertions <= 0){
				console.log('Finished populating bloom filter');
				pubsub.unsubscribe(pubsub_topic);
				serializeBloom();
			}
		});
	}
	else{
		for(var i = 0; i < testingRange + 1; i++){
			bloomFilter.add(String(i));
		}
		console.log('Finished populating bloom filter');
		serializeBloom();
	}
}

(function init(){
	createBloomFilter();
})();
