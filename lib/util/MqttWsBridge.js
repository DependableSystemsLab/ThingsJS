'use strict';

var EventEmitter = require('events').EventEmitter;
var ws = require('ws');
var mqtt = require('mqtt');
var helpers = require('../helpers.js');

var DEBUG_MODE = true;

var MQTT_DEFAULT = { url: 'mqtt://localhost' };
var WSS_DEFAULT = { host: '192.168.0.73', port: 8000 };

/** This object acts as a bridge between a MQTT service and the browser,
 *    since browsers do not natively support MQTT protocol.
 *    It creates a WebSocket server that browsers connect to and relays messages between the two.
 *    The browser should connect to this object as if it was the actual MQTT service.
 *    The browser should use the client-side MqttWsClient object to connect to it.
 */
function MqttWsBridge(mqtt_url, wss_config){
	if (!(this instanceof MqttWsBridge)) return new MqttWsBridge(mqtt_url, wss_config);
	EventEmitter.call(this);
	var self = this;
	this.mqtt_config = { url: mqtt_url || MQTT_DEFAULT.url };
	this.wss_config = Object.assign({}, wss_config || WSS_DEFAULT);

	this.mqtt = undefined;
	this.wss = undefined;
	
	this.clients = {};
	this.subscribers = {};


	// this.handlers = {};
	// this.subscriptions = {};

	// /* MQTT client */
	// this.mqtt = mqtt.connect(this.url);
	
	// this.mqtt.on('connect', function(ack){
	// 	console.log('[MqttWsBridge] connected');
	// 	self.emit('mqttReady');
	// 	self.subscriptions = {};
	// 	Object.keys(self.handlers).forEach(function(topic){
	// 		self.client.subscribe(topic);
	// 		self.subscriptions[topic] = true;
	// 	});
	// });
	// this.client.on('reconnect', function(){
	// 	console.log('[Pubsub] reconnecting');
	// });
	// this.client.on('close', function(){
	// 	// self.status = Pubsub.Status.Closed;
	// });
	// this.client.on('end', function(){
	// 	console.log('[Pubsub] client ended');
	// });
	// this.client.on('message', function(topic, message, packet){
	// 	message = JSON.parse(message);
	// 	self.handlers[topic](message, topic);
	// });

	// /* WebSocket server */
	// self.wss = new ws.Server(self.wss_config);

	this.init();
}
MqttWsBridge.prototype = new EventEmitter();
MqttWsBridge.prototype.init = function(){
	var self = this;
	
	/* Connect to MQTT */
	self.mqtt = mqtt.connect(self.mqtt_config.url);
	self.mqtt.on('connect', function(){
		console.log('[ALERT] MQTT Connected to '+self.mqtt_config.url);
		self.emit('mqtt-ready');
	});
	self.mqtt.on('reconnect', function(){
		console.log('[MQTT] reconnecting');
	});
	self.mqtt.on('close', function(){
		console.log('[MQTT] client closed');
	});
	self.mqtt.on('end', function(){
		console.log('[MQTT] client ended');
	});
	self.mqtt.on('message', function(topic, message){
		var data = message.toString();
		try {
			data = JSON.parse(data);
		}
		catch (err){
			console.log('[WARNING] Failed to JSON parse ['+topic+'] message, returning raw');
		}
		(DEBUG_MODE ? console.log('['+topic+'] : '+JSON.stringify(data)) : undefined);
		
		if (self.subscribers[topic]){
			for (var cli_uid in self.subscribers[topic]){
				if (self.subscribers[topic][cli_uid].readyState === ws.OPEN){
					self.subscribers[topic][cli_uid].send(JSON.stringify({ topic: topic, message: data }));
				}
			}
		}
		
	});
	var mqttSubscribe = function(topic){
		if (!(topic in self.subscribers)){
			self.subscribers[topic] = {};
			self.mqtt.subscribe(topic);
			console.log("[MQTT] New topic subscription : "+topic);
		}
	}
	var mqttUnsubscribe = function(topic){
		if (Object.keys(self.subscribers[topic]).length === 0){
			delete self.subscribers[topic];
			self.mqtt.unsubscribe(topic);
			console.log("[MQTT] No more subscribers for : "+topic);
		}
	}
	var mqttPublish = function(topic, data){
		console.log('[Publish] '+topic+' '+JSON.stringify(data));
		self.mqtt.publish(topic, JSON.stringify(data));
	}
	
	/* Start WebSocket server */
	self.wss = new ws.Server(self.wss_config);
	self.wss.on('listening', function(){
		console.log('[Bridge:wss] WebSocket Server listening on port '+self.wss.options.port);
		self.emit('wss-ready');
	})
	self.wss.on('connection', function(client, req){
		client.uid = helpers.randKey();
		var cli_data = {
			ws: client,
			ip: req.connection.remoteAddress,
			subscriptions: []
		};
		self.clients[client.uid] = cli_data;
		console.log("WebSocket client ["+client.uid+"] connected from "+cli_data.ip);
		self.emit('connection', cli_data);
		
		var handlers = {
			subscribe: function(data){
				if (cli_data.subscriptions.indexOf(data.topic) < 0){
					mqttSubscribe(data.topic);
					cli_data.subscriptions.push(data.topic);
					self.subscribers[data.topic][client.uid] = client;
				}
			},
			unsubscribe: function(data){
				var tindex = cli_data.subscriptions.indexOf(data.topic);
				if (tindex > -1){
					delete self.subscribers[data.topic][client.uid];
					cli_data.subscriptions.splice(tindex, 1);
					mqttUnsubscribe(data.topic);
				}
			},
			publish: function(data){
				mqttPublish(data.topic, data.message);
			}
		}
		
		client.on('message', function(message){
			try {
				var data = JSON.parse(message);	
			}
			catch (error){
				console.log('[WARNING] WebSocket received string message instead of JSON : '+message);
				var data = message;
			}
			(DEBUG_MODE ? console.log('[ws:'+client.uid+'] : '+JSON.stringify(data)) : undefined);
			if (data.action in handlers){
				handlers[data.action](data);
			}
			else {
				client.send(JSON.stringify({ error: 'UnknownAction', message: 'Unrecognized action parameter.' }))
			}
		});

		client.on('error', function(err){
			console.log("MWB : [ERROR] for WebSocket client ["+client.uid+"]:");
			console.log(err);
		});
		
		client.on('close', function(){
			for (var i=0; i < cli_data.subscriptions.length; i ++){
				var topic = cli_data.subscriptions[i];
				delete self.subscribers[topic][client.uid];
				mqttUnsubscribe(topic);
			}
			delete self.clients[client.uid];
			console.log("WebSocket client ["+client.uid+"] disconnected");
		});
		
		client.send(JSON.stringify({ uid: client.uid }));
	})
	console.log('--- < mqtt-ws bridge started > ---');
	console.log('    mqtt service at : '+self.mqtt_config.url);
	console.log('    servicing WebSocket bridge at : ws://'+self.wss_config.host+':'+self.wss_config.port);
	console.log('----------------------------------');
}

module.exports = MqttWsBridge;