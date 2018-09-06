var assert = require('assert');
var things = require('../lib/things.js');
var helpers = require('../lib/helpers.js');
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
describe('Pubsub Test', function(){
	var self = this;

	const NUMINSTANCES = 3;
	const PUBSUB_URL = 'mqtt://localhost';

	// self.pubsubs = [];
	// self.logs = [];

	var pubsubs = [];

	it('Initialize Multiple Pubsub objects', function(done){
		var promises = [];
		for (var i = 0; i < NUMINSTANCES; i++){
			promises.push(new Promise(function(resolve, reject){
				var pubsub = new things.Pubsub(PUBSUB_URL);
				pubsub.once('ready', function(){
					resolve();
				})
				pubsubs.push(pubsub);
			}))
		}
		Promise.all(promises)
			.then(function(){
				done();
			})
	});

	// before(function(){
	// 	this.timeout(10000);

	// 	// if(!process.env.URL){
	// 	// 	console.log('usage: env URL=<pubsub url> mocha Pubsub_test.js');
	// 	// 	process.exit();
	// 	// }

	// 	var initPubsubs = function(i){
	// 		return new Promise(function(resolve){
	// 			self.pubsubs[i] = new things.Pubsub(PUBSUB_URL);
	// 			self.pubsubs[i].once('ready', function(){
	// 				resolve();
	// 			});
	// 		});
	// 	}

	// 	var promises = [];
	// 	for(var i = 0; i < NUMINSTANCES; i++){
	// 		promises.push(initPubsubs(i));
	// 	}

	// 	return new Promise(function(resolve){
	// 		self.server = mosca.Server({ port: 1883 });
	// 		self.server.on('ready', function(){
	// 			Promise.all(promises).then(function(){
	// 				resolve();
	// 			});
	// 		});
	// 	});

	// });

	it('has assigned ids', function(){
		// for (var key in pubsubs){
		// 	expect(pubsubs[key].id).to.be.a('string');
		// }
		pubsubs.forEach(function(pubsub){
			expect(pubsub.id).to.be.a('string');
		});
	});

	describe('Subscription', function(){
		// use raw mqtt node to publish messages
		var publisher, deferred, deferredMulti;
		before(function(){
			return new Promise(function(resolve){
				deferred = helpers.defer();
				deferredMulti = helpers.defer();
				deferredMulti.messages = [];
				publisher = mqtt.connect(PUBSUB_URL);
				publisher.on('connect', function(){
					resolve();
				});
			});
		});

		it('subscribes', function(done){
			pubsubs[0].subscribe('test', function(message, topic){
				deferred.resolve(message);
			}).then(function(){
				return pubsubs[0].subscribe('test-multi', function(message, topic){
					deferredMulti.messages.push(message);
					if (deferredMulti.messages.length === 5) deferredMulti.resolve(deferredMulti.messages);
				})
			}).then(function(){
				done();
			})
		});

		it('receives a message for a topic it is subscribed to', function(done){
			publisher.publish('test', JSON.stringify({ data: 'hello' }));
			deferred.promise.then(function(message){
				expect(message.data).to.equal('hello');
				done();
			});

			// this.timeout(10000);
			// return new Promise(function(resolve){
			// 	self.pubsubs[0].subscribe('test', function(data){
			// 		resolve(data);
			// 	});

			// 	self.publisher.publish('test', JSON.stringify({ data: 'hello' }));

			// }).then(function(res){
			// 	expect(res.data).to.equal('hello');
			// });
		});

		// it('subscription to same topic overwrites previous handler', function(){
		// 	this.timeout(10000);
		// 	return new Promise(function(resolve){
		// 		self.pubsubs[0].subscribe('test', function(data){
		// 			resolve('overwritten');
		// 		});

		// 		self.publisher.publish('test', JSON.stringify({ data: 'hello' }));

		// 	}).then(function(res){
		// 		expect(res).to.equal('overwritten');
		// 	});
		// });

		it('receives multiple messages for a topic in order', function(done){
			// var replies = [];
			// var numTimes = 5;

			for(var i = 0; i < 5; i++){
				publisher.publish('test-multi', JSON.stringify({ index: i }));
			}
			deferredMulti.promise.then(function(messages){
				messages.forEach(function(message, index){
					// console.log(message);
					expect(message.index).to.equal(index);
				});
				// expect(message.data).to.equal('hello');
				done();
			});

			// return new Promise(function(resolve){
			// 	self.pubsubs[0].subscribe('test', function(data){
			// 		replies.push(data);
			// 		if(replies.length === numTimes){
			// 			resolve(replies);
			// 		}
			// 	});
			// 	for(var i = 0; i < numTimes; i++){
			// 		self.publisher.publish('test', i.toString());
			// 	}

			// }).then(function(res){
			// 	var val = 0;
			// 	replies.forEach(function(num){
			// 		expect(num).to.equal(val);
			// 		val++;
			// 	});
			// });
		});

		// it('receives multiple messages for multiple topics', function(){
		// 	var numTimes = 3;
		// 	var msgs = {};
		// 	var topicNames = ['test', 'test2', 'test3'];

		// 	topicNames.forEach(function(topic){
		// 		self.pubsubs[0].subscribe(topic, function(data){
		// 			if(msgs[topic]){
		// 				msgs[topic].push(data);
		// 			}
		// 			else{
		// 				msgs[topic] = [data];
		// 			}
		// 		});
		// 	});

		// 	return new Promise(function(resolve){
		// 		for(var i = 0; i < numTimes; i++){
		// 			topicNames.forEach(function(topic){
		// 				self.publisher.publish(topic, i.toString());
		// 			});
		// 		}
		// 		// wait a bit for messages to be received
		// 		setTimeout(function(){
		// 			resolve(msgs);
		// 		}, 500);

		// 	}).then(function(res){
		// 		for(topic in msgs){
		// 			var val = 0;

		// 			var data = msgs[topic];
		// 			expect(data.length).to.equal(numTimes);
		// 			data.forEach(function(num){
		// 				expect(num).to.equal(val);
		// 				val++;
		// 			});
		// 		}
		// 	});

		// });

		it('does not receive a message once unsubscribed', function(done){

			pubsubs[0].unsubscribe('test')
			.then(function(){
				pubsubs[0].on('messageReceived', function(data){
					if (data.topic === 'test')
						done(new Error('Received message for unsubscribed topic'));
				});
				publisher.publish('test', JSON.stringify({ data: 'hello again' }));
				setTimeout(function(){
					done();
				}, 1000);
			});

			// this.skip();
			// var replies = [];
			// var numTimes = 100;

			// self.pubsubs[0].subscribe('test', function(data){
			// 	replies.push(data);
			// });

			// return new Promise(function(resolve){
			// 	var promises = [];

			// 	// unsubscribe after a certain time
			// 	for(var i = 0; i < numTimes; i++){
			// 		self.publisher.publish('test', i.toString());
			// 		if(i === 5){
			// 			promise = self.pubsubs[0].unsubscribe('test');
			// 		}
			// 	}
			// 	// wait a bit for msgs to be received before resolving
			// 	setTimeout(function(){ resolve(replies) }, 1000);

			// }).then(function(res){
			// 	expect(res.length).to.be.below(numTimes);
			// });

		});

		after(function(){
			publisher.end();
		});

	});

	describe('Publication', function(){
		var subscriber, deferred, deferredMulti;

		before(function(){
			return new Promise(function(resolve){
				deferred = helpers.defer();
				deferredMulti = helpers.defer();
				deferredMulti.messages = [];
				subscriber = mqtt.connect(PUBSUB_URL);
				subscriber.on('message', function(topic, data){
					if (topic === 'pubtest') deferred.resolve(JSON.parse(data));
				});
				subscriber.on('connect', function(){
					// resolve();
					subscriber.subscribe('pubtest', function(){
						resolve();
					});
				});
			});
		})

		it('can publish to a subscribed node', function(done){
			deferred.promise
				.then(function(message){
					expect(message.data).to.equal('hello');
					done(); 
				})
				.catch(done);
			pubsubs[0].publish('pubtest', { data: 'hello' });

			// return new Promise(function(resolve){
			// 	self.subscriber.subscribe('pubtest');
			// 	self.subscriber.on('message', function(topic, data){
			// 		resolve(JSON.parse(data));
			// 	});

			// 	self.pubsubs[0].publish('pubtest', 'received');

			// }).then(function(data){
			// 	expect(data).to.equal('received');
			// });
		});

		// it('can publish to muliple nodes', function(){
		// 	var rcved = [];

		// 	return new Promise(function(resolve){
		// 		self.pubsubs.forEach(function(pubsub){
		// 			pubsub.subscribe('test', function(data){
		// 				rcved.push(data);
		// 				if(rcved.length === NUMINSTANCES){
		// 					resolve(rcved);
		// 				}
		// 			});
		// 		});

		// 		self.pubsubs[0].publish('test', 'received');

		// 	}).then(function(res){
		// 		rcved.forEach(function(msg){
		// 			expect(msg).to.equal('received');
		// 		});
		// 	});
		// });

		after(function(){
			subscriber.end();
		});

	});

	after('dies gracefully on .kill()', function(done){
		var promises = pubsubs.map(function(pubsub){
			return pubsub.kill();
		});
		Promise.all(promises)
			.then(function(){
				done();
			})
	});

	// after(function(){
	// 	// self.server.close();
	// 	self.pubsubs.forEach(function(pubsub){
	// 		if(pubsub){
	// 			pubsub.kill();
	// 		}
	// 	});
	// })

});