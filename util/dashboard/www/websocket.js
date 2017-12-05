function EasyWebSocket(endpoint, config){
	var self = this;
	console.log("Easy WebSocket Object Created...");
	
	if (!config) config = {};
	if (!config.refresh_rate) config.refresh_rate = 100;
	if (!config.retry_rate) config.retry_rate = 5000;
	if (!config.on_open) config.on_open = function(){
		console.debug("WebSocket to "+self.endpoint+" opened");
	};
	
	self.refresh_rate = config.refresh_rate;
	self.retry_rate = config.retry_rate;
	self.on_open = config.on_open;

	self.endpoint = endpoint;
	self.ws_timer = null;
	self.retry_timer = null;
	self.socket = null;
	
	self.ENDPOINT_ALIVE = false;

	//Event listeners
	self.onMessage = [];
	
	self.init();
}
EasyWebSocket.prototype.init = function(){
	var self = this;
	if (self.socket) self.socket = null;
	self.socket = new WebSocket("ws://"+self.endpoint);
	console.debug("WebSocket to "+self.endpoint+" initializing");
	self.socket.onopen = function(){
		self.ENDPOINT_ALIVE = true;
		self.on_open(self);
	}
	self.socket.onclose = function(){
		self.ENDPOINT_ALIVE = false;
		console.debug("WebSocket to "+self.endpoint+" closed");
		clearInterval(self.ws_timer);
		setTimeout(function(){
			console.debug("Trying to open WebSocket to "+self.endpoint+" again");
			self.init();
		}, self.retry_rate);
	};
	self.socket.onerror = function(){
		self.ENDPOINT_ALIVE = false;
		console.error("ERROR on WebSocket to "+self.endpoint);
	};
	self.socket.onmessage = function(event){
		for (var i=0; i < self.onMessage.length; i++){
			try {
				self.onMessage[i](event, JSON.parse(event.data));	
			}
			catch (e) {
				console.error(e);
				self.onMessage[i](event, event.data);
			}
		}
	};
};
EasyWebSocket.prototype.isAlive = function(){
	return this.ENDPOINT_ALIVE;
}
EasyWebSocket.prototype.addEventListener = function(eventName, handlerFunc){
	console.log("Adding Event Listener -> listening to "+eventName);
	if (this[eventName].indexOf(handlerFunc) < 0) this[eventName].push(handlerFunc);
	else throw ("Event Listener already added : "+eventName);
}
EasyWebSocket.prototype.removeAllEventListeners = function(eventName){
	this[event] = [];
}
EasyWebSocket.prototype.send = function(data){
	if (this.socket.readyState === 1){
		this.socket.send( JSON.stringify( data ) );
	}
	else {
		throw "WebSocket Not Ready";
	}
};
EasyWebSocket.prototype.close = function(){
	this.socket.close();
}