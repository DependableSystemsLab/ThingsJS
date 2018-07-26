var fs = require('fs');
var path = require('path');
var spawn = require('child_process').spawn;
var expect = require('chai').expect;
var things = require('../lib/things.js');

/** Run a JS file and return the stdout */
function runRawCode(file_path){
	return new Promise(function(resolve, reject){
		var raw_output = '';
		var raw_process = spawn('node', [ file_path ]);
		raw_process.stdout.on('data', function(line){
			raw_output += line;
		});
		raw_process.on('exit', function(){
			resolve(raw_output);
		});
	})
}

/** Instrument and run a JS file and return the stdout */
function runCode(file_path){
	return new Promise(function(resolve, reject){
		var pubsub = new things.Pubsub('mqtt://localhost');
		var inst_output = '';
		var code = things.Code.fromFile(pubsub, file_path);
		code.run({
			onStdout: function(line){
				inst_output += line;
			}
		}).then(function(proc){
			proc.on('finished', function(event){
				resolve(inst_output);
				pubsub.kill();
	  		});
		});
	})
}

/** Testing if raw program's output is equal to the instrumented program's output */
describe('Program output equivalence test', function(){
	var input_dir = path.resolve(__dirname, './inputs/');
	var inputs = fs.readdirSync(input_dir);
	inputs.forEach(function(filename){
		it(filename, function(done){
			var file_path = path.join(input_dir, filename);

			Promise.all([runRawCode(file_path), runCode(file_path)])
				.then(function(results){
					expect(results[0]).to.equal(results[1]);
					done();
				});
		});
	});

});