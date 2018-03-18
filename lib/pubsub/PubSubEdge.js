
var PubsubComponent=require('./PubsubComponent');
var mqtt = require('mqtt')
var logger= require('./multilogger')
var multilogger=new logger();

function PubsubEdge(loadbalancerIP,devicename){
  this.devicename=devicename; // Name of the client device
  this.loadbalancerIP=loadbalancerIP; //Load balance component IP
  this.connectionStack=new Map();//Map to store the connections
  this.localPlan=new Map();//local plan
  this.incomingPlan=new Map();//Incoming plan
  this.topicCallbackHandler=new Map(); //Handler(Map) for message and topic
  this.ready=null;
  this.serverConnection=null //Load balancer connection object
  this.reconfiguratior=new Map() //Delta Map for reconfiguration
  this.isPlanReceived=false; //Flag to know initial plan status before connection

  //Call back for Incoming plan
  var self=this;
  this.localplanCallback=function(data,topic){
    if(topic=='THINGS/LOADBALANCE'){
      multilogger.log('['+self.devicename+'] Message received from load balancer')
      self.incomingPlan= new Map(data);
      self.checkIncomingPlan();
      if(self.reconfiguratior.size>0){
          self.reconfigure(self.reconfiguratior)
      }else{
        self.localPlan=self.incomingPlan;
        if(!self.isPlanReceived){
          self.isPlanReceived=true
          self.topicCallbackHandler.forEach(function(callback,topic){
            self.subscribe(topic,callback)
          })
       }
     }
    }

  }
}

//Function to apply reconfigure to all applicatble connection objects
PubsubEdge.prototype.reconfigure=function(reconfiguratior){
  var self=this
  reconfiguratior.forEach(function(address,topic){
    if(self.connectionStack.has(address)){ //When reconfiguration has some changes on existing connections
      self.connectionStack.get(address).reconfigure(reconfiguratior,self.topicCallbackHandler)
    }else{
      // TODO: when new topics are mapped in the incoming plan 
      // No connections have been  initalized so far
    }
  })
}

//Function to compare incoming plan and generate Delta Map for reconfiguration
PubsubEdge.prototype.checkIncomingPlan=function(){
  var self=this;
  if(this.localPlan instanceof Map && this.incomingPlan instanceof Map){
    multilogger.log("["+self.devicename+"] Local plan :"+JSON.stringify([...this.localPlan]));
    multilogger.log("["+self.devicename+"] Incoming plan :"+JSON.stringify([...this.incomingPlan]));
    this.incomingPlan.forEach(function(address,topic){
      if(self.localPlan.has(topic)&& self.localPlan.get(topic)!=address){
        self.reconfiguratior.set(topic,address)
      }
      // TODO: need to check for other cases 
    })
  }
 }

//Initalizing the connection and fetching the plan
PubsubEdge.prototype.intialize=function(f,ferr){
  var self=this
  var tmp=new Map();
  tmp.set('THINGS/LOADBALANCE',this.localplanCallback)
  var f_callback=ferr;//Transferring callback downward 
  var s_callback=f;//Transferring callback downward 
  if(!(typeof s_callback === "function")){
    s_callback=function(){
      multilogger.log('['+self.devicename+'] Connected to loadbalancer')
    }
  }
  this.serverConnection=new PubsubComponent(self.devicename,self.loadbalancerIP,tmp,false,f_callback,null)
  this.serverConnection.connect(s_callback,f_callback).catch(function(){
    multilogger.log('['+self.devicename+'] Couldnot connect to loadbalancer')
  })
}
//Subscriing to a specific topic and adding topics to callbackhandler
PubsubEdge.prototype.subscribe=function(topic,callback){
  var self=this;
  if(self.isPlanReceived){
    if(self.localPlan.has(topic)){
      self.topicCallbackHandler.set(topic,callback);
      var connectionStackKey=self.localPlan.get(topic);
      if(self.connectionStack.has(connectionStackKey)){ // Checking if the connection already established
        self.connectionStack.get(connectionStackKey).subscribe(topic,callback);
      }else{
        var clientName=self.devicename+'|'+connectionStackKey;
        var connObj= new PubsubComponent(clientName,connectionStackKey,(new Map()).set(topic,callback),true,self.removeConnection,self.connectionStack)
        self.connectionStack.set(connectionStackKey,connObj)
      }
    }else{
      // TODO: what if no topic in local plan
      multilogger.log('Topic not in plan')
    }
  }else{
    self.topicCallbackHandler.set(topic,callback) //Adding topic to handler for subscription later
  }

}
//When connection cannot be established remove from connectionstack
PubsubEdge.prototype.removeConnection=function(connectionStack,connectionStackKey){
  var self=this;  
  connectionStack.delete(connectionStackKey)
    multilogger.log("["+self.devicename+"] Callback function removed connection "+connectionStackKey+" from connection-stack ")
}
//Unsubscriing topic
PubsubEdge.prototype.unsubscribe=function(topic){
  var self=this;
  if(this.topicCallbackHandler.has(topic)&& this.localPlan.has(topic)){//checks if unsubscribe connection is valid
    var connectionStackKey=this.localPlan.get(topic)
    this.connectionStack.get(connectionStackKey).unsubscribe(topic,function(){
      multilogger.log('['+self.devicename+'] Unsubscribed '+topic +' from '+ connectionStackKey)
    })
    // TODO: Do i need to disconnect when no subsciptions on existing connections
  }
}
//Publishing Data
PubsubEdge.prototype.publish=function(topic,data){
  var self=this;
if(this.localPlan.has(topic)){
  var connectionStackKey= this.localPlan.get(topic)
  if(this.connectionStack.has(connectionStackKey)){ //Checking if the stack has conections already
    this.connectionStack.get(connectionStackKey).publish(topic,data,function(){
      multilogger.log('['+self.devicename+'] Published T:'+ topic+' D: '+data+' on '+connectionStackKey)
    })
  }else{
    // TODO: How to handle the case : connections should stay alive if no one is subscribing 
    var connObj=new PubsubComponent('client',this.localPlan.get(topic),null,true)
        connObj.publish(topic,data)
    this.connectionStack.set(connectionStackKey,connObj)
  }
}
}
module.exports = PubsubEdge;