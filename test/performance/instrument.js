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
	'deltablue.js',
	// 'crypto.js',
	// 'box2d.js',
	// 'earley-boyer.js',
	// 'raytrace.js',
	// 'richards.js',
	// 'typescript.js',
	// 'factorial.js',
	// 'regulator.js'
]
var pubsub = { url: 'mqtt://localhost' }; // use a dummy pubsub, no need to connect

var result = {};

var NUM_RUNS = 200;
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

// Run the test
codes.forEach(function(code_name){
	console.log(chalk.green('Testing ')+code_name);
	result[code_name] = {
		times: [],
		mean: null,
		stdev: null,
		confidence: null
	}
	var raw = fs.readFileSync(path.join(__dirname, 'codes/'+code_name)).toString()

	for (var i=0; i < NUM_RUNS; i++){
		var measured = helpers.measureSync(things.Code.instrument, [pubsub, code_name, raw]);
		// console.log(measured.result);
		result[code_name].times.push(measured.elapsed);
	}
	var stats = analyze(result[code_name].times, 95);
	result[code_name].mean = stats.mean;
	result[code_name].stdev = stats.stdev;
	result[code_name].confidence = stats.confidence;
	console.log('   '+chalk.yellow(code_name)+' : '+stats.mean+' ± '+stats.confidence);
});

// Prepare output string
var output = [];
output.push( codes.map(function(code_name){ return result[code_name].mean }).join('\t') );
output.push( codes.map(function(code_name){ return result[code_name].confidence }).join('\t') );
output.push( codes.join('\t') );
for (var i=0; i < NUM_RUNS; i++){
	output.push( codes.map(function(code_name){ return result[code_name].times[i] }).join('\t') );
}
output = output.join('\n');

fs.writeFile(path.join(__dirname, 'result/instrument.'+testSession+'.csv'), output, function(err){
	if (err) throw err;
	console.log(chalk.green('--- DONE ---'));
})