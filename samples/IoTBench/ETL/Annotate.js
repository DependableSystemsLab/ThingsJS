var things = require('../../../lib/things.js');
var fs = require('fs');
var readline = require('readline');

var pubsub_url = 'mqtt://localhost';
var pubsub_topic = 'thingsjs/IoTBench/ETL/Interpolation';
var publish_topic = 'thingsjs/IoTBench/ETL/Annotate';

var pubsub = new things.Pubsub(pubsub_url);

/* annotation properties */
var useMsgField, filePath, schemaTypes;
var annotationMap = {};

function setup(){
	var args = process.argv.slice(2);
	var properties;

	// default to TAXI property set if no specific property file is given
	if(!args.length){
		args = ['../TAXI_properties.json'];
	}

	try{
		properties = JSON.parse(fs.readFileSync(args[0], 'utf-8'));
	}
	catch(e){
		console.log('Couldn\'t fetch properties: ' + e);
		process.exit();
	}
	useMsgField = properties['ANNOTATE.ANNOTATE_MSG_USE_FIELD'] || 0;
	filePath = properties['ANNOTATE.ANNOTATE_FILE_PATH'];
	var schemaPath = properties['ANNOTATE.ANNOTATE_SCHEMA'];

	var x = new Promise(function(resolve){
		readSchemaTypes(schemaPath).then(function(data){
			schemaTypes = data;
			resolve();
		});
	});
	var y = createAnnotationMap(filePath);

	return Promise.all([x,y]);
}

function readSchemaTypes(file){
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
			resolve(line);
		});
	});
}

function createAnnotationMap(file){
	var lineReader;

	return new Promise(function(resolve, reject){
		try{
			lineReader = readline.createInterface({
				input: fs.createReadStream(file)
			});
		}
		catch(e){
			console.log('Could not create annotation map: ' + e);
			process.exit();
		}
		lineReader.on('line', function(line){
			var token = line.split(':');
			if(token[0] && token[1]){
				annotationMap[token[0]] = token[1];
			}
		});
		lineReader.on('close', function(){
			console.log('Completed annotation map from file');
			resolve();
		});
	});
}

function annotate(data){
	// get the annotation key
	var keys = Object.keys(data);
	var field = keys[useMsgField];
	var fieldValue = data[field];
	var annotateValue = annotationMap[fieldValue];

	if(annotateValue){
		parsedFields = annotateValue.split(',');
		// get the missing field names
		var schemaArr = schemaTypes.split(',');
		schemaArr = schemaArr.slice(keys.length + 1, schemaArr.length);

		for(var i = 0; i < parsedFields.length; i++){
			var fieldName = schemaArr[i];
			data[fieldName] = parsedFields[i];
		}
		console.log('Made annotations to data');
		console.log(schemaArr, parsedFields);
		console.log('\n');
	}
	console.log('Publishing');
	pubsub.publish(publish_topic, data);
}

pubsub.on('ready', function(){
	setup().then(function(){
		console.log('Beginning annotation');
		pubsub.subscribe(pubsub_topic, annotate);
	});
});

