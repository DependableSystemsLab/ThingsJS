var fs = require('fs');
var csv = require('csv');
var C45 = require('c4.5');
var things = require('things-js'); 
var mongoUrl = 'mongodb://localhost:27017/things-js-fs';
var GFS = require('things-js').addons.gfs(mongoUrl);

var pubsub_url = 'mqtt://localhost';
var pubsub_topic = 'thingsjs/IoTBench/TRAIN/DecisionTreeClassify';
var publish_topic = 'thingsjs/IoTBench/TRAIN/DecisionTreeTrain';
var measurement_topic = 'iotbench/processing';

var pubsub = new things.Pubsub(pubsub_url);
var USE_MSG_FIELD_LIST; 
var SAMPLE_HEADER;
var MODEL_FILE_PATH;
var MODEL_UPDATE_FREQUENCY;
var TRAIN_RESULT_HEADER;
var MODEL_TRAIN_INPUT;
var WINDOW_COUNT = 10;
var traincount;
var datalist=[];
var processeddata;

function setup(){
  var args = process.argv.slice(2);
  var properties;

  // default to TAXI property set if no specific property file is given
  if(!args.length){
    args = ['./TAXI_properties.json'];
  }
   GFS.readFile(args[0], function(err2, data){
        if (err2) {
          console.log('\x1b[44m%s\x1b[0m', 'Couldn\'t fetch properties: ' + err2);
          process.exit();
        }
        properties = JSON.parse(data);
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

        traincount = 0;
        datalist = [];
        console.log('Beginning training by decisiontree');
        pubsub.subscribe(pubsub_topic, decisionTreeTrain);
        });   

}


function decisionTreeTrain(saveddatalist){
    var date = new Date(); var timestamp = date.getTime();
    var saveddatalist = JSON.parse(saveddatalist)
    console.log(timestamp+" : "+saveddatalist["line_id"]);
    var content = saveddatalist["content"];
      var features = MODEL_TRAIN_INPUT;
      var target = TRAIN_RESULT_HEADER;
      var featureTypes = MODEL_TRAIN_INPUT_TYPE;

      processeddata = processdata(content,features,target);
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
      var timeobj = {"id":saveddatalist["line_id"],"component":"decisiontreetrain","time":timestamp};
      pubsub.publish(measurement_topic,JSON.stringify(timeobj));
      //pubsub.publish(publish_topic,c45.toJSON()); no pubsub to make it stateless for prediction
      GFS.writeFile(MODEL_FILE_PATH, c45.toJSON(),function(err){
        if(err) throw err;
      GFS.readFile(MODEL_FILE_PATH, function(err2, data){
          if (err2) throw err2;
          console.log("successfully wrote model" + data.toString());
      });
    });

    });

} 


function processdata(saveddatalist,features,target){
var resultdata =[];

saveddatalist.forEach(function(element){
  var newdatalist = [];
  features.forEach(function(key){
   newdatalist.push(element[key]);
  })
  newdatalist.push(element[target]);
  resultdata.push(newdatalist);
});

resultdata.forEach(function(array){
  console.log(array);
});
return resultdata;
}




pubsub.on('ready', function(){
  setup();
});