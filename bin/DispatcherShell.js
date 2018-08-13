var repl = require('repl');
var readline = require('readline');
var http = require('http');
var fork = require('child_process').fork;
var fs = require('fs');
var Dispatcher = require('../lib/core/Dispatcher.js');
var Pubsub = require('../lib/core/Pubsub.js');
var randKey = require('../lib/helpers.js').randKey;

/*****************************************************************************
                            QUEUE OBJECT
******************************************************************************/

/**
 * An object that should be manually resolved to indicate 
 * that it has reached the front of the queue
 */
function QueueObject(){
	var self = this;
	this.front = new Promise(function(resolve){
		self.resolve = resolve;
	});
}

/**
 * Used in conjunction with QueueObject to mimic a 'queue'
 */
function Queue(){
	var self = this;

	this.queue = [];

	this.push = function(queueObject){
		self.queue.push(queueObject);
		self.queue[0].resolve();
	}

	this.pop = function(){
		self.queue.splice(0, 1);
		if(self.queue[0]){
			self.queue[0].resolve();
		}
	}
}

/*****************************************************************************
                             SHELL OBJECT
******************************************************************************/

function DispatcherShell(){
	var self = this;
	this.queue = new Queue();
	this.dispatcher = new Dispatcher();
	this.pubsub = new Pubsub();

	this.FSPort = 3000;
	this.FSURL = 'localhost';
	this.FSPath = '/file-system';
	this.dir = '/';

	console.log('=== Dispatcher Shell ===\n', 'For a list of commands, type \'cmds\'');

	function ready(obj){
		return new Promise(function(resolve){
			obj.on('ready', resolve);
		});
	}
	
	Promise.all([ready(self.pubsub), ready(self.dispatcher)]).then(function(){
		var shell = repl.start({
			prompt: '~> ',
			eval: self.eval,
			writer: self.writer
		});
		shell.context = self;
	});
}

DispatcherShell.prototype.parse = function(input){
	var parsedInput = input.trim().split(/\s+/) || '';
	return { cmd: parsedInput[0], args: parsedInput.splice(1, parsedInput.length-1) };
}

/**
 * Evaluates expressions given from the command line
 * Commands execute sequentially, "blocking" until the command reaches the front
 * of the queue
 */
DispatcherShell.prototype.eval = function(input, context, filename, callback){
	var parse = context.parse(input);

	if(DispatcherShell.COMMANDS[parse.cmd]){
		var queueObj = new QueueObject();
		context.queue.push(queueObj);

		queueObj.front.then(function(){
			var eval = DispatcherShell.COMMANDS[parse.cmd].apply(context, parse.args);
			if(eval instanceof Promise){
				eval.then(function(data){
					callback(null, data);
					context.queue.pop();
				});
			}
			else{
				callback(null, eval);
				context.queue.pop();
			}
		});
	}
	else{
		callback(null, 'Unrecognized command: ' + parse.cmd);
	}
}

DispatcherShell.prototype.writer = function(output){
	try{
		var pretty = JSON.stringify(JSON.parse(output), null, 2);
		return '\x1b[36m' + pretty + '\x1b[0m';
	}
	catch(e){
		if(typeof output === 'string'){
			return '\x1b[36m' + output + '\x1b[0m';
		}
		else{
			return '';
		}
	}
}

/**
 * 'Standard' errors thrown by the Shell
 */
DispatcherShell.ERRORS = {
	/**
	 * Incorrect arguments
	 * @param {string[]} expectedArgs: brief description of the expected arguments to pass in
	 */
	ARGS: function(expectedArgs){
		function inBrackets(args){
			return args.map(function(argName){
				return '<'+argName+'>'
			});
		}
		var errString = 'Error: Incorrect number of arguments. Expecting ' + expectedArgs.length;
		errString += '\nUsage: ' +arguments.callee.caller.name+ ' ' +inBrackets(expectedArgs).join(' ');
		return errString;
	},

	EDNE: 'Error: It looks like this code engine does not exist',

	IDNE: 'Error: IT looks like this code instance does not exist',

	EXISTS: function(path){
		return 'Error: ' + path + ' already exists';
	},

	PDNE: function(dir){
		return 'ERROR: The path ' + dir + ' does not exist';
	},

	CONFIG: 'Error: Problem processing config',

	FILE: 'Error: Problem reading file',

	NAF: 'Error: Not a file',

	NAD: 'Error: Not a directory',

	FS: 'Error: Could not connect to the filesystem',

	IDNE: 'Error: It looks like this code instance does not exist',

	TIMEOUT: 'Error: Timeout occured'
}

/*****************************************************************************
                FUNCTIONS RELATED TO CODE INSTANCES
******************************************************************************/

DispatcherShell.prototype.programMeta = function(instanceId){
	var self = this;

	if(!self.dispatcher.programs[instanceId]){
		return DispatcherShell.ERRORS['IDNE'];
	}
	return 'UNDER CONSTRUCTION';
}

/**
 * Run code on an engine
 */
DispatcherShell.prototype.run = function(engine, codeSource){
	var self = this;

	var code;
	if(!this.dispatcher.engines[engine]){
		return DispatcherShell.ERRORS['EDNE'];
	}
	try{
		code = fs.readFileSync(codeSource, 'utf-8');
		return new Promise(function(resolve){
			self.dispatcher.runCode(engine, codeSource, code).then(function(data){
				resolve(JSON.stringify(data));
			})
			.catch(function(err){
				resolve(DispatcherShell.ERRORS['TIMEOUT']);
			});
		});
	}
	catch(e){
		return 'Could not read file';
	}
}

/**
 * Pause a running instance on an engine
 */
DispatcherShell.prototype.pause = function(engine, codeName, instanceId){
	var self = this;
	if(!this.dispatcher.engines[engine]){
		return DispatcherShell.ERRORS['EDNE'];
	}
	return new Promise(function(resolve){
		self.dispatcher.pauseCode(engine, codeName, instanceId).then(function(data){
			resolve(JSON.stringify(data));
		})
		.catch(function(err){
			resolve(DispatcherShell.ERRORS['TIMEOUT']);
		});
	});
}

/**
 * Migrate an instance from one engine to another engine
 */
DispatcherShell.prototype.migrateCode = function(from, to, codeName, instanceId){
	var self = this;

	if(!this.dispatcher.engines[from] || !this.dispatcher.engines[to]){
		return DispatcherShell.ERRORS['EDNE'];
	}
	return new Promise(function(resolve){
		self.dispatcher.moveCode(from, to, codeName, instanceId).then(function(data){
			resolve(JSON.stringify(data));
		})
		.catch(function(err){
			resolve(DispatcherShell.ERRORS['TIMEOUT']);
		});
	});
}

/**
 * Kill an instance of code
 */
 DispatcherShell.prototype.kill = function(codeName, instanceId){
 	var self = this;

 	return new Promise(function(resolve){
 		self.dispatcher.killCode(codeName, instanceId).then(function(data){
 			resolve(JSON.stringify(data));
 		})
 		.catch(function(err){
 			resolve(DispatcherShell.ERRORS['TIMEOUT']);
 		});
 	});
 }

/**
 * Communicates with code instance directly to pause/resume/snapshot/etc
 * Make obsolete and use Dispatcher's API for commands when available
 */
DispatcherShell.prototype.sendCodeCommand = function(codeName, instanceId, ctrl){
	var self = this;
	var pubChannel = codeName + '/' + instanceId + '/cmd';
	var subChannel = this.pubsub.id + '/reply';

	this.pubsub.publish(pubChannel, { ctrl: ctrl, request_id: Math.random(), reply_to: subChannel });

	return new Promise(function(resolve){
		var timeout = setTimeout(function(){
			resolve(DispatcherShell.ERRORS['TIMEOUT']);
		}, 10000);

		self.pubsub.subscribe(subChannel, function(data){
			clearTimeout(timeout);
			self.pubsub.unsubscribe(subChannel);
			resolve(JSON.stringify(data));
		});
	});
}

DispatcherShell.prototype.getResourceUsage = function(engineId){
	if(!this.dispatcher.engines[engineId]){
		return DispatcherShell.ERRORS['EDNE'];
	}
	var stats = this.dispatcher.engines[engineId].stats;
	return JSON.stringify(stats[stats.length-1]);
}

DispatcherShell.prototype.getPrograms = function(){
	var self = this;
	console.log('[DispatcherShell] Please wait while I collect programs...\n');
	return new Promise(function(resolve){
		var instances = [];
		self.pubsub.publish('program-monitor/bcast', { ctrl: 'report' });
		self.pubsub.subscribe('program-monitor', function(data){
			instances.push(data);
		});

		setTimeout(function(){
			self.pubsub.unsubscribe('program-monitor');
			var instanceResources = {};

			if(instances.length === 0){
				resolve(JSON.stringify(instanceResources));
			}
			instances.forEach(function(instance){
				var name = instance.code_name;
				var id = instance.instance_id;

				self.pubsub.subscribe(name + '/' + id + '/resource', function(data){
					instanceResources[id] = { resource: data, meta: instance };
				});

				setTimeout(function(){
					instances.forEach(function(instance){
						self.pubsub.unsubscribe(instance.code_name +'/'+instance.instance_id+'/resource');
					});
					resolve(JSON.stringify(instanceResources));
				}, 2000);
			});
		}, 2000);

	});
}

/* uses pubsub broadcast command */
DispatcherShell.prototype.getDevices = function(){
	var self = this;
	console.log('[DispatcherShell] Please wait while I collect devices...\n');
	return new Promise(function(resolve){
		var devices = [];
		self.pubsub.publish('engine-registry/bcast', { ctrl: 'report' });
		self.pubsub.subscribe('engine-registry', function(data){
			devices.push(data);
		});

		setTimeout(function(){
			self.pubsub.unsubscribe('engine-registry');
			var deviceRes = {};

			devices.forEach(function(device){
				self.pubsub.subscribe(device.id + '/resource', function(data){
					deviceRes[device.id] = data;
					self.pubsub.unsubscribe(device.id + '/resource');
				});
			});

			setTimeout(function(){
				resolve(JSON.stringify(deviceRes));
			}, 2000);

		}, 2000);
	});
}

DispatcherShell.prototype.getProgramResourceUsage = function(codeName, instanceId){
	var self = this;
	return new Promise(function(resolve){
		var channel = codeName + '/' + instanceId + '/resource';
		var timeout = setTimeout(function(){
			self.pubsub.unsubscribe(channel);
			resolve(DispatcherShell.ERRORS['TIMEOUT']);
		}, 5000);

		self.pubsub.subscribe(channel, function(data){
			self.pubsub.unsubscribe(channel);
			clearTimeout(timeout);
			resolve(JSON.stringify(data));
		});
	});
}

DispatcherShell.prototype.killEngine = function(engineId){
}

DispatcherShell.prototype.pauseCode = function(codeName, instanceId){
	return this.sendCodeCommand(codeName, instanceId, 'pause');
}

DispatcherShell.prototype.resumeCode = function(){
	return this.sendCodeCommand(codeName, instanceId, 'resume');
}

DispatcherShell.prototype.snapshotCode = function(codeName, instanceId){
	return this.sendCodeCommand(codeName, instanceId, 'snapshot');
}

DispatcherShell.prototype.killCode = function(codeName, instanceId){
	return this.sendCodeCommand(codeName, instanceId, 'kill');
}

DispatcherShell.prototype.listInstances = function(){
	return this.dispatcher.printPrograms();	
}

DispatcherShell.prototype.listEngines = function(){
	return this.dispatcher.printEngines();
}

/*****************************************************************************
						FILESYSTEM FUNCTIONS
*****************************************************************************/
DispatcherShell.prototype.pwd = function(){
	return this.dir;
}

DispatcherShell.prototype.make = function(path, content){
	var self = this;
	var type = (content) ? 'file' : 'directory';
	var parent = path.split('/');
	var name = parent.pop();

	return new Promise(function(resolve, reject){
		if(name === ''){
			reject('No ' + type + ' name provided');
			return;
		}
		self._exists(path).then(function(_id){
			if(_id && (type === 'directory')){
				reject(DispatcherShell.ERRORS['EXISTS'](path));
				return;
			}
			self._goto(parent.join('/')).then(function(res){
				var path = res.path;

				self._post(path, type, name, content, _id).then(function(){
					resolve(type + ' successfully created');
				})
				.catch(function(err){
					reject(err);
				});
			})
			.catch(function(err){
				reject(err);
			});
		});
	});
}

DispatcherShell.prototype.makeDirectory = function(path){
	var self = this;

	return new Promise(function(resolve){
		self.make(path).then(function(res){
			resolve(res);
		})
		.catch(function(err){
			resolve(err);
		});
	});
}

DispatcherShell.prototype.makeFile = function(path, contentPath){
	var self = this;

	return new Promise(function(resolve){
		try{
			var file = fs.readFileSync(contentPath, 'utf-8');
		}
		catch(e){
			resolve(DispatcherShell.ERRORS['FILE']);
			return;
		}
		self.make(path, file).then(function(res){
			resolve(res);
		})
		.catch(function(err){
			resolve(err);
		});
	});
}

DispatcherShell.prototype.delete = function(path){
	var self = this;

	return new Promise(function(resolve){
		self._goto(path).then(function(newPath){
			var _id = newPath.data._id;
			var absPath = newPath.path + '?ids=' + _id;

			self.http(absPath, 'DELETE').then(function(){
				resolve(newPath.data.type + ' succesfully deleted');
			})
			.catch(function(err){
				resolve(err);
			});
		})
		.catch(function(err){
			resolve(err);
		});
	});
}

DispatcherShell.prototype.cat = function(path){
	var self = this;

	return new Promise(function(resolve){
		self._goto(path).then(function(newPath){
			if(newPath.data.type !== 'file'){
				resolve(DispatcherShell.ERRORS['NAF']);
				return;
			}
			resolve(newPath.data.content);
		})
		.catch(function(err){
			resolve(err);
		});
	})
	.catch(function(err){
		resolve(err);
	})
}

DispatcherShell.prototype.listFiles = function(){
	var self = this;

	return new Promise(function(resolve){
		self._get(self.dir).then(function(data){
			var files = JSON.parse(data).children;
			resolve(Object.keys(files).join('\n'));
		})
		.catch(function(err){
			resolve(DispatcherShell.ERRORS['FS']);
		});
	});
}

DispatcherShell.prototype.changeDirectory = function(path){
	var self = this;

	return new Promise(function(resolve){
		self._goto(path).then(function(newPath){
			if(newPath.data.type && newPath.data.type !== 'directory'){
				resolve(DispatcherShell.ERRORS['NAD']);
				return;
			}
			self.dir = newPath.path;
			resolve();
		})
		.catch(function(err){
			resolve(err)
		});
	});
}

DispatcherShell.prototype._exists = function(path){
	var self = this;

	return new Promise(function(resolve){
		self._goto(path).then(function(res){
			resolve(res.data._id);
		})
		.catch(function(err){
			resolve(undefined);
		});
	});
}

DispatcherShell.prototype._goto = function(path){
	var self = this;
	var currTokens = self.dir.split('/');
	var cdTokens = path.split('/');
	currTokens.shift();

	return new Promise(function(resolve, reject){
		cdTokens.forEach(function(token, index){
			switch(token){
				case '':
					if(index === 0){
						currTokens = [];
					}
					break;
				case '..':
					currTokens.pop();
					break;
				case '.':
					break;
				default:
					currTokens.push(token);
			}
		});
		var newPath = (currTokens[0] === '') ? currTokens.join('/') : '/' + currTokens.join('/');
		self._get(newPath).then(function(res){
			var res = JSON.parse(res);
			if(res['error']){
				reject(DispatcherShell.ERRORS['PDNE'](newPath));
			}
			else{
				resolve({ path: newPath, data: res });
			}
		})
		.catch(function(err){
			reject(DispatcherShell.ERRORS['FS']);
		});

	});
}

DispatcherShell.prototype.http = function(absPath, method, requestBody){
	var self = this;
	var options = {
		method: method,
		host: self.FSURL,
		port: self.FSPort,
		path: self.FSPath + absPath,
		headers: {
			'Content-Type': 'application/json'
		}
	}

	return new Promise(function(resolve, reject){
		var req = http.request(options, function(res){
			var body = '';
			res.on('data', function(c){
				body += c;
			});
			res.on('end', function(){
				resolve(body);
			});
			res.on('error', function(){
				reject(err);
			});

		}).on('error', function(){
			reject(DispatcherShell.ERRORS['FS']);
		});

		if(requestBody){
			req.write(JSON.stringify(requestBody));
		}
		req.end();
	});
}

DispatcherShell.prototype._post = function(absPath, type, name, content, _id){
	var self = this;
	var requestBody = {
		type: type,
		name: name
	}
	if(content){
		requestBody.content = content;
	}
	if(_id){
		requestBody._id = _id;
	}
	return self.http(absPath, 'POST', requestBody);
}

DispatcherShell.prototype._get = function(absPath){
	var self = this;
	return self.http(absPath, 'GET');
}

/*****************************************************************************
					  SCHEDULING FUNCTIONS
*****************************************************************************/

DispatcherShell.prototype.runApplication = function(appConfig){
	var self = this;
	var config;
	var sendChannel = 'runApplication';
	var listenChannel = 'applicationDetails';
	var requestToken = randKey();

	return new Promise(function(resolve){
		try{
			config = JSON.parse(fs.readFileSync(appConfig, 'utf-8'));
			config.request_token = requestToken;
		}
		catch(e){
			resolve(DispatcherShell.ERRORS['CONFIG']);
		}
		self._listenTimeout(5000, listenChannel + '/' +  requestToken + '/run')
			.then(function(res){
				self._isPending(res).then(function(data){
					resolve(JSON.stringify(data));
				})
				.catch(function(err){
					resolve(err);
				});
			})
			.catch(function(err){
				resolve(err);
			});

		self.pubsub.publish(sendChannel, config);
	});
}

DispatcherShell.prototype.stopApplication = function(id){
	var self = this;
	var sendChannel = 'stopApplication';
	var listenChannel = 'applicationDetails';
	var requestToken = randKey();
	var appId = id.trim();

	return new Promise(function(resolve){
		self._listenTimeout(5000, listenChannel + '/' + requestToken + '/stop')
			.then(function(res){
				self._isPending(res).then(function(data){
					resolve(JSON.stringify(data));
				})
				.catch(function(err){
					resolve(err);
				});
			})
			.catch(function(err){
				resolve(err);
			});

		var request = {
			application_id: appId,
			request_token: requestToken
		}

		self.pubsub.publish(sendChannel, request);
	});
}

DispatcherShell.prototype._isPending = function(json){
	var self = this;
	var listenChannel = 'applicationDetails';

	return new Promise(function(resolve, reject){
		if(json.status === 'PENDING'){
			console.log(JSON.stringify(json));
			console.log('\nWaiting for a status update...\n');

			self._listenAccumulate(5000, listenChannel).then(function(msgs){
				msgs.forEach(function(update){
					if(update.application_id === json.application_id){
						resolve(update);
						return;
					}
				});
				reject(DispatcherShell.ERRORS['TIMEOUT']);
			});
		}
		else{
			resolve(json);
		}
	});
}

DispatcherShell.prototype._listenAccumulate = function(ms, channel){
	var self = this;
	var messages = [];

	return new Promise(function(resolve){
		self.pubsub.subscribe(channel, function(msg){
			messages.push(msg);
		});

		setTimeout(function(){
			resolve(messages);
		}, ms);
	});
}

DispatcherShell.prototype._listenTimeout = function(ms, channel){
	var self = this;

	return new Promise(function(resolve, reject){
		var timer = setTimeout(function(){
			reject(DispatcherShell.ERRORS['TIMEOUT']);
		}, ms);

		self.pubsub.subscribe(channel, function(msg){
			clearTimeout(timer);
			resolve(msg);
		});
	});
}


/*****************************************************************************
                       OTHER FUNCTIONS
******************************************************************************/

/**
 * Execute a script file. The commands must be in the syntax of this shell
 */
DispatcherShell.prototype.executeScript = function(scriptFile){
	var self = this;
	var lineReader;
	var commands = [];
	return new Promise(function(resolve){
		var stream = fs.createReadStream(scriptFile);
		stream.on('error', function(err){
			resolve('Problem reading the script file');
		});
		lineReader = readline.createInterface({
			input: stream
		});
		lineReader.on('line', function (line) {
			commands.push(line);
		});
		lineReader.on('close', function(){
			var promises = [];

			commands.forEach(function(cmd, line){
				// parse commands into tokens
				var tokens = cmd.split(' ');
				var action = tokens[0];
				var args = tokens.slice(1);

				if(action in DispatcherShell.COMMANDS){
					var res = DispatcherShell.COMMANDS[action].apply(self, args);
					promises.push(res);
				}
				else{
					resolve('Error with script: Unrecognized command found on line ' + (line+1));
				}
			});
			Promise.all(promises).then(function(res){
				resolve(res.join('\n'));
			});
		});

	});
}


/**
 * All available commands on the shell
 */
DispatcherShell.COMMANDS = {
	stop_app: function(arg1){
		if(arguments.length < 1){
			return DispatcherShell.ERRORS['ARGS'](['application id']);
		}
		return this.stopApplication(arg1);
	},
	run_app: function(arg1){
		if(arguments.length < 1){
			return DispatcherShell.ERRORS['ARGS'](['application JSON']);
		}
		return this.runApplication(arg1);
	},
	rm: function(arg1){
		if(arguments.length < 1){
			return DispatcherShell.ERRORS['ARGS'](['path']);
		}
		return this.delete(arg1);
	},
	mkdir: function(arg1){
		if(arguments.length < 1){
			return DispatcherShell.ERRORS['ARGS'](['directory']);
		}
		return this.makeDirectory(arg1);
	},
	touch: function(arg1, arg2){
		if(arguments.length < 1){
			return DispatcherShell.ERRORS['ARGS'](['file path', 'content path']);
		}
		return this.makeFile(arg1, arg2);
	},
	cat: function(arg1){
		if(arguments.length < 1){
			return DispatcherShell.ERRORS['ARGS'](['file path']);
		}
		return this.cat(arg1);
	},
	pwd: function(){
		return this.pwd();
	},
	ls: function(){
		return this.listFiles();
	},
	cd: function(arg1){
		if(arguments.length < 1){
			return DispatcherShell.ERRORS['ARGS'](['path']);
		}
		return this.changeDirectory(arg1);
	},
	migrate: function(arg1, arg2, arg3, arg4){
		if(arguments.length < 4){
			return DispatcherShell.ERRORS['ARGS'](['from', 'to', 'code name', 'instance id']);
		}
		return this.migrateCode(arg1, arg2, arg3, arg4);
	},
	devices: function(){
		return this.getDevices();
	},
	programs: function(){
		return this.getPrograms();
	},
	user_meta: function(arg1){
		if(arguments.length < 1){
			return DispatcherShell.ERRORS['ARGS'](['instance id']);
		}
		return this.programMeta(arg1);
	},
	presource: function(arg1, arg2){
		if(arguments.length < 2){
			return DispatcherShell.ERRORS['ARGS'](['code name', 'instance id']);
		}
		return this.getProgramResourceUsage(arg1, arg2);
	},
	resource: function(arg1){
		if(arguments.length < 1){
			return DispatcherShell.ERRORS['ARGS'](['engine id']);
		}
		return this.getResourceUsage(arg1);
	},
	script: function(arg1){
		if(arguments.length < 1){
			return DispatcherShell.ERRORS['ARGS'](['path to script']);
		}
		return this.executeScript(arg1);
	},
	run: function(arg1, arg2){
		if(arguments.length < 2){
			return DispatcherShell.ERRORS['ARGS'](['engine id', 'path of code to execute']);
		}
		return this.run(arg1, arg2);
	},
	pause: function(arg1, arg2, arg3){
		if(arguments.length < 3){
			return DispatcherShell.ERRORS['ARGS'](['engine id', 'code name', 'instance id']);	
		}
		return this.pause(arg1, arg2, arg3);
	},
	kill: function(arg1, arg2){
		if(arguments.length < 3){
			return DispatcherShell.ERRORS['ARGS'](['code name', 'instance id']);
		}
		return this.kill(arg1, arg2);
	},
	snapshot: function(arg1, arg2){
		if(arguments.length < 2){
			return DispatcherShell.ERRORS['ARGS'](['code name', 'instance id']);
		}
		return this.sendCodeCommand(arg1, arg2, 'snapshot');
	},
	instances: function(){
		return this.listInstances();
	},
	engines: function(){
		return this.listEngines();
	},
	exit: function(){
		process.exit();
	},
	cmds: function(){
		return Object.keys(DispatcherShell.COMMANDS).join('\n');
	},
	clear: function(){
		process.stdout.write('\033c');
	},
	// functions below are to test sequential execution
	one: function(){
		return new Promise(function(resolve){
			setTimeout(function(){
				resolve("LONG");
			}, 5000);
		});
	},
	two: function(){
		return new Promise(function(resolve){
			resolve("SHORT");
		});
	},
}

module.exports = DispatcherShell;