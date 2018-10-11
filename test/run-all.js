var things = require('../lib/things.js');

function runTest(name, path){
	describe(name, function(){
		require(path);
	})
}

// Setup a Mosca server and a Pubsub instance
var server;
before(function(done){
	server = new things.Pubsub.Server();
	server.on('ready', done);
});

runTest('things-js library', './require-test.js');
runTest('Pubsub', './Pubsub-test.js');
runTest('Code', './Code-test.js');
runTest('CodeEngine', './CodeEngine-test.js');
runTest('Dispatcher', './Dispatcher-test.js');
runTest('Scheduler', './Scheduler-test.js');
runTest('Global FileSystem', './Filesystem-test.js');
runTest('Global FileSystem REST API', './Filesystem-REST-test.js');

after(function(done){
 	server.kill().then(function(){
 		done();
 	});
});