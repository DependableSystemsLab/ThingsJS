var things = require('things-js');
const math = require('mathjs');
var csv = require('csv');
var C45 = require('c4.5');
var fs = require('fs');
var mongoUrl = 'mongodb://localhost:27017/things-js-fs';
var GFS = require('things-js').GFS(mongoUrl);

/* configurable variables */
var gfsFlag = true;
var pubsubUrl = 'mqtt://test.mosquitto.org';
var processingTopic = 'iotbench/processing';
var subscribeTopic = processingTopic + '/parse';
var publishTopic = processingTopic + '/decisiontreeclassify';
var propertiesPath = './TAXI_PROPERTIES.json';

var pubsub = new things.Pubsub(pubsubUrl);

/* classify variables */
var USE_MSG_FIELD_LIST, MODEL_FILE_PATH, MODEL_UPDATE_FREQUENCY, TRAIN_RESULT_HEADER,
CLASS_HEADER, datalist, processedData, classification;
var WINDOW_COUNT = 10;
var trainCount = 0;
var dataList = [];
var ids = [];
var start;

function beginComponent(properties) {
  USE_MSG_FIELD_LIST = properties['CLASSIFICATION.DECISION_TREE.USE_MSG_FIELD_LIST'];
  if (!USE_MSG_FIELD_LIST) {
    console.log('No fields to TRAIN');
    process.exit();
  }
  USE_MSG_FIELD = properties['CLASSIFICATION.DECISION_TREE.USE_MSG_FIELD'] || 0;
  MODEL_FILE_PATH = properties['CLASSIFICATION.DECISION_TREE.MODEL_PATH'];
  MODEL_UPDATE_FREQUENCY = properties["CLASSIFICATION.DECISION_TREE.TRAIN.MODEL_UPDATE_FREQUENCY"];
  TRAIN_RESULT_HEADER = properties["CLASSIFICATION.DECISION_TREE.TRAIN.RESULT_ATTRIBUTE"];
  CLASS_HEADER = properties["CLASSIFICATION.DECISION_TREE.TRAIN.CLASS_HEADER"];
  console.log('Beginning classification');
  pubsub.subscribe(subscribeTopic, DecisionTreeClassify);
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

function DecisionTreeClassify(msg) {
  if (trainCount === 0) { 
    start = Date.now();
  }
  var target = 'total_amount';

  var data = JSON.parse(msg);
  var id = data.id; 
  var content = data.content;
  dataList.push(content);
  ids.push(id);

  trainCount++;
  if (trainCount > WINDOW_COUNT) {
    trainCount = 0;
    var quantileArray = [];
    dataList.forEach(function(element) {
      quantileArray.push(element[TRAIN_RESULT_HEADER]);
    });
    var bar1 = math.quantileSeq(quantileArray, 0.25);
    var bar2 = math.quantileSeq(quantileArray, 0.50);
    var bar3 = math.quantileSeq(quantileArray, 0.75);
    var bar4 = math.quantileSeq(quantileArray, 1);

    dataList.forEach(function(element) {
      element[CLASS_HEADER] = getQuantile(element[TRAIN_RESULT_HEADER], bar1, bar2, bar3, bar4);
    });

    var end = Date.now();
    var elapsed = end - start;
    pubsub.publish(processingTopic, { ids: ids, component: 'decisiontreeclassify', time: elapsed });

    pubsub.publish(publishTopic, JSON.stringify({ ids: ids, content: dataList }));
    console.log('Classified data: ' + dataList);
    ids = [];
    dataList = [];
  }
}

function getQuantile(data, bar1, bar2, bar3, bar4) {
  if (data < bar1) {
    return "BAD";
  }
  if ((data >= bar1) && (data < bar2)) {
    return "GOOD";
  }
  if ((data >= bar2) && (data < bar3)) {
    return "VERY GOOD";
  }
  if ((data >= bar3) & (data <= bar4)) {
    return "EXCELLENT";
  }
}

pubsub.on('ready', function() {
  setup();
});
