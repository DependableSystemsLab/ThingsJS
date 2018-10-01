var things = require('things-js');
var fs = require('fs');
var mongoUrl = 'mongodb://localhost:27017/things-js-fs';
var GFS = require('things-js').addons.gfs(mongoUrl);

var pubsub_url = 'mqtt://localhost';
var pubsub_topic = 'thingsjs/IoTBench/SenMLParse';
var publish_topic = 'thingsjs/IoTBench/STATS/BlockWindowAverage';

var pubsub = new things.Pubsub(pubsub_url);

/* avg fields */
var BLOCK_AVG, USE_MSG_FIELD, USE_MSG_FIELDLIST;
var aggCount, aggSum, aggRes;

function setup(){
	var args = process.argv.slice(2);
	var properties;

	// default to TAXI property set if no specific property file is given
	if(!args.length){
		args = ['./TAXI_properties.json'];
	}
	
	GFS.readFile(args[0], function(err2, data) {
        if (err2) {
            console.log('\x1b[44m%s\x1b[0m', 'Couldn\'t fetch properties: ' + err2);
            process.exit();
        }
    properties = JSON.parse(data);		
	BLOCK_AVG = properties['AGGREGATE.BLOCK_COUNT.WINDOW_SIZE'];
	USE_MSG_FIELD = properties['AGGREGATE.BLOCK_COUNT.USE_MSG_FIELD'] || 0;
	USE_MSG_FIELDLIST = properties['AGGREGATE.BLOCK_COUNT.USE_MSG_FIELD_LIST'];

	aggCount = 0;
	aggSum = 0;
	console.log('Beginning Average');
	pubsub.subscribe(pubsub_topic, average);
}

function average(data){
	var field;
	if(USE_MSG_FIELD > 0){
		field = USE_MSG_FIELDLIST[USE_MSG_FIELD-1];
	}
	else{
		var keys = Object.keys(data);
		var ranIndex = Math.ceil( Math.random() * keys.length );
		field = keys[ranIndex];
	}
	try{
		aggSum += Number(data[field]);
	}
	catch(e){
		console.log('Field value must be a number');
		return;
	}
	aggCount++;

	if(aggCount > BLOCK_AVG){
		aggRes = aggSum / BLOCK_AVG;
		aggCount = 0;
		aggSum = 0;

		console.log('Average ' + field + ' over ' + BLOCK_AVG + ' values: ' + aggRes);
		var avgJSON = {};
		avgJSON[field + '_average'] = aggRes;

		pubsub.publish(publish_topic, avgJSON);
	}
}

pubsub.on('ready', function(){
	setup();
});
