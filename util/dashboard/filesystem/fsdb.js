var mongo = require('mongodb');
var mongoose = require('mongoose');
var FSObject = require('./FSObject.js');
var Schema = mongoose.Schema;

/* @param host        : e.g. mongodb://localhost:27017/<database>
 * @param pathHandler : handler to call when a new path is added
 */
function ThingsDatabase(host, pathHandler){
	this.host = host;
	this.db = undefined;
	this.paths = [];
	this.pathHandler = pathHandler;

	this.initialize();
}

ThingsDatabase.prototype.initialize = function(){
	var self = this;
	mongoose.connect(self.host);

	mongoose.connection.on('connected', function(){
		console.log('Connected to mongodb at: ' + self.host);
		self.db = mongoose.connection;
		self.initPaths();
	})

	mongoose.connection.on('error', function(err){
		console.log('Mongoose connection error: ' + err);
	})
}

/* Initializes all routing for files currently in 
 * the database
 */
ThingsDatabase.prototype.initPaths = function(){
	var self = this;
	self._getExistingPaths().then(function(paths){		
		for(var i = 0; i < paths.length; i++){
			self.paths.push(paths[i]['path']);
			self.pathHandler(paths[i]['path']);
		}
	});
}

/* Helper function to fetch all paths from the database,
 * used by ThingsDatabase.prototype.initPaths to initialize
 * existing paths on startup
 */
ThingsDatabase.prototype._getExistingPaths = function(){
	var fs = new FSObject;
	return fs.getAllPaths();
}

/* Meant to be only called within the ThingsDatabase to
 * add a new path to the routing when a file is saved
 */
ThingsDatabase.prototype._addPath = function(path){
	this.paths.push(path);
	this.pathHandler(path);
}


 /* View all the contents of a file/directory
  *
  * If the path points to a directory, it will display
  * an array of all its child nodes
  *
  * Otherwise, it will output the contents of the file
  * (Only .js extension supported)
  */
ThingsDatabase.prototype.viewContents = function(path){
	var isFile = new RegExp('\.js$');
	var fs = new FSObject();

	if(isFile.test(path)){
		return fs.getFileObject(path);
	} else{
		return fs.getImmediateChildren(path);
	}
}

/* @param name        : name of the file or directory
 * @param parentPath  : path of the parent, e.g. '/' if it belongs in the root
 * @param code        : contents a file (namely javascript)
 */
ThingsDatabase.prototype.createFile = function(name, parentPath, code){
	var self = this;
	var newPath = (parentPath == '/') ? (parentPath + name) : (parentPath + '/' + name);
	console.log('Path of the file is: ' + newPath);

	var dir = new FSObject({
		_id  : new mongoose.Types.ObjectId(),
		name : name,
		path : newPath,
	});
	if(code){
		dir.content = code;
	}
	dir.save(function(err){
		if(err){
			console.log('Error: ' + err);
		}
		self._addPath(newPath);
		console.log('File '  + name + ' created.');
	});
}

ThingsDatabase.prototype.deleteFile = function(path){
}

ThingsDatabase.prototype.moveDirectory = function(path, targetPath){
}


module.exports = ThingsDatabase;

