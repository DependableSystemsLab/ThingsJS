var assert = require('assert');
var things = require('../../../lib/things.js');
var expect = require('chai').expect;
var should = require('chai').should();
var fs = require('fs');
var mosca = require('mosca');
var mqtt = require('mqtt');
const fork = require('child_process').fork;

/**
 * A framework for testing the basic functionalities of the code engine
 * based on its provided API 
 * 
 * Requirements
 * (1) A valid code engine config file
 *
 * usage: env C0=<path to file> C1=<path to file> mocha CodeEngine_basic.js
 */
describe('simple code engine test suite', function(){
	var self = this;
	var ENGINE_REGISTRY_NAMESPACE = 'engine-registry';
	const NUMFORKS = 2;

	if(!process.env.C0 || !process.env.C1 || !process.env.C2){
		console.log('usage: env C0=<path to config1> C1=<path to config1> C2=<path to config2> mocha CodeEngine_test.js');
		process.exit();
	}

	self.codeEngines = [];
	self.nodes = [];
	self.logs = [];
	self.streams = {};

	for(var i = 0; i < NUMFORKS; i++){
		self.codeEngines[i] = fork('./forkengine.js',
			{ detached: true, silent: true, cwd: process.cwd() });
	}

	/**
	 * helper function to read a log file from a code engine
	 * @param {string} logName - name of the log file
	 */
	function checkLog(logName){
		var contents = fs.readFileSync(logName, 'utf-8').trim();
		contents = contents.split('\n');
		return contents;
	}

	/**
	 * helper function to strip away console output that is not 
	 * code execution
	 */
	function cleanLog(logArray){
		var cleanLog = [];
		logArray.forEach(function(entry){
			if(!isNaN(entry)){
				cleanLog.push(entry);
			}
		});
		return cleanLog;
	}

	/**
	 * helper function to get all positive numbers in log
	 * @param {array} logArray - array of log entry strings
	 */
	 function posLog(logArray){
	 	var posLog = [];
	 	logArray.forEach(function(entry){
	 		if(!isNaN(entry) && parseInt(entry) >= 0){
	 			posLog.push(entry);
	 		}
	 	});
	 	return posLog;
	 }


	function checkStatus(status, nodeId){
		return new Promise(function(resolve){
			var listener = mqtt.connect('mqtt://localhost');
			listener.on('connect', function(){
				listener.subscribe('engine-registry');
				listener.on('message', function(topic, msg){
					msg = JSON.parse(msg);
					if(msg.id === nodeId){
						resolve(msg);
					}
					listener.end();
				});
			});

		}).then(function(data){
			expect(data.status).to.equal(status);
		});
	}

	/**
	 * initialize a code engine
	 * @param {integer} num - the ith code engine
	 */
	function initEngine(num){
		var config = things.CodeEngine.validateConfig(process.env['C' + num].toString());

		self.nodes[num] = config.id;
		self.logs[num] = config.id + '.log';
		self.streams[num] = fs.createWriteStream(self.logs[num]);

		self.codeEngines[num].stdout.on('data', function(data){
			self.streams[num].write(data);
		});
		self.codeEngines[num].stderr.on('data', function(data){
			self.streams[num].write(data);
		});
		self.codeEngines[num].send({ cmd: 'init', args: { conf: config } });
	}

	/** setup */
	before(function(){
		this.timeout(10000);

		return new Promise(function(resolve){
			self.server = mosca.Server({ port: 1883 });
			self.server.on('ready', function(){
				// initialize all the code engine forks 
				for(var i = 0; i < NUMFORKS; i++){
					initEngine(i);
				}
				// wait for pubsub objects to initialize
				setTimeout(function(){
					resolve();
				}, 5000);
			});
		});
	});

	describe('startup tests', function(){

		before(function(){
			this.timeout(5000);
			var config = things.CodeEngine.validateConfig(process.env['C2'].toString());
			self.startupEngine = new things.CodeEngine(config, { logging: 'thingsjs-logs', logInterval: 500 });
		});

		it('has an assigned id', function(){
			expect(self.startupEngine.id).to.be.a('string');
		});

		it('has an assigned pubsub object', function(){
			expect(self.startupEngine.pubsub).to.be.an('object');
		});

		it('runs code', function(){
			this.timeout(10000);

			return new Promise(function(resolve){
				self.startupEngine.run_code({ code_name: 'count.js', mode: 'file_system', source: '../code/count.js' });
				setTimeout(function(){
					resolve();
				}, 5000);
			});
		})


		after(function(){
			self.startupEngine.kill();
		});
	});

	/**
	 * tests the run API
	 * sequence:
	 * (1) run code on node 0
	 * (2) check the status of the node
	 * (3) verify code is running from console output
	 * (4) run code again on node 1
	 */
	describe('run tests', function(){
		
		function negLog(logArray){
			var negLog = [];
			logArray.forEach(function(entry){
				if(!isNaN(entry) && parseInt(entry) <= 0){
					negLog.push(entry);
				}
			});
			return negLog;
		}

		it('call run on node 0', function(){
			this.timeout(10000);

			var args = { mode: 'file_system', code_name: 'count.js', source: '../code/count.js'};
			self.codeEngines[0].send({ cmd: 'run', args: args });

			// wait a few seconds for the code to execute on the node
			return new Promise(function(resolve){
				setTimeout(function(){
					var log0 = checkLog(self.logs[0]);
					resolve(cleanLog(log0));
				}, 5000);

			}).then(function(data){
				expect(parseInt(data[data.length-1])).to.be.above(0);
			});
		});

		it('call run again on node 0', function(){
			this.timeout(10000);

			var args = { mode: 'file_system', code_name: 'negCount.js', source: '../code/negCount.js' };
			self.codeEngines[0].send({ cmd: 'run', args: args });

			return new Promise(function(resolve){
				setTimeout(function(){
					var log0 = checkLog(self.logs[0]);
					resolve(cleanLog(log0));
				}, 5000);
			}).then(function(data){
				var negVals = negLog(data);
				expect(parseInt(negVals[negVals.length-1])).to.be.below(0);
			});
		});

	});

	/**
	 * tests the pause API
	 * sequence:
	 * (1) pause code on node 0
	 * (2) verify code has stopped running
	 * (3) check status of the node
	 */
	 describe('pause tests', function(){

	 	function pauseCode(nodeNum, codeName){
	 		var args = { code_name: codeName };

	 		self.codeEngines[nodeNum].on('message', function(id){
	 			var pauseArgs = args;
	 			pauseArgs.instance_id = id;
	 			console.log('sending args: ' + pauseArgs.code_name);

	 			self.codeEngines[nodeNum].send( { cmd: 'pause', args: pauseArgs });
	 		});
	 		self.codeEngines[nodeNum].send( { cmd: 'instance_id', args: args });
	 	}

	 	it('pause code on node 0 for first code', function(){
	 		this.timeout(10000);
	 		pauseCode(0, 'count.js');

	 		return new Promise(function(resolve){
	 			var logs = [];

	 			setTimeout(function(){
	 				var log0 = checkLog(self.logs[0]);
	 				logs.push(posLog(log0));

	 				// check the log at a later time to confirm it isn't growing
	 				setTimeout(function(){
	 					var newLog0 = checkLog(self.logs[0]);
	 					logs.push(posLog(newLog0));
	 					resolve(logs);
	 				}, 1000);

	 			}, 3000);

	 		}).then(function(data){
	 			// size of both logs should be the same (paused code)
	 			expect(data[0].length).to.equal(data[1].length);
	 		});
	 	});

	 	it('pause code on node 0 for second code', function(){
	 		this.timeout(10000);
	 		pauseCode(0, 'negCount.js');

	 		return new Promise(function(resolve){
	 			setTimeout(function(){
	 				var log0 = checkLog(self.logs[0]);
	 				resolve(log0);
	 			}, 1000);
	 		}).then(function(data){
	 			// last entry should not be a number
	 			expect(parseInt(data[data.length-1])).to.be.NaN;
	 		});
	 	});

	 	it('status is idle now', function(){
	 		setTimeout(function(){
	 			self.codeEngines[0].send({ cmd: 'report_status' });
	 		}, 1000);
	 		return checkStatus('idle', self.nodes[0]);
	 	});

	 });

	 /**
	  * tests resume API
	  * sequence:
	  * (1) resume code 0 on node 0
	  * (2) verify code is running now
	  * (3) verify we resume where we left off
	  */
	  describe('resume tests', function(){

	 	function resumeCode(nodeNum, codeName){
	 		var args = { code_name: codeName };

	 		self.codeEngines[nodeNum].on('message', function(id){
	 			var fullArgs = args;
	 			fullArgs.instance_id = id;

	 			self.codeEngines[nodeNum].send( { cmd: 'resume', args: fullArgs });
	 		});
	 		self.codeEngines[nodeNum].send( { cmd: 'instance_id', args: args });
	 	}

	  	it('resume first code on node 0', function(){
		  	this.timeout(10000);
		  	// get the last positive entry in the log
		  	var oldLog = checkLog(self.logs[0]);
		  	oldLog = posLog(oldLog);

		  	resumeCode(0, 'count.js');

		  	return new Promise(function(resolve){
		  		setTimeout(function(){
		  			var newLog = checkLog(self.logs[0]);
		  			newLog = posLog(newLog);
		  			resolve([oldLog, newLog]);
		  		}, 3000);

		  	}).then(function(data){
		  		expect(data[0].length).to.be.below(data[1].length);
		  		// resume where we left off from last time
		  		expect(parseInt(data[0][data[0].length-1]) + 1).to.equal(parseInt(data[1][data[0].length]));
		  	});

	  	});

	  });

	 // /**
	 //  * tests the migration API
	 //  * sequence
	 //  * (3) migrate code from node 0 to node 1
	 //  * (4) verify state of node 0 is idle
	 //  * (5) verify state of node 1 is busy
	 //  * (6) kill node 0
	 //  * (7) verify that node 1 is still running
	 //  */
	 describe('migrate tests', function(){

	 	function migrateCode(nodeNum, migrateNodeNum, codeName){
	 		var args = { engine: self.nodes[migrateNodeNum], code_name: codeName };

	 		self.codeEngines[nodeNum].on('message', function(id){
	 			var fullArgs = args;
	 			fullArgs.instance_id = id;

	 			self.codeEngines[nodeNum].send( { cmd: 'pause', args: fullArgs });
	 		});
	 		self.codeEngines[nodeNum].send( { cmd: 'instance_id', args: { code_name: codeName } });
	 	}

	 	it('migrate code from node 0 to node 1', function(){
	 		this.timeout(10000);
	 		migrateCode(0, 1, 'count.js');

	 		return new Promise(function(resolve){
	 			// give some time for node 1 to begin code execution
	 			setTimeout(function(){
	 				var log0 = posLog(checkLog(self.logs[0]));
	 				var log1 = posLog(checkLog(self.logs[1]));

	 				resolve([log0, log1]);
	 			}, 6000);

	 		}).then(function(data){
	 			// node 1 should pick up where node 0 left off -- index 1 is because [0] was before pubsub conn
	 			expect(parseInt(data[0][data[0].length-1]) + 1).to.equal(parseInt(data[1][1]));
	 		});
	 	});

	 	it('node 1 is independent of node 0', function(){
	 		this.timeout(10000);

	 		var oldLog1 = posLog(checkLog(self.logs[1]));
	 		self.codeEngines[0].send({ cmd: 'kill' });
	 		self.codeEngines[0] = null;

	 		return new Promise(function(resolve){
	 			setTimeout(function(){
	 				var newLog1 = posLog(checkLog(self.logs[1]));
	 				resolve([oldLog1, newLog1]);
	 			}, 5000);

	 		}).then(function(data){
	 			expect(data[0].length).to.be.below(data[1].length);
	 		});

	 	});

	 	it('pause code on node 1', function(){
	 		this.skip();
	 		this.timeout(10000);

	 		var args = { code_name: 'count.js' };
	 		self.codeEngines[1].send({ cmd: 'pause', args: args });
	 		return new Promise(function(resolve){
	 			setTimeout(function(){
	 				resolve(checkLog(self.logs[1]));
	 			}, 1000);

	 		}).then(function(data){
	 			expect(parseInt(data[data.length-1])).to.be.NaN;
	 		});
	 	});

	 });

	 /** cleanup */
	 after(function(){
	 	self.codeEngines.forEach(function(engine){
	 		if(engine){
	 			engine.send({ cmd: 'kill' });
	 		}
	 	});
	 	for(file in self.streams){
	 		self.streams[file].close();
	 	}
	 	self.server.close();
	 });

});

/*

test notes:
(1) status is not updated for code engine
(2) wrong argument passed in (e.g. code_name) breaks engine


*/



