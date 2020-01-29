var pidusage = require('pidusage');
require('things-js/lib/core/Code').bootstrap(module, function (Σ) {
    Σ.setExtractor(function () {
        return [
            {},
            {
                startTime: startTime,
                endTime: endTime,
                target: target,
                timer: timer,
                count: count,
                digits: digits,
                factorial: factorial,
                printInterval: printInterval
            }
        ];
    });
    var startTime = null, endTime = null;
    var target = 20000;
    var timer;
    var count = 0;
    var digits = [1];
    var factorial = Σ.addFunction(function α0() {
        var Σ_α0 = new Σ.Scope(this, Σ, α0, function () {
            return [
                {},
                {
                    carry: carry,
                    product: product
                }
            ];
        });
        count++;
        var carry = 0;
        var product = 0;
        for (var i = 0; i < digits.length; i++) {
            product = digits[i] * count;
            product += carry;
            digits[i] = product % 10;
            carry = Math.floor(product / 10);
        }
        while (carry > 0) {
            digits.push(carry % 10);
            carry = Math.floor(carry / 10);
        }
        if (count < target) {
            if (count === target / 2 + 1){
                (function report(){
                    pidusage(process.pid, function(err, stat) {
                        process.send({
                            timestamp: Date.now(),
                            memory: process.memoryUsage(),
                            cpu: stat.cpu
                        })
                    });
                    setTimeout(report, Math.round(Math.random()*200 + 100));
                })();
            }
            Σ.setImmediate(factorial);
        } else {
            digits.reverse();
            var value = digits.join('');
            Σ.clearInterval(timer);
            Σ.console.log('<<< Computation Finished >>>');
            Σ.console.log('factorial(' + target + ') = ' + value);
            endTime = Date.now();
            Σ.console.log('Time taken : ' + (endTime - startTime) + ' ms');
            process.exit();
        }
    }, Σ);
    startTime = Date.now();
    Σ.setImmediate(factorial);
    var printInterval = Σ.addFunction(function α1() {
        Σ.console.log('Currently computing n = ' + count + ', number of digits = ' + digits.length);
    }, Σ);
    timer = Σ.setInterval(printInterval, 500);
}, 'mqtt://localhost', 'factorial.js', {});
