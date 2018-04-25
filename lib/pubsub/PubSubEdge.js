
var PubsubComponent=require('./PubsubComponent');
var mqtt = require('mqtt')
var circular =require('easy-circular-list')
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
  this.delta=new Map() //Delta Map for reconfiguration
  this.isPlanReceived=false; //Flag to know initial plan status before connection
  this.testConnections=[]
  this.circularPlan=new Map();
  //Call back for Incoming plan
  var self=this;
  this.localplanCallback=function(data,topic){
    if(topic=='THINGS/LOADBALANCE'){
      multilogger.log('['+self.devicename+'] Message received from load balancer')
      self.incomingPlan= new Map(data);
      self.checkIncomingPlan();
      if(self.delta.size>0){
          self.reconfigure(self.delta).then(function(){
            self.localPlan=self.incomingPlan;
          }).catch(function(err){console.log(err)})
      }else{
        self.localPlan=self.incomingPlan;
        if(!self.isPlanReceived){// This os only for the initial condition
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
PubsubEdge.prototype.reconfigure=function(delta){
  var self=this
  // TODO: For multnode configurations the server to publish(ALLSUB) and subscriber(ALLPUB) has to be decided based on some concensus or other algorithms
  multilogger.log("["+self.devicename+"] Reconfigure plan :"+JSON.stringify([...delta]));
  var reconfiguring=function(address,topic){
    return new Promise(function(resolve,reject){
      /* Topic has connections with server from local plan
        If there is no existing connections for the reconfigurator, 
        Nothing will be done */
      if(self.topicCallbackHandler.has(topic)){
        self.connectionStack.get(self.localPlan.get(topic)).unsubscribe(topic)// Unsubscribing the current connection
        /* CASE:Topic has callbacks regstered with PubSubEdge and 
          connection for the new server exists in the connection stack,
          Need need to connect with server from incoming plan */
        if(self.connectionStack.has(address)){
          self.connectionStack.get(address).subscribe(topic,self.topicCallbackHandler.get(topic))
        }else{
          /* CASE:Topic has callbacks registered but no connections exists
         in the connection stack,so create connection with server from incoming plan */
          var clientName=self.devicename+'| CONNOBJ '+address;
          var connObj= new PubsubComponent(clientName,address,(new Map()).set(topic,self.topicCallbackHandler.get(topic)),true,self.removeConnection,self.connectionStack)
          self.connectionStack.set(address,connObj)
        }

      }
      resolve(topic)
    })
  }
  var all=[];
/*   Using the promise to avoid any edge cases that could get orginated 
  from being assynchronus  */

  delta.forEach(function(address,topic){
    all.push(reconfiguring(address,topic))
  })
  return Promise.all(all)
}

//Function to compare incoming plan and generate Delta Map for reconfiguration
PubsubEdge.prototype.checkIncomingPlan=function(){
  var self=this;
  if(this.localPlan instanceof Map && this.incomingPlan instanceof Map){
    multilogger.log("["+self.devicename+"] Local plan :"+JSON.stringify([...this.localPlan]));
    multilogger.log("["+self.devicename+"] Incoming plan :"+JSON.stringify([...this.incomingPlan]));
    this.incomingPlan.forEach(function(address,topic){
      if(self.localPlan.has(topic)&& self.localPlan.get(topic)!=address){
        self.delta.set(topic,address)
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
  var subscribing= function(connectionStackKey,topic,callback){
    if(self.connectionStack.has(connectionStackKey)){ // Checking if the connection already established
      self.connectionStack.get(connectionStackKey).subscribe(topic,callback);
    }else{
      var clientName=self.devicename+'| CONNOBJ '+connectionStackKey;
      var connObj= new PubsubComponent(clientName,connectionStackKey,(new Map()).set(topic,callback),true,self.removeConnection,self.connectionStack)
      self.connectionStack.set(connectionStackKey,connObj)
      self.testConnections.push(connObj)
    }
  }
  
  if(self.isPlanReceived){
    if(self.localPlan.has(topic)){
      self.topicCallbackHandler.set(topic,callback);
      var connectionStackKey=self.localPlan.get(topic);
        if(typeof(connectionStackKey)=='string'){
          subscribing(connectionStackKey,topic,callback)
        }else if(typeof(connectionStackKey)=='object'){
            if(connectionStackKey.allPub){
              if(!self.circularPlan.has(topic)){
                self.circularPlan.set(topic,new circular(connectionStackKey.servers))
                subscribing(self.circularPlan.get(topic).getNext(),topic, callback)
              }else{
                subscribing(self.circularPlan.get(topic).getNext(),topic, callback)
              }

            }
        }else{
          console.log('Failed to interprect plan')
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
  var publishing =function(connectionStackKey,topic,data){
    if(self.connectionStack.has(connectionStackKey)){ //Checking if the stack has conections already
      self.connectionStack.get(connectionStackKey).publish(topic,data,function(){
        multilogger.log('['+self.devicename+'] Published T:'+ topic+' D: '+data+' on '+connectionStackKey)
      })
    }else{
      // TODO: How to handle the case : connections should stay alive if no one is subscribing 
      var connObj=new PubsubComponent('client',connectionStackKey,null,true)
          connObj.publish(topic,data)
      self.connectionStack.set(connectionStackKey,connObj)
    }
  }


if(self.localPlan.has(topic)){
    var connectionStackKey= self.localPlan.get(topic)
    //console.log(typeof(connectionStackKey))
  if(typeof(connectionStackKey)=='string'){// For configuration that donot have dynamomoth style
      publishing(connectionStackKey,topic,data)
  }else if(typeof(connectionStackKey)=='object'){
    if(connectionStackKey.allPub){//Checking if it is an allPub stye of reconfiguration
      connectionStackKey.servers.forEach(function(server){
        publishing(server,topic,data)
        console.log('Publishing '+server)
      })
    }else{
      console.log("NOT all Pub Style")
    }
  }else{
    console.log("Failed to interprect plan")
  }

}

}
module.exports = PubsubEdge;