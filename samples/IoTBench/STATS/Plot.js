var things = require('things-js');
var fs = require('fs');
var mongoUrl = 'mongodb://localhost:27017/things-js-fs';
var GFS = require('things-js').addons.gfs(mongoUrl);
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
		args = ['./TAXI_properties.json'];
	}
	
	GFS.readFile(args[0], function(err2, data) {
        if (err2) {
            console.log('\x1b[44m%s\x1b[0m', 'Couldn\'t fetch properties: ' + err2);
            process.exit();
        }
        properties = JSON.parse(data);
        PLOT_WINDOW = properties['VISUALZE.PLOT.WINDOW_SIZE'] || 10;
        initServer();
        console.log('Beginning plot');
		pubsub.subscribe(pubsub_topic, task);
	});
}

function initServer(){
	app.use(express.json());
	app.use(bodyParser.urlencoded({ extended: true }));

	app.use(function(req, res, next){
	  res.header("Access-Control-Allow-Origin", "*");
	  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	  next();
	});

	app.set('port', (process.env.PORT || 5000));
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
});
