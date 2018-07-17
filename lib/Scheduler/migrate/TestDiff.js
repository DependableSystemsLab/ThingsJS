// currSchedule
var currSchedule = 
{
	'pi0': [1,2,3],
	'pi1': [4,5]
}

var newSchedule = 
{
	'pi1': [1,2],
	'pi0': [4,5,6]
}

var c1 = 
{ 

}

var c2 = 
{
	'pi0': [1,2]
}


function Schedule(){
var id= 1;
var status = "idle";
var pubsub='topic1';
var run=[], stop=[], continueRun=[], migrate=[];
}
Schedule.prototype.constructor= Schedule;

programList= function(schedule, CurrentSchedule){
//function programList(schedule, CurrentSchedule){

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
deviceForProgram = function(program, schedule){
//function deviceForProgram(program, schedule){
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
computeDifference= function(schedule, CurrentSchedule){
	var run=[], stop=[], continueRun=[], migrate=[];
//function computeDifference (schedule, CurrentSchedule){
	var newSchedule={};
	var list= programList(schedule, CurrentSchedule);
	//console.log(list);
	for(var i=0; i<list.length; i++){
		var deviceInNew=deviceForProgram(list[i], schedule);
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

newSchedule["run"]= run;
newSchedule["stop"]= stop;
newSchedule["continueRun"]= continueRun;
newSchedule["migrate"]= migrate;
return(newSchedule);
};

var o = {"pi0":["Count.js/1","Count.js/3"],"pi1":["Count.js/2"]}
var n = {"pi0":["Count.js/3","Count.js/2"],"pi1":["Count.js/1"]}

console.log(computeDifference(n, o));
//var schedule= computeDifference(data, CurrentSchedule) 
//console.log(schedule);

//module.exports = Schedule ;
