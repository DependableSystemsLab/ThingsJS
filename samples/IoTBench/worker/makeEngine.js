var things = require('../../../lib/things.js');
var fs = require('fs');

(function init(){
	var args = process.argv.slice(2);
	if(!args){
		console.log('No initialization file provided');
		process.exit();
	}
	if(isNaN(args[1])){
		console.log('Please provide an index');
		process.exit();
	}
	try{
		var ids = JSON.parse(fs.readFileSync(args[0], 'utf-8'));
		var thisId = ids[args[1]];
		var engine = new things.CodeEngine({ id: thisId });
	}
	catch(e){
		console.log('Problem processing id:' + e);
		process.exit();
	}
})();
