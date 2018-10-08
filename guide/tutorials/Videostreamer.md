# Building your first First Application

##Experimental setup

In order to write a ThingsJS component certain things should be taken into account

Below we will demonstrate an application to write your first application which is a factorial application using the ThingsJS compatible rules.

The code for this application can be found on our Github page if you want to experiment with it. It's located in the samples folder.

###Usual way of writing a factorial code in Javascript

```
function factorialize(num) {
  if (num < 0)
        return -1;
  else if (num == 0)
      return 1;
  else {
      return (num * factorialize(num - 1));
  }
}

```

####However, the above code will not be compatible with ThingsJS.

###ThingsJS Compatible code
To write a ThingsJS compatible code certain changes have to made in the way we write the code.

We cannot use a while loop or a recursive function as doing so would block the thread, preventing the migration signal from being processed. We use a setImmediate to call the next step of the factorial computation.

```

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

```
####Evaluating the code

```
var target = 100000;

```
This is used to specify the argument. In this case we want to compute the factorial of 100000.

```

setImmediate(factorial);

```
* The setImmediate Schedules the "immediate" execution of the callback after I/O events' callbacks.

* When multiple calls to setImmediate() are made, the callback functions are queued for execution in the order in which they are created. The entire callback queue is processed every event loop iteration. If an immediate timer is queued from inside an executing callback, that timer will not be triggered until the next event loop iteration.

* The reason for doing this for writing the code according to the migration part.
