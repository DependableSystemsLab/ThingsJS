var express = require('express');
var ThingsDatabase = require('./db.js')
var bodyParser = require('body-parser');

var app = express();
var db;

/* server object 
 * initializes a new instance of the fs database
 */
function FSServer(mongoURL){
	db = new ThingsDatabase(mongoURL, this.pathHandler);
	this._init();
}

FSServer.prototype._init = function(){
	app.use(express.json());
	app.use(bodyParser.urlencoded({ extended: true }));

	app.use(function(req, res, next){
	  res.header("Access-Control-Allow-Origin", "*");
	  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	  next();
	})

	this._initCreate();
	this._initDelete();
	this._initMove();
}

/* start the server
 */
FSServer.prototype.start = function(){
	app.set('port', (process.env.PORT || 5000));
	app.use(express.static(__dirname));

	app.listen(app.get('port'), function(){
		console.log("FS app is running at localhost:" + app.get('port'))
	});
}

/* routes all the paths of the fs objects
 */
FSServer.prototype.pathHandler = function(route){
	app.get(route, function(req,res){
		db.viewFileObject(route).then(function(data){
			var obj = data.splice(0, 1)[0];
			if(obj.type == 'directory'){
				var output = {
					data: obj,
					content: data
				}
			}
			else{
				fileContent = obj.content;
				delete obj.content;
				var output = {
					data: obj,
					content: fileContent
				}
			}
			res.json(output);
			res.end();
		});
	});	
}

FSServer.prototype._initCreate = function(){
	app.post('/createFSObject', function(req, res){
		var fileName = req.body.file_name;
		var parentPath = req.body.parent_path;
		var fileType = req.body.type;
		var fileContent = req.body.content;

		db.createFile(fileName, parentPath, fileType, fileContent);
		res.end();
	});
}

FSServer.prototype._initDelete = function(){
	app.post('/deleteDirectory', function(req, res){
		var filepath = req.body.file_path;
		console.log("Trying to delete: " + filepath);
		db.deleteFolder(filepath);
		res.end();
	});
}


FSServer.prototype._initMove = function(){
	app.post('/moveDirectory', function(req, res){
		console.log("Moving :" + path);
		var path = req.body.path;
		var newPath = req.body.new_path;
		db.moveDirectory(path, newPath);
		res.end();
	});
}

/************************************
starting structure to initialize fs for testing
-- make sure fsobjects collection is dropped before using
************************************/
/**  
 *   |    
 *   ---folder1
 *   |    |          
 *   |    ---folder2
 *   |     	   |
 *   |         ---code.js : "Wow! This is a file"
 *   |
 *   |---file.js : "This is another file!"
 */

app.get('/createFiles', function(req, res){
	db.createFile('/', null, 'directory');
	db.createFile('folder1', '/', 'directory');
	db.createFile('folder2', '/folder1');
	db.createFile('code.js', '/folder1/folder2', 'file', 'Wow! This is a file');
	db.createFile('file1.js', '/', 'file', 'This is another file!');
});


module.exports = FSServer;

