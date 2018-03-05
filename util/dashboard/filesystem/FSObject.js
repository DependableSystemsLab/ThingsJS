var mongoose = require('mongoose');
var Schema = mongoose.Schema;
mongoose.Promise = global.Promise;

/* An fs object
 */
var FileSystemSchema = new Schema({
	_id     : Schema.Types.ObjectId,
	name    : String,
	created : {type: Date, default: Date.now },
	updated : Date,
	type    : { type: String, enum: ['directory', 'file'] },
	content : String,
	parent  : { type: Schema.Types.ObjectId, ref: 'FSObject' },
	nodes   : [{ type: String }] 
})

/* guarantee uniqueness of name - parent */
FileSystemSchema.index({ name: 1, parent: 1 }, { unique: true });


/* Retrieve all contents from the f/s
 */
FileSystemSchema.methods.getAllObjects = function(){
	return this.model('FSObject')
		.find({})
		.lean()
		.exec();
}

FileSystemSchema.methods.getFileObjectById = function(id){
	return this.model('FSObject')
		.findOne({ _id: id })
		.lean()
		.exec();
}

/* Overwrite the contents of a file
 * precondition: file object must be of type 'file'
 */
FileSystemSchema.methods.overwriteFile = function(id, newContent){
	return this.model('FSObject')
		.findOne({ _id : id })
		.update({ $set: { content: newContent, updated: new Date() }})
		.exec();
}

/* Return all the file objects with a matching name
 * @param name : name to match
 */
FileSystemSchema.methods.getObjectsByName = function(name){
	return this.model('FSObject')
		.find({ name : name })
		.lean()
		.exec();
}

/* Retrieve a file object based on its name and parentId
 * @param name     : name of the object
 * @param parentId : _id field of the parent for this object 
 * 
 */
FileSystemSchema.methods.getFileObject = function(name, parentId){
	console.log('<T> FSObject.js -- getFileObject - name: ' + name);
	console.log('<T> FSObject.js -- getFileObject - parentID: ' + parentId);
	return this.model('FSObject')
		.findOne({ name : name, parent: parentId })
		.lean()
		.exec();
}

/* Delete a file object and all its children
 */
FileSystemSchema.methods.deleteFileObject = function(id){
	return this.model('FSObject')
		.find({ $or: [{ _id: id }, { parent: id }] })
		.remove()
		.exec();
}

/* Retrieve the children of a directory 
 * @param id : _id field of the directory
 */
FileSystemSchema.methods.getChildren = function(id){
	return this.model('FSObject')
		.find({ parent: id })
		.lean()
		.exec();
}

/* moves a file object
 * @param id          : _id field of the object
 * @param newParentId : new parent of the object 
 */
FileSystemSchema.methods.updateParent = function(id, newParentId){
	return this.model('FSObject')
		.find({ _id: id })
		.update({ $set: { parent: newParentId } })
		.exec();
}

/* rename a file object
 * @param id      : _id field of the object
 * @param newName : the new name of the object
 */
FileSystemSchema.methods.updateName = function(id, newName){
	return this.model('FSObject')
		.find({ _id: id })
		.update({ $set: { name: newName } })
		.exec();
}

var FSObject = mongoose.model('FSObject', FileSystemSchema);

module.exports = FSObject;
