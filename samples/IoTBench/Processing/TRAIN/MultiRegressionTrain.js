var things = require('things-js');
var fs = require('fs');
var MLR = require('ml-regression-multivariate-linear');
var mongoUrl = 'mongodb://localhost:27017/things-js-fs';
var GFS = require('things-js').GFS(mongoUrl);

/* configurable variables */
var gfsFlag = true;
var pubsubUrl = 'mqtt://test.mosquitto.org';
var processingTopic = 'iotbench/processing';
var subscribeTopic = processingTopic + '/parse';
var publishTopic = processingTopic + '/mlrtrain';
var propertiesPath = './TAXI_properties.json';

/* mlr variables */
var USE_MSG_FIELD_LIST, SAMPLE_HEADER, MODEL_FILE_PATH, MODEL_UPDATE_FREQUENCY,
TRAIN_INPUT, TRAIN_OUTPUT, TRAIN_INPUT_TYPE;
var WINDOW_COUNT = 10;
var trainCount = 0;
var dataList = [];
var ids = [];
var trainCount, processedData, start;

var pubsub = new things.Pubsub(pubsubUrl);

function beginComponent(properties) {
  USE_MSG_FIELD = properties["PREDICT.MULTIPLELINEAR_REGRESSION.USE_MSG_FIELD"] || 0;
  SAMPLE_HEADER = properties["CLASSIFICATION.DECISION_TREE.SAMPLE_HEADER"];
  MODEL_FILE_PATH = properties["PREDICT.MULTIPLELINEAR_REGRESSION.MODEL_PATH"];
  MODEL_UPDATE_FREQUENCY = properties["PREDICT.MULTIPLELINEAR_REGRESSION.TRAIN.MODEL_UPDATE_FREQUENCY"];
  TRAIN_INPUT = properties["TRAIN.MULTIPLELINEAR_REGRESSION.TRAIN_INPUT"];
  TRAIN_OUTPUT = properties["TRAIN.MULTIPLELINEAR_REGRESSION.TRAIN_OUTPUT"];
  TRAIN_INPUT_TYPE = properties["TRAIN.MULTIPLELINEAR_REGRESSION.TRAIN_INPUT_TYPE"];
  console.log('Beginning MLR');
  pubsub.subscribe(subscribeTopic, MultiLinearRegressionTrain);
}

function setup() {
  var properties;
  if (gfsFlag) {
    GFS.readFile(propertiesPath, function(err, data) {
      if (err) {
        console.log('Problem fetching properties: ' + err);
        process.exit();
      }
      properties = JSON.parse(data);
      beginComponent(properties);
    });
  } else {
    try {
      properties = JSON.parse(fs.readFileSync(propertiesPath, 'utf-8'));
    } catch (e) {
      console.log('Problem fetching properties: ' + e);
      process.exit();
    }
    beginComponent(properties);
  }
}

function MultiLinearRegressionTrain(msg) {
  if (trainCount === 0) {
    start = Date.now();
  }
  var data = JSON.parse(msg);
  var id = data.id;
  var content = data.content;

  var features = TRAIN_INPUT;
  var target = TRAIN_OUTPUT;
  var featureTypes = TRAIN_INPUT_TYPE;
  var targetData = [];
  dataList.push(content);
  ids.push(id);

  trainCount++;
  if (trainCount > WINDOW_COUNT) {
    trainCount = 0;
    console.log('Collected ' + WINDOW_COUNT + ' data to train decision tree');

    var featureData = processData(dataList, features);
    dataList.forEach(function(element) {
      var newArray = [];
      newArray.push(Number(element[target]));
      targetData.push(newArray);
    });
    console.log('Target data ' + targetData);
    var mlr = new MLR(featureData, targetData);
    var weights = mlr.weights;

    var end = Date.now();
    var elapsed = end - start;
    pubsub.publish(processingTopic, { ids: ids, component: 'mlrtrain', time: elapsed });

    dataList = [];
    ids = [];

    fs.writeFileSync(MODEL_FILE_PATH, JSON.stringify(weights), function(err) {
      if (err) throw err;
    });
  }
}

function processData(dataList, features) {
  var resultData = [];

  dataList.forEach(function(element) {
    var newDataList = [];

    features.forEach(function(key) {
      newDataList.push(Number(element[key]));
    });
    resultData.push(newDataList);
  });

  return resultData;
}

pubsub.on('ready', function() {
  setup();
});
