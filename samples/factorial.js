/* Basic ThingsJS-compatible factorial calculator.
 * Note we cannot use a while loop or a recursive function as doing so would
 * block the thread, preventing the migration signal from being processed.
 * We use a setImmediate to call the next step of the factorial computation.
 * 
 * Set the "target" variable to specify the argument.
 * In this example this code will compute factorial(100000).
 * */
var target = 100000;
var timer;
var count = 0;
var digits = [ 1 ];

function factorial(){
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
        setImmediate(factorial);
    }
    else {
        digits.reverse();
        var value = digits.join('');
        clearInterval(timer);
        console.log("<<< Computation Finished >>>");
        console.log("factorial("+target+") = "+value);
    }
};
setImmediate(factorial);

function printInterval(){
    console.log("Currently computing n = "+count+", number of digits = "+digits.length);
};
timer = setInterval(printInterval, 500);