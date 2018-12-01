/* CsvToSenML adapted from RIotBench
 * modified for measuring processing rate
 */
var things = require('things-js');
var fs = require('fs');
var readline = require('readline');

/* configurable variables */
var pubsubUrl = 'mqtt://test.mosquitto.org';
var processingTopic = 'iotbench/processing';
var subscribeTopic = processingTopic + '/annotate';
var publishTopic = processingTopic + '/csvtosenml';
var propertiesPath = './TAXI_properties.json';

var pubsub = new things.Pubsub(pubsubUrl);

/* csv to senml properties */
var schemaFields = {};
var schemaTypes = [];
var schemaValues = [];

function setup() {
	var properties;
	try {
		properties = JSON.parse(fs.readFileSync(propertiesPath, 'utf-8'));
	} catch(e) {
		console.log('Problem with reading properties file: ' + e);
		process.exit();
	}
	var schemaFile = properties['PARSE.CSV_SCHEMA_WITH_ANNOTATEDFIELDS_FILEPATH'];
	if (!schemaFile) {
		console.log('Schema file does not exist');
		process.exit();
	}
	return parseEntireSchema(schemaFile);
}

function parseEntireSchema(file) {
	var lineNumber = 0;
	var lineReader;

	return new Promise(function(resolve, reject) {
		try {
			lineReader = readline.createInterface({
				input: fs.createReadStream(file)
			});
		} catch(e) {
			console.log('Problem reading schema: ' + e);
			process.exit();
		}
		lineReader.on('line', function(line) {
			switch (lineNumber) {
				case 0: 
					var fields = line.split(',');
					var i = 0;
					fields.forEach(function(field) {
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

		lineReader.on('close', resolve);
	});
}

function convertToSenML(msg) {
	var start = Date.now();

	var data = JSON.parse(msg);
	content = data.content;
	id = data.id; 

	var arr = [];
	var keys = Object.keys(content);

	keys.forEach(function(field) {
		var senml = {};
		senml['n'] = field;
		var index = schemaFields[field];
		var type = schemaTypes[index];
		var val = schemaValues[index];

		senml['u'] = type;
		senml[val] = content[field];

		arr.push(senml);
	});

	var end = Date.now();
	var elapsed = end - start;
	pubsub.publish(processingTopic, { id: id, component: 'csvtosenml', time: elapsed });
	pubsub.publish(publishTopic, JSON.stringify({ id: id, content: { 'e': arr } });

	console.log(JSON.stringify(arr));
}

setup().then(function() {
	pubsub.on('ready', function() {
		console.log('Beginning conversion to SenML format');
		pubsub.subscribe(subscribeTopic, convertToSenML);
	});
});
