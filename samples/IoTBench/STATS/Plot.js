var things = require('things-js');
var fs = require('fs');
var mongoUrl = 'mongodb://localhost:27017/things-js-fs';
var GFS = require('things-js').GFS(mongoUrl);
var express = require('express');
var bodyParser = require('body-parser');

var gfsFlag = true;
var pubsubUrl = 'mqtt://test.mosquitto.org';
var processingTopic = 'iotbench/processing';
var subscribeTopic = processingTopic + '/accumulator';
var publishTopic = processingTopic + '/plot';
var propertiesPath = './TAXI_properties.json';

/* plot fields */
var plotData = [];
var plotFile;
var PLOT_WINDOW;

var app = express();
var pubsub = new things.Pubsub(pubsubUrl);

function beginComponent(properties) {
    PLOT_WINDOW = properties['VISUALZE.PLOT.WINDOW_SIZE'] || 10;
    initServer();
    console.log('Beginning plot');
	pubsub.subscribe(subscribeTopic, task);	
}

function setup() {
	var properties;
	if (gfsFlag) {
		GFS.readFile(propertiesPath, function(err, data) {
			if (err) {
				console.log('Problem fetching properties: ' + err);
				process.exit();
			}
			properties = JSON.parse(data);
			beginComponent(properties);
		});
	} else {
		try {
			properties = JSON.parse(fs.readFileSync(propertiesPath, 'utf-8'));
		} catch (e) {
			console.log('Problem fetching properties: ' + e);
			process.exit();
		}
		beginComponent(properties);
	}
}

function initServer() {
	app.use(express.json());
	app.use(bodyParser.urlencoded({ extended: true }));

	app.use(function(req, res, next) {
	  res.header("Access-Control-Allow-Origin", "*");
	  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	  next();
	});

	app.set('port', (process.env.PORT || 5050));
	app.listen(app.get('port'), function() {

		console.log('Server started');
		app.get('/points', function(req, res) {
			res.json(plotData);
			res.end();
		});
	});
}

function task(msg) {
	var data = JSON.parse(msg);
	var content = data.content;
	var ids = data.ids;

	for (field in content) {

		content[field].forEach(function(val) {
			var pt = {};
			pt['ts'] = val['ts'];
			pt[field] = val['value'];

			if (plotData.length === PLOT_WINDOW) {
				plotData.shift();
			}
			plotData.push(pt);
		});
	}
}

pubsub.on('ready', function() {
	setup();
});
