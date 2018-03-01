/*
 usage: node start.js
*/
FSServer = require('./FSServer.js');
var mongoURL = 'mongodb://localhost:27017/fs'

var server = new FSServer(mongoURL);
server.start();