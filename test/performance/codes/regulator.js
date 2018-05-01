function randomKey(length, charset){
	var text = "";
	if (!length) length = 8;
	if (!charset) charset = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for( var i=0; i < length; i++ ){
    	text += charset.charAt(Math.floor(Math.random() * charset.length));
    }
    return text;
};

var currentAverage = null;
var targetTemperature = 240.0;
var sensorData = {};
var heaterData = {};
var tempVal = null;

function computeAverage(data){
	var t = 0;
	var c = 0;
	for (var key in data){
		if (data[key]){
			t += data[key];
			c ++;
		}
	}
	return t / c;
}

function getSensor(url){
	var id = 'sensor-'+randomKey();
	var data = [];
	var timer;
	
	var onDataRead = function(){
		var readVal = ((Math.random() * 50) + 180);
		data.unshift(readVal);
		if (data.length === 1000){
			data.splice(999, 1);
		}
		sensorData[id] = readVal;
		currentAverage = computeAverage(sensorData);
		console.log("Sensor ["+id+"] reads -> "+(currentAverage/10)+" degrees");
	};
	
	return function(){
		timer = setInterval(onDataRead, 500);
	}
}

function getHeater(url){
	var id = 'heater-'+randomKey();
	return function(output){
		//send asynchronous message
		tempVal = output;
		heaterData[id] = tempVal;
		console.log("Heater ["+id+"] output -> "+output+"W");
	};
};


var sensor1 = getSensor('mqtt://192.168.50.11');
var sensor2 = getSensor('mqtt://192.168.50.12');
var sensor3 = getSensor('mqtt://192.168.50.13');

var heater1 = getHeater('mqtt://192.168.0.50');
var heater2 = getHeater('mqtt://192.168.0.51');

function setOutput(){
	
	var output = targetTemperature - currentAverage;
	if (output < 0){
		output = 0;
	}
	else {
		output = output * 10; //Some arbitrary power unit
	}
	
	heater1(output);
	heater2(output);
//	console.log("Setting target to "+(targetTemperature/10));
}


sensor1();
sensor2();
sensor3();

setInterval(setOutput, 500);