var assert = require('assert');
var expect = require('chai').expect;
var should = require('chai').should();
var sinon = require('sinon');

var http = require('http');
var express = require('express');
var helmet = require('helmet');
var FSServer = require('../lib/things.js').addons.FSServer;
var mongoclient = require('mongodb').MongoClient;

describe('REST API', function(){
	var self = this;
	this.mongourl = 'mongodb://localhost:27017/things-js-test-fs';
	this.port = 3030;
	this.fsurl = 'localhost';
	this.fspath = '/fs';
	this.folders = ['folder1', 'folder2', 'folder3'];
	this.files = {
		'file1': 'hello world',
		'file2': '12345'	
	}

	// initialize the test server
	before(function(done){
		this.timeout(10000);
		var app = express();
		var router = express.Router();

		app.use(express.json());
		app.use(helmet());
		app.use(express.urlencoded({ extended: true }));

		var gfs = new FSServer(self.mongourl, router);
		app.use(self.fspath, router);

		self.server = http.createServer(app).listen(self.port, done);
	});

	function makehttp(method, path, body){
		console.log(self.fsurl, self.port, path);
		var options = {
			method: method,
			host: self.fsurl,
			port: self.port, 
			path: self.fspath + path,
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
					resolve(JSON.parse(reply));
				});
			})
			.on('error', function(){
				throw new Error();
			});
			if(body){
				req.write(JSON.stringify(body));
			}
			req.end();
		});	
	}

	it('Fetch the root directory', function(){	
		this.timeout(5000);

		return makehttp('GET', '/').then(function(res){
			expect(res.abs_path).to.eql('/');
		});
	});

	it('Create a folder in the root directory', function(){
		this.timeout(5000);

		var body = {
			type: 'directory',
			name: self.folders[0]
		}

		return makehttp('POST', '/', body).then(function(res){
			expect(res).to.exist;
		});
	});

	it('Fetch the newly created folder', function(){
		this.timeout(5000);

		return makehttp('GET', '/'+self.folders[0]).then(function(res){
			expect(res.name).to.eql(self.folders[0]);
			expect(Object.keys(res.children).length).to.eql(0);
		});
	});

	it('Create a file in the root directory', function(){
		this.timeout(5000);

		var fname = Object.keys(self.files)[0];
		var body = {
			type: 'file',
			name: fname,
			content: self.files[fname]
		}

		return makehttp('POST', '/', body).then(function(res){
			expect(res).to.exist;
		});
	});

	it('Fetch the newly created file', function(){
		this.timeout(5000);
		var fname = Object.keys(self.files)[0];

		return makehttp('GET', '/'+fname).then(function(res){
			expect(res.name).to.eql(fname);
			expect(res.content).to.eql(self.files[fname]);
		});
	});

	it('Create a file in a subdirectory', function(){
		this.timeout(5000);

		var fname = Object.keys(self.files)[1];
		var body = {
			type: 'file',
			name: fname,
			content: self.files[fname]
		}

		return makehttp('POST', '/'+self.folders[0], body).then(function(res){
			expect(res).to.exist;
		});
	});

	it('Fetch the file within the subdirectory', function(){
		this.timeout(5000);
		var fname = Object.keys(self.files)[1];
		var fpath = '/' + self.folders[0] + '/' + fname;

		return makehttp('GET', fpath).then(function(res){
			expect(res.name).to.eql(fname);
			expect(res.content).to.eql(self.files[fname]);
		});
	});

	it('Check that the subdirectory has reference to the new file', function(){
		this.timeout(5000);
		var fname = Object.keys(self.files)[1];

		return makehttp('GET', '/'+self.folders[0]).then(function(res){
			expect(res.children[fname]).to.exist;
		});
	});

	it('Delete a file', function(){
		this.timeout(5000);
		var fname = Object.keys(self.files)[0];
		return makehttp('GET', '/'+fname).then(function(res){
			return makehttp('DELETE', '/?ids='+res._id).then(function(data){
				expect(data).to.exist;
			});
		});
	});

	it('Try accessing a deleted file', function(){
		this.timeout(5000);
		var fname = Object.keys(self.files)[0];

		return makehttp('GET', '/'+fname).then(function(res){
			expect(res.error).to.exist;
		});
	});

	it('Delete a non-empty folder', function(){
		this.timeout(5000);
		return makehttp('GET', '/'+self.folders[0]).then(function(res){
			return makehttp('DELETE', '/?ids='+res._id).then(function(data){
				expect(data).to.exist;
			});
		});
	});

	it('Try to access a file from within the deleted folder', function(){
		this.timeout(5000);
		var fpath = '/' + self.folders[0] + Object.keys(self.files)[1];
		return makehttp('GET', fpath).then(function(res){
			expect(res.error).to.exist;
		});
	});


	after(function(){
		// drop the entire test db
		mongoclient.connect(self.mongourl, { useNewParser: true }, function(err, db){
			db.dropCollection('fsobjects', function(){
				db.close();
			});
		});
		self.server.close();
	});

});



