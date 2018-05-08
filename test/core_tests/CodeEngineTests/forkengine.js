var things = require('../../../lib/things.js');

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
			this.engine = new things.CodeEngine(data.args.conf, data.args.options);
			break;
		case 'id':
			process.send(this.engine.id);
		case 'report_status':
			this.engine.reportStatus();
			break;
		case 'run':
			this.engine.run_code(data.args);
			break;
		case 'pause':
			this.engine.pause_code.apply(data.args);
			break;
		case 'migrate':
			this.engine.migrate_code.apply(data.args);
			break;
		case 'resume':
			this.engine.resume_code,apply(data.args);
			break;
		case 'restore':
			this.engine.restore_code(data.args);
			break;
		case 'snapshot':
			this.engine.snapshot_code(data.args);
			break;
		case 'spawn':
			this.engine.spawn_code(data.args);
			break;
		case 'instance_id':
			// asumme that there is only one running instance per piece of code
			var code = this.engine.codes[data.args.code_name];
			for(instance_id in code.processes){
				console.log('sending instance_id: ' + instance_id);
				process.send(instance_id);
				break;
			}
			break;
		case 'kill':
			this.engine.kill();
			process.exit();
		}
});


