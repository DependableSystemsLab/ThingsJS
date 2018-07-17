var FileSystemHelper = require('./FilesystemHelper.js');

function test(){
	var fs_helper = new FilesystemHelper();

	fs_helper.navigateTo('/schedule/current', true);

	fs_helper.getFile('current.json').then(function(data){
		console.log(JSON.stringify(data));
	})
	.catch(function(err){
		console.log(err);
	});
}

test();