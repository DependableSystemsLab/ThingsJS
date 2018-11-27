var things = require('things-js');
var fs = require('fs');
var csv = require('csv');
var C45 = require('c4.5');

/* configurable variables */
var pubsubUrl = 'mqtt://test.mosquitto.org';
var processingTopic = 'iotbench/processing';
var subscribeTopic = processingTopic + '/decisiontreeclassify';
var publishTopic = processingTopic + '/decisiontreetrain';
var propertiesPath = './TAXI_properties.json';

/* decision tree training parameters */
var USE_MSG_FIELD_LIST, SAMPLE_HEADER, MODEL_FILE_PATH, MODEL_UPDATE_FREQUENCY, 
USE_MSG_FIELD, MODEL_TRAIN_INPUT_TYPE, TRAIN_RESULT_HEADER, MODEL_TRAIN_INPUT, processeddata;
var dataList = [];
var traincount = 0;
var WINDOW_COUNT = 10;

var pubsub = new things.Pubsub(pubsubUrl);

function setup() {
  var properties; 

  try {
    properties = JSON.parse(fs.readFileSync(propertiesPath, 'utf-8'));

  } catch(e) {
    console.log('Couldn\'t fetch properties: ' + e);
    process.exit();
  }
}

function setup() {
  var properties;

  try {
    properties = JSON.parse(fs.readFileSync(propertiesPath, 'utf-8'));
  } catch(e) {
    console.log('Couldn\'t fetch properties: ' + e);
    process.exit();
  }
  USE_MSG_FIELD_LIST = properties['TRAIN.DECISION_TREE.USE_MSG_FIELD_LIST'];
  if (!USE_MSG_FIELD_LIST) {
    console.log('No fields to train');
    process.exit();
  }
  USE_MSG_FIELD = properties['TRAIN.DECISION_TREE.USE_MSG_FIELD'] || 0;
  MODEL_TRAIN_INPUT = properties["CLASSIFICATION.DECISION_TREE.SAMPLE_HEADER"];
  MODEL_FILE_PATH = properties['TRAIN.DECISION_TREE.MODEL_PATH'];
  MODEL_UPDATE_FREQUENCY = properties["TRAIN.DECISION_TREE.TRAIN.MODEL_UPDATE_FREQUENCY"];
  TRAIN_RESULT_HEADER = properties['TRAIN.DECISION_TREE.TARGET'];
  MODEL_TRAIN_INPUT = properties['TRAIN.DECISION_TREE.TRAIN_INPUT'];
  MODEL_TRAIN_INPUT_TYPE = properties['TRAIN.DECISION_TREE.TRAIN_INPUT_TYPE'];
}

function decisionTreeTrain(msg) {
  var start = Date.now();

  var data = JSON.parse(msg);
  var savedDataList = data.content;
  var ids = data.ids;

  var features = MODEL_TRAIN_INPUT;
  var target = TRAIN_RESULT_HEADER;
  var featureTypes = MODEL_TRAIN_INPUT_TYPE;

  var processedData = processData(savedDataList, features, target);
  var c45 = C45();

  c45.train({
    data: processedData,
    target: target,
    features: features,
    featureTypes: featureTypes
  }, function(err, model) {
    if (err) {
      console.log('An error occured with training: ' + err);
      return false;
    }
    try {
      fs.writeFileSync(MODEL_FILE_PATH  , c45.toJSON());
    } catch(e) {
      console.log('Error writing model to file: ' + e);
    }
    console.log('Wrote model to: ' + MODEL_FILE_PATH  );
    var end = Date.now();
    var elapsed = end - start;
    pubsub.publish(processingTopic , { ids: ids, component: 'decisiontreetrain', time: elapsed });

  });
}

function processData(savedDataList, features, targets) {
  var resultData = [];

  savedDataList.forEach(function(element) {
    var newDataList = [];
    features.forEach(function(key) {
      newDataList.push(element[key]);
    });
    newDataList.push(element[targets]);
    resultData.push(newDataList);
  });
  return resultData;
}

pubsub.on('ready', function() {
  setup();
  console.log('Beginning decision tree train');
  pubsub.subscribe(subscribeTopic, decisionTreeTrain);
});
