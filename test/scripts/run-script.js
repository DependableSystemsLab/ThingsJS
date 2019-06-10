var path = require('path');
var child_process = require('child_process');

var SCRIPTS = {
	'instrument': 'instrument.js',
	'execute': 'execute.js',
	'snapshot': 'snapshot.js',
	'restore': 'restore.js'
}

if (process.argv.length < 3){
	console.log('Need to provide arguments. e.g. npm run test-script instrument 200 test-01');
	process.exit(1);
}

var script_name = process.argv[2];

if (script_name in SCRIPTS){
	var script_args = ([ SCRIPTS[script_name] ]).concat(process.argv.slice(3));
	console.log(script_args);
	var script = child_process.spawn('node', script_args, {
		cwd: path.resolve(__dirname),
		stdio: 'inherit'
	});
	script.on('close', function(exit_code){
		console.log('--- Test Script finished running ---');
		process.exit();
	})
}
else {
	console.log('Invalid script name. Choose one of [ instrument, execute, snapshot, restore ]');
	process.exit(1);
}