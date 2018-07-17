var diff = require('./Schedule.js').ComputeDifference;

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

var o = {"pi0":["Count.js/1","Count.js/3"],"pi1":["Count.js/2"]}
var n = {"pi0":["Count.js/3","Count.js/2"],"pi1":["Count.js/1"]}

var c1 = {};

var c2 = { 'pi0': [1,2] };

function test(){
	console.log(diff(n, o));
}

test();