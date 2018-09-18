var fs = require('fs');
var csv = require('csv');
var MLR  = require('ml-regression-multivariate-linear');
var things = require('things-js');

var pubsub_url = 'mqtt://localhost';
var pubsub_topic = 'thingsjs/IoTBench/PRED/MultiLinearRegressionPred';  
var publish_topic = 'thingsjs/IoTBench/PRED/ResidualError';

var pubsub = new things.Pubsub(pubsub_url);

var USE_MSG_FIELD_LIST; 
var SAMPLE_HEADER;
var MODEL_FILE_PATH;
var MODEL_UPDATE_FREQUENCY;



function setup(){
  var args = process.argv.slice(2);
  var properties;

  // default to TAXI property set if no specific property file is given
  if(!args.length){
    args = ['../TAXI_properties.json'];
  }
  try{
    properties = JSON.parse(fs.readFileSync(args[0], 'utf-8'));

    USE_MSG_FIELD_LIST = properties['PREDICT.MULTIPLELINEAR_REGRESSION.USE_MSG_FIELD_LIST'];
    USE_MSG_FIELD = properties["PREDICT.MULTIPLELINEAR_REGRESSION.USE_MSG_FIELD"]||0;
    SAMPLE_HEADER = properties["CLASSIFICATION.DECISION_TREE.SAMPLE_HEADER"];
    MODEL_FILE_PATH = properties["PREDICT.MULTIPLELINEAR_REGRESSION.MODEL_PATH"];
    MODEL_UPDATE_FREQUENCY = properties["PREDICT.MULTIPLELINEAR_REGRESSION.TRAIN.MODEL_UPDATE_FREQUENCY"];
    PRED_INPUT = properties["PREDICT.MULTIPLELINEAR_REGRESSION.TRAIN_INPUT"];
    PRED_OUTPUT = properties["PREDICT.MULTIPLELINEAR_REGRESSION.TRAIN_OUTPUT"];
    PRED_INPUT_TYPE = properties["PREDICT.MULTIPLELINEAR_REGRESSION.TRAIN_INPUT_TYPE"];
    console.log("USE_MSG_FIELD" + USE_MSG_FIELD);
    console.log("SAMPLE_HEADER" + SAMPLE_HEADER);
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
}


function CalculateRE(data) {
    console.log(" " + JSON.stringify(data));

    var result = data["actual"] - data["predict"];
    pubsub.publish(publish_topic, result);
    console.log("ResidualError: " + result); 

}


pubsub.on('ready', function(){
  setup();
  console.log('Beginning calculating ResidualError');
  pubsub.subscribe(pubsub_topic, CalculateRE);
});