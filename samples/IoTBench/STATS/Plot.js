var things = require('../../../lib/things.js');
var fs = require('fs');
var express = require('express');
var bodyParser = require('body-parser');

var pubsub_url = 'mqtt://localhost';
var pubsub_topic = 'thingsjs/IoTBench/STATS/Accumulator';

/* plot fields */
var plotData = [];
var plotFile;
var PLOT_WINDOW;
var count = 0;

var app = express();
var pubsub = new things.Pubsub(pubsub_url);

function setup(){
	var args = process.argv.slice(2);
	var properties;

	if(!args.length){
		args = ['../ETL/TAXI_properties.json'];
	}
	try{
		properties = JSON.parse(fs.readFileSync(args[0], 'utf-8'));
	}
	catch(e){
		console.log('Problem reading properties file: '+e);
		process.exit();
	}
	PLOT_WINDOW = properties['VISUALZE.PLOT.WINDOW_SIZE'] || 10;
	initServer();
}

function initServer(){
	app.use(express.json());
	app.use(bodyParser.urlencoded({ extended: true }));

	app.use(function(req, res, next){
	  res.header("Access-Control-Allow-Origin", "*");
	  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	  next();
	});

	app.set('port', (process.env.PORT || 3000));
	app.listen(app.get('port'), function(){
		console.log('Server started');
		app.get('/points', function(req, res){
			res.json(plotData);
			res.end();
		});
	});
}

function task(data){
	count++;
	for(field in data){
		var values = data[field];

		values.forEach(function(val){
			var pt = {};
			pt['ts'] = val['ts'];
			pt[field] = val['value'];
			if(count >= PLOT_WINDOW){
				plotData.shift();
			}
			plotData.push(pt);
		});
	}
}

pubsub.on('ready', function(){
	setup();
	console.log('Beginning plot');
	pubsub.subscribe(pubsub_topic, task);
});

