var things = require('things-js');
var fs = require('fs');

var pubsub_url = 'mqtt://localhost';
var pubsub_topic = 'thingsjs/IoTBench/SenMLParse';
var publish_topic = 'thingsjs/IoTBench/TRAIN/Average';

var pubsub = new things.Pubsub(pubsub_url);

/* avg fields */
var WINDOW_SIZE = 10;
var AVERAGE_TARGET;
var datalist;
function setup(){
	var args = process.argv.slice(2);
	var properties;

	// default to TAXI property set if no specific property file is given
	if(!args.length){
		args = ['../TAXI_properties.json'];
	}
	try{
		properties = JSON.parse(fs.readFileSync(args[0], 'utf-8'));
		AVERAGE_TARGET = properties['AVERAGE.MULTIPLELINEAR_REGRESSION'];
	}
	catch(e){
		console.log('Problem reading properties file: ' + e);
		process.exit();
	}
	// BLOCK_AVG = properties['AGGREGATE.BLOCK_COUNT.WINDOW_SIZE'];
	// USE_MSG_FIELD = properties['AGGREGATE.BLOCK_COUNT.USE_MSG_FIELD'] || 0;
	// USE_MSG_FIELDLIST = properties['AGGREGATE.BLOCK_COUNT.USE_MSG_FIELD_LIST'];



	aggCount = 0;
	datalist = [];
	aggSum = 0;
}

function average(data){
		aggCount ++;
		datalist.push(data);
		if(aggCount>=WINDOW_SIZE){
			var tempsum =0
			datalist.forEach(function(element){
				console.log("LALALALA" + tempsum);
				tempsum += Number(element[AVERAGE_TARGET]);
			});
			var avg = tempsum/(aggCount+1)
			aggCount =0;
			pubsub.publish(publish_topic, avg);
			console.log("average for fare_amount" + avg);
		}		
	}


pubsub.on('ready', function(){
	setup();
	console.log('Beginning Average');
	pubsub.subscribe(pubsub_topic, average);
});

