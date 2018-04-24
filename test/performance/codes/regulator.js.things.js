(function(Σ) {
    Σ.hoist([
        [
            randomKey,
            Σ
        ],
        [
            computeAverage,
            Σ
        ],
        [
            getSensor,
            Σ
        ],
        [
            getHeater,
            Σ
        ],
        [
            setOutput,
            Σ
        ]
    ]);

    function randomKey(length, charset) {
        var Σ_0 = new Σ.Scope(this, randomKey, '0', Σ, {
            length: length,
            charset: charset
        }, []);
        Σ_0.refs.text = '';
        if (!Σ_0.refs.length) {
            Σ_0.refs.length = 8;
        }
        if (!Σ_0.refs.charset) {
            Σ_0.refs.charset = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        }
        for (Σ_0.refs.i = 0; Σ_0.refs.i < Σ_0.refs.length; Σ_0.refs.i++) {
            Σ_0.refs.text += Σ_0.refs.charset.charAt(Math.floor(Math.random() * Σ_0.refs.charset.length));
        }
        return Σ_0.refs.text;
    };
    Σ.refs.currentAverage = null;
    Σ.refs.targetTemperature = 240;
    Σ.refs.sensorData = {};
    Σ.refs.heaterData = {};
    Σ.refs.tempVal = null;

    function computeAverage(data) {
        var Σ_1 = new Σ.Scope(this, computeAverage, '1', Σ, {
            data: data
        }, []);
        Σ_1.refs.t = 0;
        Σ_1.refs.c = 0;
        for (var key in data) {
            if (data[key]) {
                t += data[key];
                c++;
            }
        }
        return Σ_1.refs.t / Σ_1.refs.c;
    }

    function getSensor(url) {
        var Σ_2 = new Σ.Scope(this, getSensor, '2', Σ, {
            url: url
        }, []);
        Σ_2.refs.id = 'sensor-' + Σ.refs.randomKey();
        Σ_2.refs.data = [];
        Σ_2.refs.timer = undefined;
        Σ_2.refs.onDataRead = Σ_2.addFunction(function αfcuX() {
            var Σ_2_0 = new Σ.Scope(this, αfcuX, '0', Σ_2, {}, []);
            Σ_2_0.refs.readVal = Math.random() * 50 + 180;
            Σ_2.refs.data.unshift(Σ_2_0.refs.readVal);
            if (Σ_2.refs.data.length === 1000) {
                Σ_2.refs.data.splice(999, 1);
            }
            Σ.refs.sensorData[Σ_2.refs.id] = Σ_2_0.refs.readVal;
            Σ.refs.currentAverage = Σ.refs.computeAverage(Σ.refs.sensorData);
            Σ.log('Sensor [' + Σ_2.refs.id + '] reads -> ' + Σ.refs.currentAverage / 10 + ' degrees');
        }, Σ_2);
        return Σ_2.addFunction(function αUnvv() {
            var Σ_2_1 = new Σ.Scope(this, αUnvv, '1', Σ_2, {}, []);
            Σ_2.refs.timer = Σ.setInterval(Σ_2.refs.onDataRead, 500);
        }, Σ_2);
    }

    function getHeater(url) {
        var Σ_3 = new Σ.Scope(this, getHeater, '3', Σ, {
            url: url
        }, []);
        Σ_3.refs.id = 'heater-' + Σ.refs.randomKey();
        return Σ_3.addFunction(function α1j8g(output) {
            var Σ_3_0 = new Σ.Scope(this, α1j8g, '0', Σ_3, {
                output: output
            }, []);
            Σ.refs.tempVal = Σ_3_0.refs.output;
            Σ.refs.heaterData[Σ_3.refs.id] = Σ.refs.tempVal;
            Σ.log('Heater [' + Σ_3.refs.id + '] output -> ' + Σ_3_0.refs.output + 'W');
        }, Σ_3);
    };
    Σ.refs.sensor1 = Σ.refs.getSensor('mqtt://192.168.50.11');
    Σ.refs.sensor2 = Σ.refs.getSensor('mqtt://192.168.50.12');
    Σ.refs.sensor3 = Σ.refs.getSensor('mqtt://192.168.50.13');
    Σ.refs.heater1 = Σ.refs.getHeater('mqtt://192.168.0.50');
    Σ.refs.heater2 = Σ.refs.getHeater('mqtt://192.168.0.51');

    function setOutput() {
        var Σ_4 = new Σ.Scope(this, setOutput, '4', Σ, {}, []);
        Σ_4.refs.output = Σ.refs.targetTemperature - Σ.refs.currentAverage;
        if (Σ_4.refs.output < 0) {
            Σ_4.refs.output = 0;
        } else {
            Σ_4.refs.output = Σ_4.refs.output * 10;
        }
        Σ.refs.heater1(Σ_4.refs.output);
        Σ.refs.heater2(Σ_4.refs.output);
    }
    Σ.refs.sensor1();
    Σ.refs.sensor2();
    Σ.refs.sensor3();
    Σ.setInterval(Σ.refs.setOutput, 500);
}(require('things-js').bootstrap('mqtt://localhost', 'regulator.js')));