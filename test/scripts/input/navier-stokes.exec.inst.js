require('things-js/lib/core/Code').bootstrap(module, function (Σ) {
    Σ.setExtractor(function () {
        return [
            {},
            {
                solver: solver,
                nsFrameCounter: nsFrameCounter,
                framesTillAddingPoints: framesTillAddingPoints,
                framesBetweenAddingPoints: framesBetweenAddingPoints,
                performance: performance,
                BM_RunFunc: BM_RunFunc,
                BM_SetupFunc: BM_SetupFunc,
                BM_TearDownFunc: BM_TearDownFunc,
                BM_Iterations: BM_Iterations,
                BM_Min_Iterations: BM_Min_Iterations,
                BM_Results: BM_Results
            }
        ];
    }).hoist(runNavierStokes, Σ).hoist(checkResult, Σ).hoist(voidFunc, Σ).hoist(setupNavierStokes, Σ).hoist(tearDownNavierStokes, Σ).hoist(addPoints, Σ).hoist(prepareFrame, Σ).hoist(FluidField, Σ).hoist(BM_Start, Σ);
    var solver = null;
    var nsFrameCounter = 0;
    function runNavierStokes() {
        solver.update();
        nsFrameCounter++;
        if (nsFrameCounter == 15) {
            checkResult(solver.getDens());
        }
    }
    function checkResult(dens) {
        this.result = 0;
        for (var i = 7000; i < 7100; i++) {
            this.result += ~~(dens[i] * 10);
        }
        if (this.result != 77) {
            throw new Error('checksum failed');
        }
    }
    function voidFunc() {
    }
    function setupNavierStokes() {
        solver = new FluidField(null);
        solver.setResolution(128, 128);
        solver.setIterations(20);
        solver.setDisplayFunction(voidFunc);
        solver.setUICallback(prepareFrame);
        solver.reset();
    }
    function tearDownNavierStokes() {
        solver = null;
    }
    function addPoints(field) {
        var Σ_addPoints = new Σ.Scope(this, Σ, addPoints, function () {
            return [
                { field: field },
                { n: n }
            ];
        });
        var n = 64;
        for (var i = 1; i <= n; i++) {
            field.setVelocity(i, i, n, n);
            field.setDensity(i, i, 5);
            field.setVelocity(i, n - i, -n, -n);
            field.setDensity(i, n - i, 20);
            field.setVelocity(128 - i, n + i, -n, -n);
            field.setDensity(128 - i, n + i, 30);
        }
    }
    var framesTillAddingPoints = 0;
    var framesBetweenAddingPoints = 5;
    function prepareFrame(field) {
        if (framesTillAddingPoints == 0) {
            addPoints(field);
            framesTillAddingPoints = framesBetweenAddingPoints;
            framesBetweenAddingPoints++;
        } else {
            framesTillAddingPoints--;
        }
    }
    function FluidField(canvas) {
        var Σ_FluidField = new Σ.Scope(this, Σ, FluidField, function () {
            return [
                { canvas: canvas },
                {
                    iterations: iterations,
                    visc: visc,
                    dt: dt,
                    dens: dens,
                    dens_prev: dens_prev,
                    u: u,
                    u_prev: u_prev,
                    v: v,
                    v_prev: v_prev,
                    width: width,
                    height: height,
                    rowSize: rowSize,
                    size: size,
                    displayFunc: displayFunc,
                    uiCallback: uiCallback
                }
            ];
        }).hoist(addFields, Σ_FluidField).hoist(set_bnd, Σ_FluidField).hoist(lin_solve, Σ_FluidField).hoist(diffuse, Σ_FluidField).hoist(lin_solve2, Σ_FluidField).hoist(diffuse2, Σ_FluidField).hoist(advect, Σ_FluidField).hoist(project, Σ_FluidField).hoist(dens_step, Σ_FluidField).hoist(vel_step, Σ_FluidField).hoist(Field, Σ_FluidField).hoist(queryUI, Σ_FluidField).hoist(reset, Σ_FluidField);
        var iterations = 10;
        var visc = 0.5;
        var dt = 0.1;
        var dens;
        var dens_prev;
        var u;
        var u_prev;
        var v;
        var v_prev;
        var width;
        var height;
        var rowSize;
        var size;
        var displayFunc;
        function addFields(x, s, dt) {
            for (var i = 0; i < size; i++) {
                x[i] += dt * s[i];
            }
        }
        function set_bnd(b, x) {
            var Σ_FluidField_set_bnd = new Σ.Scope(this, Σ_FluidField, set_bnd, function () {
                return [
                    {
                        b: b,
                        x: x
                    },
                    { maxEdge: maxEdge }
                ];
            });
            if (b === 1) {
                for (var i = 1; i <= width; i++) {
                    x[i] = x[i + rowSize];
                    x[i + (height + 1) * rowSize] = x[i + height * rowSize];
                }
                for (var j = 1; j <= height; j++) {
                    x[j * rowSize] = -x[1 + j * rowSize];
                    x[width + 1 + j * rowSize] = -x[width + j * rowSize];
                }
            } else if (b === 2) {
                for (var i = 1; i <= width; i++) {
                    x[i] = -x[i + rowSize];
                    x[i + (height + 1) * rowSize] = -x[i + height * rowSize];
                }
                for (var j = 1; j <= height; j++) {
                    x[j * rowSize] = x[1 + j * rowSize];
                    x[width + 1 + j * rowSize] = x[width + j * rowSize];
                }
            } else {
                for (var i = 1; i <= width; i++) {
                    x[i] = x[i + rowSize];
                    x[i + (height + 1) * rowSize] = x[i + height * rowSize];
                }
                for (var j = 1; j <= height; j++) {
                    x[j * rowSize] = x[1 + j * rowSize];
                    x[width + 1 + j * rowSize] = x[width + j * rowSize];
                }
            }
            var maxEdge = (height + 1) * rowSize;
            x[0] = 0.5 * (x[1] + x[rowSize]);
            x[maxEdge] = 0.5 * (x[1 + maxEdge] + x[height * rowSize]);
            x[width + 1] = 0.5 * (x[width] + x[width + 1 + rowSize]);
            x[width + 1 + maxEdge] = 0.5 * (x[width + maxEdge] + x[width + 1 + height * rowSize]);
        }
        function lin_solve(b, x, x0, a, c) {
            if (a === 0 && c === 1) {
                for (var j = 1; j <= height; j++) {
                    var currentRow = j * rowSize;
                    ++currentRow;
                    for (var i = 0; i < width; i++) {
                        x[currentRow] = x0[currentRow];
                        ++currentRow;
                    }
                }
                set_bnd(b, x);
            } else {
                var invC = 1 / c;
                for (var k = 0; k < iterations; k++) {
                    for (var j = 1; j <= height; j++) {
                        var lastRow = (j - 1) * rowSize;
                        var currentRow = j * rowSize;
                        var nextRow = (j + 1) * rowSize;
                        var lastX = x[currentRow];
                        ++currentRow;
                        for (var i = 1; i <= width; i++) {
                            lastX = x[currentRow] = (x0[currentRow] + a * (lastX + x[++currentRow] + x[++lastRow] + x[++nextRow])) * invC;
                        }
                    }
                    set_bnd(b, x);
                }
            }
        }
        function diffuse(b, x, x0, dt) {
            var Σ_FluidField_diffuse = new Σ.Scope(this, Σ_FluidField, diffuse, function () {
                return [
                    {
                        b: b,
                        x: x,
                        x0: x0,
                        dt: dt
                    },
                    { a: a }
                ];
            });
            var a = 0;
            lin_solve(b, x, x0, a, 1 + 4 * a);
        }
        function lin_solve2(x, x0, y, y0, a, c) {
            if (a === 0 && c === 1) {
                for (var j = 1; j <= height; j++) {
                    var currentRow = j * rowSize;
                    ++currentRow;
                    for (var i = 0; i < width; i++) {
                        x[currentRow] = x0[currentRow];
                        y[currentRow] = y0[currentRow];
                        ++currentRow;
                    }
                }
                set_bnd(1, x);
                set_bnd(2, y);
            } else {
                var invC = 1 / c;
                for (var k = 0; k < iterations; k++) {
                    for (var j = 1; j <= height; j++) {
                        var lastRow = (j - 1) * rowSize;
                        var currentRow = j * rowSize;
                        var nextRow = (j + 1) * rowSize;
                        var lastX = x[currentRow];
                        var lastY = y[currentRow];
                        ++currentRow;
                        for (var i = 1; i <= width; i++) {
                            lastX = x[currentRow] = (x0[currentRow] + a * (lastX + x[currentRow] + x[lastRow] + x[nextRow])) * invC;
                            lastY = y[currentRow] = (y0[currentRow] + a * (lastY + y[++currentRow] + y[++lastRow] + y[++nextRow])) * invC;
                        }
                    }
                    set_bnd(1, x);
                    set_bnd(2, y);
                }
            }
        }
        function diffuse2(x, x0, y, y0, dt) {
            var Σ_FluidField_diffuse2 = new Σ.Scope(this, Σ_FluidField, diffuse2, function () {
                return [
                    {
                        x: x,
                        x0: x0,
                        y: y,
                        y0: y0,
                        dt: dt
                    },
                    { a: a }
                ];
            });
            var a = 0;
            lin_solve2(x, x0, y, y0, a, 1 + 4 * a);
        }
        function advect(b, d, d0, u, v, dt) {
            var Σ_FluidField_advect = new Σ.Scope(this, Σ_FluidField, advect, function () {
                return [
                    {
                        b: b,
                        d: d,
                        d0: d0,
                        u: u,
                        v: v,
                        dt: dt
                    },
                    {
                        Wdt0: Wdt0,
                        Hdt0: Hdt0,
                        Wp5: Wp5,
                        Hp5: Hp5
                    }
                ];
            });
            var Wdt0 = dt * width;
            var Hdt0 = dt * height;
            var Wp5 = width + 0.5;
            var Hp5 = height + 0.5;
            for (var j = 1; j <= height; j++) {
                var pos = j * rowSize;
                for (var i = 1; i <= width; i++) {
                    var x = i - Wdt0 * u[++pos];
                    var y = j - Hdt0 * v[pos];
                    if (x < 0.5) {
                        x = 0.5;
                    } else if (x > Wp5) {
                        x = Wp5;
                    }
                    var i0 = x | 0;
                    var i1 = i0 + 1;
                    if (y < 0.5) {
                        y = 0.5;
                    } else if (y > Hp5) {
                        y = Hp5;
                    }
                    var j0 = y | 0;
                    var j1 = j0 + 1;
                    var s1 = x - i0;
                    var s0 = 1 - s1;
                    var t1 = y - j0;
                    var t0 = 1 - t1;
                    var row1 = j0 * rowSize;
                    var row2 = j1 * rowSize;
                    d[pos] = s0 * (t0 * d0[i0 + row1] + t1 * d0[i0 + row2]) + s1 * (t0 * d0[i1 + row1] + t1 * d0[i1 + row2]);
                }
            }
            set_bnd(b, d);
        }
        function project(u, v, p, div) {
            var Σ_FluidField_project = new Σ.Scope(this, Σ_FluidField, project, function () {
                return [
                    {
                        u: u,
                        v: v,
                        p: p,
                        div: div
                    },
                    {
                        h: h,
                        wScale: wScale,
                        hScale: hScale
                    }
                ];
            });
            var h = -0.5 / Math.sqrt(width * height);
            for (var j = 1; j <= height; j++) {
                var row = j * rowSize;
                var previousRow = (j - 1) * rowSize;
                var prevValue = row - 1;
                var currentRow = row;
                var nextValue = row + 1;
                var nextRow = (j + 1) * rowSize;
                for (var i = 1; i <= width; i++) {
                    div[++currentRow] = h * (u[++nextValue] - u[++prevValue] + v[++nextRow] - v[++previousRow]);
                    p[currentRow] = 0;
                }
            }
            set_bnd(0, div);
            set_bnd(0, p);
            lin_solve(0, p, div, 1, 4);
            var wScale = 0.5 * width;
            var hScale = 0.5 * height;
            for (var j = 1; j <= height; j++) {
                var prevPos = j * rowSize - 1;
                var currentPos = j * rowSize;
                var nextPos = j * rowSize + 1;
                var prevRow = (j - 1) * rowSize;
                var currentRow = j * rowSize;
                var nextRow = (j + 1) * rowSize;
                for (var i = 1; i <= width; i++) {
                    u[++currentPos] -= wScale * (p[++nextPos] - p[++prevPos]);
                    v[currentPos] -= hScale * (p[++nextRow] - p[++prevRow]);
                }
            }
            set_bnd(1, u);
            set_bnd(2, v);
        }
        function dens_step(x, x0, u, v, dt) {
            addFields(x, x0, dt);
            diffuse(0, x0, x, dt);
            advect(0, x, x0, u, v, dt);
        }
        function vel_step(u, v, u0, v0, dt) {
            var Σ_FluidField_vel_step = new Σ.Scope(this, Σ_FluidField, vel_step, function () {
                return [
                    {
                        u: u,
                        v: v,
                        u0: u0,
                        v0: v0,
                        dt: dt
                    },
                    { temp: temp }
                ];
            });
            addFields(u, u0, dt);
            addFields(v, v0, dt);
            var temp = u0;
            u0 = u;
            u = temp;
            var temp = v0;
            v0 = v;
            v = temp;
            diffuse2(u, u0, v, v0, dt);
            project(u, v, u0, v0);
            var temp = u0;
            u0 = u;
            u = temp;
            var temp = v0;
            v0 = v;
            v = temp;
            advect(1, u, u0, u0, v0, dt);
            advect(2, v, v0, u0, v0, dt);
            project(u, v, u0, v0);
        }
        var uiCallback = Σ_FluidField.addFunction(function α0(d, u, v) {
        }, Σ_FluidField);
        function Field(dens, u, v) {
            this.setDensity = function α1(x, y, d) {
                dens[x + 1 + (y + 1) * rowSize] = d;
            };
            this.getDensity = function α2(x, y) {
                return dens[x + 1 + (y + 1) * rowSize];
            };
            this.setVelocity = function α3(x, y, xv, yv) {
                u[x + 1 + (y + 1) * rowSize] = xv;
                v[x + 1 + (y + 1) * rowSize] = yv;
            };
            this.getXVelocity = function α4(x, y) {
                return u[x + 1 + (y + 1) * rowSize];
            };
            this.getYVelocity = function α5(x, y) {
                return v[x + 1 + (y + 1) * rowSize];
            };
            this.width = function α6() {
                return width;
            };
            this.height = function α7() {
                return height;
            };
        }
        function queryUI(d, u, v) {
            for (var i = 0; i < size; i++) {
                u[i] = v[i] = d[i] = 0;
            }
            uiCallback(new Field(d, u, v));
        }
        function reset() {
            rowSize = width + 2;
            size = (width + 2) * (height + 2);
            dens = new Array(size);
            dens_prev = new Array(size);
            u = new Array(size);
            u_prev = new Array(size);
            v = new Array(size);
            v_prev = new Array(size);
            for (var i = 0; i < size; i++) {
                dens_prev[i] = u_prev[i] = v_prev[i] = dens[i] = u[i] = v[i] = 0;
            }
        }
        this.reset = reset;
        this.getDens = Σ_FluidField.addFunction(function α8() {
            return dens;
        }, Σ_FluidField);
        this.setResolution = Σ_FluidField.addFunction(function α9(hRes, wRes) {
            var Σ_FluidField_α9 = new Σ.Scope(this, Σ_FluidField, α9, function () {
                return [
                    {
                        hRes: hRes,
                        wRes: wRes
                    },
                    { res: res }
                ];
            });
            var res = wRes * hRes;
            if (res > 0 && res < 1000000 && (wRes != width || hRes != height)) {
                width = wRes;
                height = hRes;
                reset();
                return true;
            }
            return false;
        }, Σ_FluidField);
        this.setResolution(64, 64);
        this.update = Σ_FluidField.addFunction(function α10() {
            queryUI(dens_prev, u_prev, v_prev);
            vel_step(u, v, u_prev, v_prev, dt);
            dens_step(dens, dens_prev, u, v, dt);
            displayFunc(new Field(dens, u, v));
        }, Σ_FluidField);
        this.setDisplayFunction = Σ_FluidField.addFunction(function α11(func) {
            displayFunc = func;
        }, Σ_FluidField);
        this.iterations = Σ_FluidField.addFunction(function α12() {
            return iterations;
        }, Σ_FluidField);
        this.setIterations = Σ_FluidField.addFunction(function α13(iters) {
            if (iters > 0 && iters <= 100) {
                iterations = iters;
            }
        }, Σ_FluidField);
        this.setUICallback = Σ_FluidField.addFunction(function α14(callback) {
            uiCallback = callback;
        }, Σ_FluidField);
    }
    var performance = {};
    performance.now = Σ.addFunction(function α15() {
        return Date.now();
    }, Σ);
    var BM_RunFunc = runNavierStokes;
    var BM_SetupFunc = setupNavierStokes;
    var BM_TearDownFunc = tearDownNavierStokes;
    var BM_Iterations = 3000;
    var BM_Min_Iterations = 16;
    var BM_Results = [];
    function BM_Start() {
        var Σ_BM_Start = new Σ.Scope(this, Σ, BM_Start, function () {
            return [
                {},
                {
                    data: data,
                    elapsed: elapsed,
                    start: start,
                    end: end,
                    i: i
                }
            ];
        }).hoist(doRun, Σ_BM_Start);
        BM_SetupFunc();
        var data = {
            runs: 0,
            elapsed: 0
        };
        var elapsed = 0;
        var start = Date.now();
        var mid = null;
        var end = null;
        var i = 0;
        function doRun() {
            Σ.console.log('Iteration : ' + i);
            BM_RunFunc();
            elapsed = Date.now() - start;
            i++;
            if (i < BM_Iterations) {
                if (i === BM_Iterations / 2 + 1){
                    mid = Date.now();
                    process.send({ tag: "mid" });
                }
                Σ.setImmediate(doRun);
            } else {
                if (data != null) {
                    data.runs += i;
                    data.elapsed += elapsed;
                }
                Σ.console.log('Runs: ' + data.runs + '\t|\tElapsed: ' + data.elapsed);
                end = Date.now();
                Σ.console.log('Total time : ' + (end - start) + ' ms');
                var usec = data.elapsed * 1000 / data.runs;
                var rms = 0;
                BM_Results.push({
                    time: usec,
                    latency: rms
                });
                process.send({ tag: "end", elapsed: end - mid });
            }
        }
        Σ.setImmediate(doRun);
    }
    BM_Start();
}, 'mqtt://localhost', 'navier-stokes.js', {});
