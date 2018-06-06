var things = require('../../../lib/things.js');
var assert = require('assert');
const expect = require('chai').expect;
const sinon  = require('sinon');
const should = require('chai').should();
var fs = require('fs');
const mosca = require('mosca');
const fork = require('child_process').fork;

describe('dispatcher test suite', function(){
	var self = this;
	var CODE_SOURCE = './count.js';
	if(process.cwd().includes('V3')){
		CODE_SOURCE = '../count.js';
	}
	this.instances = 4;
	this.codeEngines = [];

	function runCode(dispatcher, id, codeName, source){
		var rawCode = fs.readFileSync(source, 'utf-8');
		return new Promise(function(resolve){
			dispatcher.runCode(id, codeName, rawCode)
				.then(function(data){
					resolve(data);
				});
		});
	}

	/** setup */
	before(function(){
		this.timeout(5000);

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
				var promises = [];

				self.dispatcher = new things.Dispatcher();
				promises.push(ready(self.dispatcher));

				for(var i = 0; i < self.instances; i++){
					self.codeEngines[i] = new things.CodeEngine();
					promises.push(ready(self.codeEngines[i]));
				}

				Promise.all(promises).then(function(){
					console.log("===Setup complete===");
					resolve();
				});
			});
		});

	});

	describe('\n\n========Kill tests========', function(){

		it('run code on engine 3', function(){
			this.timeout(10000);
			return runCode(self.dispatcher, self.codeEngines[3].id, 'count.js', CODE_SOURCE)
				.then(function(result){
					expect(result.id).to.exist;
				});
		});

		it('run the same code again on engine 2', function(){
			this.timeout(10000);
			return runCode(self.dispatcher, self.codeEngines[3].id, 'count.js', CODE_SOURCE)
				.then(function(result){
					expect(result.id).to.exist;
				});
		});

		it('kill engine 2', function(){
			this.timeout(15000);
			return new Promise(function(resolve){
				self.codeEngines[3].kill().then(function(){
					self.codeEngines.pop();
					// wait a few seconds for the programs to update
					setTimeout(function(){
						resolve();
					}, 5000);
				});

			}).then(function(){
				Object.values(self.dispatcher.programs).forEach(function(program){
					expect(program.status).to.equal('Exited');
				});
			});
		});

	});

	describe('\n\n========Run tests========', function(){

		it('run code on engine 0', function(){
			this.timeout(10000);

			return runCode(self.dispatcher, self.codeEngines[0].id, 'count.js', CODE_SOURCE)
				.then(function(result){
					expect(result.id).to.exist;
					self.currentId = result.id;
				});
		});

		it('dispatcher is notified of the program over pubsub', function(){
			if(!self.currentId){
				this.skip();
			}

			expect(self.dispatcher.programs[self.currentId]).to.exist;
			expect(self.dispatcher.programs[self.currentId].status).to.equal('Running');

		});

		it('engine 0 has a reference to the code instance', function(){
			if(!self.currentId){
				this.skip();
			}
			expect(self.codeEngines[0].codes['count.js']).to.exist;
			expect(self.codeEngines[0].codes['count.js'].processes[self.currentId]).to.exist;
		});

	});

	describe('\n\n========Migrate tests========', function(){

		it('migrate code on engine 0 to engine 1', function(){
			this.timeout(10000);
			if(!self.currentId){
				this.skip();
			}

			return new Promise(function(resolve){
				self.dispatcher.moveCode(self.codeEngines[0].id, self.codeEngines[1].id, 'count.js', self.currentId)
					.then(function(data){
						resolve(data);
					});
			}).then(function(result){
				expect(result.id).to.exist;
				self.currentId = result.id;
			});
		});

		it('dispatcher received notice of new program over pubsub', function(){
			this.timeout(10000);
			if(!self.currentId){
				self.skip();
			}

			return new Promise(function(resolve){
				setTimeout(function(){
					resolve(self.dispatcher.programs[self.currentId]);
				}, 1000);
			}).then(function(data){
				expect(data).to.exist;
			});
		});

	});

	describe('\n\n========Spawn tests========', function(){
		it('spawn code from engine 1 to engine 0', function(){
			this.timeout(10000);

			return new Promise(function(resolve){
				self.dispatcher.spawnCode(self.codeEngines[1].id, [self.codeEngines[0].id, 
					self.codeEngines[2].id], 'count.js', self.currentId)
					.then(function(results){
						resolve(results);
					});

			}).then(function(data){
				expect(data[0].id).to.exist;
				expect(data[1].id).to.exist;
			});
		});
	});

	after(function(){
		console.log('\n\n====Tests finished. Cleanup starting====\n\n')
		self.server.close();
		self.dispatcher.kill();
		self.codeEngines.forEach(function(engine){
			engine.kill();
		});
	});

});

