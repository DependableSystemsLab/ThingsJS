var t=[];
function remplissage(n){
	//var n= 1000;
	for(var i=0; i<n; i++){
		t.push(i);
	}
	return t;
} 
/*function somme(t){
	var s=0;
	for(var i=0; i<t.length; i++){
		s += t[i];
	}
	return s;
}
function factorial(x) 
{ 

  if (x === 0)
 {
    return 1;
 }
  return x * factorial(x-1);
         
}
function remplissage(n){
	//var n= 1000;
	for(var i=0; i<n; i++){
		t.push(i);
	}
	return t;
} 
function produit(t){
	var s=0;
	for(var i=0; i<t.length; i++){
		s =s* t[i];
	}
	return s;
}
function factorialProd(x,p) 
{ 

  if (x === 0)
 {
    return 1;
 }
  return x * factorial(x-1)*p;
         
}*/
//t.reverse();
//console.log(factorial(50));
//remplissage(10000)
console.log (remplissage(10000))
//console.log(somme(t))
//console.log(produit(t))
//console.log(factorialProd(1000,produit(t)))
const used= process.memoryUsage().heapUsed / 1024 / 1024 ;
var mem= Math.round(used * 100) / 100 ;
console.log("the script uses approximately", mem,  "MB");