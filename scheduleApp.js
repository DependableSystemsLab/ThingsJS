var things_js = require('things-js');
var pubsub = new things_js.Pubsub();
var fs = require('fs');

pubsub.on('ready',function(){
	pubsub.subscribe('benchmark1',function(data){
	console.log(data);
});
	var testconf = JSON.parse(fs.readFileSync('./testbench1.conf','utf-8')) ;

	pubsub.publish('test1/cmd',testconf);
});


