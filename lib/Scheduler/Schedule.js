function programList(newSchedule, currentSchedule){
	var scheduleValues = Object.values(newSchedule);
	var currentScheduleValues = Object.values(currentSchedule);
	var duplicateList = [];
	var list = [];

	for(var i = 0; i < scheduleValues.length; i++){
		for(var j = 0; j < scheduleValues[i].length; j++){
			duplicateList.push(scheduleValues[i][j]);
		}
	}
	for(var i = 0; i < currentScheduleValues.length; i++){
		for(var j = 0; j < currentScheduleValues[i].length; j++){
			duplicateList.push(currentScheduleValues[i][j]);
		}
	}
	for(var i =0; i < duplicateList.length; i++){
		if(list.indexOf(duplicateList[i]) === -1){
			list.push(duplicateList[i]);
		}
	}
	return list;
}

function deviceForProgram(program, schedule){
	var scheduleValues = Object.values(schedule);
	var scheduleKeys = Object.keys(schedule);
	var device = "";

	for(var i = 0; i < scheduleKeys.length; i++){
		for(var j = 0; j < scheduleValues[i].length; j++){
			if(scheduleValues[i].includes(program)){
				device = scheduleKeys[i];
				break;
			}
		}
	}
	return device;
}

function computeDifference(newSchedule, currentSchedule){
	var currSchedule;
	try{
		currSchedule = JSON.parse(currentSchedule);
	}
	catch(e){
		currSchedule = currentSchedule;
	}

	var run = [], stop = [], continueRun = [], migrate = [];
	var commands = {};
	var list = programList(newSchedule, currSchedule);

	for(var i = 0; i < list.length; i++){
		var deviceInNew = deviceForProgram(list[i], newSchedule);
		var deviceInCurrent = deviceForProgram(list[i], currSchedule);

		if((deviceInCurrent !== "") && (deviceInNew === "")){
			stop.push( { app: list[i], device: deviceInCurrent });
		}
		else if((deviceInCurrent === "") && (deviceInNew !== "")){
			run.push( { app: list[i], device: deviceInNew });
		}
		else if((deviceInCurrent !== "") && (deviceInNew !== "")){
			if(deviceInNew === deviceInCurrent){
				continueRun.push({ app: list[i], device: deviceInNew });
			}
			else{
				migrate.push({ app: list[i], from: deviceInCurrent, to: deviceInNew });
			}
		}
	}
	commands["run"] = run;
	commands["stop"] = stop;
	commands["continueRun"] = continueRun;
	commands["migrate"] = migrate;

	return commands;
}

function parseDifference(commands, componentMappings){
	var parsed = {};
	for(cmd in commands){
		var ops = [];
		commands[cmd].forEach(function(operation){
			var copy = Object.assign({}, operation);
			var app = copy.app;
			// this may cause problems in the future
			var instanceId = componentMappings[app];
			delete copy.app;
			copy[app] = instanceId;
			ops.push(copy);
		});
		parsed[cmd] = ops;
	}
	return parsed;
}

module.exports = {
	ComputeDifference: computeDifference,
	ParseDifference: parseDifference
}