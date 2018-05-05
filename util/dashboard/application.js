const path = require('path');
const express = require('express');
const http = require('http');
const WebSocket = require('ws');

//import ThingsJS libs
const things_js = require('../../lib/things.js');
const helpers = require('../../lib/helpers.js');
const MqttWsBridge = require('../../lib/util/MqttWsBridge.js');
const Database = require('./db.js');
const FSServer = require('../gfs/FSServer.js');

const DEBUG_MODE = false;

const STATIC_PATH = path.join(__dirname, '/www');
const DOCS_PATH = path.resolve(__dirname, '../../docs');

const CONFIG_SCHEMA = {
	    type: 'object',
	    properties: {
	        pubsub_url: { type: 'string' },
	        service_host: { type: 'string' },
	        service_port: { type: 'number' },
	        database_url: { type: 'string' },
	        filesystem_db_url: { type: 'string' },
	        node_id: { type: 'string' },
	    },
	    required: ['pubsub_url', 'service_host', 'service_port', 'database_url', 'filesystem_db_url'],
	}

const DEFAULT_CONFIG = helpers.validateJSON(path.resolve(__dirname, './things-dashboard-default.conf'), CONFIG_SCHEMA);

function start(config){
	if (!config){
		config = DEFAULT_CONFIG;
	}
	else if (typeof config === 'string'){
		config = helpers.validateJSON(config, CONFIG_SCHEMA);
	}

	//create express app annd http server
	const app = express();
	const db = new Database(config.database_url);
	const gfs_router = express.Router()
	const gfs = new FSServer(config.filesystem_db_url, gfs_router);
	const server = http.createServer(app);
	const bridge = new MqttWsBridge();

	app.use('/file-system', gfs_router);
	
	// route url: /
	// just serving the directory as a static web root
	app.use('/', express.static(STATIC_PATH));
	app.use('/docs', express.static(DOCS_PATH));

	server.listen(config.service_port, function startApp(){
		console.log(">>> Starting ThingsJS Dashboard on PORT "+config.service_port);
	});
}

module.exports = start