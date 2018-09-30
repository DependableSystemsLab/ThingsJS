var assert = require('assert');
var GFS = require('../lib/things.js').addons.gfs;
var helpers = require('../lib/helpers.js');
var expect = require('chai').expect;
var should = require('chai').should();
var fs = require('fs');
var mqtt = require('mqtt');
var mosca = require('mosca');
var sinon = require('sinon');


describe('API tests', function(){
	var self = this;
	this.mongourl = 'mongodb://localhost:27017/things-js-fs-test';
	this.fpaths = ['/test.txt', '/append.txt'];

	// initialize the gfs
	before(function(done){
		self.gfs = GFS(self.mongourl);
		setTimeout(done, 1000);
	});

	/**
	 * R/W
	 */
	describe('R/W tests', function(){
		var content = 'hello world';

		it('Write a new file', function(){
			var fpath = self.fpaths[0];

			return new Promise(function(resolve){
				self.gfs.writeFile(fpath, Date.now(), function(err){
					resolve(err);
				});
			}).then(function(res){
				// no error was thrown
				expect(res).to.eql(null);
			})
		});

		it('Read an existing file', function(){
			var fpath = self.fpaths[0];

			return new Promise(function(resolve){
				self.gfs.readFile(fpath, function(err, data){
					expect(err).to.eql(null);
					resolve(data);
				});
			}).then(function(res){
				expect(isNaN(res.toString())).to.eql(false);
			});
		});

		it('Write to an existing file', function(){
			var fpath = self.fpaths[0];

			return new Promise(function(resolve){
				self.gfs.writeFile(fpath, content, function(err){
					resolve(err);
				});
			}).then(function(res){
				expect(res).to.eql(null);
			});
		});

		it('Read back a write update', function(){
			var fpath = self.fpaths[0];

			return new Promise(function(resolve){
				self.gfs.readFile(fpath, function(err, data){
					expect(err).to.eql(null);
					resolve(data);
				});
			}).then(function(res){
				expect(res.toString()).to.eql(content);
			});
		});

	});

	describe('Append tests', function(){
		var str = 'hello*';
		var numAppends = 5;
		var fpath = self.fpaths[1];

		function append(count){
			function readBack(cb){
				self.gfs.readFile(fpath, function(err, data){
					expect(err).to.eql(null);
					cb(data.toString());
				});
			}

			it('Append count: ' + count, function(){
				return new Promise(function(resolve){
					self.gfs.appendFile(fpath, str, function(err){
						expect(err).to.eql(null);
						readBack(resolve);
					});
				}).then(function(res){
					var tokens = res.split('*');
					expect(tokens.length).to.eql(count + 2);
				});
			});
		}

		for(j = 0; j < numAppends; j++){
			append(j);
		}
	});

	describe('Delete tests', function(){

		it('Delete a nonexistent file', function(){
			this.timeout(10000);

			return new Promise(function(resolve){
				self.gfs.deleteFile('DNE', function(err){
					resolve(err);
				})
			}).then(function(res){
				expect(res).to.be.instanceOf(Error);
			});
		});

		function deleteFile(file){
			function readBack(cb){
				return self.gfs.readFile(file, function(err, data){
					return expect(err).to.be.instanceOf(Error);
				});
			}

			it('Delete ' + file, function(){
				return self.gfs.deleteFile(file, function(err){
					expect(err).to.eql(null);
					return readBack();
				});
			});
		}

		self.fpaths.forEach(function(filepath){
			deleteFile(filepath);
		});
 	});

});
