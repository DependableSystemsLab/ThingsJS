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
var MAKE_FSOBJECT = "/createFSObject";
var DELETE_DIR = "/deleteDirectory";
var MOVE_DIR = "/moveDirectory";
var ROOT_PATH = '/';

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
	// things-js related commands
	'pubsub':   setPubSub,
	'ln':       listNodes,	
	'worker':   startWorker,
	'dispatch': dispatch,
	'migrate':  migrate,
	'cmds':     listCommands,
	'fields':   getAllFields,
	'pause':    pauseCode, 
	// standard process commands
	'clear':    clear,
	'exit':     exit,
	// filesystem commands
	'ls':       listFiles,
	'touch':    makeFile,
	'cat':      catFile,
	'rm':       removeFileObject,
	'mkdir':    makeDirectory,
	'pwd':      printWorkingDirectory,
	'cd':       changeDirectory,
	'mv':       moveFileObject,
	// misc
	'':         function(){return '';} 
}

var COMMON_ERRORS = {
	NOTEXIST: "Oh no! A node doesn't exist. Type \'ln\' to view all nodes on this mqtt address",
	NOPUBSUB: "Please set your pubsub URL first using the command \'pubsub\'"
}

function exit(){
	process.exit();
}

function clear(){
	process.stdout.write('\033c');
}

/* (!!) In-progress. Perhaps we can initialize db information as a Shell field
 * usage: use <db name>
 *			- <db name>: name of the database
 */
function connectDB(db){
}

/* Analogous to 'pwd' in Linux
 * usage: pwd
 */
function printWorkingDirectory(){
	return this.path;
}

/* usage: cat <filename>
 */
function catFile(name){
	path = (this.path == '/') ? (this.path + name) : (this.path + '/' + name);
	if(this.cachedChildren[path] == 'file'){
		return getRequest(path);
	}
	else{
		return "No such file";
	}
}



/* Analogous to 'cd' in Linux
 *	usage: cd <dir> | cd .. | cd ~
 *		- <dir> must be a child of the current path
 */
function changeDirectory(dirName){
	if(dirName === '~'){
		this.path = ROOT_PATH;
	}
	// traverse to parent
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
		this.path = (this.path === '/')?(this.path + dirName) : (this.path + '/' + dirName);
	}
	else{
		return dirName + ": no such file or directory";
	}
}


/* Analogous to 'mv' in Linux
 * usage: mv <path> <newpath>
 * (!!) TO-DO: check if path is valid?
 * (!!) TO-DO: update cache
 *
 */
function moveFileObject(path, newPath){
	function getAbsPath(name){
		var path = (this.path == '/') ? (this.path + name) : (this.path + '/' + name);
		return path;
	}

	var oldPath = '';
	if(path === '/'){
		return "Cannot move the root directory";
	}
	pathTokens = path.split('/');
	if(pathTokens.length == 1){
		oldPath = getAbsPath.call(this, pathTokens.toString());
	}
	else{
		oldPath = path;
	}
	pathTokens = newPath.split('/');
	if(pathTokens.length == 1){
		newPath = getAbsPath.call(this, pathTokens.toString());
	}
	postMoveDirectory(oldPath, newPath);
}

function postMoveDirectory(path, newPath){
	var self = this;
	var options = {
		method: 'POST',
		host: DB_URL,
		port: DB_PORT,
		path: MOVE_DIR,
		headers: {
			'Content-Type': 'application/json'
		}			
	}
	var requestBody = {
		path: path,
		new_path: newPath
	}
	return new Promise(function(resolve, reject){
		var req = http.request(options, function(res){
			res.on('data', function(c){
			});
			res.on('end', function(){
				resolve('Moved the file object');
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
 *		- <dirName> name of the new folder
 */
function makeDirectory(dirName){
	return postDirectory.call(this, dirName, this.path, true)
}

/* (!!) No error checking to see if the file exists
 * Analagous to 'rmdir' in Linux
 * usage: rmdir <dirName>
 *		- <dirName> name of the folder to remove *recursively
 */
function removeFileObject(dirName){
	return deleteDirectory.call(this, dirName, this.path);
}

/* Helper function to make a POST request for removeDirectory()
 */
function deleteDirectory(name, parentPath){
	var self = this;
	var options = {
		method: 'POST',
		host: DB_URL,
		port: DB_PORT,
		path: DELETE_DIR,
		headers: {
			'Content-Type': 'application/json'
		}	
	}
	var requestBody = {
		file_path: (parentPath ==='/') ? (parentPath + name) : (parentPath + '/' + name)
	}

	return new Promise(function(resolve, reject){
		var req = http.request(options, function(res){
			res.on('data', function(c){
			});
			res.on('end', function(){
				resolve("Deleted the directory " + name);
			});
		});
		req.write(JSON.stringify(requestBody));
		req.end();
	})
}

/* Creates a new file with contents from a local file
 * 
 * filePath relative to path of ThingsJS folder currently
 * usage: touch <name> <local codepath>
 *		- <local codepath> if empty, creates empty file
 */
function makeFile(fileName, codePath){
	var contentString = '';

	if(!fileName){
		return "usage: touch <filename> <local-path of code to copy>";
	}
	if(codePath){
		try {
			contentString = fs.readFileSync(codePath).toString('utf-8');
		}catch(e){
			return "Could not read the contents of the local file";
		}
	}
	return postDirectory.call(this, fileName, this.path, false, contentString);
}

/* Helper to make a POST request for creating a directory or file
 * @param {name}        : name of the file/directory
 * @param {parentPath}  : parent of the file/directory to be created
 * @param {isDirectory} : true if the fsobject will be a directory
 * @param {fileContent} : contents of the file (utf-8)
 */
function postDirectory(name, parentPath, isDirectory, fileContent){
	var self = this;
	var options = {
		method: 'POST',
		host: DB_URL,
		port: DB_PORT,
		path: MAKE_FSOBJECT,
		headers: {
			'Content-Type': 'application/json'
		}
	}
	var requestBody = {
		file_name: name,
		parent_path: parentPath,
		type: (isDirectory) ? 'directory' : 'file'
	}
	if(!isDirectory){
		requestBody.content = fileContent;
	}
	return new Promise(function(resolve, reject){
		var req = http.request(options, function(res){
			res.on('data', function(c){
			});
			res.on('end', function(){
				resolve("Created the file: " + name);
				self.cachedChildren[name] = (isDirectory) ? 'directory' : 'file';
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

/* (!!) Needs a caching mechanism
 * Analogous to 'ls' in Linux
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
	// for code repository
	this.repl.path = ROOT_PATH;
	this.repl.cachedChildren = {};
}

Shell.prototype.shellEval = function(input, context, filename, callback){
	// hacky way of getting all the user input
	var parsedInput = input.trim().split(/\s+/) || '';
	var userInput = {
		cmd: parsedInput[0],
		args: parsedInput.splice(1, parsedInput.length-1)
	}
	var self = context;

	if(VALID_SHELL_CMDS[userInput.cmd]){
		var result = VALID_SHELL_CMDS[userInput.cmd].apply(context, userInput.args);
		if(result instanceof Promise){
			result.then(function(data){
				try{
					outputString = '';
					parsedData = JSON.parse(data);
					dataInfo = parsedData['data'];
					if(dataInfo.type === 'file'){
						self.cachedChildren[dataInfo.path] = dataInfo.type;
						callback(null, parsedData['content']);
					}
					else {
						children = parsedData['content'];
						for(var i = 0; i < children.length; i++){
							var fsObject = children[i]['name'];
							var fsPath = children[i]['path'];
							self.cachedChildren[fsPath] = children[i]['type'];
							outputString += fsObject + "\n";
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