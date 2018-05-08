var assert = require('assert');
var things = require('../../../lib/things.js');
var expect = require('chai').expect;
var should = require('chai').should();
var fs = require('fs');
var mqtt = require('mqtt');
var mosca = require('mosca');

/** A framework for testing the basic functionalities 
 * of code engine
 *
 * usage: env URL=<pubsub URL> mocha Pubsub_test.js
 */
describe('basic pubsub test suite', function(){

	var self = this;
	const NUMINSTANCES = 3;
	self.pubsubs = [];
	self.logs = [];
	

	before(function(){
		this.timeout(10000);

		if(!process.env.URL){
			console.log('usage: env URL=<pubsub url> mocha Pubsub_test.js');
			process.exit();
		}

		var initPubsubs = function(i){
			return new Promise(function(resolve){
				self.pubsubs[i] = new things.Pubsub(process.env.URL.toString());
				self.pubsubs[i].once('ready', function(){
					resolve();
				});
			});
		}

		var promises = [];
		for(var i = 0; i < NUMINSTANCES; i++){
			promises.push(initPubsubs(i));
		}

		return new Promise(function(resolve){
			self.server = mosca.Server({ port: 1883 });
			self.server.on('ready', function(){
				Promise.all(promises).then(function(){
					resolve();
				});
			});
		});

	});

	describe('setup tests', function(){

		it('initializes with an id', function(){
			self.pubsubs.forEach(function(pubsub){
				expect(pubsub.id).to.be.a('string');
			});
		});
	});

	describe('subscribe tests', function(){
		// use raw mqtt node to publish messages
		before(function(){
			return new Promise(function(resolve){
				self.publisher = mqtt.connect(process.env.URL.toString());
				self.publisher.on('connect', function(){
					resolve();
				});
			});
		});

		it('receives a message for a topic it is subscribed to', function(){
			this.timeout(10000);
			return new Promise(function(resolve){
				self.pubsubs[0].subscribe('test', function(data){
					resolve(data);
				});

				self.publisher.publish('test', JSON.stringify({ data: 'hello' }));

			}).then(function(res){
				expect(res.data).to.equal('hello');
			});
		});

		it('subscription to same topic overwrites previous handler', function(){
			this.timeout(10000);
			return new Promise(function(resolve){
				self.pubsubs[0].subscribe('test', function(data){
					resolve('overwritten');
				});

				self.publisher.publish('test', JSON.stringify({ data: 'hello' }));

			}).then(function(res){
				expect(res).to.equal('overwritten');
			});
		});

		it('receives multiple messages for a topic in order', function(){
			var replies = [];
			var numTimes = 5;

			return new Promise(function(resolve){
				self.pubsubs[0].subscribe('test', function(data){
					replies.push(data);
					if(replies.length === numTimes){
						resolve(replies);
					}
				});
				for(var i = 0; i < numTimes; i++){
					self.publisher.publish('test', i.toString());
				}

			}).then(function(res){
				var val = 0;
				replies.forEach(function(num){
					expect(num).to.equal(val);
					val++;
				});
			});
		});

		it('receives multiple messages for multiple topics', function(){
			var numTimes = 3;
			var msgs = {};
			var topicNames = ['test', 'test2', 'test3'];

			topicNames.forEach(function(topic){
				self.pubsubs[0].subscribe(topic, function(data){
					if(msgs[topic]){
						msgs[topic].push(data);
					}
					else{
						msgs[topic] = [data];
					}
				});
			});

			return new Promise(function(resolve){
				for(var i = 0; i < numTimes; i++){
					topicNames.forEach(function(topic){
						self.publisher.publish(topic, i.toString());
					});
				}
				// wait a bit for messages to be received
				setTimeout(function(){
					resolve(msgs);
				}, 500);

			}).then(function(res){
				for(topic in msgs){
					var val = 0;

					var data = msgs[topic];
					expect(data.length).to.equal(numTimes);
					data.forEach(function(num){
						expect(num).to.equal(val);
						val++;
					});
				}
			});

		});

		it('does not receive a message once unsubscribed', function(){
			this.skip();
			var replies = [];
			var numTimes = 100;

			self.pubsubs[0].subscribe('test', function(data){
				replies.push(data);
			});

			return new Promise(function(resolve){
				var promises = [];

				// unsubscribe after a certain time
				for(var i = 0; i < numTimes; i++){
					self.publisher.publish('test', i.toString());
					if(i === 5){
						promise = self.pubsubs[0].unsubscribe('test');
					}
				}
				// wait a bit for msgs to be received before resolving
				setTimeout(function(){ resolve(replies) }, 1000);

			}).then(function(res){
				expect(res.length).to.be.below(numTimes);
			});

		});

		after(function(){
			self.publisher.end();
		});

	});

	describe('publish tests', function(){

		before(function(){
			self.subscriber = mqtt.connect(process.env.URL.toString());
			return new Promise(function(resolve){
				self.subscriber.on('connect', function(){
					resolve();
				})
			});
		})

		it('can publish to a subscribed node', function(){

			return new Promise(function(resolve){
				self.subscriber.subscribe('pubtest');
				self.subscriber.on('message', function(topic, data){
					resolve(JSON.parse(data));
				});

				self.pubsubs[0].publish('pubtest', 'received');

			}).then(function(data){
				expect(data).to.equal('received');
			});
		});

		it('can publish to muliple nodes', function(){
			var rcved = [];

			return new Promise(function(resolve){
				self.pubsubs.forEach(function(pubsub){
					pubsub.subscribe('test', function(data){
						rcved.push(data);
						if(rcved.length === NUMINSTANCES){
							resolve(rcved);
						}
					});
				});

				self.pubsubs[0].publish('test', 'received');

			}).then(function(res){
				rcved.forEach(function(msg){
					expect(msg).to.equal('received');
				});
			});
		});

		after(function(){
			self.subscriber.end();
		});

	});

	after(function(){
		self.server.close();
		self.pubsubs.forEach(function(pubsub){
			if(pubsub){
				pubsub.kill();
			}
		});
	})

});
