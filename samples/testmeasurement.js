var things_js = require('things-js');
var pubsub = new things_js.Pubsub();
var fs = require('fs');

// (function begin() {

// node resource 
var args = process.argv.slice(2);
var channel = args[0];
var write_path = args[1];
// type: cpu /memory /total
var type = args[2];

console.log("start detecting " + channel);

// var programarray = [];
if (channel == 'engine-registry/bcast') {

    pubsub.publish('engine-registry/bcast', { ctrl: 'report' });
    pubsub.subscribe('engine-registry', function(data) {

        console.log(Object.keys(data['procs']));
        // data['procs']
        // ['code_name: 'CsvToSenML.js'
        var programarray = Object.keys(data['procs']);

        programarray.forEach(function(ele){
        var prefix = data['procs'][ele]['code_name']+'/'+data['procs'][ele]['id'];
        console.log(prefix);
        var wstream1 = fs.createWriteStream(write_path+'/'+data['procs'][ele]['code_name']+data['procs'][ele]['id']+'.json');
 		if (type == "memory") {

        	  pubsub.subscribe(prefix+'/resource', function(data1) {
        	  	 console.log(data1["memory"]["heapUsed"]);
                // write to local file 
                wstream1.write(JSON.stringify(data1["memory"]["heapUsed"])+" ");
        
        });
        	}
 		if (type == "cpu") {

        	  pubsub.subscribe(prefix+'/resource', function(data1) {
        	  	 console.log(data1["cpu"]);
                // write to local file 
                wstream1.write(JSON.stringify(data1["cpu"]));
        
        });
        	}
        if (type == "total") {

        	  pubsub.subscribe(prefix+'/resource', function(data1) {
        	  	 console.log(data1);
                // write to local file 
                wstream1.write(JSON.stringify(data1));
        
        });
        	}
    });
});
} else {
var wstream = fs.createWriteStream(write_path);
    if (type == "memory") {
        pubsub.on('ready', function() {
            pubsub.subscribe(channel, function(data) {
                console.log(data["memory"]["heapUsed"]);
                // write to local file 
                wstream.write(JSON.stringify(data["memory"]["heapUsed"]));
                // plot 
            });

        });
    }
    if (type == "cpu") {
        pubsub.on('ready', function() {
            pubsub.subscribe(channel, function(data) {
                console.log(data["cpu"]);
                // write to local file 
                wstream.write(JSON.stringify(data["cpu"]));
                // plot 
            });
        });
    }

    if (type == "total") {
        pubsub.on('ready', function() {
            pubsub.subscribe(channel, function(data) {
                console.log(data);
                // write to local file 
                wstream.write(JSON.stringify(data));
                // plot 
            });
        });
    }
}