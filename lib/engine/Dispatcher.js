var fs = require('fs');
var Pubsub = require('../pubsub/Pubsub.js');

function Dispatcher(config){
	this.id = "things-dispatcher";
	this.config = config;
	this.pubsub = undefined;
	
	this.workers = {};
	
	this.initialize(config);
};
Dispatcher.prototype.initialize = function(config){
	var self = this;
	
	self.config = config;
	self.pubsub = new Pubsub(self.id, config.pubsub_url);
	
	self.$ready = new Promise(function(resolve, reject){
		self.pubsub.connect(function(){
			console.log("["+self.id+"] : Connected to MQTT Server at "+self.config.pubsub_url);
			resolve(true);
		});
	});
};
Dispatcher.prototype.sendCommand = function(targetId, command, arguments){
	this.pubsub.publish(targetId+"/cmd", { "command": command, "arguments": arguments });
};
Dispatcher.prototype.runCode = function(targetId, code, codeSource){
	// codeSource can be undefined. If undefined, code will be loaded from filesystem
	var self = this;
	return new Promise(function(resolve, reject){
		var arguments = { "source": undefined };
		if (codeSource === "repository"){
			// TODO: implement fetching code from remote code repository
		}
		else if (codeSource === "target-filesystem"){
			arguments["source"] = code;
			arguments["fromLocalPath"] = true;
			arguments["saveCode"] = true; //hard-coded for now, but should be an optional argument
		}
		else if (codeSource === "raw-code"){
			arguments["source"] = code;
		}
		else {
			arguments["source"] = fs.readFileSync(code).toString();
		}
		
		if (!self.workers[targetId]) self.workers[targetId] = {};
		
		// Subscribe to message from the target CodeEngine
		// to ensure that the code has been successfully deployed
		// Resolve the return message after
		self.pubsub.subscribe(targetId+"/running", function(msg){
			console.log("["+targetId+"] running ["+msg+"]");
			self.workers[targetId][msg] = "running";
			resolve({ "nodeId": targetId, "codeId": msg});
			
//			self.pubsub.subscribe(msg+"/console", function(text){
//				console.log("["+msg+"] : "+text);
//			})
		});
		
		self.sendCommand(targetId, "run_code", arguments);
	});
};
Dispatcher.prototype.pauseCode = function(nodeId, codeId){
	var self = this;
	return new Promise(function(resolve, reject){
		self.sendCommand(nodeId, "pause_code", { "codeId": codeId });
		resolve({ "nodeId": nodeId, "codeId": codeId });
	});
};
Dispatcher.prototype.migrateCode = function(fromId, toId, codeId, saveStateFiles){
	var self = this;
	return new Promise(function(resolve, reject){
		self.sendCommand(fromId, "pause_code", { "codeId": codeId, "saveSnapshot": saveStateFiles, "flush": true });
		self.sendCommand(fromId, "migrate_code", { "targetId": toId, "codeId": codeId, "saveRestored": saveStateFiles });
		
		resolve({ "from": fromId, "to": toId, "codeId": codeId });
	});
};

module.exports = Dispatcher;