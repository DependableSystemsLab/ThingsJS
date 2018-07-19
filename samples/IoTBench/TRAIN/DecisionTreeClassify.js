var fs = require('fs');
var csv = require('csv');
var C45 = require('c4.5');
var things = require('../../../lib/things.js');

var pubsub_url = 'mqtt://localhost';
var pubsub_topic = 'thingsjs/IoTBench/ETL/SenMLParse';
var publish_topic = 'thingsjs/IoTBench/TRAIN/DecisionTreeClassify';

var pubsub = new things.Pubsub(pubsub_url);
var USE_MSG_FIELD_LIST; 
var SAMPLE_HEADER;
var MODEL_FILE_PATH;
var MODEL_UPDATE_FREQUENCY;
var WINDOW_COUNT = 10;
var traincount;
var datalist;
var processeddata;
var classification;

function setup() {
    var args = process.argv.slice(2);
    var properties;

    // default to TAXI property set if no specific property file is given
    if (!args.length) {
        args = ['../ETL/TAXI_properties.json'];
    }
    try {
        properties = JSON.parse(fs.readFileSync(args[0], 'utf-8'));

        USE_MSG_FIELD_LIST = properties['CLASSIFICATION.DECISION_TREE.USE_MSG_FIELD_LIST'];
        USE_MSG_FIELD = properties['CLASSIFICATION.DECISION_TREE.USE_MSG_FIELD'] || 0;
        //SAMPLE_HEADER = properties["CLASSIFICATION.DECISION_TREE.SAMPLE_HEADER"];
        MODEL_FILE_PATH = properties['CLASSIFICATION.DECISION_TREE.MODEL_PATH'];
        MODEL_UPDATE_FREQUENCY = properties["CLASSIFICATION.DECISION_TREE.TRAIN.MODEL_UPDATE_FREQUENCY"];
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





    traincount = 0;

}

function DecisionTreeClassify(data){

traincount ++;
var target ="total_amount";
datalist.push(data);


if(traincount>= WINDOW_COUNT){

		annotationMap.put(Double.valueOf(percentile.evaluate(25)), "BAD");
		annotationMap.put(Double.valueOf(percentile.evaluate(50)), "GOOD");
		annotationMap.put(Double.valueOf(percentile.evaluate(75)), "VERYGOOD");
		annotationMap.put(Double.valueOf(percentile.evaluate(100)), "EXCELLENT");
		
		fs.writeFileSync(MODEL_FILE_PATH, classification.toJSON());
		datalist = [];
	}
}




pubsub.on('ready', function(){
  setup();
  console.log('Beginning classify the decisiontree');
  pubsub.subscribe(pubsub_topic, DecisionTreeClassify);
});