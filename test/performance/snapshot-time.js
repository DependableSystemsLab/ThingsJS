var fs = require('fs');
var path = require('path');
var chalk = require('chalk');
var child_process = require('child_process');
var jsBeautify = require('js-beautify').js_beautify;
var helpers = require('../../lib/helpers.js');

if (process.argv.length < 3) {
    console.log("You must specify test session name >> e.g. t_1");
    process.exit(1);
}
var testSession = process.argv[2];
var pubsub = { url: 'mqtt://localhost' }; // use a dummy pubsub, no need to connect

var codes = [
	// 'navier-stokes.js.things.js',
	'splay.js.things.js',
	'factorial.js.things.js',
];
var NUM_RUNS = 1;

var result = {};
function serialExecute(code, count){
	if (count === 0) return Promise.resolve([]);
	
	return new Promise(function(resolve, reject){

		var spawned = child_process.fork(code);
			spawned.on('message', function(message){
				// console.log(message);
				if (message.ctrl === 'ready'){
					spawned.send({ ctrl: 'SNAPSHOT', request: helpers.randKey(), kwargs: {} });
				}
				else if (message.payload){
					spawned.kill()
					if (count === 1){
						fs.writeFile(code+'.snap.json', jsBeautify(JSON.stringify(message.payload.snapshot)), function(err){
							if (err) reject(false);
							else {
								resolve([ message.payload.time_taken ]);
							}
						})
					}
					else {
						resolve([ message.payload.time_taken ]);
					}
				}
			});
		// spawned.stdout.pipe(process.stdout);
		spawned.on('exit', function(){
			console.log(chalk.red('Exited'));
		})
	}).then(function(result){
		// console.log(chalk.yellow('Time : ')+result[0].mean)
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
	var code = path.join(__dirname, 'codes/'+code_name);

	return serialExecute(code, NUM_RUNS)
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

	fs.writeFile(path.join(__dirname, 'result/snapshot-time.'+testSession+'.csv'), output, function(err){
		if (err) throw err;
		console.log(chalk.green('--- DONE ---'));
	})
})