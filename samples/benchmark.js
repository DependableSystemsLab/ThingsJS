// launch the benchmark for different components 

var things_js = require('things-js');
var mongoUrl = 'mongodb://localhost:27017/things-js-fs';
var GFS = require('things-js').addons.gfs(mongoUrl);
var fs = require('fs');
var files = new Map([
  ['ETL', './benchETLGFS.json'],
  ['STAT', './benchSTATGFS.json'],
  ['TRAIN', 'benchTRAINGFS.json'],
  ['PRED','./benchPREDGFS.json']);
var args;
var dispatcher, pubsub, logger;
(function begin(){
	args = process.argv.slice(2);
	dispatcher = new things.Dispatcher();
	pubsub = new things.Pubsub();
	var benchdata = fs.readFileSync(files.get(args));
	GFS.writeFile(files.get(args), benchdata, function(err){
  	if (err) throw err;
  	console.log('\x1b[44m%s\x1b[0m', '[BENCHMARK Service] START UPLOADING APP FILES FOR BENCHMARK' + args);
  	GFS.readFile(files.get(args),function(err2){
  	if (err2) throw err2;
  	console.log('\x1b[44m%s\x1b[0m', 'SUCCEED UPLOAD DATA');
  	})
});
// send command to scheduler 
})();