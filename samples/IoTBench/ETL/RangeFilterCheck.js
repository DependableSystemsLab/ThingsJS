/*
 * Publishes filtered SenML data (already parsed) over pub sub
 */
var things = require('things-js');
var fs = require('fs');
var mongoUrl = 'mongodb://localhost:27017/things-js-fs';
var GFS = require('things-js').addons.gfs(mongoUrl);

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
		args = ['./TAXI_properties.json'];
	}

		  GFS.readFile(args[0], function(err2, data){
	   		if (err2) {
            console.log('\x1b[44m%s\x1b[0m', 'Couldn\'t fetch properties: ' + err2);
            process.exit();
        }
	 		properties = JSON.parse(data);
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
			console.log('Beginning range filter');
    		pubsub.subscribe(pubsub_topic, checkRange);
		});		
	
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
});
