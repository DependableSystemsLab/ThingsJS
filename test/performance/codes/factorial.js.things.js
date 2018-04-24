(function(Σ) {
    Σ.refs.startTime = null, Σ.refs.endTime = null;
    Σ.refs.target = 25000;
    Σ.refs.timer = undefined;
    Σ.refs.count = 0;
    Σ.refs.digits = [1];
    Σ.refs.factorial = Σ.addFunction(function α1WNe() {
        var Σ_0 = new Σ.Scope(this, α1WNe, '0', Σ, {}, []);
        Σ.refs.count++;
        Σ_0.refs.carry = 0;
        Σ_0.refs.product = 0;
        for (Σ_0.refs.i = 0; Σ_0.refs.i < Σ.refs.digits.length; Σ_0.refs.i++) {
            Σ_0.refs.product = Σ.refs.digits[Σ_0.refs.i] * Σ.refs.count;
            Σ_0.refs.product += Σ_0.refs.carry;
            Σ.refs.digits[Σ_0.refs.i] = Σ_0.refs.product % 10;
            Σ_0.refs.carry = Math.floor(Σ_0.refs.product / 10);
        }
        while (Σ_0.refs.carry > 0) {
            Σ.refs.digits.push(Σ_0.refs.carry % 10);
            Σ_0.refs.carry = Math.floor(Σ_0.refs.carry / 10);
        }
        if (Σ.refs.count < Σ.refs.target) {
            if (Σ.refs.count === Σ.refs.target / 2){
                process.send({ ctrl: 'ready' })
            }
            Σ.setImmediate(Σ.refs.factorial);
        } else {
            Σ.refs.digits.reverse();
            Σ_0.refs.value = Σ.refs.digits.join('');
            Σ.clearInterval(Σ.refs.timer);
            Σ.log('<<< Computation Finished >>>');
            Σ.log('factorial(' + Σ.refs.target + ') = ' + Σ_0.refs.value);
            Σ.refs.endTime = Date.now();
            Σ.log('Time taken : ' + (Σ.refs.endTime - Σ.refs.startTime) + ' ms');
        }
    }, Σ);
    Σ.refs.startTime = Date.now();
    Σ.setImmediate(Σ.refs.factorial);
    Σ.refs.printInterval = Σ.addFunction(function αy3B6() {
        var Σ_1 = new Σ.Scope(this, αy3B6, '1', Σ, {}, []);
        Σ.log('Currently computing n = ' + Σ.refs.count + ', number of digits = ' + Σ.refs.digits.length);
    }, Σ);
    Σ.refs.timer = Σ.setInterval(Σ.refs.printInterval, 500);
}(require('things-js').bootstrap('mqtt://localhost', 'factorial.js')));