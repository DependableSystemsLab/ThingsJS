var things = require('../things.js');
var http = require('http');
var request = require('request');
var rp = require('request-promise');
var SchedulerHelper = require('./SchedulerHelper.js');
var fs = require('fs');
var EventEmitter = require('events').EventEmitter;

var PROGRAM_MONITOR_NAMESPACE = 'program-monitor';
var ENGINE_REGISTRY_NAMESPACE = 'engine-registry';
var THRESHOLD_TIME = 2000;
var WINDOW_SIZE = 10;

function SchedulerService() {
    var self = this;
    EventEmitter.apply(this);
    this.componentsLog = {};
    this.pubsub = new things.Pubsub();
    this.helper = new SchedulerHelper();
	this.cur_path = '/';
	this.cur_path_tokens = [];
	this.cur_dir = {};
	this.cur_file = undefined;

    function ready(obj) {
        return new Promise(function(resolve) {
            obj.on('ready', function() {
                resolve();
            });
        });
    }

    Promise.all([ready(self.pubsub), ready(self.helper)]).then(function() {
        self.emit('ready');

        self.pubsub.publish(PROGRAM_MONITOR_NAMESPACE + '/bcast', { ctrl: 'report' });
        self.pubsub.subscribe(PROGRAM_MONITOR_NAMESPACE, function(data) {
            var codeName = data.code_name;
            var instanceId = data.instance_id;

            self.pubsub.subscribe(codeName + '/' + instanceId + '/resource', function(res) {
                var key = codeName + '/' + instanceId;
                if (!self.componentsLog[key]) {
                    self.componentsLog[key] = [res];
                } else {
                    if (self.componentsLog[key].length === WINDOW_SIZE) {
                        self.componentsLog[key].shift();
                    }
                    self.componentsLog[key].push(res);
                }
            });
        });

    });
}
SchedulerService.prototype = new EventEmitter();
SchedulerService.prototype.constructor = SchedulerService;

SchedulerService.prototype.run = function() {
    var self = this;
    this.runSchedule = setInterval(function() {
        self.schedule();
    }, 60 * 1000);
}

SchedulerService.prototype.stop = function() {
    var self = this;
    clearInterval(self.runSchedule);
}

SchedulerService.prototype.schedule = function() {
    var devices = this._currentDevices();
    var comps = this._currentComponents();

    return new Promise(function(resolve) {
        Promise.all([devices, comps], function(data) {
            var deviceStats = data[0];
            var compStats = data[1];

            /* TODO INVOKE SCHEDULER ALGORITHM HERE */
            var schedule;
            resolve(schedule);
        });
    });
}

SchedulerService.prototype.apply = function(schedule) {
    this.appendToHistory(schedule);
}

// appendToHistory(schedule); // Saves new schedule in FS
// 					// 1- /schedule/current (JSON of current sched)
// 					// 2- /schedule/history/N (JSON of cur. sched.)
// 					// to find out N, fetch the latest schedule from
// 					// FS and increment by one

// Topic: scheduleUpdate

// 	clearHistory(); // clears all the schedule 
// 			    // delete /schedule/current  
// 			    // delete /schedule/history/*




SchedulerService.prototype.appendToHistory = function(schedule) {
    var self = this;
    var number = 0;
    var currentSchedule = undefined;

    //makeDir(self.cur_path,"schedule");
    navigateTo(self,"schedule");

    checkDirExist(self.cur_path,"history").then(function(exist){
    	if(!exist){
    		console.log("checking history FOLDER");
    		makeDir(self.cur_path, "history");
            console.log("##### create history schedule folder");
    	}
    	 checkDirExist(self.cur_path,"current").then(function(exist){
    	if(!exist){
    		console.log("checking current FOLDER");
    		makeDir(self.cur_path, "current");
    		writeFile(joinPath(self.cur_path,"current"),schedule,"current.json");
            console.log("##### create current schedule folder");
            return;
    	}
    	else{
	    	getFile(joinPath(self.cur_path,"current"),"current.json").then(function(data){
	    	currentSchedule = data.content;
	    	console.log("############currentSchedule" + currentSchedule);
	    	number += 1;
	    	writeFile(joinPath(self.cur_path,"history"), currentSchedule, number + ".json");
	    	writeFile(joinPath(self.cur_path,"current"), schedule, "current.json");

    }).catch(function(err){
    	console.log("##############fail to get current file" + err + "creating a new one");
    	writeFile(joinPath(self.cur_path,"current"), schedule, "current.json");
    });
    	}
    });
});

}

SchedulerService.prototype.clearRecords = function() {
	var self = this;

	navigateTo(self,"schedule");	
    
    checkDirExist(self.cur_path,"current").then(function(exist){
    	if(exist){
    deleteTarget(self.cur_path,"current").then(function(succees){
    	makeDir(self.cur_path, "current");
    })
    console.log("##### delete current schedule folder");
		}
	});


 	checkDirExist(self.cur_path,"history").then(function(exist){
    	if(exist){
    deleteTarget(self.cur_path,"history").then(function(succees){
    	makeDir(self.cur_path, "history");
    })
    console.log("##### delete history schedule folder");
		}
	});

}



// SchedulerService.prototype.clearHistory = function(deleteNumber) {
//     var number;
//     var i;
//     var self = this;
// 	navigateTo(self,"schedule");
// 	navigateTo(self,"history")	;
//     if (checkDirExist("/schedule/history")) {
//         for (i = number; number - i >= deleteNumber; number--) {
//             deleteTarget(self.cur_path, i + ".json");
//         }
//         console.log("##### delete" + deleteNumber + "from history folder");
//     }
// }


//api-call to file system 

function joinPath(p1, p2) {
    if (p1[p1.length - 1] === '/') p1 = p1.substring(0, p1.length - 1);
    if (p2[0] === '/') p2 = p2.substring(1);
    console.log("joined path" + p1 + '/' + p2);
    return p1 + '/' + p2;
}



function getFile(cur_path, fileName) {

	var file_data = undefined;

	var options = {
    method: 'GET',
    uri: joinPath('http://localhost:3000/file-system',cur_path),
    json: true 
	};

	return rp(options)
	    .then(function (parsedBody) {
	        console.log("GET FILE succees" + parsedBody.children[fileName].content);
	        file_data = parsedBody.children[fileName];
	        console.log("file_data" + file_data);
	       	return file_data;
	    })
	    .catch(function (err) {
	         console.log("GET FILE error" + err);
	    });
}


function makeDir(cur_path,dir_name){
	var postData = {
        type: 'directory',
        name: dir_name
    };

	var options = {
    method: 'POST',
    uri: joinPath('http://localhost:3000/file-system',cur_path),
    body: postData,
    json: true // Automatically stringifies the body to JSON
	};

	return rp(options)
	    .then(function (parsedBody) {
	        console.log("makeDir succees" + parsedBody);
	    })
	    .catch(function (err) {
	         console.log("makeDir error" + err);
	    });
}


function writeFile(cur_path, file_data,file_name) {
	
    var postData = {
        'name': file_name,
        'content': JSON.stringify(file_data),
        'type': 'file'
    };

    // FIND IF EXISTS
   // POSTDATA['_ID'] = SDFSDF.
   getFile(cur_path,file_name).then(function(data){
   	postData['_id'] = data._id;
   	console.log('file exist with id '+ postData['_id']);

	return rp(options)
	    .then(function (parsedBody) {
	        console.log("writeNewFile succees: " + file_name);
	        // console.log("writefile detail" + file_name + parsedBody.body.toString('utf-8'));
	    })
	    .catch(function (err) {
	         console.log("writeNewFile error " + file_name + err);
	    });

   }).catch(function(err){
   	console.log("a new file" + file_name);

	return rp(options)
	    .then(function (parsedBody) {
	        console.log("writeNewFile succees: " + file_name);
	        // console.log("writefile detail" + file_name + parsedBody.body.toString('utf-8'));
	    })
	    .catch(function (err) {
	         console.log("writeNewFile error " + file_name + err);
	    });
   });

	var options = {
    method: 'POST',
    uri: joinPath('http://localhost:3000/file-system',cur_path),
    body: postData,
    json: true 
	};
}
   

function deleteTarget(cur_path, target) {

    var id;
    return getFile(cur_path, target).then(function(data) {
        id = data._id;
        console.log("id to be deleted" + id);

        var options = {
            method: 'DELETE',
            uri: joinPath('http://localhost:3000/file-system', cur_path) + '?ids=' + id
        };

        return rp(options)
            .then(function(parsedBody) {
                console.log("DELETE target succees " + target + parsedBody);
                return true;
            })
            .catch(function(err) {
                console.log(" DELETE target error" + target + err);
                return false;
            });

    }).catch(function(err){
    	console.log("getfile error:" + err)
    });
}

function navigateTo(schedulerservice,dir_name) {
    if (dir_name === '..') {
        schedulerservice.cur_path = '/' + schedulerservice.cur_path_tokens.slice(0, -1).join('/');
    } else if (dir_name[0] === '/') {
        schedulerservice.cur_path = dir_name;
    } else if (schedulerservice.cur_path === '/') {
        schedulerservice.cur_path = schedulerservice.cur_path + dir_name;
    } else {
        schedulerservice.cur_path = schedulerservice.cur_path + '/' + dir_name;
    }
    console.log("current path"+ schedulerservice.cur_path)

}



function checkDirExist(cur_path, dirname) {

	var options = {
    method: 'GET',
    uri: joinPath(joinPath('http://localhost:3000/file-system',cur_path),dirname),
    resolveWithFullResponse: true    
	};

	return rp(options)
	    .then(function (response) {
	        console.log("GET Dir status" + dirname + response.statusCode);
	        console.log("GET Dir body" + dirname + response.body.toString('utf-8'));
	        console.log("get dir" + Object.keys(JSON.parse(response.body.toString('utf-8'))));
	        var responseBodyKey = Object.keys(JSON.parse(response.body.toString('utf-8')));
	        console.log("EXIST"+  ( responseBodyKey.includes("error")) );
	       
	       	if(response.statusCode !== 200||(responseBodyKey.includes("error"))){
	       		return false;
	       	}else{
	       		return true;
	       	}
	    })
	    .catch(function (err) {
	         console.log("GET Dir error" + err);
	         return false;
	    });
}

SchedulerService.prototype._currentComponents = function() {
    var self = this;
    var components = {};
    var currDate = Date.now();

    for (instance in self.componentsLog) {
        var comp = self.componentsLog[instance];
        var lastReading = comp[comp.length - 1];
        if (Math.abs(lastReading.timestamp - currDate) > THRESHOLD_TIME) {
            return;
        }
        components[instance] = {};
        var numReports = 0;
        // go through the history of reports for each component
        comp.forEach(function(report, index) {
            var memUsage = report.memory;
            for (field in memUsage) {
                if (index === 0) {
                    components[instance][field] = memUsage[field];
                } else {
                    components[instance][field] += memUsage[field];
                }
            }
            numReports++;
        });
        // average out the readings 
        for (stat in components[instance]) {
            var data = components[instance][stat];
            components[instance][stat] = data / numReports;
        }
    }
    return components;
}


// SchedulerService.prototype._currentComponents = function(){
// 	var self = this;
// 	return new Promise(function(resolve){
// 		var instances = [];

// 		self.pubsub.publish(PROGRAM_MONITOR_NAMESPACE + '/bcast', { ctrl: 'report' });
// 		self.pubsub.subscribe(PROGRAM_MONITOR_NAMESPACE, function(data){
// 			instances.push(data);
// 		});
// 		setTimeout(function(){
// 			var instanceStats = {};
// 			self.pubsub.unsubscribe(PROGRAM_MONITOR_NAMESPACE);

// 			instances.forEach(function(instance){
// 				var name = instance.code_name;
// 				var id = instance.instance_id;

// 				self.pubsub.subscribe(name+'/'id+'/resource', function(data){
// 					instanceStats[id] = { code_name: name, resources: data };
// 				});
// 			});

// 			setTimeout(function(){
// 				instances.forEach(function(instance){
// 					self.pubsub.unsubscribe(instance.code_name+'/'+instance.instance_id+'/resource');
// 				});
// 				resolve(instanceStats);
// 			}, 2000);

// 		}, 2000);
// 	});
// }

SchedulerService.prototype._currentDevices = function() {
    var self = this;
    return new Promise(function(resolve) {
        var devices = [];

        self.pubsub.publish(ENGINE_REGISTRY_NAMESPACE + '/bcast', { ctrl: 'report' });
        self.pubsub.subscribe(ENGINE_REGISTRY_NAMESPACE, function(data) {
            devices.push(data);
        });
        setTimeout(function() {
            var deviceStats = {};
            self.pubsub.unsubscribe(ENGINE_REGISTRY_NAMESPACE);

            devices.forEach(function(device) {
                self.pubsub.subscribe(device.id + '/resource', function(res) {
                    self.pubsub.unsubscribe(device.id);
                    deviceStats[device.id] = res;

                    self.pubsub.unsubscribe(device.id + '/resource');
                });
            });

            setTimeout(function() {
                resolve(deviceStats);
            }, 2000);
        }, 2000);
    });
}

module.exports = SchedulerService;