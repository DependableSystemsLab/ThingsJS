process.once('message', function(message){
	try {
		// eval(message.code);
		(function(){
			var Module = require('module'), path = require('path');
			var m = new Module('', module.parent);
			m.filename = '';
			m.paths = Module._nodeModulePaths(path.dirname(''));
			m._compile(message.code, '');
			return m.exports;
		}());

		if (message.options.enableStats){
			var pidusage = require('pidusage');
			setInterval(function(){
				pidusage(process.pid, function(err, stat) {
					process.send({ 
						ctrl: 'stats', 
						payload: {
							timestamp: Date.now(),
							// memory: process.memoryUsage(),
							memory: stat.memory,
							cpu: stat.cpu
						}
					});
				});
			}, 1000);
		}
	}
	catch (e){
		process.send({ error: e.stack }, function(){
			process.exit(1);
		});
	}
})