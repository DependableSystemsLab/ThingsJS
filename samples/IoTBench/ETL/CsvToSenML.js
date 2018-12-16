/* CsvToSenML adapted from RIotBench
 * modified for measuring processing rate
 */
var things = require('things-js');
var fs = require('fs');
var mongoUrl = 'mongodb://localhost:27017/things-js-fs';
var GFS = require('things-js').GFS(mongoUrl);
var readline = require('readline');

/* configurable variables */
var gfsFlag = true;
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

function beginComponent(properties) {
	var schemaFile = properties['PARSE.CSV_SCHEMA_WITH_ANNOTATEDFIELDS_FILEPATH'];
	if (!schemaFile) {
		console.log('Schema file does not exist');
		process.exit();
	}
	parseEntireSchema(schemaFile).then(function() {
		console.log('Beginning conversion to SenML format');
		pubsub.subscribe(subscribeTopic, convertToSenML);	
	});
}

function setup() {
	var properties;
	if (gfsFlag) {
		GFS.readFile(propertiesPath, function(err, data) {
			if (err) {
				console.log('Could not fetch properties: ' + err);
				process.exit();
			}
			properties = JSON.parse(data);
			beginComponent(properties);
		});
	} else {
		try {
			properties = JSON.parse(fs.readFileSync(propertiesPath, 'utf-8'));
		} catch(e) {
			console.log('Problem with reading properties file: ' + e);
			process.exit();
		}
		beginComponent(properties);
	}
}

function parseEntireSchema(file) {
	var lineNumber = 0;
	var lineReader;
	return new Promise(function(resolve, reject) {
		if (gfsFlag) {
			GFS.readFile(file, function(err, data) {
				if (err) {
					console.log('Problem reading schema: ' + err);
					process.exit();
				}
				var lines = data.split('\n');
				for(var i = 0; i < lines.length; i++) {
					switch (i) {
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
				}
				resolve();
			});
		} else {
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
			}
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
	pubsub.publish(publishTopic, JSON.stringify({ id: id, content: { 'e': arr } }));

	console.log(JSON.stringify(arr));
}

pubsub.on('ready', function() {
	setup();
});

