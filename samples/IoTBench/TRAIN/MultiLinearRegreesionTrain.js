var fs = require('fs');
var MLR  = require('ml-regression-multivariate-linear');
var things = require('../../../lib/things.js');

var pubsub_url = 'mqtt://localhost';
var pubsub_topic = 'thingsjs/IoTBench/ETL/SenMLParse';
var publish_topic = 'thingsjs/IoTBench/TRAIN/MultiLinearRegressionTrain';

var pubsub = new things.Pubsub(pubsub_url);
var USE_MSG_FIELD_LIST; 
var SAMPLE_HEADER;
var MODEL_FILE_PATH;
var MODEL_UPDATE_FREQUENCY;
var WINDOW_COUNT = 10;
var traincount;
var datalist;
var processeddata;

function setup(){
  var args = process.argv.slice(2);
  var properties;

  // default to TAXI property set if no specific property file is given
  if(!args.length){
    args = ['../ETL/TAXI_properties.json'];
  }
  try{
    properties = JSON.parse(fs.readFileSync(args[0], 'utf-8'));

    USE_MSG_FIELD_LIST = properties['PREDICT.MULTIPLELINEAR_REGRESSION.USE_MSG_FIELD_LIST'];
    USE_MSG_FIELD = properties["PREDICT.MULTIPLELINEAR_REGRESSION.USE_MSG_FIELD"]||0;
    SAMPLE_HEADER = properties["CLASSIFICATION.DECISION_TREE.SAMPLE_HEADER"];
    MODEL_FILE_PATH = properties["PREDICT.MULTIPLELINEAR_REGRESSION.MODEL_PATH"];
    MODEL_UPDATE_FREQUENCY = properties["PREDICT.MULTIPLELINEAR_REGRESSION.TRAIN.MODEL_UPDATE_FREQUENCY"];
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
  traincount = 0;
  datalist = [];

}


function MultiLinearRegressionTrain(data){

    // fs.writeFileSync("./parseddata2.json",data);
    var features = [ "trip_time_in_secs", "trip_distance", "pickup_longitude",
    "pickup_latitude", "dropoff_longitude", "dropoff_latitude"];
    var target = "fare_amount";
    var featureTypes = ["number","number","number","number","number","number"];
    var feature_data = [];
    var target_data = [];
    datalist.push(data);
    console.log("length of data" + datalist.length );
    traincount ++;

    if(traincount >= WINDOW_COUNT){
      traincount = 0;
    console.log("collect 100 data to train by decisionTree");
    feature_data = processdata(datalist,features);
    datalist.forEach(function(element){
      var newArray = [];
      newArray.push(Number(element[target]));
      target_data.push(newArray);
    });
    console.log("TARGET_DATA" + target_data);

    var mlr = new MLR(feature_data, target_data);
    console.log(mlr);
    console.log('\n\n\n');
    var weights = mlr.weights;
    console.log(weights);
      //pubsub.publish(publish_topic,c45.toJSON()); no pubsub to make it stateless for prediction
    fs.writeFileSync(MODEL_FILE_PATH, JSON.stringify(weights));
    datalist = [];
  }
}



function processdata(datalist,features){
var resultdata =[];

datalist.forEach(function(element){
  var newdatalist = [];
  features.forEach(function(key){
   newdatalist.push(Number(element[key]));
  })
  resultdata.push(newdatalist);
});


console.log(resultdata);
return resultdata;
}




pubsub.on('ready', function(){
  setup();
  console.log('Beginning training by decisiontree');
  pubsub.subscribe(pubsub_topic, MultiLinearRegressionTrain);
});