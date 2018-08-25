var mqtt = require('mqtt');

function PubsubHelper(){
	var self = this;

	this.mqtt = mqtt.connect('mqtt://localhost');
	this._ready = new Promise(function(resolve){
		self.mqtt.on('connect', function(){
			resolve();
		});
	});
}

PubsubHelper.prototype.send = function(topic, message){
	var self = this;
	return new Promise(function(resolve){
		this._ready.then(function(){
			self.mqtt.publish(topic, JSON.stringify(message));
			resolve();
		});
	});
}

PubsubHelper.prototype.listen = function(topic){
	var self = this;
	this.mqtt.subscribe(topic);

	return new Promise(function(resolve, reject){
		var timer = setTimeout(function(){
			reject();
		}, 5000);

		this._ready.then(function(){
			self.mqtt.on('message', function(channel, message){
				if(channel === topic){
					clearTimeout(timer);
					self.mqtt.unsubscribe(topic);
					resolve(JSON.parse(message));
				}
			});
		});
	});
}

modules.export = PubsubHelper;
