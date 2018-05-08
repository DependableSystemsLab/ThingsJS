var Pubsub = require('../../../lib/core/Pubsub.js');

/*
 * This script is meant to be run as a forked process from the main test-suite
 *
 */
process.on('SIGNIT', function(){
	process.exit();
});

process.on('message', function(data){
	console.log("Received command: " + data.cmd);

	switch(data.cmd){
		case 'init':
			this.pubsub = new Pubsub(data.args.url);
			break;

		case 'publish':
			this.pubsub.publish.apply(this.pubsub, data.args);
			break; 

		case 'subscribe':
			var f = function(data){
				process.send(data);
			}
			this.pubsub.subscribe(data.args.topic, f);
			break;

		case 'unsubscribe':
			this.pubsub.unsubscribe.apply(this.pubsub, data.args);
			break;

		case 'kill':
			this.pubsub.disconnect.apply(this.pubsub, data.args);
			process.exit();
		}
});


