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
			controller: ['$scope','dashboard','CodeRepository',function($scope,dashboard,CodeRepository){
				var self = this;
				$scope.$dash = dashboard;
				$scope.$repo = CodeRepository.get();


				self.cur_path = '/';
				self.cur_path_tokens = [];
				self.cur_dir = {};
				self.cur_code = undefined;
				self.cur_selection ={};
				self.code_selection = [];
				self.app_path ='/application';
				self.app_dir = {};
				self.app_content={};

				function randKey(length, charset){
					var text = "";
					if (!length) length = 8;
					if (!charset) charset = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
				    for( var i=0; i < length; i++ ){
				    	text += charset.charAt(Math.floor(Math.random() * charset.length));
				    }
				    return text;
				}

				function Application(id,name,components){
					this.name = name;
					this.id = id;
					this.components = components;
					
				}

				function remove(array, element) {
   					array.splice(array.indexOf(element), 1);
				}

				self.refresh = function(){
					$scope.$repo.get(self.cur_path)
						.then(function(fsObject){
							console.log(fsObject);
							self.cur_dir = fsObject;
							self.cur_path_tokens = self.cur_path.split('/').slice(1);
							$scope.$apply();
						})
					$scope.$repo.get(self.app_path)
						.then(function(fsObject){
							console.log("apppath");
							console.log(fsObject);
							self.app_dir = fsObject;
							self.app_path_tokens = self.app_path.split('/').slice(1);
							$scope.$apply();
						})
				}

				self.clearCodeSelection = function(){
					self.code_selection = [];
				}
				self.selectCode = function(code){
					if (!(self.code_selection.includes(code))){
						self.code_selection.push(code);
						}
					console.log(self.code_selection);
				}

				self.removeCode = function(code){
					if (self.code_selection.includes(code)){
						remove(self.code_selection,code);
						delete self.app_content[code];
						}
					console.log(self.code_selection);
				}

				self.instanceChange = function(code,instanceNumber,required_memory){
					console.log("code:"+instanceNumber);
					var component_detail ={};
					component_detail["num_instances"] = instanceNumber;
					component_detail["required_memory"] = required_memory;
					self.app_content[code]= component_detail;
				}

				self.generateApp =  function(name){			
				//generate app id
				var id = randKey(10);
				//save to file system
				//how to avoid duplicate??
				var app_content = new Application(id,name,self.app_content);
				// var content = {"setup_content":app_content,"detail_content":{}}
				var content = {};
				content["setup_content"] = app_content;
				content["detail_content"] = {"233":"just a test"};
				console.log("********content"+ JSON.stringify(content));
				var app = {
				    'name': name,
				    'content': JSON.stringify(content),
				    'type': 'file'
				};
			    self.saveFile(app);
			    // console.log(json_file);
			    self.code_selection =[];
			    self.app_content = {};
				}					


				$scope.$watch(function(){ return self.cur_selection },
					function(selection){
						self.hasSelection = Object.values(selection).reduce(function(acc, item){ return acc || !!item }, false);
						console.log(selection);
					}, true);

				// initialize view
				$scope.$repo.makeDir(self.cur_path, "application")
						.then(function(dir){
							console.log("directory saved", dir);
							self.refresh();
						});
				self.refresh();

				self.saveFile = function(app){
					$scope.$repo.writeFile(self.app_path,app)
						.then(function(file){
							console.log("file saved", file);
							self.cur_selection._id = file._id;
							self.refresh();
						});
				}


			//send runapplication detail 
			self.runApplication = function(app_data, app_name) {
			    var updateDetail = {};
			    console.log("pubsub publish runApplication" + JSON.parse(app_data)["setup_content"])
			    dashboard.pubsub.publish("runApplication", JSON.parse(app_data)["setup_content"]);

			    //sample app format 
			    // {
			    //     "name": "app1.json",
			    //     "id": "fnsdiolsa",
			    //     "components": {
			    //         "Factorial.js": { num_instances: 3, required_memory: 500000,  },
			    //         “Test.js” { num_instances: 5, required_memory: 2394832948234 }
			    //     }
			    // }
			    var APPLICATION_DETAIL = "applicationDetails/" + JSON.parse(app_data)["setup_content"]["id"];
			    dashboard.pubsub.subscribe(APPLICATION_DETAIL, function(topic, appdetail) {
			        // console.log("subscribe channel" + topic + '\n\n');
			        console.log("appdetail" + JSON.stringify(appdetail));
			        console.log("appData" + JSON.stringify(app_data));
			        alert(JSON.stringify(appdetail)+"\n"+ "EXPECTED ID" + JSON.parse(app_data)["setup_content"]["id"]+"\n"+"RECEVIED ID" + appdetail["id"]);
			        // console.log("EXPECTED ID" + JSON.parse(app_data)["setup_content"]["id"]);
			        // console.log("RECEVIED ID" + appdetail["id"]);
			        if (appdetail["id"] === JSON.parse(app_data)["setup_content"]["id"]) {
			            // var responseBody = {
			            //     "Factorial.js": ["ABCDEFG", "DKJFSDR"],
			            //     "Test.js": ["skERRR", "SDFKSADF"]
			            // }
			            console.log("+++++jump to " + app_name + "subscribe");
			            appdetail["instances"]
			            var newArray = [];
			            Object.keys(appdetail["instances"]).forEach(function(code_name) {
			                appdetail["instances"][code_name].forEach(function(instance) {
			                    var code = { "code_name": code_name, "instance_id": instance };
			                    newArray.push(code)
			                })
			            });
			            updateDetail = { "instances": newArray };
			        }

			        // 	console.log("received all instance id for components" + appdetail);
			        var content = {};
			        content["setup_content"] = JSON.parse(app_data)["setup_content"];
			        content["detail_content"] = updateDetail;
			        var updated_app = {
			            'name': app_name,
			            'content': JSON.stringify(content),
			            'type': 'file'
			        };
			        updated_app["_id"] = self.app_dir.children[app_name]._id;
			        self.saveFile(updated_app);
			    });
			};

			self.stopApplication = function(app_detail){
				console.log("pubsub publish stopApplication" + JSON.parse(app_detail)["detail_content"]["instances"])
				dashboard.pubsub.publish("stopApplication",JSON.parse(app_detail)["detail_content"]["instances"]);
				//sampleinfo
				//[{code_name: ‘one.js’, instance_id: ‘ABC’}, {code_name:__, instance_id:__},...]
				};
			}],
			controllerAs: '$view',
			templateUrl: 'views/applications.html'
		})
		.state('app_component', {
			parent: 'init',
			url: '/app_component/:app_name/:app_content',
			params:{
				app_name:null,
				app_content:null,
			},
			controller: ['$scope', '$stateParams','CodeRepository',function($scope,$stateParams,CodeRepository){
				var self = this;
				$scope.$repo = CodeRepository.get();
				$scope.$app_name = $stateParams.app_name;
				$scope.$app_content = $stateParams.app_content;
				console.log($scope.$app_content);

			}],
			controllerAs: '$view',
			templateUrl: 'views/app_component.html'
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

				function joinPath(p1, p2) {
				    if (p1[p1.length - 1] === '/') p1 = p1.substring(0, p1.length - 1);
				    if (p2[0] === '/') p2 = p2.substring(1);
				    return p1 + '/' + p2;
				}

				//access file system
				$scope.$repo = CodeRepository.get();
				$scope.$dash = dashboard;
				// $scope.schedule = Schedule.get();

				self.cur_path = "/"; // tentative path
				self.schedule_path_tokens = [];
				self.schedules = [];
				self.schedule_path = "/schedule"
				self.schedule_dir = {};
				self.cur_schedule_selection = {};

				self.refresh = function(){
					// $scope.$repo.get(self.cur_path)
					// 	.then(function(fsObject){
					// 		console.log(fsObject);
					// 		self.cur_dir = fsObject;
					// 		self.cur_path_tokens = self.cur_path.split('/').slice(1);
					// 		$scope.$apply();
					// 	})

					$scope.$repo.get(self.schedule_path)
						.then(function(fsObject){
							console.log("schedule_path");
							console.log(fsObject);
							self.schedule_dir = fsObject;
							self.schedule_path_tokens = self.schedule_path.split('/').slice(1);
							$scope.$apply();

						})

				}


				self.getSchedule = function(dir_name,scheduleName){
					// self.navigateTo(dir_name);
					var schedule_name = scheduleName + ".json";
					return $scope.$repo.get(joinPath(self.schedule_path,dir_name))
						.then(function(dir){
							console.log("dir get", dir);	 
							self.cur_schedule_selection._id = dir.children[schedule_name]["_id"];
							self.cur_schedule_selection.name = dir.children[schedule_name].name;
							self.cur_schedule_selection.content = dir.children[schedule_name].content;
							console.log("schedule content" + self.cur_schedule_selection.content);
							self.refresh();
							console.log("233"+self.cur_schedule_selection.content);
							return new Schedule(scheduleName,JSON.parse(self.cur_schedule_selection.content)); 
						});


				}

				self.iterateDir = function(dir_name){
					var files = [];
					return $scope.$repo.get(joinPath(self.schedule_path,dir_name)).
					then(function(dir){
						console.log("dir get", dir);
						// var files = dir.children;
						Object.keys(dir.children).forEach(function(schedule_name){
							console.log("233ITERATION" + dir.children[schedule_name].content);
							files.push(new Schedule(schedule_name,JSON.parse(dir.children[schedule_name].content)));
						});
						return files;
					});
				}
				

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
			    console.log("data to be parsed" + data);
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
				self.getSchedule("current","current").then(function(data){
					$scope.$schedules["current"] = data; 

				});
				
				self.iterateDir("history").then(function(data){
					// console.log("#####*****" + data);
					data.forEach(function(schedule){
						$scope.$schedules[schedule["id"]] = schedule;
					});
				
				});


			


				$scope.$scheduleArray = Object.keys($scope.$schedules).map(function (key) { return $scope.$schedules[key]; });
				
				$scope.sortType     = 'id'; // set the default sort type
  				$scope.sortReverse  = false;  // set the default sort order
  				$scope.search   = '';     // set the default search/filter term  

  				//subscribe update channel !

				self.refresh();
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