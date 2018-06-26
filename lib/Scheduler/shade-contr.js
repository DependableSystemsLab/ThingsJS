var arr=['amira', 'said', 'tst'];
arr.reverse();
var t=[];
function remplissage(n){
	//var n= 1000;
	for(var i=0; i<n; i++){
		t.push(i);
	}
	return t;
} 
function somme(t){
	var s=0;
	for(var i=0; i<t.length; i++){
		s += t[i];
	}
	return s;
}


console.log (remplissage(170000))
console.log(somme(t))
const used= process.memoryUsage().heapUsed / 1024 / 1024 ;
var mem= Math.round(used * 100) / 100 ;
console.log("the script uses approximately", mem,  "MB");