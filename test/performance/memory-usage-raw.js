var fs = require('fs');
var path = require('path');
var chalk = require('chalk');
var child_process = require('child_process');
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

var NUM_RUNS = 10;
var CONFIDENCE_Z = {
	'80': 1.282,
	'85': 1.440,
	'90': 1.645,
	'95': 1.960,
	'99': 2.576,
	'99.5': 2.807,
	'99.9': 3.291
}
function analyze(vals, conf){
	var min = Infinity, max = -Infinity;
	var mean = vals.reduce(function(acc, item){ 
		if (item < min) min = item;
		if (item > max) max = item;
		return item + acc
	}, 0) / vals.length;
	var stdev = Math.sqrt( vals.reduce(function(acc, item){ return acc + Math.pow(item - mean, 2) }, 0) / vals.length );
	var confidence = CONFIDENCE_Z[conf] * stdev / Math.sqrt(vals.length);
	// console.log(mean, stdev, confidence);
	return {
		min: min,
		max: max,
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
		var mems = [];

		// var started = Date.now();
		var spawned = child_process.fork(code);
			spawned.on('message', function(payload){
				mems.push(payload.memory.heapUsed);
				console.log(chalk.yellow('Memory : ')+payload.memory.heapUsed)
			});
		var timer = setInterval(function(){
			if (spawned.connected) spawned.send({ ctrl: 'get-stats' });
		}, 250);
		// spawned.stdout.pipe(process.stdout);
		spawned.on('exit', function(){
			clearInterval(timer);
			console.log(chalk.red('Exited'));
			resolve([ analyze(mems, 95) ]);
		})
	}).then(function(result){
		console.log(chalk.yellow('Memory : ')+result[0].mean)
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
		memory: [],
		mean: null,
		stdev: null,
		confidence: null
	}
	var code = path.join(__dirname, 'codes/'+code_name);

	return serialExecute(code, NUM_RUNS)
		.then(function(results){
			result[code_name].memory = results.map(function(item){ return item.mean });
			var stats = analyze(result[code_name].memory, 95);
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
		output.push( codes.map(function(code_name){ return result[code_name].memory[i] }).join('\t') );
	}
	output = output.join('\n');

	fs.writeFile(path.join(__dirname, 'result/memory-usage-raw.'+testSession+'.csv'), output, function(err){
		if (err) throw err;
		console.log(chalk.green('--- DONE ---'));
	})
})