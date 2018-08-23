var EventEmitter = require('events').EventEmitter;
var mqtt = require('mqtt');
var mosca = require('mosca');
var chalk = require('chalk');
var helpers = require('../helpers.js');

var DEFAULT_PUBSUB_URL = 'mqtt://localhost';

var DEBUG = (process.env.DEBUG === 'true') || false;

/**
 * [Pubsub]
 * @constructor
 * @param {string} url     [description]
 * @param {object} options [description]
 */
function Pubsub(url, options){
	EventEmitter.call(this);
	var self = this;
	
	this.id = helpers.randKey();
	this.url = url || DEFAULT_PUBSUB_URL;
	this.handlers = {};
	this.subscriptions = {};

	this.client = mqtt.connect(this.url);
	
	this.client.on('connect', function(ack){
		(DEBUG && console.log('[Pubsub:'+self.id+'] connected'));
		self.emit('ready');
		self.subscriptions = {};
		Object.keys(self.handlers).forEach(function(topic){
			self.client.subscribe(topic);
			self.subscriptions[topic] = true;
		});
	});
	this.client.on('reconnect', function(){
		(DEBUG && console.log('[Pubsub:'+self.id+'] reconnecting'));
	});
	this.client.on('close', function(){
		// self.status = Pubsub.Status.Closed;
	});
	this.client.on('end', function(){
		(DEBUG && console.log('[Pubsub:'+self.id+'] client ended'));
	});
	this.client.on('message', function(topic, message, packet){
		try {
			message = JSON.parse(message);	
		}
		catch (e){
			(DEBUG && console.log('[Pubsub:'+self.id+'] Received Raw Buffer ('+message.length+')'));
		}

		try {
			self.handlers[topic].forEach(function(handler){
				handler(message, topic);
			});
			self.emit('messageReceived', { topic: topic, message: message });
		}
		catch (e){
			console.log(e);
			console.log(chalk.red('[Pubsub:'+self.id+'] on message <'+topic+'> ERROR: ')+e.message);
		}
	});

	if (options && options.handlers){
		Object.keys(options.handlers).forEach(function(topic){
			options.handlers[topic].forEach(function(handler){
				self.subscribe(topic, handler);
			});
			(DEBUG && console.log('Subscribed to '+topic));
		})
	}
}
Pubsub.prototype = new EventEmitter();
Pubsub.prototype.constructor = Pubsub;

/**
 * [subscribe description]
 * @param  {String} topic   [description]
 * @param  {Function} handler [description]
 * @return {Promise}         [description]
 */
Pubsub.prototype.subscribe = function(topic, handler){
	var self = this;
	return new Promise(function(resolve, reject){
		if (!self.handlers[topic]) self.handlers[topic] = [];
		self.handlers[topic].push(handler);
		if (topic in self.subscriptions) resolve(topic);
		else {
			self.client.subscribe(topic, function(err, ack){
				if (err) reject(err);
				else resolve(topic);
			});
			self.subscriptions[topic] = true;
		};

	})
}

/**
 * [unsubscribe description]
 * @param  {String} topic [description]
 * @return {Promise}       [description]
 */
Pubsub.prototype.unsubscribe = function(topic){
	var self = this;
	return new Promise(function(resolve, reject){
		delete self.handlers[topic];
		if (topic in self.subscriptions){
			delete self.subscriptions[topic];
			if (self.client.connected){
				self.client.unsubscribe(topic, function(err){
					if (err) reject(err);
					else resolve(topic);
				})	
			}
			else {
				resolve(topic);
			}
		}
		else resolve(topic);
	})
}

/**
 * [publish description]
 * @param  {String} topic   [description]
 * @param  {Object} message [description]
 * @return {Promise}         [description]
 */
Pubsub.prototype.publish = function(topic, message){
	var self = this;
	return new Promise(function(resolve, reject){
		if (!(message instanceof Buffer)) message = JSON.stringify(message);
		self.client.publish(topic, message, function(err){
		// self.client.publish(topic, JSON.stringify(message), function(err){
			if (err) reject(err);
			else resolve(true);
		})
	})
}

/**
 * [kill description]
 * @return {Promise} [description]
 */
Pubsub.prototype.kill = function(){
	var self = this;
	return new Promise(function(resolve, reject){
		if (self.client.connected){
			self.client.end(function(){
				(DEBUG && console.log('[Pubsub] gracefully killed'));
				resolve(true);
			});
		}
		else {
			self.once('ready', function(){
				self.client.end(function(){
					(DEBUG && console.log('[Pubsub] gracefully killed'));
					resolve(true);
				});
			});	
		}
	});
}

/** Dummy Pubsub used for instrumenting code without connecting.
 *    - does not extend Pubsub, this is a standalone object
 *    - this object is created instead of actual Pubsub when user code is initialized via Code.run().
 *    - when user code is executed via Code.run(), it has an IPC channel to the master process.
 *      in that case, pubsub.publish is done by the master process, and the child process (this process) sends
 *      the message to the master process.
 */
function DummyPubsub(url, options){
	var self = this;
	
	this.url = url || DEFAULT_PUBSUB_URL;
}
DummyPubsub.prototype.kill = function(){ }
DummyPubsub.prototype.publish = function(topic, message){
	process.send({ ctrl: 'publish', topic: topic, message: message });
}

/* Pubsub Server */

/**
 * Basic wrapper around the Mosca Server
 * @constructor
 */
function PubsubServer(){
	EventEmitter.call(this);
	var self = this;
	this.mosca = new mosca.Server({ port: 1883 });

	this.mosca.on('ready', function(){
		console.log('ThingsJS MOSCA Server Listening at '+self.mosca.opts.host+' on PORT '+self.mosca.opts.port);
		self.emit('ready');
	});

	if (DEBUG){
		this.mosca.on('clientConnected', function(client){
			console.log(chalk.cyan((new Date()).toLocaleString())+' '+chalk.blue('New client connected: ')+client.id);

		});
		this.mosca.on('published', function(packet, client){
			if (client){
				console.log(chalk.cyan((new Date()).toLocaleString())+' '+chalk.magenta('<'+packet.topic+'> ')+chalk.yellow('['+client.id+']: ') + packet.payload.toString().substr(0,128) );
			}
		});
	}
}
PubsubServer.prototype = new EventEmitter();
PubsubServer.prototype.constructor = PubsubServer;

PubsubServer.prototype.kill = function(){
	var self = this;
	return new Promise(function(resolve, reject){
		self.mosca.close(resolve);
		self.emit('closed');
	})
}

/* Distributed Pubsub Node */
function PubsubNode(){
	var self = this;
	this.mosca = new mosca.Server({ port: 1883 });

	this.mosca.on('ready', function(){
		console.log('ThingsJS Pubsub Node Listening at '+self.mosca.opts.host+' on PORT '+self.mosca.opts.port);
	});
}

/* Attach to Pubsub to export it */
Pubsub.Server = PubsubServer;
Pubsub.Dummy = DummyPubsub;

module.exports = Pubsub;