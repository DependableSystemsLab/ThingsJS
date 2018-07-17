var schedule = require('./Scheduler.js').Schedule;

var d0 = 
[ { id: 'pi0', memory: 500}, 
  { id: 'pi1', memory: 300 }, 
  { id: 'pi2', memory: 1000 }
];
var d1 = [];

var c0 = 
[ { name: 'Test.js/01', required_memory: 9342934 }, { name: 'Test.js/02', required_memory: 2343294 } ];

var c2 = 
[ { name: 'A', required_memory: 200 }, { name: 'B', required_memory: 600 } ];

var c3 = 
[ { name: 1, required_memory: 200 }, { name: 2, required_memory: 100 },
 { name: 3, required_memory: 200 }, { name: 4, required_memory: 100 }];


 function test(){
 	console.log(schedule(d0, c3));
 }

 test();

var testComp = [{"name":"test.js/1","required_memory":5},{"name":"video_streamer.js/1","required_memory":1}]
var testDev = [{"id":"node_00","memory":47902720}]
