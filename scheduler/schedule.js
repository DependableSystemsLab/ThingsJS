
var id= 1;
var status = "idle";
var pubsub='topic1';
var data= {
		
		'pi-3': ['factorial.js','test.js'],
		'pi-1': ['temp-reg.js','temp1.js'],
		'xeon1':['temp.js']
	};
var CurrentSchedule= {
		
		'pi-3': ['factorial.js','test.js'],
		'pi-1': ['temp1.js','motion.js','toto'],
		'xeon1':['temp-reg.js']
	};
var run=[], stop=[], continueRun=[], migrate=[];

function programList(schedule, CurrentSchedule){

var scheduleValues= Object.values(schedule);
var CurrentScheduleValues= Object.values(CurrentSchedule);
var duplicateList= [];
var list=[];

for(var i=0; i<scheduleValues.length; i++){
	for(var j=0; j<scheduleValues[i].length; j++){
		duplicateList.push(scheduleValues[i][j]);
	}
}
for(var i=0; i<CurrentScheduleValues.length; i++){
	for(var j=0; j<CurrentScheduleValues[i].length; j++){
		duplicateList.push(CurrentScheduleValues[i][j]);
	}
}
for(let i = 0; i<duplicateList.length; i++){
	if(list.indexOf(duplicateList[i]) == -1) {list.push(duplicateList[i]);}
}

return(list);
};	

//var list= programList(data, CurrentSchedule);

function deviceForProgram(program, schedule){
	var scheduleValues= Object.values(schedule);
	var scheduleKeys= Object.keys(schedule);
	var device="";	
	for(var i=0; i<scheduleKeys.length; i++){
		for(var j=0; j<scheduleValues[i].length; j++){
		if (scheduleValues[i].includes(program)){
			//var index= scheduleValues.indexOf(program);
			device=scheduleKeys[i]
			break;
		}
	}
}
if(device === ""){return ("");}
	else {return(device);}
};
//var test= deviceForProgram('test.js', data);

function computeDifference (schedule, CurrentSchedule){
	var newSchedule={};
	var list= programList(schedule, CurrentSchedule);
	//console.log(list);
	for(var i=0; i<list.length; i++){
		var deviceInNew=deviceForProgram(list[i], data);
		var deviceInCurrent= deviceForProgram(list[i],CurrentSchedule); 
		
		if((deviceInCurrent !== "") && (deviceInNew === ""))
			{
				stop.push({app: list[i],
							device: deviceInCurrent});
			}
		else if((deviceInCurrent === "") && (deviceInNew !== ""))
			{ run.push({app:list[i],
						device:deviceInNew});}
		else if((deviceInCurrent !== "") && (deviceInNew !== ""))
			{ if (deviceInNew === deviceInCurrent)
				{continueRun.push({app:list[i],
									device: deviceInNew});}
					//console.log(continueRun);}
			else if (deviceInNew !== deviceInCurrent)
				{ migrate.push({app: list[i], 
							from: deviceInCurrent,
							to : deviceInNew});}
	}
}

/*newSchedule.push(run);
newSchedule.push(stop);
newSchedule.push(continueRun);
newSchedule.push(migrate);*/
newSchedule["run"]= run;
newSchedule["stop"]= stop;
newSchedule["continueRun"]= continueRun;
newSchedule["migrate"]= migrate;
return(newSchedule);
};
console.log(computeDifference 

	(data, CurrentSchedule));

