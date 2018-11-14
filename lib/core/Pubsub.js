var EventEmitter = require('events').EventEmitter;
var stream = require('stream');
var mqtt = require('mqtt');
var mosca = require('mosca');
var chalk = require('chalk');
var helpers = require('../helpers.js');

var DEFAULT_PUBSUB_URL = 'mqtt://localhost';

var DEBUG = (process.env.DEBUG === 'true') || false;

/*
 * A Readable Pub/Sub stream. Pubsub topic -> Process
 * A new message (a frame) published under `topic` triggers the 'data' event,
 * with the message passed as the event data.
 * @param {Pubsub} pubsub - the Pubsub object
 * @param {string} topic - the topic to read from
 */
function InputStream(pubsub, topic){
	if (!(this instanceof InputStream)) return new InputStream(pubsub, topic);
	stream.Readable.call(this, {});
	var self = this;

	pubsub.subscribe(topic, function(message, topic, rawBuffer){
		self.push(rawBuffer);
		// console.log('message from '+topic+' -> '+rawBuffer.toString());
	});
	
	this._read = function(size){
		this.bytesRead += size;
	}
	// console.log("New Input Stream - subscribed to "+topic);
}
InputStream.prototype = new stream.Readable();
InputStream.prototype.constructor = InputStream;

/*
 * A Writable Pub/Sub stream. Process -> Pubsub topic
 * A call to `.write(data)` will write to the output stream identified by `topic`.
 * @param {Pubsub} pubsub - the Pubsub object
 * @param {string} topic - the topic to write to
 */
function OutputStream(pubsub, topic){
	if (!(this instanceof OutputStream)) return new OutputStream(pubsub, topic);
	stream.Writable.call(this, {});
	var self = this;

	this._write = function(chunk, encoding, callback){
		// console.log('publishing to '+topic+' -> '+chunk.toString());
		pubsub.publish(topic, chunk)
			.then(function(result){
				callback(null);
			}, function(error){
				callback(error);
			})
	}
	// console.log("New Output Stream - publishing to "+topic);
}
OutputStream.prototype = new stream.Writable();
OutputStream.prototype.constructor = OutputStream;


/* this is not a "real" stream */
function PubsubPipe(pubsub, from_topic, to_topic){
	if (!(this instanceof PubsubPipe)) return new PubsubPipe(pubsub, from_topic, to_topic);
	var self = this;

	pubsub.subscribe(from_topic, function(message, topic, rawBuffer){
		// console.log(message);
		console.log("Data going through Pipe ["+from_topic+" -> "+to_topic+"]");
		pubsub.publish(to_topic, message);
	}).then(function(){
		console.log('subscribed to '+from_topic)
	})
	console.log("new Pipe ["+from_topic+" -> "+to_topic+"]");
}

/**
 * Pubsub object provides client-side interface for talking to a MQTT Publish/Subscribe Server.
 * It is a thin wrapper around the [mqtt](https://github.com/mqttjs/MQTT.js) client
 * @constructor
 * @param {string} url - The URL of the Pub/Sub service
 * @param {object} options - additional options object
 * @param {object} options.handlers - a dictionary of <topic>:<function> for initializing subscriptions
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
	this.client.on('message', function(topic, data, packet){
		var message;
		try {
			message = JSON.parse(data);
		}
		catch (e){
			(DEBUG && console.log('[Pubsub:'+self.id+'] Received Raw Buffer ('+data.length+')'));
			message = data;
		}

		try {
			self.handlers[topic].forEach(function(handler){
				handler(message, topic, data);
			});
			self.emit('messageReceived', { topic: topic, message: message, rawBuffer: data });
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
 * Subscribe to a given topic, passing in a callback to invoke upon reception of the message under the said topic.
 * @param  {String} topic - the topic to subscribe to
 * @param  {Function} handler - the callback function to invoke when a message arrives under the given topic. The callback must have the signature `function(message, topic, rawBuffer)`
 * @return {Promise} - On successful subscription, the Promise resolves to the topic.
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
 * Unsubscribe from a given topic. If the client is not subscribed, it will immediately resolve and will not reject with an error
 * @param  {String} topic - the topic to unsubscribe from
 * @return {Promise} - the Promise always resolves to the topic regardless of the outcome.
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
 * Publish to a given topic. If the given message is not a Buffer object, it will try and JSON.stringify it.
 * @param  {String} topic - the topic to publish to 
 * @param  {Object|Buffer} message - message to send (assumed to be a JSON-serializable object by default)
 * @return {Promise} - resolves to through on successful publish
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
 * Kill the Pubsub instance, closing the connection.
 * @return {Promise} - the Promise always resolves true regardless of the outcome.
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
			// self.once('ready', function(){
				self.client.end(function(){
					(DEBUG && console.log('[Pubsub] gracefully killed'));
					resolve(true);
				});
			// });	
		}
	});
}

Pubsub.prototype.getInputPipe = function(topic){
	return new InputStream(this, topic);
}

Pubsub.prototype.getOutputPipe = function(topic){
	return new OutputStream(this, topic);
}

/** Dummy Pubsub used for instrumenting code without connecting.
 *    - does not extend Pubsub (i.e. not a subclass), this is a standalone definition
 *    - this object is created instead of actual Pubsub when user code is initialized as a Process via Code.run().
 *    - when user code is executed via Code.run(), it has an IPC channel to the master process.
 *      in that case, pubsub.publish is done by the master process, and the child process (this process) sends
 *      the message to the master process.
 * @constructor
 */
function DummyPubsub(url, options){
	var self = this;
	
	this.url = url || DEFAULT_PUBSUB_URL;
}
DummyPubsub.prototype.kill = function(){ }
DummyPubsub.prototype.publish = function(topic, message){
	process.send({ ctrl: 'publish', topic: topic, message: message });
}

/**
 * PubsubServer is a thin wrapper around the Mosca Server
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

/**
 * Kill the PubsubServer
 * @return {Promise}
 */
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
/** PubsubServer is available as a property of Pubsub */
Pubsub.Server = PubsubServer;
/** DummyPubsub is available as a property of Pubsub */
Pubsub.Dummy = DummyPubsub;

Pubsub.InputStream = InputStream;
Pubsub.OutputStream = OutputStream;
Pubsub.Pipe = PubsubPipe;

module.exports = Pubsub;