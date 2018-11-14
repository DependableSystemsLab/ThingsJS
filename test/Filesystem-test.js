// var assert = require('assert');
// var GFS = require('../lib/things.js').addons.gfs;
var helpers = require('../lib/helpers.js');
var assert = require('chai').assert;
var expect = require('chai').expect;
var should = require('chai').should();
var fs = require('fs');
var mqtt = require('mqtt');
var mosca = require('mosca');
var sinon = require('sinon');


describe('API tests', function(){
	var self = this;
	var mongourl = 'mongodb://localhost:27017/things-js-fs-test';
	var testPath = '/'+helpers.randKey();

	var gfs;
	it('Should require without error', function(){
		gfs = require('things-js').addons.gfs(mongourl);
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
			gfs.readFile('NONEXISTENTPATH', function(err, data){
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

		// function deleteFile(file){
		// 	function readBack(cb){
		// 		return gfs.readFile(file, function(err, data){
		// 			return expect(err).to.be.instanceOf(Error);
		// 		});
		// 	}

		// 	it('Delete ' + file, function(){
		// 		return gfs.deleteFile(file, function(err){
		// 			expect(err).to.eql(null);
		// 			return readBack();
		// 		});
		// 	});
		// }

		// self.fpaths.forEach(function(filepath){
		// 	deleteFile(filepath);
		// });
 	});

});
