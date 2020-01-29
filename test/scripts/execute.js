var fs = require('fs');
var path = require('path');
var child_process = require('child_process');
var pidusage = require('pidusage');
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
	'navier-stokes',
	'splay',
	'factorial',
	'richards',
	'raytrace'
	// 'empty'
]

var result = {};

function serialExecute(code_path, count){
	if (count === 0) return Promise.resolve([]);
	
	return new Promise(function(resolve, reject){

		var stats = [], started = null, elapsed = null;

		var spawned = child_process.fork(code_path);
			spawned.on('message', function(message){
				// console.log(message);
				if (message.timestamp && message.cpu && message.memory){
					if (!started) started = Date.now();
					stats.push(message);
				}
			});
		spawned.on('exit', function(exit_code, signal){
			elapsed = Date.now() - started;
			stats.forEach(function(item, index, list){
				list[index].t = item.timestamp - stats[0].timestamp;
			});
			resolve([ {
				logs: stats,
				elapsed: elapsed
			} ]);

			console.log(chalk.red('Exited ')+exit_code+' | signal = '+signal);
		});

	}).then(function(result){
		return serialExecute(code_path, count - 1 )
				.then(function(next_result){
					return result.concat(next_result);
				});
	})
}


function runTest(codes){
	if (codes.length === 0) return Promise.resolve(true);
	var code_name = codes[0];
	console.log('\n'+chalk.green('Testing ')+code_name);
	result[code_name] = {};
	// var code = path.join(BASE_DIR, code_name+'.inst.js');

	var code_raw = path.join(BASE_DIR, code_name+'.exec.js');
	var code_inst = path.join(BASE_DIR, code_name+'.exec.inst.js');
	var code_rest = path.join(BASE_DIR, code_name+'.exec.rest.js');

	return serialExecute(code_raw, NUM_RUNS)
		.then(function(results){
			result[code_name].raw = results
			result[code_name].raw_stats = helpers.analyzeArray(results.map(function(item){ return item.elapsed }), 95);
		})
		.then(function(){
			return serialExecute(code_inst, NUM_RUNS)
		})
		.then(function(results){
			result[code_name].inst = results
			result[code_name].inst_stats = helpers.analyzeArray(results.map(function(item){ return item.elapsed }), 95);
		})
		.then(function(){
			return serialExecute(code_rest, NUM_RUNS)
		})
		.then(function(results){
			result[code_name].rest = results
			result[code_name].rest_stats = helpers.analyzeArray(results.map(function(item){ return item.elapsed }), 95);

			var inst_ratio = Math.round(1000 * result[code_name].inst_stats.mean / result[code_name].raw_stats.mean) / 10;
			var rest_ratio = Math.round(1000 * result[code_name].rest_stats.mean / result[code_name].raw_stats.mean) / 10;
			
			console.log('   '+chalk.yellow(code_name)+' :');
			console.log('     '+chalk.red('Raw')+' : '+result[code_name].raw_stats.mean+' ± '+result[code_name].raw_stats.confidence);
			console.log('     '+chalk.red("Instr'ed")+' : '+result[code_name].inst_stats.mean+' ± '+result[code_name].inst_stats.confidence+'    '+chalk.red(inst_ratio+' %'));
			console.log('     '+chalk.red('Restored')+' : '+result[code_name].rest_stats.mean+' ± '+result[code_name].rest_stats.confidence+'    '+chalk.red(rest_ratio+' %'));

			return runTest(codes.slice(1));
		})	
}

// Run the test
runTest(CODES)
.then(function(){

	var runs = [];
	var run_data = [];
	for (var j=0; j < CODES.length; j++) {
		(['raw', 'inst', 'rest']).forEach(function(type){
			var means = {
				cpu: [],
				memory: []
			}
			for (var i=0; i< NUM_RUNS; i++){
				var run = result[CODES[j]][type][i].logs;
				
				var t_data = [ CODES[j]+' ('+type+' '+i+') ', 'timestamp', 'mean', 'stdev', 'max', 'min', '' ];
				var cpu_data = [ '', 'cpu' ];
				var mem_data = [ '', 'memory' ];

				var cpu_stats = helpers.analyzeArray(run.map(function(item){ return item.cpu }), 95);
				var mem_stats = helpers.analyzeArray(run.map(function(item){ return item.memory.heapUsed }), 95);

				cpu_data.push(cpu_stats.mean, cpu_stats.stdev, cpu_stats.max, cpu_stats.min, '' );
				mem_data.push(mem_stats.mean / 1000000, mem_stats.stdev / 1000000, mem_stats.max / 1000000, mem_stats.min / 1000000, '' );

				means.cpu.push(cpu_stats.mean);
				means.memory.push(mem_stats.mean / 1000000);

				run.forEach(function(datum){
					t_data.push(datum.t);
					cpu_data.push(datum.cpu);
					mem_data.push(datum.memory.heapUsed / 1000000);
				})

				run_data.push(t_data);
				run_data.push(cpu_data);
				run_data.push(mem_data);
			}

			result[CODES[j]][type+'_cpu'] = helpers.analyzeArray(means.cpu, 95);
			result[CODES[j]][type+'_memory'] = helpers.analyzeArray(means.memory, 95);
		})
	}
	run_data = flipArray(run_data).map(function(row){ return row.join('\t') });
	runs = runs.concat(run_data);

	runs = runs.join('\n');
	fs.writeFile(path.join(RESULT_DIR, 'execute.'+SESSION+'.runs.csv'), runs, function(err){
		if (err) throw err;
		// console.log(chalk.green('--- DONE ---'));
	});

	var output = [];
	output.push( 'Code\t'+ CODES.reduce(function(acc, code){ return acc.concat([ code, code+' (inst)', code+' (rest)' ]) }, []).join('\t') );
	output.push( 'Mean\t'+ CODES.reduce(function(acc, code){ return acc.concat([ result[code].raw_stats.mean, result[code].inst_stats.mean, result[code].rest_stats.mean ]) }, []).join('\t') );
	output.push( 'Confidence Interval\t'+ CODES.reduce(function(acc, code){ return acc.concat([ result[code].raw_stats.confidence, result[code].inst_stats.confidence, result[code].rest_stats.confidence ]) }, []).join('\t') );
	output.push( 'Mean CPU\t'+ CODES.reduce(function(acc, code){ return acc.concat([ result[code].raw_cpu.mean, result[code].inst_cpu.mean, result[code].rest_cpu.mean ]) }, []).join('\t') );
	output.push( 'CPU Conf.\t'+ CODES.reduce(function(acc, code){ return acc.concat([ result[code].raw_cpu.confidence, result[code].inst_cpu.confidence, result[code].rest_cpu.confidence ]) }, []).join('\t') );
	output.push( 'Mean Memory\t'+ CODES.reduce(function(acc, code){ return acc.concat([ result[code].raw_memory.mean, result[code].inst_memory.mean, result[code].rest_memory.mean ]) }, []).join('\t') );
	output.push( 'Mem. Conf.\t'+ CODES.reduce(function(acc, code){ return acc.concat([ result[code].raw_memory.confidence, result[code].inst_memory.confidence, result[code].rest_memory.confidence ]) }, []).join('\t') );
	
	output = output.join('\n');

	fs.writeFile(path.join(RESULT_DIR, 'execute.'+SESSION+'.csv'), output, function(err){
		if (err) throw err;
		console.log(chalk.green('--- DONE ---'));
	});
})

function flipArray(array2d){
	var flipped = [];
	array2d.forEach(function(row, rowIndex, table){
		row.forEach(function(item, colIndex){
			if (flipped.length <= colIndex){
				for (var i=-1; i < colIndex - flipped.length; i++){
					flipped.push([]);
				}
			}
			if (flipped[colIndex].length <= rowIndex){
				for (var i=-1; i < rowIndex - flipped[colIndex].length; i++){
					flipped[colIndex].push(undefined);
				}
			}
			flipped[colIndex][rowIndex] = item;
		})
	});
	return flipped;
}
