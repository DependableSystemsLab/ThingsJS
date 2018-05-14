var express = require('express');
var url = require('url');
var ThingsDatabase = require('./db.js')
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var db;
var app = express();

/* server object 
 * initializes a new instance of the fs database
 */
function FSServer(mongoURL, mountPath){
	db = new ThingsDatabase(mongoURL);
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

	this._initRouting();
	this._initDelete();
	this._initMove();
	this._initCreate();
	this._initMisc();
}

/* start the server
 */
FSServer.prototype.start = function(){
	app.set('port', (process.env.PORT || 5000));
	app.listen(app.get('port'), function(){
		console.log("FS app is running at localhost:" + app.get('port'));
	});
}

/* Initialize wildcard routing
 */
FSServer.prototype._initRouting = function(){
	app.get('/*', function(req,res){
		console.log('<T> FSServer.js -- _initRouting: ' + req.url);
		db.viewFileObject(req.url).then(function(data){
			res.json(data);
			res.end();
		});
	});	
}

/* Initialize file object creation
 */
FSServer.prototype._initCreate = function(){
	app.post('/make', function(req, res){
		var fileName    = req.body.file_name;
		var parentId    = req.body.parent_id;
		var isFile      = req.body.is_file;
		var fileContent = req.body.content;

		db.createFile(fileName, parentId, isFile, fileContent)
			.then(function(){
				res.end();
			});
	});

	app.post('/makeFromPath', function(req, res){
		var fileName    = req.body.file_name;
		var parentPath  = req.body.parent_path;
		var isFile      = req.body.is_file;
		var fileContent = req.body.content; 

		console.log('<D> FSServer.js -- _initCreate: ' + fileName + ', ' + parentPath);
		db.createFileFromPath(fileName, parentPath, isFile, fileContent)
			.then(function(){
				res.end();
			});
	});
}

/* Initialize file object deletion
 */
FSServer.prototype._initDelete = function(){
	app.post('/delete', function(req, res){
		var id = req.body.file_id;
		console.log('<T> FSServer.js -- _initDelete: ' + id);
		db.deleteFile(id);
		res.end();
	});

	app.post('/deleteFromPath', function(req, res){
		var path = req.body.file_path;
		db.deleteFileFromPath(path)
			.then(function(){
				res.end();
			});
	})
}

/* Initialize file object move
 */
FSServer.prototype._initMove = function(){
	app.post('/move', function(req, res){
		var id = req.body.file_id;
		var parentId = req.body.parent_id;

		console.log('<T> FSServer.js -- _initMove: ' + id + ', ' + parentId);
		db.moveFile(id, parentId);
		res.end();
	});

	app.post('/moveFromPath', function(req, res){
		var path = req.body.file_path;
		var parentPath = req.body.parent_path;

		console.log('<T> FSServer.js -- _initMove: ' + path + ', ' + parentPath);
		db.moveFileFromPath(path, parentPath)
			.then(function(){
				res.end();
			});
	});
}

/* Misc file system functionality
 */
FSServer.prototype._initMisc = function(){
	app.post('/updateFromPath', function(req, res){
		var path = req.body.file_path;
		var content = req.body.content;
		db.updateFileFromPath(path, content)
			.then(function(){
				res.end();
			});
	});

	app.post('/renameFromPath', function(req, res){
		var path = req.body.file_path;
		var name = req.body.file_name;
		db.changeNameFromPath(path, name)
			.then(function(){
				res.end();
			});
	});

	app.post('/cloneFromPath', function(req, res){
		var path = req.body.file_path;
		var name = req.body.file_name;
		var destPath = req.body.parent_path;
		db.cloneFileFromPath(path, destPath, name)
			.then(function(){
				res.end();
			});
	});
}

/* Use for testing
 * Make sure fsobject is dropped from the database first
 *
 * root
 *   |    
 *   ---folder1
 *   |    |          
 *   |    ---folder2
 *   |     	   |
 *   |         ---code.js : "Wow! This is a file"
 *   |         |
 *   |         ----folder3
 *   |             |
 *   |             ---temp.txt : "Testing testing"
 *   |
 *   |---file.js : "This is another file!"
 */
app.get('/testPopulate', function(req, res){
	var root = new mongoose.Types.ObjectId();
	var folder1 = new mongoose.Types.ObjectId();
	var folder2 = new mongoose.Types.ObjectId();
	var folder3 = new mongoose.Types.ObjectId();

	db.createFile('root', null, false, null, root);
	db.createFile('folder1', root, false, null, folder1);
	db.createFile('folder2', folder1, false, null, folder2);
	db.createFile('code.js', folder2, true, 'Wow! This is a file');
	db.createFile('folder3', folder2, false, null, folder3);
	db.createFile('temp.txt', folder3, true, 'Testing testing');
	db.createFile('file1.js', root, true, 'This is another file!');
})

app.get('/testCreateFP', function(req, res){
	db.createFileFromPath('file.js', 'root/folder1/folder2', true, 'var x = 10');
})

app.get('/testDeleteFP', function(req, res){
	db.deleteFileFromPath('root/file.js')
})

app.get('/testMoveFP', function(req, res){
	db.moveFileFromPath('root/folder1/folder2', 'root');
})

app.get('/testUpdateFP', function(req, res){
	db.updateFileFromPath('root/folder2/code.js', 'var x = 11');
})

app.get('/testCloneFP', function(req, res){
	db.cloneFileFromPath('/root/folder1/folder2', null, 'folder2_copy');
})

module.exports = FSServer;

