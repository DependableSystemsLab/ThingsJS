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
                        self.app_proto_path = '/application/prototype';
                        self.app_instances_path = '/application/instances';
                        self.app_dir = {};
                        self.app_proto_dir = {};
                        self.app_proto_token = [];
                        self.app_instances_dir = {};
                        self.app_instances_token = [];
                        self.app_content = {};
                        self.instances_status = {};

                        function randKey(length, charset) {
                            var text = "";
                            if (!length) length = 8;
                            if (!charset) charset = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
                            for (var i = 0; i < length; i++) {
                                text += charset.charAt(Math.floor(Math.random() * charset.length));
                            }
                            return text;
                        }

                        function joinPath(p1, p2) {
                            if (p1[p1.length - 1] === '/') p1 = p1.substring(0, p1.length - 1);
                            if (p2[0] === '/') p2 = p2.substring(1);
                            return p1 + '/' + p2;
                        }


                        function ApplicationPrototype(name, components) {
                            this.name = name;
                            this.components = components;
                        }

                        function remove(array, element) {
                            array.splice(array.indexOf(element), 1);
                        }

                        self.refresh = function() {
                            $scope.$repo.get(self.cur_path)
                                .then(function(fsObject) {
                                    console.log("currpath");
                                    console.log(fsObject);
                                    self.cur_dir = fsObject;
                                    self.cur_path_tokens = self.cur_path.split('/').slice(1);
                                    $scope.$apply();
                                });
                            // $scope.$repo.get(self.app_path)
                            //     .then(function(fsObject) {
                            //         console.log("apppath");
                            //         console.log(fsObject);
                            //         self.app_dir = fsObject;
                            //         self.app_path_tokens = self.app_path.split('/').slice(1);
                            //         $scope.$apply();
                            //     });
                            $scope.$repo.get(self.app_path + "/prototype")
                                .then(function(fsObject) {
                                    console.log("appprotopath");
                                    console.log(fsObject);
                                    self.app_proto_dir = fsObject;
                                    self.app_proto_token = self.app_proto_path.split('/').slice(1);
                                    $scope.$apply();
                                });
                            $scope.$repo.get(self.app_path + "/instances")
                                .then(function(fsObject) {
                                    console.log("appinstancespath");
                                    console.log(fsObject);
                                    self.app_instances_dir = fsObject;
                                    self.app_instances_token = self.app_instances_path.split('/').slice(1);
                                    Object.keys(self.app_instances_dir.children).forEach(function(filename) {
                                        self.instances_status[filename] = JSON.parse(self.app_instances_dir.children[filename].content)['status'] || 'UNKNOWN';
                                    });

                                    $scope.$apply();
                                });
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

                        self.generateAppPrototype = function(name) {
                            var app_content = new ApplicationPrototype(name, self.app_content);
                            var content = {};
                            console.log("********content" + JSON.stringify(content));
                            var app_proto = {
                                'name': name,
                                'content': JSON.stringify(app_content),
                                'type': 'file'
                            };
                            self.saveFile("prototype", app_proto);
                            self.code_selection = [];
                            self.app_content = {};
                        }

                        //TO BE DONE IN THE FUTURE 
                        // self.appInstanceChange = function(file,num_instances){

                        // }


                        self.removeInstance = function(instance, filename) {
                              var id = []; 
                              if (JSON.parse(self.app_instances_dir.children[filename].content)['status'] === "STOPPED") {
                                  id.push(self.app_instances_dir.children[filename]._id);
                                  console.log("INSTANCE " + id);

                                  $scope.$repo.delete(self.app_instances_path, id)
                                      .then(function() {
                                          console.log(filename + id + "deleted")
                                          self.refresh();
                                      });
                              } else {
                                var result = confirm("THE APPLICATION" + filename + " IS STILL RUNNING! \n STILL WANT TO REMOVE?");
                                if (result){ 
                                  id.push(self.app_instances_dir.children[filename]._id);
                                  console.log("INSTANCE " + id);

                                  $scope.$repo.delete(self.app_instances_path, id)
                                      .then(function() {
                                          console.log(filename + id + "deleted")
                                          self.refresh();
                                      });
                                }

                              }
                        }

                        self.removePrototype = function(prototype, filename) {
                            var id = [];
                            id.push(self.app_proto_dir.children[filename]._id);
                            console.log("PROTOTYPE " + id);

                            $scope.$repo.delete(self.app_proto_path, id)
                                .then(function() {
                                    console.log(filename + id + "deleted")
                                    self.refresh();
                                });
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
                        $scope.$repo.makeDir(joinPath(self.cur_path, "application"), "prototype")
                            .then(function(dir) {
                                console.log("directory saved", dir);
                                self.refresh();
                            });
                        $scope.$repo.makeDir(joinPath(self.cur_path, "application"), "instances")
                            .then(function(dir) {
                                console.log("directory saved", dir);
                                self.refresh();
                            });
                        self.refresh();


                        self.saveFile = function(dir, app) {
                            $scope.$repo.writeFile(self.app_path + "/" + dir, app)
                                .then(function(file) {
                                    console.log("file saved", file);
                                    self.cur_selection._id = file._id;
                                    self.refresh();
                                });
                        }

                        self.saveUpdateInstance = function(app_name, appdata, status) {
                            var application_id = appdata["application_id"];
                            var appName = app_name + "/" + application_id;
                            console.log("APPLICATION_ID" + application_id)
                            appdata['status'] = status;

                            var updated_app = {
                                'name': appName,
                                'content': JSON.stringify(appdata),
                                'type': 'file'
                            };
                            if (self.app_instances_dir.files.includes(appName)) {
                                updated_app['_id'] = self.app_instances_dir.children[appName];
                            }
                            self.saveFile("instances", updated_app);
                        };

                        //send runapplication detail 
                        self.runApplication = function(app_data, app_name) {
                            var runapp_data;
                            try {
                                runapp_data = JSON.parse(app_data);
                            } catch (e) {
                                runapp_data = app_data;
                            }
                            console.log("runapp_data" + runapp_data);
                            var request_token = randKey(16);
                            runapp_data['request_token'] = request_token;
                            var updateDetail = {};
                            console.log("pubsub publish runApplication" + runapp_data);
                            alert("pubsub publish runApplication" + JSON.stringify(runapp_data));
                            // if (Object.keys(runapp_data["detail_content"]).length === 0) {
                            dashboard.pubsub.publish("runApplication", runapp_data);
                            var APPLICATION_DETAIL = "applicationDetails/" + request_token + "/run";
                            dashboard.pubsub.subscribe(APPLICATION_DETAIL, function(topic, appdetail) {
                                console.log("appdetail" + JSON.stringify(appdetail));
                                console.log("received application detail" + JSON.stringify(appdetail) + "\n");
                                console.log("+++++jump to " + app_name + "subscribe");

                                self.saveUpdateInstance(app_name, appdetail, 'RUNNING');

                                // var application_id = appdetail["application_id"];
                                // appdetail['status'] = 'RUNNING';
                                // console.log("APPLICATION_ID" + application_id);
                                // var updated_app = {
                                //     'name': app_name + "/" + application_id,
                                //     'content': JSON.stringify(appdetail),
                                //     'type': 'file'
                                // };

                                // self.saveFile("instances",updated_app);
                            });
                        };

                        self.stopApplication = function(app_detail) {
                            var STOP_APPLICATION = "stopApplication";
                            var request_token = randKey(16);
                            var application_id = JSON.parse(app_detail)["application_id"];
                            var APPLICATION_DETAIL_STOP = "applicationDetails/" + request_token + "/stop";
                            console.log("STOPPED APPLICATION ID" + application_id);
                            dashboard.pubsub.publish(STOP_APPLICATION, { 'application_id': application_id, 'request_token': request_token });
                            dashboard.pubsub.subscribe(APPLICATION_DETAIL_STOP, function(topic, data) {
                                if (data["status"]) {
                                    alert("stopping application successfully" + data["application_id"]);
                                    // self.instances_status[JSON.parse(app_detail)['name']+"/"+application_id] = 'STOPPED';
                                    self.saveUpdateInstance(JSON.parse(app_detail)['name'], JSON.parse(app_detail), 'STOPPED');
                                } else {
                                    alert("stopping application failed" + data["application_id"]);
                                    // self.instances_status[JSON.parse(app_detail)['name']+"/"+application_id] = 'STOP FAILED';
                                    self.saveUpdateInstance(JSON.parse(app_detail)['name'], JSON.parse(app_detail), 'STOP FAILED');
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
                        $scope.$operationArray = [];
                        $scope.$schedules = {};
                        $scope.$operation = {};


                        var SCHEDULE_UPDATE_TOPIC = 'scheduleUpdate';


                        self.cur_path = "/"; // tentative path
                        self.schedule_path_tokens = [];
                        self.schedules = [];
                        self.schedule_path = "/schedule"
                        self.schedule_dir = {};
                        self.cur_schedule_selection = {};
                        $scope.operationArray = [];
                        self.scheduleArray = [];
                        self.operationRecord = [];


                        self.refresh = function() {
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
                            var schedule_name = scheduleName;
                            self.refresh();
                            return $scope.$repo.get(joinPath(self.schedule_path, dir_name))
                                .then(function(dir) {
                                    console.log("dir get", dir);
                                    if (typeof dir.children[schedule_name] !== 'undefined' && dir.children[schedule_name] !== null) {
                                        self.cur_schedule_selection._id = dir.children[schedule_name]["_id"];
                                        self.cur_schedule_selection.name = dir.children[schedule_name].name;
                                        self.cur_schedule_selection.content = dir.children[schedule_name].content;
                                        console.log("schedule content" + self.cur_schedule_selection.content);
                                        console.log("233" + self.cur_schedule_selection.content);
                                        return new Schedule(scheduleName, JSON.parse(self.cur_schedule_selection.content));
                                    } else {
                                        throw error("file not exist");
                                    }
                                });
                        }

                        self.iterateOperations = function(dir_name) {
                            var files = {};
                            self.refresh();
                            return $scope.$repo.get(joinPath(self.schedule_path, dir_name)).
                            then(function(dir) {
                                console.log("dir get", dir);
                                // var files = dir.children;
                                Object.keys(dir.children).forEach(function(schedule_name) {
                                    console.log("233ITERATION" + dir.children[schedule_name].content);
                                    var index = dir.children[schedule_name].name;
                                    console.log("IIINNNDDEEXX" + index);
                                    files[index] = new Operation(JSON.parse(dir.children[schedule_name].content));
                                });
                                return files;
                            }).catch(function(err) {
                                console.log("SCHEDULE NOT EXIST 333");
                            });
                        }

                        self.iterateDir = function(dir_name, type) {
                            var files = [];
                            self.refresh();
                            return $scope.$repo.get(joinPath(self.schedule_path, dir_name)).
                            then(function(dir) {
                                console.log("dir get", dir);
                                // var files = dir.children;
                                Object.keys(dir.children).forEach(function(schedule_name) {
                                    console.log("233ITERATION" + dir.children[schedule_name].content);
                                    if (type === "schedule") {
                                        files.push(new Schedule(schedule_name, JSON.parse(dir.children[schedule_name].content)));
                                    } else if (type === "operation") {
                                        files.push(new Operation(JSON.parse(dir.children[schedule_name].content)));
                                    }

                                });
                                return files;
                            }).catch(function(err) {
                                console.log("SCHEDULE NOT EXIST 333");
                            });
                        }
                        // function Device(device_id, components_id, components_name) {
                        //     this.device_id = device_id;
                        //     this.components_id = components_id;
                        //     this.components_name = components_name;
                        // }

                        // function Schedule(id, data) {
                        //     this.id = id;
                        //     console.log("data to be parsed" + data);
                        //     this.devices = {};
                        //     var that = this;
                        //     this.timestamp = new Date(data["timestamp"]);
                        //     delete data["timestamp"];
                        //     console.log("~~~");
                        //     console.log("\n\n" + JSON.stringify(data))
                        //     Object.keys(data).forEach(function(element) {
                        //         var id_array = [];
                        //         var name_array = [];
                        //         data[element].forEach(function(ele) {
                        //             id_array.push(ele.split("*")[1]);
                        //             name_array.push(ele.split("*")[0]);
                        //         })
                        //         that.devices[element] = new Device(element, id_array, name_array);
                        //     });
                        //     console.log("devices" + JSON.stringify(this.devices));
                        //     console.log("timestamp" + this.timestamp);
                        //     }

                        var sample_schedule = {
                            'timestamp': 2049172904714,
                            'mapping': {
                                'pi1': {
                                    'available_memory': 300,
                                    'processes': {
                                        'factorial.js*1': {
                                            'memory_usage': 30,
                                            'app_token': 'ABCFKEJSFKEJF'
                                        },
                                        'test.js*1': {
                                            'memory_usage': 30,
                                            'app_token': 'BDKSJFKLEHF'
                                        }
                                    }
                                }
                            }
                        }


                        // Schedule1
                        //   this.timestamp
                        //   this.mapping 

                        function Device(device_id, components_id, components_name, memory, memory_usages, app_tokens) {
                            this.device_id = device_id;
                            this.components_id = components_id;
                            this.components_name = components_name;
                            this.memory_usages = memory_usages;
                            this.app_tokens = app_tokens;
                            this.available_memory = memory;
                            this.operation_status = [];
                        }



                        function Schedule(id, data) {
                            this.id = id;
                            console.log("data to be parsed" + data);
                            this.devices = {};
                            var that = this;
                            this.timestamp = data["timestamp"];
                            delete data["timestamp"];
                            var mapping = data['mapping'];
                            console.log("\n\n" + JSON.stringify(data))
                            Object.keys(mapping).forEach(function(device) {
                                var id_array = [];
                                var name_array = [];
                                var useage_array = [];
                                var token_array = [];
                                Object.keys(mapping[device]['processes']).forEach(function(component) {
                                    id_array.push(component.split("*")[1]);
                                    name_array.push(component.split("*")[0]);
                                    useage_array.push(mapping[device]['processes'][component]['memory_usage']);
                                    token_array.push(mapping[device]['processes'][component]['app_token'])
                                });
                                that.devices[device] = new Device(device, id_array, name_array, mapping[device]['available_memory'], useage_array, token_array);
                            });
                            // console.log("devices" + JSON.stringify(this.devices));
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
                                    id_array.push(ele.split("*")[1]);
                                    name_array.push(ele.split("*")[0]);
                                })
                                that.devices[element] = new Device(element, id_array, name_array);
                            });
                        }

                        function Operation(data) {
                            //how to handle empty data;
                            if (typeof data !== 'undefined' && data !== null) {
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
                                    that.migrate_content[components_detail] = { "from": from_device, "to": to_device }
                                });
                            } else {
                                console.log("OPEATION DATA IS EMPTY");
                                return {};
                            }
                        }

                        self.fetchSchedule = function() {
                            console.log("starting refresh");
                            // self.iterateOperations("operations").then(function(data) {
                            //     // data.forEach(function(operation) {
                            //     console.log("BIBUBIBUBIBUBIBU" + JSON.stringify(data));
                            //     $scope.$operation = data;
                            //     // });
                            //     console.log("$OPERATIONARRAY" + JSON.stringify($scope.$operation));
                            // }).catch(function(err) {
                            //     console.log("fail to fetch operations" + err);
                            // });

                            self.iterateDir("history", "schedule").then(function(data) {
                                data.forEach(function(schedule) {
                                    $scope.$schedules[schedule["id"]] = schedule;
                                });
                                $scope.$scheduleArray = Object.keys($scope.$schedules).map(function(key) { 
                                    return $scope.$schedules[key]; });
                                self.refresh();

                                self.getSchedule("current", "current").then(function(data) {
                                    $scope.$schedules["current"] = data;
                                    $scope.$scheduleArray = Object.keys($scope.$schedules).map(function(key) { 
                                        return $scope.$schedules[key]; 
                                    });
                                    self.refresh();

                                }).catch(function(err) {
                                    console.log("SCHEDULE NOT EXIST")
                                });

                                self.iterateOperations("operations").then(function(data) {
                                    // data.forEach(function(operation) {
                                    console.log("BIBUBIBUBIBUBIBU" + JSON.stringify(data));
                                    $scope.$operation = data;

                                    // });
                                    console.log("$OPERATIONARRAY" + JSON.stringify($scope.$operation));
                                             
                                             console.log("start to fill operation record");
                                Object.keys($scope.$schedules).forEach(function(schedule_name,index1){
                                      console.log("start to loop1;")
                                    Object.keys($scope.$schedules[schedule_name].devices).forEach(function(device){
                                          console.log("start to loop2;")
                                         $scope.$schedules[schedule_name].devices[device].components_id.forEach(function(component_id,index2){
                                            console.log("start to loop3;")
                                            if(self.startRun(index1,component_id,$scope.$schedules[schedule_name].devices[device].components_name[index2],$scope.$operation)){
                                                    $scope.$scheduleArray[index1].devices[device].operation_status[index2] = "run";
                                            }
                                            else if(self.stopRun(index1,component_id,$scope.$schedules[schedule_name].devices[device].components_name[index2],$scope.$operation)){
                                                    $scope.$scheduleArray[index1].devices[device].operation_status[index2] = "stop";
                                            }
                                            else if(self.migrate(index1,component_id,$scope.$schedules[schedule_name].devices[device].components_name[index2],$scope.$operation) === "migrateTo"){
                                                    $scope.$scheduleArray[index1].devices[device].operation_status[index2] = "migrateTo";
                                            }
                                        });
                                    });

                                })
                                console.log("NEW SCHEDULE" + JSON.stringify($scope.$scheduleArray));
                            }).catch(function(err) {
                                    console.log("fail to fetch operations" + err);
                                });
                            }).catch(function(err) {
                                console.log("biubiubiuSCHEDULE NOT EXIST");
                            });
                        }

                        self.fetchSchedule();
                        setTimeout(function() {
                            self.fetchSchedule();
                        }, 5000);



                        // $scope.$scheduleArray = Object.keys($scope.$schedules).map(function(key) { return $scope.$schedules[key]; });
                        // console.log("$scheduleArray" + $scope.$scheduleArray);

                        $scope.sortType = 'id'; // set the default sort type
                        $scope.sortReverse = false; // set the default sort order
                        $scope.search = ''; // set the default search/filter term  
                        // dynamic view 

                        // var sample_change = {
                        //     "run": { "node_00": ["factorial.js*2"], "node_01": ["test.js*4"] },
                        //     "stop": { "node_01": ["test.js*1","factorial.js*888","test.js*1","factorial.js*888"]},
                        //     "continueRun": { "node_00": ["test.js*1"]},
                        //     "migrate": { "factorial.js*4": { "from": "node_00", "to": "node_01" } }
                        // };
                        // var sample_change2 = {
                        //     "run": { "node_00": ["test.js*1"], "node_02": ["factorial.js*4"] },
                        //     "stop": { "node_01": ["factorial.js*100"]},
                        //     "continueRun": { "node_00": ["test.js*1"]},
                        //     "migrate": { "factorial.js*4": { "from": "node_00", "to": "node_01" } }
                        // };
                        // var static_schedule_1 = {"node_01": ["test.js*1","factorial.js*888","test.js*1","factorial.js*888"],"node_02": ["test.js*1"], "timestamp": 1532131837843 };
                        // var static_schedule_2 = {"node_00":["factorial.js*2","fractorial.js*4"], "node_01": ["test.js*1"],"timestamp": 1532131837833 };
                        // var static_schedule_3 = {"node_03":["factorial.js*444"], "node_01": ["test.js*1","fractorial.js*4"],"timestamp": 1532141837833 };
                        self.refresh();
                        $scope.$scheduleArray = Object.keys($scope.$schedules).map(function(key) { 
                            return $scope.$schedules[key]; });

                        console.log("$scheduleArray" + $scope.$scheduleArray);

                        console.log("operationarray outside ~~~" + $scope.operationArray + $scope.changeVersion);

        

                        self.startRun = function(index, component_id, name, operationArray) {
                            if (index === 0) {
                                // console.log("no operation");
                                return false
                            }
                            index -= 1;
                            console.log("startRun index:" + index);
                            var result = false;
                            console.log(index + "array" + JSON.stringify(operationArray));
                            if (typeof operationArray[index] === 'undefined' || operationArray[index] === null) {
                                console.log("jump to undefined");
                                return result;
                            } else if (Object.keys(operationArray[index]).length === 0) {
                                console.log("jump to undefined");
                                return result;
                            } else if (Object.keys(operationArray[index].run_schedule).length === 0) {
                                console.log("run_schedule empty");
                                return result;
                            }
                            var run_devices = operationArray[index].run_schedule.devices;
                            console.log("BIUBIUBIUT" + JSON.stringify(run_devices));
                            Object.keys(run_devices).forEach(function(device_id) {
     
                                var i = 0;
                                for(i ; i< run_devices[device_id].components_id.length; i++){
                                    if(run_devices[device_id].components_id[i] === component_id && 
                                        run_devices[device_id].components_name[i] === name){
                                        result = true;
                                    }
                                }
                            });
                            return result;
                        }


                        self.stopRun = function(index, component_id, name, operationArray) {
                            if (index === 0) {
                                // console.log("no operation");
                                return false
                            }
                            index -= 1;
                            console.log("STOPRun index:" + index);
                            var result = false;
                            if (typeof operationArray[index] === 'undefined' || operationArray[index] === null) {
                                return result;
                            } else if (Object.keys(operationArray[index]).length === 0) {
                                return result;
                            } else if (Object.keys(operationArray[index].stop_schedule).length === 0) {
                                return result;
                            }
                            var stop_devices = operationArray[index].stop_schedule.devices;
                            console.log("BIUBIUBIUT" + JSON.stringify(stop_devices));
                            
                            // Object.keys(stop_devices).forEach(function(device_id) {
                            //     if (stop_devices[device_id].components_id.includes(component_id)) {
                            //         console.log("components" + component_id + "start running");
                            //         result = true;
                            //     }
                            // });

                            Object.keys(stop_devices).forEach(function(device_id) {
                                var i = 0;
                                for(i ; i< stop_devices[device_id].components_id.length; i++){
                                    if(stop_devices[device_id].components_id[i] === component_id && 
                                        stop_devices[device_id].components_name[i] === name){
                                        result = true;
                                    }
                                }
                            });
                            return result;
                        }

                        self.migrate = function(index, component_id, name, operationArray) {
                            if (index === 0) {
                                // console.log("no operation");
                                return ""
                            }
                            index -= 1;
                            console.log("startRun index:" + index);
                            var result = "";
                            if (typeof operationArray[index] === 'undefined' || operationArray[index] === null) {
                                return result;
                            } else if (Object.keys(operationArray[index]).length === 0) {
                                return result;
                            } else if (Object.keys(operationArray[index].migrate_content).length === 0) {
                                return result;
                            }
                            var migrate_content = operationArray[index].migrate_content;
                            console.log("BIUBIUBIUT" + JSON.stringify(migrate_content));
                            // Object.keys(migrate_content).forEach(function(code_instance) {
                            //     if (code_instance.split("*")[1] === component_id) {
                            //         console.log("components" + component_id + "migrate");
                            //         result = "migrateTo";
                            //     }
                            // });
                            Object.keys(migrate_content).forEach(function(code_instance) {
                                if(code_instance.split("*")[1] === component_id && 
                                    code_instance.split("*")[0] === name){
                                     result = "migrateTo";
                                }
                            });

                            return result;
                        }


                        $scope.$watch(function() { return self.cur_schedule_selection },
                            function(selection) {
                                self.hasSelection = Object.values(selection).reduce(function(acc, item) { return acc || !!item }, false);
                                console.log(selection);
                            }, true);

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
                  Object.keys($scope.schedule).length      //  socket.send({ action: "subscribe", topic: topic });
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