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
var measurement_topic = 'iotbench/processing';
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
	// console.log(data);

	var date = new Date(); var timestamp = date.getTime();
	data = JSON.parse(data);
    console.log(timestamp+" : "+data["line_id"]+ "For RangeFilterCheck");
	var content = data["content"];
	var success = true;
	for(field in ranges){
		if(field in content){
			if( (content[field] > ranges[field].max) || (content[field] < ranges[field].min) ){
				success = false;
			}
		}
	}
	if(success){
		console.log('Data met the range criteria');
		var object = {"line_id":data["line_id"],"content":content};
		pubsub.publish(publish_topic, JSON.stringify(object));
		var timeobj = {"id":data["line_id"],"component":"rangefilter","time":timestamp};
		pubsub.publish(measurement_topic,JSON.stringify(timeobj));
	}
}


pubsub.on('ready', function(){
	getRange();
});
