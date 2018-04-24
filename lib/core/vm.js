process.once('message', function(message){
	eval(message.code);
	// if (message.options){
	// 	if (message.options.enableStats){
	// 		setInterval(function(){
	// 			process.send(process.memoryUsage())
	// 		}, 1000);
	// 	}
	// }
})