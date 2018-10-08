var things_js = require('things-js');
var mongoUrl = 'mongodb://localhost:27017/things-js-fs';
var GFS = require('things-js').addons.gfs(mongoUrl);
var fs = require('fs');
console.log('\x1b[44m%s\x1b[0m', '[FSCOMMUNICATION Service] START UPLOADING FILES FOR BENCHMARK...');
var file_data = {'test':3003};

var ETLGFS = fs.readFileSync('./benchETLGFS.json');
var STATGFS = fs.readFileSync('./benchSTATGFS.json');
var TRAINGFS = fs.readFileSync('./benchTRAINGFS.json');
var PREDGFS = fs.readFileSync('./benchPREDGFS.json');

var MetaData = fs.readFileSync('./taxi-metadata-fulldataset.txt');
var AnnotateData = fs.readFileSync('taxi-schema_with_annotation.csv');
var RawData  =  ;
var Properties =   ;

GFS.writeFile('RIOT/taxi-schema_with_annotation.csv', annotatedata, function(err){
  if (err) throw err;
})


console.log('\x1b[44m%s\x1b[0m', '[FSCOMMUNICATION Service] TESTINGDATA'+readdata);
