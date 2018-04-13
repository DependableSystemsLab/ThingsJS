/*
 usage: node startFS.js
*/
FSServer = require('./FSServer.js');
var mongoURL = 'mongodb://localhost:27017/things-filesystem'

var server = new FSServer(mongoURL);
server.start();