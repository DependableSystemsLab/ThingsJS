var repl = require('repl');
var things_engine = require('../lib/engine/CodeEngine.js');
var things_pubsub = require('../lib/pubsub/Pubsub.js');
var things_dispatcher = require('../lib/engine/Dispatcher.js');
var things_common = require('../lib/common.js');

var _NODES = {};

/* 
 * Current command to function mappings. 
 * (!!) Better way to do this besides hash table?
 * (!!) Have a Command class?
 *
 * pubsub <url>      		-- connect to a pubsub URL
 * ls                		-- list all nodes on the connected pubsub network
 * worker <config>   		-- deploy a worker given a config
 * dispatch <code> <worker> -- run code on a given node
 * exit              		-- exit the shell
 * cmds              		-- list all currently available commands
 * fields <worker>          -- fetch all the fields of a worker
 */
var VALID_SHELL_CMDS = {
	'pubsub':   setPubSub,
	'ls':       listNodes,	
	'worker':   startWorker,
	'dispatch': dispatch,
	'exit':     exit,
	'migrate':  migrate,
	'cmds':     listCommands,
	'fields':   getAllFields,
	'pause':    pauseCode, 
	'':         function(){return '';} 
}

var COMMON_ERRORS = {
	NOTEXIST: "Oh no! A node doesn't exist. Type \'ls\' to view all nodes on this mqtt address",
	NOPUBSUB: "Please set your pubsub URL first using the command \'pubsub\'"
}

function exit(){
	process.exit();
}

/* (!!) Function assumes that code field is valid  
 */
function pauseCode(nodeId){
	if(nodeId){
		if(!this.allNodes[nodeId]){
			return COMMON_ERRORS['NOTEXIST'];
		}
		if(this.allNodes[nodeId].status !== 'busy'){
			return "This node is not running code";
		}
		if(!this.pubsub){
			return COMMON_ERRORS['NOPUBSUB'];
		}
		if(!this.dispatcher){
			this.dispatcher = new things_dispatcher({ pubsub_url: this.pubsub.pubsub_url });
		}
		return this.dispatcher.pauseCode(nodeId, this.allNodes[nodeId].code);
	}
	else{
		return "usage: pause <worker id>";
	}
}

function listNodes(){
	if(!this.pubsub){
		return COMMON_ERRORS['NOPUBSUB'];
	}
	else{
		var nodes = '';
		for(nodeId in this.allNodes){
			nodes += nodeId + '\n';
		}
		return nodes;
	}
}

/* usage: worker <conf>
 *		- <conf>: JSON configuration, or path to config file
 * 
 * (!!) Only allow workers to be created on the same pubsub channel? 
 * (!!) Currently can create a worker for any pubsub given in configuration
 * (!!) Fights with the shell if code is dispatched on the created worker
 */
function startWorker(conf){
	if(conf){
		var config = things_common.validateConfig(conf);
		var engine = new things_engine(config, { logging: 'thingsjs-logs', logInterval: 500 });
	}
	else{
		return "usage: worker <conf>";
	}
}

/* usage: fields <worker>
 *		- <worker>: id of the node
 *
 * (!!) Created for testing purposes curently
 * (!!) Properties are only updated from subscription to certain topics. Not very accurate
 * (!!) Dependant on the worker logging
 */
function getAllFields(nodeId){
	if(nodeId){
		var str = '';
		for(field in this.allNodes[nodeId]){
			str += field + ':  ' + this.allNodes[nodeId][field] + '\n';
		}
		return str;
	}
	else{
		return "usage: fields <worker id>";
	}
}


/* usage: migrate <from id> <to id> <save state files>
 *		- <from id>: worker id running code you wish to migrate
 *		- <to id>: worker id to migrate code to
 *		- <save state files>: boolean
 *
 * (!!) Implementation incomplete
 * (!!) Cannot gauge status of device immediately 
 * (!!) Does not check if worker to migrate to is idle
 * (!!) Code can be running before shell has started
 * 
 */
function migrate(fromId, toId, saveStateFiles){

	if(!fromId || !toId){
		return "usage: migrate <from id> <to id> <save state files>";
	}
	if(!this.pubsub){
		return COMMON_ERRORS['NOPUBSUB'];
	}
	if(!this.allNodes[fromId] || !this.allNodes[toId]){
		return COMMON_ERRORS['NOTEXIST'];
	}
	else if(!this.allNodes[fromId].code || this.allNodes[fromId].status !== 'busy'){
		return "You cannot migrate code from a worker that is not working";
	}

	if(!this.dispatcher){
		this.dispatcher = new things_dispacher({ pubsub_url: this.pubsub.pubsub_url });
	}
	var save = saveStateFiles || false;
	return this.dispatcher.migrateCode(fromId, toId, this.allNodes[fromId].code, save);
}

/* usage: dispatch <file> <node>
 *		- <file>: code
 *		- <node>: id of worker
 *
 * (!!) Does not check if code is currently running on worker
 */
function dispatch(filepath, nodeId){

	if(!filepath || !nodeId){
		return "usage: dispatch <file> <worker id>";
	}
	if(!this.allNodes[nodeId]){
		return COMMON_ERRORS['NOTEXIST'];
	}
	else if(filepath){
		if(!this.dispatcher){
			this.dispatcher = new things_dispatcher({ pubsub_url: this.pubsub.pubsub_url });
		}
		return this.dispatcher.runCode(nodeId, filepath);
	}
}

/* Helper function for setPubSub
 */
function updateNode(node, newNode){
	var updatedNode = node || {};
	for(field in newNode){
		updatedNode[field] = newNode[field];
	}
	return updatedNode;
}

/* usage: pubsub <url>
 *		- <url>: mqtt URL
 *
 * (!!) Does not modify array for workers leaving
 * (!!) Can't detect code that has already been running
 * (!!) Really bad subscription mechanism to track workers right now
 * (!!) Have Pubsub.js create a function to return pubsub URL?
 */
function setPubSub(url){
	var self = this;
	// Should we validate it? Currently defaults to mqtt://localhost if bad URL
	if(url){
		self.pubsub = new things_pubsub('things-shell', url);
		return self.pubsub.connect(function(){
			self.pubsub.subscribe('things-engine-registry', function(node){
				if(node){
					_NODES[node.id] = updateNode(_NODES[node.id], node);
				}
			});
			self.pubsub.subscribe('thingsjs-logs', function(node){
				if(node){
					_NODES[node.id] = updateNode(_NODES[node.id], node);
					self.pubsub.subscribe(node.id+'/running', function(codeId){
						_NODES[node.id]['code'] = codeId;
					});
				}
			});
			return "[things-shell] : Connected to MQTT Server at "+ self.pubsub.pubsub_url;
		});
	}
	else{
		return "usage: pubsub <mqtt url>";
	}
}

/* usage: cmds
 */
function listCommands(){
	var allCmds = '';
	for(cmd in VALID_SHELL_CMDS){
		allCmds += cmd + '\n';
	}
	return allCmds;
}

function Shell(){
	this.repl = repl.start({
		prompt: '~> ',
		eval: this.shellEval,
		writer: this.shellWriter
	}).context;

	this.repl.allNodes = _NODES;
	this.repl.pubsub = undefined;
	this.repl.engine = undefined;
	this.repl.dispatcher = undefined;
}

Shell.prototype.shellEval = function(input, context, filename, callback){
	// hacky way of getting all the user input
	var parsedInput = input.trim().split(/\s+/) || '';
	var userInput = {
		cmd: parsedInput[0],
		args: parsedInput.splice(1, parsedInput.length-1)
	}
	if(VALID_SHELL_CMDS[userInput.cmd]){
		var result = VALID_SHELL_CMDS[userInput.cmd].apply(context, userInput.args);
		if(result instanceof Promise){
			result.then(function(data){
				callback(null, data);
			});
		}
		else{
			callback(null, result);
		}
	}
	else{
		var error = userInput.cmd + ": command not found. Type \'cmds\' to view a list of current commands";
		callback(null, error);
	}
}

Shell.prototype.shellWriter = function(output){
	if(typeof output === 'string'){
		return output;
	}
	else{
		return '';
	}
}

module.exports = Shell;