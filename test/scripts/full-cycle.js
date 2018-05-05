var fs = require('fs');
var path = require('path');
var chalk = require('chalk');
var things = require('../../lib/things.js');
var helpers = require('../../lib/helpers.js');

if (process.argv.length < 3) {
    console.log("You must specify code name >> e.g. factorial.js");
    process.exit(1);
}
var codePath = process.argv[2];
codePath = path.join(__dirname, codePath);

var pubsub = new things.Pubsub('mqtt://localhost');
pubsub.on('ready', function(){

	var original = things.Code.fromFile(pubsub, codePath);
	var restored;

	original.save(path.join(__dirname, 'temp/1-original.inst.js'))
	.then(function(){
		return original.run()
	})
	.then(function(instance){
		return new Promise(function(resolve, reject){
			setTimeout(function(){
				original.snapshot(instance.id, true)
					.then(resolve, reject);
			}, 3000);
		})
	})
	.then(function(snapshot){
		original.saveLastSnapshot(path.join(__dirname, 'temp/2-original.snap.json'));
		restored = things.Code.fromSnapshot(snapshot);
		return restored.save(path.join(__dirname, 'temp/3-restored.js'))
			.then(function(){
				return restored.run();
			})
	})
	.then(function(instance){
		setTimeout(function(){
			restored.pause(instance.id)
			.then(function(){
				original.kill();
				restored.kill();	
			})
		}, 3000);
	})

});