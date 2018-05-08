var expect = require('chai').expect;
var should = require('chai').should();
var assert = require('chai').assert;
var fs = require('fs');
var mosca = require('mosca');
const spawn = require('child_process').spawn;


/* A framework for testing instrumentation
 * usage: env KEY=<folder with tests> mocha --delay instrument_basic.js
 *
 */
describe('instrumentation test suite', function(){
	var self = this;

	if(!process.env.KEY){
		console.log('usage: env KEY=<folder with test files> mocha instrument_basic.js');
		process.exit();
	}

	before(function(){
		self.testfolder = process.env.KEY;
		if(self.testfolder.charAt(self.testfolder.length-1) !== '/'){
			self.testfolder += '/';
		}
		self.files = fs.readdirSync(process.env.KEY);
	});

	/**
	 * this object is used to compare the logs of instrumented vs normal code
	 * @todo fix how the output is cleaned
	 */
	function TestInst(regLog, instLog){
		// retrieve output of the logs
		var regOutput = fs.readFileSync(regLog, 'utf-8');
		var instOutput = fs.readFileSync(instLog, 'utf-8');

		regOutput = regOutput.replace(/\n| /g, '');

		// hacky method of removing pubsub output
		instOutput = instOutput.split('\n').splice(2, instOutput.length-1);
		instOutput = instOutput.join('').replace(/\n| /g, '');

		this.reg = regOutput
		this.inst = instOutput
	}

	/**
	 * this method compares the output of the instrumented code
	 * and the regular code line-by-line
	 */
	TestInst.prototype.compare = function(){
		expect(this.reg).to.equal(this.inst);
	}	

	describe('Begin instrumentation tests', function(){

		before(function(){
			self.server = new mosca.Server({port: 1883});
			return new Promise(function(resolve){
				self.server.on('ready', function(){
					resolve();
				});
			});
		});

		function runTest(filename){
			it(filename, function(){
				this.timeout(16000);
				var file = self.testfolder + filename;
				var regLog = filename + '.regular.log';
				var instLog = filename + '.inst.log';
				var child = spawn('sh', ['testinstrument.sh', file, regLog, instLog], {cwd: process.cwd()});

				return new Promise(function(resolve, reject){
					setTimeout(function(){
						test = new TestInst(regLog, instLog);
						resolve(test);
					}, 14000);
				}).then(function(data){
					data.compare();
				});
			});	
		}

		for(var i = 0; i < self.files.length; i++){
			if(self.files[i] == 'node_modules' || self.files[i] == 'package-lock.json'){
				continue;
			}
			runTest(self.files[i]);
		} 

		after(function(){
			self.server.close();
		});

	});

});
