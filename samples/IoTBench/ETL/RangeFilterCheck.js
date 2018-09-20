/*
 * Publishes filtered SenML data (already parsed) over pub sub
 */
var things = require('things-js');
var fs = require('fs');

var pubsub_url = 'mqtt://localhost';
var pubsub_topic = 'thingsjs/IoTBench/SenMLParse';
var publish_topic = 'thingsjs/IoTBench/ETL/RangeFilterCheck';

var pubsub = new things.Pubsub(pubsub_url);

/* range filter definitions */
var ranges = {};

function MinMax(min, max){
	this.min = min;
	this.max = max;
}
// mkdir RIOT/ETL folder if not exist 
// save file inside 
function getRange(){
	var args = process.argv.slice(2);

	// default to TAXI property set if no specific property file is given
	if(!args.length){
		args = ['../TAXI_properties.json'];
	}
	try{
		var properties = JSON.parse(fs.readFileSync(args[0], 'utf-8'));
		var validRanges = properties['FILTER.RANGE_FILTER.VALID_RANGE'];
		for(field in validRanges){
			var tokens = validRanges[field].split(':');
			try{
				var rng = new MinMax(parseFloat(tokens[0]), parseFloat(tokens[1]));
				ranges[field] = rng;
			}
			catch(c){
				console.log('Error parsing value: ' + c);
				process.exit();
			}
		}
	}
	catch(e){
		console.log('A problem occured: ' + e);
		process.exit();
	}
}

function checkRange(data){
	var success = true;
	for(field in ranges){
		if(field in data){
			if( (data[field] > ranges[field].max) || (data[field] < ranges[field].min) ){
				success = false;
			}
		}
	}
	if(success){
		console.log('Data met the range criteria');
		pubsub.publish(publish_topic, data);
	}
}


pubsub.on('ready', function(){
	getRange();
	console.log('Beginning range filter');
    // subscribe to parsed senml data
    pubsub.subscribe(pubsub_topic, checkRange);
});
