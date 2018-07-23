'use strict';

var dashApp = angular.module('dashApp', ['ngResource',
    'ui.router',
    'ui.bootstrap',
    'ui.ace',
    'nvd3',
    'things.js',
    'ngTable'
]);

dashApp.constant("CONFIG", {
        service_url: window.location.origin,
        pubsub_url: ('ws://' + window.location.hostname + ':8000'),
        repo_url: (window.location.origin + '/file-system'),
        websocket_url: (window.location.origin + '/websocket'),
    })
    .config(['$stateProvider', '$urlRouterProvider',
        function($stateProvider, $urlRouterProvider) {
            $stateProvider
                .state('init', {
                    url: '',
                    abstract: true,
                    resolve: {
                        code_repo: ['CodeRepository', 'CONFIG', function(CodeRepository, CONFIG) {
                            return CodeRepository.create(CONFIG.repo_url);
                        }],
                        dashboard: ['Dashboard', 'CONFIG', function(Dashboard, CONFIG) {
                            return Dashboard.create(CONFIG.pubsub_url);
                        }],

                    },
                    controller: ['$scope', '$rootScope', 'CONFIG', function($scope, $rootScope, CONFIG) {
                        $scope.service_url = CONFIG.service_url;
                    }],
                    templateUrl: 'views/init.html'
                })
                .state('main', {
                    parent: 'init',
                    url: '/',
                    controller: ['$scope', '$rootScope', 'dashboard', function($scope, $rootScope, dashboard) {
                        var self = this;
                        // $scope.$service = DashboardService;
                        $scope.$dash = dashboard;
                        // console.log($scope.$dash, DashboardService.allCodes);

                        self.video_raw = "data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==";

                        dashboard.pubsub.subscribe('things-videostream/raw', function(topic, message) {
                            if (message) {
                                self.video_raw = "data:image/png;base64," + message;
                            } else {
                                //Empty image
                                self.video_raw = "data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==";
                            }
                            $scope.$apply();
                        });
                        dashboard.pubsub.subscribe('things-videostream/motion', function(topic, message) {
                            if (message) {
                                self.video_motion = "data:image/png;base64," + message;
                            } else {
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
                .state('components', {
                    parent: 'init',
                    url: '/components',
                    controller: ['$scope', 'dashboard', 'NgTableParams', function($scope, dashboard, NgTableParams) {
                        var self = this;
                        $scope.$dash = dashboard;

                        //got programs from things-js Dashboard 

                        self.topProgram = undefined;
                        self.middleProgram = undefined;
                        self.bottomProgram = undefined;


                        $scope.sortType = 'code_name'; // set the default sort type
                        $scope.sortReverse = false; // set the default sort order
                        $scope.search = ''; // set the default search/filter term  

                        // $scope.dataarray = Object.keys($scope.$dash.programs).map(function (key) { return $scope.$dash.programs[key]; });
                    }],
                    controllerAs: '$view',
                    templateUrl: 'views/components.html'
                })
                .state('applications', {
                    parent: 'init',
                    url: '/applications',
                    controller: ['$scope', 'dashboard', 'CodeRepository', function($scope, dashboard, CodeRepository) {
                        var self = this;
                        $scope.$dash = dashboard;
                        $scope.$repo = CodeRepository.get();


                        self.cur_path = '/';
                        self.cur_path_tokens = [];
                        self.cur_dir = {};
                        self.cur_code = undefined;
                        self.cur_selection = {};
                        self.code_selection = [];
                        self.app_path = '/application';
                        self.app_dir = {};
                        self.app_content = {};

                        function randKey(length, charset) {
                            var text = "";
                            if (!length) length = 8;
                            if (!charset) charset = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
                            for (var i = 0; i < length; i++) {
                                text += charset.charAt(Math.floor(Math.random() * charset.length));
                            }
                            return text;
                        }

                        function Application(id, name, components) {
                            this.name = name;
                            this.id = id;
                            this.components = components;

                        }

                        function remove(array, element) {
                            array.splice(array.indexOf(element), 1);
                        }

                        self.refresh = function() {
                            $scope.$repo.get(self.cur_path)
                                .then(function(fsObject) {
                                    console.log(fsObject);
                                    self.cur_dir = fsObject;
                                    self.cur_path_tokens = self.cur_path.split('/').slice(1);
                                    $scope.$apply();
                                })
                            $scope.$repo.get(self.app_path)
                                .then(function(fsObject) {
                                    console.log("apppath");
                                    console.log(fsObject);
                                    self.app_dir = fsObject;
                                    self.app_path_tokens = self.app_path.split('/').slice(1);
                                    $scope.$apply();
                                })
                        }

                        self.clearCodeSelection = function() {
                            self.code_selection = [];
                        }
                        self.selectCode = function(code) {
                            if (!(self.code_selection.includes(code))) {
                                self.code_selection.push(code);
                            }
                            console.log(self.code_selection);
                        }

                        self.removeCode = function(code) {
                            if (self.code_selection.includes(code)) {
                                remove(self.code_selection, code);
                                delete self.app_content[code];
                            }
                            console.log(self.code_selection);
                        }

                        self.instanceChange = function(code, instanceNumber, required_memory) {
                            console.log("code:" + instanceNumber);
                            var component_detail = {};
                            component_detail["num_instances"] = instanceNumber;
                            component_detail["required_memory"] = required_memory;
                            self.app_content[code] = component_detail;
                        }

                        self.generateApp = function(name) {
                            //generate app id
                            var id = randKey(10);
                            //save to file system
                            //how to avoid duplicate??
                            var app_content = new Application(id, name, self.app_content);
                            // var content = {"setup_content":app_content,"detail_content":{}}
                            var content = {};
                            content["setup_content"] = app_content;
                            content["detail_content"] = {};
                            console.log("********content" + JSON.stringify(content));
                            var app = {
                                'name': name,
                                'content': JSON.stringify(content),
                                'type': 'file'
                            };
                            self.saveFile(app);
                            // console.log(json_file);
                            self.code_selection = [];
                            self.app_content = {};
                        }


                        $scope.$watch(function() { return self.cur_selection },
                            function(selection) {
                                self.hasSelection = Object.values(selection).reduce(function(acc, item) { return acc || !!item }, false);
                                console.log(selection);
                            }, true);

                        // initialize view
                        $scope.$repo.makeDir(self.cur_path, "application")
                            .then(function(dir) {
                                console.log("directory saved", dir);
                                self.refresh();
                            });
                        self.refresh();

                        self.saveFile = function(app) {
                            $scope.$repo.writeFile(self.app_path, app)
                                .then(function(file) {
                                    console.log("file saved", file);
                                    self.cur_selection._id = file._id;
                                    self.refresh();
                                });
                        }


                        //send runapplication detail 
                        self.runApplication = function(app_data, app_name) {
                            var updateDetail = {};
                            console.log("pubsub publish runApplication" + JSON.parse(app_data)["setup_content"])
                            if (Object.keys(JSON.parse(app_data)["detail_content"]).length === 0) {
                                dashboard.pubsub.publish("runApplication", JSON.parse(app_data)["setup_content"]);
                                var APPLICATION_DETAIL = "applicationDetails/" + JSON.parse(app_data)["setup_content"]["id"] + "/run";
                                dashboard.pubsub.subscribe(APPLICATION_DETAIL, function(topic, appdetail) {
                                    console.log("appdetail" + JSON.stringify(appdetail));
                                    console.log("appData" + JSON.stringify(app_data));
                                    alert(JSON.stringify(appdetail) + "\n" + "EXPECTED ID" + JSON.parse(app_data)["setup_content"]["id"] + "\n" + "RECEVIED ID" + appdetail["id"]);                                    // var responseBody = {
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
                                    alert("UPDATAE DETAIL" + JSON.stringify(updateDetail));

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
                            } else {
                                alert("APPLICATION" + JSON.parse(app_data)["setup_content"]["id"] + "ALREADY LAUNCHED");
                            }
                        };

                        self.stopApplication = function(app_detail) {
                            var STOP_APPLICATION = "stopApplication";
                            var APPLICATION_DETAIL_STOP = "applicationDetails/" + JSON.parse(app_detail)["setup_content"]["id"] + "/stop";
                            var parsed_data = {};
                            parsed_data[JSON.parse(app_detail)["setup_content"]["id"]] = JSON.parse(app_detail)["detail_content"]["instances"];
                            console.log("pubsub publish stopApplication" + parsed_data);
                            dashboard.pubsub.publish(STOP_APPLICATION, parsed_data);
                            dashboard.pubsub.subscribe(APPLICATION_DETAIL_STOP, function(topic, data) {
                                if (data["status"]) {
                                    alert("stopping application successfully" + data["id"]);
                                } else {
                                    alert("stopping application failed" + data["id"]);
                                }
                            });
                        };
                    }],
                    controllerAs: '$view',
                    templateUrl: 'views/applications.html'
                })
                .state('app_component', {
                    parent: 'init',
                    url: '/app_component/:app_name/:app_content',
                    params: {
                        app_name: null,
                        app_content: null,
                    },
                    controller: ['$scope', '$stateParams', 'CodeRepository', function($scope, $stateParams, CodeRepository) {
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
                    controller: ['$scope', function($scope) {
                        var self = this;

                    }],
                    controllerAs: '$view',
                    templateUrl: 'views/nodes.html'
                })
                .state('nodes.view', {
                    url: '/:nodeId',
                    controller: ['$scope', '$stateParams', function($scope, $stateParams) {
                        var self = this;

                    }],
                    controllerAs: '$vm',
                    templateUrl: 'views/node-view.html'
                })
                .state('schedule', {
                    parent: 'init',
                    url: '/schedule',
                    controller: ['$scope', 'dashboard', 'CodeRepository', '$stateParams', function($scope, dashboard, CodeRepository, $stateParams) {
                        var self = this;

                        function joinPath(p1, p2) {
                            if (p1[p1.length - 1] === '/') p1 = p1.substring(0, p1.length - 1);
                            if (p2[0] === '/') p2 = p2.substring(1);
                            return p1 + '/' + p2;
                        }

                        //access file system
                        $scope.$repo = CodeRepository.get();
                        $scope.$dash = dashboard;
                        $scope.Math = window.Math;
                        $scope.$scheduleArray = [];
                        var SCHEDULE_UPDATE_TOPIC = 'scheduleUpdate';
                        // $scope.schedule = Schedule.get();

                        self.cur_path = "/"; // tentative path
                        self.schedule_path_tokens = [];
                        self.schedules = [];
                        self.schedule_path = "/schedule"
                        self.schedule_dir = {};
                        self.cur_schedule_selection = {};

                        self.refresh = function() {
                            // $scope.$repo.get(self.cur_path)
                            // 	.then(function(fsObject){
                            // 		console.log(fsObject);
                            // 		self.cur_dir = fsObject;
                            // 		self.cur_path_tokens = self.cur_path.split('/').slice(1);
                            // 		$scope.$apply();
                            // 	})

                            $scope.$repo.get(self.schedule_path)
                                .then(function(fsObject) {
                                    console.log("schedule_path");
                                    console.log(fsObject);
                                    self.schedule_dir = fsObject;
                                    self.schedule_path_tokens = self.schedule_path.split('/').slice(1);
                                    $scope.$apply();

                                })
                        }


                        self.getSchedule = function(dir_name, scheduleName) {
                            // self.navigateTo(dir_name);
                            var schedule_name = scheduleName + ".json";
                            self.refresh();
                            return $scope.$repo.get(joinPath(self.schedule_path, dir_name))
                                .then(function(dir) {
                                    console.log("dir get", dir);
                                    self.cur_schedule_selection._id = dir.children[schedule_name]["_id"];
                                    self.cur_schedule_selection.name = dir.children[schedule_name].name;
                                    self.cur_schedule_selection.content = dir.children[schedule_name].content;
                                    console.log("schedule content" + self.cur_schedule_selection.content);
                                   
                                    console.log("233" + self.cur_schedule_selection.content);
                                    return new Schedule(scheduleName, JSON.parse(self.cur_schedule_selection.content));
                                });
                        }

                        self.iterateDir = function(dir_name) {
                            var files = [];
                            self.refresh();
                            return $scope.$repo.get(joinPath(self.schedule_path, dir_name)).
                            then(function(dir) {
                                console.log("dir get", dir);
                                // var files = dir.children;
                                Object.keys(dir.children).forEach(function(schedule_name) {
                                    console.log("233ITERATION" + dir.children[schedule_name].content);
                                    files.push(new Schedule(schedule_name, JSON.parse(dir.children[schedule_name].content)));
                                });
                                return files;
                            });
                        }

                        var schedule1 = {
                            'pi0-1': ['fractorial.js*0', 'shade-contr.js*1'],
                            'pi3-3': ['sprinkler.js*1', 'shade-contr.js*2']};
                        

                        var schedule2 = {
                            'pi3-1': ['sprinkler.js*2', 'shade-contr.js*3'],
                            'pi3-2': ['sprinkler.js*3', 'temp-reg.js*0'],
                            'i7-1': ['shade-contr.js*0', 'temp-reg.js*1']};

                        var schedule3 = {
                            'pi3-1': ['sprinkler.js*2', 'shade-contr.js*3'],
                            'pi3-2': ['sprinkler.js*3', 'temp-reg.js*0'],
                            'i7-8': ['shade-contr.js*0', 'temp-reg.js*9']};

                        function Device(device_id, components_id, components_name) {
                            this.device_id = device_id;
                            this.components_id = components_id;
                            this.components_name = components_name;
                        }

                        function Schedule(id, data) {
                            this.id = id;
                            console.log("data to be parsed" + data);
                            this.devices = {};
                            var that = this;
                            this.timestamp = new Date(data["timestamp"]);
                            delete data["timestamp"];
                            console.log("~~~");
                            console.log("\n\n" + JSON.stringify(data))
                            Object.keys(data).forEach(function(element) {
                                var id_array = [];
                                var name_array = [];
                                data[element].forEach(function(ele) {
                                    id_array.push(ele.split("*")[1]);
                                    name_array.push(ele.split("*")[0]);
                                })
                                that.devices[element] = new Device(element, id_array, name_array);
                            });
                            console.log("devices" + JSON.stringify(this.devices));
                            console.log("timestamp" + this.timestamp);
                            }

                        function OperationSchedule(data) {
                                  console.log("data to be parsed" + data);
                                  this.devices = {};
                                  var that = this;
                                  Object.keys(data).forEach(function(element) {
                                      var id_array = [];
                                      var name_array = [];
                                      data[element].forEach(function(ele) {
                                          // console.log(ele.split(".js/")[1]);
                                          id_array.push(ele.split("*")[1]);
                                          name_array.push(ele.split("*")[0]);
                                      })
                                      that.devices[element] = new Device(element, id_array, name_array);
                                  });
                         }

                            function Operation(data) {
                                //how to handle empty data;
                                var run = data["run"];
                                var stop = data["stop"];
                                var migrate = data["migrate"];
                                this.run_schedule = new OperationSchedule(run);
                                this.stop_schedule = new OperationSchedule(stop);
                                console.log("components", this.run_schedule.devices);
                                this.migrate_content = {};
                                var that = this;
                                Object.keys(migrate).forEach(function(components_detail) {
                                    var from_device = migrate[components_detail]["from"];
                                    var to_device = migrate[components_detail]["to"];
                                    var instance_id = components_detail.split("*")[1];
                                    var code_name = components_detail.split("*")[0];
                                    console.log(code_name + ":" + instance_id + " migrate " + from_device + "--> " +
                                        to_device);
                                    that.migrate_content[components_detail]={"from":from_device,"to":to_device} 
                                });
                            }

                            $scope.$schedules = {};

                        self.iterateDir("history").then(function(data) {
                            // console.log("#####*****" + data);
                            data.forEach(function(schedule) {
                                $scope.$schedules[schedule["id"]] = schedule;
                            });
                              $scope.$scheduleArray = Object.keys($scope.$schedules).map(function(key) { return $scope.$schedules[key]; });
                        });

                        self.getSchedule("current", "current").then(function(data) {
                                $scope.$schedules["current"] = data;
                                $scope.$scheduleArray = Object.keys($scope.$schedules).map(function(key) { return $scope.$schedules[key]; });
                            });

                        // $scope.$scheduleArray = Object.keys($scope.$schedules).map(function(key) { return $scope.$schedules[key]; });
                        // console.log("$scheduleArray" + $scope.$scheduleArray);

                        $scope.sortType = 'id'; // set the default sort type
                        $scope.sortReverse = false; // set the default sort order
                        $scope.search = ''; // set the default search/filter term  
                        // dynamic view 
                        $scope.changeVersion = 0;
                        var sample_change = {
                            "run": { "node_00": ["factorial.js*2"], "node_02": ["factorial.js*4"] },
                            "stop": { "node_01": ["test.js*1","factorial.js*888","test.js*1","factorial.js*888"]},
                            "continueRun": { "node_00": ["test.js*1"]},
                            "migrate": { "factorial.js*4": { "from": "node_00", "to": "node_01" } }
                        };
                        var sample_change2 = {
                            "run": { "node_00": ["test.js*1"], "node_02": ["factorial.js*4"] },
                            "stop": { "node_01": ["factorial.js*100"]},
                            "continueRun": { "node_00": ["test.js*1"]},
                            "migrate": { "factorial.js*4": { "from": "node_00", "to": "node_01" } }
                        };
                        var static_schedule_1 = {"node_01": ["test.js*1","factorial.js*888","test.js*1","factorial.js*888"],"node_02": ["test.js*1"], "timestamp": 1532131837843 };
                        var static_schedule_2 = {"node_00":["factorial.js*2","fractorial.js*4"], "node_01": ["test.js*1"],"timestamp": 1532131837833 };
                        var static_schedule_3 = {"node_03":["factorial.js*444"], "node_01": ["test.js*1","fractorial.js*4"],"timestamp": 1532141837833 };
                        $scope.$operationArray = [];
                        $scope.scheduleArray = [];

                        self.refresh();
                        $scope.$scheduleArray = Object.keys($scope.$schedules).map(function(key) { return $scope.$schedules[key]; });
                        console.log("$scheduleArray" + $scope.$scheduleArray);

                        dashboard.pubsub.subscribe(SCHEDULE_UPDATE_TOPIC,function(topic,message){
                            alert( "update operation" + JSON.stringify(message));
                            //when detect change(){
                          
                            var schedule = message['schedule'];
                     
                            $scope.$operationArray.push(new Operation(message['operations']));
                            //use $scope.$scheduleArray
                            // $scope.scheduleArray.push(new Schedule($scope.changeVersion,message['schedule']));
                            $scope.changeVersion++;
                            $scope.$apply();
                            });

                        self.startRun = function(index,component_id){
                            console.log("startRun index:" + index);
                             var result = false;
                            if(typeof $scope.$operationArray[index] === 'undefined'||$scope.$operationArray[index] === null){
                                console.log("")
                                return result;
                            }
                            else if(Object.keys($scope.$operationArray[index]).length === 0){
                                  return result;
                            } else if(Object.keys($scope.$operationArray[index].run_schedule).length === 0){
                                return result;
                            }
                            var run_devices =  $scope.$operationArray[index].run_schedule.devices;
                            console.log("BIUBIUBIUT" + JSON.stringify(run_devices));
                            Object.keys(run_devices).forEach(function(device_id){
                                if(run_devices[device_id].components_id.includes(component_id)){
                                    console.log("components" + component_id + "start running");
                                    result = true;
                                }
                            });
                            return result;
                        }


                        self.stopRun = function(index,component_id){
                             console.log("startRun index:" + index);
                             var result = false;
                            if(typeof $scope.$operationArray[index] === 'undefined'||$scope.$operationArray[index] === null){
                                return result;
                            }
                            else if(Object.keys($scope.$operationArray[index]).length === 0){
                                  return result;
                            } else if(Object.keys($scope.$operationArray[index].stop_schedule).length === 0){
                                return result;
                            }
                            var stop_devices =  $scope.$operationArray[index].stop_schedule.devices;
                            console.log("BIUBIUBIUT" + JSON.stringify(stop_devices));
                            Object.keys(stop_devices).forEach(function(device_id){
                                if(stop_devices[device_id].components_id.includes(component_id)){
                                    console.log("components" + component_id + "start running");
                                    result = true;
                                }
                            });
                            return result;
                        }

                        self.migrate = function(index,component_id){
                            console.log("startRun index:" + index);
                             var result = "";
                            if(typeof $scope.$operationArray[index] === 'undefined'||$scope.$operationArray[index] === null){
                                return result;
                            }
                            else if(Object.keys($scope.$operationArray[index]).length === 0){
                                  return result;
                            } else if(Object.keys($scope.$operationArray[index].migrate_content).length === 0){
                                return result;
                            }
                            var migrate_content =  $scope.$operationArray[index].migrate_content;
                            console.log("BIUBIUBIUT" + JSON.stringify(migrate_content));
                            Object.keys(migrate_content).forEach(function(code_instance){
                                if(code_instance.split("*")[1] === component_id){
                                    console.log("components" + component_id + "migrate");
                                    result = "migrateTo";
                                }
                            });
                            return result;
                        }
                        
                        // $scope.$operationArray.push({});
                        // $scope.$operationArray.push(new Operation(sample_change));
                        // $scope.$operationArray.push(new Operation(sample_change2));
                        // $scope.scheduleArray.push(new Schedule("test1",static_schedule_1));
                        // $scope.scheduleArray.push(new Schedule("test2",static_schedule_2));
                        // $scope.scheduleArray.push(new Schedule("test3",static_schedule_3));

                    }],
                    controllerAs: '$view',
                    templateUrl: 'views/schedule.html'
                })
                .state('codes', {
                    parent: 'init',
                    url: '/codes',
                    controller: ['$scope', 'CodeRepository', function($scope, CodeRepository) {
                        var self = this;
                        $scope.$repo = CodeRepository.get();

                        self.cur_path = '/';
                        self.cur_path_tokens = [];
                        self.cur_dir = {};
                        self.cur_code = undefined;
                        self.cur_selection = {};

                        self.refresh = function() {
                            $scope.$repo.get(self.cur_path)
                                .then(function(fsObject) {
                                    console.log(fsObject);
                                    self.cur_dir = fsObject;
                                    self.cur_path_tokens = self.cur_path.split('/').slice(1);
                                    $scope.$apply();
                                })
                        }

                        self.saveFile = function() {
                            $scope.$repo.writeFile(self.cur_path, self.cur_code)
                                .then(function(file) {
                                    console.log("file saved", file);
                                    self.cur_code._id = file._id;
                                    self.refresh();
                                });
                        }

                        self.makeDir = function(dir_name) {
                            $scope.$repo.makeDir(self.cur_path, dir_name)
                                .then(function(dir) {
                                    console.log("directory saved", dir);
                                    self.refresh();
                                })
                        }

                        self.navigateTo = function(dir_name) {
                            if (dir_name === '..') {
                                self.cur_path = '/' + self.cur_path_tokens.slice(0, -1).join('/');
                            } else if (dir_name[0] === '/') {
                                self.cur_path = dir_name;
                            } else if (self.cur_path === '/') {
                                self.cur_path = self.cur_path + dir_name;
                            } else {
                                self.cur_path = self.cur_path + '/' + dir_name;
                            }
                            console.log(self.cur_path)
                            self.clearAll();
                            self.refresh();
                        }

                        self.deleteSelection = function() {
                            var ids = Object.keys(self.cur_selection)
                                .map(function(key) {
                                    return self.cur_dir.children[key]._id;
                                })
                            console.log(ids);

                            $scope.$repo.delete(self.cur_path, ids)
                                .then(function() {
                                    console.log(ids.length + ' items deleted');
                                    self.refresh();
                                })
                        }

                        self.clearAll = function() {
                            self.cur_code = {
                                name: '',
                                content: ''
                            };
                            self.cur_selection = {};
                        }
                        self.clearAll();

                        self.selectCode = function(code) {
                            self.cur_code._id = code._id;
                            self.cur_code.name = code.name;
                            self.cur_code.content = code.content;
                        }

                        self.onKeyDown = function(event) {
                            if (event.ctrlKey && event.which === 83) {
                                /* Pressed Ctrl + S */
                                event.preventDefault();
                                self.saveFile();
                            }
                        };

                        $scope.$watch(function() { return self.cur_selection },
                            function(selection) {
                                self.hasSelection = Object.values(selection).reduce(function(acc, item) { return acc || !!item }, false);
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
                    controller: ['$scope', function($scope) {
                        var self = this;

                        // self.subscribe = function(topic){
                        // 	socket.send({ action: "subscribe", topic: topic });
                        // }
                    }],
                    controllerAs: '$view',
                    templateUrl: 'views/debug.html'
                })

            $urlRouterProvider.otherwise('/');
        }
    ])
    .directive('stickyFooter', function($window) {
        return {
            restrict: 'A',
            link: function(scope, element, attrs, ctrl) {
                var marker = $('<div></div>');
                marker.css({ background: 'transparent' });
                marker.insertBefore(element);
                var stick = function() {
                    var y = window.innerHeight - element.outerHeight() - marker.offset().top;
                    if (y > 0) { marker.height(y); } else { marker.height(0); }
                }
                scope.$watch(function() { return marker.offset().top; }, function(newVal, oldVal) { stick(); });
                scope.$watch(function() { return element.height(); }, function(newval) { stick(); });
                angular.element($window).bind('resize', function() { stick(); });
            }
        }
    });