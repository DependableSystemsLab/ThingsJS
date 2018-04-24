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
var pubsub = { url: 'mqtt://localhost' }; // use a dummy pubsub, no need to connect

var snapshots = [
	// 'navier-stokes.js.things.js.snap.json',
	'splay.js.things.js.snap.json',
	'factorial.js.things.js.snap.json',
]
var NUM_RUNS = 3;


var result = {};
function serialExecute(code, count){
	if (count === 0) return Promise.resolve([]);

	return code.save('./codes/'+code.name+'.restored.js')
		.then(function(saved_path){
			console.log(saved_path);
			return serialExecute(code, count - 1 )
				.then(function(next_result){
					return [ saved_path ].concat(next_result);
				});
		})
	
	return new Promise(function(resolve, reject){
			// var started, ended, result;
			code.once('run-finished', function(meta){
				// ended = Date.now();
				// result = [ (ended - started) ];
				// result = ;
				resolve([ meta.elapsed ]);
			});
			// started = Date.now();
			code.run();
		}).then(function(result){
			return serialExecute(code, count - 1 )
				.then(function(next_result){
					return result.concat(next_result)
				});
		})
}

function runTest(snapshots){
	if (snapshots.length === 0) return Promise.resolve(true);

	var snap_name = snapshots[0];
	console.log(chalk.green('Testing ')+snap_name);
	result[snap_name] = {
		times: [],
		mean: null,
		stdev: null,
		confidence: null
	}
	var code = things.Code.fromSnapshotFile(path.join(__dirname, 'codes/'+snap_name));

	return serialExecute(code, NUM_RUNS)
		.then(function(results){
			result[snap_name].times = results;
			var stats = helpers.analyzeArray(result[snap_name].times, 95);
			result[snap_name].mean = stats.mean;
			result[snap_name].stdev = stats.stdev;
			result[snap_name].confidence = stats.confidence;
			console.log('   '+chalk.yellow(snap_name)+' : '+stats.mean+' ± '+stats.confidence);

			return runTest(snapshots.slice(1));
		})	
}

// Run the test
runTest(snapshots)
.then(function(){
	// Prepare output string
	var output = [];
	output.push( snapshots.map(function(snap_name){ return result[snap_name].mean }).join('\t') );
	output.push( snapshots.map(function(snap_name){ return result[snap_name].confidence }).join('\t') );
	output.push( snapshots.join('\t') );
	for (var i=0; i < NUM_RUNS; i++){
		output.push( snapshots.map(function(snap_name){ return result[snap_name].times[i] }).join('\t') );
	}
	output = output.join('\n');

	fs.writeFile(path.join(__dirname, 'result/restore-time.'+testSession+'.csv'), output, function(err){
		if (err) throw err;
		console.log(chalk.green('--- DONE ---'));
	})
})