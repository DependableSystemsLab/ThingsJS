var fs = require('fs');
var csv = require('csv');
var C45 = require('c4.5');
var things = require('../../../lib/things.js');

var pubsub_url = 'mqtt://localhost';
var pubsub_topic = 'thingsjs/IoTBench/ETL/SenMLParse';  
var publish_topic = 'thingsjs/IoTBench/TRAIN/DecisionTreePred';

var pubsub = new things.Pubsub(pubsub_url);
var USE_MSG_FIELD_LIST; 
var SAMPLE_HEADER;
var MODEL_FILE_PATH;
var MODEL_UPDATE_FREQUENCY;
var PRED_RESULT_HEADER;
var MODEL_PRED_INPUT;
var MODEL_PRED_INPUT_TYPE;



function setup(){
  var args = process.argv.slice(2);
  var properties;

  // default to TAXI property set if no specific property file is given
  if(!args.length){
    args = ['../ETL/TAXI_properties.json'];
  }
  try{
    properties = JSON.parse(fs.readFileSync(args[0], 'utf-8'));

    USE_MSG_FIELD_LIST = properties['CLASSIFICATION.DECISION_TREE.USE_MSG_FIELD_LIST'];
    USE_MSG_FIELD = properties['CLASSIFICATION.DECISION_TREE.USE_MSG_FIELD']||0;
    SAMPLE_HEADER = properties["CLASSIFICATION.DECISION_TREE.SAMPLE_HEADER"];
    MODEL_FILE_PATH = '../TRAIN/'+ properties['CLASSIFICATION.DECISION_TREE.MODEL_PATH'];
    MODEL_UPDATE_FREQUENCY = properties["CLASSIFICATION.DECISION_TREE.TRAIN.MODEL_UPDATE_FREQUENCY"];
    PRED_RESULT_HEADER = properties['PREDICT.DECISION_TREE.TARGET'];
    MODEL_PRED_INPUT = properties['PREDICT.DECISION_TREE.TRAIN_INPUT'];
    MODEL_PRED_INPUT_TYPE = properties['PREDICT.DECISION_TREE.TRAIN_INPUT_TYPE'];

    console.log("USE_MSG_FIELD" + USE_MSG_FIELD);
    console.log("SAMPLE_HEADER" + SAMPLE_HEADER);
    console.log("MODEL_FILE_PATH" + MODEL_FILE_PATH);
    console.log("MODEL_UPDATE_FREQUENCY" + MODEL_UPDATE_FREQUENCY);

    if(!USE_MSG_FIELD_LIST){
      console.log('No fields to PRED');
      process.exit();
    }
  }
  catch(e){
    console.log('Couldn\'t fetch properties: ' + e);
    process.exit();
  }
}


function DecisionTreePred(data) {
    console.log(" " + JSON.stringify(data));
    var processeddata =[];
    var features = MODEL_PRED_INPUT;
    features.forEach(function(key) {
        processeddata.push(data[key]);
    });
    console.log("parsed data" + processeddata);
    
    var c45 = C45();
    var state = require(MODEL_FILE_PATH);
    c45.restore(state)
    var model = c45.getModel();
    pubsub.publish(publish_topic, model.classify(processeddata));
    console.log("PREDICT RESULT : " + model.classify(processeddata));

}






pubsub.on('ready', function(){
  setup();
  console.log('Beginning training by decisiontree');
  pubsub.subscribe(pubsub_topic, DecisionTreePred);
});