var things = require('things-js');
var bloom = require('bloomfilter').BloomFilter;
var fs = require('fs');
var mongoUrl = 'mongodb://localhost:27017/things-js-fs';
var GFS = require('things-js').addons.gfs(mongoUrl);
var pubsub_url = 'mqtt://localhost';
var pubsub_topic = 'thingsjs/IoTBench/ETL/RangeFilterCheck';
var publish_topic = 'thingsjs/IoTBench/ETL/BloomFilterCheck';
var model = [34263556, 142119048, 809554946, 67321864, -1073151776, 180220686, -1055686623, -1811897856, 184864902, 674317344, -2095042559, 289689626, -518930432, 157291776, 599807120, 428376870, 33624352, 270090256, 86310996, -931064831, 272646273, 563217941, -2129490875, 136987648, -801636288, 335553056, 1346914320, -976889591, 1430801504, -1441791912];

/* bloom filter properties */
var DEFAULT_FALSEPOSITIVE = 0.1;
var DEFAULT_INSERTIONS = 20000000
var bloomFilter, testingRange, useMsgField;

var pubsub = new things.Pubsub(pubsub_url);

function getFilterSize(n, fpp) {
    return (-1) * Math.ceil((n * Math.log(fpp)) / Math.pow(Math.log(2), 2));
}

function getNumHashes(m, n) {
    return Math.ceil((m / n) * Math.log(2));
}

function createBloomFilter() {
    var args = process.argv.slice(2);
    var properties;

    // default to TAXI property set if no specific property file is given
    if (!args.length) {
        args = ['./TAXI_properties.json'];
    }
    GFS.readFile(args[0], function(err2, data) {
        if (err2) {
            console.log('\x1b[44m%s\x1b[0m', 'Couldn\'t fetch properties: ' + err2);
            process.exit();
        }
        properties = JSON.parse(data);
        useMsgField = properties['BLOOMFILTER.USE_MSG_FIELD'] || 0;
        testingRange = properties['BLOOMFILTER.EXPECTED_INSERTIONS'] || DEFAULT_INSERTIONS
        var m = getFilterSize(testingRange, properties['BLOOMFILTER.FALSEPOSITIVE_RATIO'] || DEFAULT_FALSEPOSITIVE);
        var k = getNumHashes(m, testingRange);

        try {
            bloomFilter = new bloom(model, k);
            console.log('Beginning bloom filter');
            pubsub.subscribe(pubsub_topic, doBloomFilter);
        } catch (c) {
            console.log('A problem occured: ' + c);
            process.exit();
        }
    });
}

function doBloomFilter(data) {
    var value;
    // if user specified they want to use a specific field value
    if (useMsgField > 0) {
        var keys = Object.keys(data);
        value = data[keys[useMsgField - 1]];
    } else {
        // generate a random value between 0 - testingRange
        value = Math.floor(Math.random() * testingRange + 1);
    }
    var res = bloomFilter.test(String(value));
    console.log('Bloom filter tested: ' + res);
    if (res ) {
        console.log("PASS BLOOMING");
        pubsub.publish(publish_topic, data);
    }
}

pubsub.on('ready', function() {
    createBloomFilter();
});