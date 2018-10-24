var Pubsub = require('./core/Pubsub.js');
var Code = require('./core/Code.js');
var CodeEngine = require('./core/CodeEngine.js');
var Dispatcher = require('./core/Dispatcher.js');
var Scheduler = require('./core/Scheduler.js');
var GFS = require('./core/GFS.js');

var util = {
	MqttWsBridge: require('./util/MqttWsBridge.js'),
	Shell: require('./util/DispatcherShell.js'),
	GFS: GFS.devland
};

// var addons = {
// 	FSServer: require('./extensions/gfs/FSServer.js'),
// 	gfs: require('./extensions/gfs/gfs.js')
// };

module.exports = {
	Pubsub: Pubsub,
	Code: Code,
	CodeEngine: CodeEngine,
	Dispatcher: Dispatcher,
	Scheduler: Scheduler,
	bootstrap: Code.bootstrap,
	GFS: GFS.userland,
	util: util,
	// addons: addons
}