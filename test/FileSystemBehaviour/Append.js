var GFS = require('../../lib/things.js').addons.gfs('mongodb://localhost:27017/things-js-test-fs');

var args = process.argv.slice(2);
var identifier = args[0];
var fpath = args[1];

console.log('Process ' + identifier + ' starting');
GFS.appendFile(fpath, ' hello ' + identifier, function(err, res){
	if(err){
		console.log('Error appending on process ' + identifier);
	}
	process.exit();
});



