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
	function joinPath(p1, p2){
		if (p1[p1.length-1] === '/') p1 = p1.substring(0,p1.length-1);
		if (p2[0] === '/') p2 = p2.substring(1);
		return p1+'/'+p2;
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
				self.subscriptions[data.topic].handler(data.topic, data.message);
				// self.subscriptions[data.topic].messages.push(data.message);
				// if (self.subscriptions[data.topic].messages.length > 200) self.subscriptions[data.topic].messages.shift();
			}
		};

		return deferred.promise;
	}
	MqttWsClient.prototype.close = function(){
		this.socket.close();
	}
	MqttWsClient.prototype.subscribe = function(topic, handler){
		if (!(topic in this.subscriptions)){
			this.subscriptions[topic] = {
				handler: handler,
				messages: []
			}
			if (this.socket.readyState === WebSocket.OPEN){
				this.socket.send(JSON.stringify({ action: 'subscribe', topic: topic }));
				console.log("Subscribed to "+topic+" at "+this.endpoint);
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
	function Program(pubsub, code_name, instance_id, source){
		EventEmitter.call(this);
		var self = this;
		this.pubsub = pubsub;
		this.code_name = code_name;
		this.id = instance_id;
		this.source = source;
		this.status = undefined;

		this.stats = [];
		this.console = [];
		this.snapshots = [];

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
		});
		this.pubsub.subscribe(this.code_name+'/'+this.id+'/snapshots', function(topic, message){
			self.snapshots.push(message);
			self.emit('update');
			console.log(message);
		});
	}
	Program.prototype = new EventEmitter();

	/** Dashboard */
	var ENGINE_REGISTRY_NAMESPACE = 'engine-registry';
	var PROGRAM_MONITOR_NAMESPACE = 'program-monitor';
	function Dashboard(pubsub_url){
		EventEmitter.call(this);
		var self = this;
		var pubsub = this.pubsub = new MqttWsClient(pubsub_url || 'ws://localhost:8000');

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
				var program = new Program(pubsub, message.code_name, message.instance_id, message.source);
				program.on('update', function(){
					self.emit('update');
				})
				self.programs[message.instance_id] = program;
			}
			// self.programs[message.instance_id].engine = message.engine;
			self.programs[message.instance_id].status = message.status;
			if (message.source) self.programs[message.instance_id].source = message.source;
		});

		pubsub.on('connect', function(){
			setTimeout(function(){
				pubsub.publish(ENGINE_REGISTRY_NAMESPACE+'/bcast', { ctrl: 'report' });
			}, 250);
		});

		this.showSource = function(instance_id){
			alert(self.programs[instance_id].source);
		}
	}
	Dashboard.prototype = new EventEmitter();

	/** Code Repository - an abstraction for the RESTful endpoint */
	function CodeRepository(base_url){
		EventEmitter.call(this);
		this.base_url = base_url;
	}
	CodeRepository.prototype = new EventEmitter();
	CodeRepository.prototype.get = function(abs_path){
		var self = this;
		return new Promise(function(resolve, reject){
			$.ajax(joinPath(self.base_url, abs_path))
				.done(function(data, status, xhr){
					console.log(status, data);
					var info = Object.keys(data.children)
						.reduce(function(acc, key){
							if (data.children[key].type === 'directory') acc.dirs.push(key);
							else if (data.children[key].type === 'file') acc.files.push(key);
							return acc
						}, {
							dirs: [],
							files: []
						});
					Object.assign(data, info);
					
					resolve(data || {});
				})
				.fail(function(xhr, status, error){
					console.log(status, error);
					reject(error);
				})
		})
	}
	/** 
	 * @param {Object} file_data - File data
	 * @param {string} file_data.name - Name of the file
	 * @param {string} file_data.content - File content (utf-8 string)
	 */
	CodeRepository.prototype.writeFile = function(abs_path, file_data){
		var self = this;
		return new Promise(function(resolve, reject){
			file_data.type = 'file';
			$.ajax({
				type: 'POST',
				url: joinPath(self.base_url, abs_path),
				data: JSON.stringify(file_data),
				contentType: 'application/json; charset=utf-8'
			})
			.done(function(data, status, xhr){
				console.log(status, data);
				resolve(data || {});
			})
			.fail(function(xhr, status, error){
				console.log(status, error);
				reject(error);
			})
		})
	}
	CodeRepository.prototype.makeDir = function(abs_path, dir_name){
		var self = this;
		return new Promise(function(resolve, reject){
			var dir = {
				type: 'directory',
				name: dir_name
			}
			$.ajax({
				type: 'POST',
				url: joinPath(self.base_url, abs_path),
				data: JSON.stringify(dir),
				contentType: 'application/json; charset=utf-8'
			})
			.done(function(data, status, xhr){
				console.log(status, data);
				resolve(data || {});
			})
			.fail(function(xhr, status, error){
				console.log(status, error);
				reject(error);
			})
		})
	}
	CodeRepository.prototype.delete = function(abs_path, ids){
		var self = this;
		return new Promise(function(resolve, reject){
			$.ajax({
				type: 'DELETE',
				url: joinPath(self.base_url, abs_path)+'?ids='+ids.join(',')
			})
			.done(function(data, status, xhr){
				console.log(status, data);
				resolve(data || {});
			})
			.fail(function(xhr, status, error){
				console.log(status, error);
				reject(error);
			})
		})
	}

var things = angular.module('things.js', []);

things.factory('Dashboard', ['$rootScope', function($rootScope){
	// var Dash = Dashboard;
	var dash = undefined;

	return {
		create: function(pubsub_url){
			if (!dash){
				dash = new Dashboard(pubsub_url);
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
things.factory('CodeRepository', ['$rootScope', function($rootScope){
	// var CodeRepository = CodeRepository;
	var repo = undefined;

	return {
		create: function(repo_url){
			if (!repo){
				repo = new CodeRepository(repo_url);
				// repo.on('update', function(){
				// 	$rootScope.$apply();
				// })
			}
			return repo;
		},
		get: function(){
			return repo;
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
.directive('devicePanel', ['Dashboard', 'CodeRepository', function(Dashboard, CodeRepository){
	return {
		restrict: 'E',
		scope: {
			node: '='
		},
		controller: ['$scope', function($scope){
			// $scope.$service = DashboardService;
			$scope.$dash = Dashboard.get();
			$scope.$repo = CodeRepository.get();

			var self = this;

			self.showSource = {}

			self.refresh = function(){
				$scope.$repo.get('/')
					.then(function(fsObject){
						console.log(fsObject);
						self.codes = {};
						fsObject.files.forEach(function(name){
							self.codes[name] = fsObject.children[name];
						})

						$scope.$apply();
					})
			}

			self.refresh();
		}],
		controllerAs: '$ctrl',
		templateUrl: 'components/device-panel.html'
	}
}])
.directive('onEnterKey', function(){
	return function(scope, element, attrs){
		element.bind("keyup", function(e){
			if (e.which === 13){
				e.preventDefault();
				scope.$apply(function(){
					scope.$eval( attrs.onEnterKey );
				})
			}
		})
	}
})

.directive('topicTable', [function(){
	return {
		restrict: 'E',
		scope: {},
		controller: function($scope){
			var self = this;
			
			// self.subscriptions = DashboardService.subscriptions;
			// self.messages = DashboardService.messages;
			// self.selectedTopic = Object.keys(self.subscriptions)[0];
			self.msgSearch = "";
		},
		controllerAs: '$ctrl',
		templateUrl: 'components/topic-table.html' 
	}
}])

}())