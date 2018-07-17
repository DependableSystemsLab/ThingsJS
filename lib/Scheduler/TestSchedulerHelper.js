var things = require('../things.js');
var SchedulerHelper = require('./SchedulerHelper.js');

//const ENGINES = ['pi0-1', 'pi3-3', 'pi3-1', 'pi3-2', 'i7-1'];
const ENGINES = ['pi0', 'pi1', 'pi2', 'pi3'];

// const SCHEDULE_1 =
// { 'pi0-1': [ 'sprinkler.js/0', 'shade-contr.js/1' ],
//  'pi3-3': [ 'sprinkler.js/1', 'shade-contr.js/2' ],
//  'pi3-1': [ 'sprinkler.js/2', 'shade-contr.js/3' ],
//  'pi3-2': [ 'sprinkler.js/3', 'temp-reg.js/0' ],
//  'i7-1': [ 'shade-contr.js/0', 'temp-reg.js/1' ] };
//  {'pi0-1'}
const SCHEDULE_1 = 
{ 
	'pi0': ['Test.js/0', 'Test.js/1'],
	'pi1': ['Test.js/2'],
	'pi2': ['Test.js/3', 'Test.js/4']
}

const SCHEDULE_2 = 
{
	run: [ { app: 'Test.js/5', device: 'pi1' }],
	migrate: [{ app: 'Test.js/3', from: 'pi2', to: 'pi0' }]
}

// const SCHEDULE_2 = 
// { run: [ { app: 'shade-contr.js/5', device: 'pi3-3' } ],
//  stop:
//   [ { app: 'sprinkler.js/0', device: 'pi0-1' },
//     { app: 'shade-contr.js/0', device: 'pi-1' } ],
//  continueRun:
//   [ { app: 'temp-reg.js/0', device: 'pi3-2' } ],
//  migrate: [ { app: 'sprinkler.js/3', from: 'pi3-2', to: 'pi0-1' } ] };


function initEngines(){
	var fin = [];
	function ready(obj){
		return new Promise(function(resolve){
			obj.on('ready', resolve);
		});
	}
	ENGINES.forEach(function(id){
		var engine = new things.CodeEngine({ id: id });
		fin.push(ready(engine));
	});
	return new Promise(function(resolve){
		Promise.all(fin).then(function(){
			resolve();
		});
	});
}

function begin(){
	initEngines();

	var scheduler = new SchedulerHelper();
	scheduler.on('ready', function(){
		// wait a few seconds for the devices to 'register' themselves over pubsub
		setTimeout(function(){
			scheduler.runSchedule(SCHEDULE_1).then(function(data){
				console.log('Expecting 5 instance ids to return: ');
				console.log(JSON.stringify(data));
			});

			// wait a few seconds to reschedule
			setTimeout(function(){
				console.log('====Trying to reschedule now====');
				scheduler.reSchedule(SCHEDULE_2).then(function(data){
					console.log('After rescheduling: ');
					console.log(data);
				});
			}, 5000);

		}, 3000);
	});
}

begin();