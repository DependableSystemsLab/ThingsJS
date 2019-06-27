var fs = require('fs');
var path = require('path');
var child_process = require('child_process');
// var jsBeautify = require('js-beautify').js_beautify;
var chalk = require('chalk');
var things = require('../../lib/things.js');
var helpers = require('../../lib/helpers.js');

if ((process.argv.length < 3) || (process.argv.length < 4)) {
    console.log("You must specify the number of samples and test session name:");
    console.log('  e.g.:    node '+path.basename(__filename)+' 100 test1');
    process.exit(1);
}
var NUM_RUNS = parseInt(process.argv[2]);
var SESSION = process.argv[3];
var BASE_DIR = path.resolve(__dirname, './input');
var RESULT_DIR = path.resolve(__dirname, './output');
var CODES = [
	// 'navier-stokes',
	// 'splay',
	// 'factorial',
	'richards',
	// 'raytrace'
]

var result = {};

function serialExecute(code_name, count){
	if (count === 0) return Promise.resolve([]);
	
	return new Promise(function(resolve, reject){
		var code = path.join(BASE_DIR, code_name+'.inst.js');

		var spawned = child_process.fork(code);
			spawned.on('message', function(message){
				// console.log(message);
				if (message.snapshot){
					spawned.kill();
					if (count === NUM_RUNS){
						var snapshot = JSON.stringify(message.snapshot);
						result[code_name].size = Buffer.from(snapshot).length;
						console.log('Snapshot size: '+result[code_name].size);

						var snap_path = path.join(BASE_DIR, code_name+'.snap.json');
						// fs.writeFile(snap_path, jsBeautify(snapshot), function(err){
						fs.writeFile(snap_path, snapshot, function(err){
							if (err) reject(false);
							else {
								resolve([ message.time_taken ]);
							}
						});
					}
					else {
						resolve([ message.time_taken ]);
					}
				}
			});

		spawned.on('exit', function(exit_code, signal){
			console.log(chalk.red('Exited ')+exit_code+' | signal = '+signal);
		})
	}).then(function(result){
		console.log(chalk.yellow('Time : ')+result[0])
		return serialExecute(code_name, count - 1 )
				.then(function(next_result){
					return result.concat(next_result);
				});
	})
}


function runTest(codes){
	if (codes.length === 0) return Promise.resolve(true);
	var code_name = codes[0];
	console.log('\n'+chalk.green('Testing ')+code_name);
	result[code_name] = {
		times: [],
		mean: null,
		stdev: null,
		confidence: null
	}
	// var code = path.join(BASE_DIR, code_name+'.inst.js');

	return serialExecute(code_name, NUM_RUNS)
		.then(function(results){
			result[code_name].times = results;
			var stats = helpers.analyzeArray(result[code_name].times, 95);
			result[code_name].mean = stats.mean;
			result[code_name].stdev = stats.stdev;
			result[code_name].confidence = stats.confidence;
			console.log('   '+chalk.yellow(code_name)+' : '+stats.mean+' ± '+stats.confidence);

			return runTest(codes.slice(1));
		})	
}

// Run the test
runTest(CODES)
.then(function(){
	var output = [];
	output.push( 'Code\t'+ CODES.join('\t') );
	output.push( 'Mean\t'+ CODES.map(function(code_name){ return result[code_name].mean }).join('\t') );
	output.push( 'Confidence Interval\t'+ CODES.map(function(code_name){ return result[code_name].confidence }).join('\t') );
	output.push( 'Snapshot Size\t'+ CODES.map(function(code_name){ return result[code_name].size }).join('\t') );
	
	output.push( '\t' );
	output.push( 'Runs\t'+ CODES.join('\t') );
	for (var i=0; i < NUM_RUNS; i++){
		output.push( (1+i)+'\t'+ CODES.map(function(code_name){ return result[code_name].times[i] }).join('\t') );
	}
	output = output.join('\n');

	fs.writeFile(path.join(RESULT_DIR, 'snapshot.'+SESSION+'.csv'), output, function(err){
		if (err) throw err;
		console.log(chalk.green('--- DONE ---'));
	})
})
.catch(function(err){
	console.log(err);
})