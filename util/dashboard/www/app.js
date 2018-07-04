'use strict';

var dashApp = angular.module('dashApp', ['ngResource', 
                                         'ui.router',
                                         'ui.bootstrap',
                                         'ui.ace',
                                         'nvd3',
                                         'things.js',
                                         'ngTable'] );

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
				}],
				// schedule: ['Schedule', 'CONFIG',function(Schedule,CONFIG){
				// 	return Schedule.create(CONFIG.repo_url);
				// }]
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
		.state('components',{
			parent: 'init',
			url: '/components',
			controller: ['$scope','dashboard','NgTableParams',function($scope,dashboard,NgTableParams){
				var self = this;
				$scope.$dash = dashboard;

				//got programs from things-js Dashboard 

				self.topProgram = undefined;
				self.middleProgram = undefined;
				self.bottomProgram = undefined;


				$scope.sortType     = 'code_name'; // set the default sort type
  				$scope.sortReverse  = false;  // set the default sort order
  				$scope.search   = '';     // set the default search/filter term  

				// $scope.dataarray = Object.keys($scope.$dash.programs).map(function (key) { return $scope.$dash.programs[key]; });
			}],
			controllerAs: '$view',
			templateUrl: 'views/components.html'
		})		
		.state('applications',{
			parent: 'init',
			url: '/applications',
			controller: ['$scope','dashboard',function($scope,dashboard){
				var self = this;
				$scope.$dash = dashboard;

				//got programs from things-js Dashboard 
				self.cur_path = '/applications';
				self.cur_path_tokens = [];
				self.cur_dir = {};
				self.makeDir() = function(){


				}

				self.writeFile = function(){

				}





				$scope.sortType     = 'code_name'; // set the default sort type
  				$scope.sortReverse  = false;  // set the default sort order
  				$scope.search   = '';     // set the default search/filter term  
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
		.state('schedule', {
			parent: 'init',
			url: '/schedule',
			controller: ['$scope','dashboard','CodeRepository','$stateParams', function($scope, dashboard, CodeRepository,$stateParams){
				var self = this;
				//access file system
				$scope.repo = CodeRepository.get();
				$scope.$dash = dashboard;
				// $scope.schedule = Schedule.get();

				var schedule1 =  { 'pi0-1': [ 'fractorial.js/0', 'shade-contr.js/1' ],
					'pi3-3': [ 'sprinkler.js/1', 'shade-contr.js/2' ],
					'pi3-1': [ 'sprinkler.js/2', 'shade-contr.js/3' ],
					'pi3-2': [ 'sprinkler.js/3', 'temp-reg.js/0' ],
					'i7-1': [ 'shade-contr.js/0', 'temp-reg.js/1' ]};

				var schedule2 =  { 'pi0-1': [ 'sprinkler.js/2', 'shade-contr.js/1' ],
					'pi3-3': [ 'sprinkler.js/1', 'shade-contr.js/2' ],
					'pi3-1': [ 'sprinklertest.js/28', 'shade-contr.js/3' ],
					'pi3-2': [ 'sprinkler.js/32', 'temp-regettd.js/0' ],
					'i7-1': [ 'shade-contr.js/09', 'temp-reg.js/12' ]};

				var currentschedule = { 'pi0-21': [ 'sprinkler.js/27', 'shade-test.js/12' ],
					'pi3-3': [ 'sprinkler.js/1', 'shade-contr.js/2' ],
					'pi3-12': [ 'sprinklertest.js/28', 'shade-contr.js/3' ],
					'pi3-2': [ 'sprinkler.js/32', 'temp-regettd.js/0' ],
					'i7-1': [ 'shade-contr.js/89', 'temp-reg.js/12' ]};


			function Device(device_id,components_id,components_name){
  				this.device_id =device_id;
  				this.components_id = components_id;
  				this.components_name = components_name; 
			}

			function Schedule(id,data){ 
   				this.id = id;
			    
        		this.devices ={}; 
        		var that = this;
			    Object.keys(data).forEach(function(element){
			    var id_array = []; 
        		var name_array = [];
			       data[element].forEach(function(ele){
			       // console.log(ele.split(".js/")[1]);
			        id_array.push(ele.split("/")[1]);
            		name_array.push(ele.split("/")[0]);
			      })
         		that.devices[element] = new Device(element,id_array,name_array);
			    });
			}

				$scope.$schedules = {};
				$scope.$schedules['currentschedule'] = new Schedule('currentschedule',currentschedule);
				$scope.$schedules['schedule1'] = new Schedule('schedule1',schedule1);
				$scope.$schedules['schedule2'] = new Schedule('schedule2',schedule2);
			
			
				$scope.$scheduleArray = Object.keys($scope.$schedules).map(function (key) { return $scope.$schedules[key]; });
				
				$scope.sortType     = 'id'; // set the default sort type
  				$scope.sortReverse  = false;  // set the default sort order
  				$scope.search   = '';     // set the default search/filter term  

				self.cur_path = "/schedule"; // tentative path
				self.cur_path_tokens = [];
				self.schedules = [];
			}],
			controllerAs: '$view',
			templateUrl: 'views/schedule.html'
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