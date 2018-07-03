var repl = require('repl');
var readline = require('readline');
var fork = require('child_process').fork;
var fs = require('fs');
var Dispatcher = require('../lib/core/Dispatcher.js');
var Pubsub = require('../lib/core/Pubsub.js');

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

	console.log('=== Dispatcher Shell ===\n', 'For a list of commands, type \'cmds\'');

	function ready(obj){
		return new Promise(function(resolve){
			obj.on('ready', resolve);
		});
	}
	
	Promise.all([ready(self.pubsub), ready(self.dispatcher)]).then(function(){
		var shell = repl.start({
			prompt: '~ ',
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
		context.queue.pop();
	}
}

DispatcherShell.prototype.writer = function(output){
	if(typeof output === 'string'){
		return '\x1b[36m' + output + '\x1b[0m';
	}
	else{
		return '';
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

	TIMEOUT: 'Error: Timeout occured'
}

/*****************************************************************************
                FUNCTIONS RELATED TO CODE INSTANCES
******************************************************************************/

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
		if(arguments.length < 2){
			return DispatcherShell.ERRORS['ARGS'](['code name', 'instance id']);
		}
		return this.kill(arg1, arg2, 'kill');
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