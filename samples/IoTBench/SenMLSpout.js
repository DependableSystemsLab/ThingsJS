/* 
 * Publishes SenML data over pub sub
 */

//var things = require('things-js');
var things = require('things-js');
var readline = require('readline');
var mongoUrl = 'mongodb://localhost:27017/things-js-fs';
var GFS = require('things-js').addons.gfs(mongoUrl);


/* configurable variables */
var pubsub_url = 'mqtt://localhost';
var pubsub_topic = 'thingsjs/IoTBench/SenMLSpout';
var publish_interval = 1000;

var pubsub = new things.Pubsub(pubsub_url);

/* SenML Lines */
var lines = [];
var currentLine = 0;

// function startSpout() {
// 	var lineReader = readline.createInterface({
// 		input: require('fs').createReadStream('TAXI_sample_data_senml.csv')
// 	});

// 	lineReader.on('line', function (line) {
// 		//console.log('Line from file:', line);
// 		lines.push(line);
// 	});

// 	lineReader.on('close', function() {
// 		// File ended
// 		console.log('Done reading file... Starting to publish');
// 		setInterval(publishLine, publish_interval);
// 	});	
// }
function startSpout() {
	 var args = ['./TAXI_sample_data_senml.csv'];
    GFS.readFile(args[0], function(err2, data) {
        if (err2) {
            console.log('\x1b[44m%s\x1b[0m', 'Couldn\'t fetch properties: ' + err2);
            process.exit();
        }
        var Readable = require('stream').Readable;

        var taxiDataStream = new Readable();
        taxiDataStream.push(data); // the string you want
        taxiDataStream.push(null); // indicates end-of-file basically - the end of the stream
        var lineReader = readline.createInterface({
            input: taxiDataStream
        });

        lineReader.on('line', function(line) {
            //console.log('Line from file:', line);
            lines.push(line);
        });

        lineReader.on('close', function() {
            // File ended
            console.log('Done reading file... Starting to publish');
            setInterval(publishLine, publish_interval);
        });

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

pubsub.on('ready', function() {
    console.log("Beginning spout");
    startSpout();
});