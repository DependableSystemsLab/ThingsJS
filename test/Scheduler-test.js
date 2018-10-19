var assert = require('assert');
var things = require('../lib/things.js');
var helpers = require('../lib/helpers.js');
var expect = require('chai').expect;
var should = require('chai').should();
var fs = require('fs');
var mqtt = require('mqtt');
var mosca = require('mosca');
var sinon = require('sinon');

describe('API methods', function(){
	var self = this;
	self.SCHEDULING_INTERVAL = 10000;

	before(function(done){
		this.timeout(10000);
		self.pubsub = new things.Pubsub('mqtt://localhost');
		self.pubsub.on('ready', done);
	});

	describe('Tests for first-fit scheduling algorithm', function(){

		it('Base case: devices = [], tasks = [], mapping = {}', function(){
			expect(function(){
				var new_mapping = things.Scheduler.Algorithms['first_fit']([], [], {});				
			}).to.throw();
		});

		it('1 device, 0 tasks', function(){
			var devices = [{ id: 'pi0', available_memory: 150 }];
			var tasks = [];

			var new_mapping = things.Scheduler.Algorithms['first_fit'](devices, tasks, {});
			expect(Object.keys(new_mapping['pi0']['processes']).length).to.eql(0);
		})

		it('0 devices, 1 task', function(){
			var devices = [];
			var tasks = [{ id: 'A', required_memory: 100 }];
			expect(function(){
				var new_mapping = things.Scheduler.Algorithms['first_fit'](devices, tasks, {});
			}).to.throw();
		});

		it('1 device, 1 task with enough memory', function(){
			var devices = [{ id: 'pi0', available_memory: 150 }];
			var tasks = [{ id: 'A', required_memory: 100 }];

			var new_mapping = things.Scheduler.Algorithms['first_fit'](devices, tasks, {});
			expect(new_mapping['pi0']['processes']['A']).to.exist;
		});

		it('1 device, 1 task with not enough memory', function(){
			var devices = [{ id: 'pi0', avaible_memory: 0 }];
			var tasks = [{ id: 'A', required_memory: 1 }];

			expect(function(){
				things.Scheduler.Algorithms['first_fit'](devices, tasks, {});
			}).to.throw(Error);
		});

		it('1 device, 1 task with memory required_memory very close to available_memory', function(){
			var devices = [{ id: 'pi0', available_memory: 100 }];
			var tasks = [{ id: 'A', required_memory: 99.99 }];

			var new_mapping = things.Scheduler.Algorithms['first_fit'](devices, tasks, {});
			expect(new_mapping['pi0']['processes']['A']).to.exist;
		});

		it('1 device, 1 task with available_memory = required_memory', function(){
			var devices = [{ id: 'pi0', available_memory: 100 }];
			var tasks = [{ id: 'A', required_memory: 100 }];

			expect(function(){
				things.Scheduler.Algorithms['first_fit'](devices, tasks, {});
			}).to.throw(Error);
		});

		it('multi-device scheduling with 1 task', function(){
			var device_ids = ['pi0', 'pi1', 'pi2', 'pi3'];
			var devices = [];
			var available_memory = 2;
			var tasks = [{ id: 'A', required_memory: available_memory -1 }];

			device_ids.forEach(function(id){
				devices.push({ id: id, available_memory: available_memory });
				available_memory++;
			});

			var new_mapping = things.Scheduler.Algorithms['first_fit'](devices, tasks, {});
			expect(new_mapping['pi3']['processes']['A']).to.exist;

			device_ids.forEach(function(id){
				if(id === 'pi3'){ return; }
				expect(Object.keys(new_mapping[id]['processes']).length).to.eql(0);
			});
		});

		it('multi-device scheduling with 2 tasks allocated to 1 device', function(){
			var devices = [{ id: 'pi0', available_memory: 100 }, { id: 'pi1', available_memory: 10 }];
			var tasks = [{ id: 'A', required_memory: 50 }, { id: 'B', required_memory: 40 }];

			var new_mapping = things.Scheduler.Algorithms['first_fit'](devices, tasks, {});
			expect(Object.keys(new_mapping['pi0']['processes'])).to.include('A', 'B')
			expect(Object.keys(new_mapping['pi1']['processes']).length).to.eql(0);
		});

		it('multi-device scheduling with 1 task per device', function(){
			var devices = [{ id: 'pi0', available_memory: 10}, { id: 'pi1', available_memory: 15 }];
			var tasks = [{ id: 'A', required_memory: 10 }, { id: 'B', required_memory: 5}];

			var new_mapping = things.Scheduler.Algorithms['first_fit'](devices, tasks, {});
			expect(Object.keys(new_mapping['pi0']['processes'])).to.eql(['B']);
			expect(Object.keys(new_mapping['pi1']['processes'])).to.eql(['A']);
		});
	});

	describe('Tests for compute actions', function(){

		it('Base case: current mapping = {}, desired mapping = {}', function(){
			var actions = things.Scheduler.computeActions({}, {});
			expect(actions).to.eql([]);
		});

		it('run tasks', function(){
			var processes = ['A', 'B', 'C'];
			var tested_processes = [];
			var desired_mapping = { 'pi0': { processes: {} } };

			processes.forEach(function(id){
				desired_mapping['pi0']['processes'][id] = { code_name: id };
				tested_processes.push(id);
			});

			var actions = things.Scheduler.computeActions({}, desired_mapping);
			console.log(actions);

			var programs_to_run = actions.reduce(function(arr, act){
				expect(act.type).to.eql('run');
				arr.push(act.args[1]); // code_name is second arg
				return arr;
			}, []);

			expect(actions.length).to.eql(tested_processes.length);
			expect(programs_to_run).to.include.members(processes);
		});

		it('stop tasks', function(){
			var processes = ['A', 'B', 'C'];
			var tested_processes = [];
			var current_mapping = { 'pi0': { processes: {} } };
			var to_kill = [];

			processes.forEach(function(id){
				current_mapping['pi0']['processes'][id] = { code_name: id };
			});
			var desired_mapping = JSON.parse(JSON.stringify(current_mapping));

			processes.forEach(function(killId){
				to_kill.push(killId);
				delete desired_mapping['pi0']['processes'][killId];

				actions = things.Scheduler.computeActions(current_mapping, desired_mapping);

				var programs_to_kill = actions.reduce(function(arr, act){
					expect(act.type).to.eql('kill');
					arr.push(act.args[0]); // code_name is first arg
					return arr;
				}, []);

				expect(actions.length).to.eql(to_kill.length);
				expect(programs_to_kill).to.include.members(to_kill);
			});
		});

		it('migrate tasks', function(){
			var processes = ['A', 'B', 'C'];
			var current_mapping = { 'pi0': { processes: {} }, 'pi1': { processes: {} } };
			var to_migrate = [];

			processes.forEach(function(id){
				current_mapping['pi0']['processes'][id] = { code_name: id };			
			});
			var desired_mapping	= JSON.parse(JSON.stringify(current_mapping));

			processes.forEach(function(migrateId){
				to_migrate.push(migrateId);
				desired_mapping['pi1']['processes'][migrateId] = { code_name: migrateId };

				actions = things.Scheduler.computeActions(current_mapping, desired_mapping);

				var programs_to_migrate = actions.reduce(function(arr, act){
					expect(act.type).to.eql('migrate'); 
					arr.push(act.args[2]); // code_name is third arg
					return arr;
				}, []);

				expect(actions.length).to.eql(to_migrate.length);
				expect(programs_to_migrate).to.include.members(to_migrate);
			});
		});

		it('run, kill, and migrate tasks', function(){
			var running = ['A', 'B', 'C'];
			var to_kill = 'B';
			var to_migrate = 'C';
			var to_run = 'D';

			var current_mapping = { 'pi0': { processes: {} }, 'pi1': { processes: {} } };
			running.forEach(function(id){
				current_mapping['pi0']['processes'][id] = { code_name: id };
			});
			var desired_mapping = JSON.parse(JSON.stringify(current_mapping));

			desired_mapping['pi0']['processes'][to_run] = { code_name: to_run };
			delete desired_mapping['pi0']['processes'][to_kill];
			desired_mapping['pi1']['processes'][to_migrate] = current_mapping['pi0']['processes'][to_migrate];
			delete desired_mapping['pi0']['processes'][to_migrate];

			actions = things.Scheduler.computeActions(current_mapping, desired_mapping);

			actions.forEach(function(act){
				var args = act.args; 
				switch(act.type){
					case 'run':
						expect(args[0]).to.eql('pi0');
						expect(args[1]).to.eql(to_run);
						break;
					case 'kill':
						expect(args[0]).to.eql(to_kill);
						break;
					case 'migrate':
						expect(args[0]).to.eql('pi0');
						expect(args[1]).to.eql('pi1');
						expect(args[2]).to.eql(to_migrate);
						break;
					default:
						console.log('unexpected arg type: ' + act.type);
				}
			});
		});
	});

	describe('Initialization', function(){
		before(function(done){
			self.identity = 'TEST-SCHEDULER';
			self.scheduler = new things.Scheduler({ id: self.identity });
			self.scheduler.on('ready', done);
		});

		it('Has correct configurations', function(){
			expect(self.scheduler.id).to.eql(self.identity);
		});

		it('Boot event logged', function(){
			expect(self.scheduler.history.length).to.be.above(0);
			expect(self.scheduler.history[0].type).to.eql('scheduler-event');
			expect(self.scheduler.history[0].data).to.eql({ phase: 'boot' });
		});	

		it('Queue is empty', function(){
			expect(self.scheduler.queue).to.eql([]);
		});

	});

	describe('Process detection', function(){
		it('Ignore rogue processes', function(){
			this.timeout(10000);

			return new Promise(function(resolve){
				var pubsub = new things.Pubsub();
				var code = things.Code.fromString(pubsub, 'test-rogue', 'console.log(\"test\")\;');
				code.run({ silent: true }).then(function(instance){

					instance.on('finished', function(){
						setTimeout(code.kill, 1000);
						process.exit();
					});

					self.scheduler._assess().then(function(data){
						resolve(data);
					});
				});

			}).then(function(res){
				expect(res).to.exist;
			});
		});
	});

	describe('Correct view of the network', function(){
		var REPORT_INTERVAL = 2000;
		var id = 'THIS_ENGINE'

		it('Detects when an engine is dead', function(){
			this.timeout(15000);

			return new Promise(function(resolve){
				var eng = new things.CodeEngine({ id: id }, { mute_code_output: true });
				eng.on('ready', function(){
					setTimeout(function(){
						eng.kill();
						setTimeout(function(){
							self.scheduler._assess().then(function(data){
								resolve(data);
							});
						}, 2*REPORT_INTERVAL);
					}, REPORT_INTERVAL);
				});
			}).then(function(data){
				expect(data.engines.length).to.eql(0);
				expect(data.mapping).to.not.have.all.keys(id);
			});
		})
	});

	describe('Scheduler cmds', function(){
		var engine;
		var counter = "var count = 0\; setInterval(++count, 1000)";
		var actions = ['pause_application', 'resume_application', 'kill_application'];

		before(function(done){
			this.timeout(5000);
			engine = new things.CodeEngine({}, { mute_code_output: true });
			engine.on('ready', function(){
				/* make sure engine has enough time to report its existence to
				 * the scheduler
				 */
				setTimeout(done, 2000);
			});
		});

		function schedule(ctrl, kwargs){
			var reqId = helpers.randKey();

			var req = {
				ctrl: ctrl,
				kwargs: kwargs,
				request_id: reqId,
				reply_to: reqId,

			}
			self.pubsub.publish(self.identity + '/cmd', req);
			return reqId;
		}

		it('Schedule an application', function(){
			this.timeout(10000);
			var app = {
				components: {
					'comp0': { count: 1, source: counter, required_memory: 1 }
				}
			}
			return new Promise(function(resolve){
				var listen = schedule('run_application', app);
				self.pubsub.subscribe(listen, function(res){
					self.pubsub.unsubscribe(listen);
					resolve(res);
				})
			}).then(function(data){
				expect(data.payload.token).to.exist;
				self.token = data.payload.token;
			});
		});

		function makeAppRequest(action){
			it(action, function(){
				this.timeout(10000);

				if(!self.token){
					this.skip();
				}
				var req = {
					token: self.token
				}
				return new Promise(function(resolve){
					var listen = schedule(action, req);
					self.pubsub.subscribe(listen, function(res){
						self.pubsub.unsubscribe(listen);
						resolve(res);
					});
				}).then(function(data){
					expect(data.payload).to.exist;
				});
			});
		}

		actions.forEach(function(appCtrl){
			makeAppRequest(appCtrl);
		});

		after(function(){
			engine.kill();
		});

	});

	describe('Test scheduling an application', function(){

		var simple_function = 'console.log(\"Testing\")';

		function generate_app(app_conf){
			var request_token = Math.ceil(Math.random() * 100).toString();
			var app_request = {
				ctrl: 'run_application',
				kwargs: app_conf,
				reply_to: request_token,
				request_id: request_token
			}
			return app_request;
		}

		it('Schedule an application that should fail (no engines)', function(){
			this.timeout(20000);
			var callback = sinon.fake();
			var app = { components: { '1': { source: simple_function, count: 1 } } };
			var request = generate_app(app);
			self.pubsub.subscribe(request.reply_to, callback);

			return new Promise(function(resolve){
				self.pubsub.publish(self.identity + '/cmd', request);
				setTimeout(resolve, 2000);
			}).then(function(){
				expect(callback.called).to.eql(true);
			});
		})

		it('Schedule an empty application', function(){
			this.timeout(20000);
			var callback = sinon.fake();
			var engine;
			var app = { components: {} };
			var request = generate_app(app);
			self.pubsub.subscribe(request.reply_to, callback);

			return new Promise(function(resolve){
				engine = new things.CodeEngine({ id: 'TEST-EMPTY' }, { mute_code_output: true });
				engine.on('ready', function(){
					setTimeout(function(){
						self.pubsub.publish(self.identity + '/cmd', request);
						setTimeout(resolve, 2000);
					}, 2000);
				});
			}).then(function(){
				engine.kill();
				expect(callback.called).to.eql(true);
			});
		});


		it('Schedule an application that should succeed', function(){
			this.timeout(20000);
			var engine;
			var callback = sinon.fake();

			return new Promise(function(resolve){
				var app = {
					components: {
						'0': { source: simple_function, count: 1 }
					}
				};
				var request = generate_app(app);
				engine = new things.CodeEngine({}, { mute_code_output: true });
				engine.on('ready', function(){
					setTimeout(function(){
						self.pubsub.publish(self.identity + '/cmd', request);
						setTimeout(resolve, 5000);
					}, 2000);
				});
				self.pubsub.subscribe(request.reply_to, callback);

			}).then(function(){
				engine.kill();
				expect(callback.called).to.eql(true);
			});
		});

		it('Test migration', function(){
			this.skip();
			this.timeout(30000);

			var callback = sinon.fake();
			var engines = [];
			var dev_one = 'DEV1';
			var dev_two = 'DEV2';
			var app = { 
				components: { 
						'bar': { source: simple_function, count: 1 },
						'foo': { source: simple_function, count: 1 } 
					}
				};
			var request = generate_app(app);

			return new Promise(function(resolve){
				var init = function(){
					second_device = new things.CodeEngine({ id: dev_two }, { mute_code_output: true });
					engines.push(second_device);
					second_device.on('ready', function(){
						setTimeout(function(){
							self.scheduler._assess().then(function(data){
								resolve(data);
							});
						}, self.SCHEDULING_INTERVAL);
					});
				}

				first_device = new things.CodeEngine({ id: dev_one }, { mute_code_output: true });
				engines.push(first_device);
				self.pubsub.subscribe(request.reply_to, init);
				first_device.on('ready', function(){
					setTimeout(function(){
						self.pubsub.publish(self.identity + '/cmd', request);
					}, 2000);
				});

			}).then(function(res){
				expect(Object.keys(res.mapping[dev_one]['processes']).length).to.eql(1);
				expect(Object.keys(res.mapping[dev_two]['processes']).length).to.eql(1);
			});
		});

	});

	after(function(done){
		var p1 = self.scheduler.kill();
		var p2 = self.pubsub.kill();
		Promise.all([p1, p2]).then(function(){
			done();
		});
	});

});