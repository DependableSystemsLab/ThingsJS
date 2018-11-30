var Pubsub = require('./core/Pubsub.js');
var Code = require('./core/Code.js');

module.exports = {
	Pubsub: Pubsub,
	bootstrap: Code.bootstrap,
	GFS: function(mongoUrl){
		return require('./core/GFS.js').bootstrap(mongoUrl);
	}
}
