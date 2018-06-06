var assert = require('assert');
var things = require('../../../lib/things.js');
var expect = require('chai').expect;
var should = require('chai').should();
var fs = require('fs');
var mosca = require('mosca');
var mqtt = require('mqtt');
const fork = require('child_process').fork;

describe('code engine test suite', function(){
	var self = this;
	var NUM_INSTANCES = 3; // number of code engine instances
	var ENGINE_REGISTRY_NAMESPACE = 'engine-registry';
	var CODE_SOURCE = './code/count.js';
	if(process.cwd().includes('V3')){
		CODE_SOURCE = '../code/count.js';
	}
	self.engines = [];

	/**
	 * send a message for a specific topic over pubsub
	 * @param {string} topic 
	 * @param {JSON} message 
	 */
	function sendCommand(topic, message){
		return new Promise(function(resolve){
			var sender = mqtt.connect('mqtt://localhost');
			sender.on('connect', function(){
				sender.publish(topic, JSON.stringify(message));
				sender.end();
				resolve();
			});
		});
	}

	/**
	 * catch messages from a specific pubsub topic
	 * @param {string} topic - topic of interest
	 * @param {integer} numReplies - number of expected messages to receive
	 *
	 */
	function getReplies(topic, numReplies){
		var replies = 0;
		var msgs = [];

		return new Promise(function(resolve, reject){
			var timer = setTimeout(function(){
				listener.end();
				reject();
			}, 5000);

			var listener = mqtt.connect('mqtt://localhost');
			listener.on('connect', function(){
				listener.subscribe(topic);
				listener.on('message', function(topic, message){
					msgs.push(JSON.parse(message));
					if(++replies === numReplies){
						clearTimeout(timer);
						listener.end();
						resolve(msgs);
					}
				});
			});
		});
	}


	/** test environment setup */
	before(function(){
		var promises = [];

		function ready(obj){
			return new Promise(function(resolve){
				obj.on('ready', function(){
					resolve();
				});
			});
		}

		return new Promise(function(resolve){
			self.server = mosca.Server({ port: 1883 });
			self.server.on('ready', function(){
				for(var i = 0; i < NUM_INSTANCES; i++){
					self.engines[i] = new things.CodeEngine();
					promises.push(ready(self.engines[i]));
				}
				Promise.all(promises).then(function(){
					console.log('====Setup complete====');
					resolve();
				})
			});
		});

	});

	describe('\n\n========Default setup tests (no config file)========', function(){

		it('fields have been initialized', function(){
			self.engines.forEach(function(engine){
				expect(engine.pubsub).to.exist;
				expect(engine.id).to.exist;
			});
		});
	});

	describe('\n\n========Pubsub tests========', function(){

		it('all existing engines reply to a broadcast command over pubsub', function(){
			this.timeout(10000);

			sendCommand(ENGINE_REGISTRY_NAMESPACE + '/bcast', { ctrl : 'report' });
			return getReplies(ENGINE_REGISTRY_NAMESPACE, NUM_INSTANCES)
				.then(function(reports){
					validIds = [];
					self.engines.forEach(function(engine){
						validIds.push(engine.id);
					});
					reports.forEach(function(report){
						expect(validIds).to.include(report.id);
					});
				});
		});

		it('reports its resources over pubsub', function(){
			this.timeout(3000);

			return getReplies(self.engines[0].id + '/resource', 1)
				.then(function(res){
					expect(res).to.exist;
					expect(res[0].timestamp).to.exist;
					expect(res[0].memory).to.exist;
					expect(res[0].cpu).to.exist;
				});
		});

	});

	describe('\n\n========Run tests========', function(){

		function runCode(engineNum, source, codeName){
			return new Promise(function(resolve){
				var code = fs.readFileSync(source, 'utf-8');
				self.engines[engineNum].run_code({ code_name: codeName, source: code })
					.then(function(data){
						resolve(data);
					});
			});
		}

		describe('===run error handling cases===', function(){

			it('run code that doesn\'t compile on engine 2', function(){
				var code = 'function(){ return \"missing bracket\"';
				return self.engines[2].run_code({ code_name: 'BAD_CODE', source: code });
			});

			it('engine 2 shouldn\'t break', function(){
				this.timeout(3000);

				return getReplies(self.engines[2].id + '/resource', 1)
					.then(function(res){
						expect(res).to.exist;
					});
			});

		});

		describe('===run code on engine 0===', function(){
			before(function(){
				this.timeout(10000);
				return new Promise(function(resolve){
					runCode(0, CODE_SOURCE, 'count.js')
						.then(function(data){
							self.code = data;
							resolve();
						});
				});
			});

			it('code has an instance id', function(){
				expect(self.code.id).to.exist;
			});
			it('code has a status', function(){
				expect(self.code.status).to.exist;
			});
			it('code has a pid', function(){
				expect(self.code.pid).to.exist;
			});

		});

		describe('===run the same code again on engine 0===', function(){
			before(function(){
				this.timeout(10000);
				return new Promise(function(resolve){
					runCode(0, CODE_SOURCE, 'count.js')
						.then(function(data){
							self.newCode = data;
							resolve();
						});
				});
			});

			it('code has a different instance id', function(){
				if(!self.code || !self.newCode){
					this.skip();
				}
				expect(self.newCode.id).to.exist;
				expect(self.newCode.id).to.not.equal(self.code.id);
			});
		});

	});

	describe('\n\n========Migrate tests========', function(){

		describe('===migrate error handling cases===', function(){

			it('pass invalid arguments (incorrect code name/instance id)', function(){
				return self.engines[0].migrate_code({ code_name: 'BAD_ID', instance_id: 'BAD_INSTANCE' });
			});

			// should original process still pause if migration unsuccessful??
		});

		describe('===migrate code from engine 0 to engine 1===', function(){

			it('migration is successful', function(){
				if(!self.code){
					this.skip();
				}
				this.timeout(10000);

				return self.engines[0].migrate_code({ engine: self.engines[1], code_name: 'count.js', instance_id: self.code.id })
					.then(function(data){
						expect(data.id).to.exist;
						self.migrateId = data.id;
						expect(data.id).to.not.equal(self.code.id);
					});
			});

			it('reports its change in resource correctly', function(){
				if(!self.migrateId){
					this.skip();
				}
				this.timeout(10000);

				return getReplies(self.engines[1] + '/resource', 1)
					.then(function(reply){
						expect(reply).to.exist;
						expect(reply[0].codes['count.js'][self.migratedId]).to.exist;
					});
			});

		});

		describe('===migrate code from engine 1 back to engine 0===', function(){

			it('migration is successful', function(){
				if(!self.migrateId){
					this.skip();
				}
				this.timeout(10000);

				return self.engines[1].migrate_code({ engine: self.engines[0], code_name: 'count.js', instance_id: self.migrateId })
					.then(function(res){
						expect(res).to.exist;
						expect(res.id).to.exist;
					});
			});

			it('engine 0 should have 3 count.js processes now', function(){
				if(!self.migrateId){
					this.skip();
				}
				expect(Object.keys(self.engines[0].codes['count.js'].processes).length).to.equal(3);
			});

		});

	});

	describe('========Kill tests========', function(){

		describe('===kill engine 0===', function(){
			before(function(){
				this.timeout(5000);

				self.pids = [];
				return new Promise(function(resolve){
					var procs = self.engines[0].codes['count.js'].processes;
					for(key in procs){
						if(!procs.hasOwnProperty(key)){
							continue;
						}
						self.pids.push(procs[key].obj.pid);
					}
					resolve();
				});
			});

			it('engine 0 changes its status (trivial)', function(){
				this.timeout(10000);

				return self.engines[0].kill().then(function(){
					expect(self.engines[0].status).to.equal('dead');
				});
			});

			it('all code attached to engine 0 is killed', function(){
				self.pids.forEach(function(pid){
					expect(process.kill.bind(process, pid, 0)).to.throw(Error);
				});
			});
		});

	});

	/** cleanup */
	after(function(){
		self.engines.forEach(function(engine){
			engine.kill();
		})
		self.server.close();
	});

});
