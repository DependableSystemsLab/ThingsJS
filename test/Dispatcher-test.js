// var assert = require('assert');
var assert = require('chai').assert;
const expect = require('chai').expect;
// const sinon  = require('sinon');
const should = require('chai').should();
var fs = require('fs');
const mosca = require('mosca');
const fork = require('child_process').fork;
var CodeEngine = require('../lib/core/CodeEngine.js');
var Dispatcher = require('../lib/core/Dispatcher.js');

var NUMINSTANCES = 3;
var dispatcher, engines, code_instance_id;

before('Prepare Code Engine instances', function(done){
	var promises = [];
	engines = [];
	for (var i=0; i<NUMINSTANCES; i++){
		promises.push(new Promise(function(resolve, reject){
			var engine = new CodeEngine({}, { mute_code_output: true });
			engines.push(engine);
			engine.on('ready', resolve);
		}));
	}
	Promise.all(promises)
		.then(function(){
			done();
		})
});

it('initializes', function(done){
	dispatcher = new Dispatcher();
	dispatcher.on('ready', function(){
		done();
	})
});

it('has a pubsub object', function(){
	expect(dispatcher.pubsub).to.be.an('object');
});

it('generates an id', function(){
	expect(dispatcher.id).to.be.a('string');
});

it('can see '+NUMINSTANCES+' engines', function(done){
	// this.timeout(200000);
	// console.log(dispatcher.engines);
	engines.forEach(function(engine){
		assert((engine.id in dispatcher.engines), 'Engine '+engine.id+' is visible');
	})
	done();
});

it(NUMINSTANCES+' engines in idle status', function(done){
	for (var id in dispatcher.engines){
		expect(dispatcher.engines[id].status).to.equal('idle');
	}
	done();
});

/**
 * run tests 
 * sequence:
 * (1) print state of nodes (all idle)
 * (2) begin running code on node 0 
 * (3) verify code is running
 * (4) verify state of nodes is updated
 */
describe('run tests', function(){

	// it('prints idle for ' + NUMINSTANCES + ' nodes', function(){
	// 	dispatcher.printEngines();
	// });

	it('begin running code on first node', function(done){
		// this.timeout(10000);
		dispatcher.runCode(engines[0].id, 'count.js', 'var c=0;setInterval(function(){ console.log(c++); }, 100)')
			.then(function(result){
				expect(result.id).to.be.a('string');
				code_instance_id = result.id;
				done();
			})

		/* wait 5s for program to run - at this point, counter value should have incremented 
		 * a few times
		 */
		// return new Promise(function(resolve){
		// 	setTimeout(function(){
		// 		self.dispatcher.printEngines();
		// 		resolve(self.checkLog(self.logs[0]));
		// 	}, 5000);
		// }).then(function(data){
		// 	// check the last log entry
		// 	expect(parseInt(data[data.length-1])).to.be.above(0);
		// });
	});

	it('first node is busy', function(done){
		expect(dispatcher.engines[engines[0].id].status).to.equal('busy');
		done();
	});

	it('process is visible to dispatcher', function(done){
		assert((code_instance_id in dispatcher.programs), 'code instance id is found in dispatcher.programs');
		done();
	});

	it('can receive console output', function(done){
		this.timeout(4000);
		setTimeout(function(){
			// console.log(dispatcher.programs[code_instance_id].console);
			assert(dispatcher.programs[code_instance_id].console.length > 0);
			done();
		}, 2000);
		// console.log(dispatcher.programs[code_instance_id].console);
		// expect(dispatcher.engines[engines[0].id].status).to.equal('busy');
		// done();
	});

	// it('receives updated status of the node', function(){
	// 	self.dispatcher.printEngines();
	// });

});

/**
 * migrate tests
 * sequence:
 * (1) migrate code from node 0 to node 1
 * (2) verify code is running on node 1
 * (3) verify no more code is running on node 0
 * (4) verify node 1 picks up from where node 0 left off
 * (5) verify state of nodes is updated
 */
describe('move tests', function(){

	it('code execution migrated from node 0 to node 1', function(done){
		// this.timeout(10000);
		// console.log(dispatcher.programs[code_instance_id].console);
		dispatcher.moveCode(engines[0].id, engines[1].id, 'count.js', code_instance_id)
			.then(function(result){
				expect(result.id).to.equal(code_instance_id);
				done();
			})

		// wait 5s for migration
		// return new Promise(function(resolve){
		// 	setTimeout(function(){
		// 		resolve(self.checkLog(self.logs[1]));
		// 	}, 5000);
		// }).then(function(data){
		// 	expect(parseInt(data[data.length-1])).to.be.above(0);
		// });
	});

	it('node 0 paused code execution', function(done){
		expect(dispatcher.engines[engines[0].id].status).to.equal('idle');
		done();

		// return new Promise(function(resolve){
		// 	resolve(self.checkLog(self.logs[0]));
		// }).then(function(data){
		// 	expect(parseInt(data[data.length-1])).to.be.NaN; 
		// });
	});

	it('node 1 is busy', function(done){
		expect(dispatcher.engines[engines[1].id].status).to.equal('busy');
		done();

		// return new Promise(function(resolve){
		// 	resolve(self.checkLog(self.logs[0]));
		// }).then(function(data){
		// 	expect(parseInt(data[data.length-1])).to.be.NaN; 
		// });
	});

	it('node 1 began where node 0 left off', function(done){
		this.timeout(4000);
		setTimeout(function(){
			var output = dispatcher.programs[code_instance_id].console.slice();
			output.reduce(function(acc, item){
				assert((item - acc === 1), 'count is consecutive');
				return item;
			}, -1);
			done();
			// done();
		}, 2000);
		// return new Promise(function(resolve){
		// 	var log0 = self.cleanLog(self.checkLog(self.logs[0]));
		// 	var log1 = self.cleanLog(self.checkLog(self.logs[1]));

		// 	// log1[1] should really be log1[0]
		// 	// todo: figure out what is happening
		// 	resolve([log0[log0.length-1], log1[1]]);

		// }).then(function(data){
		// 	expect(parseInt(data[0]) + 1).to.equal(parseInt(data[1]));
		// });
	});

	// it('receives updated status of the nodes', function(){
	// 	// self.dispatcher.printEngines();
	// });

});

describe('process control', function(){
	it('node 1 pauses code', function(done){
		dispatcher.pauseCode(code_instance_id)
			.then(function(result){
				// console.log(result);
				expect(result).to.equal('Paused');
				done();
			})
	});
	it('node 1 resumes code', function(done){
		dispatcher.resumeCode(code_instance_id)
			.then(function(result){
				console.log(result);
				expect(result).to.equal('Running');
				done();
			})
	});
	it('node 1 pauses again', function(done){
		dispatcher.pauseCode(code_instance_id)
			.then(function(result){
				// console.log(result);
				expect(result).to.equal('Paused');
				done();
			})
	});
});

after('Kill Code Engine instances', function(done){
	var promises = engines.map(function(engine){
		return engine.kill();
	});
	Promise.all(promises)
		.then(function(){
			done();
		})
});

/**
 * send command tests
 * sequence:
 * (1) send a restore command on node 0
 * (2) verify code begins execution again
 *
 * (3) send a pause command on node 1
 * (4) verify code halts execution
 * 
 * (5) send a restore command on node 1
 */
// describe('send command tests', function(){

// 	it('send a restore command to node 0', function(){
// 		this.timeout(10000);

// 		return new Promise(function(resolve){
// 			// check what the last value in the log was
// 			var log0 = self.cleanLog(self.checkLog(self.logs[0]));
// 			var lastEntry = log0[log0.length-1];

// 			self.dispatcher.sendCommand(self.nodes[0], 'resume_code', { code_name: 'count.js' });

// 			setTimeout(function(){
// 				log0 = self.cleanLog(self.checkLog(self.logs[0]));
// 				resolve([lastEntry, log0[log0.length-1]]);
// 			}, 5000);

// 		}).then(function(data){
// 			expect(parseInt(data[0])).to.be.below(parseInt(data[1]));
// 		});
// 	});

// 	it('send a pause command to node 1', function(){
// 		this.timeout(10000);

// 		return new Promise(function(resolve){
// 			self.dispatcher.sendCommand(self.nodes[1], 'pause_code', { code_name: 'count.js' });

// 			setTimeout(function(){
// 				var log1 = self.checkLog(self.logs[1]);
// 				resolve(log1[log1.length-1]);
// 			}, 5000);

// 		}).then(function(data){
// 			expect(parseInt(data)).to.be.NaN;
// 		});
// 	});

// 	it('send a restore command', function(){
// 		this.skip();
// 		this.timeout(10000);

// 		return new Promise(function(resolve){
// 			self.dispatcher.sendCommand(self.nodes[1], 'restore_code', { code_name: 'count.js '});
// 			resolve();

// 		}).then(function(){
// 			expect(true).to.equal(true);
// 		});
// 	});	

// });


// describe('Dispatcher Test', function(){
// 	var self = this;
// 	const NUMINSTANCES = 2;

// 	// if(!process.env.C0 || process.env.C1){
// 	// 	console.log('usage: env C0=<path to config1> C1=<path to config2> mocha --delay dispatcher_test.js');
// 	// }

// 	self.codeEngines = []; // forked instances 
// 	self.nodes   = []; // code engine names
// 	self.logs    = []; // code engine logs
// 	self.streams = {}; 

// 	/**
// 	 * reads a file and tokenizes the contents by each line
// 	 * @param {string} logName - name of the log file
// 	 */
// 	self.checkLog = function(logName){
// 		var contents = fs.readFileSync(logName, 'utf-8').trim();
// 		contents = contents.split('\n');
// 		return contents;
// 	}

// 	/**
// 	 * strips all non-number log output 
// 	 */
// 	self.cleanLog = function(logArray){
// 		var cleanLog = [];
// 		for(var i = 0; i < logArray.length; i++){
// 			if(!isNaN(logArray[i])){
// 				cleanLog.push(logArray[i]);
// 			}
// 		}
// 		return cleanLog;
// 	}

// 	before(function(){
// 		this.timeout(5000);

// 		return new Promise(function(resolve){

// 			// configure each code engine as a separate child process
// 			// for(var i = 0; i < NUMINSTANCES; i++){
// 			// 	self.codeEngines[i] = fork('./forkdispatcher.js',
// 			// 		{ detached: true, silent: true, cwd: process.cwd() });
// 			// }

// 			/** 
// 			 * initialize a code engine
// 			 * @param {integer} num - the ith code engine
// 			 */
// 			 // function initEngine(num){
// 			 // 	var config = things.CodeEngine.validateConfig(process.env['C' + num].toString());
// 			 // 	var options = { logging: 'thingsjs-logs', logInterval: 500 };

// 			 // 	self.nodes[num] = config.id;
// 			 // 	self.logs[num] = config.id + '.log';
// 			 // 	self.streams[num] = fs.createWriteStream(self.logs[num]);

// 			 // 	self.codeEngines[num].stdout.on('data', function(data){
// 			 // 		self.streams[num].write(data);
// 			 // 	});
// 			 // 	self.codeEngines[num].stderr.on('data', function(data){
// 			 // 		self.streams[num].write(data);
// 			 // 	});

// 			 // 	self.codeEngines[num].send({ cmd: 'init', args: { conf: config, options: options } });
// 			 // }

// 			self.server = mosca.Server({ port: 1883 });
// 			self.server.on('ready', function(){
// 				// initialize each code engine instance once the pubsub server is running
// 				// for(var i = 0; i < NUMINSTANCES; i++){
// 				// 	initEngine(i);
// 				// }
// 				self.dispatcher = new things.Dispatcher({ pubsub_url: 'mqtt://localhost' });

// 				setTimeout(function(){
// 					resolve();
// 				}, 3000);

// 			});

// 		});

// 	});

// 	/**
// 	 * startup tests
// 	 */
// 	describe('startup tests', function(){
// 		it('initializes a pubsub object', function(){
// 			expect(self.dispatcher.pubsub).to.be.an('object');
// 		});

// 		it('generates an id', function(){
// 			expect(self.dispatcher.id).to.be.a('string');
// 		});
// 	});

// 	/**
// 	 * run tests 
// 	 * sequence:
// 	 * (1) print state of nodes (all idle)
// 	 * (2) begin running code on node 0 
// 	 * (3) verify code is running
// 	 * (4) verify state of nodes is updated
// 	 */
// 	describe('run tests', function(){

// 		it('prints idle for ' + NUMINSTANCES + ' nodes', function(){
// 			self.dispatcher.printEngines();
// 		});

// 		it('begin running code on first node', function(){
// 			this.timeout(10000);
// 			self.dispatcher.runCode(self.nodes[0], '../code/count.js');

// 			/* wait 5s for program to run - at this point, counter value should have incremented 
// 			 * a few times
// 			 */
// 			return new Promise(function(resolve){
// 				setTimeout(function(){
// 					self.dispatcher.printEngines();
// 					resolve(self.checkLog(self.logs[0]));
// 				}, 5000);
// 			}).then(function(data){
// 				// check the last log entry
// 				expect(parseInt(data[data.length-1])).to.be.above(0);
// 			});
// 		});

// 		it('receives updated status of the node', function(){
// 			self.dispatcher.printEngines();
// 		});

// 	});

// 	/**
// 	 * migrate tests
// 	 * sequence:
// 	 * (1) migrate code from node 0 to node 1
// 	 * (2) verify code is running on node 1
// 	 * (3) verify no more code is running on node 0
// 	 * (4) verify node 1 picks up from where node 0 left off
// 	 * (5) verify state of nodes is updated
// 	 */
// 	describe('move tests', function(){

// 		it('code execution migrated from node 0 to node 1', function(){
// 			this.timeout(10000);
// 			self.dispatcher.moveCode(self.nodes[0], self.nodes[1], 'count.js');

// 			// wait 5s for migration
// 			return new Promise(function(resolve){
// 				setTimeout(function(){
// 					resolve(self.checkLog(self.logs[1]));
// 				}, 5000);
// 			}).then(function(data){
// 				expect(parseInt(data[data.length-1])).to.be.above(0);
// 			});
// 		});

// 		it('node 0 paused code execution', function(){
// 			return new Promise(function(resolve){
// 				resolve(self.checkLog(self.logs[0]));
// 			}).then(function(data){
// 				expect(parseInt(data[data.length-1])).to.be.NaN; 
// 			});
// 		});

// 		it('node 1 began where node 0 left off', function(){
// 			return new Promise(function(resolve){
// 				var log0 = self.cleanLog(self.checkLog(self.logs[0]));
// 				var log1 = self.cleanLog(self.checkLog(self.logs[1]));

// 				// log1[1] should really be log1[0]
// 				// todo: figure out what is happening
// 				resolve([log0[log0.length-1], log1[1]]);

// 			}).then(function(data){
// 				expect(parseInt(data[0]) + 1).to.equal(parseInt(data[1]));
// 			});
// 		});

// 		it('receives updated status of the nodes', function(){
// 			self.dispatcher.printEngines();
// 		});

// 	});

// 	/**
// 	 * send command tests
// 	 * sequence:
// 	 * (1) send a restore command on node 0
// 	 * (2) verify code begins execution again
// 	 *
// 	 * (3) send a pause command on node 1
// 	 * (4) verify code halts execution
// 	 * 
// 	 * (5) send a restore command on node 1
// 	 */
// 	describe('send command tests', function(){

// 		it('send a restore command to node 0', function(){
// 			this.timeout(10000);

// 			return new Promise(function(resolve){
// 				// check what the last value in the log was
// 				var log0 = self.cleanLog(self.checkLog(self.logs[0]));
// 				var lastEntry = log0[log0.length-1];

// 				self.dispatcher.sendCommand(self.nodes[0], 'resume_code', { code_name: 'count.js' });

// 				setTimeout(function(){
// 					log0 = self.cleanLog(self.checkLog(self.logs[0]));
// 					resolve([lastEntry, log0[log0.length-1]]);
// 				}, 5000);

// 			}).then(function(data){
// 				expect(parseInt(data[0])).to.be.below(parseInt(data[1]));
// 			});
// 		});

// 		it('send a pause command to node 1', function(){
// 			this.timeout(10000);

// 			return new Promise(function(resolve){
// 				self.dispatcher.sendCommand(self.nodes[1], 'pause_code', { code_name: 'count.js' });

// 				setTimeout(function(){
// 					var log1 = self.checkLog(self.logs[1]);
// 					resolve(log1[log1.length-1]);
// 				}, 5000);

// 			}).then(function(data){
// 				expect(parseInt(data)).to.be.NaN;
// 			});
// 		});

// 		it('send a restore command', function(){
// 			this.skip();
// 			this.timeout(10000);

// 			return new Promise(function(resolve){
// 				self.dispatcher.sendCommand(self.nodes[1], 'restore_code', { code_name: 'count.js '});
// 				resolve();

// 			}).then(function(){
// 				expect(true).to.equal(true);
// 			});
// 		});	

// 	});

// 	/** cleanup */
// 	after(function(){
// 		self.server.close();
// 		self.dispatcher.kill();
// 		// self.codeEngines.forEach(function(engine){
// 		// 	engine.send({ cmd: 'kill' });
// 		// });
// 	});

// });