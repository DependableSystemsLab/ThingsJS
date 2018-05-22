(function(Σ) {
    Σ.hoist([
        [
            runNavierStokes,
            Σ
        ],
        [
            checkResult,
            Σ
        ],
        [
            voidFunc,
            Σ
        ],
        [
            setupNavierStokes,
            Σ
        ],
        [
            tearDownNavierStokes,
            Σ
        ],
        [
            addPoints,
            Σ
        ],
        [
            prepareFrame,
            Σ
        ],
        [
            FluidField,
            Σ
        ],
        [
            BM_Start,
            Σ
        ]
    ]);
    Σ.refs.solver = null;
    Σ.refs.nsFrameCounter = 0;

    function runNavierStokes() {
        var Σ_0 = new Σ.Scope(this, runNavierStokes, '0', Σ, {}, []);
        Σ.refs.solver.update();
        Σ.refs.nsFrameCounter++;
        if (Σ.refs.nsFrameCounter == 15) {
            Σ.refs.checkResult(Σ.refs.solver.getDens());
        }
    }

    function checkResult(dens) {
        var Σ_1 = new Σ.Scope(this, checkResult, '1', Σ, {
            dens: dens
        }, []);
        this.result = 0;
        for (Σ_1.refs.i = 7000; Σ_1.refs.i < 7100; Σ_1.refs.i++) {
            this.result += ~~(Σ_1.refs.dens[Σ_1.refs.i] * 10);
        }
        if (this.result != 77) {
            throw new Error('checksum failed');
        }
    }

    function voidFunc() {
        var Σ_2 = new Σ.Scope(this, voidFunc, '2', Σ, {}, []);
    }

    function setupNavierStokes() {
        var Σ_3 = new Σ.Scope(this, setupNavierStokes, '3', Σ, {}, []);
        Σ.refs.solver = new Σ.refs.FluidField(null);
        Σ.refs.solver.setResolution(128, 128);
        Σ.refs.solver.setIterations(20);
        Σ.refs.solver.setDisplayFunction(Σ.refs.voidFunc);
        Σ.refs.solver.setUICallback(Σ.refs.prepareFrame);
        Σ.refs.solver.reset();
    }

    function tearDownNavierStokes() {
        var Σ_4 = new Σ.Scope(this, tearDownNavierStokes, '4', Σ, {}, []);
        Σ.refs.solver = null;
    }

    function addPoints(field) {
        var Σ_5 = new Σ.Scope(this, addPoints, '5', Σ, {
            field: field
        }, []);
        Σ_5.refs.n = 64;
        for (Σ_5.refs.i = 1; Σ_5.refs.i <= Σ_5.refs.n; Σ_5.refs.i++) {
            Σ_5.refs.field.setVelocity(Σ_5.refs.i, Σ_5.refs.i, Σ_5.refs.n, Σ_5.refs.n);
            Σ_5.refs.field.setDensity(Σ_5.refs.i, Σ_5.refs.i, 5);
            Σ_5.refs.field.setVelocity(Σ_5.refs.i, Σ_5.refs.n - Σ_5.refs.i, -Σ_5.refs.n, -Σ_5.refs.n);
            Σ_5.refs.field.setDensity(Σ_5.refs.i, Σ_5.refs.n - Σ_5.refs.i, 20);
            Σ_5.refs.field.setVelocity(128 - Σ_5.refs.i, Σ_5.refs.n + Σ_5.refs.i, -Σ_5.refs.n, -Σ_5.refs.n);
            Σ_5.refs.field.setDensity(128 - Σ_5.refs.i, Σ_5.refs.n + Σ_5.refs.i, 30);
        }
    }
    Σ.refs.framesTillAddingPoints = 0;
    Σ.refs.framesBetweenAddingPoints = 5;

    function prepareFrame(field) {
        var Σ_6 = new Σ.Scope(this, prepareFrame, '6', Σ, {
            field: field
        }, []);
        if (Σ.refs.framesTillAddingPoints == 0) {
            Σ.refs.addPoints(Σ_6.refs.field);
            Σ.refs.framesTillAddingPoints = Σ.refs.framesBetweenAddingPoints;
            Σ.refs.framesBetweenAddingPoints++;
        } else {
            Σ.refs.framesTillAddingPoints--;
        }
    }

    function FluidField(canvas) {
        var Σ_7 = new Σ.Scope(this, FluidField, '7', Σ, {
            canvas: canvas
        }, [
            [
                addFields,
                Σ_7
            ],
            [
                set_bnd,
                Σ_7
            ],
            [
                lin_solve,
                Σ_7
            ],
            [
                diffuse,
                Σ_7
            ],
            [
                lin_solve2,
                Σ_7
            ],
            [
                diffuse2,
                Σ_7
            ],
            [
                advect,
                Σ_7
            ],
            [
                project,
                Σ_7
            ],
            [
                dens_step,
                Σ_7
            ],
            [
                vel_step,
                Σ_7
            ],
            [
                Field,
                Σ_7
            ],
            [
                queryUI,
                Σ_7
            ],
            [
                reset,
                Σ_7
            ]
        ]);
        Σ_7.refs.iterations = 10;
        Σ_7.refs.visc = 0.5;
        Σ_7.refs.dt = 0.1;
        Σ_7.refs.dens = undefined;
        Σ_7.refs.dens_prev = undefined;
        Σ_7.refs.u = undefined;
        Σ_7.refs.u_prev = undefined;
        Σ_7.refs.v = undefined;
        Σ_7.refs.v_prev = undefined;
        Σ_7.refs.width = undefined;
        Σ_7.refs.height = undefined;
        Σ_7.refs.rowSize = undefined;
        Σ_7.refs.size = undefined;
        Σ_7.refs.displayFunc = undefined;

        function addFields(x, s, dt) {
            var Σ_7_0 = new Σ.Scope(this, addFields, '0', Σ_7, {
                x: x,
                s: s,
                dt: dt
            }, []);
            for (Σ_7_0.refs.i = 0; Σ_7_0.refs.i < Σ_7.refs.size; Σ_7_0.refs.i++) {
                Σ_7_0.refs.x[Σ_7_0.refs.i] += Σ_7_0.refs.dt * Σ_7_0.refs.s[Σ_7_0.refs.i];
            }
        }

        function set_bnd(b, x) {
            var Σ_7_1 = new Σ.Scope(this, set_bnd, '1', Σ_7, {
                b: b,
                x: x
            }, []);
            if (Σ_7_1.refs.b === 1) {
                for (Σ_7_1.refs.i = 1; Σ_7_1.refs.i <= Σ_7.refs.width; Σ_7_1.refs.i++) {
                    Σ_7_1.refs.x[Σ_7_1.refs.i] = Σ_7_1.refs.x[Σ_7_1.refs.i + Σ_7.refs.rowSize];
                    Σ_7_1.refs.x[Σ_7_1.refs.i + (Σ_7.refs.height + 1) * Σ_7.refs.rowSize] = Σ_7_1.refs.x[Σ_7_1.refs.i + Σ_7.refs.height * Σ_7.refs.rowSize];
                }
                for (Σ_7_1.refs.j = 1; Σ_7_1.refs.j <= Σ_7.refs.height; Σ_7_1.refs.j++) {
                    Σ_7_1.refs.x[Σ_7_1.refs.j * Σ_7.refs.rowSize] = -Σ_7_1.refs.x[1 + Σ_7_1.refs.j * Σ_7.refs.rowSize];
                    Σ_7_1.refs.x[Σ_7.refs.width + 1 + Σ_7_1.refs.j * Σ_7.refs.rowSize] = -Σ_7_1.refs.x[Σ_7.refs.width + Σ_7_1.refs.j * Σ_7.refs.rowSize];
                }
            } else if (Σ_7_1.refs.b === 2) {
                for (Σ_7_1.refs.i = 1; Σ_7_1.refs.i <= Σ_7.refs.width; Σ_7_1.refs.i++) {
                    Σ_7_1.refs.x[Σ_7_1.refs.i] = -Σ_7_1.refs.x[Σ_7_1.refs.i + Σ_7.refs.rowSize];
                    Σ_7_1.refs.x[Σ_7_1.refs.i + (Σ_7.refs.height + 1) * Σ_7.refs.rowSize] = -Σ_7_1.refs.x[Σ_7_1.refs.i + Σ_7.refs.height * Σ_7.refs.rowSize];
                }
                for (Σ_7_1.refs.j = 1; Σ_7_1.refs.j <= Σ_7.refs.height; Σ_7_1.refs.j++) {
                    Σ_7_1.refs.x[Σ_7_1.refs.j * Σ_7.refs.rowSize] = Σ_7_1.refs.x[1 + Σ_7_1.refs.j * Σ_7.refs.rowSize];
                    Σ_7_1.refs.x[Σ_7.refs.width + 1 + Σ_7_1.refs.j * Σ_7.refs.rowSize] = Σ_7_1.refs.x[Σ_7.refs.width + Σ_7_1.refs.j * Σ_7.refs.rowSize];
                }
            } else {
                for (Σ_7_1.refs.i = 1; Σ_7_1.refs.i <= Σ_7.refs.width; Σ_7_1.refs.i++) {
                    Σ_7_1.refs.x[Σ_7_1.refs.i] = Σ_7_1.refs.x[Σ_7_1.refs.i + Σ_7.refs.rowSize];
                    Σ_7_1.refs.x[Σ_7_1.refs.i + (Σ_7.refs.height + 1) * Σ_7.refs.rowSize] = Σ_7_1.refs.x[Σ_7_1.refs.i + Σ_7.refs.height * Σ_7.refs.rowSize];
                }
                for (Σ_7_1.refs.j = 1; Σ_7_1.refs.j <= Σ_7.refs.height; Σ_7_1.refs.j++) {
                    Σ_7_1.refs.x[Σ_7_1.refs.j * Σ_7.refs.rowSize] = Σ_7_1.refs.x[1 + Σ_7_1.refs.j * Σ_7.refs.rowSize];
                    Σ_7_1.refs.x[Σ_7.refs.width + 1 + Σ_7_1.refs.j * Σ_7.refs.rowSize] = Σ_7_1.refs.x[Σ_7.refs.width + Σ_7_1.refs.j * Σ_7.refs.rowSize];
                }
            }
            Σ_7_1.refs.maxEdge = (Σ_7.refs.height + 1) * Σ_7.refs.rowSize;
            Σ_7_1.refs.x[0] = 0.5 * (Σ_7_1.refs.x[1] + Σ_7_1.refs.x[Σ_7.refs.rowSize]);
            Σ_7_1.refs.x[Σ_7_1.refs.maxEdge] = 0.5 * (Σ_7_1.refs.x[1 + Σ_7_1.refs.maxEdge] + Σ_7_1.refs.x[Σ_7.refs.height * Σ_7.refs.rowSize]);
            Σ_7_1.refs.x[Σ_7.refs.width + 1] = 0.5 * (Σ_7_1.refs.x[Σ_7.refs.width] + Σ_7_1.refs.x[Σ_7.refs.width + 1 + Σ_7.refs.rowSize]);
            Σ_7_1.refs.x[Σ_7.refs.width + 1 + Σ_7_1.refs.maxEdge] = 0.5 * (Σ_7_1.refs.x[Σ_7.refs.width + Σ_7_1.refs.maxEdge] + Σ_7_1.refs.x[Σ_7.refs.width + 1 + Σ_7.refs.height * Σ_7.refs.rowSize]);
        }

        function lin_solve(b, x, x0, a, c) {
            var Σ_7_2 = new Σ.Scope(this, lin_solve, '2', Σ_7, {
                b: b,
                x: x,
                x0: x0,
                a: a,
                c: c
            }, []);
            if (Σ_7_2.refs.a === 0 && Σ_7_2.refs.c === 1) {
                for (Σ_7_2.refs.j = 1; Σ_7_2.refs.j <= Σ_7.refs.height; Σ_7_2.refs.j++) {
                    Σ_7_2.refs.currentRow = Σ_7_2.refs.j * Σ_7.refs.rowSize;
                    ++Σ_7_2.refs.currentRow;
                    for (Σ_7_2.refs.i = 0; Σ_7_2.refs.i < Σ_7.refs.width; Σ_7_2.refs.i++) {
                        Σ_7_2.refs.x[Σ_7_2.refs.currentRow] = Σ_7_2.refs.x0[Σ_7_2.refs.currentRow];
                        ++Σ_7_2.refs.currentRow;
                    }
                }
                Σ_7.refs.set_bnd(Σ_7_2.refs.b, Σ_7_2.refs.x);
            } else {
                Σ_7_2.refs.invC = 1 / Σ_7_2.refs.c;
                for (Σ_7_2.refs.k = 0; Σ_7_2.refs.k < Σ_7.refs.iterations; Σ_7_2.refs.k++) {
                    for (Σ_7_2.refs.j = 1; Σ_7_2.refs.j <= Σ_7.refs.height; Σ_7_2.refs.j++) {
                        Σ_7_2.refs.lastRow = (Σ_7_2.refs.j - 1) * Σ_7.refs.rowSize;
                        Σ_7_2.refs.currentRow = Σ_7_2.refs.j * Σ_7.refs.rowSize;
                        Σ_7_2.refs.nextRow = (Σ_7_2.refs.j + 1) * Σ_7.refs.rowSize;
                        Σ_7_2.refs.lastX = Σ_7_2.refs.x[Σ_7_2.refs.currentRow];
                        ++Σ_7_2.refs.currentRow;
                        for (Σ_7_2.refs.i = 1; Σ_7_2.refs.i <= Σ_7.refs.width; Σ_7_2.refs.i++) {
                            Σ_7_2.refs.lastX = Σ_7_2.refs.x[Σ_7_2.refs.currentRow] = (Σ_7_2.refs.x0[Σ_7_2.refs.currentRow] + Σ_7_2.refs.a * (Σ_7_2.refs.lastX + Σ_7_2.refs.x[++Σ_7_2.refs.currentRow] + Σ_7_2.refs.x[++Σ_7_2.refs.lastRow] + Σ_7_2.refs.x[++Σ_7_2.refs.nextRow])) * Σ_7_2.refs.invC;
                        }
                    }
                    Σ_7.refs.set_bnd(Σ_7_2.refs.b, Σ_7_2.refs.x);
                }
            }
        }

        function diffuse(b, x, x0, dt) {
            var Σ_7_3 = new Σ.Scope(this, diffuse, '3', Σ_7, {
                b: b,
                x: x,
                x0: x0,
                dt: dt
            }, []);
            Σ_7_3.refs.a = 0;
            Σ_7.refs.lin_solve(Σ_7_3.refs.b, Σ_7_3.refs.x, Σ_7_3.refs.x0, Σ_7_3.refs.a, 1 + 4 * Σ_7_3.refs.a);
        }

        function lin_solve2(x, x0, y, y0, a, c) {
            var Σ_7_4 = new Σ.Scope(this, lin_solve2, '4', Σ_7, {
                x: x,
                x0: x0,
                y: y,
                y0: y0,
                a: a,
                c: c
            }, []);
            if (Σ_7_4.refs.a === 0 && Σ_7_4.refs.c === 1) {
                for (Σ_7_4.refs.j = 1; Σ_7_4.refs.j <= Σ_7.refs.height; Σ_7_4.refs.j++) {
                    Σ_7_4.refs.currentRow = Σ_7_4.refs.j * Σ_7.refs.rowSize;
                    ++Σ_7_4.refs.currentRow;
                    for (Σ_7_4.refs.i = 0; Σ_7_4.refs.i < Σ_7.refs.width; Σ_7_4.refs.i++) {
                        Σ_7_4.refs.x[Σ_7_4.refs.currentRow] = Σ_7_4.refs.x0[Σ_7_4.refs.currentRow];
                        Σ_7_4.refs.y[Σ_7_4.refs.currentRow] = Σ_7_4.refs.y0[Σ_7_4.refs.currentRow];
                        ++Σ_7_4.refs.currentRow;
                    }
                }
                Σ_7.refs.set_bnd(1, Σ_7_4.refs.x);
                Σ_7.refs.set_bnd(2, Σ_7_4.refs.y);
            } else {
                Σ_7_4.refs.invC = 1 / Σ_7_4.refs.c;
                for (Σ_7_4.refs.k = 0; Σ_7_4.refs.k < Σ_7.refs.iterations; Σ_7_4.refs.k++) {
                    for (Σ_7_4.refs.j = 1; Σ_7_4.refs.j <= Σ_7.refs.height; Σ_7_4.refs.j++) {
                        Σ_7_4.refs.lastRow = (Σ_7_4.refs.j - 1) * Σ_7.refs.rowSize;
                        Σ_7_4.refs.currentRow = Σ_7_4.refs.j * Σ_7.refs.rowSize;
                        Σ_7_4.refs.nextRow = (Σ_7_4.refs.j + 1) * Σ_7.refs.rowSize;
                        Σ_7_4.refs.lastX = Σ_7_4.refs.x[Σ_7_4.refs.currentRow];
                        Σ_7_4.refs.lastY = Σ_7_4.refs.y[Σ_7_4.refs.currentRow];
                        ++Σ_7_4.refs.currentRow;
                        for (Σ_7_4.refs.i = 1; Σ_7_4.refs.i <= Σ_7.refs.width; Σ_7_4.refs.i++) {
                            Σ_7_4.refs.lastX = Σ_7_4.refs.x[Σ_7_4.refs.currentRow] = (Σ_7_4.refs.x0[Σ_7_4.refs.currentRow] + Σ_7_4.refs.a * (Σ_7_4.refs.lastX + Σ_7_4.refs.x[Σ_7_4.refs.currentRow] + Σ_7_4.refs.x[Σ_7_4.refs.lastRow] + Σ_7_4.refs.x[Σ_7_4.refs.nextRow])) * Σ_7_4.refs.invC;
                            Σ_7_4.refs.lastY = Σ_7_4.refs.y[Σ_7_4.refs.currentRow] = (Σ_7_4.refs.y0[Σ_7_4.refs.currentRow] + Σ_7_4.refs.a * (Σ_7_4.refs.lastY + Σ_7_4.refs.y[++Σ_7_4.refs.currentRow] + Σ_7_4.refs.y[++Σ_7_4.refs.lastRow] + Σ_7_4.refs.y[++Σ_7_4.refs.nextRow])) * Σ_7_4.refs.invC;
                        }
                    }
                    Σ_7.refs.set_bnd(1, Σ_7_4.refs.x);
                    Σ_7.refs.set_bnd(2, Σ_7_4.refs.y);
                }
            }
        }

        function diffuse2(x, x0, y, y0, dt) {
            var Σ_7_5 = new Σ.Scope(this, diffuse2, '5', Σ_7, {
                x: x,
                x0: x0,
                y: y,
                y0: y0,
                dt: dt
            }, []);
            Σ_7_5.refs.a = 0;
            Σ_7.refs.lin_solve2(Σ_7_5.refs.x, Σ_7_5.refs.x0, Σ_7_5.refs.y, Σ_7_5.refs.y0, Σ_7_5.refs.a, 1 + 4 * Σ_7_5.refs.a);
        }

        function advect(b, d, d0, u, v, dt) {
            var Σ_7_6 = new Σ.Scope(this, advect, '6', Σ_7, {
                b: b,
                d: d,
                d0: d0,
                u: u,
                v: v,
                dt: dt
            }, []);
            Σ_7_6.refs.Wdt0 = Σ_7_6.refs.dt * Σ_7.refs.width;
            Σ_7_6.refs.Hdt0 = Σ_7_6.refs.dt * Σ_7.refs.height;
            Σ_7_6.refs.Wp5 = Σ_7.refs.width + 0.5;
            Σ_7_6.refs.Hp5 = Σ_7.refs.height + 0.5;
            for (Σ_7_6.refs.j = 1; Σ_7_6.refs.j <= Σ_7.refs.height; Σ_7_6.refs.j++) {
                Σ_7_6.refs.pos = Σ_7_6.refs.j * Σ_7.refs.rowSize;
                for (Σ_7_6.refs.i = 1; Σ_7_6.refs.i <= Σ_7.refs.width; Σ_7_6.refs.i++) {
                    Σ_7_6.refs.x = Σ_7_6.refs.i - Σ_7_6.refs.Wdt0 * Σ_7_6.refs.u[++Σ_7_6.refs.pos];
                    Σ_7_6.refs.y = Σ_7_6.refs.j - Σ_7_6.refs.Hdt0 * Σ_7_6.refs.v[Σ_7_6.refs.pos];
                    if (Σ_7_6.refs.x < 0.5) {
                        Σ_7_6.refs.x = 0.5;
                    } else if (Σ_7_6.refs.x > Σ_7_6.refs.Wp5) {
                        Σ_7_6.refs.x = Σ_7_6.refs.Wp5;
                    }
                    Σ_7_6.refs.i0 = Σ_7_6.refs.x | 0;
                    Σ_7_6.refs.i1 = Σ_7_6.refs.i0 + 1;
                    if (Σ_7_6.refs.y < 0.5) {
                        Σ_7_6.refs.y = 0.5;
                    } else if (Σ_7_6.refs.y > Σ_7_6.refs.Hp5) {
                        Σ_7_6.refs.y = Σ_7_6.refs.Hp5;
                    }
                    Σ_7_6.refs.j0 = Σ_7_6.refs.y | 0;
                    Σ_7_6.refs.j1 = Σ_7_6.refs.j0 + 1;
                    Σ_7_6.refs.s1 = Σ_7_6.refs.x - Σ_7_6.refs.i0;
                    Σ_7_6.refs.s0 = 1 - Σ_7_6.refs.s1;
                    Σ_7_6.refs.t1 = Σ_7_6.refs.y - Σ_7_6.refs.j0;
                    Σ_7_6.refs.t0 = 1 - Σ_7_6.refs.t1;
                    Σ_7_6.refs.row1 = Σ_7_6.refs.j0 * Σ_7.refs.rowSize;
                    Σ_7_6.refs.row2 = Σ_7_6.refs.j1 * Σ_7.refs.rowSize;
                    Σ_7_6.refs.d[Σ_7_6.refs.pos] = Σ_7_6.refs.s0 * (Σ_7_6.refs.t0 * Σ_7_6.refs.d0[Σ_7_6.refs.i0 + Σ_7_6.refs.row1] + Σ_7_6.refs.t1 * Σ_7_6.refs.d0[Σ_7_6.refs.i0 + Σ_7_6.refs.row2]) + Σ_7_6.refs.s1 * (Σ_7_6.refs.t0 * Σ_7_6.refs.d0[Σ_7_6.refs.i1 + Σ_7_6.refs.row1] + Σ_7_6.refs.t1 * Σ_7_6.refs.d0[Σ_7_6.refs.i1 + Σ_7_6.refs.row2]);
                }
            }
            Σ_7.refs.set_bnd(Σ_7_6.refs.b, Σ_7_6.refs.d);
        }

        function project(u, v, p, div) {
            var Σ_7_7 = new Σ.Scope(this, project, '7', Σ_7, {
                u: u,
                v: v,
                p: p,
                div: div
            }, []);
            Σ_7_7.refs.h = -0.5 / Math.sqrt(Σ_7.refs.width * Σ_7.refs.height);
            for (Σ_7_7.refs.j = 1; Σ_7_7.refs.j <= Σ_7.refs.height; Σ_7_7.refs.j++) {
                Σ_7_7.refs.row = Σ_7_7.refs.j * Σ_7.refs.rowSize;
                Σ_7_7.refs.previousRow = (Σ_7_7.refs.j - 1) * Σ_7.refs.rowSize;
                Σ_7_7.refs.prevValue = Σ_7_7.refs.row - 1;
                Σ_7_7.refs.currentRow = Σ_7_7.refs.row;
                Σ_7_7.refs.nextValue = Σ_7_7.refs.row + 1;
                Σ_7_7.refs.nextRow = (Σ_7_7.refs.j + 1) * Σ_7.refs.rowSize;
                for (Σ_7_7.refs.i = 1; Σ_7_7.refs.i <= Σ_7.refs.width; Σ_7_7.refs.i++) {
                    Σ_7_7.refs.div[++Σ_7_7.refs.currentRow] = Σ_7_7.refs.h * (Σ_7_7.refs.u[++Σ_7_7.refs.nextValue] - Σ_7_7.refs.u[++Σ_7_7.refs.prevValue] + Σ_7_7.refs.v[++Σ_7_7.refs.nextRow] - Σ_7_7.refs.v[++Σ_7_7.refs.previousRow]);
                    Σ_7_7.refs.p[Σ_7_7.refs.currentRow] = 0;
                }
            }
            Σ_7.refs.set_bnd(0, Σ_7_7.refs.div);
            Σ_7.refs.set_bnd(0, Σ_7_7.refs.p);
            Σ_7.refs.lin_solve(0, Σ_7_7.refs.p, Σ_7_7.refs.div, 1, 4);
            Σ_7_7.refs.wScale = 0.5 * Σ_7.refs.width;
            Σ_7_7.refs.hScale = 0.5 * Σ_7.refs.height;
            for (Σ_7_7.refs.j = 1; Σ_7_7.refs.j <= Σ_7.refs.height; Σ_7_7.refs.j++) {
                Σ_7_7.refs.prevPos = Σ_7_7.refs.j * Σ_7.refs.rowSize - 1;
                Σ_7_7.refs.currentPos = Σ_7_7.refs.j * Σ_7.refs.rowSize;
                Σ_7_7.refs.nextPos = Σ_7_7.refs.j * Σ_7.refs.rowSize + 1;
                Σ_7_7.refs.prevRow = (Σ_7_7.refs.j - 1) * Σ_7.refs.rowSize;
                Σ_7_7.refs.currentRow = Σ_7_7.refs.j * Σ_7.refs.rowSize;
                Σ_7_7.refs.nextRow = (Σ_7_7.refs.j + 1) * Σ_7.refs.rowSize;
                for (Σ_7_7.refs.i = 1; Σ_7_7.refs.i <= Σ_7.refs.width; Σ_7_7.refs.i++) {
                    Σ_7_7.refs.u[++Σ_7_7.refs.currentPos] -= Σ_7_7.refs.wScale * (Σ_7_7.refs.p[++Σ_7_7.refs.nextPos] - Σ_7_7.refs.p[++Σ_7_7.refs.prevPos]);
                    Σ_7_7.refs.v[Σ_7_7.refs.currentPos] -= Σ_7_7.refs.hScale * (Σ_7_7.refs.p[++Σ_7_7.refs.nextRow] - Σ_7_7.refs.p[++Σ_7_7.refs.prevRow]);
                }
            }
            Σ_7.refs.set_bnd(1, Σ_7_7.refs.u);
            Σ_7.refs.set_bnd(2, Σ_7_7.refs.v);
        }

        function dens_step(x, x0, u, v, dt) {
            var Σ_7_8 = new Σ.Scope(this, dens_step, '8', Σ_7, {
                x: x,
                x0: x0,
                u: u,
                v: v,
                dt: dt
            }, []);
            Σ_7.refs.addFields(Σ_7_8.refs.x, Σ_7_8.refs.x0, Σ_7_8.refs.dt);
            Σ_7.refs.diffuse(0, Σ_7_8.refs.x0, Σ_7_8.refs.x, Σ_7_8.refs.dt);
            Σ_7.refs.advect(0, Σ_7_8.refs.x, Σ_7_8.refs.x0, Σ_7_8.refs.u, Σ_7_8.refs.v, Σ_7_8.refs.dt);
        }

        function vel_step(u, v, u0, v0, dt) {
            var Σ_7_9 = new Σ.Scope(this, vel_step, '9', Σ_7, {
                u: u,
                v: v,
                u0: u0,
                v0: v0,
                dt: dt
            }, []);
            Σ_7.refs.addFields(Σ_7_9.refs.u, Σ_7_9.refs.u0, Σ_7_9.refs.dt);
            Σ_7.refs.addFields(Σ_7_9.refs.v, Σ_7_9.refs.v0, Σ_7_9.refs.dt);
            Σ_7_9.refs.temp = Σ_7_9.refs.u0;
            Σ_7_9.refs.u0 = Σ_7_9.refs.u;
            Σ_7_9.refs.u = Σ_7_9.refs.temp;
            Σ_7_9.refs.temp = Σ_7_9.refs.v0;
            Σ_7_9.refs.v0 = Σ_7_9.refs.v;
            Σ_7_9.refs.v = Σ_7_9.refs.temp;
            Σ_7.refs.diffuse2(Σ_7_9.refs.u, Σ_7_9.refs.u0, Σ_7_9.refs.v, Σ_7_9.refs.v0, Σ_7_9.refs.dt);
            Σ_7.refs.project(Σ_7_9.refs.u, Σ_7_9.refs.v, Σ_7_9.refs.u0, Σ_7_9.refs.v0);
            Σ_7_9.refs.temp = Σ_7_9.refs.u0;
            Σ_7_9.refs.u0 = Σ_7_9.refs.u;
            Σ_7_9.refs.u = Σ_7_9.refs.temp;
            Σ_7_9.refs.temp = Σ_7_9.refs.v0;
            Σ_7_9.refs.v0 = Σ_7_9.refs.v;
            Σ_7_9.refs.v = Σ_7_9.refs.temp;
            Σ_7.refs.advect(1, Σ_7_9.refs.u, Σ_7_9.refs.u0, Σ_7_9.refs.u0, Σ_7_9.refs.v0, Σ_7_9.refs.dt);
            Σ_7.refs.advect(2, Σ_7_9.refs.v, Σ_7_9.refs.v0, Σ_7_9.refs.u0, Σ_7_9.refs.v0, Σ_7_9.refs.dt);
            Σ_7.refs.project(Σ_7_9.refs.u, Σ_7_9.refs.v, Σ_7_9.refs.u0, Σ_7_9.refs.v0);
        }
        Σ_7.refs.uiCallback = Σ_7.addFunction(function αOMkq(d, u, v) {
            var Σ_7_10 = new Σ.Scope(this, αOMkq, '10', Σ_7, {
                d: d,
                u: u,
                v: v
            }, []);
        }, Σ_7);

        function Field(dens, u, v) {
            var Σ_7_11 = new Σ.Scope(this, Field, '11', Σ_7, {
                dens: dens,
                u: u,
                v: v
            }, []);
            this.setDensity = Σ_7_11.addFunction(function α4doq(x, y, d) {
                var Σ_7_11_0 = new Σ.Scope(this, α4doq, '0', Σ_7_11, {
                    x: x,
                    y: y,
                    d: d
                }, []);
                Σ_7_11.refs.dens[Σ_7_11_0.refs.x + 1 + (Σ_7_11_0.refs.y + 1) * Σ_7.refs.rowSize] = Σ_7_11_0.refs.d;
            }, Σ_7_11);
            this.getDensity = Σ_7_11.addFunction(function αfWb9(x, y) {
                var Σ_7_11_1 = new Σ.Scope(this, αfWb9, '1', Σ_7_11, {
                    x: x,
                    y: y
                }, []);
                return Σ_7_11.refs.dens[Σ_7_11_1.refs.x + 1 + (Σ_7_11_1.refs.y + 1) * Σ_7.refs.rowSize];
            }, Σ_7_11);
            this.setVelocity = Σ_7_11.addFunction(function αTbLp(x, y, xv, yv) {
                var Σ_7_11_2 = new Σ.Scope(this, αTbLp, '2', Σ_7_11, {
                    x: x,
                    y: y,
                    xv: xv,
                    yv: yv
                }, []);
                Σ_7_11.refs.u[Σ_7_11_2.refs.x + 1 + (Σ_7_11_2.refs.y + 1) * Σ_7.refs.rowSize] = Σ_7_11_2.refs.xv;
                Σ_7_11.refs.v[Σ_7_11_2.refs.x + 1 + (Σ_7_11_2.refs.y + 1) * Σ_7.refs.rowSize] = Σ_7_11_2.refs.yv;
            }, Σ_7_11);
            this.getXVelocity = Σ_7_11.addFunction(function α1BfF(x, y) {
                var Σ_7_11_3 = new Σ.Scope(this, α1BfF, '3', Σ_7_11, {
                    x: x,
                    y: y
                }, []);
                return Σ_7_11.refs.u[Σ_7_11_3.refs.x + 1 + (Σ_7_11_3.refs.y + 1) * Σ_7.refs.rowSize];
            }, Σ_7_11);
            this.getYVelocity = Σ_7_11.addFunction(function α1OqW(x, y) {
                var Σ_7_11_4 = new Σ.Scope(this, α1OqW, '4', Σ_7_11, {
                    x: x,
                    y: y
                }, []);
                return Σ_7_11.refs.v[Σ_7_11_4.refs.x + 1 + (Σ_7_11_4.refs.y + 1) * Σ_7.refs.rowSize];
            }, Σ_7_11);
            this.width = Σ_7_11.addFunction(function αeVZL() {
                var Σ_7_11_5 = new Σ.Scope(this, αeVZL, '5', Σ_7_11, {}, []);
                return Σ_7.refs.width;
            }, Σ_7_11);
            this.height = Σ_7_11.addFunction(function αpPAD() {
                var Σ_7_11_6 = new Σ.Scope(this, αpPAD, '6', Σ_7_11, {}, []);
                return Σ_7.refs.height;
            }, Σ_7_11);
        }

        function queryUI(d, u, v) {
            var Σ_7_12 = new Σ.Scope(this, queryUI, '12', Σ_7, {
                d: d,
                u: u,
                v: v
            }, []);
            for (Σ_7_12.refs.i = 0; Σ_7_12.refs.i < Σ_7.refs.size; Σ_7_12.refs.i++) {
                Σ_7_12.refs.u[Σ_7_12.refs.i] = Σ_7_12.refs.v[Σ_7_12.refs.i] = Σ_7_12.refs.d[Σ_7_12.refs.i] = 0;
            }
            Σ_7.refs.uiCallback(new Σ_7.refs.Field(Σ_7_12.refs.d, Σ_7_12.refs.u, Σ_7_12.refs.v));
        }

        function reset() {
            var Σ_7_13 = new Σ.Scope(this, reset, '13', Σ_7, {}, []);
            Σ_7.refs.rowSize = Σ_7.refs.width + 2;
            Σ_7.refs.size = (Σ_7.refs.width + 2) * (Σ_7.refs.height + 2);
            Σ_7.refs.dens = new Array(Σ_7.refs.size);
            Σ_7.refs.dens_prev = new Array(Σ_7.refs.size);
            Σ_7.refs.u = new Array(Σ_7.refs.size);
            Σ_7.refs.u_prev = new Array(Σ_7.refs.size);
            Σ_7.refs.v = new Array(Σ_7.refs.size);
            Σ_7.refs.v_prev = new Array(Σ_7.refs.size);
            for (Σ_7_13.refs.i = 0; Σ_7_13.refs.i < Σ_7.refs.size; Σ_7_13.refs.i++) {
                Σ_7.refs.dens_prev[Σ_7_13.refs.i] = Σ_7.refs.u_prev[Σ_7_13.refs.i] = Σ_7.refs.v_prev[Σ_7_13.refs.i] = Σ_7.refs.dens[Σ_7_13.refs.i] = Σ_7.refs.u[Σ_7_13.refs.i] = Σ_7.refs.v[Σ_7_13.refs.i] = 0;
            }
        }
        this.reset = Σ_7.refs.reset;
        this.getDens = Σ_7.addFunction(function αDLpd() {
            var Σ_7_14 = new Σ.Scope(this, αDLpd, '14', Σ_7, {}, []);
            return Σ_7.refs.dens;
        }, Σ_7);
        this.setResolution = Σ_7.addFunction(function αR7dI(hRes, wRes) {
            var Σ_7_15 = new Σ.Scope(this, αR7dI, '15', Σ_7, {
                hRes: hRes,
                wRes: wRes
            }, []);
            Σ_7_15.refs.res = Σ_7_15.refs.wRes * Σ_7_15.refs.hRes;
            if (Σ_7_15.refs.res > 0 && Σ_7_15.refs.res < 1000000 && (Σ_7_15.refs.wRes != Σ_7.refs.width || Σ_7_15.refs.hRes != Σ_7.refs.height)) {
                Σ_7.refs.width = Σ_7_15.refs.wRes;
                Σ_7.refs.height = Σ_7_15.refs.hRes;
                Σ_7.refs.reset();
                return true;
            }
            return false;
        }, Σ_7);
        this.setResolution(64, 64);
        this.update = Σ_7.addFunction(function αufG0() {
            var Σ_7_16 = new Σ.Scope(this, αufG0, '16', Σ_7, {}, []);
            Σ_7.refs.queryUI(Σ_7.refs.dens_prev, Σ_7.refs.u_prev, Σ_7.refs.v_prev);
            Σ_7.refs.vel_step(Σ_7.refs.u, Σ_7.refs.v, Σ_7.refs.u_prev, Σ_7.refs.v_prev, Σ_7.refs.dt);
            Σ_7.refs.dens_step(Σ_7.refs.dens, Σ_7.refs.dens_prev, Σ_7.refs.u, Σ_7.refs.v, Σ_7.refs.dt);
            Σ_7.refs.displayFunc(new Σ_7.refs.Field(Σ_7.refs.dens, Σ_7.refs.u, Σ_7.refs.v));
        }, Σ_7);
        this.setDisplayFunction = Σ_7.addFunction(function αb92Z(func) {
            var Σ_7_17 = new Σ.Scope(this, αb92Z, '17', Σ_7, {
                func: func
            }, []);
            Σ_7.refs.displayFunc = Σ_7_17.refs.func;
        }, Σ_7);
        this.iterations = Σ_7.addFunction(function αeloJ() {
            var Σ_7_18 = new Σ.Scope(this, αeloJ, '18', Σ_7, {}, []);
            return Σ_7.refs.iterations;
        }, Σ_7);
        this.setIterations = Σ_7.addFunction(function αvaqc(iters) {
            var Σ_7_19 = new Σ.Scope(this, αvaqc, '19', Σ_7, {
                iters: iters
            }, []);
            if (Σ_7_19.refs.iters > 0 && Σ_7_19.refs.iters <= 100) {
                Σ_7.refs.iterations = Σ_7_19.refs.iters;
            }
        }, Σ_7);
        this.setUICallback = Σ_7.addFunction(function αNJUG(callback) {
            var Σ_7_20 = new Σ.Scope(this, αNJUG, '20', Σ_7, {
                callback: callback
            }, []);
            Σ_7.refs.uiCallback = Σ_7_20.refs.callback;
        }, Σ_7);
    }
    Σ.refs.performance = {};
    Σ.refs.performance.now = Σ.addFunction(function αjTrD() {
        var Σ_8 = new Σ.Scope(this, αjTrD, '8', Σ, {}, []);
        return Date.now();
    }, Σ);
    Σ.refs.BM_RunFunc = Σ.refs.runNavierStokes;
    Σ.refs.BM_SetupFunc = Σ.refs.setupNavierStokes;
    Σ.refs.BM_TearDownFunc = Σ.refs.tearDownNavierStokes;
    Σ.refs.BM_Iterations = 3000;
    Σ.refs.BM_Min_Iterations = 16;
    Σ.refs.BM_Results = [];

    function BM_Start() {
        var Σ_9 = new Σ.Scope(this, BM_Start, '9', Σ, {}, [
            [
                doRun,
                Σ_9
            ]
        ]);
        Σ.refs.BM_SetupFunc();
        Σ_9.refs.data = {
            runs: 0,
            elapsed: 0
        };
        Σ_9.refs.elapsed = 0;
        Σ_9.refs.start = Date.now();
        Σ_9.refs.end = null;
        Σ_9.refs.i = 0;

        function doRun() {
            var Σ_9_0 = new Σ.Scope(this, doRun, '0', Σ_9, {}, []);
            Σ.log('Iteration : ' + Σ_9.refs.i);
            Σ.refs.BM_RunFunc();
            Σ_9.refs.elapsed = Date.now() - Σ_9.refs.start;
            Σ_9.refs.i++;
            if (Σ_9.refs.i < Σ.refs.BM_Iterations) {
                Σ.setImmediate(doRun.τwrapped);
            } else {
                if (Σ_9.refs.data != null) {
                    Σ_9.refs.data.runs += Σ_9.refs.i;
                    Σ_9.refs.data.elapsed += Σ_9.refs.elapsed;
                }
                Σ.log('Runs: ' + Σ_9.refs.data.runs + '\t|\tElapsed: ' + Σ_9.refs.data.elapsed);
                Σ_9.refs.end = Date.now();
                Σ.log('Total time : ' + (Σ_9.refs.end - Σ_9.refs.start) + ' ms');
                Σ_9_0.refs.usec = Σ_9.refs.data.elapsed * 1000 / Σ_9.refs.data.runs;
                Σ_9_0.refs.rms = 0;
                Σ.refs.BM_Results.push({
                    time: Σ_9_0.refs.usec,
                    latency: Σ_9_0.refs.rms
                });
                process.exit();
            }
        }
        Σ.setImmediate(Σ_9.refs.doRun);
    }
    Σ.refs.BM_Start();
}(require('things-js').bootstrap('mqtt://localhost', 'navier-stokes.js')));