var things = require('things-js');
var fs = require('fs');
var mongoUrl = 'mongodb://localhost:27017/things-js-fs';
var GFS = require('things-js').GFS(mongoUrl);
var csv = require('csv');
var MLR  = require('ml-regression-multivariate-linear');

/* configurable variables */
var gfsFlag = true;
var pubsubUrl = 'mqtt://test.moquitto.org';
var processingTopic = 'iotbench/processing';
var subscribeTopic = processingTopic + '/mlrpredict';  
var publishTopic = processingTopic + '/residualerror';
var propertiesPath = './TAXI_properties.json';

/* residual error variables */
var USE_MSG_FIELD_LIST, USE_MSG_FIELD, SAMPLE_HEADER, MODEL_FILE_PATH, MODEL_UPDATE_FREQUENCY,
PRED_INPUT, PRED_OUTPUT, PRED_INPUT_TYPE;

var pubsub = new things.Pubsub(pubsubUrl);

function beginComponent(properties) {
  USE_MSG_FIELD_LIST = properties['PREDICT.MULTIPLELINEAR_REGRESSION.USE_MSG_FIELD_LIST'];
  if (!USE_MSG_FIELD_LIST) {
    console.log('No fields to TRAIN');
    process.exit();
  }
  USE_MSG_FIELD = properties["PREDICT.MULTIPLELINEAR_REGRESSION.USE_MSG_FIELD"] || 0;
  SAMPLE_HEADER = properties["CLASSIFICATION.DECISION_TREE.SAMPLE_HEADER"];
  MODEL_FILE_PATH = properties["PREDICT.MULTIPLELINEAR_REGRESSION.MODEL_PATH"];
  MODEL_UPDATE_FREQUENCY = properties["PREDICT.MULTIPLELINEAR_REGRESSION.TRAIN.MODEL_UPDATE_FREQUENCY"];
  PRED_INPUT = properties["PREDICT.MULTIPLELINEAR_REGRESSION.TRAIN_INPUT"];
  PRED_OUTPUT = properties["PREDICT.MULTIPLELINEAR_REGRESSION.TRAIN_OUTPUT"];
  PRED_INPUT_TYPE = properties["PREDICT.MULTIPLELINEAR_REGRESSION.TRAIN_INPUT_TYPE"]; 

  console.log('Calculating residual error');
  pubsub.subscribe(subscribeTopic, CalculateRE);
}

function setup() {
  var properties;
  if (gfsFlag) {
    GFS.readFile(propertiesPath, function(err, data) {
      if (err) {
        console.log('Could not fetch properties: ' + err);
        process.exit();
      }
      properties = JSON.parse(data);
      beginComponent(properties);
    });
  } else {
    try {
      properties = JSON.parse(fs.readFileSync(propertiesPath, 'utf-8'));
    } catch(e) {
      console.log('Could not fetch properties');
      process.exit();
    }
    beginComponent(properties);
  }
}

function CalculateRE(msg) {
  var start = Date.now();

  var data = JSON.parse(msg);
  var id = data.id;
  var content = data.content;

  var res = content.actual - content.predict;

  var end = Date.now();
  var elapsed = end - start;
  pubsub.publish(processingTopic, { id: id, component: 'residualerror', time: elapsed });
  pubsub.publish(publishTopic, JSON.stringify({ id: id, content: res }));

  console.log('Residual Error', res);
}


pubsub.on('ready', function() {
  setup();
});