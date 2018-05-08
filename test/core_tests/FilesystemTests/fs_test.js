var db = require('../../../util/gfs/db.js');
var mongoclient = require('mongodb').MongoClient;
var expect = require('chai').expect;
var should = require('chai').should();
var assert = require('chai').assert;

/**
 * A framework for testing the basic functionalities 
 * of the code repository.
 * Usage: mocha fs_basic.js
 *
 * @requires mongod service running in the background
 */
describe('filesystem unit test suite', function(){
	var self = this; 
	const TEST_DB = 'test-fs';
	const DB_URL = 'mongodb://localhost:27017/' + TEST_DB;

	/** setup */
	before(function(){
		self.db = new db(DB_URL);
		return new Promise(function(resolve){
			mongoclient.connect(DB_URL, function(err, db){
				if(err) throw err;
				else self.mongodb = db;
			});
		});
	});

	describe('fs basic unit tests', function(){

		it('Create the root directory', function(){
			this.timeout(5000);

			return self.db.createFile('root', null, false)
				.then(function(data){
					expect(data).to.equal(true);
				});
		});

		it('View a file object', function(){
			this.timeout(5000);

			return self.db.viewFileObject('root')
				.then(function(data){
					expect(data.name).to.equal('root');
				});
		});

		it('View a file object with a non-existent path', function(){
			this.timeout(5000);

			return self.db.viewFileObject('badpath/badpath')
				.then(function(data){
					expect(data).to.equal(null);
				});
		});

		it('Create a folder from a path', function(){
			return self.db.createFileFromPath('newfolder', 'root', false)
				.then(function(data){
					expect(data).to.not.equal(false);
				});
		});

		it('Create a folder with no valid parent path', function(){
			return self.db.createFileFromPath('fail', 'badroot', false)
				.then(function(data){
					expect(data).to.equal(false);
				});
		});

		
		it('Create a file from a path 1/2', function(){
			this.timeout(5000);

			return self.db.createFileFromPath('testfile', 'root', true, 'this is a test')
				.then(function(data){
					expect(data).to.not.equal(false);
				});
		});

		it('Create a file from a path 2/2', function(){
			this.timeout(5000);

			return self.db.viewFileObject('root/testfile')
				.then(function(data){
					expect(data.content).to.equal('this is a test');
				});
		});


		it('Update a file\'s contents 1/2', function(){
			this.timeout(5000);

			return self.db.updateFileFromPath('root/testfile', 'this is updated')
				.then(function(data){
					expect(data).to.not.equal(false);
				});
		});

		it('Update a file\'s contents 2/2', function(){
			this.timeout(5000);

			return self.db.viewFileObject('root/testfile')
				.then(function(data){
					expect(data.content).to.equal('this is updated');
				});	
		});

		/**
		 * tests renaming a file
		 * 
		 * (1) test operation was successful
		 * (2) test the path for the new name exists, returns back valid content
		 * (3) test that the path for the old name DNE 
		 */
		it('Rename a file 1/3', function(){
			this.timeout(5000);

			return self.db.changeNameFromPath('root/testfile', 'testfile_updated')
				.then(function(data){
					expect(data).to.not.equal(false);
				});
		});

		it('Rename a file 2/3', function(){
			this.timeout(5000);

			return self.db.viewFileObject('root/testfile_updated')
				.then(function(data){
					expect(data.content).to.equal('this is updated');
				});
		});

		it('Rename a file 3/3', function(){
			this.timeout(5000);

			return self.db.viewFileObject('root/testfile')
				.then(function(data){
					expect(data).to.equal(null);
				});
		});

	});

	/**
	 * test structure: 
	 * 
	 * root
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
	describe('Basic nested filesystem test', function(){
		before(function(){
			return new Promise(function(resolve){
				self.mongodb.dropCollection('fsobjects', function(err){
					if(err){
						throw new Error('Could not drop the collection for new tests: ' + err);
					}
					else{
						var root = self.db.makeId();
						var folder1 = self.db.makeId();
						var folder2 = self.db.makeId();
						var promises =[];

						promises.push(self.db.createFile('root', null, false, null, root));
						promises.push(self.db.createFile('folder1', root, false, null, folder1));
						promises.push(self.db.createFile('folder2', folder1, false, null, folder2));
						promises.push(self.db.createFile('folder3', root, false));
						promises.push(self.db.createFile('file1', folder2, true, 'console.log(\"Hello World\")'));
						promises.push(self.db.createFile('file2', folder1, true, 'function(){ var x = 5\; }'));

						Promise.all(promises).then(function(){
							resolve();
						});
					}
				});
			});
		});

		it('View the root from its absolute path', function(){
			this.timeout(5000);
			return self.db.viewFileObject('root')
				.then(function(data){
					assert.lengthOf(data.content, 2, 'root should have two children - folder1 and folder3');
				});
		});

		it('View file1 from its absolute path \'root/folder1/folder2/file1\'', function(){
			this.timeout(5000);
			return self.db.viewFileObject('root/folder1/folder2/file1')
				.then(function(data){
					expect(data.content).to.equal('console.log(\"Hello World\")');
				});
		});


		it('View file1 from its absolute path \'root/folder1/folder2/file1\'', function(){
			this.timeout(5000);
			return self.db.viewFileObject('root/folder1/folder2/file1')
				.then(function(data){
					expect(data.content).to.equal('console.log(\"Hello World\")');
				});
		});

		it('View folder1 and confirm that it has 2 children', function(){
			this.timeout(5000);

			return self.db.viewFileObject('root/folder1')
				.then(function(data){
					assert.lengthOf(data.content, 2, 'folder1 has 2 children');
				});
		});

		/** Test moving 'folder2' to the root directory */
		it('Test moving a file 1/3', function(){
			this.timeout(7000);

			return self.db.moveFileFromPath('root/folder1/folder2', 'root')
				.then(function(){
					return self.db.viewFileObject('root')
						.then(function(data){
							assert.lengthOf(data.content, 3, 'root should now have 3 children');
						});
				});
		});

		it('Test moving a file 2/3', function(){
			this.timeout(7000);

			return self.db.viewFileObject('root/folder1')
				.then(function(data){
					assert.lengthOf(data.content, 1, 'folder1 only has 1 child');
					expect(data.content[0].name).to.equal('file2');
				});
		});

		it('Test moving a file 3/3', function(){
			this.timeout(7000);

			return self.db.viewFileObject('root/folder2')
				.then(function(data){
					assert.lengthOf(data.content, 1, 'folder2 should still have its child');
					expect(data.content[0].name).to.equal('file1');
				});
		});

		/** clone folder1 into the folder2 directory */
		it('Clone a file 1/3', function(){
			this.timeout(7000);

			return self.db.cloneFileFromPath('root/folder1', 'root/folder2', 'folder1_clone')
				.then(function(data){
					expect(data).to.equal(true);
				});
		});

		it('Clone a file 2/3', function(){
			this.timeout(7000);

			return self.db.viewFileObject('root/folder2/folder1_clone')
				.then(function(data){
					assert.lengthOf(data.content, 1, 'folder1 should have been deep cloned');
					expect(data.content[0].name).to.equal('file2');
				});
		});

		it('Clone a file 3/3', function(){
			this.timeout(7000);

			/* original folder should not have been tampered with */
			return self.db.viewFileObject('root/folder1', function(data){
				expect(data.name).to.equal('folder1');
			});
		});

	});

    /**
     * test structure:
     *
     *  root
     *   |
     *   |---folder1
     *          |
     *          |---folder2
     *                 |
     *                 |---folder3
     *                       |
     *                       |---folder4
     *                              |
     *                              |---file: 'finally here'
     */
	describe('Linearly nested filesystem test', function(){
		before(function(){
			return new Promise(function(resolve){
				self.mongodb.dropCollection('fsobjects', function(err){
					if(err){
						throw new Error("Could not drop the collection for new tests: " + err);
					}
					else{
						// IMPORTANT ! Otherwise, it will contain references from the other tests
						self.db.clearCache();

						var root = self.db.makeId();
						var folder1 = self.db.makeId();
						var folder2 = self.db.makeId();
						var folder3 = self.db.makeId();
						var folder4 = self.db.makeId();
						var promises = [];

						promises.push(self.db.createFile('root', null, false, null, root));
						promises.push(self.db.createFile('folder1', root, false, null, folder1));
						promises.push(self.db.createFile('folder2', folder1, false, null, folder2));
						promises.push(self.db.createFile('folder3', folder2, false, null, folder3));				
						promises.push(self.db.createFile('folder4', folder3, false, null, folder4));
						promises.push(self.db.createFile('file', folder4, true, 'finally here'));

						Promise.all(promises).then(function(){
							resolve();
						});
					}
				});
			});

		});

		it('Should deep copy 1/5', function(){
			this.timeout(10000);

			return self.db.cloneFileFromPath('root/folder1', 'root', 'folder1_clone')
				.then(function(data){
					expect(data).to.not.equal(false);
				});
		});

		it('Should deep copy 2/5', function(){
			this.timeout(5000);

			return self.db.viewFileObject('/root/folder1_clone')
				.then(function(data){
					expect(data.name).to.equal('folder1_clone');
				});
		});

		it('Should deep copy 3/5', function(){
			this.timeout(5000);

			return self.db.viewFileObject('/root/folder1_clone/folder2')
				.then(function(data){
					expect(data.name).to.equal('folder2');
				});
		});

		it('Should deep copy 4/5', function(){
			this.timeout(5000);

			return self.db.viewFileObject('/root/folder1_clone/folder2/folder3')
				.then(function(data){
					expect(data.name).to.equal('folder3');
				});
		});

		it('Should deep copy 5/5', function(){
			this.timeout(5000);

			return self.db.viewFileObject('/root/folder1_clone/folder2/folder3/folder4/file')
				.then(function(data){
					expect(data.content).to.equal('finally here');
				});
		});

		it('Should deep delete 1/2', function(){
		 	this.timeout(7000);

		 	return self.db.deleteFileFromPath('root/folder1')
		 		.then(function(data){
		 			expect(data).to.equal(true);
		 		});
		});

		it('Should deep delete 2/2', function(){
		 	this.timeout(5000);

		 	return new Promise(function(resolve, reject){
		 		resolve(self.mongodb.collection('fsobjects').count());
		 	}).then(function(data){
		 		expect(data).to.equal(6);
		 	});
		});

	});

	/** cleanup */
	after(function(){
		self.mongodb.dropCollection('fsobjects', function(err){
			self.mongodb.close();
		});
	});

});

