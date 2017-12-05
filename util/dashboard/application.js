const path = require('path');
const express = require('express');
const http = require('http');
const WebSocket = require('ws');

//import ThingsJS libs
const things_js = require('../../lib/things.js');
const Database = require('./db.js');

const DEBUG_MODE = false;
const static_path = path.join(__dirname, '/www');

const CONFIG_SCHEMA = {
	    type: 'object',
	    properties: {
	        pubsub_url: { type: 'string' },
	        service_host: { type: 'string' },
	        service_port: { type: 'number' },
	        database_url: { type: 'string' },
	        node_id: { type: 'string' },
	    },
	    required: ['pubsub_url', 'service_host', 'service_port', 'database_url'],
	}

const DEFAULT_CONFIG = things_js.validateConfig(path.resolve(__dirname, '../../bin/things-dashboard-default.conf'), CONFIG_SCHEMA);

function start(config){
	if (!config){
		config = DEFAULT_CONFIG;
	}
	else if (typeof config === 'string'){
		config = things_js.validateConfig(config, CONFIG_SCHEMA);
	}
	//create express app annd http server
	const app = express();
	const server = http.createServer(app);
	const db = new Database(config.database_url);

	//subscribe to these topics
	var watchTopics = ['things-engine-registry',
	                   'things-stats',
	                   'things-videostream/raw',
	                   'things-videostream/motion',
	                   'things-videostream/alarm' ];

	//declare dispatcher variable for migrating code to the nodes
	var dispatcher = new things_js.Dispatcher(config);

	//create websocket server and serve it at url: /websocket
	var sock = new WebSocket.Server({ server: server, path: '/websocket' });
	var clients = {};
	var subscriptions = {};

	//define broadcast function for the websocket
	sock.broadcast = function broadcast(topic, data) {
		if (!subscriptions[topic]) subscriptions[topic] = [];
		var subscribers = subscriptions[topic].map(function(client_id){ return clients[client_id].ws });
		
		subscribers.map(function(ws){
			ws.send(data);
		})
	};

	//attach event handlers on new websocket connection
	sock.on('connection', function connection(ws, request){
		console.log("\n>>> WebSocket connected from "+request.connection.remoteAddress);
		var client_id = things_js.randomKey();
		clients[client_id] = {
			ws: ws,
			subscribed: []
		}
		ws.on('message', function incoming(message){
			//parse the message
			var data = JSON.parse(message);
			console.log(data);
			
			//available actions
			if (data.action === 'ping'){
				var response = JSON.stringify({ action: 'ping', response: 'pong' }); 
				console.log("--> "+response);
				ws.send(response);
			}
			else if (data.action === 'get-topics'){
				//serialize and send list of topics
				ws.send(JSON.stringify({ action: 'get-topics', response: watchTopics }));
			}
			else if (data.action === 'pubsub'){
				if (data.command === "subscribe"){
					if (!subscriptions[data.topic]) subscriptions[data.topic] = [];
					if (subscriptions[data.topic].indexOf(client_id) < 0){
						subscriptions[data.topic].push(client_id);
						clients[client_id].subscribed.push(data.topic);
						
						//If data.option.backtrack is set, fetch older records from database
						if (data.option && data.option.backtrack){
							db.getMessages(data.topic, data.option.backtrack)
								.then(function(messages){
									ws.send(JSON.stringify({ action: data.action, topic: data.topic, messages: messages }));
								});
						} else {
							db.getMessages(data.topic)
								.then(function(messages){
									ws.send(JSON.stringify({ action: data.action, topic: data.topic, messages: messages }));
								});
						}
					}
					
					if (watchTopics.indexOf(data.topic) < 0){
						pubsub.subscribe(data.topic, function onNewMessage(msg){
				            var wsResponse = {
				            	action: data.action,
				            	topic: data.topic,
				            	message: msg
				            };
				            console.log('['+data.topic+'] : '+JSON.stringify(msg));
				            
				            //broadcast new message to all websocket clients
				            sock.broadcast(data.topic, JSON.stringify(wsResponse));
				        });
					}
				}
				else if (data.command === "unsubscribe"){
					var cindex = clients[client_id].subscribed.indexOf(data.topic);
					if (cindex > -1){
						clients[client_id].subscribed.splice(cindex, 1);
					}
					cindex = subscriptions[data.topic].indexOf(client_id);
					if (cindex > -1){
						subscriptions[data.topic].splice(cindex, 1);
					}
				}
			}
			else if (data.action === 'dispatcher'){
				if (data.command === "run_code"){
					dispatcher.runCode(data.args.nodeId, data.args.code, "raw-code")
						.then(function(result){
							ws.send(JSON.stringify({ action: 'dispatcher', nodeId: result.nodeId, codeId: result.codeId }));
						});
				}
				else if (data.command === "pause_code"){
					dispatcher.pauseCode(data.args.nodeId, data.args.codeId);
				}
				else if (data.command === "migrate_code"){
					dispatcher.migrateCode(data.args.from, data.args.to, data.args.codeId, DEBUG_MODE)
						.then(function(result){
							ws.send(JSON.stringify({ action: 'dispatcher', nodeId: result.to, codeId: result.codeId }));
						})
				}
			}
			else if (data.action === 'code-db'){
				if (data.command === "save"){
					db.saveCode(data.name, data.code)
						.then(function(result){
							ws.send(JSON.stringify({ action: data.action, command: 'save', code: result }));
						});
				}
				else if (data.command === "get"){
					db.getCode(data.name)
						.then(function(code){
							ws.send(JSON.stringify({ action: data.action, command: 'get', code: code }));
						});
				}
				else if (data.command === "get_all"){
					db.getAllCode()
						.then(function(codes){
							ws.send(JSON.stringify({ action: data.action, command: 'get_all', codes: codes }));
						});
				}
			}
		});
		ws.on('close', function onSocketClose(){
			console.log("<<< WebSocket closed...");
			for (var i=0; i < clients[client_id].subscribed.length; i++){
				var topic = clients[client_id].subscribed[i];
				if (subscriptions[topic]){
					var cindex = subscriptions[topic].indexOf(client_id);
					if (cindex > -1){
						subscriptions[topic].splice(cindex, 1);
					}
				}
			}
			delete clients[client_id];
		});
	});

	var pubsub = new things_js.Pubsub('things-dashboard', config.pubsub_url);
	pubsub.connect().then(function(){
		console.log("[things-dashboard] : Connected to MQTT Server at "+config.pubsub_url);
		
		//loop through the topics and subscribe to it
		for (var i=0; i < watchTopics.length; i++){
			(function subscribeToTopic(){
				var topic = watchTopics[i];
				pubsub.subscribe(topic, function onNewMessage(msg){
					//console.log(JSON.stringify(msg));
					if (msg instanceof Buffer){
						msg = msg.toString('base64');
						console.log('<'+topic+'> : [ RAW BUFFER DATA ]');
					}
					else {
						console.log('<'+topic+'> : '+JSON.stringify(msg));
					}
		            var wsResponse = {
		            	action: "pubsub",
		            	topic: topic,
		            	message: msg
		            };
		            
		            if (['things-stats', 'things-videostream/raw', 'things-videostream/motion'].indexOf(topic) < 0){
		            	//Not saving stats in database for now, as the amount of data increases really fast
		            	db.onMessage(topic, msg);	
		            }
		            sock.broadcast(topic, JSON.stringify(wsResponse));
		            
		        });
			})();
		}
	}, function(err){
		console.log(err);
	});

	// route url: /
	// just serving the directory as a static web root
	app.use('/', express.static(static_path));

	server.listen(config.service_port, function startApp(){
		console.log(">>> Starting Pubsub Dashboard on PORT "+config.service_port);
	});
}

module.exports = start