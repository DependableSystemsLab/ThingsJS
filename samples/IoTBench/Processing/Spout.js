/*
 * A modified version of the SenML spout component with line tagging
 */
var things = require('things-js');
var readline = require('readline');

/* configurable variables */
var pubsubUrl = 'mqtt://test.mosquitto.org';
var dataPath = './TAXI_sample_data_senml.csv';
var publishTopic = 'iotbench/processing/spout'
var publishInterval = 1000; 

var pubsub = new things.Pubsub(pubsubUrl);

/* SenML Lines */
var lines = [];
var currentLine = 0;

/* processing */
var timestamps = {};

function startSpout() {
	var lineReader = readline.createInterface({
		input: require('fs').createReadStream(dataPath)
	});

	lineReader.on('line', function (line) {
		lines.push(line);
	});

	lineReader.on('close', function() {
		console.log('Done reading file... Starting to publish');
		setInterval(publishLine, publishInterval);
	});	
}

/* Publish a SenML line */
function publishLine() {
    if (currentLine >= lines.length) {
        console.log('Component finished');
        process.exit();
    }

    console.log("Publishing line " + currentLine);

    var taggedLine = {
        id: currentLine,
        content: lines[currentLine]
    }

    pubsub.publish(publishTopic, JSON.stringify(taggedLine));
    currentLine++;
}

pubsub.on('ready', function() {
    console.log("Beginning spout");
    startSpout();
});