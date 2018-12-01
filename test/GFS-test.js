var helpers = require('../lib/helpers.js');
var assert = require('chai').assert;
var expect = require('chai').expect;
var should = require('chai').should();
var request = require('request');

var mongourl = 'mongodb://localhost:27017/things-js-fs-test';

describe('GFS Userland API', function(){
	var self = this;
	var testPath = '/'+helpers.randKey()+'.js';
	var testDir = '/'+helpers.randKey();

	var gfs;
	it('Should require without error', function(){
		gfs = require('things-js').GFS(mongourl);
	})

	/**
	 * R/W
	 */
	describe('R/W tests', function(){
		var content = 'hello world';

		it('Write a new file', function(done){
			gfs.writeFile(testPath, Date.now(), function(err){
				expect(err).to.eql(null);
				done();
			});
		});

		it('Read an existing file', function(done){
			gfs.readFile(testPath, function(err, data){
				expect(err).to.eql(null);
				expect(isNaN(data.toString())).to.eql(false);
				done();
			});
		});

		it('The data read and passed to the callback is a Buffer', function(done){
			gfs.readFile(testPath, function(err, data){
				assert.equal(data instanceof Buffer, true);
				done();
			});
		});

		it('Read a nonexistent file', function(done){
			gfs.readFile('/NONEXISTENTPATH', function(err, data){
				expect(err).to.be.instanceOf(Error);
				done();
			});
		});

		it('Write to an existing file', function(done){
			gfs.writeFile(testPath, content, function(err){
				expect(err).to.eql(null);
				done();
			});
		});

		it('Read back a write update', function(done){
			gfs.readFile(testPath, function(err, data){
				expect(err).to.eql(null);
				expect(data.toString()).to.eql(content);
				done();
			});
		});

		it('Create a directory', function(done){
			gfs.mkdir(testDir, function(err){
				expect(err).to.eql(null);
				done();
			});
		});

		it('Read a directory', function(done){
			gfs.readdir(testDir, function(err, files){
				expect(err).to.eql(null);
				assert.equal(files instanceof Array, true);
				done();
			});
		});

		it('Remove a directory', function(done){
			gfs.rmdir(testDir, function(err){
				expect(err).to.eql(null);
				done();
			});
		});

	});

	describe('Append tests', function(){
		var str = 'hello*';
		var numAppends = 5;

		function append(count){
			it('Append count: ' + count, function(done){
				gfs.appendFile(testPath, str, function(err){
					expect(err).to.eql(null);

					gfs.readFile(testPath, function(err, data){
						expect(err).to.eql(null);
						var tokens = data.toString().split('*');
						expect(tokens.length).to.eql(count + 2);
						done();
					});
				});
			});
		}

		for(j = 0; j < numAppends; j++){
			append(j);
		}
	});

	describe('Delete tests', function(){

		it('Delete a nonexistent file', function(done){
			this.timeout(10000);
			gfs.unlink('/NONEXISTENTPATH', function(err){
				expect(err).to.be.instanceOf(Error);
				done();
			});
		});

		it('Delete a file', function(done){
			this.timeout(10000);
			gfs.unlink(testPath, function(err){
				expect(err).to.eql(null);
				done();
			});
		});
 	});
})

describe('GFS RESTful API', function(){
	var gfs = require('../lib/core/GFS.js').devland;
	var testFile = helpers.randKey()+'_txt';
	var testContent = helpers.randKey(100);

	it('Starts up a standalone server', function(done){
		var rest = gfs.createServer(3000, mongourl, function(){
			done();
		});
	});

	it('can read the root directory via get request', function(done){
		request('http://localhost:3000', { json: true }, function(error, response, data){
			expect(data.type).to.equal('directory');
			done();
		})
	});

	it('can write file via post request', function(done){
		request.post('http://localhost:3000', { 
			json: true, 
			body: {
				type: 'file',
				name: testFile,
				content: testContent
			} 
		}, function(error, response, data){
			// console.log(body);
			// var data = JSON.parse(body);
			// console.log(data);
			expect(data.type).to.equal('file');
			expect(data.content).to.equal(testContent);
			done();
		})
	});

	it('can read file via get request', function(done){
		request('http://localhost:3000/'+testFile, { json: true }, function(error, response, data){
			// console.log(body);
			// var data = JSON.parse(body);
			// console.log(data);
			expect(data.type).to.equal('file');
			expect(data.content).to.equal(testContent);
			done();
		})
	});

	it('can delete file via get request', function(done){
		request.delete('http://localhost:3000/'+testFile, { json: true }, function(error, response, data){
			// console.log(body);
			// var data = JSON.parse(body);
			// console.log(data);
			expect(data.type).to.equal('file');
			expect(data.path).to.equal('/'+testFile);
			// expect(data.content).to.equal(testContent);
			done();
		})
	});

})