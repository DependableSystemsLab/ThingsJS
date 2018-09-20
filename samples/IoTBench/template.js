var things = require('../../lib/things.js');
var fs = require('fs');

var pubsub_url = 'mqtt://localhost';
var pubsub_topic = '';
var publish_topic = '';

var pubsub = new things.Pubsub(pubsub_url);

function setup(){
	var args = process.argv.slice(2);
	var properties;

	if(!args.length){
		process.exit();
	}
	try{
		properties = JSON.parse(fs.readFileSync(args[0], 'utf-8'));
	}
	catch(e){
		console.log('Problem reading properties file: '+e);
		process.exit();
	}
}

function task(data){
	pubsub.publish(publish_topic, data);
}

pubsub.on('ready', function(){
	setup();
	console.log('Beginning <>');
	pubsub.subscribe(pubsub_topic, task);
});
