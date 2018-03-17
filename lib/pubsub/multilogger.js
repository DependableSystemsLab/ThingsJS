var logger = require('logzio-nodejs')
// logger.log('test')

function multilogger(){
this.logz=logger.createLogger({
    token: 'yrnzxARsJPXqwZiGrlbJFjABKiUssGva',
    host: 'listener.logz.io',
    type: 'YourLogType'     // OPTIONAL (If none is set, it will be 'nodejs')
});
}
multilogger.prototype.log=function(data){
    var self=this;
    console.log(data)
    self.logz.log(data)
}
module.exports = multilogger;
