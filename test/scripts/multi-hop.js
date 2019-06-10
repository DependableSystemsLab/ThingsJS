// var child_process = require('child_process');
var fs = require('fs');
var Pubsub = require('../../lib/core/Pubsub.js');
var Dispatcher = require('../../lib/core/Dispatcher.js');

//1. Test Name should be provided as a command line argument. If not provided, terminate process.
if (process.argv.length < 3) {
    console.log("You must specify the test code's name >> e.g. timer_00");
    process.exit(1);
}
var testName = process.argv[2];
var testCode = fs.readFileSync('input/'+testName, 'utf8');

var cycleCount = 12;
var hopInterval = 60000;

var thingsConf = { pubsub_url: 'mqtt://192.168.0.73' };

var xeon = 'engine-xeon';
var pi3 = 'engine-pi3';
var pi0 = 'engine-pi0';

var dispatcher = new Dispatcher(thingsConf);

// var logger;

function migrate_cycle(iteration, testName, codeId){
	
	//Move from xeon -> pi3
	setTimeout(function(){
		console.log("!!! Migrate ["+testName+"] from <"+xeon+"> to <"+pi3+">");
		dispatcher.moveCode(xeon, pi3, testName, codeId)
			.then(function(result){
				console.log(result);
				console.log(">> Migrated Code ["+result.id+"] from CodeEngine ["+result.from+"] to ["+result.to+"]");
			});

		//Move from pi3 -> pi0
		setTimeout(function(){
			console.log("!!! Migrate ["+testName+"] from <"+pi3+"> to <"+pi0+">");
			dispatcher.moveCode(pi3, pi0, testName, codeId)
				.then(function(result){
					console.log(result);
					console.log(">> Migrated Code ["+result.id+"] from CodeEngine ["+result.from+"] to ["+result.to+"]");
				});

			//Move from pi0 -> xeon
			setTimeout(function(){
				console.log("!!! Migrate ["+testName+"] from <"+pi0+"> to <"+xeon+">");
				dispatcher.moveCode(pi0, xeon, testName, codeId)
					.then(function(result){
						console.log(result);
						console.log(">> Migrated Code ["+result.id+"] from CodeEngine ["+result.from+"] to ["+result.to+"]");
					});

				if (iteration > 0){
					migrate_cycle(iteration - 1, testName, codeId);
				}
				else {
					console.log('Finished... killing programs');
					// logger.kill();
					dispatcher.killCode(codeId)
						.then(function(result){
							console.log(result);
							process.exit();
						})
				}

			}, hopInterval);

		}, hopInterval);
		
	}, hopInterval);
	
	
}

function startLogger(testName){
	var logSession = Date.now();
	if (testName){
		logSession = testName+'-'+logSession;
	}
	var logFile = 'data/'+logSession+'.log';
	var log_xeon = 'data/xeon.'+logSession+'.log';
	var log_pi3 = 'data/pi3.'+logSession+'.log';
	var log_pi0 = 'data/pi0.'+logSession+'.log';
	var log_prog = 'data/'+logSession+'-prog.log';
	var log_fps = 'data/'+logSession+'-fps.log';
	// var log_pi0 = 'data/pi0.'+logSession+'.log';

	var pubsub = new Pubsub(thingsConf.pubsub_url);

	pubsub.on('ready', function(){
		console.log("[logger] : Connected to MQTT Server");
		
	// 	pubsub.subscribe("thingsjs-logs", function(msg){
	// //		console.log(msg);
	// 		var logdata = Date.now()+"\t"+msg.id+"\t"+msg.timestamp+"\t"+msg.cpu+"\t"+msg.memoryUsage.heapUsed+"\t"+(msg.event ? (msg.event.name +' '+ msg.event.data) : '')+"\n";
	// 		// console.log(logdata);
	// 		fs.appendFileSync(logFile, logdata);
	// 	});
		pubsub.subscribe("engine-xeon/resource", function(msg){
	//		console.log(msg);
			var logdata = Date.now()+"\tengine-xeon\t"+msg.timestamp+"\t"+msg.cpu+"\t"+msg.memory.heapUsed+"\t"+(msg.event ? (msg.event.name +' '+ msg.event.data) : '')+"\n";
			// console.log(logdata);
			fs.appendFileSync(log_xeon, logdata);
		});
		pubsub.subscribe("engine-pi3/resource", function(msg){
	//		console.log(msg);
			var logdata = Date.now()+"\tengine-pi3\t"+msg.timestamp+"\t"+msg.cpu+"\t"+msg.memory.heapUsed+"\t"+(msg.event ? (msg.event.name +' '+ msg.event.data) : '')+"\n";
			// console.log(logdata);
			fs.appendFileSync(log_pi3, logdata);
		});
		pubsub.subscribe("engine-pi0/resource", function(msg){
	//		console.log(msg);
			var logdata = Date.now()+"\tengine-pi0\t"+msg.timestamp+"\t"+msg.cpu+"\t"+msg.memory.heapUsed+"\t"+(msg.event ? msg.event.name : '')+"\n";
			// console.log(logdata);
			fs.appendFileSync(log_pi0, logdata);
		});
		pubsub.subscribe("things-videostream/stats", function(msg){
	//		console.log(msg);
			var logdata = Date.now()+"\t"+msg.frame+"\t"+msg.started+"\t"+msg.finished+"\t"+(msg.finished - msg.started)+"\n";
			// console.log(logdata);
			fs.appendFileSync(log_fps, logdata);
		});
		
	})

	return {
		logProgram: function(code_name, code_id){
			pubsub.subscribe(code_name+'/'+code_id+"/resource", function(msg){
		//		console.log(msg);
				var logdata = Date.now()+"\t"+code_name+"\t"+msg.timestamp+"\t"+msg.cpu+"\t"+msg.memory.heapUsed+"\t"+(msg.event ? msg.event.name : '')+"\n";
				// console.log(logdata);
				fs.appendFileSync(log_prog, logdata);
			});
		}
	}
}

var logger = startLogger();
setTimeout(function(){
	// console.log("!!! Starting Test !!!");

	// dispatcher.on('ready', function(){
		console.log("!!! Dispatch ["+testName+"] to <"+xeon+">");
		
		dispatcher.runCode(xeon, testName, testCode)
		.then(function(result){
			console.log(result);
			logger.logProgram(result.code_name, result.id);
			console.log(">> Running Code ["+result.id+"] on CodeEngine ["+result.engine+"]");
			
			migrate_cycle(cycleCount, result.code_name, result.id);
			
		});
		
	// });
	
}, 5000);
