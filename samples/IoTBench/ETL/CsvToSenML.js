var things = require('things-js');
var fs = require('fs');
var readline = require('readline');
var mongoUrl = 'mongodb://localhost:27017/things-js-fs';
var GFS = require('things-js').addons.gfs(mongoUrl);

var pubsub_url = 'mqtt://localhost';
var pubsub_topic = 'thingsjs/IoTBench/ETL/Annotate';
var publish_topic = 'thingsjs/IoTBench/ETL/CsvToSenML';

var pubsub = new things.Pubsub(pubsub_url);

/* csv to senml properties */
var schemaFields = {};
var schemaTypes = [];
var schemaValues = [];

function setup() {
    var args = process.argv.slice(2);
    var properties;
    var schemaFile;

    // default to TAXI property set if no specific property file is given
    if (!args.length) {
        args = ['./TAXI_properties.json'];
    }

    GFS.readFile(args[0], function(err2, data) {
        if (err2) {
            console.log('\x1b[44m%s\x1b[0m', 'Couldn\'t fetch properties: ' + err2);
            process.exit();
        }
        properties = JSON.parse(data);
        schemaFile = properties['PARSE.CSV_SCHEMA_WITH_ANNOTATEDFIELDS_FILEPATH'];
        if (!schemaFile) {
            console.log('Schema file does not exist');
            process.exit();
        }
        GFS.readFile(schemaFile, function(err3, data2) {
            // console.log("bababa"+data2);
            var premap = data2.toString().split('\n');
            // line1
            var fields = premap[0].split(',');
            var i = 0;
            fields.forEach(function(field) {
                schemaFields[field] = i;
                i++;
            });
            // line2
            schemaTypes = premap[1].split(',');

            // line3
            schemaValues = premap[2].split(',');
            console.log('Beginning conversion to SenML format');
            pubsub.subscribe(pubsub_topic, convertToSenML);
        });
        // return parseEntireSchema(schemaFile);
        // parseEntireSchema(schemaFile).then(function(){

        // }
    });
}

// function parseEntireSchema(file){
// 	var lineNumber = 0;
// 	var lineReader;

// 	return new Promise(function(resolve, reject){
// 		try{
// 			lineReader = readline.createInterface({
// 				input: fs.createReadStream(file)
// 			});
// 		}
// 		catch(e){
// 			console.log('Problem reading schema: ' + e);
// 			process.exit();
// 		}
// 		lineReader.on('line', function(line){
// 			switch(lineNumber){
// 				case 0: 
// 					var fields = line.split(',');
// 					var i = 0;
// 					fields.forEach(function(field){
// 						schemaFields[field] = i;
// 						i++;
// 					});
// 					break;
// 				case 1:
// 					schemaTypes = line.split(',');
// 					break;
// 				case 2:
// 					schemaValues = line.split(',');
// 					break;
// 			}
// 			lineNumber++;
// 		});
// 		lineReader.on('close', function(){
// 			resolve();
// 		});
// 	});
// }

function convertToSenML(data) {
    var arr = [];
    var keys = Object.keys(data);

    keys.forEach(function(field) {
        var senml = {};
        senml["n"] = field;
        var index = schemaFields[field];
        var type = schemaTypes[index];
        var val = schemaValues[index];

        senml["u"] = type;
        senml[val] = data[field];

        arr.push(senml);
    });
    console.log(JSON.stringify(arr));
    pubsub.publish(publish_topic, JSON.stringify({ "e": arr }));
}

pubsub.on('ready', function() {
    setup();
});