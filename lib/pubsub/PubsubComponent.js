var mqtt = require('mqtt');
var fs = require('fs');
var logger= require('./multilogger')
var multilogger=new logger();
function randomInt (low, high) {
    return Math.floor(Math.random() * (high - low) + low);
}

function PubsubComponent(name, pubsubUrl, subscriptions, connectImmediately,connFailcallback,connectionStack){
	// Assign unique pub/sub client ID
	this.name=name;
    this.id = randomInt(0, 4294967296); // Unique client ID (auto-generated)
    this.clientName = name; // Client name (mnemonics)
    this.latencyMonitor = null; // Latency monitor if enabled
    this.handlers = new Map(subscriptions); // Call handlers (topic -> function)
	this.connectionCount=0
    this.$ready = null; // Promise object that will resolve when it is connected;

    // Validate the format of the pubsub url
    if (/^mqtt:\/\/.+$/.test(pubsubUrl)) {
        this.pubsub_url = pubsubUrl;
        multilogger.log("["+name+"] Using the following pubsub url: " + this.pubsub_url);
    } else {
    	this.pubsub_url = 'mqtt://localhost';
        multilogger.log("The pubsub url format was invalid, so reverting to default (localhost)!");
    }
    this.client = undefined;
    var self=this;
    if (connectImmediately){
    	this.connect(function(ok){
			multilogger.log('connected to mini-broker : '+self.pubsub_url)
		}).catch(function(error){
			multilogger.log('Failed to connect mini-broker : '+self.pubsub_url)
			if(connFailcallback){//To remove the connection from connectionStack if connection is failed
				connFailcallback(connectionStack,pubsubUrl)
			}
		})
    }
}
//Retrieves client Id
PubsubComponent.prototype.getClientId = function () {
    return this.id;
}
//Sets client Id
PubsubComponent.prototype.setClientId = function(newId) {
    this.id = newId;
}
//Retrieves client name
PubsubComponent.prototype.getClientName = function () {
    return this.clientName;
}
//Sets client name
PubsubComponent.prototype.setClientName = function(newName) {
    this.clientName = newName;
}
//Connect to the pub/sub infrastructure (mqtt)
PubsubComponent.prototype.connect = function(f, f_error) {
	var self = this;
	
	this.$ready = new Promise(function(resolve, reject){
		var timer = setTimeout(function(){
			if (f_error){
				reject(f_error({ error: "ConnectionError", message: "Failed to connect to Pubsub at "+self.pubsub_url }));	
			}
			else {
				reject(false);
			}
		}, 10000); //Timeout 30 seconds for connection failure
		
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
			// subscriptions passed through constructor 
			self.handlers.forEach(function(callback,topic){
				self.client.subscribe(topic,function(){
					multilogger.log('['+self.name+'] | [topic:'+topic+']'+' Subscribed')
				})
			});
	    });

	    self.client.on('message', function (topic,message) {
	    	try {
	    		// De-jsonify the message
				d = JSON.parse(message);
				multilogger.log('['+self.name+'] | [topic:'+topic+']'+" Message received  :"+d)
	    	}
	        catch (e){
	        	d = message;
	        }

			// Dispatch the call to the proper handler
	        self.handlers.get(topic)(d,topic);
	    });
	    
	    //If this is a restored pubsub, handlers would be populated by now. Subscribe to them;
	    for (var topic in self.handlers){
	    	self.client.subscribe(topic);
	    }
	});
	return this.$ready;
}
//Publishes an object to a topic
PubsubComponent.prototype.publish = function(topic, obj, raw) {
	if (raw){
		this.client.publish(topic, obj, function(err){
			if (err) multilogger.log(err);
		});
	}
	else {
		json = JSON.stringify(obj);
	    this.client.publish(topic, json, function(err){
			if (err) multilogger.log(err);
		});
	}
}
//Subscribes to a given topic.
//topic: topic to subscribe to
//f: callback function to be invoked upon a message arriving for this topic
PubsubComponent.prototype.subscribe = function(topic, f) {
	// this.handlers[topic] = f;
	var self=this
	this.handlers.set(topic,f)
	this.client.subscribe(topic,function(){
		multilogger.log('['+self.name+'] | [topic:'+topic+']'+' Subscribed ')
	});
	//Incremeter to check if connections need to be live
	this.connectionCount++;
}
//Unsubscribe from a given topic.
//topic: topic to unsubscribe from
PubsubComponent.prototype.unsubscribe = function(topic){
	var self=this;
	delete this.handlers[topic];
	this.client.unsubscribe(topic,function(){
		multilogger.log('['+self.name+']'+ 'Topic : '+topic+' Unsubscrbed')
	});
	//Incremeter to check if connections need to be live
	this.connectionCount--;
}

//Disconnect from pubsub.
//onDisconnect: function to call upon successful disconnect
PubsubComponent.prototype.disconnect = function(onDisconnect){
	this.client.end(false, onDisconnect);
	this.handlers = {};
}
// reconfigurator: Delta Map object created for reconfiguration based on incoming  plan
// topicCallbackHandler : Topic callback map
PubsubComponent.prototype.reconfigure=function(reconfigurator,topicCallbackHandler){
	var self=this
	reconfigurator.forEach(function(address,topic){
		
		if(self.handlers.has(topic) && self.pubsub_url!=address){// CASE: change in plan, remove from this connection
			//TODO: Need to check if the new subscriber already has the subscriptions
			self.unsubscribe(topic)
			multilogger.log('['+self.name+']'+"Reconfiguring topic : "+topic+' Unsubscribing from '+self.pubsub_url+' Subscribing to '+address)
		}
		//CASE: change in plan, add topic to this connection
		if(!self.handlers.has(topic)&& self.pubsub_url==address){
			self.subscribe(topic,topicCallbackHandler.get(topic))
			multilogger.log('['+self.name+']'+"Reconfiguration:Need Subscription to topic : "+topic)
		}
	
	})
}
PubsubComponent.prototype.checkSubscriptionDestination=function(topic, address){
self=this;
var statusOther=function(data,topic){
	
}
var tmpobj=new PubsubComponent("SubsciptionConfirmation",address,(new Map).set("SUBCONF",statusOther),true,null,null)
	tmpobj.publish("SUBCONF","STATUS")
}

module.exports = PubsubComponent;