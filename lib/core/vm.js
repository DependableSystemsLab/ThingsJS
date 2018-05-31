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
			setInterval(function(){
				process.send({ ctrl: 'stats', payload: process.memoryUsage() })
			}, 1000);
		}
	}
	catch (e){
		process.send({ error: e.stack }, function(){
			process.exit(1);
		});
	}
})