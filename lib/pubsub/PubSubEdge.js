
var PubsubComponent=require('./PubsubComponent');
var mqtt = require('mqtt')


function PubsubEdge(loadbalancerIP){
  //Load balance component IP
  this.loadbalancerIP=loadbalancerIP;
  //Map to store the connections
  this.connectionStack=new Map();
  //local plan
  this.localPlan=new Map();
  //Incoming plan
  this.incomingPlan=new Map();
  //Handler(Map) for message and topic
  this.topicCallbackHandler=new Map();
  this.ready=null;
  //Load balancer connection object
  this.serverConnection=null
  //Delta Map for reconfiguration
  this.reconfiguratior=new Map()
  //Flag to know if plan status
  this.isPlanReceived=false;

  //Call back for Incoming plan
  var self=this;
  this.localplanCallback=function(data,topic){
    if(topic=='THINGS/LOADBALANCE'){
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
    //When reconfiguration has some changes on existing connections
    if(self.connectionStack.has(address)){
      self.connectionStack.get(address).reconfigure(reconfiguratior,self.topicCallbackHandler)
    }else{
      // TODO: when new topics are mapped in the incoming plan 
      // No connections have been  initalized so far
    }
  })
}
//Function to compare incoming plan and generate Delta Map for reconfiguration
PubsubEdge.prototype.checkIncomingPlan=function(){
  console.log("calling inside check")
  if(this.localPlan instanceof Map && this.incomingPlan instanceof Map){
    console.log("Local plan :"+JSON.stringify([...this.localPlan]));
    console.log("Incoming plan :"+JSON.stringify([...this.incomingPlan]));
    var self=this;
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
  this.serverConnection=new PubsubComponent('loadbalancer',self.loadbalancerIP,tmp,false,null,null)
  this.serverConnection.connect(f,ferr)
}
//Subscriing to a specific topic and adding topics to callbackhandler
PubsubEdge.prototype.subscribe=function(topic,callback){
  var self=this;
  if(self.isPlanReceived){
    if(self.localPlan.has(topic)){
      self.topicCallbackHandler.set(topic,callback);
      var connectionStackKey=self.localPlan.get(topic);
      if(self.connectionStack.has(connectionStackKey)){
        self.connectionStack.get(connectionStackKey).subscribe(topic,callback);
      }else{
             
        var connObj= new PubsubComponent('client:'+topic,connectionStackKey,(new Map()).set(topic,callback),true,self.removeConnection,self.connectionStack)
        // connObj.connect(function(){console.log("Connected to "+connObj.pubsub_url+" with "+connObj.clientName)},function(error){console.log(error)});
        self.connectionStack.set(connectionStackKey,connObj)
      }
    }else{
      // TODO: what if no topic in local plan
      console.log('Topic not in plan')
    }
  }else{
    self.topicCallbackHandler.set(topic,callback)
  }

}
//When connection cannot be established remove from connectionstack
PubsubEdge.prototype.removeConnection=function(connectionStack,connectionStackKey){
    connectionStack.delete(connectionStackKey)
    console.log("Removed Connection "+connectionStackKey+" from ConnectionStack ")
}
PubsubEdge.prototype.unsubscribe=function(topic){
  
  if(this.topicCallbackHandler.has(topic)&& this.localPlan.has(topic)){
    var connectionStackKey=this.localPlan.get(topic)
    this.connectionStack.get(connectionStackKey).unsubscribe(topic)
    // TODO: Do i need to disconnect when no subsciptions on existing connections
  }

}
PubsubEdge.prototype.publish=function(topic,data){
if(this.localPlan.has(topic)){
  var connectionStackKey= this.localPlan.get(topic)
  if(this.connectionStack.has(connectionStackKey)){
    this.connectionStack.get(connectionStackKey).publish(topic,data)
  }else{
    // TODO: How to handle the case : connections should stay alive if no one is subscribing 
    var connObj=new PubsubComponent('client',this.localPlan.get(topic),null,true)
        connObj.publish(topic,data)
    this.connectionStack.set(connectionStackKey,connObj)
  }
}
}
module.exports = PubsubEdge;