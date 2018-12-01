/* 
 * Publishes SenML data over pub sub
 */

//var things = require('things-js');
var things = require('things-js');
var readline = require('readline');
var mongoUrl = 'mongodb://localhost:27017/things-js-fs';
var GFS = require('things-js').addons.gfs(mongoUrl);
var measurement_topic = 'iotbench/processing';

/* configurable variables */
var pubsub_url = 'mqtt://localhost';
var pubsub_topic = 'thingsjs/IoTBench/SenMLSpout';
var publish_interval1 = 1000;
var publish_interval2 = 500;
var publish_interval3 = 200;
var publish_interval4 = 100;
var publish_interval5 = 50;
var publish_interval6 = 10;


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

function randKey(length, charset){
    var text = "";
    if (!length) length = 8;
    if (!charset) charset = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for( var i=0; i < length; i++ ){
        text += charset.charAt(Math.floor(Math.random() * charset.length));
    }
    return text;
};
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
            setInterval(publishLine, publish_interval1);
        });

    });
}

/* Publish a SenML line */
function publishLine() {
    // For the moment, publish as a raw string rather than json-serializing
    // since de-jsoning will be performed by the next 'bolt'
    var lineid = randKey();
    var date = new Date(); var timestamp = date.getTime();
    console.log(timestamp+" : "+lineid);
    if (currentLine >= lines.length) {
        /*
        console.log("Done sending data.");
        return;
        */
        currentLine = 0;
    }
   
    var object = {"line_id":lineid,"content":lines[currentLine]};
    console.log("Publishing line " + currentLine + lineid);

    pubsub.publish(pubsub_topic, JSON.stringify(object));
    var timeobj = {"id":lineid,"component":"spout","time":timestamp};
    pubsub.publish(measurement_topic,JSON.stringify(timeobj));
    currentLine++;
}

pubsub.on('ready', function() {
    console.log("Beginning spout");
    startSpout();
});