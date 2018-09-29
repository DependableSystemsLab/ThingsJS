var fs = require('fs');
var csv = require('csv');
var C45 = require('c4.5');
var things = require('things-js'); 

var pubsub_url = 'mqtt://localhost';
var pubsub_topic = 'thingsjs/IoTBench/TRAIN/DecisionTreeClassify';
var publish_topic = 'thingsjs/IoTBench/TRAIN/DecisionTreeTrain';

var pubsub = new things.Pubsub(pubsub_url);
var USE_MSG_FIELD_LIST; 
var SAMPLE_HEADER;
var MODEL_FILE_PATH;
var MODEL_UPDATE_FREQUENCY;
var TRAIN_RESULT_HEADER;
var MODEL_TRAIN_INPUT;
var WINDOW_COUNT = 10;
var traincount;
var datalist;
var processeddata;

function setup(){
  var args = process.argv.slice(2);
  var properties;

  // default to TAXI property set if no specific property file is given
  if(!args.length){
    args = ['./TAXI_properties.json'];
  }
  try{
    properties = JSON.parse(fs.readFileSync(args[0], 'utf-8'));

    USE_MSG_FIELD_LIST = properties['TRAIN.DECISION_TREE.USE_MSG_FIELD_LIST'];
    USE_MSG_FIELD = properties['TRAIN.DECISION_TREE.USE_MSG_FIELD']||0;
    MODEL_TRAIN_INPUT = properties["CLASSIFICATION.DECISION_TREE.SAMPLE_HEADER"];
    MODEL_FILE_PATH = properties['TRAIN.DECISION_TREE.MODEL_PATH'];
    MODEL_UPDATE_FREQUENCY = properties["TRAIN.DECISION_TREE.TRAIN.MODEL_UPDATE_FREQUENCY"];
    TRAIN_RESULT_HEADER = properties['TRAIN.DECISION_TREE.TARGET'];
    MODEL_TRAIN_INPUT = properties['TRAIN.DECISION_TREE.TRAIN_INPUT'];
    MODEL_TRAIN_INPUT_TYPE = properties['TRAIN.DECISION_TREE.TRAIN_INPUT_TYPE'];

    console.log("USE_MSG_FIELD" + USE_MSG_FIELD);
    console.log("MODEL_FILE_PATH" + MODEL_FILE_PATH);
    console.log("MODEL_UPDATE_FREQUENCY" + MODEL_UPDATE_FREQUENCY);

    if(!USE_MSG_FIELD_LIST){
      console.log('No fields to TRAIN');
      process.exit();
    }
  }
  catch(e){
    console.log('Couldn\'t fetch properties: ' + e);
    process.exit();
  }
  traincount = 0;
  datalist = [];

}


function decisionTreeTrain(datalist){

      var features = MODEL_TRAIN_INPUT;
      var target = TRAIN_RESULT_HEADER;
      var featureTypes = MODEL_TRAIN_INPUT_TYPE;

      processeddata = processdata(datalist,features,target);
      var c45 = C45(); 
      c45.train({
        data: processeddata,
        target: target,
        features: features,
        featureTypes: featureTypes
    }, function(error, model) {
      if (error) {
        console.error(error);
        return false;
      }  
      console.log("tree model"+ model.toJSON());
      console.log("TRAIN DECISION TREE MODEL",c45.toJSON());
      //pubsub.publish(publish_topic,c45.toJSON()); no pubsub to make it stateless for prediction
      // USE GFS API SAVE TO RIOT/TRAIN
      fs.writeFileSync(MODEL_FILE_PATH, c45.toJSON());

    });

} 


function processdata(datalist,features,target){
var resultdata =[];

datalist.forEach(function(element){
  var newdatalist = [];
  features.forEach(function(key){
   newdatalist.push(element[key]);
  })
  newdatalist.push(element[target]);
  resultdata.push(newdatalist);
});

resultdata.forEach(function(array){
  console.log("lalala"+array);
});
return resultdata;
}




pubsub.on('ready', function(){
  setup();
  console.log('Beginning training by decisiontree');
  pubsub.subscribe(pubsub_topic, decisionTreeTrain);
});