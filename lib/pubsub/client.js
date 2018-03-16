var PubsubEdge=require('./PubSubEdge');

var connection=new PubsubEdge('mqtt://localhost')
var callback=function(topic,data){
    console.log(topic+data);
}
connection.subscribe('aws1',callback)
connection.subscribe('aws2',callback)
connection.intialize(function(){
console.log("Connected to loadbalancer")
},function(errr){
console.log(errr)
})
