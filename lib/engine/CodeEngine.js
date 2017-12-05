var fs = require('fs');
var pidusage = require('pidusage');
var randomKey = require('../common.js').randomKey;
var Pubsub = require('../pubsub/Pubsub.js');
var Code = require('./Code.js');

/* prototype functions that start with an underscore are "private" functions,
 * which should be called by CodeEngine objects only.
 * (This is not to be strictly enforced, but using these functions from outside
 *  should be considered a "hack" - similar to concept of "private" methods in Python)
 *  
 * The prototype functions to be exposed as an API do not start with an underscore;
 * and these functions are safe to be called by other parts of the ThingsJS application.
 */

/* CodeEngine class
 * 
 * API:
 *   CodeEngine.initialize
 *   CodeEngine.run
 *   CodeEngine.pause
 *   CodeEngine.getSnapshot
 */
var VALID_PUBSUB_COMMANDS = {
	"run_code": "runCode",
	"pause_code": "pauseCode",
	"restore_code": "restoreCode",
	"migrate_code": "migrateCode"
}
function CodeEngine(config, options){
	this.id = 'engine-'+(config.node_id || randomKey());
	
	this.config = undefined;
	this.pubsub = undefined; // CodeEngine will keep a pubsub instance that it will pass to all the Codes it will be running
	this.stats = undefined;
	
	this.$ready = undefined;
	
	this.codes = {};
	
	this.runData = []; // will contain the runtime data of the code during execution including snapshots - maybe this should be a dictionary...
	
	/* Options */
	this.logging = undefined;
	this.logInterval = 1000;
	this.currentCPU = null;
	
	// Initialize instance;
	this.initialize(config, options);
};
CodeEngine.prototype.initialize = function(config, options){
	/* This function initializes the CodeEngine object by performing the following:
	 * 1. Load the content of the input JS code located at inputCodePath, store it in this.inputCode
	 * 2. instrument the code and store it in this.code
	 * 
	 * config should look like the following: (key starting with * is optional)
	 * {
	 *     pubsub_url: 'mqtt://pubsub_host',
	 *     node_id: 'Unique identity of the node',
	 *     component_mapping: { 'static', 'dynamic' },
	 *     *device: 'Device Name'
	 * }
	 */
	var self = this;
	
	//Create PubSub to communicate with Code
	this.config = config;
	this.pubsub = new Pubsub(this.id, this.config.pubsub_url);
	
	/* Set options */
	if (options){
		this.logging = options.logging;
		this.logInterval = options.logInterval || 1000;
	}
	
	this.$ready = new Promise(function(resolve, reject){
		self.pubsub.connect(function(){
			console.log("<ENGINE> ["+self.id+"] : Connected to MQTT Server at "+self.config.pubsub_url);
			
			// Register its id on the pubsub network
			self.pubsub.publish("things-engine-registry", { id: self.id, status: 'idle', info: { device: self.config.device } });
			
			// Subscribe (listen) for incoming control commands
			self.pubsub.subscribe(self.id+"/cmd", function(msg){
				var commandFunc = VALID_PUBSUB_COMMANDS[msg.command];
				console.log("<ENGINE> ["+self.id+"] : Received Command ["+msg.command+"]");
				if (commandFunc){
					self[commandFunc](msg.arguments);
				}
			});
			
			self.kill = function(){
				self.pubsub.publish("things-engine-registry", { id: self.id, status: 'dead' });
//				self.stats.stop();
				setTimeout(function(){
					process.exit();
				}, 1000);
			}
			
			//Start monitoring device statistics
//			self.stats.start();
			
			//Enable logging if logger set
			if (self.logging){
				setInterval(function(){
					self.pubsub.publish(self.logging, { id: self.id, timestamp: Date.now(), memoryUsage: process.memoryUsage(), cpu: self.currentCPU });
					self.pubsub.publish(self.id+"/stats", { id: self.id, timestamp: Date.now(), memoryUsage: process.memoryUsage(), cpu: self.currentCPU });
				}, self.logInterval);
				
				//CPU Usage
				setInterval(function(){
					pidusage.stat(process.pid, function(err, stat) {
						self.currentCPU = stat.cpu;
					});
				}, 500);
			}
			
			resolve(true);
			
		}, function(error){
			console.log(error.message);
		});	
	});
};
CodeEngine.prototype.runCode = function(arguments){
	var self = this;
	var source = arguments.source;
	var fromLocalPath = arguments.fromLocalPath;
	var saveCode = arguments.saveCode;
	
//	console.log(this.$ready);
	
//	var runBlock = { dt_start: new Date(),
//					 dt_end: undefined,
//					 elapsed: undefined,
//					 snapshot: undefined };
//	this.runData.push(runBlock);
	
	var code = new Code(source, this.pubsub, fromLocalPath);
	if (saveCode){
		code.saveToFile();	
	}
	this.codes[code.id] = code;
	
	//Publish to notify what code it is running
	this.pubsub.publish("things-engine-registry", { id: this.id, status: 'busy' });
	this.pubsub.publish(this.id+"/running", code.id);
	this.pubsub.subscribe(code.id+'/signals', function(signal){
		if (signal === "flush"){
			delete self.codes[code.id];
			self.pubsub.unsubscribe(code.id+'/signals');
			console.log("<ENGINE> ["+self.id+"] : Flushed "+code.id);
		}
	});
	
	if (this.logging){
		this.pubsub.publish(this.logging, { id: this.id, timestamp: Date.now(), memoryUsage: process.memoryUsage(), cpu: this.currentCPU, event: { name: "run_code", data: code.id } });
	}
	
	code.run();
//	console.log("<ENGINE> ["+this.id+"] : Running ["+code.id+"] - Started at : "+runBlock.dt_start.toISOString());
	console.log("<ENGINE> ["+this.id+"] : Running ["+code.id+"] - Started at : "+(new Date()).toISOString());
	return code.id
};
CodeEngine.prototype.pauseCode = function(arguments){
	var self = this;
//	console.log(arguments);
	// Pauses execution, and takes a snapshot of the state
	var codeId = arguments.codeId;
	var saveSnapshot = arguments.saveSnapshot;
	var flush = arguments.flush;
	
//	var runBlock = this.getRunData();
//	runBlock.dt_end = new Date();
//	runBlock.elapsed = runBlock.dt_end.getTime() - runBlock.dt_start.getTime();
	
//	console.log("<ENGINE> ["+this.id+"] : Pausing ["+codeId+"] - Paused at : "+runBlock.dt_end.toISOString()+" ( paused after "+runBlock.elapsed+"ms )");
	console.log("<ENGINE> ["+this.id+"] : Pausing ["+codeId+"] - Paused at : "+(new Date()).toISOString());
	this.codes[codeId].pause(saveSnapshot, flush)
		.then(function(){
			self.pubsub.publish("things-engine-registry", { id: self.id, status: 'idle' });
			
			if (self.logging){
				self.pubsub.publish(self.logging, { id: self.id, timestamp: Date.now(), memoryUsage: process.memoryUsage(), cpu: self.currentCPU, event: { name: "pause_code", data: codeId } });
			}
		})
};
CodeEngine.prototype.migrateCode = function(arguments){
	var self = this;
	var targetId = arguments.targetId;
	var codeId = arguments.codeId;
	var saveRestored = arguments.saveRestored;
	
	var code = self.codes[codeId];
	
	if (code.$paused instanceof Promise){
//		console.log(code.$paused);
		code.$paused.then(function(snapshot){
//			code.flush();
			console.log(">>> Transferring Snapshot from ["+self.id+"] to ["+targetId+"]");
//			var snapshot = code.getLastSnapshot();
//			var functionMap = code.functionMapString;
			
			if (self.logging){
				self.pubsub.publish(self.logging, { id: self.id, timestamp: Date.now(), memoryUsage: process.memoryUsage(), cpu: self.currentCPU, event: { name: "migrate_code", data: codeId } });
			}
			
			self.pubsub.publish(targetId+"/cmd",
								{ "command": "restore_code",
								  "arguments": { "snapshot": snapshot,
//									  			 "code": code.codeString,
//									  			 "functionMap": functionMap,
									  			 "saveRestored": saveRestored }
								});
		}, function(error){
				
		});
	}
	else {
		console.log("!!! No snapshots available - Please pause the code ["+codeId+"] first.");
	}
};
CodeEngine.prototype.restoreCode = function(arguments){
	// This function is executable via pubsub - so it should have a single argument (which is an object)
	var self = this;
	var saveCode = arguments.saveRestored;
//	var runBlock = { dt_start: new Date(),
//			 dt_end: undefined,
//			 elapsed: undefined,
//			 snapshot: undefined };
//	this.runData.push(runBlock);
	var code = Code.restoreCode(arguments.snapshot, arguments.saveRestored);
	if (saveCode){
		code.saveToFile("inputs/"+code.id+"-"+code.migrationCount+".restored.js");
	}
	code.setPubsub(this.pubsub);
	
	this.codes[code.id] = code;
	
	//Publish to notify what code it is running
	this.pubsub.publish("things-engine-registry", { id: this.id, status: 'busy' });
	this.pubsub.publish(this.id+"/running", code.id);
	this.pubsub.subscribe(code.id+'/signals', function(signal){
		if (signal === "flush"){
			self.pubsub.unsubscribe(code.id+'/signals');
			code.destroy();
			delete self.codes[code.id];
			console.log("<ENGINE> ["+self.id+"] : Flushed "+code.id);
		}
	});
	
	if (this.logging){
		this.pubsub.publish(this.logging, { id: this.id, timestamp: Date.now(), memoryUsage: process.memoryUsage(), cpu: this.currentCPU, event: { name: "restore_code", data: code.id } });
	}
	
	code.run();
//	console.log("<ENGINE> ["+this.id+"] : Running ["+code.id+"] - Started at : "+runBlock.dt_start.toISOString());
	console.log("<ENGINE> ["+this.id+"] : Running ["+code.id+"] - Started at : "+(new Date()).toISOString());
	return code.id
};
CodeEngine.prototype.getRunData = function(index){
	if (!index) index = this.runData.length - 1;
	return this.runData[index];
};
//CodeEngine.prototype.getSnapshot = function(index){
//	//convenience function for getting the snapshot instead of runData
//	return this.getRunData(index).snapshot;
//};

module.exports = CodeEngine;