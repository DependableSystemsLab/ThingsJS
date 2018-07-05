var things = require('../../../lib/things.js');
var fs = require('fs');

const COMPONENTS = 
['./Plot.js', './Accumulator.js', './SimpleLinearRegression.js', './KalmanFilter.js',
'./BlockWindowAverage.js', './DistinctApproxCount.js', '../ETL/SenMLParse.js', '../ETL/ETLSenMLSpout.js'];

var instances = {};
var noHeader = true;
var dispatcher, pubsub, logger;

(function begin(){
	dispatcher = new things.Dispatcher();
	pubsub = new things.Pubsub();
	logger = fs.createWriteStream('STAT_stats_' + Date.now() + '.csv');

	dispatcher.on('ready', function(){
		pubsub.on('ready', function(){
			setTimeout(runSTATS, 2000);
		});
	});

})();

function memToCSV(data){
	if(noHeader){
		logger.write('Component, Timestamp, rss, Heap total, Heap used, External\n');
		noHeader = false;
	}
	var values = [data.component, data.timestamp, data.memory.rss,
		data.memory.heapTotal, data.memory.heapUsed, data.memory.external];

	logger.write(values.join(',') + '\n');
}

function runSTATS(){
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