var express = require('express');
var url = require('url');
var ThingsDatabase = require('./db.js')
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var FSObject = require('./FSObject.js');

// var db;
// var app = express();
// 

var DEFAULT_DIRS = {
	'dev': {},
	'proc': {},
	'apps': {}
}

function getNode(abs_path){
	var tokens = abs_path.split('/');
	if (tokens[tokens.length-1] === '') tokens.pop();
	if (tokens.length === 1){
		return FSObject.getChildrenOf(null)
			.then(function(children){
				var lean = {
					_id: null,
					abs_path: abs_path,
					children: {}
				};
				children.forEach(function(child){
					lean.children[child.name] = child;
				})
				return lean;
			})
	}
	else {
		return new Promise(function(resolve, reject){
			FSObject.findOne({
				parent: null,
				name: tokens[1]
			}).exec(function(err, obj){
				if (obj){
					obj.getOffspring(tokens.slice(2).join('/'))
						.then(function(node){
							var lean = node.toObject();
							if (node.type === 'directory'){
								lean.children = {};
								node.getChildren()
								.then(function(children){
									children.forEach(function(child){
										lean.children[child.name] = child;
									})
									resolve(lean);
								})	
							}
							else {
								resolve(lean);
							}
						}, reject);
				}
				else {
					reject("Object Not Found")
				}
			})
		})
	}
}


/* FSServer object 
 * initializes a new instance of the fs database
 * @param {string} mongoURL - URL of the MongoDB service
 * @param {express.Router} [router] - If given, FSServer will use the router instead of creating a standalone express app.
 */
function FSServer(mongoURL, router){
	this.db = new ThingsDatabase(mongoURL);
	this.app = router || express();		// If router is given, use the router, otherwise create a standalone express app.
	this._init();
}	

FSServer.prototype._init = function(){
	var self = this;
	this.app.use(express.json());
	this.app.use(bodyParser.urlencoded({ extended: true }));

	this.app.use(function(req, res, next){
	  res.header("Access-Control-Allow-Origin", "*");
	  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	  next();
	})

	// this._initRouting();
	// this._initDelete();
	// this._initMove();
	// this._initCreate();
	// this._initMisc();

	this.app.get(':abs_path(*)', function(req, res, next){
		console.log('[FSServer] GET '+req.params.abs_path);
		getNode(req.params.abs_path)
			.then(function(data){
				// console.log(data);
				res.json(data);
			}, function(err){
				res.json({ error: err });
			})
	});
	this.app.post(':abs_path(*)', function(req, res, next){
		console.log('[FSServer] POST '+req.params.abs_path);
		getNode(req.params.abs_path)
			.then(function(node){
				// console.log(node);
				if (req.body.type === 'file'){
					if (req.body._id){
						FSObject.findByIdAndUpdate(req.body._id, {
							name: req.body.name,
							content: req.body.content
						}, {
							new: true
						}).exec(function(err, file){
								if (err) res.status(500).json({ result: 'error', error: err });
								else res.json({ result: 'success', data: file });
							})
					}
					else {
						var file = new FSObject({
							parent: node._id,
							type: 'file',
							name: req.body.name,
							content: req.body.content
						});
						file.save(function(err){
							if (err) res.status(500).json({ result: 'error', error: err });
							else res.json({ result: 'success', data: file });
						})
					}
				}
				else {
					var directory = new FSObject({
						parent: node._id,
						type: 'directory',
						name: req.body.name
					});
					directory.save(function(err){
						if (err) res.status(500).json({ result: 'error', error: err });
						else res.json({ result: 'success', data: directory });
					})

				}
			}, function(err){
				res.status(500).json({ error: err });
			})		
	})
	this.app.delete(':abs_path(*)', function(req, res, next){
		console.log('[FSServer] DELETE '+req.params.abs_path+' '+req.query.ids);
		var ids = req.query.ids.split(',');
		getNode(req.params.abs_path)
			.then(function(data){
				// console.log(data);
				FSObject.deleteMany({ _id: { $in: ids } })
					.exec(function(err){
						// nodes.forEach(function(node){
						// 	node.remove()
						// })
						res.json(data);
					})
			}, function(err){
				res.status(500).json({ error: err });
			})
	});
}

/* start the server
 */
FSServer.prototype.start = function(){
	var self = this;
	this.app.set('port', (process.env.PORT || 5000));
	this.app.listen(this.app.get('port'), function(){
		console.log("FS app is running at localhost:" + self.app.get('port'));
	});
}

/* Initialize wildcard routing
 */
FSServer.prototype._initRouting = function(){
	var self = this;
	this.app.get('/*', function(req,res){
		console.log('<T> FSServer.js -- _initRouting: ' + req.url);
		self.db.viewFileObject(req.url).then(function(data){
			res.json(data);
			res.end();
		});
	});	
}

/* Initialize file object creation
 */
FSServer.prototype._initCreate = function(){
	var self = this;
	this.app.post('/make', function(req, res){
		var fileName    = req.body.file_name;
		var parentId    = req.body.parent_id;
		var isFile      = req.body.is_file;
		var fileContent = req.body.content;

		self.db.createFile(fileName, parentId, isFile, fileContent);
		res.end();
	});

	this.app.post('/makeFromPath', function(req, res){
		var fileName    = req.body.file_name;
		var parentPath  = req.body.parent_path;
		var isFile      = req.body.is_file;
		var fileContent = req.body.content; 

		console.log('<D> FSServer.js -- _initCreate: ' + fileName + ', ' + parentPath);
		self.db.createFileFromPath(fileName, parentPath, isFile, fileContent);
		res.end();
	});
}

/* Initialize file object deletion
 */
FSServer.prototype._initDelete = function(){
	var self = this;
	this.app.post('/delete', function(req, res){
		var id = req.body.file_id;
		console.log('<T> FSServer.js -- _initDelete: ' + id);
		self.db.deleteFile(id);
		res.end();
	});

	this.app.post('/deleteFromPath', function(req, res){
		var path = req.body.file_path;
		self.db.deleteFileFromPath(path);
		res.end();
	})
}

/* Initialize file object move
 */
FSServer.prototype._initMove = function(){
	var self = this;
	this.app.post('/move', function(req, res){
		var id = req.body.file_id;
		var parentId = req.body.parent_id;

		console.log('<T> FSServer.js -- _initMove: ' + id + ', ' + parentId);
		self.db.moveFile(id, parentId);
		res.end();
	});

	this.app.post('/moveFromPath', function(req, res){
		var path = req.body.file_path;
		var parentPath = req.body.parent_path;

		console.log('<T> FSServer.js -- _initMove: ' + path + ', ' + parentPath);
		self.db.moveFileFromPath(path, parentPath);
	});
}

/* Misc file system functionality
 */
FSServer.prototype._initMisc = function(){
	var self = this;
	this.app.post('/updateFromPath', function(req, res){
		var path = req.body.file_path;
		var content = req.body.content;
		self.db.updateFileFromPath(path, content);
	});

	this.app.post('/renameFromPath', function(req, res){
		var path = req.body.file_path;
		var name = req.body.file_name;
		self.db.changeNameFromPath(path, name);
	})

	this.app.post('/cloneFromPath', function(req, res){
		var path = req.body.file_path;
		var name = req.body.file_name;
		var destPath = req.body.parent_path;
		self.db.cloneFileFromPath(path, destPath, name);
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
// app.get('/testPopulate', function(req, res){
// 	var root = new mongoose.Types.ObjectId();
// 	var folder1 = new mongoose.Types.ObjectId();
// 	var folder2 = new mongoose.Types.ObjectId();
// 	var folder3 = new mongoose.Types.ObjectId();

// 	db.createFile('root', null, false, null, root);
// 	db.createFile('folder1', root, false, null, folder1);
// 	db.createFile('folder2', folder1, false, null, folder2);
// 	db.createFile('code.js', folder2, true, 'Wow! This is a file');
// 	db.createFile('folder3', folder2, false, null, folder3);
// 	db.createFile('temp.txt', folder3, true, 'Testing testing');
// 	db.createFile('file1.js', root, true, 'This is another file!');
// })

// app.get('/testCreateFP', function(req, res){
// 	db.createFileFromPath('file.js', 'root/folder1/folder2', true, 'var x = 10');
// })

// app.get('/testDeleteFP', function(req, res){
// 	db.deleteFileFromPath('root/file.js')
// })

// app.get('/testMoveFP', function(req, res){
// 	db.moveFileFromPath('root/folder1/folder2', 'root');
// })

// app.get('/testUpdateFP', function(req, res){
// 	db.updateFileFromPath('root/folder2/code.js', 'var x = 11');
// })

// app.get('/testCloneFP', function(req, res){
// 	db.cloneFileFromPath('/root/folder1/folder2', null, 'folder2_copy');
// })

module.exports = FSServer;

