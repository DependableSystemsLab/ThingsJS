(function(Σ) {
    Σ.setExtractor(function() {
        return this.capture({}, {
            startTime: startTime,
            endTime: endTime,
            target: target,
            timer: timer,
            count: count,
            digits: digits,
            factorial: factorial,
            printInterval: printInterval
        });
    });
    var startTime = null,
        endTime = null;
    var target = 30000;
    var timer;
    var count = 0;
    var digits = [1];
    var factorial = Σ.addFunction(function α22vH() {
        var Σ_α22vH = new Σ.Scope(this, Σ, α22vH, function() {
            return this.capture({}, {});
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
            if (count === target / 2){
                Σ.pauseTimers();
                var started = Date.now();
                var safe = Σ.snapshot();
                var elapsed = Date.now() - started;
                process.send({ time_taken: elapsed, snapshot: safe });
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
    var printInterval = Σ.addFunction(function αNkJz() {
        var Σ_αNkJz = new Σ.Scope(this, Σ, αNkJz, function() {
            return this.capture({}, {});
        });
        Σ.console.log('Currently computing n = ' + count + ', number of digits = ' + digits.length);
    }, Σ);
    timer = Σ.setInterval(printInterval, 500);
}(require('things-js').bootstrap('mqtt://localhost', 'factorial.js')));