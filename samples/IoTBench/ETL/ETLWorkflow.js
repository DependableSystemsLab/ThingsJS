var things = require('things-js');
var fs = require('fs');
var gfs = require('FSServer');

/* components need to be loaded in OPPOSITE ORDER */
// TODO: generalize this later on for other benchmarks ... we can pass in the components as an arg
const COMPONENTS = 
[
// 'CsvToSenML.js', 'Annotate.js', 'Interpolation.js',
// 'BloomFilterCheck.js', 'RangeFilterCheck.js', 

'../SenMLParse.js', '../SenMLSpout.js'];

var instances = {};
var noHeader = true;
var dispatcher, pubsub, logger;

(function begin(){
	dispatcher = new things.Dispatcher();
	pubsub = new things.Pubsub();
	logger = fs.createWriteStream('ETLStats_' + Date.now() + '.csv');

	dispatcher.on('ready', function(){
		pubsub.on('ready', function(){
			setTimeout(runETL, 2000);
		});
	});

})();
// mkdir RIOT/ETL folder if not exist 
// save file inside 
function memToCSV(data){
	if(noHeader){
		logger.write('Component, Timestamp, rss, Heap total, Heap used, External\n');
		noHeader = false;
	}
	var values = [data.component, data.timestamp, data.memory.rss,
		data.memory.heapTotal, data.memory.heapUsed, data.memory.external];

	logger.write(values.join(',') + '\n');
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