var fs = require('fs');
var chalk = require('chalk');
var Pubsub = require('./Pubsub.js');
var Code = require('./Code.js');
var helpers = require('../helpers.js');

var DEFAULT_PUBSUB_URL = 'mqtt://localhost';
var ENGINE_REGISTRY_NAMESPACE = 'engine-registry';

function CodeEngine(config, options){
	var self = this;
	this.config = Object.assign({
		pubsub_url: DEFAULT_PUBSUB_URL
	}, config);
	this.id = (this.config.id || 'engine-'+helpers.randKey());
	this.options = Object.assign({}, options);
	console.log(chalk.green('[Engine:'+this.id+'] Initialized'));

	this.pubsub = new Pubsub(this.config.pubsub_url);
	this.status = 'idle';
	this.codes = {};

	this.pubsub.on('ready', function(){
		self.reportStatus();
		console.log(chalk.green('[Engine:'+self.id+'] connected to Pub/Sub at '+self.pubsub.url));
	});
	this.pubsub.subscribe(this.id+'/cmd', function(message){
		if (message.ctrl in CodeEngine.Behaviours){
			CodeEngine.Behaviours[message.ctrl](self, message.kwargs)
				.catch(function(err){
					console.log(err);
				})
		}
	});

	// Experimental
	// setInterval(function(){
	// 	self.reportStatus()
	// }, 1000);

}
CodeEngine.prototype.reportStatus = function(){
	return this.pubsub.publish(ENGINE_REGISTRY_NAMESPACE, {
		id: this.id,
		status: this.status,
		meta: {
			device: this.config.device
		}
	});
}
CodeEngine.prototype.run_code = function(kwargs){
	return CodeEngine.Behaviours.run_code(this, kwargs);
}
CodeEngine.prototype.pause_code = function(kwargs){
	return CodeEngine.Behaviours.pause_code(this, kwargs);
}
CodeEngine.prototype.resume_code = function(kwargs){
	return CodeEngine.Behaviours.resume_code(this, kwargs);
}
CodeEngine.prototype.snapshot_code = function(kwargs){
	return CodeEngine.Behaviours.snapshot_code(this, kwargs);
}
CodeEngine.prototype.restore_code = function(kwargs){
	return CodeEngine.Behaviours.restore_code(this, kwargs);
}
CodeEngine.prototype.migrate_code = function(kwargs){
	return CodeEngine.Behaviours.migrate_code(this, kwargs);
}

CodeEngine.prototype.kill = function(){
	var self = this;
	this.status = 'dead';
	Object.values(this.codes).forEach(function(code){
		code.kill();
	});
	return this.reportStatus()
		.then(function(){
			console.log(chalk.green('[Engine:'+self.id+'] Killed gracefully'));
			return self.pubsub.kill()
		})
}

CodeEngine.validateConfig = function(file_path){
	var config = fs.readFileSync(file_path).toString().trim();
	config = JSON.parse(config);
	config.pubsub_url = config.pubsub_url || DEFAULT_PUBSUB_URL;
	return config;
}

CodeEngine.initCode = {
	raw: function(self, kwargs){
		return Code.fromString(self.pubsub, kwargs.code_name, kwargs.source);
	},
	file_system: function(self, kwargs){
		return Code.fromFile(self.pubsub, kwargs.source);
	},
	repository: function(self, kwargs){
		return Code.fromFile(self.pubsub, kwargs.source);
	}
}
/**
 * Defines a set of "behaviours" for the CodeEngine. (Actor pattern)
 *   these behaviours are either triggered via Pubsub or directly called by the instance.
 *   All of these should return a Promise object as they are all asynchronous.
 */
CodeEngine.Behaviours = {
	run_code: function(self, kwargs){
		kwargs = Object.assign({
			mode: 'raw',
			code_name: helpers.randKey()
		}, kwargs);
		var code = CodeEngine.initCode[kwargs.mode](self, kwargs);
		self.codes[code.name] = code;
		return code.run();
	},
	pause_code: function(self, kwargs){
		return self.codes[kwargs.code_name].pause()
	},
	resume_code: function(self, kwargs){
		return self.codes[kwargs.code_name].resume()
	},
	snapshot_code: function(self, kwargs){
		return self.codes[kwargs.code_name].snapshot()
	},
	restore_code: function(self, kwargs){
		var code = Code.fromSnapshot(kwargs.snapshot);
		self.codes[code.name] = code;
		return code.run()
	},
	migrate_code: function(self, kwargs){
		return self.codes[kwargs.code_name].snapshot(true)
			.then(function(snapshot){
				return self.pubsub.publish(kwargs.engine+'/cmd', {
					ctrl: 'restore_code',
					kwargs: {
						snapshot: snapshot	
					}
				})
			})
	},
	// Experimental
	spawn_code: function(self, kwargs){
		return self.codes[kwargs.code_name].snapshot(true)
			.then(function(snapshot){
				var promises = [];
				kwargs.engines.forEach(function(engine_id){
					promises.push(self.pubsub.publish(engine_id+'/cmd', {
						ctrl: 'restore_code',
						kwargs: {
							snapshot: snapshot
						}
					}))
				})
				return Promise.all(promises);
			})
	}
}

module.exports = CodeEngine