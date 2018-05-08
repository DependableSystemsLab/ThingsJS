var db = require('../../../util/gfs/db.js');
var mongoclient = require('mongodb').MongoClient;
var expect = require('chai').expect;
var assert = require('chai').assert;
var should = require('chai').should();
var http = require('http');
var fs = require('fs');

/**
 * A framework for testing the basic functionalities of the
 * REST API for the code repository 
 * Usage: mocha fs_rest_basic.js
 * 
 * @requires filesysem server running on url mongodb://localhost:27017/test-fs
 * @requires mongodb service running
 *
 */
 describe('file system REST API test suite', function(){
 	var self = this;

	const TEST_DB = 'test-fs';
	const DB_URL = 'mongodb://localhost:27017/' + TEST_DB;
	const FS_URL = 'localhost';
	const FS_PORT = 5000;

 	/** setup */
	before(function(){
		this.timeout(10000);
		return new Promise(function(resolve){
			self.db = new db(DB_URL);
			mongoclient.connect(DB_URL, function(err, db){
				if(err) throw err;
				self.mongodb = db; 
				resolve();
			});
		});
	});

	function PostRequest(path, requestBody){
		var options = {
			method: 'POST',
			host: FS_URL,
			port: FS_PORT,
			path: path,
			headers: {
				'Content-Type': 'application/json'
			}
		}
		return new Promise(function(resolve, reject){
			var req = http.request(options, function(res){
				var reply = '';
				res.on('data', function(c){
					reply += c;
				});
				res.on('end', function(){
					reply = JSON.parse(reply);
					resolve(reply);
				});
			});
			req.write(JSON.stringify(requestBody));
			req.end();
		});
	}

	function createFileObject(name, parentPath, isFile, fileContent){
		var requestBody = {
			file_name: name,
			parent_path: parentPath,
			is_file: isFile
		}
		if(isFile){
			requestBody.content = fileContent;
		}
		return PostRequest('/makeFromPath', requestBody);
	}

	function updateFile(path, content){
		var requestBody = {
			file_path: path,
			content: content
		}
		return PostRequest('/updateFromPath', requestBody);
	}

	function renameFile(path, name){
		var requestBody = {
			file_path: path,
			file_name: name
		}
		return PostRequest('/renameFromPath', requestBody);
	}

	function moveFile(path, newPath){
		var requestBody = {
			file_path: path,
			parent_path: newPath
		}
		return PostRequest('/moveFromPath', requestBody);
	}

	function deleteFile(path){
		var requestBody = {
			file_path: path,
		}
		return PostRequest('/deleteFromPath', requestBody);
	}

	function cloneFile(path, newPath, newName){
		var requestBody = {
			file_name: newName,
			file_path: path,
			parent_path: newPath
		}
		return PostRequest('/cloneFromPath', requestBody);
	}

	function viewFileObject(path){
		var options = {
			host: FS_URL,
			port: FS_PORT,
			path: path
		}

		return new Promise(function(resolve, reject){
			http.get(options, function(res){
				var body = '';
				res.on('data', function(c) {
					body += c;
				});
				res.on('end', function(){
					body = JSON.parse(body);
					resolve(body);
				});
			});
		});
	}

	/** test all provided rest endpoints */
	describe('Filesystem unit tests', function(){
		before(function(){
			return new Promise(function(resolve, reject){
				self.db.createFile('root', null, false)
					.then(function(data){
						resolve(data);
					});
			});
		});

		/**
		 * function to test the correctness of a directory retrieved from the REST API
		 *
		 * @param {object} object - the file object retrieved from the REST call
		 * @param {string} name - the expected name of the file object
		 * @param {array} children - the expected children of the directory
		 */
		function viewDirTest(object, name, children){
			expect(object.name).to.equal(name);
			expect(object.type).to.equal('directory');
			expect(object.content.length).to.equal(children.length);

			var childArray = [];
			for(var i = 0; i < object.content.length; i++){
				childArray.push(object.content[i].name);
			}
			expect(childArray).to.include.members(children);
		}

		/**
		 * function to test the correctness of a file retrieved from the REST API
		 * 
		 * @param {object} object - the file object retrieved from the REST call
		 * @param {string} name - the expected name of the file object
		 * @param {string} content - the expected contents of the file
		 */
		function viewFileTest(object, name, content){
			expect(object.type).to.equal('file');
			expect(object.content).to.equal(content);
			expect(object.name).to.equal(name);
		}

		/**
		 * test structure:
		 * 
		 *  root
		 *   |
		 *   |---folder1
		 *   |    |
		 *   |    |---folder2
		 *   |    |     |
		 *   |    |     |---file1: console.log("Hello World");               
		 *   |    |
		 *   |    |------file2: function(){ var x = 5; } 
		 *   |
		 *   |---folder3
		 */
		it('Create files (1/6)', function(){
			return createFileObject('folder1', '/root', false)
				.then(function(data){
					expect(data).to.equal(true);
				});
		});

		it('Create files (2/6)', function(){
			return createFileObject('folder2', '/root/folder1', false)
				.then(function(data){
					var data = JSON.parse(data);
					expect(data).to.equal(true);
				});
		});

		it('Create files (4/6)', function(){
			return createFileObject('folder3', '/root', false)
				.then(function(data){
					expect(data).to.equal(true);
				});
		});

		it('Create files (5/6)', function(){
			var content = 'console.log(\"Hello World\")\;';
			return createFileObject('file1', '/root/folder1/folder2', true, content)
				.then(function(data){
					expect(data).to.equal(true);
				});
		});

		it('Create files (6/6)', function(){
			var content = 'function(){ var x = 3\; }';
			return createFileObject('file2', '/root/folder1', true, content)
				.then(function(data){
					expect(data).to.equal(true);
				});
		});

		it('Create a file object with an invalid parent', function(){
			return createFileObject('badfile', '/badpath/badpath', false)
				.then(function(data){
					expect(data).to.equal(false);
				});
		});

		// begin viewing all the files
		it('View files (1/6)', function(){
			return viewFileObject('/root')
				.then(function(data){
					viewDirTest(data, 'root', ['folder1', 'folder3']);
				});
		});

		it('View files (2/6)', function(){
			return viewFileObject('/root/folder1')
				.then(function(data){
					viewDirTest(data, 'folder1', ['folder2', 'file2']);
				});
		});

		it('View files (3/6)', function(){
			return viewFileObject('/root/folder1/folder2')
				.then(function(data){
					viewDirTest(data, 'folder2', ['file1']);
				});
		});

		it('View files (4/6)', function(){
			return viewFileObject('/root/folder1/folder2/file1')
				.then(function(data){
					var content = 'console.log(\"Hello World\")\;';
					viewFileTest(data, 'file1', content);
				});
		});

		it('View files (5/6)', function(){
			return viewFileObject('/root/folder1/file2')
				.then(function(data){
					var content = 'function(){ var x = 3\; }';
					viewFileTest(data, 'file2', content);
				});
		});

		it('View files (6/6)', function(){
			return viewFileObject('/root/folder3')
				.then(function(data){
					viewDirTest(data, 'folder3', []);
				});
		});

		it('View a file object with a non-existent path', function(){
			return viewFileObject('/badpath')
				.then(function(data){
					expect(data).to.equal(null);
				});
		});

		// test updating a file
		it('Update a file\'s contents 1/2', function(){
			return updateFile('/root/folder1/file2', 'this is updated');
		});

		it('Update a file\'s contents 2/2', function(){
			return viewFileObject('/root/folder1/file2')
				.then(function(data){
					viewFileTest(data, 'file2', 'this is updated');
				});
		});

		/**
		 * test renaming a file
		 * 
		 * (1) test operation was successful
		 * (2) test the path for the new name exists, returns back valid content
		 * (3) test that the path for the old name DNE 
		 */
		it('Rename a file 1/3', function(){
			return renameFile('/root/folder1', 'folder1_renamed')
				.then(function(data){
					expect(data).to.equal(true);
				});
		});

		it('Rename a file 2/3', function(){
			return viewFileObject('/root/folder1_renamed')
				.then(function(data){
					viewDirTest(data, 'folder1_renamed', ['folder2', 'file2']);
				});
		});

		it('Rename a file 3/3', function(){
			return viewFileObject('/root')
				.then(function(data){
					viewDirTest(data, 'root', ['folder1_renamed', 'folder3']);
				});
		});

		/**
		 * test moving a file: 
		 *
		 * (1) test operation was successful
		 * (2) test the new path exists
		 * (3) test the old path no longer exists
		 */
		 it('Move a file 1/3', function(){
		 	return moveFile('/root/folder1_renamed', 'root/folder3')
		 		.then(function(data){
		 			expect(data).to.equal(true);
		 		});
		 });

		 it('Move a file 2/3', function(){
		 	return viewFileObject('/root/folder3/folder1_renamed')
		 		.then(function(data){
		 			viewDirTest(data, 'folder1_renamed', ['folder2', 'file2']);
		 		});
		 });

		 it('Move a file 3/3', function(){
		 	return viewFileObject('/root/folder1_renamed')
		 		.then(function(data){
		 			expect(data).to.equal(null);
		 		});
		 });

		 /** 
		  * test cloning a file:
		  * (1) test operation was successful
		  * (2) test all nested objects are cloned
		  */
		  it('Clone a file 1/2', function(){
		  	return cloneFile('/root/folder3/folder1_renamed/folder2', '/root', 'folder2_clone')
		  		.then(function(data){
		  			expect(data).to.equal(true);
		  		});
		  });

		  it('Clone a file 2/2', function(){
		  	return viewFileObject('/root/folder2_clone')
		  		.then(function(data){
		  			viewDirTest(data, 'folder2_clone', ['file1']);
		  		});
		  });

		 /**
		  * test deleting a file:
		  *
		  * (1) test operation was successful
		  * (2) test the path no longer exists for the file and all its descendants
		  */
		  it('Delete a file 1/4', function(){
		  	return deleteFile('root/folder3')
		  		.then(function(data){
		  			expect(data).to.equal(true);
		  		});
		  });

		  var files = ['/root/folder3', '/root/folder3/folder1_renamed', '/root/folder3/folder1_renamed/folder2',
		  	'/root/folder3/folder1_renamed/file2', '/root/folder3/folder1_renamed/folder2/file1'];

		  for(var i = 0; i < files.length; i++){
		  	it('Delete a file ' + i + '/' + files.length, function(){
		  		return viewFileObject(files[i]).then(function(data){
		  			expect(data).to.equal(null);
		  		});
		  	});
		  }
	});

	/** cleanup */
	after(function(){
		self.mongodb.dropCollection('fsobjects', function(err){
			self.mongodb.close();
		});
	});

 });



