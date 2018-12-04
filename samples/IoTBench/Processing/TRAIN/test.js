var things = require('things-js');
var mongoUrl = 'mongodb://localhost:27017/things-js-fs';
var GFS = require('things-js').GFS(mongoUrl);

GFS.readFile('./TAXI_properties.json', function(err, data) {
	if (err) throw err;
	console.log(data);
});