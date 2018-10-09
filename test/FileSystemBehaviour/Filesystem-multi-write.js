var assert = require('assert');
var thingsjs = require('../lib/things.js');
var GFS = require('../lib/things.js').addons.gfs('mongodb://localhost:27017/things-js-test-fs');
var mqtt = require('mqtt');
var mosca = require('mosca');
var sinon = require('sinon');

var fname = '/test_read.txt';


function timeWrite(writeValue){
	return new Promise(function(resolve){
		var start = Date.now();
		GFS.writeFile(fname, 'hello world', function(err, data){
			var end = Date.now();
			if(err){
				console.log(err);
				resolve([err, writeValue+1]);
			}
			else{
				var elapsed = (end - start) / 1000;
				resolve([elapsed, writeValue+1]);
			}
		});
	});
}

function multiWrite(instances){
	var reads = [];
	for(var i = 0; i < instances; i++){
		var promise = timeWrite(i).then(function(res){
			var time = (res[0] instanceof Error) ? ('could not calculate due to error\n') : ( res[0] + ' seconds\n');
			console.log('Time it took for write ' + res[1] + ' : ' + time);
		});
		reads.push(promise);
	}
	
	Promise.all(reads).then(function(){
		GFS.deleteFile(fname, function(err){
			console.log('Tests completed');
			process.exit();
		});
	});
}

multiWrite(10);

