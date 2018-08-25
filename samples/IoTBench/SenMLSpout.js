/* 
 * Publishes SenML data over pub sub
 */

//var things = require('things-js');
var things = require('../../../lib/things.js');
var readline = require('readline');

/* configurable variables */
var pubsub_url = 'mqtt://localhost';
var pubsub_topic = 'thingsjs/IoTBench/SenMLSpout';
var publish_interval = 1000;

var pubsub = new things.Pubsub(pubsub_url);

/* SenML Lines */
var lines = [];
var currentLine = 0;

function startSpout() {
	var lineReader = readline.createInterface({
		input: require('fs').createReadStream('TAXI_sample_data_senml.csv')
	});

	lineReader.on('line', function (line) {
		//console.log('Line from file:', line);
		lines.push(line);
	});

	lineReader.on('close', function() {
		// File ended
		console.log('Done reading file... Starting to publish');
		setInterval(publishLine, publish_interval);
	});	
}

/* Publish a SenML line */
function publishLine() {
	// For the moment, publish as a raw string rather than json-serializing
	// since de-jsoning will be performed by the next 'bolt'
	if (currentLine >= lines.length) {
		/*
		console.log("Done sending data.");
		return;
		*/
	   currentLine = 0;
	}
	console.log("Publishing line " + currentLine);
	pubsub.publish(pubsub_topic, lines[currentLine]);
	currentLine++;
}

pubsub.on('ready', function(){
    console.log("Beginning spout");
    startSpout();
});

