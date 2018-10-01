var things_js = require('things-js');
var pubsub = new things_js.Pubsub();
var fs = require('fs');

// var args = process.argv.slice(2);
pubsub.on('ready',function(){
	pubsub.subscribe('TRAINGFS',function(data){
	console.log(data);
});
	var testconf = JSON.parse(fs.readFileSync('./testTRAINGFS.conf','utf-8')) ;

	pubsub.publish('test1/cmd',testconf);
});


