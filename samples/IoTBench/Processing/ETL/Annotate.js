/* Annotate file adapted from RIoTBench
 * modified for processing rate measurements
 */
var things = require('things-js');
var fs = require('fs');
var mongoUrl = 'mongodb://localhost:27017/things-js-fs';
var GFS = require('things-js').GFS(mongoUrl);
var readline = require('readline');

/* configurable variables */
var gfsFlag = false;
var pubsubUrl = 'mqtt://test.mosquitto.org';
var processingTopic = 'iotbench/processing';
var subscribeTopic = processingTopic + '/interpolate';
var publishTopic = processingTopic + '/annotate';
var propertiesPath = './TAXI_properties.json';

/* annotation properties */
var useMsgField, filePath, schemaTypes;
var annotationMap = {};

var pubsub = new things.Pubsub(pubsubUrl);

function beginComponent(properties) {
	useMsgField = properties['ANNOTATE.ANNOTATE_MSG_USE_FIELD'] || 0;
	filePath = properties['ANNOTATE.ANNOTATE_FILE_PATH'];
	var schemaPath = properties['ANNOTATE.ANNOTATE_SCHEMA'];

	var x = new Promise(function(resolve) {
		readSchemaTypes(schemaPath).then(function(data) {
			schemaTypes = data;
			resolve();
		});
	});
	var y = createAnnotationMap(filePath);

	Promise.all([x, y]).then(function() {
		console.log('Beginning annotation');
		pubsub.subscribe(subscribeTopic, annotate);
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
			console.log('Couldn\'t fetch properties: ' + e);
			process.exit();
		}
		beginComponent(properties);		
	}
}

function readSchemaTypes(file) {
	return new Promise(function(resolve, reject) {
		if (gfsFlag) {
			GFS.readFile(file, function(err, data) {
				if (err) {
					console.log('Problem reading schema: ' + e);
					process.exit();
				}
				var lines = data.split('\n');
				resolve(lines[0]);
			});
		} else {
			var lineReader;
			try {
				lineReader = readline.createInterface({
					input: fs.createReadStream(file)
				});
			} catch(e) {
				console.log('Problem reading schema: ' + e);
				process.exit();
			}
			lineReader.on('line', function(line) {
				resolve(line);
			});		
		}
	});
}

function createAnnotationMap(file) {
	return new Promise(function(resolve, reject) {
		if (gfsFlag) {
			GFS.readFile(file, function(err, data) {
				if (err) {
					console.log('Could not create annotation map: ' + err);
					process.exit();
				}
				var lines = data.split('\n');
				for(var i = 0; i < lines.length; i++) {
					var token = lines[i].split(':');
					if ( token[0] && token[1]) {
						annotationMap[token[0]] = token[1];
					}
				}
				resolve();
			});
		} else {
			var lineReader;
			try {
				lineReader = readline.createInterface({
					input: fs.createReadStream(file)
				});
			} catch(e) {
				console.log('Could not create annotation map: ' + e);
				process.exit();
			}
			lineReader.on('line', function(line){
				var token = line.split(':');
				if (token[0] && token[1]) {
					annotationMap[token[0]] = token[1];
				}
			});
			lineReader.on('close', function() {
				console.log('Completed annotation map from file');
				resolve();
			});
		}
	});
}

function annotate(msg) {
	var start = Date.now();
	var data = JSON.parse(msg);
	var id = data.id;
	var content = data.content;

	// get the annotation key
	var keys = Object.keys(content);
	var field = keys[useMsgField];
	var fieldValue = content[field];
	var annotateValue = annotationMap[fieldValue];

	if (annotateValue) {
		parsedFields = annotateValue.split(',');
		// get the missing field names
		var schemaArr = schemaTypes.split(',');
		schemaArr = schemaArr.slice(keys.length + 1, schemaArr.length);

		for (var i = 0; i < parsedFields.length; i++) {
			var fieldName = schemaArr[i];
			content[fieldName] = parsedFields[i];
		}
		console.log('Made annotations to data', schemaArr, parsedFields);
	}
	var end = Date.now();
	var elapsed = end - start;

	pubsub.publish({ id: id, component: 'annotate', time: elapsed });
	pubsub.publish(publishTopic, JSON.stringify({ id: id, content: content }));
}

pubsub.on('ready', function() {
	setup();
});

