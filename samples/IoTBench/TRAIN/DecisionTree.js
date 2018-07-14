var fs = require('fs');
var csv = require('csv');
var C45 = require('c4.5');
var things = require('../../../lib/things.js');

var pubsub_url = 'mqtt://localhost';
var pubsub_topic = 'thingsjs/IoTBench/ETL/SenMLParse';
var publish_topic = 'thingsjs/IoTBench/TRAIN/DecisionTree';

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
    args = ['../ETL/TAXI_properties.json'];
  }
  try{
    properties = JSON.parse(fs.readFileSync(args[0], 'utf-8'));

    USE_MSG_FIELD = properties['CLASSIFICATION.DECISION_TREE.USE_MSG_FIELD']||0;
    SAMPLE_HEADER = properties["CLASSIFICATION.DECISION_TREE.SAMPLE_HEADER"];
    MODEL_FILE_PATH = properties['CLASSIFICATION.DECISION_TREE.MODEL_PATH'];
    MODEL_UPDATE_FREQUENCY = properties["CLASSIFICATION.DECISION_TREE.TRAIN.MODEL_UPDATE_FREQUENCY"];
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

// //trainAndSaveModel
// trainAndSaveModel();

}


function decisionTreeTrain(data){


    var features = SAMPLE_HEADER.slice(1,-1); // ["attr1", "attr2", "attr3"]
    console.log("headers"+headers);
    var featureTypes = ['category','number','category'];
    var trainingData = data.slice(1).map(function(d) {
      return d.slice(1);
    });
    var target = headers[headers.length-1]; // "class"
    var c45 = C45();
 
    c45.train({
        data: trainingData,
        target: target,
        features: features,
        featureTypes: featureTypes
    }, function(error, model) {
      if (error) {
        console.error(error);
        return false;
      }  
      console.log("TRAIN DECISION TREE MODEL",c45.toJSON())   
      pubsub.publish(publish_topic,c45.toJSON());
      fs.writeFileSync(MODEL_FILE_PATH, c45.toJSON());

    });
  };




// function decisionTreePredict(){
//     var c45 = C45();
//     var decisionTree = require(MODEL_FILE_PATH);
//     c45.restore(decisionTree)
//     var model = c45.getModel();
//     //where to grab testdata
//     var testData = ('./testData.json');

//     testData.forEach(function(element){
//       //write to mttq
//        console.log(model.classify(element));
//     });

// }




pubsub.on('ready', function(){
  setup();
  console.log('Beginning predict by decisiontree ');
  pubsub.subscribe(pubsub_topic, decisionTreeTrain);
});
