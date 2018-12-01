var fs = require('fs');
var path = require('path');
var spawn = require('child_process').spawn;
var expect = require('chai').expect;
// var things = require('../lib/things.js');
var Pubsub = require('../lib/core/Pubsub.js');
var Code = require('../lib/core/Code.js');

/* Helper functions */

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
		var pubsub = new Pubsub('mqtt://localhost');
		var inst_output = '';
		var code = Code.fromFile(pubsub, file_path);
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

/* End of Helper functions */

/* Test suites */
describe('API methods', function(){
	var server, pubsub, code, instance;

	// Setup a Pubsub instance
	before(function(done){
		pubsub = new Pubsub('mqtt://localhost');
		pubsub.on('ready', done);
	});

	// Tests
	it('Initialize Code instance', function(done){
		code = Code.fromString(pubsub, 'count.js', 'var c=0;setInterval(function(){ console.log(c++); }, 100)');
		expect(code.name).to.equal('count.js');
		done();
	});
	it('run', function(done){
		code.run({ silent: true }).then(function(proc){
			instance = proc;
			done();
		});
	});
	it('pause', function(done){
		this.timeout(5000);
		setTimeout(function(){
			instance.pause()
			.then(function(){
				done();
			});
		}, 2000)
	});
	it('snapshot', function(done){
		instance.snapshot()
		.then(function(snapshot){
			expect(snapshot).to.be.an('object');
			done();
		});
	});
	it('resume', function(done){
		instance.resume()
		.then(function(){
			done();
		});
	});
	it('pause again', function(done){
		this.timeout(5000);
		setTimeout(function(){
			instance.pause()
			.then(function(){
				done();
			});
		}, 2000)
	});
	it('resume again', function(done){
		instance.resume()
		.then(function(){
			done();
		});
	});
	it('kill', function(done){
		this.timeout(5000);
		setTimeout(function(){
			instance.kill()
			.then(function(){
				done();
			});
		}, 2000)
	});

	// Kill the Pubsub instance
	after(function(done){
	 	pubsub.kill().then(function(){
	 		done();
	 	});
	});

});

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