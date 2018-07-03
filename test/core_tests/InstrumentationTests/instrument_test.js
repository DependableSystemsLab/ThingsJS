var things = require('../../../lib/things.js');
var expect = require('chai').expect;
var should = require('chai').should();
var assert = require('chai').assert;
var fs = require('fs');
var mosca = require('mosca');
const spawn = require('child_process').spawn;


describe('instrumentation test suite', function(){
	var self = this;

	if(!process.env.KEY){
		console.log('usage: env KEY=<folder path> mocha instrument_test.js');
		process.exit();
	}

	function getOutput(file){
		var output = '';
		var rawExec = spawn('node', [file], { cwd: process.cwd() });
		rawExec.stdout.on('data', function(data){
			output += data;
		});
		return new Promise(function(resolve, reject){
			rawExec.on('exit', function(){
				resolve(output);
			});

			rawExec.stderr.on('data', function(data){
				reject(data);
			});
		});
	}

	function runInst(file){
		var tempFile = file + '.temp.inst';
		var output = '';

		var instCode = things.Code.fromFile({ url: 'mqtt://localhost' }, file);
		return new Promise(function(resolve){
			instCode.save(tempFile).then(function(){
				getOutput(tempFile).then(function(data){
					resolve(data);
				});
			});
		});
	}

	function compareOutput(regOutput, instOutput){
		// remove pubsub output
		var inst = instOutput.trim();
		inst = inst.substring(inst.indexOf('\n') + 1);
		var reg = regOutput.trim();

		expect(inst).to.equal(reg);
	}

	before(function(){
		self.testfolder = process.env.KEY;
		if(self.testfolder.charAt(self.testfolder.length-1) !== '/'){
			self.testfolder += '/';
		}
	});


	describe('===Begin instrumentation tests===', function(){
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

				var filePath = self.testfolder + filename;
				return new Promise(function(resolve, reject){
					var regPromise = getOutput(filePath);
					var instPromise = runInst(filePath);

					Promise.all([regPromise, instPromise]).then(function(vals){
						resolve(vals);
					});
				}).then(function(data){
					compareOutput(data[0], data[1]);
				});

			});
		}

		var files = fs.readdirSync(process.env.KEY);
		for(var i = 0; i < files.length; i++){
			if(files[i] == 'node_modules' || files[i] == 'package-lock.json'){
				continue;
			}
			runTest(files[i]);
		}

		after(function(){
			self.server.close();
		});

	});

});
