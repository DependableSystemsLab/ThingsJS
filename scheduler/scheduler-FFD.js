var listDevice = [
	{
		id:'pi0-1',
		type: 'Pi zero',
		memory: 35
	},
	{
		id: 'pi3-1',
		type: 'Pi3 one',
		memory: 60
	},
	{
		id: 'pi3-2',
		type: 'Pi3 two',
		memory: 75
	},

	{
		id: 'pi3-3',
		type: 'Pi3 three',
		memory: 45
	},
	{
		id: 'i7-1',
		type: 'i7',
		memory: 400
	}
	] ;
var listApp = [
	{
		name: 'sprinkler.js',
		count: 4,
		required_memory: 5
	},
	{
		name: 'temp-reg.js',
		count: 2,
		required_memory: 30
	},
	{
		name: 'shade-contr.js',
		count: 4,
		required_memory: 15
	}
]
var schedule={};

var listDeviceTriee= listDevice.sort((a,b) => (a.memory) - (b.memory) );
var listAppTriee= listApp.sort((a,b) => (a.required_memory) - (b.required_memory) );

function NewAppList(listApp1){
	var newList=[];
	for(var i=0; i<listApp1.length; i++){
		var count= listApp1[i].count;
		var stringObj= JSON.stringify(listApp1[i]);
		for(var j=0; j<count; j++){
			var test= stringObj.repeat(1);
			var myParse= JSON.parse(test);
			myParse.name +='/'+j;
			newList.push(myParse);
		}
	}
	return newList;
}
/*function calculateMemory(arr, listApp){
	var calculatedMemory=0;
	var names=[];
	for(var i=0; i<listApp.length; i++){
		var indexChar= listApp[i].name.indexOf('/');
		var appName=listApp[i].name.slice(0,indexChar);
		names.push(appName);
	}
	for(var i=0; i<arr.length; i++){
		var indexChar= arr[i].indexOf('/');
		var appName=arr[i].slice(0,indexChar);
		var index= names.indexOf(appName);
		
			console.log(listApp[index])
		calculatedMemory +=listApp[index].required_memory;
	}

	return(calculatedMemory);
}*/

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
		var groups = listApp1;
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
				var calculatedMemory= calculateMemory(nextArray, listApp1);
				if(listDevice1[j].memory > (calculatedMemory + groups[i][j].required_memory)){
					schedule[listDevice1[j].id].push(groups[i][j].name);
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

var newList= NewAppList(listAppTriee);
schedule= binding(newList, listDeviceTriee);
console.log("Schedule: ")
console.log(schedule)
console.log("Memory left in the devices: ")
console.log(memoryLeft(schedule, newList, listDeviceTriee))