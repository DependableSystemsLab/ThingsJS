var fs = require('fs');
var csv = require('csv');
var MLR  = require('ml-regression-multivariate-linear');
var things = require('things-js');
var mongoUrl = 'mongodb://localhost:27017/things-js-fs';
var GFS = require('things-js').addons.gfs(mongoUrl);

var pubsub_url = 'mqtt://localhost';
var pubsub_topic = 'thingsjs/IoTBench/SenMLParse';  
var publish_topic = 'thingsjs/IoTBench/PRED/MultiLinearRegressionPred';

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
    args = ['./TAXI_properties.json'];
  }
  // try{
    GFS.readFile(args[0], function(err2, data){
      if (err2) {
          console.log('\x1b[44m%s\x1b[0m', 'Couldn\'t fetch properties: ' + err2);
          process.exit();
        }
      properties = JSON.parse(data);
      USE_MSG_FIELD_LIST = properties['PREDICT.MULTIPLELINEAR_REGRESSION.USE_MSG_FIELD_LIST'];
      USE_MSG_FIELD = properties["PREDICT.MULTIPLELINEAR_REGRESSION.USE_MSG_FIELD"]||0;
      SAMPLE_HEADER = properties["CLASSIFICATION.DECISION_TREE.SAMPLE_HEADER"];
      // CHANGE THIS TO FS PATH 
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
    console.log('Beginning prediction by multivariate linear regression');
    pubsub.subscribe(pubsub_topic, MultiLinearRegressionPred);
    });  
   
  // }
  // catch(e){
  //   console.log('Couldn\'t fetch properties: ' + e);
  //   process.exit();
  // }
}


function MultiLinearRegressionPred(data) {
    console.log(" " + JSON.stringify(data));
    var processeddata =[];
    var features = PRED_INPUT;
    var target = PRED_OUTPUT;
    // USE GFS API TO READ THE MODEL OUT 
    GFS.readFile(MODEL_FILE_PATH,function(err,weights){
    if (err) {
        console.log('\x1b[44m%s\x1b[0m', 'Couldn\'t fetch model: ' + err);
        return false;
      }
    weights = JSON.parse(weights);
    console.log("FETCHED WEIGHTS" + weights);
    features.forEach(function(key) {
        processeddata.push(Number(data[key]));
    });



    processeddata.push(1);
    
    var result = 0; 
    var i;
    for(i = 0; i < processeddata.length;i++){
        result += processeddata[i]* weights[i]
      }
    //publish both predict result and true result;
    var output_result = {"predict":result, "actual":data[target]};
    pubsub.publish(publish_topic, output_result);
    console.log("RESULT : " + output_result); 
    });

}


pubsub.on('ready', function(){
  setup();
});