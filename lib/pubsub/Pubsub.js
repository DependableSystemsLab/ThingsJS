var mqtt = require('mqtt');
var fs = require('fs');

function randomInt (low, high) {
    return Math.floor(Math.random() * (high - low) + low);
}

function Pubsub(name, pubsubUrl, subscriptions, connectImmediately){
    // Assign unique pub/sub client ID
    this.id = randomInt(0, 4294967296); // Unique client ID (auto-generated)
    this.clientName = name; // Client name (mnemonics)
    this.latencyMonitor = null; // Latency monitor if enabled
    this.handlers = subscriptions || {}; // Call handlers (topic -> function)
    this.lockedTopics = []; // If this array is not empty, the Pubsub will not disconnect and will continue to listen for those topics.
    
    this.$ready = null; // Promise object that will resolve when it is connected;

    // Validate the format of the pubsub url
    if (/^mqtt:\/\/.+$/.test(pubsubUrl)) {
        this.pubsub_url = pubsubUrl;
        console.log("["+name+"] Using the following pubsub url: " + this.pubsub_url);
    } else {
    	this.pubsub_url = 'mqtt://localhost';
        console.log("The pubsub url format was invalid, so reverting to default (localhost)!");
    }
    this.client = undefined;
    
    if (connectImmediately){
    	this.connect(function(){});
    }
}
//Retrieves client Id
Pubsub.prototype.getClientId = function () {
    return this.id;
}
//Sets client Id
Pubsub.prototype.setClientId = function(newId) {
    this.id = newId;
}
//Retrieves client name
Pubsub.prototype.getClientName = function () {
    return this.clientName;
}
//Sets client name
Pubsub.prototype.setClientName = function(newName) {
    this.clientName = newName;
}
//Connect to the pub/sub infrastructure (mqtt)
Pubsub.prototype.connect = function(f, f_error) {
	var self = this;
	
	this.$ready = new Promise(function(resolve, reject){
		var timer = setTimeout(function(){
			if (f_error){
				reject(f_error({ error: "ConnectionError", message: "Failed to connect to Pubsub at "+self.pubsub_url }));	
			}
			else {
				reject(false);
			}
			self.client.end(false);
		}, 10000); //Timeout 10 seconds for connection failure
		
		self.client = mqtt.connect(self.pubsub_url);
	    
	    // Register mqtt callbacks

	    self.client.on('connect', function () {
//	        f();
	    	clearTimeout(timer);
	    	if (f){
	    		resolve(f());	
	    	}
	    	else {
	    		resolve(true);
	    	}
	    });

	    self.client.on('message', function (topic,message) {
	    	try {
	    		// De-jsonify the message
		        d = JSON.parse(message);	
	    	}
	        catch (e){
	        	d = message;
	        }

	        // Dispatch the call to the proper handler
	        self.handlers[topic](d,topic);
	    });
	    
	    /* If this is a restored pubsub,
	    	handlers should be populated by now.
	    	Subscribe to them immediately;
	     */
	    for (var topic in self.handlers){
	    	self.client.subscribe(topic);
	    }
	});
	return this.$ready;
}
//Publishes an object to a topic
Pubsub.prototype.publish = function(topic, obj, raw) {
	if (raw){
		this.client.publish(topic, obj, function(err){
			if (err) console.log(err);
		});
	}
	else {
		json = JSON.stringify(obj);
	    this.client.publish(topic, json, function(err){
			if (err) console.log(err);
		});
	}
}

//Subscribes to a given topic.
//topic: topic to subscribe to
//f: callback function to be invoked upon a message arriving for this topic
Pubsub.prototype.subscribe = function(topic, f) {
    this.handlers[topic] = f;
    this.client.subscribe(topic);
}
//Unsubscribe from a given topic.
//topic: topic to unsubscribe from
Pubsub.prototype.unsubscribe = function(topic){
	delete this.handlers[topic];
	this.client.unsubscribe(topic);
}

//Disconnect from pubsub.
//onDisconnect: function to call upon successful disconnect
// This function is called by Code.flush() and Scope.flush()
// It will not disconnect if there are "locked" topics that prevent disconnection
// To force disconnect despite locked topics, set 'force' param to true
Pubsub.prototype.disconnect = function(onDisconnect, force){
	if (this.lockedTopics.length === 0 || force){
		this.client.end(false, onDisconnect);
		this.handlers = {};	
	}
	else {
		var self = this;
		var topics = Object.keys(this.handlers);
		topics.map(function(topic){
			if (self.lockedTopics.indexOf(topic) < 0){
				self.unsubscribe(topic);
			}
		});
		console.log("INFO: Pubsub instance left running, subscribed to ["+self.lockedTopics.join(', ')+"]");
	}
}

Pubsub.prototype.preventDisconnect = function(topics){
	var self = this;
	if (typeof topics === 'string'){
		this.lockedTopics.push(topics);
	}
	else if (topics instanceof Array){
		topics.map(function(topic){
			if (self.lockedTopics.indexOf(topic) < 0) self.lockedTopics.push(topic);
		});
	}
}

module.exports = Pubsub;