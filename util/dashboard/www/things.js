'use strict';
(function(){
	function defer(){
		var deferred = {
			promise: null,
			resolve: null,
			reject: null
		};
		deferred.promise = new Promise(function(resolve, reject){
			deferred.resolve = resolve;
			deferred.reject = reject;
		});
		return deferred;
	}

	function EventEmitter(){
		this.__eventHandlers = {};
	}
	EventEmitter.prototype.emit = function(eventName, eventData){
		if (eventName in this.__eventHandlers){
			this.__eventHandlers[eventName].map(function(callback){
				callback(eventData);
			})	
		}
	}
	EventEmitter.prototype.emitOnce = function(eventName, eventData){
		if (eventName in this.__eventHandlers){
			this.__eventHandlers[eventName].map(function(callback){
				callback(eventData);
			});
			delete this.__eventHandlers[eventName];
		}
	}
	EventEmitter.prototype.on = function(eventName, callback){
		if (!(eventName in this.__eventHandlers)) this.__eventHandlers[eventName] = [];
		this.__eventHandlers[eventName].push(callback);
	}
	EventEmitter.prototype.once = function(eventName, callback){
		var self = this;
		if (!(eventName in this.__eventHandlers)) this.__eventHandlers[eventName] = [];
		var wrapped = function(eventData){
			callback(eventData);
			var ri = self.__eventHandlers[eventName].findIndex(function(item){ return item === wrapped });
			if (ri > -1) self.__eventHandlers[eventName].splice(ri, 1);
		}
		this.__eventHandlers[eventName].push(wrapped);
	}

	/* MqttWsClient */
	function MqttWsClient(endpoint, noInitialize, noRetryOnClose){
		EventEmitter.call(this);
		this.endpoint = endpoint;
		this.socket = undefined;
		
		this.subscriptions = {};
		
		this.noRetryOnClose = noRetryOnClose;
		this.$ready = false;
		
		if (!noInitialize) this.start();
	}
	MqttWsClient.prototype = new EventEmitter();
	MqttWsClient.prototype.start = function(){
		var self = this;
		var deferred = defer();
		self.$ready = deferred.promise;
		
		/* Initialize Websocket */
		self.socket = new WebSocket(self.endpoint);
		
		self.socket.onopen = function(){
			console.log("WebSocket to "+self.endpoint+" opened");
			self.emit('connect');
			deferred.resolve(true);
			for (var topic in self.subscriptions){
				self.socket.send(JSON.stringify({ action: 'subscribe', topic: topic }));
				console.log("Subscribed to "+topic+" at "+self.endpoint);
			}
		}
		self.socket.onclose = function(){
			console.log("WebSocket to "+self.endpoint+" closed");
			deferred.reject(false);
			if (!self.noRetryOnClose){
				setTimeout(function(){
					self.start();
				}, 5000);
			}
		};
		self.socket.onerror = function(){
			console.log("ERROR on WebSocket to "+self.endpoint+", retrying in 5 seconds");
	//		setTimeout(function(){
	//			self.start();
	//		}, 5000);
		};
		self.socket.onmessage = function(event){
			var data = JSON.parse(event.data);
			if (data.topic in self.subscriptions){
				self.subscriptions[data.topic](data.topic, data.message);
			}
		};

		return deferred.promise;
	}
	MqttWsClient.prototype.close = function(){
		this.socket.close();
	}
	MqttWsClient.prototype.subscribe = function(topic, handler){
		if (!(topic in this.subscriptions)){
			this.subscriptions[topic] = handler;
			if (this.socket.readyState === WebSocket.OPEN){
				this.socket.send(JSON.stringify({ action: 'subscribe', topic: topic }));
			}
			else {
				console.log("WebSocket is closed, cannot subscribe to ["+topic+"]");
			}
		}
		else {
			console.log("Already subscribed to topic ["+topic+"]");
		}
	}
	MqttWsClient.prototype.unsubscribe = function(topic){	
		if (topic in this.subscriptions){
			delete this.subscriptions[topic];
			if (this.socket.readyState === WebSocket.OPEN){
				this.socket.send(JSON.stringify({ action: 'unsubscribe', topic: topic }));	
			}
			else {
				console.log("WebSocket is closed, cannot unsubscribe from ["+topic+"]");
			}
		}
		else {
			console.log("Already unsubscribed from topic ["+topic+"], cannot unsubscribe");
		}
	}
	MqttWsClient.prototype.publish = function(topic, message){
		if (this.socket.readyState === WebSocket.OPEN){
			this.socket.send(JSON.stringify({ action: 'publish', topic: topic, message: message }));
			console.log("Published "+topic, message)
		}
		else {
			console.log("WebSocket is closed, cannot publish to ["+topic+"]");
		}
	}

	/** CodeEngine */
	var ENGINE_ICONS = {
		'undefined': 'assets/img/device-unknown-sm.png',
		'raspberry-pi3': 'assets/img/device-raspberry-pi3-sm.png',
		'raspberry-pi0': 'assets/img/device-raspberry-pi0-sm.png',
		'xeon-e3': 'assets/img/device-xeon-e3-sm.png',
		'xeon-e5': 'assets/img/device-xeon-e5-sm.png'
	}
	function CodeEngine(pubsub, id, meta){
		EventEmitter.call(this);
		var self = this;
		this.pubsub = pubsub;
		this.id = id;
		this.meta = meta;

		this.status = "unknown";
		// this.running = undefined;
		// this.info = data.info || {};
		this.stats = [];
		this.console = [];

		this.codes = {};

		this.pubsub.subscribe(this.id+'/resource', function(topic, message){
			self.stats.push(message);
			self.emit('update');
		});
		this.pubsub.subscribe(this.id+'/console', function(topic, message){
			message.forEach(function(line){
				self.console.push(line);
			});
			self.emit('update');
		})
		console.log('Engine '+id+' connected');

		// Misc. operations
		if (meta.device) this.icon = ENGINE_ICONS[meta.device];
	}
	CodeEngine.prototype = new EventEmitter();
	CodeEngine.prototype.runCode = function(code_name, source){
		this.pubsub.publish(this.id+'/cmd', {
			ctrl: 'run_code',
			kwargs: {
				mode: 'raw',
				code_name: code_name,
				source: source
			}
		})
	}
	CodeEngine.prototype.pauseCode = function(code_name, instance_id){
		this.pubsub.publish(this.id+'/cmd', {
			ctrl: 'pause_code',
			kwargs: {
				code_name: code_name,
				instance_id: instance_id
			}
		})
	}
	CodeEngine.prototype.resumeCode = function(code_name, instance_id){
		this.pubsub.publish(this.id+'/cmd', {
			ctrl: 'resume_code',
			kwargs: {
				code_name: code_name,
				instance_id: instance_id
			}
		})
	}
	CodeEngine.prototype.migrateCode = function(code_name, instance_id, target_engine){
		this.pubsub.publish(this.id+'/cmd', {
			ctrl: 'migrate_code',
			kwargs: {
				code_name: code_name,
				instance_id: instance_id,
				engine: target_engine
			}
		})
	}

	/** Program */
	function Program(pubsub, code_name, instance_id){
		EventEmitter.call(this);
		var self = this;
		this.pubsub = pubsub;
		this.code_name = code_name;
		this.id = instance_id;
		this.status = undefined;

		this.stats = [];
		this.console = [];

		this.pubsub.subscribe(this.code_name+'/'+this.id+'/resource', function(topic, message){
			self.stats.push(message);
			self.emit('update');
			// console.log(message);
		});
		this.pubsub.subscribe(this.code_name+'/'+this.id+'/console', function(topic, message){
			message.forEach(function(line){
				self.console.push(line);
			});
			self.emit('update');
			// console.log(message);
		})
	}
	Program.prototype = new EventEmitter();

	/** Dashboard */
	var ENGINE_REGISTRY_NAMESPACE = 'engine-registry';
	var PROGRAM_MONITOR_NAMESPACE = 'program-monitor';
	function Dashboard(pubsub_url){
		EventEmitter.call(this);
		var self = this;
		var pubsub = new MqttWsClient(pubsub_url || 'ws://localhost:8000');

		this.engines = {};
		this.programs = {};

		pubsub.subscribe(ENGINE_REGISTRY_NAMESPACE, function(topic, message){
			console.log(topic, message);
			if (!(message.id in self.engines)){
				self.engines[message.id] = new CodeEngine(pubsub, message.id, message.meta);
				self.engines[message.id].on('update', function(){
					self.emit('update');
				});
			}

			self.engines[message.id].status = message.status;
			self.engines[message.id].meta = message.meta;
			self.engines[message.id].codes = message.codes;
			console.log(self.engines);
			self.emit('update');
		});

		pubsub.subscribe(PROGRAM_MONITOR_NAMESPACE, function(topic, message){
			console.log(topic, message);
			if (!(message.instance_id in self.programs)){
				self.programs[message.instance_id] = new Program(pubsub, message.code_name, message.instance_id);
				self.programs[message.instance_id].on('update', function(){
					self.emit('update');
				})
			}
			// self.programs[message.instance_id].engine = message.engine;
			self.programs[message.instance_id].status = message.status;
		});

		pubsub.on('connect', function(){
			setTimeout(function(){
				pubsub.publish(ENGINE_REGISTRY_NAMESPACE+'/bcast', { ctrl: 'report' });
			}, 250);
		})
	}
	Dashboard.prototype = new EventEmitter();

var things = angular.module('things.js', []);

things.factory('Dashboard', ['$rootScope', function($rootScope){
	var Dash = Dashboard;
	var dash = undefined;

	return {
		create: function(pubsub_url){
			if (!dash){
				dash = new Dash(pubsub_url);
				dash.on('update', function(){
					$rootScope.$apply();
				})
			}
			return dash;
		},
		get: function(){
			return dash;
		}
	}
}])
.directive('deviceGraph', ['$filter', 'Dashboard', function($filter, Dashboard){
	var modes = {
		'cpu': 'CPU',
		'memory': 'Memory Usage'
	}
	var units = {
		'cpu': '%',
		'memory': 'MB'
	}
	function getData(datum, mode){
		if (mode === 'memory'){
			return (Math.round(datum.memory.heapUsed/10000)/100);
		}
		else if (mode === 'cpu') {
			return (datum.cpu < 100) ? (Math.round(100*datum.cpu)/100) : 100.0;
		}
	}
	
	return {
		restrict: 'E',
		scope: {
			node: '=',
			mode: '=?',
			height: '=?'
		},
		controller: ['$scope', function($scope){
			var self = this;
			var $dash = Dashboard.get();
			$scope.mode = angular.isDefined($scope.mode) ? $scope.mode : 'cpu';
			
			self.graphOptions = {
					chart: {
						type: 'lineChart',
						height: ($scope.height || 200),
						margin: {
							top: 25,
							right: 30,
							bottom: 30,
							left: 80
						},
						x: function(d){ return d.x },
						y: function(d){ return d.y },
						useInteractiveGuideline: true,
						duration: 0,
						xAxis: {
							tickFormat: function(d){
								return $filter('date')(d, 'HH:mm:ss');
							}
						},
						yAxis: {
							tickFormat: function(d){
								return d+' '+units[$scope.mode];
							}
						}
					}
				};
			self.setMode = function(mode){
				$scope.mode = mode;
				if (mode === 'cpu') self.graphOptions.chart.yDomain = [0, 100];
				else if (mode === 'memory') delete self.graphOptions.chart.yDomain;
			};
			self.initData = function(data){
				var memData = [], cpuData = [];
				if (data){
					memData = data.map(function(datum){
						return { x: datum.timestamp, y: getData(datum, 'memory') }
					});
					cpuData = data.map(function(datum){
						return { x: datum.timestamp, y: getData(datum, 'cpu') };
					})
				}
				self.graphData = { 'memory': [{ values: memData, key: modes['memory'] }],
						   		   'cpu': [{ values: cpuData, key: modes['cpu'] }] };

				if ($scope.node){
					Object.keys($scope.node.codes).forEach(function(code_name){
						Object.keys($scope.node.codes[code_name]).forEach(function(instance_id){
							var memData = [], cpuData = [];
							memData = $dash.programs[instance_id].stats.map(function(datum){
								return { x: datum.timestamp, y: getData(datum, 'memory') }
							});
							cpuData = $dash.programs[instance_id].stats.map(function(datum){
								return { x: datum.timestamp, y: getData(datum, 'cpu') }
							});

							self.graphData['memory'].push({
								values: memData,
								key: code_name+'/'+instance_id+' Memory'
							});
							self.graphData['cpu'].push({
								values: cpuData,
								key: code_name+'/'+instance_id+' CPU'
							});
						})
					})
				}
			};
			
			self.initData();
			self.setMode($scope.mode);
			
			// Watch changes in node.stats
			$scope.$watch(function(){
				return $scope.node ? $scope.node.stats.length : undefined;
			}, function(length){
				if (length){
					var datum = $scope.node.stats[length-1];
					self.graphData['memory'][0].values.push({ x: datum.timestamp, y: getData(datum, 'memory') });
					if (self.graphData['memory'][0].values.length > 60) self.graphData['memory'][0].values.shift();
					self.graphData['cpu'][0].values.push({ x: datum.timestamp, y: getData(datum, 'cpu') });
					if (self.graphData['cpu'][0].values.length > 60) self.graphData['cpu'][0].values.shift();
				}
			});

			// Watch changes in node.codes
			$scope.$watch(function(){
				return $scope.node ? $scope.node.codes : undefined;
			}, function(codes){
				console.log("New codes", codes);
			})

			// Watch for node being dynamically resassigned to the directive
			$scope.$watch(function(){
				return $scope.node ? $scope.node.id : undefined;
			}, function(id){
				if (id){
					var slen = $scope.node.stats.length;
					var data = (slen > 60) ? $scope.node.stats.slice(slen-61) : $scope.node.stats.slice(0);
					self.initData(data);
				}
				else {
					self.initData();
				}
			});
			
		}],
		controllerAs: '$ctrl',
		templateUrl: 'components/device-graph.html'
	}
}])
.directive('deviceConsole', function(){
	return {
		restrict: 'E',
		scope: {
			lines: '=',
			height: '@?'
		},
		template: '<div class="terminal"><p ng-repeat="text in lines track by $index" ng-bind="text"></p></div>',
		link: function(scope, element, attrs, ctrl){
			var div = $('.terminal', element);
			if (scope.height){ div.css({ "height": scope.height, "max-height": scope.height }) };
			
			scope.$watch(function(){
//				return scope.lines ? scope.lines.length : 0;
				return div[0].scrollHeight;
			}, function(height){
				div.scrollTop(height);
			})
		}
	}
})
.directive('devicePanel', ['Dashboard', 'DashboardService', function(Dashboard, DashboardService){
	return {
		restrict: 'E',
		scope: {
			node: '='
		},
		controller: ['$scope', function($scope){
			$scope.$service = DashboardService;
			$scope.$dash = Dashboard.get();
		}],
		controllerAs: '$ctrl',
		templateUrl: 'components/device-panel.html'
	}
}])

.directive('topicTable', ['DashboardService', function(DashboardService){
	return {
		restrict: 'E',
		scope: {},
		controller: function($scope){
			var self = this;
			
			self.subscriptions = DashboardService.subscriptions;
			self.messages = DashboardService.messages;
			self.selectedTopic = Object.keys(self.subscriptions)[0];
			self.msgSearch = "";
		},
		controllerAs: '$ctrl',
		templateUrl: 'components/topic-table.html' 
	}
}])

// .factory('WebSocketService', ["CONFIG", function(CONFIG){
// 	return {
// 		create: function(config){
// 			return new EasyWebSocket(CONFIG.websocket_url, config);
// 		}
// 	}
// }])
.factory('DashboardService', ['$q', '$rootScope', 'CONFIG', function($q, $rootScope, CONFIG){
	var TOPICS = {
		'node-registry': 'things-engine-registry'
	}
	
	var _SOCKET = undefined;
	
	var _SUBSCRIPTIONS = {};
	var _MESSAGES = {};
	
	var _NODES = {};
	var _CODES = {};
	
	var _VIDEOSTREAM = {};
	
	function handleNodeRunning(data){
		var nodeId = data.topic.split("/")[0];
		_NODES[nodeId].running = data.message;
//		console.log("NODE "+nodeId+" now running "+data.message);
//		console.log(data.message);
		if (data.message){
			subscribe(data.message+"/console", function(logText){
				_NODES[nodeId].console.push(logText.message);
			});	
		}
	}
	function handleNodeStats(data){
		var nodeId = data.topic.split("/")[0];
		if (!_NODES[nodeId].stats) _NODES[nodeId].stats = [];
		if (data.message) _NODES[nodeId].stats.push(data.message);
	}
	function handleVideoStream(data){
		if (data.message){
			_VIDEOSTREAM.raw = "data:image/png;base64,"+data.message;	
		}
		else {
			//Empty image
			_VIDEOSTREAM.raw= "data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==";
		}
	}
	function handleVideoMotion(data){
		if (data.message){
			_VIDEOSTREAM.motion = "data:image/png;base64,"+data.message;	
		}
		else {
			//Empty image
			_VIDEOSTREAM.motion = "data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==";
		}
	}
	
	//Subscribe to MQTT via WS backend
	function subscribe(topic, handler){
		_SUBSCRIPTIONS[topic] = { subscribed: true, handler: handler };
		_SOCKET.send({ action: "pubsub", command: "subscribe", topic: topic });
		_SUBSCRIPTIONS[topic].subscribed = true;
	}
	function unsubscribe(topic){
		if (!_SUBSCRIPTIONS[topic]) _SUBSCRIPTIONS[topic] = { subscribed: false };
		_SOCKET.send({ action: "pubsub", command: "unsubscribe", topic: topic });
		_SUBSCRIPTIONS[topic].subscribed = false;
	}
	
	//Send RUN command to dispatcher
	function runCode(nodeId, code){
		if (nodeId && code){
			_SOCKET.send({ action: "dispatcher", command: "run_code", args: { nodeId: nodeId, code: code } });
		}
		else {
			alert("You need to select the node AND provide the code");
		}
	}
	//Send PAUSE command to dispatcher
	function pauseCode(nodeId, codeId){
		if (nodeId && _NODES[nodeId].status === 'busy'){
			_SOCKET.send({ action: "dispatcher", command: "pause_code", args: { nodeId: nodeId, codeId: codeId } });
		}
	}
	//Send MIGRATE command to dispatcher
	function migrateCode(fromId, toId, codeId){
		if (fromId && _NODES[fromId].status === 'busy' && toId && _NODES[toId].status === 'idle' && codeId){
			_SOCKET.send({ action: "dispatcher", command: "migrate_code", args: { from: fromId, to: toId, codeId: codeId } });
		}
		else {
			console.log(fromId, toId, codeId);
		}
	}
	
	return {
		start: function(){
			var self = this;
			var deferred = $q.defer();
			if (_SOCKET){
				console.error("Dashboard service already started");
				deferred.reject("Dashboard service already started");
				return deferred.promise;
			}
			
			// _SOCKET = WebSocketService.create({
			// 	retry_rate: 5000,
			// 	on_open: function(socket){
			// 		console.log("Websocket Open");
					
			// 		//perform initial actions on connect
			// 		socket.send({ action: "get-topics" });
			// 		console.log("    requesting list of topics");
					
			// 		//subscribe to things-engine-registry, and fetch all available codes
			// 		socket.send({ action: "pubsub", command: "subscribe", topic: TOPICS['node-registry'] });
			// 		socket.send({ action: "code-db", command: "get_all" });
					
			// 		subscribe('things-videostream/raw', handleVideoStream);
			// 		subscribe('things-videostream/motion', handleVideoMotion);
			// 		subscribe('things-videostream/alarm', function(alarm){
			// 			_VIDEOSTREAM.alarm = alarm.message;
			// 		});
					
			// 		deferred.resolve(socket);
			// 	}
			// });

			_SOCKET = new EasyWebSocket(CONFIG.websocket_url, {
				retry_rate: 5000,
				on_open: function(socket){
					console.log("Websocket Open");
					
					//perform initial actions on connect
					socket.send({ action: "get-topics" });
					console.log("    requesting list of topics");
					
					//subscribe to things-engine-registry, and fetch all available codes
					socket.send({ action: "pubsub", command: "subscribe", topic: TOPICS['node-registry'] });
					socket.send({ action: "code-db", command: "get_all" });
					
					subscribe('things-videostream/raw', handleVideoStream);
					subscribe('things-videostream/motion', handleVideoMotion);
					subscribe('things-videostream/alarm', function(alarm){
						_VIDEOSTREAM.alarm = alarm.message;
					});
					
					deferred.resolve(socket);
				}
			})

			_SOCKET.addEventListener('onMessage', function(event, data){
				if (data.action === 'get-topics'){
					data.response.map(function(item){
						if (!_SUBSCRIPTIONS[item]){
							_SUBSCRIPTIONS[item] = { subscribed: false };	
						}
					})
				}
				// else if (data.action === 'pubsub'){
				// 	if (data.topic && data.messages){
				// 		if (!_MESSAGES[data.topic]) _MESSAGES[data.topic] = [];
				// 		data.messages.map(function(msg){ _MESSAGES[data.topic].unshift(msg); });
						
				// 		if (data.topic === TOPICS['node-registry']){
				// 			data.messages.map(function(node){
								
				// 				if (!_NODES[node.id]){
				// 					_NODES[node.id] = CodeEngine.create(node);
				// 					self.subscribe(node.id+"/running", handleNodeRunning);
				// 					self.subscribe(node.id+"/stats", handleNodeStats);	
				// 				}
				// 				else {
				// 					_NODES[node.id].update(node);
				// 				}
								
				// 			});
				// 		}
				// 	}
				// 	else {
				// 		if (!_MESSAGES[data.topic]) _MESSAGES[data.topic] = [];
				// 		_MESSAGES[data.topic].unshift(data.message);
						
				// 		if (data.topic === TOPICS['node-registry']){
				// 			if (!_NODES[data.message.id]){
				// 				_NODES[data.message.id] = CodeEngine.create(data.message);
				// 				self.subscribe(data.message.id+"/running", handleNodeRunning);
				// 				self.subscribe(data.message.id+"/stats", handleNodeStats);	
				// 			}
				// 			else {
				// 				_NODES[data.message.id].update(data.message);
				// 			}
				// 		}
				// 	}
					
				// 	//If extra handler attached, execute it
				// 	if (_SUBSCRIPTIONS[data.topic].handler){
				// 		_SUBSCRIPTIONS[data.topic].handler(data);
				// 	}
				// }
				else if (data.action === 'code-db'){
					if (data.codes){
						data.codes.map(function(code){ _CODES[code.name] = code; });
					}
					else if (data.code){
						_CODES[data.code.name] = data.code;
					}
					if (data.command === 'save'){
						alert(data.code.name+" saved successfully!");
					}
					if (data.command === 'delete'){
						delete _CODES[data.code.name];
						alert(data.code.name+" deleted successfully!");
					}
				}
				$rootScope.$apply();
//				console.log(data);
			});
			return deferred.promise;
		},
		messages: _MESSAGES,
		subscriptions: _SUBSCRIPTIONS,
		toggleSubscription: function(topic){
			_SUBSCRIPTIONS[topic].subscribed = !_SUBSCRIPTIONS[topic].subscribed;
			if (_SUBSCRIPTIONS[topic].subscribed){
				this.subscribe(topic);
			}
			else {
				this.unsubscribe(topic);
			}
		},
		subscribe: subscribe,
		unsubscribe: unsubscribe,
		allNodes: _NODES,
		saveCode: function(name, code){
			_SOCKET.send({ action: "code-db", command: "save", name: name, code: code });
		},
		deleteCode: function(name){
			var result = confirm("Are you sure you want to delete " + name + "?");
			if(result){
				_SOCKET.send({ action: "code-db", command: "delete", name: name });
			}
		},
		allCodes: _CODES,
		runCode: runCode,
		sendCode: runCode,
		pauseCode: pauseCode,
		migrateCode: migrateCode,
		videostream: _VIDEOSTREAM
	}
}])

}())