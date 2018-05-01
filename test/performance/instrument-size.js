var fs = require('fs');
var path = require('path');
var chalk = require('chalk');
var things = require('../../lib/things.js');
var helpers = require('../../lib/helpers.js');

var codes = [
	'navier-stokes.js',
	'splay.js',
	'deltablue.js',
	'crypto.js',
	'box2d.js',
	'earley-boyer.js',
	'raytrace.js',
	'richards.js',
	'typescript.js',
	'factorial.js',
	'regulator.js'
]
var pubsub = { url: 'mqtt://localhost' }; // use a dummy pubsub, no need to connect

// Run the test
codes.forEach(function(code_name){
	console.log(chalk.green('Instrumenting ')+code_name);
	var code = things.Code.fromFile(pubsub, path.join(__dirname, 'codes/'+code_name));
	code.save(path.join(__dirname, 'codes/'+code_name+'.things.js'));
});
console.log(chalk.green('--- DONE ---'));