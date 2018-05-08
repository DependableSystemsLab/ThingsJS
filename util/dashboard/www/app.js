'use strict';

var dashApp = angular.module('dashApp', ['ngResource', 
                                         'ui.router',
                                         'ui.bootstrap',
                                         'ui.ace',
                                         'nvd3',
                                         'things.js'] );

dashApp.constant("CONFIG", {
	service_url: window.location.origin,
	pubsub_url: ('ws://'+window.location.hostname+':8000'),
	repo_url: (window.location.origin+'/file-system'),
	websocket_url: (window.location.origin+'/websocket'),
})
.config(['$stateProvider', '$urlRouterProvider', 
    function($stateProvider, $urlRouterProvider){
	$stateProvider
		.state('init', {
			url: '',
			abstract: true,
			resolve: {
				code_repo: ['CodeRepository', 'CONFIG', function(CodeRepository, CONFIG){
					return CodeRepository.create(CONFIG.repo_url);
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
			controller: ['$scope', '$rootScope', 'dashboard', function($scope, $rootScope, dashboard){
				var self = this;
				// $scope.$service = DashboardService;
				$scope.$dash = dashboard;
				// console.log($scope.$dash, DashboardService.allCodes);

				self.video_raw = "data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==";

				dashboard.pubsub.subscribe('things-videostream/raw', function(topic, message){
					if (message){
						self.video_raw = "data:image/png;base64,"+message;
					}
					else {
						//Empty image
						self.video_raw = "data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==";
					}
					$scope.$apply();
				});
				dashboard.pubsub.subscribe('things-videostream/motion', function(topic, message){
					if (message){
						self.video_motion = "data:image/png;base64,"+message;
					}
					else {
						//Empty image
						self.video_motion = "data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==";
					}
					$scope.$apply();
				});

				self.topDevice = undefined;
				self.middleDevice = undefined;
				self.bottomDevice = undefined;
				
			}],
			controllerAs: '$view',
			templateUrl: 'views/main.html'
		})
		.state('applications',{
			parent: 'init',
			url: '/applications',
			controller: ['$scope','DashboardService', function($scope, DashboardService){
				var self = this;
				$scope.$dash = DashboardService;
				
				// self.allNodes = DashboardService.allNodes;

				// self.allCodes = DashboardService.allCodes;
				
				// self.pauseNode = DashboardService.pauseCode;
				
				// self.watchCode = function(codeId){
				// 	socket.send({ action: "pubsub", command: "subscribe", topic: codeId+"/running" });
				// };

				//got programs from things-js Dashboard 


				self.topProgram = undefined;
				self.middleProgram = undefined;
				self.bottomProgram = undefined;
			}],
			controllerAs: '$view',
			templateUrl: 'views/applications.html'
		})
		.state('nodes', {
			parent: 'init',
			url: '/nodes',
			controller: ['$scope', function($scope){
				var self = this;

			}],
			controllerAs: '$view',
			templateUrl: 'views/nodes.html'
		})
		.state('nodes.view', {
			url: '/:nodeId',
			controller: ['$scope', '$stateParams', function($scope, $stateParams){
				var self = this;
				
			}],
			controllerAs: '$vm',
			templateUrl: 'views/node-view.html'
		})
		.state('codes', {
			parent: 'init',
			url: '/codes',
			controller: ['$scope', 'CodeRepository', function($scope, CodeRepository){
				var self = this;
				$scope.$repo = CodeRepository.get();

				self.cur_path = '/';
				self.cur_path_tokens = [];
				self.cur_dir = {};
				self.cur_code = undefined;
				self.cur_selection = {};

				self.refresh = function(){
					$scope.$repo.get(self.cur_path)
						.then(function(fsObject){
							console.log(fsObject);
							self.cur_dir = fsObject;
							self.cur_path_tokens = self.cur_path.split('/').slice(1);
							$scope.$apply();
						})
				}

				self.saveFile = function(){
					$scope.$repo.writeFile(self.cur_path, self.cur_code)
						.then(function(file){
							console.log("file saved", file);
							self.cur_code._id = file._id;
							self.refresh();
						});
				}

				self.makeDir = function(dir_name){
					$scope.$repo.makeDir(self.cur_path, dir_name)
						.then(function(dir){
							console.log("directory saved", dir);
							self.refresh();
						})
				}

				self.navigateTo = function(dir_name){
					if (dir_name === '..'){
						self.cur_path = '/'+self.cur_path_tokens.slice(0,-1).join('/');
					}
					else if (dir_name[0] === '/'){
						self.cur_path = dir_name;
					}
					else if (self.cur_path === '/'){
						self.cur_path = self.cur_path+dir_name;
					}
					else {
						self.cur_path = self.cur_path+'/'+dir_name;	
					}
					console.log(self.cur_path)
					self.clearAll();
					self.refresh();
				}

				self.deleteSelection = function(){
					var ids = Object.keys(self.cur_selection)
						.map(function(key){
							return self.cur_dir.children[key]._id;
						})
					console.log(ids);

					$scope.$repo.delete(self.cur_path, ids)
						.then(function(){
							console.log(ids.length+' items deleted');
							self.refresh();
						})
				}
				
				self.clearAll = function(){
					self.cur_code = {
						name: '',
						content: ''
					};
					self.cur_selection = {};
				}
				self.clearAll();

				self.selectCode = function(code){
					self.cur_code._id = code._id;
					self.cur_code.name = code.name;
					self.cur_code.content = code.content;
				}
				
				self.onKeyDown = function(event){
					if (event.ctrlKey && event.which === 83){
						/* Pressed Ctrl + S */
						event.preventDefault();
						self.saveFile();
					}
				};

				$scope.$watch(function(){ return self.cur_selection },
					function(selection){
						self.hasSelection = Object.values(selection).reduce(function(acc, item){ return acc || !!item }, false);
						console.log(selection);
					}, true)

				// initialize view
				self.refresh();
			}],
			controllerAs: '$view',
			templateUrl: 'views/codes.html'
		})
		.state('debug', {
			parent: 'init',
			url: '/debug',
			controller: ['$scope', function($scope){
				var self = this;
				
				// self.subscribe = function(topic){
				// 	socket.send({ action: "subscribe", topic: topic });
				// }
			}],
			controllerAs: '$view',
			templateUrl: 'views/debug.html'
		})
     			
	$urlRouterProvider.otherwise('/');
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
			}
			scope.$watch(function(){ return marker.offset().top; }, function(newVal, oldVal){ stick(); });
			scope.$watch(function(){ return element.height(); }, function(newval){ stick(); });
			angular.element($window).bind('resize', function(){ stick(); });
		}
	}
});