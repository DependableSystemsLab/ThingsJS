var express = require('express');
var ThingsDatabase = require('./db.js')
var bodyParser = require('body-parser');
var app = express();

/** Hardcoded URL for testing **/
var mongoURL = 'mongodb://localhost:27017/things-filesystem'

/** POST request parsing **/
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(function(req, res, next){
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
})

var db = new ThingsDatabase(mongoURL, pathHandler);

/* This function is passed to the ThingsDatabase to create
 * dynamic routes once a new file is added
 *
 * route - the path to the file, e.g. /sensors/temperature/sensorCode1.js
 *
 */
function pathHandler(route){
	app.get(route, function(req,res){
		db.viewContents(route).then(function(data){
			res.json(data);
			res.end();
		});
	});
}


/*************** The following code is for testing only ********************/

/*   
 *   |    
 *   -----folder1
 *   |      |          
 *   |      ----folder2
 *   |      	 |
 *   |      	 ----code.js : "Wow! This is a file"
 *   |
 *   |---file.js : "This is another file!"
 */


app.get('/createFiles', function(req, res){
	db.createFile('folder1', '/');
	db.createFile('folder2', '/folder1');
	db.createFile('code.js', '/folder1/folder2', 'Wow! This is a file');
	db.createFile('file1.js', '/', 'This is another file!');
});

app.get('/', function(req, res){
	db.viewContents('/').then(function(data){
		res.json(data);
		res.end();
	})
})

/*****************************************************************************/

app.set('port', (process.env.PORT || 5000));
app.use(express.static(__dirname));

app.listen(app.get('port'), function(){
	console.log("Node app is running at localhost:" + app.get('port'))
});