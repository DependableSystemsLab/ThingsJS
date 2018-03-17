var PubsubEdge=require('./PubSubEdge');

var connection=new PubsubEdge('mqtt://localhost','testdevice')
var callback=function(topic,data){
    console.log(topic+data);
}
connection.subscribe('aws1',callback)
connection.subscribe('aws2',callback)
connection.intialize()
