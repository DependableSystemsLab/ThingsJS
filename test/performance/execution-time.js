var fs = require('fs');
var path = require('path');
var chalk = require('chalk');
var things = require('../../lib/things.js');
var helpers = require('../../lib/helpers.js');

if (process.argv.length < 3) {
    console.log("You must specify test session name >> e.g. t_1");
    process.exit(1);
}
var testSession = process.argv[2];

var codes = [
	'navier-stokes.js',
	'splay.js',
	'factorial.js',
]
var pubsub = { url: 'mqtt://localhost' }; // use a dummy pubsub, no need to connect

var NUM_RUNS = 100;
var CONFIDENCE_Z = {
	'80': 1.282,
	'85': 1.440,
	'90': 1.645,
	'95': 1.960,
	'99': 2.576,
	'99.5': 2.807,
	'99.9': 3.291
}
function analyze(times, conf){
	var mean = times.reduce(function(acc, item){ return item + acc }, 0) / times.length;
	var stdev = Math.sqrt( times.reduce(function(acc, item){ return acc + Math.pow(item - mean, 2) }, 0) / times.length );
	var confidence = CONFIDENCE_Z[conf] * stdev / Math.sqrt(times.length);
	// console.log(mean, stdev, confidence);
	return {
		mean: mean,
		stdev: stdev,
		confidence: confidence
	}
}

var result = {};
function serialExecute(code, count){
	if (count === 0) return Promise.resolve([]);
	
	return new Promise(function(resolve, reject){
		// var started, ended, result;
		code.once('run-finished', function(meta){
			resolve([ meta.elapsed ]);
			// ended = Date.now();
			// result = [ (ended - started) ];
			// result = ;
			
		});
		// started = Date.now();
		code.run();
	}).then(function(result){
		return serialExecute(code, count - 1 )
				.then(function(next_result){
					return result.concat(next_result);
					// resolve([ meta.elapsed ].concat(next_result));
				});
	})
}

function runTest(codes){
	if (codes.length === 0) return Promise.resolve(true);

	var code_name = codes[0];
	console.log(chalk.green('Testing ')+code_name);
	result[code_name] = {
		times: [],
		mean: null,
		stdev: null,
		confidence: null
	}
	var code = things.Code.fromFile(pubsub, path.join(__dirname, 'codes/'+code_name));

	return serialExecute(code, NUM_RUNS)
		.then(function(results){
			result[code_name].times = results;
			var stats = analyze(result[code_name].times, 95);
			result[code_name].mean = stats.mean;
			result[code_name].stdev = stats.stdev;
			result[code_name].confidence = stats.confidence;
			console.log('   '+chalk.yellow(code_name)+' : '+stats.mean+' ± '+stats.confidence);

			return runTest(codes.slice(1));
		})	
}

// Run the test
runTest(codes)
.then(function(){
	// Prepare output string
	var output = [];
	output.push( codes.map(function(code_name){ return result[code_name].mean }).join('\t') );
	output.push( codes.map(function(code_name){ return result[code_name].confidence }).join('\t') );
	output.push( codes.join('\t') );
	for (var i=0; i < NUM_RUNS; i++){
		output.push( codes.map(function(code_name){ return result[code_name].times[i] }).join('\t') );
	}
	output = output.join('\n');

	fs.writeFile(path.join(__dirname, 'result/execution-time.'+testSession+'.csv'), output, function(err){
		if (err) throw err;
		console.log(chalk.green('--- DONE ---'));
	})
})