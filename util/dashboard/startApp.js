var path = require('path');
var http = require('http');
var mongoose = require('mongoose');
var express = require('express');
var helmet = require('helmet');
var chalk = require('chalk');

var MqttWsBridge = require('../../lib/util/MqttWsBridge.js');
var GFS = require('../../lib/core/GFS.js').devland;

/* helpers */
function httpDebugger(req, res, next){
	console.log(chalk.yellow(req.method)+ ' '+req.originalUrl+' ----- '+chalk.yellow(req.sessionID));
	// ([ 'referrer', 'cookie', 'user-agent' ])
	Object.keys(req.headers).map(function(key){
		console.log('    '+chalk.blue(key+' : ')+req.headers[key]);
	})
	if (req.body){
		Object.keys(req.body).map(function(key){
			console.log('    '+chalk.red(key+' : ')+req.body[key]);
		})
	}
	next();
}

function startApp(config){
	var config = Object.assign({
		port: 3000,
		static_path: path.resolve(__dirname, './public/'),
		fs_db_url: 'mongodb://localhost:27017/things-js-fs',
		pubsub_url: 'mqtt://localhost'
	}, config)

	mongoose.connect(config.fs_db_url, {
		useNewUrlParser: true,
		useCreateIndex: true
	});
	var db = mongoose.connection;
	db.on('error', function(){
		console.log('[DB] Connection ERROR');
	});
	db.once('open', function(){
		console.log('[DB] Connection SUCCESS')
	});

	/* Create main express app  */
	var app = express();
	var server = http.createServer(app);

	var bridge = new MqttWsBridge(config.pubsub_url, { server: server, path: '/pubsub' });

	// Use a bunch of middlewares
	app.use(helmet());
	app.use(express.json());
	app.use(express.urlencoded({ extended: true }));
	// app.use(cookieParser());
	app.use(httpDebugger);

	/* Public App */
	app.use('/fs', GFS.createRouter(db));

	app.use('/', express.static(config.static_path));
	app.get('*', function(req, res, next){
		res.redirect('/#'+req.originalUrl);
	});
	server.listen(config.port, function(){
		console.log(chalk.green(">>> Starting web service on PORT :"+config.port));
	});
}

module.exports = startApp;
