var fs = require('fs');
var MLR = require('ml-regression-multivariate-linear');
var things = require('things-js');
var mongoUrl = 'mongodb://localhost:27017/things-js-fs';
var GFS = require('things-js').addons.gfs(mongoUrl);

var pubsub_url = 'mqtt://localhost';
var pubsub_topic = 'thingsjs/IoTBench/SenMLParse';
var publish_topic = 'thingsjs/IoTBench/TRAIN/MultiLinearRegressionTrain';
var measurement_topic = 'iotbench/processing';

var pubsub = new things.Pubsub(pubsub_url);
var USE_MSG_FIELD_LIST;
var SAMPLE_HEADER;
var MODEL_FILE_PATH;
var MODEL_UPDATE_FREQUENCY;
var TRAIN_INPUT;
var TRAIN_OUTPUT;
var TRAIN_INPUT_TYPE;
var WINDOW_COUNT = 10;
var traincount;
var datalist = [];
var processeddata;

function setup() {
    var args = process.argv.slice(2);
    var properties;

    // default to TAXI property set if no specific property file is given
    if (!args.length) {
        args = ['./TAXI_properties.json'];
    }
    // try{
    GFS.readFile(args[0], function(err2, data) {
        if (err2) {
            console.log('\x1b[44m%s\x1b[0m', 'Couldn\'t fetch properties: ' + err2);
            process.exit();
        }
        properties = JSON.parse(data);
        USE_MSG_FIELD_LIST = properties['PREDICT.MULTIPLELINEAR_REGRESSION.USE_MSG_FIELD_LIST'];
        USE_MSG_FIELD = properties["PREDICT.MULTIPLELINEAR_REGRESSION.USE_MSG_FIELD"] || 0;
        SAMPLE_HEADER = properties["CLASSIFICATION.DECISION_TREE.SAMPLE_HEADER"];
        MODEL_FILE_PATH = properties["PREDICT.MULTIPLELINEAR_REGRESSION.MODEL_PATH"];
        MODEL_UPDATE_FREQUENCY = properties["PREDICT.MULTIPLELINEAR_REGRESSION.TRAIN.MODEL_UPDATE_FREQUENCY"];
        TRAIN_INPUT = properties["TRAIN.MULTIPLELINEAR_REGRESSION.TRAIN_INPUT"];
        TRAIN_OUTPUT = properties["TRAIN.MULTIPLELINEAR_REGRESSION.TRAIN_OUTPUT"];
        TRAIN_INPUT_TYPE = properties["TRAIN.MULTIPLELINEAR_REGRESSION.TRAIN_INPUT_TYPE"];
        console.log("USE_MSG_FIELD" + USE_MSG_FIELD);
        console.log("SAMPLE_HEADER" + SAMPLE_HEADER);
        console.log("MODEL_FILE_PATH" + MODEL_FILE_PATH);
        console.log("MODEL_UPDATE_FREQUENCY" + MODEL_UPDATE_FREQUENCY);

        if (!USE_MSG_FIELD_LIST) {
            console.log('No fields to TRAIN');
            process.exit();
        }

        traincount = 0;
        datalist = [];
        console.log('Beginning training by decisiontree');
        pubsub.subscribe(pubsub_topic, MultiLinearRegressionTrain);
    });
    // }
    // catch(e){
    //   console.log('Couldn\'t fetch properties: ' + e);
    //   process.exit();
    // }


}


function MultiLinearRegressionTrain(data) {
    var date = new Date();
    var timestamp = date.getTime();
    var data = JSON.parse(data);
    var content = data["content"];
    console.log(timestamp + " : " + data["line_id"]);

    var features = TRAIN_INPUT;
    var target = TRAIN_OUTPUT;
    var featureTypes = TRAIN_INPUT_TYPE;
    var target_data = [];
    datalist.push(content);

    traincount++;

    if (traincount >= WINDOW_COUNT) {
        traincount = 0;
        console.log("collect" + WINDOW_COUNT + "data to train by decisionTree");
        feature_data = processdata(datalist, features);
        datalist.forEach(function(element) {
            var newArray = [];
            newArray.push(Number(element[target]));
            target_data.push(newArray);
        });
        console.log("TARGET_DATA" + target_data);

        var mlr = new MLR(feature_data, target_data);
        console.log(mlr);
        console.log('\n\n\n');
        var weights = mlr.weights;
        console.log(weights);
        //pubsub.publish(publish_topic,c45.toJSON()); no pubsub to make it stateless for prediction
        var timeobj = {"id":data["line_id"],"component":"multiregtrain","time":timestamp};
        pubsub.publish(measurement_topic,JSON.stringify(timeobj));
        GFS.writeFile(MODEL_FILE_PATH, JSON.stringify(weights), function(err) {
            if (err) {
                throw err;
            }
            datalist = [];
        });
    }
}



function processdata(datalist, features) {
    var resultdata = [];

    datalist.forEach(function(element) {
        var newdatalist = [];
        features.forEach(function(key) {
            newdatalist.push(Number(element[key]));
        })
        resultdata.push(newdatalist);
    });


    console.log(resultdata);
    return resultdata;
}




pubsub.on('ready', function() {
    setup();

});