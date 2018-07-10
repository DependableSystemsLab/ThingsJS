function Scheduler (listDevices, listComponents){
var listDevices= listDevices;
var listComponents = listComponents;
var schedule={};
}
Scheduler.prototype.constructor = Scheduler ;

Scheduler.prototype.DeviceMemorySorted= function(listDevices){
//function DeviceMemorySorted (listDevices){
	var sortedDeviceList= listDevices.sort((a,b) => (b.memory) - (a.memory) );
	return (sortedDeviceList);
}
Scheduler.prototype.ComponentMemorySorted = function(listComponents){
//function ComponentMemorySorted (listComponents){
	var sortedComponentsList= listComponents.sort((a,b) => (b.required_memory) - (a.required_memory) );
	return (sortedComponentsList);	
}

Scheduler.prototype.NewAppList = function(sortedComponentsList){
//function NewAppList(sortedComponentsList){
	var newList=[];
	for(var i=0; i<sortedComponentsList.length; i++){
		var count= sortedComponentsList[i].count;
		var stringObj= JSON.stringify(sortedComponentsList[i]);
		for(var j=0; j<count; j++){
			var test= stringObj.repeat(1);
			var myParse= JSON.parse(test);
			myParse.name +='/'+j;
			newList.push(myParse);
		}
	}
	return newList;
}

Scheduler.prototype.calculateMemory = function(arr, listApp){
//function calculateMemory(arr, listApp){
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
 
Scheduler.prototype.binding = function(componentsList, listDevice1){	
//function binding(componentsList, listDevice1){
	var schedule={};
	if(componentsList.length > listDevice1.length){
		var groups = groupedArray(componentsList, listDevice1.length); 
	}
	else{
		var groups = componentsList;
	}
	for(var i=0; i<groups.length; i++){
		for(var j=0; j<listDevice1.length; j++){
			var myArray=[], nextArray = [];
			if(i === 0){
				if(listDevice1[j].memory > (groups[i][j].required_memory)){
					myArray.push(groups[i][j].name);
					schedule[listDevice1[j].id]=myArray;
				}
			}
			else{
				nextArray=schedule[listDevice1[j].id];
				var calculatedMemory= calculateMemory(nextArray, componentsList);
				if(listDevice1[j].memory > (calculatedMemory + groups[i][j].required_memory)){
					schedule[listDevice1[j].id].push(groups[i][j].name);
				}
				else {
					// check other devices 
					console.log('Sorry, not enough space');
					
				}

			}
		}
	}
	return schedule;
}

Scheduler.prototype.deviceMemory = function(schedule, listDevice1){
//function deviceMemory(schedule, listDevice1){
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
Scheduler.prototype.memoryLeft = function(schedule, componentsList, listDevice1){
//function memoryLeft(schedule, componentsList, listDevice1){
	var metricMemory={};
	var memoryLeft=0;
	var arr=[];
	var scheduleValues= Object.values(schedule);
	var scheduleKeys= Object.keys(schedule);
	var arrayMemory= deviceMemory(schedule, listDevice1);
	for(var i=0; i<scheduleValues.length; i++){
		arr=scheduleValues[i];
		var calculatedMemory = calculateMemory(arr, componentsList);
		memoryLeft=arrayMemory[i]-calculatedMemory;
		metricMemory[scheduleKeys[i]]=memoryLeft;
	}
return(metricMemory);
}
Scheduler.prototype.Scheduling = function(listDevices, listComponents){

	var sortedDeviceList= DeviceMemorySorted(listDevices);
	var sortedComponentsList= ComponentMemorySorted(listComponents);
	var newList= NewAppList(sortedComponentsList);
	schedule= binding(newList, sortedDeviceList);

	return (schedule);
};
var metric = memoryLeft(schedule, newList, sortedDeviceList);

module.exports = Scheduler;

