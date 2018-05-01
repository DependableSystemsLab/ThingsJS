'use strict';

var dashApp = angular.module('dashApp', ['ngResource', 
                                         'ui.router',
                                         'ui.bootstrap',
                                         'ui.ace',
                                         'nvd3',
                                         'things.js'] );

dashApp.constant("CONFIG", {
	service_url: (window.location.hostname+':'+window.location.port),
	websocket_url: (window.location.hostname+':'+window.location.port+'/websocket'),
	pubsub_url: ('ws://'+window.location.hostname+':8000')
})
// .factory('CodeEngine', function(){
	
// 	var icon_mapping = {
// 		'undefined': 'assets/img/device-unknown-sm.png',
// 		'raspberry-pi3': 'assets/img/device-raspberry-pi3-sm.png',
// 		'raspberry-pi0': 'assets/img/device-raspberry-pi0-sm.png',
// 		'xeon-e3': 'assets/img/device-xeon-e3-sm.png',
// 		'xeon-e5': 'assets/img/device-xeon-e5-sm.png'
// 	}
	
// 	function CodeEngine(data){
// 		this.id = data.id;
// 		this.status = data.status || "unknown";
// 		this.running = data.running || undefined;
// 		this.info = data.info || {};
// 		this.stats = [];
// 		this.console = [];
		
// 		//additional properties for humans
// 		this.setIcon((data.info ? data.info.device : 'undefined'));
// 	}
// 	CodeEngine.prototype.update = function(data){
// 		this.status = data.status || "unknown";
// 		this.running = data.running || undefined;
		
// 		if (data.info){
// 			this.info = data.info;
// 			this.setIcon(data.info.device);
// 		}
// 	};
// 	CodeEngine.prototype.clearConsole = function(){
// 		this.console = [];
// 	};
// 	CodeEngine.prototype.setIcon = function(device){
// 		this.icon = icon_mapping[device];
// 	};
	
// 	return {
// 		create: function(data){
// 			return new CodeEngine(data);
// 		}
// 	}
// })
// .directive('topicTable', ['DashboardService', function(DashboardService){
// 	return {
// 		restrict: 'E',
// 		scope: {},
// 		controller: function($scope){
// 			var self = this;
			
// 			self.subscriptions = DashboardService.subscriptions;
// 			self.messages = DashboardService.messages;
// 			self.selectedTopic = Object.keys(self.subscriptions)[0];
// 			self.msgSearch = "";
// 		},
// 		controllerAs: '$ctrl',
// 		templateUrl: 'components/topic-table.html' 
// 	}
// }])
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
			}
			scope.$watch(function(){ return marker.offset().top; }, function(newVal, oldVal){ stick(); });
			scope.$watch(function(){ return element.height(); }, function(newval){ stick(); });
			angular.element($window).bind('resize', function(){ stick(); });
		}
	}
})
.config(['$stateProvider', '$urlRouterProvider', 
    function($stateProvider, $urlRouterProvider){
	$stateProvider
		.state('init', {
			url: '',
			abstract: true,
			resolve: {
				socket: ['DashboardService', function(DashboardService){
					// console.log(Dashboard);
					return DashboardService.start();
				}],
				dashboard: ['Dashboard', 'CONFIG', function(Dashboard, CONFIG){
					return Dashboard.create(CONFIG.pubsub_url);
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
			controller: ['$scope', '$rootScope', 'socket', 'dashboard', 'DashboardService', function($scope, $rootScope, socket, dashboard, DashboardService){
				var self = this;
				$scope.$service = DashboardService;
				$scope.$dash = dashboard;
				console.log($scope.$dash, DashboardService.allCodes);

				self.topDevice = undefined;
				self.middleDevice = undefined;
				self.bottomDevice = undefined;
				
				self.subscriptions = DashboardService.subscriptions;
				
				self.stopWS = function(){
					self.socket.close();
				}
				
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
			controller: ['$scope', 'socket', 'DashboardService', function($scope, socket, DashboardService){
				var self = this;
				$scope.$service = DashboardService;
				
				self.idleNodes = DashboardService.allNodes;
				
				self.allCodes = DashboardService.allCodes;
				
				self.clearAll = function(){
					self.codeName = "";
					self.code = "";
					self.selectedNode = undefined;
				}
				self.clearAll();

				self.selectCode = function(codeName){
					self.codeName = codeName;
					self.code = self.allCodes[codeName].code;
				}

				self.sendCode = DashboardService.runCode;
				
				self.onKeyDown = function(event){
					if (event.ctrlKey && event.which === 83){
						/* Pressed Ctrl + S */
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