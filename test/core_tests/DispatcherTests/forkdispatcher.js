var things = require('../../../lib/things.js');

/** This script is meant to be run as a forked process from the main test-suit */
process.on('SIGNIT', function(){
	process.exit();
});

process.on('message', function(data){
	console.log("Received command: " + data.cmd);
	switch(data.cmd){
		case 'init':
			this.engine = new things.CodeEngine(data.args.conf, data.args.options);
			break;
		case 'kill':
			this.engine.kill();
			process.exit();
		}
});