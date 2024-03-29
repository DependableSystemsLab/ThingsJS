var things_js = require('things-js');
var pubsub = new things_js.Pubsub('mqtt://test.mosquitto.org');
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
        var wstream1 = fs.createWriteStream(write_path+'/'+data['procs'][ele]['code_name']+data['procs'][ele]['id']+'.csv');
 		if (type == "memory") {
            wstream1.write('Timestamp, rss, Heap total, Heap used, External\n');
        	  pubsub.subscribe(prefix+'/resource', function(data1) {
        	  	 console.log(data1["memory"]);
                // write to local file 
                // wstream1.write(JSON.stringify(data1["memory"])+" ");
                var values = [data1["timestamp"],data1["memory"]["rss"],
        data1["memory"]["heapTotal"],data1["memory"]["heapUsed"],data1["memory"]["external"] ];
                wstream1.write(values.join(',') + '\n');
        });
        	}
 		if (type == "cpu") {
             wstream1.write('Timestamp, cpu\n');
        	  pubsub.subscribe(prefix+'/resource', function(data1) {
        	  	 console.log(data1["cpu"]);
                // write to local file 
                var values = data1["cpu"];
                wstream1.write(values + '\n');
        
        });
        	}
        if (type == "total") {
             wstream1.write('Timestamp, rss, Heap total, Heap used, External,CPU\n');
        	  pubsub.subscribe(prefix+'/resource', function(data1) {
        	  	 console.log(data1);
                // write to local file 
                 var values = [data1["timestamp"],data1["memory"]["rss"],
        data1["memory"]["heapTotal"],data1["memory"]["heapUsed"],data1["memory"]["external"],data1["cpu"]];
                wstream1.write(values.join(',')+'\n');     
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
                wstream.write(JSON.stringify(data["memory"]+ " "));
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