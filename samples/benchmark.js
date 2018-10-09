// launch the benchmark for different components 

var things = require('things-js');
var mongoUrl = 'mongodb://localhost:27017/things-js-fs';
var GFS = require('things-js').addons.gfs(mongoUrl);
var fs = require('fs');
var scheduler = new things.Scheduler();
var files = new Map([
  ['ETL', './benchETLGFS.json'],
  ['STAT', './benchSTATGFS.json'],
  ['TRAIN', 'benchTRAINGFS.json'],
  ['PRED','./benchPREDGFS.json']);
var args;
var dispatcher, pubsub, logger;

function randKey(length, charset){
	var text = "";
	if (!length) length = 8;
	if (!charset) charset = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for( var i=0; i < length; i++ ){
    	text += charset.charAt(Math.floor(Math.random() * charset.length));
    }
    return text;
};

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
})；
var config = {
	"ctrl": "run_application", "reply_to": args, "request_token": randKey(), "kwargs":benchdata 
}
// send command to scheduler 
pubsub.on('ready',function(){
	pubsub.subscribe(args,function(data){
	console.log(data);
});
	// var testconf = JSON.parse(fs.readFileSync('./testPREDGFS.conf','utf-8')) ;

	pubsub.publish('things-scheduler/cmd',config);
});

})();