var things_js = require('things-js');
var fsHelper = require('./fsHelper.js');

console.log('\x1b[44m%s\x1b[0m', '[FSCOMMUNICATION Service] START TESTING...');

var fsHelper1 = new fsHelper();
fsHelper1.navigateTo('', true);
fsHelper1.makeDir('RIOT');
// fsHelper.navigateTo('RIOT/', true);
// fsHelper.makeDir('ETL');
// fsHelper.navigateTo('RIOT/', true);
