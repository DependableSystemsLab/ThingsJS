 /* 
 * SenMLParse file adapted from RIoTBench (SenMLParse.java)
 */

//var things = require('things-js');
var things = require('things-js')


/* configurable variables */
var pubsub_url = 'mqtt://localhost';
var pubsub_topic = 'thingsjs/IoTBench/SenMLSpout';
var publish_topic = 'thingsjs/IoTBench/SenMLParse';

var pubsub = new things.Pubsub(pubsub_url);
// mkdir RIOT/ETL folder if not exist 
// save file inside 
function processMessage(data) {
	var line = data.toString();
	
	// Remove everything before first { -- dunno why the data is made like that
	var trimmedLine = line.substr(line.indexOf('{'));
	
	// JSON-parse object
	var obj = JSON.parse(trimmedLine);
	//console.log(obj);
	
	// What follows is derived from the logic in SenMLParse
	// Ensuring compatibility as much as possible so that we can properly
	// implement / port the next "steps".
	var baseTime = 'bt' in obj ? obj['bt'] : 0;
	var baseUnit = 'bu' in obj ? obj['bu'] : "";
	var baseName = 'bn' in obj ? obj['bn'] : "";
	var jsonArr = obj['e'];
	
	var v,n,u,t;
	
	var mapkeyvalues = {};
	
	//console.log(jsonArr);
	
	for (var j=0; j<jsonArr.length; j++) {
		var jsonObject = jsonArr[j];
		//console.log(jsonObject);

		v = 'v' in jsonObject ? jsonObject['v'] : jsonObject['sv'];
		t = 'v' in jsonObject ? jsonObject['t'] : 0;
		t += baseTime;

		/* if name does not exist, consider base name */
		n = 'n' in jsonObject ? jsonObject['n'] : baseName;
		u = 'u' in jsonObject ? jsonObject['u'] : baseUnit;

		mapkeyvalues[n] = v;
	}
	
	
	// Publish the output
	// console.log(mapkeyvalues);
    pubsub.publish(publish_topic, mapkeyvalues);
}

/* Connect pubsub */
pubsub.on('ready', function(){
    
	// Subscribe to spout publications
	pubsub.subscribe(pubsub_topic, processMessage);
});
