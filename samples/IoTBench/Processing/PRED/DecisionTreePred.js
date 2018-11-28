var things = require('things-js');
var fs = require('fs');
var csv = require('csv');
var C45 = require('c4.5');

/* configurable variables */
var pubsubUrl = 'mqtt://test.mosquitto.org';
var processingTopic = 'iotbench/processing';
var subscribeTopic = processingTopic + '/parse';
var publishTopic = processingTopic + '/decisiontreepredict';
var propertiesPath = './TAXI_properties.json';

/* decision tree prediction variables */
var USE_MSG_FIELD_LIST, SAMPLE_HEADER, MODEL_FILE_PATH, MODEL_UPDATE_FREQUENCY, 
PRED_RESULT_HEADER, MODEL_PRED_INPUT, MODEL_PRED_INPUT_TYPE;

var pubsub = new things.Pubsub(pubsubUrl);

function setup() {
  var properties;
  try {
    properties = JSON.parse(fs.readFileSync(propertiesPath, 'utf-8'));
  } catch(e) {
    console.log('Could not fetch properties: ' + e);
    process.exit();
  }
  USE_MSG_FIELD_LIST = properties['CLASSIFICATION.DECISION_TREE.USE_MSG_FIELD_LIST'];
  if (!USE_MSG_FIELD_LIST) {
    console.log('No fields to PRED');
    prcess.exit();
  }
}

function DecisionTreePred(msg) {
  var start = Date.now();
  var data = JSON.parse(msg);
  var id = data.id;
  var content = data.content;

  var processedData = [];
  var features = MODEL_PRED_INPUT;
  features.forEach(function(key) {
    processedData.push(content[key]);
  });

  var c45 = C45();
  var state = require(MODEL_FILE_PATH);
  c45.restore(state);
  var model = c45.getModel();
  var classification = model.classify(processedData);

  var end = Date.now();
  var elapsed = end - start;
  pubsub.publish(processingTopic, { id: id, component: 'decisiontreepred', time: elapsed });
  pubsub.publish(publishTopic, JSON.stringify({ id: id, content: classification }));
  console.log('Prediction results', classification);
}

pubsub.on('ready', function() {
  setup();
  console.log('Beginning decision tree prediction');
  pubsub.subscribe(subscribeTopic, DecisionTreePred);
});