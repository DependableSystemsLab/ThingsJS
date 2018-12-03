 /* 
  * SenMLParse file adapted from RIoTBench (SenMLParse.java), modified
  * for processing rate measurements
  */

var things = require('things-js')

/* configurable variables */
var pubsubUrl = 'mqtt://test.mosquitto.org';
var processingTopic = 'iotbench/processing';
var subscribeTopic = processingTopic + '/spout';
var publishTopic = processingTopic + '/parse';

var pubsub = new things.Pubsub(pubsubUrl);

function processMessage(msg) {
	var start = Date.now();

	var data = JSON.parse(msg);
	var line = data.content;
	var id = data.id;

	var trimmedLine = line.substr(line.indexOf('{'));
	var obj = JSON.parse(trimmedLine);
	
	var baseTime = 'bt' in obj ? obj['bt'] : 0;
	var baseUnit = 'bu' in obj ? obj['bu'] : "";
	var baseName = 'bn' in obj ? obj['bn'] : "";
	var jsonArr = obj['e'];
	
	var v,n,u,t;
	
	var mapkeyvalues = {};
		
	for (var j=0; j<jsonArr.length; j++) {
		var jsonObject = jsonArr[j];

		v = 'v' in jsonObject ? jsonObject['v'] : jsonObject['sv'];
		t = 'v' in jsonObject ? jsonObject['t'] : 0;
		t += baseTime;

		// if name does not exist, consider base name
		n = 'n' in jsonObject ? jsonObject['n'] : baseName;
		u = 'u' in jsonObject ? jsonObject['u'] : baseUnit;

		mapkeyvalues[n] = v;
	}

	var end = Date.now();
	var elapsed = end - start;

	pubsub.publish(processingTopic, { id: id, component: 'parse', time: elapsed });
	console.log(mapkeyvalues);
    pubsub.publish(publishTopic, JSON.stringify({ id: id, content: mapkeyvalues }));
}

pubsub.on('ready', function(){
    pubsub.subscribe(subscribeTopic, processMessage);
});
