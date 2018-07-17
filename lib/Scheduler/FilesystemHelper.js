var rp = require('request-promise');

const FS_URL_PATH = 'http://localhost:3000/file-system';

FilesystemHelper = function(){
	this.cur_path = '/';
	this.cur_path_tokens = function(){
		return self.cur_path.split('/');
	}
	this.cur_dir = {};
}

FilesystemHelper.prototype.joinPath = function(p1, p2){
	if(p1[p1.length - 1] === '/'){
		p1 = p1.substring(0, p1.length-1);
	}
	if(p2[0] === '/'){
		p2 = p2.substring(1);
	}
	console.log("[Filesystem Helper] Joined path: " +p1+'/'+p2);

	return p1 + '/' + p2;
}

FilesystemHelper.prototype.navigateTo = function(dir_name, reset){
	var self = this;
	if(reset){
		self.cur_path = '/';
	}
	if(dir_name === '..'){
		self.cur_path = '/' + self.cur_path_tokens().slice(0, -1).join('/');
	}
	else if(dir_name[0] === '/'){
		self.cur_path = dir_name;
	}
	else if(self.cur_path === '/'){
		self.cur_path = self.cur_path + dir_name;
	}
	else{
		self.cur_path = self.cur_path + '/' + dir_name;
	}
	console.log('[Filesystem Helper] Current path: ' + self.cur_path);
}

FilesystemHelper.prototype.checkDirExists = function(dir_name){
	var self = this;
	var options = {
		method: 'GET',
		uri: self.joinPath(self.joinPath(FS_URL_PATH, self.cur_path), dir_name),
		resolveWithFullResponse: true
	}

	return rp(options)
		.then(function(res){
			var resBodyKeys = Object.keys(JSON.parse(res.body.toString()));
			return !(res.statusCode !== 200 || resBodyKeys.includes('error'));
		})
		.catch(function(err){
			console.log('[Filesystem Helper] GET Dir error: '+err);
			return false;
		});
}

FilesystemHelper.prototype.getFile = function(file_path){
	var self = this;
	var file_data = undefined;

	var options = {
		method: 'GET',
		uri: self.joinPath(FS_URL_PATH, file_path), 
		json: true
	}

	return new Promise(function(resolve, reject){
		rp(options)
			.then(function(res_body){
				if(res_body['error']){
					reject('[Filesystem Helper] GET FILE DNE ' + file_path);
				}
				console.log('[Filesystem Helper] GET FILE success '+ file_path);
				resolve(res_body);
			})
			.catch(function(err){
				console.log('[Filesystem Helper] GET FILE error '+ err);
				reject(err);
			});
	});

}


FilesystemHelper.prototype.makeDir = function(dir_name){
	var self = this;

	var postData = {
		type: 'directory',
		name: dir_name
	}
	var options = {
		method: 'POST',
		uri: self.joinPath(FS_URL_PATH, self.cur_path),
		body: postData,
		json: true
	}

	return new Promise(function(resolve, reject){
		rp(options)
			.then(function(parsed_body){
				console.log('[Filesystem Helper] makeDir success '+ parsed_body);
				resolve();
			})
			.catch(function(err){
				console.log('[Filesystem Helper] makeDir error '+ err);
				reject(err);
			});
	});
}



FilesystemHelper.prototype.writeFile = function(target_path, file_data, file_name){
	var self = this;
	var postData = {
		'name': file_name,
		'content': JSON.stringify(file_data),
		'type': 'file'
	}
	var options = {
		method: 'POST',
		uri: self.joinPath(FS_URL_PATH, target_path),
		body: postData,
		json: true
	}

	function post(options, resolve, reject){
		rp(options).then(function(parsed_body){
			console.log('[Filesystem Helper] writeNewFile succes: '+file_name);
			resolve();
		})
		.catch(function(err){
			console.log('[Filesystem Helper] writeNewFile error: '+file_name);
			reject(err);
		});
	}

	return new Promise(function(resolve, reject){

		self.getFile(target_path + '/' + file_name).then(function(data){
			postData._id = data._id;
			console.log('[Filesystem Helper] '+file_name+ ' exists with _id '+data._id);
			post(options, resolve, reject);
		})
		.catch(function(err){
			console.log('[Filesystem Helper] '+file_name+ ' will be created');
			post(options, resolve, reject);
		});

	});

}

FilesystemHelper.prototype.deleteTarget = function(target){
	var id;
	var self = this;

	return new Promise(function(resolve, reject){

		self.getFile(self.cur_path + '/' + target).then(function(data){
			id = data._id;
			console.log('[Filesystem Helper] _id to be deleted: '+id);

			var options = {
				method: 'DELETE',
				uri: self.joinPath(FS_URL_PATH, self.cur_path) + '?ids=' + id
			}

			rp(options)
				.then(function(parsed_body){
					console.log('[Filesystem helper] DELETE target success: ' + target);
					resolve();
				})
				.catch(function(err){
					console.log('[Filesystem helper] DELETE target error: ' + target + err);
					reject(err);
				});
		})
		.catch(function(err){
			console.log('[Filesystem Helper] getFile error: '+err);
			reject(err);
		});
	});

}

module.exports = FilesystemHelper;