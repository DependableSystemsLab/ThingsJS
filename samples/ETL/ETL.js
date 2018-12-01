var things = require('things-js');
var fs = require('fs');

var pubsubUrl = 'mqtt://test.mosquitto.org';
var components = ['Spout.js'];

var dispatcher;

function begin() {
	dispatcher = new things.Dispatcher({ pubsub_url: 'mqtt://test.mosquitto.org' });
}

function runETL() {
	var currEngines = Object.keys(dispatcher.engines);
	if (currEngines.length === 0) {
		console.log('Not enough engines to execute components');
		process.exit();
	}
	console.log('Available machines: ' + JSON.stringify(currEngines));
}


function runETL(){
	// begin all the ETL components on existing code engines
	var currEngines = Object.keys(dispatcher.engines);
	if(currEngines.length === 0){
		console.log('Not enough engines to execute components');
		return;
	}
	console.log('Available machines:' + JSON.stringify(currEngines));

	var index = 0;
	COMPONENTS.forEach(function(comp){
		try{
			var source = fs.readFileSync('./' + comp, 'utf-8');
			var engine = currEngines[index];
			console.log(engine + ' will try to execute: ' + comp);

			dispatcher.runCode(engine, comp, source).then(function(meta){
				instances[comp] = meta.id;

				pubsub.subscribe(comp + '/' + meta.id + '/resource', function(data){
					data.component = comp;
					memToCSV(data);
				});
 			});

			index = (index < currEngines.length - 1) ? ++index : 0;
		}
		catch(e){
			console.log('Problem loading a component: ' + e);
			process.exit();
		}
	});

}