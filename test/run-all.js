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

// runTest('Pubsub', './Pubsub-test.js');
runTest('Code', './Code-test.js');
// runTest('Code Instrumentation', './instrumentation-test.js');
// runTest('CodeEngine', './CodeEngine-test.js');

after(function(done){
 	server.kill().then(function(){
 		done();
 	});
});