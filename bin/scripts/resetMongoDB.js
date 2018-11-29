if (process.argv.length < 3){
    console.log('Please specify the database url - e.g.  mongodb://localhost:27017/things-js-fs');
    console.log('To use the default url shown above, enter "default"');
    process.exit();
}

var mongoUrl = process.argv[2] === 'default' ? 'mongodb://localhost:27017/things-js-fs' : process.argv[2] ;

var path = require('path');
var fs = require('fs');
var gfs = require('things-js').GFS(mongoUrl);

var dropped = Promise.all([
	new Promise((resolve, reject)=>{
		gfs.db.collections.fsindexes.drop(function(err){
			if (err !== null) reject(err);
			else resolve();
			console.log('Dropped FSIndex collection', err);
		});
	}),
	new Promise((resolve, reject)=>{
		gfs.db.collections.fshandles.drop(function(err){
			if (err !== null) reject(err);
			else resolve();
			console.log('Dropped FSHandle collection', err);
		});
	})
]);

dropped.then(()=>{
	gfs.mkdir('/codes', function(err){
		console.log('Created directory /codes');
		var ops = [];
		// Read from samples directory and "upload" to GFS
		ops.push(new Promise((resolve, reject)=>{
	 		fs.readFile(path.resolve(__dirname, '../../samples/factorial.js'), function(rErr, data){
	 			gfs.writeFile('/codes/factorial.js', data.toString(), function(wErr){
					console.log('Created file /codes/factorial.js');
					resolve();
		 		})
		 	});
		}));
		ops.push(new Promise((resolve, reject)=>{
			fs.readFile(path.resolve(__dirname, '../../samples/video_streamer.js'), function(rErr, data){
	 			gfs.writeFile('/codes/video_streamer.js', data.toString(), function(wErr){
					console.log('Created file /codes/video_streamer.js');
					resolve();
		 		})
		 	});
		}));
		ops.push(new Promise((resolve, reject)=>{
		 	fs.readFile(path.resolve(__dirname, '../../samples/motion_detector.js'), function(rErr, data){
		 		gfs.writeFile('/codes/motion_detector.js', data.toString(), function(wErr){
					console.log('Created files /codes/motion_detector.js');
					resolve();
		 		})
		 	});
		}));
		ops.push(new Promise((resolve, reject)=>{
			gfs.mkdir('/apps', function(err){
				console.log('Created directory /apps');
				resolve();
			});
		}));
		Promise.all(ops)
			.then(()=>{
				console.log('All done.');
				process.exit();
			});
	});
});

