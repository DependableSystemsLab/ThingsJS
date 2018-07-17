var devicelist = 
[{ id: 'pi0', memory: 500}, { id: 'pi1', memory: 300 }, { id: 'pi2', memory: 1000 }];

var componentlist = 
[ { name: 'Test.js/01', required_memory: 9342934 }];

var c2 = 
[ { name: 'A', required_memory: 200 }, { name: 'B', required_memory: 600 } ];

var d1 = []; 

// 200, 600, 400, 500
var c3 = 
[ { name: 1, required_memory: 200 }, { name: 2, required_memory: 600 },
 { name: 3, required_memory: 400 }, { name: 4, required_memory: 500 }];


function Scheduler (listDevices, listComponents){
var listDevices= listDevices;
var listComponents = listComponents;
var schedule={};
}
Scheduler.prototype.constructor = Scheduler ;

function DeviceMemorySorted (listDevices){
var sortedDeviceList= listDevices.sort((a,b) => (b.memory) - (a.memory) );
	return (sortedDeviceList);
}

function ComponentMemorySorted (listComponents){
	var sortedComponentsList= listComponents.sort((a,b) => (b.required_memory) - (a.required_memory) );
	return (sortedComponentsList);	
}

function calculateMemory(arr, listApp){
	//console.log(arr)
	var calculatedMemory=0;
	var names=[];
	for(var i=0; i<listApp.length; i++){
		names.push(listApp[i].name);
	}
	for(var i=0; i<arr.length; i++){
		var index= names.indexOf(arr[i]);
		calculatedMemory +=listApp[index].required_memory;
	}

	return(calculatedMemory);
}
var groupedArray = function (arr, chunkSize){
	var groups=[];
	for(var i=0; i<arr.length; i += chunkSize){
		groups.push(arr.slice(i, i + chunkSize));
	}
	return groups;
}
	
function binding(listApp1, listDevice1){
	var schedule={};
	if(listApp1.length > listDevice1.length){
		var groups = groupedArray(listApp1, listDevice1.length); 
	}
	else{
		var groups = [listApp1];
	}
	for(var i=0; i<groups.length; i++){

		console.log(groups);

		for(var j=0; j<groups[i].length; j++){
			var myArray=[], nextArray = [];
			if(i === 0){
				if(listDevice1[j].memory > (groups[i][j].required_memory)){
					myArray.push(groups[i][j].name);
					schedule[listDevice1[j].id]=myArray;
				}
				else{
					// TODO: return empty
					return {};
					console.log('Sorry');
				}
			}
			else{
				console.log('sDFK');
				nextArray=schedule[listDevice1[j].id];
				var calculatedMemory= calculateMemory(nextArray, listApp1);
				if(listDevice1[j].memory > (calculatedMemory + groups[i][j].required_memory)){
					schedule[listDevice1[j].id].push(groups[i][j].name);
				}
				else {

					// TODO return empty 
					return {};
					console.log('sorry not enough space')
				}
			}
		}
	}
	return schedule;
}

function deviceMemory(schedule, listDevice1){
	var scheduleKeys= Object.keys(schedule);
	var names=[], arrayMemory=[];
	for(var i=0; i<listDevice1.length; i++){
		names.push(listDevice1[i].id);
	}
	for(var i=0; i<names.length; i++){
		var index= names.indexOf(scheduleKeys[i]);
		arrayMemory.push(listDevice1[index].memory);
	}
	return (arrayMemory);
}
function memoryLeft(schedule, listApp1, listDevice1){
	var metricMemory={};
	var memoryLeft=0;
	var arr=[];
	var scheduleValues= Object.values(schedule);
	var scheduleKeys= Object.keys(schedule);
	var arrayMemory= deviceMemory(schedule, listDevice1);
	for(var i=0; i<scheduleValues.length; i++){
		arr=scheduleValues[i];
		var calculatedMemory = calculateMemory(arr, listApp1);
		memoryLeft=arrayMemory[i]-calculatedMemory;
		metricMemory[scheduleKeys[i]]=memoryLeft;
	}
return(metricMemory);
}

//Scheduler.prototype.Scheduling = function(listDevices, listComponents){
function Scheduling(listDevices, listComponents){
	if(listDevices.length === 0 || listComponents.length === 0){
		return {};
	}
	var sortedDeviceList= DeviceMemorySorted(listDevices);
	var sortedComponentsList= ComponentMemorySorted(listComponents);
	schedule= binding(sortedComponentsList, sortedDeviceList);
	console.log(schedule);

	return (schedule);
};


Scheduling(devicelist, c3);


//module.exports = NewScheduler;