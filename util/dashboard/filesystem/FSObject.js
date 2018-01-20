var mongoose = require('mongoose');
var Schema = mongoose.Schema;
mongoose.Promise = global.Promise;

/* path: full path of the file, e.g. /sensors/temperature/sensor1.js
 * name: file name              e.g. sensor1.js
 */
var FileSystemSchema = new Schema({
	_id     : Schema.Types.ObjectId,
	name    : String,
	path    : { type: String, unique: true },
	content : String
})

/* Retrieve all contents from the f/s
 */
FileSystemSchema.methods.getAllPaths = function(){
	return this.model('FSObject')
		.find({})
		.select('path')
		.exec();
}

FileSystemSchema.methods.getFileObject = function(path){
	return this.model('FSObject')
		.findOne({ path: path })
		.exec();
}

FileSystemSchema.methods.getImmediateChildren = function(path){
	path.replace(/\//g, '\\/');
	var regex = new RegExp('^'+'('+path+')'+'\/*[0-9a-zA-Z\\.]*[^\/]$');

	return this.model('FSObject')
		.find({ path: { $regex: regex }})
		.exec();
}

FileSystemSchema.methods.getAllDescendants = function(path){
	path.replace(/\//g, '\\/');
	var regex = new RegExp('^'+'('+path+')');

	return this.model('FSObject')
		.find({ path: { $regex: regex }})
		.exec();
}

var FSObject = mongoose.model('FSObject', FileSystemSchema);

module.exports = FSObject;
