require('things-js/lib/core/Code').bootstrap(module, function (Σ) {
    var start = Date.now();
    process.send({ tag: 'mid' });
    Σ.setTimeout(Σ.addFunction(function α0() {
        process.send({
            tag: 'end',
            elapsed: Date.now() - start
        });
    }, Σ), 10000);
}, 'mqtt://localhost', 'empty.exec.js', {});
