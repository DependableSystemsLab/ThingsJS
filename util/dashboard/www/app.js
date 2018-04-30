'use strict';

var dashApp = window.angular.module('dashApp', ['ngResource', 
                                         'ui.router',
                                         'ui.bootstrap',
                                         'ui.ace',
										 'nvd3'] );

/* Keeps all checked items */
var checkedArray = [];

/* Keeps all copied items */
var copied = [];

/* Keeps all cut items */
var cut = [];	

/* Keeps track of visited pages for the back button */
var visitedPages = [];

/* Commonly replaced string in a url */
var replace = "http://localhost:5000/";

/* REST API endpoints */
var url = "http://localhost:5000/root/";
var createFSUrl = "http://localhost:5000/makeFromPath";
var deleteFSUrl = "http://localhost:5000/deleteFromPath";
var moveFSUrl = "http://localhost:5000/moveFromPath";
var cloneFSUrl = "http://localhost:5000/cloneFromPath";

var options = ["Run", "Delete"];

dashApp.constant("CONFIG", {
	service_url: (window.location.hostname+':'+window.location.port),
	websocket_url: (window.location.hostname+':'+window.location.port+'/websocket')
})
.factory('WebSocketService', ["CONFIG", function(CONFIG){
	return {
		create: function(config){
			return new EasyWebSocket(CONFIG.websocket_url, config);
		}
	};
}])
.factory('CodeEngine', function(){
	
	var icon_mapping = {
		'undefined': 'assets/img/device-unknown-sm.png',
		'raspberry-pi3': 'assets/img/device-raspberry-pi3-sm.png',
		'raspberry-pi0': 'assets/img/device-raspberry-pi0-sm.png',
		'xeon-e3': 'assets/img/device-xeon-e3-sm.png',
		'xeon-e5': 'assets/img/device-xeon-e5-sm.png'
	};
	
	function CodeEngine(data){
		this.id = data.id;
		this.status = data.status || "unknown";
		this.running = data.running || undefined;
		this.info = data.info || {};
		this.stats = [];
		this.console = [];
		
		//additional properties for humans
		this.setIcon((data.info ? data.info.device : 'undefined'));
	}

	CodeEngine.prototype.update = function(data){
		this.status = data.status || "unknown";
		this.running = data.running || undefined;
		
		if (data.info){
			this.info = data.info;
			this.setIcon(data.info.device);
		}
	};

	CodeEngine.prototype.clearConsole = function(){
		this.console = [];
	};

	CodeEngine.prototype.setIcon = function(device){
		this.icon = icon_mapping[device];
	};
	
	return {
		create: function(data){
			return new CodeEngine(data);
		}
	};
})
.factory('DashboardService', ['$q', '$rootScope', '$http', 'WebSocketService', 'CodeEngine', function($q, $rootScope, $http, WebSocketService, CodeEngine){
	var TOPICS = {
		'node-registry': 'things-engine-registry'
	};
	
	var _SOCKET = undefined;
	
	var _SUBSCRIPTIONS = {};
	var _MESSAGES = {};
	
	var _NODES = {};
	var _CODES = {};

	/* Adding the directories object/array. Remember to ask why _CODES is defined as object and not array */
	var _DIRECTORIES = {};
	
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
			
			_SOCKET = WebSocketService.create({
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
			});
			_SOCKET.addEventListener('onMessage', function(event, data){
				if (data.action === 'get-topics'){
					data.response.map(function(item){
						if (!_SUBSCRIPTIONS[item]){
							_SUBSCRIPTIONS[item] = { subscribed: false };	
						}
					});
				}
				else if (data.action === 'pubsub'){
					if (data.topic && data.messages){
						if (!_MESSAGES[data.topic]) _MESSAGES[data.topic] = [];
						data.messages.map(function(msg){ _MESSAGES[data.topic].unshift(msg); });
						
						if (data.topic === TOPICS['node-registry']){
							data.messages.map(function(node){
								
								if (!_NODES[node.id]){
									_NODES[node.id] = CodeEngine.create(node);
									self.subscribe(node.id+"/running", handleNodeRunning);
									self.subscribe(node.id+"/stats", handleNodeStats);	
								}
								else {
									_NODES[node.id].update(node);
								}
								
							});
						}
					}
					else {
						if (!_MESSAGES[data.topic]) _MESSAGES[data.topic] = [];
						_MESSAGES[data.topic].unshift(data.message);
						
						if (data.topic === TOPICS['node-registry']){
							if (!_NODES[data.message.id]){
								_NODES[data.message.id] = CodeEngine.create(data.message);
								self.subscribe(data.message.id+"/running", handleNodeRunning);
								self.subscribe(data.message.id+"/stats", handleNodeStats);	
							}
							else {
								_NODES[data.message.id].update(data.message);
							}
						}
					}
					
					//If extra handler attached, execute it
					if (_SUBSCRIPTIONS[data.topic].handler){
						_SUBSCRIPTIONS[data.topic].handler(data);
					}
				}
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

		allCodes: _CODES,
		runCode: runCode,
		sendCode: runCode,
		pauseCode: pauseCode,
		migrateCode: migrateCode,
		videostream: _VIDEOSTREAM
	};
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
	};
}])
.directive('deviceGraph', ['$filter', function($filter){
	var modes = {
		'memory': 'Memory Usage',
		'cpu': 'CPU'
	};

	function getData(datum, mode){
		if (mode === 'memory'){
			return (Math.round(100*datum.memoryUsage.heapUsed)/100);
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
			$scope.mode = angular.isDefined($scope.mode) ? $scope.mode : 'memory';
			
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
						}
					}
				};
			self.setMode = function(mode){
				$scope.mode = mode;
				if (mode === 'cpu') self.graphOptions.chart.yDomain = [0, 100];
				else if (mode === 'memory') delete self.graphOptions.chart.yDomain;
			};
			self.initData = function(data){
				var memData, cpuData;
				if (data){
					memData = data.map(function(datum){
						return { x: datum.timestamp, y: getData(datum, 'memory') };
					});
					cpuData = data.map(function(datum){
						return { x: datum.timestamp, y: getData(datum, 'cpu') };
					});
				}
				else {
					memData = [];
					cpuData = [];
				}
				self.graphData = { 'memory': [{ values: memData, key: modes.memory }],
						   		   'cpu': [{ values: cpuData, key: modes['cpu'] }] };
			};
			
			self.initData();
			self.setMode($scope.mode);
			
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
	};
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
			if (scope.height){ div.css({ "height": scope.height, "max-height": scope.height }) }
			
			scope.$watch(function(){
//				return scope.lines ? scope.lines.length : 0;
				return div[0].scrollHeight;
			}, function(height){
				div.scrollTop(height);
			});
		}
	};
})
.directive('devicePanel', ['DashboardService', function(DashboardService){
	return {
		restrict: 'E',
		scope: {
			node: '='
		},
		controller: ['$scope', function($scope){
			$scope.$service = DashboardService;
		}],
		controllerAs: '$ctrl',
		templateUrl: 'components/device-panel.html'
	};
}])
.directive('stickyFooter', function($window){
	return {
		restrict: 'A',
		link: function(scope, element, attrs, ctrl){
		var marker = $('<div></div>');
			marker.css({background: 'transparent'});
			marker.insertBefore(element);
		var stick = function(){
				var y = window.innerHeight - element.outerHeight() - marker.offset().top;
				if (y > 0){ marker.height(y); }
				else { marker.height(0); }
			};
			scope.$watch(function(){ return marker.offset().top; }, function(newVal, oldVal){ stick(); });
			scope.$watch(function(){ return element.height(); }, function(newval){ stick(); });
			angular.element($window).bind('resize', function(){ stick(); });
		}
	};
})
.config(['$stateProvider', '$urlRouterProvider', 
    function($stateProvider, $urlRouterProvider){
	$stateProvider
		.state('init', {
			url: '',
			abstract: true,
			resolve: {
				socket: ['DashboardService', 'WebSocketService', function(DashboardService, WebSocketService){
					return DashboardService.start();
				}]
			},
			controller: ['$scope', '$rootScope', 'CONFIG', function($scope, $rootScope, CONFIG){
				$scope.service_url = CONFIG.service_url;
			}],
			templateUrl: 'views/init.html'
		})
		.state('main', {
			parent: 'init',
			url: '/',
			controller: ['$scope', '$rootScope', 'socket', 'DashboardService', function($scope, $rootScope, socket, DashboardService){
				var self = this;
				$scope.$service = DashboardService;
				
				self.topDevice = undefined;
				self.middleDevice = undefined;
				self.bottomDevice = undefined;
				
				self.subscriptions = DashboardService.subscriptions;
				
				self.stopWS = function(){
					self.socket.close();
				};
				
			}],
			controllerAs: '$view',
			templateUrl: 'views/main.html'
		})
		.state('nodes', {
			parent: 'init',
			url: '/nodes',
			controller: ['$scope', 'socket', 'DashboardService', function($scope, socket, DashboardService){
				var self = this;
				$scope.$service = DashboardService;
				
				self.allNodes = DashboardService.allNodes;
				
				self.pauseNode = DashboardService.pauseCode;
				
				self.watchNode = function(nodeId){
					socket.send({ action: "pubsub", command: "subscribe", topic: nodeId+"/running" });
				};
			}],
			controllerAs: '$view',
			templateUrl: 'views/nodes.html'
		})
		.state('nodes.view', {
			url: '/:nodeId',
			controller: ['$scope', '$stateParams', 'DashboardService', function($scope, $stateParams, DashboardService){
				var self = this;
				self.node = DashboardService.allNodes[$stateParams.nodeId];
			}],
			controllerAs: '$vm',
			templateUrl: 'views/node-view.html'
		})
		.state('codes', {
			parent: 'init',
			url: '/codes',
			controller: ['$scope', 'socket', 'DashboardService', '$http', function($scope, socket, DashboardService, $http){
				var self = this;
				$scope.$service = DashboardService;
			
				self.idleNodes = DashboardService.allNodes;
				self.allCodes = DashboardService.allCodes;
				


				/**
				 * @function init Function called when the page loads: initializes the file menu
				 * @author Atif Mahmud
				 */ 
				self.init = function(){
					self.renderMenu(url);
					visitedPages.push(url);
				},
				


				/**
				 * @function clearAll Function clears out the text fields
				 */
				self.clearAll = function(){
					self.codeName = "";
					self.code = "";
					self.selectedNode = undefined;
				},



				/**
				 * @function renderMenu Refreshes the filemenu with all filesystem objects from current url
				 * @param {String} url endpoint to refresh the file menu from 
				 * @author Atif Mahmud
				 */
				self.renderMenu = function(menuUrl){

					url = menuUrl;
					console.log("In renderMenu, url is: " + url);

					$http.get(url).then(function(response){
						
						console.log("http get request response");
						console.log(response);

						self.allCodes = {};

						for(var i = 0; i < response.data.content.length; i++){
							var child = response.data.content[i];
							self.allCodes[child.name] = child;
						}

						self.clearAll();

					}, function(){
						console.log("An error occured");
					});
				},



				/**
				 * @function menuClick Navigates to directory or displays file contents on code window
				 * @param {String} codeName Name of the filesystem object 
				 * @param {Array} content 
				 * @author Atif Mahmud
				 */
				self.menuClick = function(codeName, content){
					if (content.type === "directory"){
						url += codeName + "/";
						self.renderMenu(url);
						visitedPages.push(url);
					} 
					else if (content.type === "file"){
						self.code = self.allCodes[codeName].content;
					}
				}, 
				


				/**
				 * @function checked Adds the checked object to checkedArray
				 * @param {String} name Name of the filesystem object 
				 * @param {String} content Content of the filesystem object (String if file, Array if folder)
				 * @param {Boolean} value Status of checkbox (1 if checked)
				 * @author Atif Mahmud
				 */
				self.checked = function(name, content, value){
					
					var checkedObject = {
						"name" : name,
						"content" : content,
						"url" : url
					};

					if(value){
						console.log(checkedObject);
						checkedArray.push(checkedObject);
					} else {
						checkedArray.splice( checkedArray.indexOf(name), 1 );
					}	
				},



				/**
				 * @function saveCode Saves a file in the current directory
				 * @param {String} name Name of the file 
				 * @param {String} code Contents of the file
				 * @author Atif Mahmud
				 */
				self.saveCode = function(name, code){
				
					var postData = {
						"file_name" : name,
						"parent_path" : url.replace(replace, ""),
						"is_file" : true,
						"content" : code
					};
					
					$http.post(createFSUrl, postData).then(function(){
						window.alert("File saved successfully using http POST");
						self.renderMenu(url);
					}, function(){
						alert("File save was unsuccessful");
					});
				},



				/**
				 * @function saveFolder Saves a new folder in the current directory
				 * @param {String} name Name of the folder
				 * @author Atif Mahmud 
				 */
				self.saveFolder = function(name){
					
					var postData = {
						"file_name" : name,
						"parent_path" : url.replace(replace, ""),
						"is_file" : false,
					};
					
					$http.post(createFSUrl, postData).then(function(){
						alert("Folder saved succesfully using http POST");
						self.renderMenu(url);
					}, function(){
						console.log("Folder save failed");
					});
				}, 



				/**
				 * @function deleteObject Deletes a filesystem object
				 * @param {String} name Name of the filesystem object to delete
				 * @author Atif Mahmud
				 */
				self.deleteObject = function(name){
					var result = confirm("Are you sure you want to delete " + name + "?");

					var postBody = {
						"file_path" :  url.replace(replace, "") + name
					};

					if(result){
						$http.post(deleteFSUrl, postBody).then(function(){
							console.log(name + " deleted successfully");
							self.renderMenu(url);
						}, function(){
							alert("File delete was unsuccessful");
						});
					}
				},



				/**
				 * @function copySelected Copies filesystem objects into copied array
				 * @author Atif Mahmud
				 */
				self.copySelected = function(){

					for (var e in checkedArray){
						var toPush = checkedArray[e];
						copied.push(toPush);
					}

					checkedArray = [];
		
				},



				/**
				 * @function cutSelected "Cuts" folders/files for pasting
				 * @author Atif Mahmud
				 */
				self.cutSelected = function(){

					for (var e in checkedArray){
						var toPush = checkedArray[e];
						cut.push(toPush);
						console.log(cut);
					}

					checkedArray = [];

				},



				/**
				 * @function deleteSelected Deletes all the checked/selected files
				 * @author Atif Mahmud
				 */
				self.deleteSelected = function(){

					for (var e in checkedArray){
						var toDelete = checkedArray[e].name;
						self.deleteObject(toDelete);
					}

					checkedArray = [];
				},



				/**
				 * @function pasteSelected Pastes the filesystem objects after cut/copy
				 * @author Atif Mahmud
				 */
				self.pasteSelected = function(){

					for (var e in copied){
						var filepath = (copied[e].url).replace(replace, "") + copied[e].name;
						self.cloneObject(filepath, copied[e].content.name + "_copied", url.replace(replace, ""));
					}

					copied = [];

					for (var e in cut){
						var toMove = cut[e].name;
						var objectPath = cut[e].url;
						self.moveObject(toMove, currentPath);
					}

					cut = [];
					self.renderMenu(url);
				
				},



				/**
				 * @function moveObject Moves filesystem objects
				 * @param {String} name Name of filesystem object
				 * @param {String} path Path from which it is being moved
				 * @author Atif Mahmud
				 */
				self.moveObject = function(name, path){

					var movePostBody = {
						"file_path" :  path.replace(replace, "") + name, 
						"parent_path": url.replace(replace, "")
					};

					$http.post(moveFSUrl, movePostBody).then(function(){
						console.log("File move successful");
						self.renderMenu(url);
					}, function(){
						alert("File move was unsuccessful");
					});
				},
				


				/**
				 * @function cloneObject Makes a clone of a filesystem object (used in copy-paste) 
				 * @param {String} name Name of the filesystem object 
				 * @param {String} newName New Name of the filesystem object
				 * @param {String} path Path from where it is being cloned
				 * @author Atif Mahmud
				 */
				self.cloneObject = function(name, newName, path){
					
					var postObject = {
						"file_path"   : name,
						"file_name"   : newName,
						"parent_path" : path
					};

					$http.post(cloneFSUrl, postObject).then(function(){
						console.log("Copy/paste successful");
						self.renderMenu(url);
					}, function(){
						alert("Copy/paste was unsuccessful");
					});
				},



				/**
				 * @function moveBackFolder Moves back up in the directory navigation path
				 */
				self.moveBackFolder = function(){
					console.log("Now in url: " + url);
					var newUrl = visitedPages[visitedPages.length - 2];
					console.log("Going to url " + newUrl);
					visitedPages.pop();
					self.renderMenu(newUrl);
				},



				/**
				 * @function isEmpty Determines visibility of HTML components based on contents of checkedArray
				 * @returns {Boolean} true if files have been checked, copied, or cut
				 * @author Atif Mahmud
				 */
				self.isEmpty = function(){
					return ( !(checkedArray.length === 0) || !(copied.length === 0) || !(cut.length === 0) );
				},



				/**
				 * @function showPaste Determines visibility of the "Paste" button
				 * @returns {Boolean} true if any file has been copied or cut
				 * @author Atif Mahmud
				 */
				self.showPaste = function(){
					return ( !(copied.length === 0) || !(cut.length === 0) );
				},



				/**
				 * @function listStyle Grays out filesystem objects that have been cut
				 * @param {String} name Name of filesystem object
				 * @author Atif Mahmud
				 */
				self.listStyle = function(name){
					for (var e in cut){
						if(cut[e].name == name){
							return {"opacity" : 0.5};
						}
					}
				},



				/**
				 * @function showBackButton Determines visibility of the back button
				 * @returns {Boolean} 1 if more than one page has been visited (if you go back all the way to first page, back button disappears)
				 * @author Atif Mahmud
				 */
				self.showBackButton = function(){
					return (visitedPages.length > 1);
				},



				/**
				 * @function getIcon Determines which icon is to be shown in the file menu
				 * @param {Array} content Content of the filesystem object
				 * @returns {String} the icon to display
				 * @author Atif Mahmud
				 */
				self.getIcon = function(content){
					if (content.type == "directory"){
						return "fa fa-folder";
					} else if (content.type == "file"){
						return "fa fa-file";
					}
				},



				/**
				 * @function sendCode Run code on a node 
				 */
				self.sendCode = DashboardService.runCode;


				
				/**
				 * @function onKeyDown Action on keyboard shortcut events
				 * @param {Event} event Keyboard event 
				 */
				self.onKeyDown = function(event){

					// Ctrl + S
					if (event.ctrlKey && event.which === 83){
						event.preventDefault();
						$scope.$service.saveCode(self.codeName, self.code);
					}
				};
			}],

			controllerAs: '$view',
			templateUrl: 'views/codes.html'
		})

		.state('debug', {
			parent: 'init',
			url: '/debug',
			controller: ['$scope', 'socket', function($scope, socket){
				var self = this;
				
				self.subscribe = function(topic){
					socket.send({ action: "subscribe", topic: topic });
				}
			}],
			controllerAs: '$view',
			templateUrl: 'views/debug.html'
		})
     			
	$urlRouterProvider.otherwise('/');
}]);