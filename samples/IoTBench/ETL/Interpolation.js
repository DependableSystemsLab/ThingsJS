var things = require('things-js');
var fs = require('fs');
var mongoUrl = 'mongodb://localhost:27017/things-js-fs';
var GFS = require('things-js').addons.gfs(mongoUrl);

var pubsub_url = 'mqtt://localhost';
var pubsub_topic = 'thingsjs/IoTBench/ETL/BloomFilterCheck';
var publish_topic = 'thingsjs/IoTBench/ETL/Interpolation';
var measurement_topic = 'iotbench/processing';

var pubsub = new things.Pubsub(pubsub_url);

/* interpolation properties */
var ID = 'ID';
var USE_MSG_FIELD_LIST, WINDOW_SIZE;
var valuesMap = {};

// mkdir RIOT/ETL folder if not exist 
// save file inside 
function setup() {
    var args = process.argv.slice(2);
    var properties;

    // default to TAXI property set if no specific property file is given
    if (!args.length) {
        args = ['./TAXI_properties.json'];
    }

    GFS.readFile(args[0], function(err2, data){
        if (err2) {
            console.log('\x1b[44m%s\x1b[0m', 'Couldn\'t fetch properties: ' + err2);
            process.exit();
        }
        properties = JSON.parse(data);
        USE_MSG_FIELD_LIST = properties['INTERPOLATION.USE_MSG_FIELD_LIST'];
        WINDOW_SIZE = properties['INTERPOLATION.WINDOW_SIZE'] || 0;
        if (!USE_MSG_FIELD_LIST) {
            console.log('No fields to interpolate');
            process.exit();
        }
	    console.log('Beginning Interpolation');
	    pubsub.subscribe(pubsub_topic, interpolate);
    });
}

function interpolate(data) {
    var date = new Date(); var timestamp = date.getTime();
    data = JSON.parse(data);
    console.log(timestamp+" : "+data["line_id"] + " For "+"INTERPOLATION");
    console.log("START INTERPOLATION!!!!");

     var content = data["content"];

    if (WINDOW_SIZE == 0) {
        // do nothing with the data
        console.log('No interpolation needed. Publishing data');
        pubsub.publish(publish_topic, JSON.stringify(data));
        var timeobj = {"id":data["line_id"],"component":"interpolate","time":timestamp};
        pubsub.publish(measurement_topic,JSON.stringify(timeobj));
        return;
    }

    USE_MSG_FIELD_LIST.forEach(function(field) {
        var key = ID + field;

        if (field in content) {

            if (key in valuesMap) {
                if (content[field] === null) {
                    var count = 0;
                    valuesMap[key].forEach(function(val) {
                        count += val;
                    });
                    var newValue = (count) / (valuesMap[key].length);
                    console.log('Interpolated field ' + field + 'with new value: ' + newValue);
                    content[field] = newValue;
                } else {
                    // add the new data in
                    if (valuesMap[key].length === WINDOW_SIZE) {
                        valuesMap.splice(0, 1);
                    }
                    valuesMap[key].push(content[field]);
                }
            } else if (content[field] !== null) {
                valuesMap[key] = [content[Field]];
            }
        }
    });


    var object = {"line_id":data["line_id"],"content":content};
    pubsub.publish(publish_topic, JSON.stringify(object));
    var timeobj = {"id":data["line_id"],"component":"interpolate","time":timestamp};
    pubsub.publish(measurement_topic,JSON.stringify(timeobj));
}

pubsub.on('ready', function() {
    setup();
});