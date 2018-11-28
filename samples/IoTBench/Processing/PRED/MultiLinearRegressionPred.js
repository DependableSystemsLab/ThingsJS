var things = require('things-js');
var fs = require('fs');
var csv = require('csv');
var MLR  = require('ml-regression-multivariate-linear');

/* configurable variables */
var pubsubUrl = 'mqtt://test.mosquitto.org';
var processingTopic = 'iotbench/processing';
var publishTopic = processingTopic + '/parse';  
var subscribeTopic = processingTopic + '/mlrpredict';
var propertiesPath = './TAXI_properties.json';

/* mlr prediction variables */
var USE_MSG_FIELD_LIST, USE_MSG_FiELD, SAMPLE_HEADER, MODEL_FILE_PATH, MODEL_UPDATE_FREQUENCY,
PRED_INPUT, PRED_OUTPUT, PRED_INPUT_TYPE, weights;

var pubsub = new things.Pubsub(pubsubUrl);

function setup() {
  var properties;
  try {
    properties = JSON.parse(fs.readFileSync(propertiesPath, 'utf-8'));
  } catch(e) {
    console.log('Could not fetch properties: ' + e);
    process.exit();
  }
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

  try {
    weights = JSON.parse(fs.readFileSync(MODEL_FILE_PATH, 'utf-8'));
  } catch(e) {
    console.log('Could not fetch weights: ' + e);
    process.exit();
  }
}

function MultiLinearRegressionPred(msg) {
  var data = JSON.parse(msg);
  var id = data.id;
  var content = data.content;

  var processedData = [];
  var features = PRED_INPUT;
  var target = PRED_OUTPUT;

  features.forEach(function(key) {
    processedData.push(Number(content[key]));
  });
  processedData.push(1);

  var result = 0;
  for (var i = 0; i < processedData.length; i++) {
    result += processedData[i] * weights[i];
  }

  var end = Date.now();
  var elapsed = end - start;
  pubsub.publish(processingTopic, { id: id, component: 'mlrpredict', time: elapsed });

  // publish both predict result and true result;
  var outputResult = { 'predict': result, 'actual': content[target] };
  pubsub.publish(publishTopic, JSON.stringify({ id: id, content: outputResult }));

  console.log('Result', outputResult);
}

pubsub.on('ready', function() {
  setup();
  console.log('Beginning MRL prediction');
  pubsub.subscribe(subscribeTopic, MultiLinearRegressionPred);
});