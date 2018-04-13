var repl = require('repl');
var http = require('http');
var fs = require('fs');
var things_engine = require('../lib/engine/CodeEngine.js');
var things_pubsub = require('../lib/pubsub/Pubsub.js');
var things_dispatcher = require('../lib/engine/Dispatcher.js');
var things_common = require('../lib/common.js');

// (!!) Probably want to change them so they aren't global. Initialize to Shell fields
// in the future?
var DB_URL = "localhost";
var DB_PORT = 5000;

var FS_MAKE = "/makeFromPath";
var FS_DELETE = "/deleteFromPath";
var FS_MOVE = "/moveFromPath";
var FS_RENAME = "/renameFromPath";
var FS_COPY = "/cloneFromPath";
var FS_UPDATE = "/updateFromPath";

var ROOT_PATH = '/root';

var _NODES = {};

var VALID_SHELL_CMDS = {
	/* things-js */
	'pubsub':   setPubSub,
	'ln':       listNodes,	
	'worker':   startWorker,
	'dispatch': dispatch,
	'migrate':  migrate,
	'cmds':     listCommands,
	'fields':   getAllFields,
	'pause':    pauseCode, 
	/* std process */
	'clear':    clear,
	'exit':     exit,
	/* filesystem */
	'ls':       listFiles,
	'cat':      catFile,
	'rm':       removeFileObject,
	'mkdir':    makeDirectory,
	'touch':    makeFile,
	'pwd':      printWorkingDirectory,
	'cd':       changeDirectory,
	'mv':       moveFileObject,
	/* misc */
	'':         function(){return '';} 
}

var COMMON_ERRORS = {
	NOTEXIST: "Oh no! A node doesn't exist. Type \'ln\' to view all nodes on this mqtt address",
	NOPUBSUB: "Please set your pubsub URL first using the command \'pubsub\'"
}

/* usage: exit
 */
function exit(){
	process.exit();
}

/* usage: clear
 */
function clear(){
	process.stdout.write('\033c');
}

/* In-progress
 */
function connectDB(db){
}

/* Analogous to 'pwd' in Linux; shows the current working directory
 * usage: pwd
 */
function printWorkingDirectory(){
	return this.path;
}

/* display the contents inside a file
 * usage: cat <path of file>
 *
 * @param name : name of the file (if it exists in the current directory), or the absolute path of the file
 */
function catFile(name){
	var absPath = name;
	var tokens = path.split('/');

	// append the cwd to the path if we are given only a file name
	if(tokens.length == 1 && tokens[0] == name){
		absPath = this.path + '/' + name;
	}

	return new Promise(function(resolve, reject){
		getRequest(absPath).then(function(data){
			if(!data || data.type != 'file'){
				resolve('No such file');
				return;
			}
			resolve(data);
		});
	});
}

/* Analogous to 'cd' in Linux
 *	usage: cd <dir> | cd .. | cd ~
 *
 * @param dirName  : the name of a folder (in the current directory), or absolute path 
 */
function changeDirectory(dirName){
	var self = this;
	// travel to the root
	if(dirName === '~'){
		this.path = ROOT_PATH;
	}
	// travel up the parent
	else if(dirName === '..'){
		currPath = this.path.split('/');
		if(currPath.length == 2){
			this.path = ROOT_PATH;
		}
		else{
			ancestor = currPath.splice(0, currPath.length-1).join('/');
			this.path = ancestor;
		}
	}
	else if(this.cachedChildren[dirName] == 'directory'){
		this.path = this.path + '/' + dirName;
	}
	else{
		return new Promise(function(resolve, reject){
			getRequest(dirName).then(function(data){
				if(data && data.type == 'directory'){
					self.path = dirName;
					resolve();
				}
				else{
					resolve(dirName + ': no such directory');
				}

			});
		});
	}
}


/* Analogous to 'mv' in Linux
 * usage: mv <path> <newpath>
 *
 * @param path    : path of the file object to be moved
 * @param newPath : path of the new parent directory, or what a file should be renamed to
 *
 */
function moveFileObject(path, newPath){
	var oldPath = '';
	if(path === ROOT_PATH){
		return "Cannot move the root directory";
	}
	pathTokens = path.split('/');

	// get the absolute path of the file
	if(pathTokens.length == 1){
		oldPath = this.path + '/' + pathTokens.toString();
	}
	else{
		oldPath = path;
	}

	pathTokens = newPath.split('/');
	if(pathTokens.length == 1){
		moveRequest(oldPath, newPath, true);
		return;
	}
	moveRequest(oldPath, newPath, false);
}

function moveRequest(path, newPath, rename){
	var self = this;
	var options = {
		method: 'POST',
		host: DB_URL,
		port: DB_PORT,
		path: (rename) ? FS_RENAME : FS_MOVE,
		headers: {
			'Content-Type': 'application/json'
		}			
	}
	var requestBody = {
		file_path: path,
	}
	if(rename){
		requestBody.file_name = newPath;
	}
	else{
		requestBody.parent_path = newPath;
	}
	return new Promise(function(resolve, reject){
		var req = http.request(options, function(res){
			res.on('data', function(c){
			});
			res.on('end', function(){
				var ret = (rename) ? 'Renamed file object' : 'Moved file object';
				resolve(ret);
			});
			res.on('error', function(err){
				console.log(err)
			})
		});
		req.write(JSON.stringify(requestBody));
		req.end();
	})
}

/* Analogous to 'mkdir' in Linux
 * usage: mkdir <dirName>
 */
function makeDirectory(dirName){
	return createRequest.call(this, dirName, this.path, false)
}

/* Creates a new file with contents from a local file
 * 
 * filePath relative to path of ThingsJS folder currently
 * usage: touch <name> <local codepath>
 *
 * @param fileName : name of the file to be created
 * @param codePath : absolute path of the content to be copied over
 */
function makeFile(fileName, contentPath){
	var contentString = '';

	if(!fileName){
		return "usage: touch <filename> <local-path of code to copy>";
	}
	if(contentPath){
		try {
			contentString = fs.readFileSync(contentPath).toString('utf-8');
		} catch(e){
			return "Could not read the contents of the local file";
		}
	}
	return postDirectory.call(this, fileName, this.path, true, contentString);
}

/* Helper to make a POST request for creating a directory or file
 * @param name        : name of the file/directory
 * @param parentPath  : parent of the file/directory to be created
 * @param isDirectory : true if the fsobject will be a directory
 * @param fileContent : contents of the file (utf-8)
 */
function createRequest(name, parentPath, isFile, fileContent){
	var self = this;
	var options = {
		method: 'POST',
		host: DB_URL,
		port: DB_PORT,
		path: FS_MAKE,
		headers: {
			'Content-Type': 'application/json'
		}
	}
	var requestBody = {
		file_name: name,
		parent_path: parentPath,
		is_file: isFile
	}
	if(isFile){
		requestBody.content = fileContent;
	}
	return new Promise(function(resolve, reject){
		var req = http.request(options, function(res){
			res.on('data', function(c){
			});
			res.on('end', function(){
				resolve("Created the file: " + name);
				self.cachedChildren[name] = (isFile) ? 'file' : 'directory';
			});
		});
		req.write(JSON.stringify(requestBody));
		req.end();
	})
}

/* Analagous to 'rm' in Linux
 * usage: rm <name>
 *
 * @param name  : name of the file object to delete, or path
 */
function removeFileObject(name){
	if(this.cachedChildren[name]){
		deleteRequest.call(this, name, this.path);
	}
	else{
		deleteRequest.call(this, '', name);
	}
}

/* Helper function to make a POST request to delete a file object
 */
function deleteRequest(name, parentPath){
	var self = this;
	var options = {
		method: 'POST',
		host: DB_URL,
		port: DB_PORT,
		path: FS_DELETE,
		headers: {
			'Content-Type': 'application/json'
		}	
	}
	var requestBody = {
		file_path: parentPath + '/' + name
	}

	return new Promise(function(resolve, reject){
		var req = http.request(options, function(res){
			res.on('data', function(c){
			});
			res.on('end', function(){
				resolve("Deleted " + name);
			});
		});
		req.write(JSON.stringify(requestBody));
		req.end();
	})
}

/* Sends an http GET request to the filesystem database
 */
function getRequest(path){
	var options = {
		host: DB_URL,
		port: DB_PORT,
		path: path
	}
	return new Promise(function(resolve, reject){
		http.get(options, function(res){
			var body = '';
			res.on('data', function(c) {
				body += c;
			});
			res.on('end', function(){
				resolve(body);
			});
		})
	})
}

/* Analogous to 'ls' in Linux
 * usage: ls
 */
function listFiles(){
	return getRequest(this.path);
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

/* usage: ln 
 * - requires setting a pubsub
 */
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

	/* code repository */
	this.repl.path = ROOT_PATH;
	this.repl.cachedChildren = {};
}

function parseArguments(input){
	var parsedInput = input.trim().split(/\s+/) || '';
	return { cmd: parsedInput[0], args: parsedInput.splice(1, parsedInput.length-1) };
}

Shell.prototype.shellEval = function(input, context, filename, callback){
	var userInput = parseArguments(input);
	var self = context;

	if(VALID_SHELL_CMDS[userInput.cmd]){
		var result = VALID_SHELL_CMDS[userInput.cmd].apply(context, userInput.args);
		if(result instanceof Promise){
			result.then(function(data){
				try{
					outputString = '';
					parsedData = JSON.parse(data);
					if(parsedData.type === 'file'){
						self.cachedChildren[parsedData.name] = parsedData.type;
						callback(null, parsedData['content']);
					}
					else {
						children = parsedData['content'];
						for(var i = 0; i < children.length; i++){
							var fsObject = children[i]['name'];
							self.cachedChildren[fsObject] = children[i]['type'];
							outputString += fsObject + "     ";
						}
						callback(null, outputString);
					}
				} catch(e){
					callback(null, data)
				}
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