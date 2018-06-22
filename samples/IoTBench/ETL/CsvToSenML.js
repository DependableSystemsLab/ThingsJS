var things = require('../../../lib/things.js');
var fs = require('fs');
var readline = require('readline');

var pubsub_url = 'mqtt://localhost';
var pubsub_topic = 'thingsJS/IoTBench/ETL/Annotate';
var publish_topic = 'thingsjs/IoTBench/ETL/CsvToSenML';

var pubsub = new things.Pubsub(pubsub_url);

/* csv to senml properties */
var schemaFields = {};
var schemaTypes = [];
var schemaValues = [];

function setup(){
	var args = process.argv.slice(2);
	var properties;

	if(!args.length){
		console.log('Please provide a properties file');
		process.exit();
	}
	try{
		properties = JSON.parse(fs.readFileSync(args[0], 'utf-8'));
	}
	catch(e){
		console.log('Problem with reading properties file: ' + e);
		process.exit();
	}
	var schemaFile = properties['PARSE.CSV_SCHEMA_WITH_ANNOTATEDFIELDS_FILEPATH'];
	if(!schemaFile){
		console.log('Schema file does not exist');
		process.exit();
	}
	return parseEntireSchema(schemaFile);
}

function parseEntireSchema(file){
	var lineNumber = 0;
	var lineReader;

	return new Promise(function(resolve, reject){
		try{
			lineReader = readline.createInterface({
				input: fs.createReadStream(file)
			});
		}
		catch(e){
			console.log('Problem reading schema: ' + e);
			process.exit();
		}
		lineReader.on('line', function(line){
			switch(lineNumber){
				case 0: 
					var fields = line.split(',');
					var i = 0;
					fields.forEach(function(field){
						schemaFields[field] = i;
						i++;
					});
					break;
				case 1:
					schemaTypes = line.split(',');
					break;
				case 2:
					schemaValues = line.split(',');
					break;
			}
			lineNumber++;
		});
		lineReader.on('close', function(){
			resolve();
		});
	});
}

function convertToSenML(data){
	var arr = [];
	var keys = Object.keys(data);

	keys.forEach(function(field){
		var senml = {};
		senml["n"] = field;
		var index = schemaFields[field];
		var type = schemaTypes[index];
		var val = schemaValues[index];

		senml["u"] = type;
		senml[val] = data[field];

		arr.push(senml);
	});
	
	pubsub.publish(publish_topic, JSON.stringify({"e": arr}));
}

pubsub.on('ready', function(){
	setup().then(function(){
		console.log('Beginning conversion to SenML format');
		pubsub.subscribe(pubsub_topic, convertToSenML);
	});
});

