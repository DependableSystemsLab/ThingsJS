var things = require('things-js');
var fs = require('fs');
var mongoUrl = 'mongodb://localhost:27017/things-js-fs';
var GFS = require('things-js').addons.gfs(mongoUrl);

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
		args = ['./TAXI_properties.json'];
	}
		GFS.readFile(args[0], function(err2, data){
	   		 if (err2) {
          	console.log('\x1b[44m%s\x1b[0m', 'Couldn\'t fetch properties: ' + err2);
         	process.exit();
        	}	
	 		properties = JSON.parse(data);
	 		AVERAGE_TARGET = properties['AVERAGE.MULTIPLELINEAR_REGRESSION'];
	 		aggCount = 0;
			datalist = [];
			aggSum = 0;
	 		console.log('Beginning Average');
			pubsub.subscribe(pubsub_topic, average);
		});		
		
	// BLOCK_AVG = properties['AGGREGATE.BLOCK_COUNT.WINDOW_SIZE'];
	// USE_MSG_FIELD = properties['AGGREGATE.BLOCK_COUNT.USE_MSG_FIELD'] || 0;
	// USE_MSG_FIELDLIST = properties['AGGREGATE.BLOCK_COUNT.USE_MSG_FIELD_LIST'];



	
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
});

