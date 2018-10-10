var GFS = require('../../lib/things.js').addons.gfs('mongodb://localhost:27017/things-js-test-fs');
var spawn = require('child_process').spawn

var fname = '/appendtest.txt';
var spawnFile = './Append.js';
var numProcs = Number(process.argv.slice(2)[0]) || 3;

function init(){
	return new Promise(function(resolve){
		var procs = [];
		GFS.writeFile(fname, '', function(err){
			if(err){
				console.log('Could not successfully create the test file. Aborting...');
				process.exit();
			}
			for(var i = 0; i < numProcs; i++){
				procs.push(spawnChild(i));
			}
			Promise.all(procs).then(resolve);
		});
	});
}

function spawnChild(id){
	return new Promise(function(resolve){
		var child = spawn('node', [spawnFile, id, fname]);
		child.on('exit', function(){
			resolve();
		});
		child.stdout.on('data', function(data){
			console.log(data.toString());
		});
	})
}

function multiAppend(){
	init().then(function(){
		GFS.readFile(fname, function(err, data){
			if(err){
				console.log('Error occurred: ' + err);
			}
			else{
				console.log('Here is the result of the file:\n' + data);
				GFS.deleteFile(fname, function(err){
					if(err){
						console.log(err);
					}
					process.exit();
				});
			}
		});
	});
}

multiAppend();


