require('things-js/lib/core/Code').bootstrap(module, function(Σ) {
    Σ.setExtractor(function() {
        return [{}, {
            checkNumber: checkNumber,
            Class: Class,
            performance: performance,
            BM_RunFunc: BM_RunFunc,
            BM_SetupFunc: BM_SetupFunc,
            BM_TearDownFunc: BM_TearDownFunc,
            BM_RMS: BM_RMS,
            BM_Iterations: BM_Iterations,
            BM_Min_Iterations: BM_Min_Iterations,
            BM_Results: BM_Results,
            Flog: Flog
        }]
    }).hoist(renderScene, Σ).hoist(BM_Start, Σ);

    function renderScene() {
        var Σ_renderScene = new Σ.Scope(this, Σ, renderScene, function() {
            return [{},
                {
                    scene: scene,
                    sphere: sphere,
                    sphere1: sphere1,
                    plane: plane,
                    light: light,
                    light1: light1,
                    imageWidth: imageWidth,
                    imageHeight: imageHeight,
                    pixelSize: pixelSize,
                    renderDiffuse: renderDiffuse,
                    renderShadows: renderShadows,
                    renderHighlights: renderHighlights,
                    renderReflections: renderReflections,
                    rayDepth: rayDepth,
                    raytracer: raytracer
                }
            ];
        });
        var scene = new Flog.RayTracer.Scene();
        scene.camera = new Flog.RayTracer.Camera(new Flog.RayTracer.Vector(0, 0, -15), new Flog.RayTracer.Vector(-0.2, 0, 5), new Flog.RayTracer.Vector(0, 1, 0));
        scene.background = new Flog.RayTracer.Background(new Flog.RayTracer.Color(0.5, 0.5, 0.5), 0.4);
        var sphere = new Flog.RayTracer.Shape.Sphere(new Flog.RayTracer.Vector(-1.5, 1.5, 2), 1.5, new Flog.RayTracer.Material.Solid(new Flog.RayTracer.Color(0, 0.5, 0.5), 0.3, 0, 0, 2));
        var sphere1 = new Flog.RayTracer.Shape.Sphere(new Flog.RayTracer.Vector(1, 0.25, 1), 0.5, new Flog.RayTracer.Material.Solid(new Flog.RayTracer.Color(0.9, 0.9, 0.9), 0.1, 0, 0, 1.5));
        var plane = new Flog.RayTracer.Shape.Plane(new Flog.RayTracer.Vector(0.1, 0.9, -0.5).normalize(), 1.2, new Flog.RayTracer.Material.Chessboard(new Flog.RayTracer.Color(1, 1, 1), new Flog.RayTracer.Color(0, 0, 0), 0.2, 0, 1, 0.7));
        scene.shapes.push(plane);
        scene.shapes.push(sphere);
        scene.shapes.push(sphere1);
        var light = new Flog.RayTracer.Light(new Flog.RayTracer.Vector(5, 10, -1), new Flog.RayTracer.Color(0.8, 0.8, 0.8));
        var light1 = new Flog.RayTracer.Light(new Flog.RayTracer.Vector(-3, 5, -15), new Flog.RayTracer.Color(0.8, 0.8, 0.8), 100);
        scene.lights.push(light);
        scene.lights.push(light1);
        var imageWidth = 100;
        var imageHeight = 100;
        var pixelSize = '5,5'.split(',');
        var renderDiffuse = true;
        var renderShadows = true;
        var renderHighlights = true;
        var renderReflections = true;
        var rayDepth = 2;
        var raytracer = new Flog.RayTracer.Engine({
            canvasWidth: imageWidth,
            canvasHeight: imageHeight,
            pixelWidth: pixelSize[0],
            pixelHeight: pixelSize[1],
            'renderDiffuse': renderDiffuse,
            'renderHighlights': renderHighlights,
            'renderShadows': renderShadows,
            'renderReflections': renderReflections,
            'rayDepth': rayDepth
        });
        raytracer.renderScene(scene, null, 0);
    };

    function BM_Start() {
        var Σ_BM_Start = new Σ.Scope(this, Σ, BM_Start, function() {
            return [{},
                {
                    data: data,
                    elapsed: elapsed,
                    start: start,
                    end: end,
                    i: i
                }
            ];
        }).hoist(doRun, Σ_BM_Start);
        var data = {
            runs: 0,
            elapsed: 0
        };
        var elapsed = 0;
        var start = Date.now();
        var end = null;
        var i = 0;

        function doRun() {
            var Σ_BM_Start_doRun = new Σ.Scope(this, Σ_BM_Start, doRun, function() {
                return [{},
                    {
                        usec: usec,
                        rms: rms
                    }
                ];
            });
            BM_SetupFunc();
            Σ.console.log('Iteration : ' + i);
            BM_RunFunc();
            elapsed = Date.now() - start;
            BM_TearDownFunc();
            i++;
            if (i < BM_Iterations) {
                if (i === BM_Iterations / 2) {
                    Σ.pauseTimers();
                    var started = Date.now();
                    var safe = Σ.snapshot();
                    var elapsed = Date.now() - started;
                    process.send({
                        time_taken: elapsed,
                        snapshot: safe
                    });
                } else Σ.setImmediate(doRun);
            } else {
                if (data != null) {
                    data.runs += i;
                    data.elapsed += elapsed;
                }
                Σ.console.log('Runs: ' + data.runs + '\t|\tElapsed: ' + data.elapsed);
                end = Date.now();
                Σ.console.log('Total time : ' + (end - start) + ' ms');
                var usec = data.elapsed * 1000 / data.runs;
                var rms = BM_RMS ? BM_RMS() : 0;
                BM_Results.push({
                    time: usec,
                    latency: rms
                });
                process.exit();
            }
        }
        Σ.setImmediate(doRun);
    };
    Σ.addFunction(function αQGho() {
        var Σ_αQGho = new Σ.Scope(this, Σ, αQGho, function() {
            return [{},
                {}
            ];
        });
        return Σ_αQGho.addFunction(function αn8tS() {
            this.initialize.apply(this, arguments);
        }, Σ_αQGho);
    }, Σ, "αQGho-V4FmWjaV");
    Σ.addFunction(function αFlax(destination, source) {
        var Σ_αFlax = new Σ.Scope(this, Σ, αFlax, function() {
            return [{
                    destination: destination,
                    source: source
                },
                {
                    property: property
                }
            ];
        });
        for (var property in source) {
            destination[property] = source[property];
        }
        return destination;
    }, Σ, "αFlax-lh8HERzZ");
    Σ.addFunction(function αRF6n(r, g, b) {
        var Σ_αRF6n = new Σ.Scope(this, Σ, αRF6n, function() {
            return [{
                    r: r,
                    g: g,
                    b: b
                },
                {}
            ];
        });
        if (!r) {
            r = 0;
        }
        if (!g) {
            g = 0;
        }
        if (!b) {
            b = 0;
        }
        this.red = r;
        this.green = g;
        this.blue = b;
    }, Σ, "αRF6n-ZdJlkxVI");
    Σ.addFunction(function αnT6m(c1, c2) {
        var Σ_αnT6m = new Σ.Scope(this, Σ, αnT6m, function() {
            return [{
                    c1: c1,
                    c2: c2
                },
                {
                    result: result
                }
            ];
        });
        var result = new Flog.RayTracer.Color(0, 0, 0);
        result.red = c1.red + c2.red;
        result.green = c1.green + c2.green;
        result.blue = c1.blue + c2.blue;
        return result;
    }, Σ, "αnT6m-SaZUVplt");
    Σ.addFunction(function αb2PC(c1, s) {
        var Σ_αb2PC = new Σ.Scope(this, Σ, αb2PC, function() {
            return [{
                    c1: c1,
                    s: s
                },
                {
                    result: result
                }
            ];
        });
        var result = new Flog.RayTracer.Color(0, 0, 0);
        result.red = c1.red + s;
        result.green = c1.green + s;
        result.blue = c1.blue + s;
        result.limit();
        return result;
    }, Σ, "αb2PC-e8OEYWGT");
    Σ.addFunction(function α0Z5T(c1, c2) {
        var Σ_α0Z5T = new Σ.Scope(this, Σ, α0Z5T, function() {
            return [{
                    c1: c1,
                    c2: c2
                },
                {
                    result: result
                }
            ];
        });
        var result = new Flog.RayTracer.Color(0, 0, 0);
        result.red = c1.red - c2.red;
        result.green = c1.green - c2.green;
        result.blue = c1.blue - c2.blue;
        return result;
    }, Σ, "α0Z5T-TW0WxyYo");
    Σ.addFunction(function αundy(c1, c2) {
        var Σ_αundy = new Σ.Scope(this, Σ, αundy, function() {
            return [{
                    c1: c1,
                    c2: c2
                },
                {
                    result: result
                }
            ];
        });
        var result = new Flog.RayTracer.Color(0, 0, 0);
        result.red = c1.red * c2.red;
        result.green = c1.green * c2.green;
        result.blue = c1.blue * c2.blue;
        return result;
    }, Σ, "αundy-V0zT2VJL");
    Σ.addFunction(function αvwEO(c1, f) {
        var Σ_αvwEO = new Σ.Scope(this, Σ, αvwEO, function() {
            return [{
                    c1: c1,
                    f: f
                },
                {
                    result: result
                }
            ];
        });
        var result = new Flog.RayTracer.Color(0, 0, 0);
        result.red = c1.red * f;
        result.green = c1.green * f;
        result.blue = c1.blue * f;
        return result;
    }, Σ, "αvwEO-vh3EpTGs");
    Σ.addFunction(function αQEtz(c1, f) {
        var Σ_αQEtz = new Σ.Scope(this, Σ, αQEtz, function() {
            return [{
                    c1: c1,
                    f: f
                },
                {
                    result: result
                }
            ];
        });
        var result = new Flog.RayTracer.Color(0, 0, 0);
        result.red = c1.red / f;
        result.green = c1.green / f;
        result.blue = c1.blue / f;
        return result;
    }, Σ, "αQEtz-itirq8Fj");
    Σ.addFunction(function αYo1X() {
        this.red = this.red > 0 ? this.red > 1 ? 1 : this.red : 0;
        this.green = this.green > 0 ? this.green > 1 ? 1 : this.green : 0;
        this.blue = this.blue > 0 ? this.blue > 1 ? 1 : this.blue : 0;
    }, Σ, "αYo1X-M9HTZHwU");
    Σ.addFunction(function α2zfk(color) {
        var Σ_α2zfk = new Σ.Scope(this, Σ, α2zfk, function() {
            return [{
                    color: color
                },
                {
                    d: d
                }
            ];
        });
        var d = Math.abs(this.red - color.red) + Math.abs(this.green - color.green) + Math.abs(this.blue - color.blue);
        return d;
    }, Σ, "α2zfk-sa3Tpx5v");
    Σ.addFunction(function αcO1n(c1, c2, w) {
        var Σ_αcO1n = new Σ.Scope(this, Σ, αcO1n, function() {
            return [{
                    c1: c1,
                    c2: c2,
                    w: w
                },
                {
                    result: result
                }
            ];
        });
        var result = new Flog.RayTracer.Color(0, 0, 0);
        result = Flog.RayTracer.Color.prototype.add(Flog.RayTracer.Color.prototype.multiplyScalar(c1, 1 - w), Flog.RayTracer.Color.prototype.multiplyScalar(c2, w));
        return result;
    }, Σ, "αcO1n-8g74xCmr");
    Σ.addFunction(function αRyF5() {
        var Σ_αRyF5 = new Σ.Scope(this, Σ, αRyF5, function() {
            return [{},
                {
                    r: r,
                    g: g,
                    b: b
                }
            ];
        });
        var r = Math.floor(this.red * 255);
        var g = Math.floor(this.green * 255);
        var b = Math.floor(this.blue * 255);
        return r * 77 + g * 150 + b * 29 >> 8;
    }, Σ, "αRyF5-f9FNrSB6");
    Σ.addFunction(function α6mgv() {
        var Σ_α6mgv = new Σ.Scope(this, Σ, α6mgv, function() {
            return [{},
                {
                    r: r,
                    g: g,
                    b: b
                }
            ];
        });
        var r = Math.floor(this.red * 255);
        var g = Math.floor(this.green * 255);
        var b = Math.floor(this.blue * 255);
        return 'rgb(' + r + ',' + g + ',' + b + ')';
    }, Σ, "α6mgv-B40RVBN6");
    Σ.addFunction(function αKksT(pos, color, intensity) {
        var Σ_αKksT = new Σ.Scope(this, Σ, αKksT, function() {
            return [{
                    pos: pos,
                    color: color,
                    intensity: intensity
                },
                {}
            ];
        });
        this.position = pos;
        this.color = color;
        this.intensity = intensity ? intensity : 10;
    }, Σ, "αKksT-EV0YEC7n");
    Σ.addFunction(function αhz57() {
        return 'Light [' + this.position.x + ',' + this.position.y + ',' + this.position.z + ']';
    }, Σ, "αhz57-C4FWuieU");
    Σ.addFunction(function αzyef(x, y, z) {
        var Σ_αzyef = new Σ.Scope(this, Σ, αzyef, function() {
            return [{
                    x: x,
                    y: y,
                    z: z
                },
                {}
            ];
        });
        this.x = x ? x : 0;
        this.y = y ? y : 0;
        this.z = z ? z : 0;
    }, Σ, "αzyef-pof799iU");
    Σ.addFunction(function αZeAP(vector) {
        var Σ_αZeAP = new Σ.Scope(this, Σ, αZeAP, function() {
            return [{
                    vector: vector
                },
                {}
            ];
        });
        this.x = vector.x;
        this.y = vector.y;
        this.z = vector.z;
    }, Σ, "αZeAP-iryxPQq9");
    Σ.addFunction(function αuYsp() {
        var Σ_αuYsp = new Σ.Scope(this, Σ, αuYsp, function() {
            return [{},
                {
                    m: m
                }
            ];
        });
        var m = this.magnitude();
        return new Flog.RayTracer.Vector(this.x / m, this.y / m, this.z / m);
    }, Σ, "αuYsp-6K3xLuxx");
    Σ.addFunction(function α31FI() {
        return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
    }, Σ, "α31FI-iIxjbzPJ");
    Σ.addFunction(function αv9J9(w) {
        var Σ_αv9J9 = new Σ.Scope(this, Σ, αv9J9, function() {
            return [{
                    w: w
                },
                {}
            ];
        });
        return new Flog.RayTracer.Vector(-this.z * w.y + this.y * w.z, this.z * w.x - this.x * w.z, -this.y * w.x + this.x * w.y);
    }, Σ, "αv9J9-kq9fT4LF");
    Σ.addFunction(function α4C3t(w) {
        var Σ_α4C3t = new Σ.Scope(this, Σ, α4C3t, function() {
            return [{
                    w: w
                },
                {}
            ];
        });
        return this.x * w.x + this.y * w.y + this.z * w.z;
    }, Σ, "α4C3t-ySxVNweb");
    Σ.addFunction(function αJVhZ(v, w) {
        var Σ_αJVhZ = new Σ.Scope(this, Σ, αJVhZ, function() {
            return [{
                    v: v,
                    w: w
                },
                {}
            ];
        });
        return new Flog.RayTracer.Vector(w.x + v.x, w.y + v.y, w.z + v.z);
    }, Σ, "αJVhZ-Kqtpozyt");
    Σ.addFunction(function αQsoR(v, w) {
        var Σ_αQsoR = new Σ.Scope(this, Σ, αQsoR, function() {
            return [{
                    v: v,
                    w: w
                },
                {}
            ];
        });
        if (!w || !v) {
            throw 'Vectors must be defined [' + v + ',' + w + ']';
        }
        return new Flog.RayTracer.Vector(v.x - w.x, v.y - w.y, v.z - w.z);
    }, Σ, "αQsoR-86QKgu5l");
    Σ.addFunction(function αXId0(v, w) {
        var Σ_αXId0 = new Σ.Scope(this, Σ, αXId0, function() {
            return [{
                    v: v,
                    w: w
                },
                {}
            ];
        });
        return new Flog.RayTracer.Vector(v.x * w.x, v.y * w.y, v.z * w.z);
    }, Σ, "αXId0-KyVVW8y8");
    Σ.addFunction(function αRtKb(v, w) {
        var Σ_αRtKb = new Σ.Scope(this, Σ, αRtKb, function() {
            return [{
                    v: v,
                    w: w
                },
                {}
            ];
        });
        return new Flog.RayTracer.Vector(v.x * w, v.y * w, v.z * w);
    }, Σ, "αRtKb-oFcLdau7");
    Σ.addFunction(function αkBFp() {
        return 'Vector [' + this.x + ',' + this.y + ',' + this.z + ']';
    }, Σ, "αkBFp-UWY9lJM0");
    Σ.addFunction(function αPkl1(pos, dir) {
        var Σ_αPkl1 = new Σ.Scope(this, Σ, αPkl1, function() {
            return [{
                    pos: pos,
                    dir: dir
                },
                {}
            ];
        });
        this.position = pos;
        this.direction = dir;
    }, Σ, "αPkl1-dPbOL1XA");
    Σ.addFunction(function αjLq5() {
        return 'Ray [' + this.position + ',' + this.direction + ']';
    }, Σ, "αjLq5-GDAPO5hE");
    Σ.addFunction(function αgNVf() {
        this.camera = new Flog.RayTracer.Camera(new Flog.RayTracer.Vector(0, 0, -5), new Flog.RayTracer.Vector(0, 0, 1), new Flog.RayTracer.Vector(0, 1, 0));
        this.shapes = new Array();
        this.lights = new Array();
        this.background = new Flog.RayTracer.Background(new Flog.RayTracer.Color(0, 0, 0.5), 0.2);
    }, Σ, "αgNVf-ozVCW7pR");
    Σ.addFunction(function α1hUv() {}, Σ, "α1hUv-28DtREok");
    Σ.addFunction(function α3y48(u, v) {
        var Σ_α3y48 = new Σ.Scope(this, Σ, α3y48, function() {
            return [{
                    u: u,
                    v: v
                },
                {}
            ];
        });
    }, Σ, "α3y48-JtwsiHMy");
    // console.log('adding Function αMykA');
    Σ.addFunction(function αMykA(t) {
        var Σ_αMykA = new Σ.Scope(this, Σ, αMykA, function() {
            return [{
                    t: t
                },
                {}
            ];
        });
        t = t % 2;
        if (t < -1) {
            t += 2;
        }
        if (t >= 1) {
            t -= 2;
        }
        return t;
    }, Σ, "αMykA-PbV0rB8U");
    Σ.addFunction(function αePQi() {
        return 'Material [gloss=' + this.gloss + ', transparency=' + this.transparency + ', hasTexture=' + this.hasTexture + ']';
    }, Σ, "αePQi-1C0maXls");
    Σ.addFunction(function αitOw(color, reflection, refraction, transparency, gloss) {
        var Σ_αitOw = new Σ.Scope(this, Σ, αitOw, function() {
            return [{
                    color: color,
                    reflection: reflection,
                    refraction: refraction,
                    transparency: transparency,
                    gloss: gloss
                },
                {}
            ];
        });
        this.color = color;
        this.reflection = reflection;
        this.transparency = transparency;
        this.gloss = gloss;
        this.hasTexture = false;
    }, Σ, "αitOw-VtvJZDoX");
    Σ.addFunction(function αJLpy(u, v) {
        var Σ_αJLpy = new Σ.Scope(this, Σ, αJLpy, function() {
            return [{
                    u: u,
                    v: v
                },
                {}
            ];
        });
        return this.color;
    }, Σ, "αJLpy-MQthMhAD");
    Σ.addFunction(function αSWDg() {
        return 'SolidMaterial [gloss=' + this.gloss + ', transparency=' + this.transparency + ', hasTexture=' + this.hasTexture + ']';
    }, Σ, "αSWDg-AgFpvSo6");
    Σ.addFunction(function αjjJG(colorEven, colorOdd, reflection, transparency, gloss, density) {
        var Σ_αjjJG = new Σ.Scope(this, Σ, αjjJG, function() {
            return [{
                    colorEven: colorEven,
                    colorOdd: colorOdd,
                    reflection: reflection,
                    transparency: transparency,
                    gloss: gloss,
                    density: density
                },
                {}
            ];
        });
        this.colorEven = colorEven;
        this.colorOdd = colorOdd;
        this.reflection = reflection;
        this.transparency = transparency;
        this.gloss = gloss;
        this.density = density;
        this.hasTexture = true;
    }, Σ, "αjjJG-oCJNFpLN");
    Σ.addFunction(function α5nNj(u, v) {
        var Σ_α5nNj = new Σ.Scope(this, Σ, α5nNj, function() {
            return [{
                    u: u,
                    v: v
                },
                {
                    t: t
                }
            ];
        });
        // console.log(this);
        var t = this.wrapUp(u * this.density) * this.wrapUp(v * this.density);
        if (t < 0) {
            return this.colorEven;
        } else {
            return this.colorOdd;
        }
    }, Σ, "α5nNj-gXYpIJfm");
    Σ.addFunction(function αxgtl() {
        return 'ChessMaterial [gloss=' + this.gloss + ', transparency=' + this.transparency + ', hasTexture=' + this.hasTexture + ']';
    }, Σ, "αxgtl-K7q1dOuL");
    Σ.addFunction(function α4JpS(pos, radius, material) {
        var Σ_α4JpS = new Σ.Scope(this, Σ, α4JpS, function() {
            return [{
                    pos: pos,
                    radius: radius,
                    material: material
                },
                {}
            ];
        });
        this.radius = radius;
        this.position = pos;
        this.material = material;
    }, Σ, "α4JpS-zTgThdtj");
    Σ.addFunction(function αEv5w(ray) {
        var Σ_αEv5w = new Σ.Scope(this, Σ, αEv5w, function() {
            return [{
                    ray: ray
                },
                {
                    info: info,
                    dst: dst,
                    B: B,
                    C: C,
                    D: D
                }
            ];
        });
        var info = new Flog.RayTracer.IntersectionInfo();
        info.shape = this;
        var dst = Flog.RayTracer.Vector.prototype.subtract(ray.position, this.position);
        var B = dst.dot(ray.direction);
        var C = dst.dot(dst) - this.radius * this.radius;
        var D = B * B - C;
        if (D > 0) {
            info.isHit = true;
            info.distance = -B - Math.sqrt(D);
            info.position = Flog.RayTracer.Vector.prototype.add(ray.position, Flog.RayTracer.Vector.prototype.multiplyScalar(ray.direction, info.distance));
            info.normal = Flog.RayTracer.Vector.prototype.subtract(info.position, this.position).normalize();
            info.color = this.material.getColor(0, 0);
        } else {
            info.isHit = false;
        }
        return info;
    }, Σ, "αEv5w-vod8i5h4");
    Σ.addFunction(function αdScP() {
        return 'Sphere [position=' + this.position + ', radius=' + this.radius + ']';
    }, Σ, "αdScP-C0AZ2jax");
    Σ.addFunction(function αPu4o(pos, d, material) {
        var Σ_αPu4o = new Σ.Scope(this, Σ, αPu4o, function() {
            return [{
                    pos: pos,
                    d: d,
                    material: material
                },
                {}
            ];
        });
        this.position = pos;
        this.d = d;
        this.material = material;
    }, Σ, "αPu4o-lHRcDUTA");
    Σ.addFunction(function α1fms(ray) {
        var Σ_α1fms = new Σ.Scope(this, Σ, α1fms, function() {
            return [{
                    ray: ray
                },
                {
                    info: info,
                    Vd: Vd,
                    t: t,
                    vU: vU,
                    vV: vV,
                    u: u,
                    v: v
                }
            ];
        });
        var info = new Flog.RayTracer.IntersectionInfo();
        var Vd = this.position.dot(ray.direction);
        if (Vd == 0) {
            return info;
        }
        var t = -(this.position.dot(ray.position) + this.d) / Vd;
        if (t <= 0) {
            return info;
        }
        info.shape = this;
        info.isHit = true;
        info.position = Flog.RayTracer.Vector.prototype.add(ray.position, Flog.RayTracer.Vector.prototype.multiplyScalar(ray.direction, t));
        info.normal = this.position;
        info.distance = t;
        if (this.material.hasTexture) {
            var vU = new Flog.RayTracer.Vector(this.position.y, this.position.z, -this.position.x);
            var vV = vU.cross(this.position);
            var u = info.position.dot(vU);
            var v = info.position.dot(vV);
            info.color = this.material.getColor(u, v);
        } else {
            info.color = this.material.getColor(0, 0);
        }
        return info;
    }, Σ, "α1fms-Np0iGv7l");
    Σ.addFunction(function αqSZV() {
        return 'Plane [' + this.position + ', d=' + this.d + ']';
    }, Σ, "αqSZV-1o5l3R7c");
    Σ.addFunction(function αUGoU() {
        this.color = new Flog.RayTracer.Color(0, 0, 0);
    }, Σ, "αUGoU-V0j7pzAM");
    Σ.addFunction(function αpGEM() {
        return 'Intersection [' + this.position + ']';
    }, Σ, "αpGEM-KQw1mkoz");
    Σ.addFunction(function αeYuw(pos, lookAt, up) {
        var Σ_αeYuw = new Σ.Scope(this, Σ, αeYuw, function() {
            return [{
                    pos: pos,
                    lookAt: lookAt,
                    up: up
                },
                {}
            ];
        });
        this.position = pos;
        this.lookAt = lookAt;
        this.up = up;
        this.equator = lookAt.normalize().cross(this.up);
        this.screen = Flog.RayTracer.Vector.prototype.add(this.position, this.lookAt);
    }, Σ, "αeYuw-Oz9Qh5ck");
    Σ.addFunction(function αmpbf(vx, vy) {
        var Σ_αmpbf = new Σ.Scope(this, Σ, αmpbf, function() {
            return [{
                    vx: vx,
                    vy: vy
                },
                {
                    pos: pos,
                    dir: dir,
                    ray: ray
                }
            ];
        });
        var pos = Flog.RayTracer.Vector.prototype.subtract(this.screen, Flog.RayTracer.Vector.prototype.subtract(Flog.RayTracer.Vector.prototype.multiplyScalar(this.equator, vx), Flog.RayTracer.Vector.prototype.multiplyScalar(this.up, vy)));
        pos.y = pos.y * -1;
        var dir = Flog.RayTracer.Vector.prototype.subtract(pos, this.position);
        var ray = new Flog.RayTracer.Ray(pos, dir.normalize());
        return ray;
    }, Σ, "αmpbf-HZPhh3YD");
    Σ.addFunction(function αQkP4() {
        return 'Ray []';
    }, Σ, "αQkP4-MeVAwLJK");
    Σ.addFunction(function αrxLC(color, ambience) {
        var Σ_αrxLC = new Σ.Scope(this, Σ, αrxLC, function() {
            return [{
                    color: color,
                    ambience: ambience
                },
                {}
            ];
        });
        this.color = color;
        this.ambience = ambience;
    }, Σ, "αrxLC-cdF7V2K6");
    Σ.addFunction(function αUrRD(options) {
        var Σ_αUrRD = new Σ.Scope(this, Σ, αUrRD, function() {
            return [{
                    options: options
                },
                {}
            ];
        });
        this.options = Object.extend({
            canvasHeight: 100,
            canvasWidth: 100,
            pixelWidth: 2,
            pixelHeight: 2,
            renderDiffuse: false,
            renderShadows: false,
            renderHighlights: false,
            renderReflections: false,
            rayDepth: 2
        }, options || {});
        this.options.canvasHeight /= this.options.pixelHeight;
        this.options.canvasWidth /= this.options.pixelWidth;
    }, Σ, "αUrRD-3OM7Fagn");
    Σ.addFunction(function α92mP(x, y, color) {
        var Σ_α92mP = new Σ.Scope(this, Σ, α92mP, function() {
            return [{
                    x: x,
                    y: y,
                    color: color
                },
                {
                    pxW: pxW,
                    pxH: pxH
                }
            ];
        });
        var pxW, pxH;
        pxW = this.options.pixelWidth;
        pxH = this.options.pixelHeight;
        if (this.canvas) {
            this.canvas.fillStyle = color.toString();
            this.canvas.fillRect(x * pxW, y * pxH, pxW, pxH);
        } else {
            if (x === y) {
                checkNumber += color.brightness();
            }
        }
    }, Σ, "α92mP-EQ4QtSiD");
    Σ.addFunction(function αxcib(scene, canvas) {
        var Σ_αxcib = new Σ.Scope(this, Σ, αxcib, function() {
            return [{
                    scene: scene,
                    canvas: canvas
                },
                {
                    canvasHeight: canvasHeight,
                    canvasWidth: canvasWidth,
                    y: y,
                    x: x,
                    yp: yp,
                    xp: xp,
                    ray: ray,
                    color: color
                }
            ];
        });
        checkNumber = 0;
        if (canvas) {
            this.canvas = canvas.getContext('2d');
        } else {
            this.canvas = null;
        }
        var canvasHeight = this.options.canvasHeight;
        var canvasWidth = this.options.canvasWidth;
        for (var y = 0; y < canvasHeight; y++) {
            for (var x = 0; x < canvasWidth; x++) {
                var yp = y * 1 / canvasHeight * 2 - 1;
                var xp = x * 1 / canvasWidth * 2 - 1;
                var ray = scene.camera.getRay(xp, yp);
                var color = this.getPixelColor(ray, scene);
                this.setPixel(x, y, color);
            }
        }
        if (checkNumber !== 2321) {
            throw new Error('Scene rendered incorrectly');
        }
    }, Σ, "αxcib-jokwXk8Y");
    Σ.addFunction(function αyZh6(ray, scene) {
        var Σ_αyZh6 = new Σ.Scope(this, Σ, αyZh6, function() {
            return [{
                    ray: ray,
                    scene: scene
                },
                {
                    info: info,
                    color: color
                }
            ];
        });
        var info = this.testIntersection(ray, scene, null);
        if (info.isHit) {
            var color = this.rayTrace(info, ray, scene, 0);
            return color;
        }
        return scene.background.color;
    }, Σ, "αyZh6-pSzraFNi");
    Σ.addFunction(function αeGSo(ray, scene, exclude) {
        var Σ_αeGSo = new Σ.Scope(this, Σ, αeGSo, function() {
            return [{
                    ray: ray,
                    scene: scene,
                    exclude: exclude
                },
                {
                    hits: hits,
                    best: best,
                    i: i,
                    shape: shape,
                    info: info
                }
            ];
        });
        var hits = 0;
        var best = new Flog.RayTracer.IntersectionInfo();
        best.distance = 2000;
        for (var i = 0; i < scene.shapes.length; i++) {
            var shape = scene.shapes[i];
            if (shape != exclude) {
                var info = shape.intersect(ray);
                if (info.isHit && info.distance >= 0 && info.distance < best.distance) {
                    best = info;
                    hits++;
                }
            }
        }
        best.hitCount = hits;
        return best;
    }, Σ, "αeGSo-pE85COJm");
    Σ.addFunction(function α5gev(P, N, V) {
        var Σ_α5gev = new Σ.Scope(this, Σ, α5gev, function() {
            return [{
                    P: P,
                    N: N,
                    V: V
                },
                {
                    c1: c1,
                    R1: R1
                }
            ];
        });
        var c1 = -N.dot(V);
        var R1 = Flog.RayTracer.Vector.prototype.add(Flog.RayTracer.Vector.prototype.multiplyScalar(N, 2 * c1), V);
        return new Flog.RayTracer.Ray(P, R1);
    }, Σ, "α5gev-ibiFsNGA");
    Σ.addFunction(function αqvIv(info, ray, scene, depth) {
        var Σ_αqvIv = new Σ.Scope(this, Σ, αqvIv, function() {
            return [{
                    info: info,
                    ray: ray,
                    scene: scene,
                    depth: depth
                },
                {
                    color: color,
                    oldColor: oldColor,
                    shininess: shininess,
                    i: i,
                    light: light,
                    v: v,
                    L: L,
                    reflectionRay: reflectionRay,
                    refl: refl,
                    shadowInfo: shadowInfo,
                    shadowRay: shadowRay,
                    vA: vA,
                    dB: dB,
                    Lv: Lv,
                    E: E,
                    H: H,
                    glossWeight: glossWeight
                }
            ];
        });
        var color = Flog.RayTracer.Color.prototype.multiplyScalar(info.color, scene.background.ambience);
        var oldColor = color;
        var shininess = Math.pow(10, info.shape.material.gloss + 1);
        for (var i = 0; i < scene.lights.length; i++) {
            var light = scene.lights[i];
            var v = Flog.RayTracer.Vector.prototype.subtract(light.position, info.position).normalize();
            if (this.options.renderDiffuse) {
                var L = v.dot(info.normal);
                if (L > 0) {
                    color = Flog.RayTracer.Color.prototype.add(color, Flog.RayTracer.Color.prototype.multiply(info.color, Flog.RayTracer.Color.prototype.multiplyScalar(light.color, L)));
                }
            }
            if (depth <= this.options.rayDepth) {
                if (this.options.renderReflections && info.shape.material.reflection > 0) {
                    var reflectionRay = this.getReflectionRay(info.position, info.normal, ray.direction);
                    var refl = this.testIntersection(reflectionRay, scene, info.shape);
                    if (refl.isHit && refl.distance > 0) {
                        refl.color = this.rayTrace(refl, reflectionRay, scene, depth + 1);
                    } else {
                        refl.color = scene.background.color;
                    }
                    color = Flog.RayTracer.Color.prototype.blend(color, refl.color, info.shape.material.reflection);
                }
            }
            var shadowInfo = new Flog.RayTracer.IntersectionInfo();
            if (this.options.renderShadows) {
                var shadowRay = new Flog.RayTracer.Ray(info.position, v);
                shadowInfo = this.testIntersection(shadowRay, scene, info.shape);
                if (shadowInfo.isHit && shadowInfo.shape != info.shape) {
                    var vA = Flog.RayTracer.Color.prototype.multiplyScalar(color, 0.5);
                    var dB = 0.5 * Math.pow(shadowInfo.shape.material.transparency, 0.5);
                    color = Flog.RayTracer.Color.prototype.addScalar(vA, dB);
                }
            }
            if (this.options.renderHighlights && !shadowInfo.isHit && info.shape.material.gloss > 0) {
                var Lv = Flog.RayTracer.Vector.prototype.subtract(info.shape.position, light.position).normalize();
                var E = Flog.RayTracer.Vector.prototype.subtract(scene.camera.position, info.shape.position).normalize();
                var H = Flog.RayTracer.Vector.prototype.subtract(E, Lv).normalize();
                var glossWeight = Math.pow(Math.max(info.normal.dot(H), 0), shininess);
                color = Flog.RayTracer.Color.prototype.add(Flog.RayTracer.Color.prototype.multiplyScalar(light.color, glossWeight), color);
            }
        }
        color.limit();
        return color;
    }, Σ, "αqvIv-YQlJ1zzf");
    Σ.addFunction(function αrs5x() {
        return Date.now();
    }, Σ, "αrs5x-erhkirU2");
    Σ.addFunction(function αyu0k() {}, Σ, "αyu0k-jMBgyK7e");
    Σ.addFunction(function αzHUf() {}, Σ, "αzHUf-uBkbIARG");
    (function αQGho() {
        var Σ_αQGho = new Σ.Scope(this, Σ, αQGho, function() {
            return [{}, {}]
        }, "αQGho-HSZUQyyq").restore(Σ);
        Σ_αQGho.addFunction(function αn8tS() {
            this.initialize.apply(this, arguments);
        }, Σ_αQGho, "αn8tS-UKHzCpSI");
        Σ_αQGho.funcs["αn8tS-UKHzCpSI"].prototype.colorEven = null;
        Σ_αQGho.funcs["αn8tS-UKHzCpSI"].prototype.colorOdd = null;
        Σ_αQGho.funcs["αn8tS-UKHzCpSI"].prototype.density = 0.5;
        Σ_αQGho.funcs["αn8tS-UKHzCpSI"].prototype.initialize = Σ.getFunction("Σ.αjjJG-oCJNFpLN");
        Σ_αQGho.funcs["αn8tS-UKHzCpSI"].prototype.getColor = Σ.getFunction("Σ.α5nNj-gXYpIJfm");
        Σ_αQGho.funcs["αn8tS-UKHzCpSI"].prototype.toString = Σ.getFunction("Σ.αxgtl-K7q1dOuL");
        Σ_αQGho.funcs["αn8tS-UKHzCpSI"].prototype.wrapUp = Σ.getFunction("Σ.αMykA-PbV0rB8U");
    }());
    (function αQGho() {
        var Σ_αQGho = new Σ.Scope(this, Σ, αQGho, function() {
            return [{}, {}]
        }, "αQGho-ydTU5RVA").restore(Σ);
        Σ_αQGho.addFunction(function αn8tS() {
            this.initialize.apply(this, arguments);
        }, Σ_αQGho, "αn8tS-4bEfEm2V");
        Σ_αQGho.funcs["αn8tS-4bEfEm2V"].prototype.red = 0;
        Σ_αQGho.funcs["αn8tS-4bEfEm2V"].prototype.green = 0;
        Σ_αQGho.funcs["αn8tS-4bEfEm2V"].prototype.blue = 0;
        Σ_αQGho.funcs["αn8tS-4bEfEm2V"].prototype.initialize = Σ.getFunction("Σ.αRF6n-ZdJlkxVI");
        Σ_αQGho.funcs["αn8tS-4bEfEm2V"].prototype.add = Σ.getFunction("Σ.αnT6m-SaZUVplt");
        Σ_αQGho.funcs["αn8tS-4bEfEm2V"].prototype.addScalar = Σ.getFunction("Σ.αb2PC-e8OEYWGT");
        Σ_αQGho.funcs["αn8tS-4bEfEm2V"].prototype.subtract = Σ.getFunction("Σ.α0Z5T-TW0WxyYo");
        Σ_αQGho.funcs["αn8tS-4bEfEm2V"].prototype.multiply = Σ.getFunction("Σ.αundy-V0zT2VJL");
        Σ_αQGho.funcs["αn8tS-4bEfEm2V"].prototype.multiplyScalar = Σ.getFunction("Σ.αvwEO-vh3EpTGs");
        Σ_αQGho.funcs["αn8tS-4bEfEm2V"].prototype.divideFactor = Σ.getFunction("Σ.αQEtz-itirq8Fj");
        Σ_αQGho.funcs["αn8tS-4bEfEm2V"].prototype.limit = Σ.getFunction("Σ.αYo1X-M9HTZHwU");
        Σ_αQGho.funcs["αn8tS-4bEfEm2V"].prototype.distance = Σ.getFunction("Σ.α2zfk-sa3Tpx5v");
        Σ_αQGho.funcs["αn8tS-4bEfEm2V"].prototype.blend = Σ.getFunction("Σ.αcO1n-8g74xCmr");
        Σ_αQGho.funcs["αn8tS-4bEfEm2V"].prototype.brightness = Σ.getFunction("Σ.αRyF5-f9FNrSB6");
        Σ_αQGho.funcs["αn8tS-4bEfEm2V"].prototype.toString = Σ.getFunction("Σ.α6mgv-B40RVBN6");
    }());
    (function αQGho() {
        var Σ_αQGho = new Σ.Scope(this, Σ, αQGho, function() {
            return [{}, {}]
        }, "αQGho-Nck2X9Qy").restore(Σ);
        Σ_αQGho.addFunction(function αn8tS() {
            this.initialize.apply(this, arguments);
        }, Σ_αQGho, "αn8tS-GMB7sAH9");
        Σ_αQGho.funcs["αn8tS-GMB7sAH9"].prototype.x = 0;
        Σ_αQGho.funcs["αn8tS-GMB7sAH9"].prototype.y = 0;
        Σ_αQGho.funcs["αn8tS-GMB7sAH9"].prototype.z = 0;
        Σ_αQGho.funcs["αn8tS-GMB7sAH9"].prototype.initialize = Σ.getFunction("Σ.αzyef-pof799iU");
        Σ_αQGho.funcs["αn8tS-GMB7sAH9"].prototype.copy = Σ.getFunction("Σ.αZeAP-iryxPQq9");
        Σ_αQGho.funcs["αn8tS-GMB7sAH9"].prototype.normalize = Σ.getFunction("Σ.αuYsp-6K3xLuxx");
        Σ_αQGho.funcs["αn8tS-GMB7sAH9"].prototype.magnitude = Σ.getFunction("Σ.α31FI-iIxjbzPJ");
        Σ_αQGho.funcs["αn8tS-GMB7sAH9"].prototype.cross = Σ.getFunction("Σ.αv9J9-kq9fT4LF");
        Σ_αQGho.funcs["αn8tS-GMB7sAH9"].prototype.dot = Σ.getFunction("Σ.α4C3t-ySxVNweb");
        Σ_αQGho.funcs["αn8tS-GMB7sAH9"].prototype.add = Σ.getFunction("Σ.αJVhZ-Kqtpozyt");
        Σ_αQGho.funcs["αn8tS-GMB7sAH9"].prototype.subtract = Σ.getFunction("Σ.αQsoR-86QKgu5l");
        Σ_αQGho.funcs["αn8tS-GMB7sAH9"].prototype.multiplyVector = Σ.getFunction("Σ.αXId0-KyVVW8y8");
        Σ_αQGho.funcs["αn8tS-GMB7sAH9"].prototype.multiplyScalar = Σ.getFunction("Σ.αRtKb-oFcLdau7");
        Σ_αQGho.funcs["αn8tS-GMB7sAH9"].prototype.toString = Σ.getFunction("Σ.αkBFp-UWY9lJM0");
    }());
    (function αQGho() {
        var Σ_αQGho = new Σ.Scope(this, Σ, αQGho, function() {
            return [{}, {}]
        }, "αQGho-waq8hN9K").restore(Σ);
        Σ_αQGho.addFunction(function αn8tS() {
            this.initialize.apply(this, arguments);
        }, Σ_αQGho, "αn8tS-iOdzlO03");
        Σ_αQGho.funcs["αn8tS-iOdzlO03"].prototype.position = null;
        Σ_αQGho.funcs["αn8tS-iOdzlO03"].prototype.direction = null;
        Σ_αQGho.funcs["αn8tS-iOdzlO03"].prototype.initialize = Σ.getFunction("Σ.αPkl1-dPbOL1XA");
        Σ_αQGho.funcs["αn8tS-iOdzlO03"].prototype.toString = Σ.getFunction("Σ.αjLq5-GDAPO5hE");
    }());
    (function αQGho() {
        var Σ_αQGho = new Σ.Scope(this, Σ, αQGho, function() {
            return [{}, {}]
        }, "αQGho-YMPm5jmu").restore(Σ);
        Σ_αQGho.addFunction(function αn8tS() {
            this.initialize.apply(this, arguments);
        }, Σ_αQGho, "αn8tS-YdmZjLpj");
        Σ_αQGho.funcs["αn8tS-YdmZjLpj"].prototype.camera = null;
        Σ_αQGho.funcs["αn8tS-YdmZjLpj"].prototype.shapes = [];
        Σ_αQGho.funcs["αn8tS-YdmZjLpj"].prototype.lights = [];
        Σ_αQGho.funcs["αn8tS-YdmZjLpj"].prototype.background = null;
        Σ_αQGho.funcs["αn8tS-YdmZjLpj"].prototype.initialize = Σ.getFunction("Σ.αgNVf-ozVCW7pR");
    }());
    (function αQGho() {
        var Σ_αQGho = new Σ.Scope(this, Σ, αQGho, function() {
            return [{}, {}]
        }, "αQGho-55DAAkQM").restore(Σ);
        Σ_αQGho.addFunction(function αn8tS() {
            this.initialize.apply(this, arguments);
        }, Σ_αQGho, "αn8tS-OLMzbk54");
        Σ_αQGho.funcs["αn8tS-OLMzbk54"].prototype.gloss = 2;
        Σ_αQGho.funcs["αn8tS-OLMzbk54"].prototype.transparency = 0;
        Σ_αQGho.funcs["αn8tS-OLMzbk54"].prototype.reflection = 0;
        Σ_αQGho.funcs["αn8tS-OLMzbk54"].prototype.refraction = 0.5;
        Σ_αQGho.funcs["αn8tS-OLMzbk54"].prototype.hasTexture = false;
        Σ_αQGho.funcs["αn8tS-OLMzbk54"].prototype.initialize = Σ.getFunction("Σ.α1hUv-28DtREok");
        Σ_αQGho.funcs["αn8tS-OLMzbk54"].prototype.getColor = Σ.getFunction("Σ.α3y48-JtwsiHMy");
        Σ_αQGho.funcs["αn8tS-OLMzbk54"].prototype.wrapUp = Σ.getFunction("Σ.αMykA-PbV0rB8U");
        Σ_αQGho.funcs["αn8tS-OLMzbk54"].prototype.toString = Σ.getFunction("Σ.αePQi-1C0maXls");
    }());
    (function αQGho() {
        var Σ_αQGho = new Σ.Scope(this, Σ, αQGho, function() {
            return [{}, {}]
        }, "αQGho-R94lzNsJ").restore(Σ);
        Σ_αQGho.addFunction(function αn8tS() {
            this.initialize.apply(this, arguments);
        }, Σ_αQGho, "αn8tS-oxBkpltD");
        Σ_αQGho.funcs["αn8tS-oxBkpltD"].prototype.initialize = Σ.getFunction("Σ.αitOw-VtvJZDoX");
        Σ_αQGho.funcs["αn8tS-oxBkpltD"].prototype.getColor = Σ.getFunction("Σ.αJLpy-MQthMhAD");
        Σ_αQGho.funcs["αn8tS-oxBkpltD"].prototype.toString = Σ.getFunction("Σ.αSWDg-AgFpvSo6");
    }());
    (function αQGho() {
        var Σ_αQGho = new Σ.Scope(this, Σ, αQGho, function() {
            return [{}, {}]
        }, "αQGho-JSEiYxca").restore(Σ);
        Σ_αQGho.addFunction(function αn8tS() {
            this.initialize.apply(this, arguments);
        }, Σ_αQGho, "αn8tS-usVeANqx");
        Σ_αQGho.funcs["αn8tS-usVeANqx"].prototype.position = null;
        Σ_αQGho.funcs["αn8tS-usVeANqx"].prototype.color = null;
        Σ_αQGho.funcs["αn8tS-usVeANqx"].prototype.intensity = 10;
        Σ_αQGho.funcs["αn8tS-usVeANqx"].prototype.initialize = Σ.getFunction("Σ.αKksT-EV0YEC7n");
        Σ_αQGho.funcs["αn8tS-usVeANqx"].prototype.toString = Σ.getFunction("Σ.αhz57-C4FWuieU");
    }());
    (function αQGho() {
        var Σ_αQGho = new Σ.Scope(this, Σ, αQGho, function() {
            return [{}, {}]
        }, "αQGho-OYuQG4sp").restore(Σ);
        Σ_αQGho.addFunction(function αn8tS() {
            this.initialize.apply(this, arguments);
        }, Σ_αQGho, "αn8tS-STUtNW2j");
        Σ_αQGho.funcs["αn8tS-STUtNW2j"].prototype.initialize = Σ.getFunction("Σ.α4JpS-zTgThdtj");
        Σ_αQGho.funcs["αn8tS-STUtNW2j"].prototype.intersect = Σ.getFunction("Σ.αEv5w-vod8i5h4");
        Σ_αQGho.funcs["αn8tS-STUtNW2j"].prototype.toString = Σ.getFunction("Σ.αdScP-C0AZ2jax");
    }());
    (function αQGho() {
        var Σ_αQGho = new Σ.Scope(this, Σ, αQGho, function() {
            return [{}, {}]
        }, "αQGho-cUecBNkR").restore(Σ);
        Σ_αQGho.addFunction(function αn8tS() {
            this.initialize.apply(this, arguments);
        }, Σ_αQGho, "αn8tS-cnrix64n");
        Σ_αQGho.funcs["αn8tS-cnrix64n"].prototype.d = 0;
        Σ_αQGho.funcs["αn8tS-cnrix64n"].prototype.initialize = Σ.getFunction("Σ.αPu4o-lHRcDUTA");
        Σ_αQGho.funcs["αn8tS-cnrix64n"].prototype.intersect = Σ.getFunction("Σ.α1fms-Np0iGv7l");
        Σ_αQGho.funcs["αn8tS-cnrix64n"].prototype.toString = Σ.getFunction("Σ.αqSZV-1o5l3R7c");
    }());
    (function αQGho() {
        var Σ_αQGho = new Σ.Scope(this, Σ, αQGho, function() {
            return [{}, {}]
        }, "αQGho-VQDhoTd7").restore(Σ);
        Σ_αQGho.addFunction(function αn8tS() {
            this.initialize.apply(this, arguments);
        }, Σ_αQGho, "αn8tS-qx6GCTNC");
        Σ_αQGho.funcs["αn8tS-qx6GCTNC"].prototype.isHit = false;
        Σ_αQGho.funcs["αn8tS-qx6GCTNC"].prototype.hitCount = 0;
        Σ_αQGho.funcs["αn8tS-qx6GCTNC"].prototype.shape = null;
        Σ_αQGho.funcs["αn8tS-qx6GCTNC"].prototype.position = null;
        Σ_αQGho.funcs["αn8tS-qx6GCTNC"].prototype.normal = null;
        Σ_αQGho.funcs["αn8tS-qx6GCTNC"].prototype.color = null;
        Σ_αQGho.funcs["αn8tS-qx6GCTNC"].prototype.distance = null;
        Σ_αQGho.funcs["αn8tS-qx6GCTNC"].prototype.initialize = Σ.getFunction("Σ.αUGoU-V0j7pzAM");
        Σ_αQGho.funcs["αn8tS-qx6GCTNC"].prototype.toString = Σ.getFunction("Σ.αpGEM-KQw1mkoz");
    }());
    (function αQGho() {
        var Σ_αQGho = new Σ.Scope(this, Σ, αQGho, function() {
            return [{}, {}]
        }, "αQGho-jxoXy5fh").restore(Σ);
        Σ_αQGho.addFunction(function αn8tS() {
            this.initialize.apply(this, arguments);
        }, Σ_αQGho, "αn8tS-uq0D7ura");
        Σ_αQGho.funcs["αn8tS-uq0D7ura"].prototype.position = null;
        Σ_αQGho.funcs["αn8tS-uq0D7ura"].prototype.lookAt = null;
        Σ_αQGho.funcs["αn8tS-uq0D7ura"].prototype.equator = null;
        Σ_αQGho.funcs["αn8tS-uq0D7ura"].prototype.up = null;
        Σ_αQGho.funcs["αn8tS-uq0D7ura"].prototype.screen = null;
        Σ_αQGho.funcs["αn8tS-uq0D7ura"].prototype.initialize = Σ.getFunction("Σ.αeYuw-Oz9Qh5ck");
        Σ_αQGho.funcs["αn8tS-uq0D7ura"].prototype.getRay = Σ.getFunction("Σ.αmpbf-HZPhh3YD");
        Σ_αQGho.funcs["αn8tS-uq0D7ura"].prototype.toString = Σ.getFunction("Σ.αQkP4-MeVAwLJK");
    }());
    (function αQGho() {
        var Σ_αQGho = new Σ.Scope(this, Σ, αQGho, function() {
            return [{}, {}]
        }, "αQGho-FCbdLpPH").restore(Σ);
        Σ_αQGho.addFunction(function αn8tS() {
            this.initialize.apply(this, arguments);
        }, Σ_αQGho, "αn8tS-fPIvLHiI");
        Σ_αQGho.funcs["αn8tS-fPIvLHiI"].prototype.color = null;
        Σ_αQGho.funcs["αn8tS-fPIvLHiI"].prototype.ambience = 0;
        Σ_αQGho.funcs["αn8tS-fPIvLHiI"].prototype.initialize = Σ.getFunction("Σ.αrxLC-cdF7V2K6");
    }());
    (function αQGho() {
        var Σ_αQGho = new Σ.Scope(this, Σ, αQGho, function() {
            return [{}, {}]
        }, "αQGho-dozszsE1").restore(Σ);
        Σ_αQGho.addFunction(function αn8tS() {
            this.initialize.apply(this, arguments);
        }, Σ_αQGho, "αn8tS-wwnrmcLs");
        Σ_αQGho.funcs["αn8tS-wwnrmcLs"].prototype.canvas = null;
        Σ_αQGho.funcs["αn8tS-wwnrmcLs"].prototype.initialize = Σ.getFunction("Σ.αUrRD-3OM7Fagn");
        Σ_αQGho.funcs["αn8tS-wwnrmcLs"].prototype.setPixel = Σ.getFunction("Σ.α92mP-EQ4QtSiD");
        Σ_αQGho.funcs["αn8tS-wwnrmcLs"].prototype.renderScene = Σ.getFunction("Σ.αxcib-jokwXk8Y");
        Σ_αQGho.funcs["αn8tS-wwnrmcLs"].prototype.getPixelColor = Σ.getFunction("Σ.αyZh6-pSzraFNi");
        Σ_αQGho.funcs["αn8tS-wwnrmcLs"].prototype.testIntersection = Σ.getFunction("Σ.αeGSo-pE85COJm");
        Σ_αQGho.funcs["αn8tS-wwnrmcLs"].prototype.getReflectionRay = Σ.getFunction("Σ.α5gev-ibiFsNGA");
        Σ_αQGho.funcs["αn8tS-wwnrmcLs"].prototype.rayTrace = Σ.getFunction("Σ.αqvIv-YQlJ1zzf");
    }());
    (function BM_Start() {
        var Σ_BM_Start = new Σ.Scope(this, Σ, BM_Start, function() {
            return [{}, {
                data: data,
                elapsed: elapsed,
                start: start,
                end: end,
                i: i
            }]
        }, "BM_Start-bD6LUZQj").restore(Σ).hoist(doRun, Σ_BM_Start);

        function doRun() {
            var Σ_BM_Start_doRun = new Σ.Scope(this, Σ_BM_Start, doRun, function() {
                return [{},
                    {
                        usec: usec,
                        rms: rms
                    }
                ];
            });
            BM_SetupFunc();
            Σ.console.log('Iteration : ' + i);
            BM_RunFunc();
            elapsed = Date.now() - start;
            BM_TearDownFunc();
            i++;
            if (i < BM_Iterations) {
                if (i === BM_Iterations / 2) {
                    Σ.pauseTimers();
                    var started = Date.now();
                    var safe = Σ.snapshot();
                    var elapsed = Date.now() - started;
                    process.send({
                        time_taken: elapsed,
                        snapshot: safe
                    });
                } else Σ.setImmediate(doRun);
            } else {
                if (data != null) {
                    data.runs += i;
                    data.elapsed += elapsed;
                }
                Σ.console.log('Runs: ' + data.runs + '\t|\tElapsed: ' + data.elapsed);
                end = Date.now();
                Σ.console.log('Total time : ' + (end - start) + ' ms');
                var usec = data.elapsed * 1000 / data.runs;
                var rms = BM_RMS ? BM_RMS() : 0;
                BM_Results.push({
                    time: usec,
                    latency: rms
                });
                process.exit();
            }
        };
        var data = {
            "runs": 0,
            "elapsed": 0
        };
        var elapsed = 0;
        var start = 1561661453808;
        var end = null;
        var i = 250;
    }());
    var checkNumber = 2321;
    var Class = {
        "create": Σ.getFunction("Σ.αQGho-V4FmWjaV")
    };
    Object.extend = function(destination, source) {
      for (var property in source) {
        destination[property] = source[property];
      }
      return destination;
    };
    var performance = {
        "now": Σ.getFunction("Σ.αrs5x-erhkirU2")
    };
    var BM_RunFunc = Σ.getFunction("Σ.renderScene");
    var BM_SetupFunc = Σ.getFunction("Σ.αyu0k-jMBgyK7e");
    var BM_TearDownFunc = Σ.getFunction("Σ.αzHUf-uBkbIARG");
    var BM_RMS = undefined;
    var BM_Iterations = 500;
    var BM_Min_Iterations = 16;
    var BM_Results = [];
    var Flog = {
        "RayTracer": {
            "Color": Σ.getFunction("Σ/αQGho-ydTU5RVA.αn8tS-4bEfEm2V"),
            "Light": Σ.getFunction("Σ/αQGho-JSEiYxca.αn8tS-usVeANqx"),
            "Vector": Σ.getFunction("Σ/αQGho-Nck2X9Qy.αn8tS-GMB7sAH9"),
            "Ray": Σ.getFunction("Σ/αQGho-waq8hN9K.αn8tS-iOdzlO03"),
            "Scene": Σ.getFunction("Σ/αQGho-YMPm5jmu.αn8tS-YdmZjLpj"),
            "Material": {
                "BaseMaterial": Σ.getFunction("Σ/αQGho-55DAAkQM.αn8tS-OLMzbk54"),
                "Solid": Σ.getFunction("Σ/αQGho-R94lzNsJ.αn8tS-oxBkpltD"),
                "Chessboard": Σ.getFunction("Σ/αQGho-HSZUQyyq.αn8tS-UKHzCpSI")
            },
            "Shape": {
                "Sphere": Σ.getFunction("Σ/αQGho-OYuQG4sp.αn8tS-STUtNW2j"),
                "Plane": Σ.getFunction("Σ/αQGho-cUecBNkR.αn8tS-cnrix64n")
            },
            "IntersectionInfo": Σ.getFunction("Σ/αQGho-VQDhoTd7.αn8tS-qx6GCTNC"),
            "Camera": Σ.getFunction("Σ/αQGho-jxoXy5fh.αn8tS-uq0D7ura"),
            "Background": Σ.getFunction("Σ/αQGho-FCbdLpPH.αn8tS-fPIvLHiI"),
            "Engine": Σ.getFunction("Σ/αQGho-dozszsE1.αn8tS-wwnrmcLs")
        }
    };
    Σ.setImmediate(Σ.getFunction("Σ/BM_Start-bD6LUZQj.doRun"), "8I8m39IC");
}, 'mqtt://localhost', 'raytrace.js/saX7F8h5', {});