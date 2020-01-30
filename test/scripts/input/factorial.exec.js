var startTime = null, mid = null, endTime = null;
var target = 20000;
var timer;
var count = 0;
var digits = [ 1 ];
var factorial = function(){
    count ++;   
    var carry = 0;
    var product = 0;
    for (var i=0; i < digits.length; i++){
        product = digits[i] * count;
        product += carry;
        digits[i] = product % 10;
        carry = Math.floor(product / 10);
    }
    while (carry > 0){
        digits.push(carry % 10);
        carry = Math.floor(carry / 10);
    }   
    if (count < target){
        if (count === target/2 + 1){
            mid = Date.now();
            process.send({ tag: 'mid' });
        }
        setImmediate(factorial);
    }
    else {
        digits.reverse();
        var value = digits.join('');
        clearInterval(timer);
        console.log("<<< Computation Finished >>>");
        console.log("factorial("+target+") = "+value);
        endTime = Date.now();
        console.log("Time taken : "+(endTime - startTime)+" ms");
        process.send({ tag: 'end', elapsed: endTime - mid });
    }
};
startTime = Date.now();
setImmediate(factorial);
var printInterval = function(){
    console.log("Currently computing n = "+count+", number of digits = "+digits.length);
};
timer = setInterval(printInterval, 500);