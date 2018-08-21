var path = require('path');
var http = require('http');
var express = require('express');
var helmet = require('helmet');
var chalk = require('chalk');

var MqttWsBridge = require('things-js').util.MqttWsBridge;
var FSServer = require('things-js').addons.FSServer;

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
	/* Create main express app  */
	var app = express();
	var server = http.createServer(app);

	var gfs_router = express.Router()
	var gfs = new FSServer(config.fs_db_url, gfs_router);

	var bridge = new MqttWsBridge(config.pubsub_url, { server: server, path: '/pubsub' });

	// Use a bunch of middlewares
	app.use(helmet());
	app.use(express.json());
	app.use(express.urlencoded({ extended: true }));
	// app.use(cookieParser());
	app.use(httpDebugger);

	/* Public App */
	app.use('/fs', gfs_router);

	app.use('/', express.static(config.static_path));
	app.get('*', function(req, res, next){
		res.redirect('/#'+req.originalUrl);
	});
	server.listen(config.port, function(){
		console.log(chalk.green(">>> Starting web service on PORT :"+config.port));
	});
}

module.exports = startApp;