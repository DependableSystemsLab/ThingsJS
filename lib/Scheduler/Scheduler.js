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
	}); // O(C)
	arr.forEach(function(elem){ // O(C/D)
		var index = names.indexOf(elem); // O(C)
		calculatedMemory += listApp[index].required_memory;
	});
	return calculatedMemory;
}

function groupedArray(arr, chunkSize){
	var groups = [];
	for(var i = 0; i < arr.length; i += chunkSize){ // O(C/D)
		groups.push(arr.slice(i, i + chunkSize)); // O(D)
	}
	return groups;
}

function binding(listApp, listDevices){
	var schedule = {};
	var groups = [listApp];

	if(listApp.length > listDevices.length){
		groups = groupedArray(listApp, listDevices.length); 
	} // O(C)

	for(var i = 0; i < groups.length; i++){ // O(C/D)
		for(var j = 0; j < groups[i].length; j++){ // O(D)
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
				var calculatedMemory = calculateMemory(nextArray, listApp); // O(C * C/D)

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

function parseComponentList(components){
	var compArray = [];

	for(comp in components){
		compArray.push({ name: comp, required_memory: components[comp].heapUsed });
	}
	return compArray;
}

function parseDeviceList(devices){
	var deviceArray = [];

	for(device in devices){
		deviceArray.push({ id: device, memory: devices[device].device_memory });
	}
	return deviceArray;	
}

function schedule(listDevices, listComponents, currentMapping){
	var schedule = null;
	var currDate = Date.now();

	var deviceArr = parseDeviceList(listDevices);
	var componentsArr = parseComponentList(listComponents);

	if(!deviceArr || deviceArr.length === 0){
		return schedule;
	}
	schedule = {};
	if(!componentsArr || componentsArr.length === 0){
		var mapping = {};
		deviceArr.forEach(function(deviceDetails){
			mapping[deviceDetails.id] = [];
		});
		schedule.timestamp = currDate;
		schedule.mapping = mapping;
		return schedule;
	}
	var sortedDeviceList = sortByField(deviceArr, 'memory');
	var sortedComponentsList = sortByField(componentsArr, 'required_memory');

	var mapping = binding(sortedComponentsList, sortedDeviceList) || {};
	if(Object.keys(mapping).length > 0){
		deviceArr.forEach(function(device){
			if(!mapping[device.id]){
				mapping[device.id] = [];
			}
		});
	}
	else{
		deviceArr.forEach(function(device){
			mapping[device.id] = currentMapping[device.id] || [];
		});
	}

	schedule.timestamp = currDate;
	schedule.mapping = mapping;

	return schedule;
}

module.exports = {
	Schedule: schedule
}
