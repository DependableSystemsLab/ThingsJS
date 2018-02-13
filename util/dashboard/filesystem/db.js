var mongoose = require('mongoose');
var Schema = mongoose.Schema;
mongoose.Promise = global.Promise;

/* An fs object
 *
 * name     : name of object, eg. 'code.js'
 * created  : date of object creation
 * updated  : date of modification to file
 * type     : either 'file' or 'directory'
 * path     : abs path, eg. '/temp/js/code.js'
 * parent   : path of parent directory, eg. '/temp/js'
 *
 */
var FileSystemSchema = new Schema({
	_id     : Schema.Types.ObjectId,
	name    : String,
	created : {type: Date, default: Date.now },
	updated : Date,
	type    : { type: String, enum: ['directory', 'file'] },
	path    : { type: String, unique: true, index: true },
	content : String,
	parent  : { type: String, ref: 'FSObject' } 
})

/* Retrieve all contents from the f/s
 */
FileSystemSchema.methods.getAllPaths = function(){
	return this.model('FSObject')
		.find({})
		.select('path')
		.exec();
}

/* Overwrite the contents of a file
 */
FileSystemSchema.methods.overWriteFile = function(path, newContent){
	return this.model('FSObject')
		.findOne({ path: path })
		.update({ $set: { content: newContent, updated: Date.now }})
		.exec();
}

/* Retrieve an entire file object
 */
FileSystemSchema.methods.getFileObject = function(path){
	return this.model('FSObject')
		.findOne({ path: path })
		.exec();
}

/* Retrieve the children of a directory
 */
FileSystemSchema.methods.getChildren = function(path){
	return this.model('FSObject')
		.find({ parent: path })
		.exec();
}

/* Retrieve both the children and the directory meta-data
 */
FileSystemSchema.methods.getChildrenAndSelf = function(path){
	return this.model('FSObject')
		.find({ $or: [{ parent: path }, { path: path }] })
		.exec();
}

/* Uses regex to find children -- not in use
 */
FileSystemSchema.methods.getImmediateChildren = function(path){
	path.replace(/\//g, '\\/');
	var regex = new RegExp('^'+'('+path+')'+'\/*[0-9a-zA-Z\\.]*[^\/]$');

	return this.model('FSObject')
		.find({ path: { $regex: regex }})
		.exec();
}

/* Uses regex to delete self and children -- not in use
 */
FileSystemSchema.methods.deleteFileObject = function(path){
	path.replace(/\//g, '\\/');
	var regex = new RegExp('^'+'('+path+')');

	return this.model('FSObject')
		.deleteMany({ path: { $regex: regex }})
		.exec();
}

/* moves a file object
 * NEEDS TO BE OPTIMIZED
 */
FileSystemSchema.methods.updateParent = function(path, newPath, callback, context){
	var self = this;
	var updatedPaths = [];
	// should put this in a utility function
	oldParent = path.split('/');
	oldParent = oldParent.splice(0, oldParent.length-1);
	oldParent = oldParent.join('/');
	if(!oldParent){
		oldParent = '/';
	}

	newParent = newPath.split('/');
	var temp = newParent.splice(0, newParent.length-1);
	newName = newParent.toString();
	newParent = temp;
	newParent = newParent.join('/');
	if(!newParent){
		newParent = '/';
	}

	console.log("oldParent: " + oldParent + " newParent: " + newParent + " newName: " + newName);

	// Call to update all parent pointers 
	var updateParentPointers = function(doc, parentPath){
		var name = doc.name;
		var newPath = (parentPath == '/') ? (parentPath + name) : (parentPath + '/' + name);
		console.log("new parent path: " + newPath);

		// update object 
		this.model('FSObject').find({ path: doc.path })
			.update({$set: { parent: parentPath, path: newPath }})
			.exec(function(){
			});
		// recursively update children
		this.model('FSObject').find({ parent: doc.path })
			.exec(function(err, docs){
				if(!docs){
					return;
				}
				docs.map(function(doc){
					return updateParentPointers.call(self, doc, newPath);
				});
			});
	}

	/* - Check that the path of the new parent is valid
	 * - If it is, we update the file or directory 
	 * - Then, we must update all the children (if the modified object is a directory)
	 *
	 */
	var isValid = this.model('FSObject').find({ path : newParent }).limit(1).size();
	if(isValid){
		// update object 
		this.model('FSObject').find({ path: path })
			.update({$set: { path: newPath, name: newName, parent: newParent }})
			.exec(function(){
			});
		// update this object's children
		this.model('FSObject').find({ parent: path })
			.exec(function(err, docs){
				if(!docs){
					return;
				}
				docs.map(function(doc){
					return updateParentPointers.call(self, doc, newPath);
				});
			});
	}	
}



var FSObject = mongoose.model('FSObject', FileSystemSchema);


module.exports = FSObject;
