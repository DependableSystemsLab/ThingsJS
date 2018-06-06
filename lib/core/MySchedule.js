//function schedule(){
	
	var id= 1;
	var status = "idle";
	var data= {
		
		'pi-3': ['factorial.js','test.js'],
		'pi-1': ['temp-reg.js','temp1.js'],
		'xeon1':['temp.js']
	};
var CurrentSchedule= {
		
		'pi-3': ['factorial.js','test.js'],
		'pi-1': ['temp1.js'],
		'xeon1':['temp-reg.js']
	};
	
	var pubsub='topic1';


function computeDiff(Schedule, CurrentSchedule) {
	var newSchedule =[];
	var opContinue={};
	var opRun={};
	var opStop={};

	function deviceOrientedSchedule (Schedule){
		var schKeys= Object.keys(Schedule);
		var schValues= Object.values(Schedule);
		var deviceOriented= {};
	for (var i = 0; i < schKeys.length; i++) {

		deviceOriented[schKeys[i]]=schValues[i];
	}
	return(deviceOriented) };

	function programOrientedSchedule (CurrentSchedule){

	// create an intermediary Map of keys and values
	const newMap = Object.keys(CurrentSchedule).reduce((map, key) => {
	  // force the value to an array for consistency and iterate
	  [].concat(CurrentSchedule[key]).forEach(val => {
	    // create or add to the "key" to the array at map.get(val)
	    map.set(val, (map.get(val) || []).concat(key))
	  })
	  return map
	}, new Map())

	// now reduce the Map entries to a plain object
	const programOriented = Array.from(newMap).reduce((obj, [key, val]) => ({
	  ...obj,
	  [key]: val // only use an array if more than one entry
	}), Object.create(null))
	return(programOriented);
	}

	var deviceOriented=deviceOrientedSchedule(data);
var programOriented=programOrientedSchedule(CurrentSchedule);
var deviceValues= Object.values(deviceOrientedSchedule(data));
var deviceKeys= Object.keys(deviceOriented);
var programValues= Object.values(programOrientedSchedule(CurrentSchedule));
var programKeys=Object.keys(programOriented);

for(var i=0; i<deviceKeys.length; i++){
	var j=deviceValues[i].length;
	while(j--){

		if (programKeys.includes(deviceValues[i][j])){
			var indexKey= programKeys.indexOf(deviceValues[i][j]);
			if(programValues[indexKey].includes(deviceKeys[i])){
				var indexVal= programValues[indexKey].indexOf(deviceKeys[i]);
				opContinue[programValues[indexKey][indexVal]]= deviceValues[i][j];
				
				if(programValues[indexKey].length == 0){delete programOriented[programKeys[indexKey]] ;}
				else {programValues[indexKey].splice(indexVal,1);}
				
				if(deviceValues[i].length == 0){delete deviceOriented[deviceKeys[i]];}
				else {deviceValues[i].splice(j,1);}
				//console.log(opContinue);

			}
			else{ opStop[programValues[indexKey]]= programKeys[indexKey];
				opRun[deviceKeys[i]]= deviceValues[i][j];

				if(programValues[indexKey].length == 0){delete programOriented[programKeys[indexKey]] ;}
				else {programValues[indexKey].splice(indexVal,1);}
				
				if(deviceValues[i].length == 0){delete deviceOriented[deviceKeys[i]];}
				else {deviceValues[i].splice(j,1);}
				
				/*programValues.splice(indexKey,1);
				programKeys.splice(indexKey,1);
				deviceValues.splice(j,1);*/
				}
		}
		else{opRun[deviceKeys[i]]=deviceValues[i][j];
			if(deviceValues[i].length == 0){delete deviceOriented[deviceKeys[i]];}
				else {deviceValues[i].splice(j,1);}
			//opStop[programValues[i]]= programKeys[i]
		}
//j++;
	}
}

for(var i=0; i<deviceKeys.length; i++){
	for(var j=0; j<deviceValues[i].length; j++){
			opRun[deviceKeys[i]]= deviceValues[i][j];
	}
}
for(var i=0; i<programKeys.length; i++){
	for(var j=0; j<programValues[i].length; j++){
			opRun[programValues[i][j]]= programKeys[i];
	}
}
//console.log(deviceOrientedSchedule(data));
//console.log(programOrientedSchedule(CurrentSchedule));
console.log('continue ',opContinue);
console.log('stop ',opStop);
console.log('run ',opRun);

var opMigrate=[];
var runKeys= Object.keys(opRun);
var runValues= Object.values(opRun);
var stopKeys= Object.keys(opStop);
var stopValues= Object.values(opStop);
for (var i=0; i<runKeys.length; i++){
	if(runValues.includes(stopValues[i])){
		var index= runValues.indexOf(stopValues[i]);
		if(runKeys[index] !== stopKeys[i]){
			//opMigrate[stopKeys[i]]= runKeys[index];

			opMigrate.push({app: stopValues[i], 
							from: stopKeys[i],
							to : runKeys[index]});
			delete opStop[stopKeys[i]];
			delete opRun[runKeys[index]];
			/*runKeys.splice(index,1);
			runValues.splice(index,1);
			stopKeys.splice(i,1);
			stopValues.splice(i,1);*/
		}
	}
}
console.log('migrate: ',opMigrate);
console.log('stop ',opStop);
console.log('run ',opRun);
		
newSchedule.push(opContinue);
newSchedule.push(opRun);
newSchedule.push(opStop);
newSchedule.push(opMigrate);
return(newSchedule)
};

var newS = computeDiff(data, CurrentSchedule);
//console.log( newS);
//};