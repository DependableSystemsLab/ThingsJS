var things = require('things-js');  
var csv = require('csv');
var C45 = require('c4.5');
var things = require('../../../lib/things.js');
var math = require('mathjs');

var pubsub_url = 'mqtt://localhost';
var pubsub_topic = 'thingsjs/IoTBench/SenMLParse';
var publish_topic = 'thingsjs/IoTBench/TRAIN/DecisionTreeClassify';

var pubsub = new things.Pubsub(pubsub_url);
var USE_MSG_FIELD_LIST; 
var SAMPLE_HEADER;
var MODEL_FILE_PATH;
var MODEL_UPDATE_FREQUENCY;
var WINDOW_COUNT = 30;
var TRAIN_RESULT_HEADER;
var CLASS_HEADER;
var traincount;
var datalist;
var processeddata;
var classification;

function setup() {
    var args = process.argv.slice(2);
    var properties;

    // default to TAXI property set if no specific property file is given
    if (!args.length) {
        args = ['../TAXI_properties.json'];
    }
    try {
        properties = JSON.parse(fs.readFileSync(args[0], 'utf-8'));

        USE_MSG_FIELD_LIST = properties['CLASSIFICATION.DECISION_TREE.USE_MSG_FIELD_LIST'];
        USE_MSG_FIELD = properties['CLASSIFICATION.DECISION_TREE.USE_MSG_FIELD'] || 0;
        //SAMPLE_HEADER = properties["CLASSIFICATION.DECISION_TREE.SAMPLE_HEADER"];
        MODEL_FILE_PATH = properties['CLASSIFICATION.DECISION_TREE.MODEL_PATH'];
        MODEL_UPDATE_FREQUENCY = properties["CLASSIFICATION.DECISION_TREE.TRAIN.MODEL_UPDATE_FREQUENCY"];
        TRAIN_RESULT_HEADER = properties["CLASSIFICATION.DECISION_TREE.TRAIN.RESULT_ATTRIBUTE"];
        CLASS_HEADER = properties["CLASSIFICATION.DECISION_TREE.TRAIN.CLASS_HEADER"];
        console.log("USE_MSG_FIELD" + USE_MSG_FIELD);
        //console.log("SAMPLE_HEADER" + SAMPLE_HEADER);
        console.log("MODEL_FILE_PATH" + MODEL_FILE_PATH);
        console.log("MODEL_UPDATE_FREQUENCY" + MODEL_UPDATE_FREQUENCY);

        if (!USE_MSG_FIELD_LIST) {
            console.log('No fields to TRAIN');
            process.exit();
        }
    } catch (e) {
        console.log('Couldn\'t fetch properties: ' + e);
        process.exit();
    }
    traincount = 0;
    datalist = [];

}

function DecisionTreeClassify(data){

traincount ++;
var target ="total_amount";
datalist.push(data);

if(traincount>= WINDOW_COUNT){
    traincount = 0;
    var quantileArray = [];
    datalist.forEach(function(element){
        quantileArray.push(element[TRAIN_RESULT_HEADER]);
    });
    var bar1 = math.quantileSeq(quantileArray, 0.25);
    var bar2 = math.quantileSeq(quantileArray, 0.50);
    var bar3 = math.quantileSeq(quantileArray, 0.75);
    var bar4 = math.quantileSeq(quantileArray, 1);

    datalist.forEach(function(element){
        element[CLASS_HEADER] = getQuantile(element[TRAIN_RESULT_HEADER], bar1, bar2, bar3, bar4);
    });

    pubsub.publish(publish_topic,datalist);
    console.log("CLASSIFIED DATA" + datalist);
    datalist = [];
	}
}


function getQuantile(data, bar1, bar2, bar3, bar4){
  if(data< bar1){
    return "BAD";
  }
  if(data >= bar1 && data<bar2){
    return "GOOD";
  }
  if(data >= bar2 && data < bar3){
    return "VERY GOOD";
  }
  if(data >= bar3 & data <= bar4){
    return "EXCELLENT";
  }
}




pubsub.on('ready', function(){
  setup();
  console.log('Beginning classify the decisiontree');
  pubsub.subscribe(pubsub_topic, DecisionTreeClassify);
});