var things = require('things-js');
var fs = require('fs');
var crypto = require('crypto');

var pubsub_url = 'mqtt://localhost';
var pubsub_topic = 'thingsjs/IoTBench/SenMLParse';
var publish_topic = 'thingsjs/IoTBench/STATS/DistinctApproxCount';

var pubsub = new things.Pubsub(pubsub_url);

/* DAC properties */
var BUCKET_SIZE, USE_MSG_FIELD, USE_MSG_FIELDLIST;
var maxZeroes = [];
var numBuckets;

function setup(){
	var args = process.argv.slice(2);
	var properties;

	// default to TAXI property set if no specific property file is given
	if(!args.length){
		args = ['./TAXI_properties.json'];
	}
	try{
		properties = JSON.parse(fs.readFileSync(args[0], 'utf-8'));
	}
	catch(e){
		console.log('Error reading properties file: ' + e);
		process.exit();
	}

	BUCKET_SIZE = properties['AGGREGATE.DISTINCT_APPROX_COUNT.BUCKETS'] || 10;
	if(BUCKET_SIZE > 31){
		console.log('Bucket size is too large. Must be less than or equal to 31');
		process.exit();
	}
	numBuckets = 1 << BUCKET_SIZE;

	USE_MSG_FIELD = properties['AGGREGATE.DISTINCT_APPROX_COUNT.USE_MSG_FIELD'] || 0;
	USE_MSG_FIELDLIST = properties['AGGREGATE.DISTINCT_APPROX_COUNT.USE_MSG_FIELD_LIST'];

	for(var i = 0; i < numBuckets; i++){
		maxZeroes[i] = 0;
	}
}

function doUniqueCount(data){
	var field;

	if(USE_MSG_FIELD > 0){
		field = USE_MSG_FIEDLIST[USE_MSG_FIELD-1];
	}
	else if(USE_MSG_FIELD == 0){
		field = USE_MSG_FIELDLIST;
		console.log(field);
	}
	else{
		var keys = Object.keys(data);
		var ranIndex = Math.ceil( Math.random() * keys.length );
		field = keys[ranIndex];
	}
	var count = countUniqueItems(data[field]);
	var uniqueCountJSON = {};
	uniqueCountJSON[field + '_distinctCount'] = count;

	console.log('Approx ' + count + ' unique items in ' + field);
	pubsub.publish(publish_topic, uniqueCountJSON);
}

function countUniqueItems(item){

	function sha1(str){
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
	for(var i = 0; i < numBuckets; i++){
		sumMaxZeroes += maxZeroes[i];
	}

	var E = (magicNum * numBuckets * Math.pow(2, sumMaxZeroes / numBuckets));
	return E;
}

function countTrailZeroes(val){
	if(val === 0){
		return 31;
	}
	else{
		var p = 0;
		while( ((val >> p) & 1) === 0){
			p++;
		}
		return p;
	}
}

pubsub.on('ready', function(){
	setup();
	console.log('Beginning Distinct Approx. Count');
	pubsub.subscribe(pubsub_topic, doUniqueCount);
});
