var mqtt = require('mqtt')
var dummyPlan =new Map()
// dummyPlan.set('aws1','mqtt://54.218.28.253');
// dummyPlan.set('aws2','mqtt://34.217.82.224');

dummyPlan.set('aws1','mqtt://localhost:1883');
dummyPlan.set('aws2','mqtt://localhost:1884');
//dummyPlan.set('aws2','mqtt://54.218.28.253');
// console.log(JSON.stringify([...dummyPlan]))
var client  = mqtt.connect('mqtt://localhost')
 
client.on('connect', function () {
  console.log("connected to broker");
  client.subscribe('THINGS/LOADBALANCE/CLIENTS')
  client.publish('THINGS/LOADBALANCE',JSON.stringify([...dummyPlan]))
 
})
 
client.on('message', function (topic, message) {
  // message is Buffer
  console.log(message.toString())
  
})


 
