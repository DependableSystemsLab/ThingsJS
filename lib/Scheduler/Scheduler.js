function sortByField(array, compareField){
	array.sort(function(a, b){
		if(b[compareField] > a[compareField]){
			return 1;
		}
		return -1;
	});
	return array;
}

function calculateMemory(arr, listApp){
	var calculatedMemory = 0;
	var names = [];
	listApp.forEach(function(app){
		names.push(app.name);
	});
	arr.forEach(function(elem){
		var index = names.indexOf(elem);
		calculatedMemory += listApp[index].required_memory;
	});
	return calculatedMemory;
}

function groupedArray(arr, chunkSize){
	var groups = [];
	for(var i = 0; i < arr.length; i += chunkSize){
		groups.push(arr.slice(i, i + chunkSize));
	}
	return groups;
}

function binding(listApp, listDevices){
	var schedule = {};
	var groups = [listApp];

	if(listApp.length > listDevices.length){
		groups = groupedArray(listApp, listDevices.length); 
	}

	for(var i = 0; i < groups.length; i++){
		for(var j = 0; j < groups[i].length; j++){
			var currArray = [];
			var nextArray = [];

			if(i === 0){
				if(listDevices[j].memory > groups[i][j].required_memory){
					currArray.push(groups[i][j].name);
					schedule[listDevices[j].id] = currArray;
				}
				else{
					console.log('[Scheduler] Sorry: not enough space');
					return null;
				}
			}
			else{
				nextArray = schedule[listDevices[j].id];
				var calculatedMemory = calculateMemory(nextArray, listApp);

				if(listDevices[j].memory > (calculatedMemory + groups[i][j].required_memory)){
					schedule[listDevices[j].id].push(groups[i][j].name);
				}
				else{
					console.log('[Scheduler] Sorry: not enough space');
					return null;
				}
			}
		}
	}
	return schedule;
}

function deviceMemory(schedule, listDevices){
	var scheduleKeys = Object.keys(schedule);
	var names = [];
	var mem = [];

	listDevices.forEach(function(device){
		names.push(device.id);
	});
	for(var i = 0; i < names.length; i++){
		var index = names.indexOf(scheduleKeys[i]);
		mem.push(listDevices[index].memory);
	}
	return mem;
}

function memoryLeft(schedule, listApp, listDevices){
	var metricMemory = {};
	var memoryLeft = 0;
	var arr = [];
	var scheduleValues = Object.values(schedule);
	var scheduleKeys = Object.keys(schedule);
	var arrayMemory = deviceMemory(schedule, listDevices);

	for(var i = 0; i < scheduleValues.length; i++){
		arr = scheduleValues[i];
		var calculatedMemory = calculateMemory(arr, listApp);
		memoryLeft = arrayMemory[i] - calculatedMemory;
		metricMemory[scheduleKeys[i]] = memoryLeft;
	}
	return metricMemory;
}

function schedule(listDevices, listComponents){
	var schedule = null;
	if(!listDevices || listDevices.length === 0){
		return schedule;
	}
	if(!listComponents || listComponents.length === 0){
		schedule = {};
		listDevices.forEach(function(deviceDetails){
			schedule[deviceDetails.id] = [];
		});
		return schedule;
	}
	// if(!listDevices || !listComponents){
	// 	return schedule;
	// }
	// if(listDevices.length === 0 || listComponents.length === 0){
	// 	return schedule;
	// }
	var sortedDeviceList = sortByField(listDevices, 'memory');
	var sortedComponentsList = sortByField(listComponents, 'required_memory');

	schedule = binding(sortedComponentsList, sortedDeviceList);
	return schedule;
}

module.exports = {
	Schedule: schedule
}
