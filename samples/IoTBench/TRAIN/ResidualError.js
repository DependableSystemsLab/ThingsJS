var fs = require('fs');
var csv = require('csv');
var MLR  = require('ml-regression-multivariate-linear');
var things = require('../../../lib/things.js');

var pubsub_url = 'mqtt://localhost';
var pubsub_topic = 'thingsjs/IoTBench/ETL/MultiLinearRegressionPred';  
var publish_topic = 'thingsjs/IoTBench/TRAIN/ResidualError';

var pubsub = new things.Pubsub(pubsub_url);