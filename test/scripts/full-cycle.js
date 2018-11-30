var fs = require('fs');
var path = require('path');
var chalk = require('chalk');
// var things = require('../../lib/things.js');
var Pubsub = require('../../lib/core/Pubsub.js');
var Code = require('../../lib/core/Code.js');
var helpers = require('../../lib/helpers.js');

if (process.argv.length < 3) {
    console.log("You must specify code name >> e.g. factorial.js");
    process.exit(1);
}
var codePath = process.argv[2];
codePath = path.join(__dirname, codePath);

var pubsub = new Pubsub('mqtt://localhost');
pubsub.on('ready', function(){

	var original = Code.fromFile(pubsub, codePath);
	var singleHop, multiHop;

	original.save(path.join(__dirname, 'temp/1-original.inst.js'))
	.then(function(){
		return original.run()
	})
	.then(function(instance){
		return new Promise(function(resolve, reject){
			setTimeout(function(){
				instance.snapshot(true)
					.then(function(snapshot){
						instance.saveLastSnapshot(path.join(__dirname, 'temp/2-original.snap.json'));
						return snapshot;
					}, reject)
					.then(resolve, reject)
			}, 2000);
		})
	})
	.then(function(snapshot){
		original.kill();
		singleHop = Code.fromSnapshot(snapshot);
		return singleHop.save(path.join(__dirname, 'temp/3-restored.js'))
			.then(function(){
				return singleHop.run();
			})
	})
	.then(function(instance){
		return new Promise(function(resolve, reject){
			setTimeout(function(){
				instance.snapshot(true)
					.then(function(snapshot){
						instance.saveLastSnapshot(path.join(__dirname, 'temp/4-restored.snap.json'));
						return snapshot;
					}, reject)
					.then(resolve, reject)
			}, 2000);
		})
	})
	.then(function(snapshot){
		singleHop.kill();
		multiHop = Code.fromSnapshot(snapshot);
		return multiHop.save(path.join(__dirname, 'temp/5-restored.js'))
			.then(function(){
				return multiHop.run();
			})
	})
	.then(function(instance){
		setTimeout(function(){
			instance.pause()
			.then(function(){
				multiHop.kill();
			})
		}, 2000);
	})

});