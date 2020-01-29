var pidusage = require('pidusage');
require('things-js/lib/core/Code').bootstrap(module, function(Σ){ Σ.setExtractor(function(){ return [{}, {checkNumber:checkNumber,Class:Class,Flog:Flog,performance:performance,BM_RunFunc:BM_RunFunc,BM_SetupFunc:BM_SetupFunc,BM_TearDownFunc:BM_TearDownFunc,BM_RMS:BM_RMS,BM_Iterations:BM_Iterations,BM_Min_Iterations:BM_Min_Iterations,BM_Results:BM_Results}] }).hoist(extendObject, Σ).hoist(renderScene, Σ).hoist(BM_Start, Σ);function extendObject(destination, source) {
        for (var property in source) {
            destination[property] = source[property];
        }
        return destination;
    };function renderScene() {
        var Σ_renderScene = new Σ.Scope(this, Σ, renderScene, function () {
            return [
                {},
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
    };function BM_Start() {
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
        var data = {
            runs: 0,
            elapsed: 0
        };
        var elapsed = 0;
        var start = Date.now();
        var end = null;
        var i = 0;
        function doRun() {
            BM_SetupFunc();
            Σ.console.log('Iteration : ' + i);
            BM_RunFunc();
            elapsed = Date.now() - start;
            BM_TearDownFunc();
            i++;
            if (i < BM_Iterations) {
                if (i === BM_Iterations / 2 + 1){
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
                var rms = BM_RMS ? BM_RMS() : 0;
                BM_Results.push({
                    time: usec,
                    latency: rms
                });
                process.exit();
            }
        }
        Σ.setImmediate(doRun);
    };Σ.addFunction(function α0() {
            var Σ_α0 = new Σ.Scope(this, Σ, α0, function () {
                return [
                    {},
                    {}
                ];
            }).hoist(init, Σ_α0);
            function init() {
                this.initialize.apply(this, arguments);
            }
            return init;
        }, Σ, "α0-0");Σ.addFunction(function α1(r, g, b) {
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
        }, Σ, "α1-1");Σ.addFunction(function α2(c1, c2) {
            var Σ_α2 = new Σ.Scope(this, Σ, α2, function () {
                return [
                    {
                        c1: c1,
                        c2: c2
                    },
                    { result: result }
                ];
            });
            var result = new Flog.RayTracer.Color(0, 0, 0);
            result.red = c1.red + c2.red;
            result.green = c1.green + c2.green;
            result.blue = c1.blue + c2.blue;
            return result;
        }, Σ, "α2-2");Σ.addFunction(function α3(c1, s) {
            var Σ_α3 = new Σ.Scope(this, Σ, α3, function () {
                return [
                    {
                        c1: c1,
                        s: s
                    },
                    { result: result }
                ];
            });
            var result = new Flog.RayTracer.Color(0, 0, 0);
            result.red = c1.red + s;
            result.green = c1.green + s;
            result.blue = c1.blue + s;
            result.limit();
            return result;
        }, Σ, "α3-3");Σ.addFunction(function α4(c1, c2) {
            var Σ_α4 = new Σ.Scope(this, Σ, α4, function () {
                return [
                    {
                        c1: c1,
                        c2: c2
                    },
                    { result: result }
                ];
            });
            var result = new Flog.RayTracer.Color(0, 0, 0);
            result.red = c1.red - c2.red;
            result.green = c1.green - c2.green;
            result.blue = c1.blue - c2.blue;
            return result;
        }, Σ, "α4-4");Σ.addFunction(function α5(c1, c2) {
            var Σ_α5 = new Σ.Scope(this, Σ, α5, function () {
                return [
                    {
                        c1: c1,
                        c2: c2
                    },
                    { result: result }
                ];
            });
            var result = new Flog.RayTracer.Color(0, 0, 0);
            result.red = c1.red * c2.red;
            result.green = c1.green * c2.green;
            result.blue = c1.blue * c2.blue;
            return result;
        }, Σ, "α5-5");Σ.addFunction(function α6(c1, f) {
            var Σ_α6 = new Σ.Scope(this, Σ, α6, function () {
                return [
                    {
                        c1: c1,
                        f: f
                    },
                    { result: result }
                ];
            });
            var result = new Flog.RayTracer.Color(0, 0, 0);
            result.red = c1.red * f;
            result.green = c1.green * f;
            result.blue = c1.blue * f;
            return result;
        }, Σ, "α6-6");Σ.addFunction(function α7(c1, f) {
            var Σ_α7 = new Σ.Scope(this, Σ, α7, function () {
                return [
                    {
                        c1: c1,
                        f: f
                    },
                    { result: result }
                ];
            });
            var result = new Flog.RayTracer.Color(0, 0, 0);
            result.red = c1.red / f;
            result.green = c1.green / f;
            result.blue = c1.blue / f;
            return result;
        }, Σ, "α7-7");Σ.addFunction(function α8() {
            this.red = this.red > 0 ? this.red > 1 ? 1 : this.red : 0;
            this.green = this.green > 0 ? this.green > 1 ? 1 : this.green : 0;
            this.blue = this.blue > 0 ? this.blue > 1 ? 1 : this.blue : 0;
        }, Σ, "α8-8");Σ.addFunction(function α9(color) {
            var Σ_α9 = new Σ.Scope(this, Σ, α9, function () {
                return [
                    { color: color },
                    { d: d }
                ];
            });
            var d = Math.abs(this.red - color.red) + Math.abs(this.green - color.green) + Math.abs(this.blue - color.blue);
            return d;
        }, Σ, "α9-9");Σ.addFunction(function α10(c1, c2, w) {
            var Σ_α10 = new Σ.Scope(this, Σ, α10, function () {
                return [
                    {
                        c1: c1,
                        c2: c2,
                        w: w
                    },
                    { result: result }
                ];
            });
            var result = new Flog.RayTracer.Color(0, 0, 0);
            result = Flog.RayTracer.Color.prototype.add(Flog.RayTracer.Color.prototype.multiplyScalar(c1, 1 - w), Flog.RayTracer.Color.prototype.multiplyScalar(c2, w));
            return result;
        }, Σ, "α10-10");Σ.addFunction(function α11() {
            var Σ_α11 = new Σ.Scope(this, Σ, α11, function () {
                return [
                    {},
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
        }, Σ, "α11-11");Σ.addFunction(function α12() {
            var Σ_α12 = new Σ.Scope(this, Σ, α12, function () {
                return [
                    {},
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
        }, Σ, "α12-12");Σ.addFunction(function α13(pos, color, intensity) {
            this.position = pos;
            this.color = color;
            this.intensity = intensity ? intensity : 10;
        }, Σ, "α13-13");Σ.addFunction(function α14() {
            return 'Light [' + this.position.x + ',' + this.position.y + ',' + this.position.z + ']';
        }, Σ, "α14-14");Σ.addFunction(function α15(x, y, z) {
            this.x = x ? x : 0;
            this.y = y ? y : 0;
            this.z = z ? z : 0;
        }, Σ, "α15-15");Σ.addFunction(function α16(vector) {
            this.x = vector.x;
            this.y = vector.y;
            this.z = vector.z;
        }, Σ, "α16-16");Σ.addFunction(function α17() {
            var Σ_α17 = new Σ.Scope(this, Σ, α17, function () {
                return [
                    {},
                    { m: m }
                ];
            });
            var m = this.magnitude();
            return new Flog.RayTracer.Vector(this.x / m, this.y / m, this.z / m);
        }, Σ, "α17-17");Σ.addFunction(function α18() {
            return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
        }, Σ, "α18-18");Σ.addFunction(function α19(w) {
            return new Flog.RayTracer.Vector(-this.z * w.y + this.y * w.z, this.z * w.x - this.x * w.z, -this.y * w.x + this.x * w.y);
        }, Σ, "α19-19");Σ.addFunction(function α20(w) {
            return this.x * w.x + this.y * w.y + this.z * w.z;
        }, Σ, "α20-20");Σ.addFunction(function α21(v, w) {
            return new Flog.RayTracer.Vector(w.x + v.x, w.y + v.y, w.z + v.z);
        }, Σ, "α21-21");Σ.addFunction(function α22(v, w) {
            if (!w || !v) {
                throw 'Vectors must be defined [' + v + ',' + w + ']';
            }
            return new Flog.RayTracer.Vector(v.x - w.x, v.y - w.y, v.z - w.z);
        }, Σ, "α22-22");Σ.addFunction(function α23(v, w) {
            return new Flog.RayTracer.Vector(v.x * w.x, v.y * w.y, v.z * w.z);
        }, Σ, "α23-23");Σ.addFunction(function α24(v, w) {
            return new Flog.RayTracer.Vector(v.x * w, v.y * w, v.z * w);
        }, Σ, "α24-24");Σ.addFunction(function α25() {
            return 'Vector [' + this.x + ',' + this.y + ',' + this.z + ']';
        }, Σ, "α25-25");Σ.addFunction(function α26(pos, dir) {
            this.position = pos;
            this.direction = dir;
        }, Σ, "α26-26");Σ.addFunction(function α27() {
            return 'Ray [' + this.position + ',' + this.direction + ']';
        }, Σ, "α27-27");Σ.addFunction(function α28() {
            this.camera = new Flog.RayTracer.Camera(new Flog.RayTracer.Vector(0, 0, -5), new Flog.RayTracer.Vector(0, 0, 1), new Flog.RayTracer.Vector(0, 1, 0));
            this.shapes = new Array();
            this.lights = new Array();
            this.background = new Flog.RayTracer.Background(new Flog.RayTracer.Color(0, 0, 0.5), 0.2);
        }, Σ, "α28-28");Σ.addFunction(function α29() {
        }, Σ, "α29-29");Σ.addFunction(function α30(u, v) {
        }, Σ, "α30-30");Σ.addFunction(function α31(t) {
            t = t % 2;
            if (t < -1) {
                t += 2;
            }
            if (t >= 1) {
                t -= 2;
            }
            return t;
        }, Σ, "α31-31");Σ.addFunction(function α32() {
            return 'Material [gloss=' + this.gloss + ', transparency=' + this.transparency + ', hasTexture=' + this.hasTexture + ']';
        }, Σ, "α32-32");Σ.addFunction(function α33(color, reflection, refraction, transparency, gloss) {
            this.color = color;
            this.reflection = reflection;
            this.transparency = transparency;
            this.gloss = gloss;
            this.hasTexture = false;
        }, Σ, "α33-33");Σ.addFunction(function α34(u, v) {
            return this.color;
        }, Σ, "α34-34");Σ.addFunction(function α35() {
            return 'SolidMaterial [gloss=' + this.gloss + ', transparency=' + this.transparency + ', hasTexture=' + this.hasTexture + ']';
        }, Σ, "α35-35");Σ.addFunction(function α36(colorEven, colorOdd, reflection, transparency, gloss, density) {
            this.colorEven = colorEven;
            this.colorOdd = colorOdd;
            this.reflection = reflection;
            this.transparency = transparency;
            this.gloss = gloss;
            this.density = density;
            this.hasTexture = true;
        }, Σ, "α36-36");Σ.addFunction(function α37(u, v) {
            var Σ_α37 = new Σ.Scope(this, Σ, α37, function () {
                return [
                    {
                        u: u,
                        v: v
                    },
                    { t: t }
                ];
            });
            var t = this.wrapUp(u * this.density) * this.wrapUp(v * this.density);
            if (t < 0) {
                return this.colorEven;
            } else {
                return this.colorOdd;
            }
        }, Σ, "α37-37");Σ.addFunction(function α38() {
            return 'ChessMaterial [gloss=' + this.gloss + ', transparency=' + this.transparency + ', hasTexture=' + this.hasTexture + ']';
        }, Σ, "α38-38");Σ.addFunction(function α39(pos, radius, material) {
            this.radius = radius;
            this.position = pos;
            this.material = material;
        }, Σ, "α39-39");Σ.addFunction(function α40(ray) {
            var Σ_α40 = new Σ.Scope(this, Σ, α40, function () {
                return [
                    { ray: ray },
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
        }, Σ, "α40-40");Σ.addFunction(function α41() {
            return 'Sphere [position=' + this.position + ', radius=' + this.radius + ']';
        }, Σ, "α41-41");Σ.addFunction(function α42(pos, d, material) {
            this.position = pos;
            this.d = d;
            this.material = material;
        }, Σ, "α42-42");Σ.addFunction(function α43(ray) {
            var Σ_α43 = new Σ.Scope(this, Σ, α43, function () {
                return [
                    { ray: ray },
                    {
                        info: info,
                        Vd: Vd,
                        t: t
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
        }, Σ, "α43-43");Σ.addFunction(function α44() {
            return 'Plane [' + this.position + ', d=' + this.d + ']';
        }, Σ, "α44-44");Σ.addFunction(function α45() {
            this.color = new Flog.RayTracer.Color(0, 0, 0);
        }, Σ, "α45-45");Σ.addFunction(function α46() {
            return 'Intersection [' + this.position + ']';
        }, Σ, "α46-46");Σ.addFunction(function α47(pos, lookAt, up) {
            this.position = pos;
            this.lookAt = lookAt;
            this.up = up;
            this.equator = lookAt.normalize().cross(this.up);
            this.screen = Flog.RayTracer.Vector.prototype.add(this.position, this.lookAt);
        }, Σ, "α47-47");Σ.addFunction(function α48(vx, vy) {
            var Σ_α48 = new Σ.Scope(this, Σ, α48, function () {
                return [
                    {
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
        }, Σ, "α48-48");Σ.addFunction(function α49() {
            return 'Ray []';
        }, Σ, "α49-49");Σ.addFunction(function α50(color, ambience) {
            this.color = color;
            this.ambience = ambience;
        }, Σ, "α50-50");Σ.addFunction(function α51(options) {
            this.options = extendObject({
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
        }, Σ, "α51-51");Σ.addFunction(function α52(x, y, color) {
            var Σ_α52 = new Σ.Scope(this, Σ, α52, function () {
                return [
                    {
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
        }, Σ, "α52-52");Σ.addFunction(function α53(scene, canvas) {
            var Σ_α53 = new Σ.Scope(this, Σ, α53, function () {
                return [
                    {
                        scene: scene,
                        canvas: canvas
                    },
                    {
                        canvasHeight: canvasHeight,
                        canvasWidth: canvasWidth
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
        }, Σ, "α53-53");Σ.addFunction(function α54(ray, scene) {
            var Σ_α54 = new Σ.Scope(this, Σ, α54, function () {
                return [
                    {
                        ray: ray,
                        scene: scene
                    },
                    { info: info }
                ];
            });
            var info = this.testIntersection(ray, scene, null);
            if (info.isHit) {
                var color = this.rayTrace(info, ray, scene, 0);
                return color;
            }
            return scene.background.color;
        }, Σ, "α54-54");Σ.addFunction(function α55(ray, scene, exclude) {
            var Σ_α55 = new Σ.Scope(this, Σ, α55, function () {
                return [
                    {
                        ray: ray,
                        scene: scene,
                        exclude: exclude
                    },
                    {
                        hits: hits,
                        best: best
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
        }, Σ, "α55-55");Σ.addFunction(function α56(P, N, V) {
            var Σ_α56 = new Σ.Scope(this, Σ, α56, function () {
                return [
                    {
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
        }, Σ, "α56-56");Σ.addFunction(function α57(info, ray, scene, depth) {
            var Σ_α57 = new Σ.Scope(this, Σ, α57, function () {
                return [
                    {
                        info: info,
                        ray: ray,
                        scene: scene,
                        depth: depth
                    },
                    {
                        color: color,
                        oldColor: oldColor,
                        shininess: shininess
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
        }, Σ, "α57-57");Σ.addFunction(function α58() {
        return Date.now();
    }, Σ, "α58-58");Σ.addFunction(function α59() {
    }, Σ, "α59-59");Σ.addFunction(function α60() {
    }, Σ, "α60-60");(function α0(){var Σ_α0 = new Σ.Scope(this, Σ, α0, function(){ return [{}, {}] }, "α0-7").restore(Σ).hoist(init, Σ_α0);function init() {
                this.initialize.apply(this, arguments);
            };Σ_α0.funcs["init"].prototype.gloss = 2;Σ_α0.funcs["init"].prototype.transparency = 0;Σ_α0.funcs["init"].prototype.reflection = 0;Σ_α0.funcs["init"].prototype.refraction = 0.5;Σ_α0.funcs["init"].prototype.hasTexture = false;Σ_α0.funcs["init"].prototype.initialize = Σ.getFunction("Σ.α36-36");Σ_α0.funcs["init"].prototype.getColor = Σ.getFunction("Σ.α37-37");Σ_α0.funcs["init"].prototype.wrapUp = Σ.getFunction("Σ.α31-31");Σ_α0.funcs["init"].prototype.toString = Σ.getFunction("Σ.α38-38");Σ_α0.funcs["init"].prototype.colorEven = null;Σ_α0.funcs["init"].prototype.colorOdd = null;Σ_α0.funcs["init"].prototype.density = 0.5;}());(function α0(){var Σ_α0 = new Σ.Scope(this, Σ, α0, function(){ return [{}, {}] }, "α0-0").restore(Σ).hoist(init, Σ_α0);function init() {
                this.initialize.apply(this, arguments);
            };Σ_α0.funcs["init"].prototype.red = 0;Σ_α0.funcs["init"].prototype.green = 0;Σ_α0.funcs["init"].prototype.blue = 0;Σ_α0.funcs["init"].prototype.initialize = Σ.getFunction("Σ.α1-1");Σ_α0.funcs["init"].prototype.add = Σ.getFunction("Σ.α2-2");Σ_α0.funcs["init"].prototype.addScalar = Σ.getFunction("Σ.α3-3");Σ_α0.funcs["init"].prototype.subtract = Σ.getFunction("Σ.α4-4");Σ_α0.funcs["init"].prototype.multiply = Σ.getFunction("Σ.α5-5");Σ_α0.funcs["init"].prototype.multiplyScalar = Σ.getFunction("Σ.α6-6");Σ_α0.funcs["init"].prototype.divideFactor = Σ.getFunction("Σ.α7-7");Σ_α0.funcs["init"].prototype.limit = Σ.getFunction("Σ.α8-8");Σ_α0.funcs["init"].prototype.distance = Σ.getFunction("Σ.α9-9");Σ_α0.funcs["init"].prototype.blend = Σ.getFunction("Σ.α10-10");Σ_α0.funcs["init"].prototype.brightness = Σ.getFunction("Σ.α11-11");Σ_α0.funcs["init"].prototype.toString = Σ.getFunction("Σ.α12-12");}());(function α0(){var Σ_α0 = new Σ.Scope(this, Σ, α0, function(){ return [{}, {}] }, "α0-2").restore(Σ).hoist(init, Σ_α0);function init() {
                this.initialize.apply(this, arguments);
            };Σ_α0.funcs["init"].prototype.x = 0;Σ_α0.funcs["init"].prototype.y = 0;Σ_α0.funcs["init"].prototype.z = 0;Σ_α0.funcs["init"].prototype.initialize = Σ.getFunction("Σ.α15-15");Σ_α0.funcs["init"].prototype.copy = Σ.getFunction("Σ.α16-16");Σ_α0.funcs["init"].prototype.normalize = Σ.getFunction("Σ.α17-17");Σ_α0.funcs["init"].prototype.magnitude = Σ.getFunction("Σ.α18-18");Σ_α0.funcs["init"].prototype.cross = Σ.getFunction("Σ.α19-19");Σ_α0.funcs["init"].prototype.dot = Σ.getFunction("Σ.α20-20");Σ_α0.funcs["init"].prototype.add = Σ.getFunction("Σ.α21-21");Σ_α0.funcs["init"].prototype.subtract = Σ.getFunction("Σ.α22-22");Σ_α0.funcs["init"].prototype.multiplyVector = Σ.getFunction("Σ.α23-23");Σ_α0.funcs["init"].prototype.multiplyScalar = Σ.getFunction("Σ.α24-24");Σ_α0.funcs["init"].prototype.toString = Σ.getFunction("Σ.α25-25");}());(function α0(){var Σ_α0 = new Σ.Scope(this, Σ, α0, function(){ return [{}, {}] }, "α0-3").restore(Σ).hoist(init, Σ_α0);function init() {
                this.initialize.apply(this, arguments);
            };Σ_α0.funcs["init"].prototype.position = null;Σ_α0.funcs["init"].prototype.direction = null;Σ_α0.funcs["init"].prototype.initialize = Σ.getFunction("Σ.α26-26");Σ_α0.funcs["init"].prototype.toString = Σ.getFunction("Σ.α27-27");}());(function α0(){var Σ_α0 = new Σ.Scope(this, Σ, α0, function(){ return [{}, {}] }, "α0-4").restore(Σ).hoist(init, Σ_α0);function init() {
                this.initialize.apply(this, arguments);
            };Σ_α0.funcs["init"].prototype.camera = null;Σ_α0.funcs["init"].prototype.shapes = [];Σ_α0.funcs["init"].prototype.lights = [];Σ_α0.funcs["init"].prototype.background = null;Σ_α0.funcs["init"].prototype.initialize = Σ.getFunction("Σ.α28-28");}());(function α0(){var Σ_α0 = new Σ.Scope(this, Σ, α0, function(){ return [{}, {}] }, "α0-5").restore(Σ).hoist(init, Σ_α0);function init() {
                this.initialize.apply(this, arguments);
            };Σ_α0.funcs["init"].prototype.gloss = 2;Σ_α0.funcs["init"].prototype.transparency = 0;Σ_α0.funcs["init"].prototype.reflection = 0;Σ_α0.funcs["init"].prototype.refraction = 0.5;Σ_α0.funcs["init"].prototype.hasTexture = false;Σ_α0.funcs["init"].prototype.initialize = Σ.getFunction("Σ.α29-29");Σ_α0.funcs["init"].prototype.getColor = Σ.getFunction("Σ.α30-30");Σ_α0.funcs["init"].prototype.wrapUp = Σ.getFunction("Σ.α31-31");Σ_α0.funcs["init"].prototype.toString = Σ.getFunction("Σ.α32-32");}());(function α0(){var Σ_α0 = new Σ.Scope(this, Σ, α0, function(){ return [{}, {}] }, "α0-6").restore(Σ).hoist(init, Σ_α0);function init() {
                this.initialize.apply(this, arguments);
            };Σ_α0.funcs["init"].prototype.gloss = 2;Σ_α0.funcs["init"].prototype.transparency = 0;Σ_α0.funcs["init"].prototype.reflection = 0;Σ_α0.funcs["init"].prototype.refraction = 0.5;Σ_α0.funcs["init"].prototype.hasTexture = false;Σ_α0.funcs["init"].prototype.initialize = Σ.getFunction("Σ.α33-33");Σ_α0.funcs["init"].prototype.getColor = Σ.getFunction("Σ.α34-34");Σ_α0.funcs["init"].prototype.wrapUp = Σ.getFunction("Σ.α31-31");Σ_α0.funcs["init"].prototype.toString = Σ.getFunction("Σ.α35-35");}());(function α0(){var Σ_α0 = new Σ.Scope(this, Σ, α0, function(){ return [{}, {}] }, "α0-1").restore(Σ).hoist(init, Σ_α0);function init() {
                this.initialize.apply(this, arguments);
            };Σ_α0.funcs["init"].prototype.position = null;Σ_α0.funcs["init"].prototype.color = null;Σ_α0.funcs["init"].prototype.intensity = 10;Σ_α0.funcs["init"].prototype.initialize = Σ.getFunction("Σ.α13-13");Σ_α0.funcs["init"].prototype.toString = Σ.getFunction("Σ.α14-14");}());(function α0(){var Σ_α0 = new Σ.Scope(this, Σ, α0, function(){ return [{}, {}] }, "α0-8").restore(Σ).hoist(init, Σ_α0);function init() {
                this.initialize.apply(this, arguments);
            };Σ_α0.funcs["init"].prototype.initialize = Σ.getFunction("Σ.α39-39");Σ_α0.funcs["init"].prototype.intersect = Σ.getFunction("Σ.α40-40");Σ_α0.funcs["init"].prototype.toString = Σ.getFunction("Σ.α41-41");}());(function α0(){var Σ_α0 = new Σ.Scope(this, Σ, α0, function(){ return [{}, {}] }, "α0-9").restore(Σ).hoist(init, Σ_α0);function init() {
                this.initialize.apply(this, arguments);
            };Σ_α0.funcs["init"].prototype.d = 0;Σ_α0.funcs["init"].prototype.initialize = Σ.getFunction("Σ.α42-42");Σ_α0.funcs["init"].prototype.intersect = Σ.getFunction("Σ.α43-43");Σ_α0.funcs["init"].prototype.toString = Σ.getFunction("Σ.α44-44");}());(function α0(){var Σ_α0 = new Σ.Scope(this, Σ, α0, function(){ return [{}, {}] }, "α0-10").restore(Σ).hoist(init, Σ_α0);function init() {
                this.initialize.apply(this, arguments);
            };Σ_α0.funcs["init"].prototype.isHit = false;Σ_α0.funcs["init"].prototype.hitCount = 0;Σ_α0.funcs["init"].prototype.shape = null;Σ_α0.funcs["init"].prototype.position = null;Σ_α0.funcs["init"].prototype.normal = null;Σ_α0.funcs["init"].prototype.color = null;Σ_α0.funcs["init"].prototype.distance = null;Σ_α0.funcs["init"].prototype.initialize = Σ.getFunction("Σ.α45-45");Σ_α0.funcs["init"].prototype.toString = Σ.getFunction("Σ.α46-46");}());(function α0(){var Σ_α0 = new Σ.Scope(this, Σ, α0, function(){ return [{}, {}] }, "α0-11").restore(Σ).hoist(init, Σ_α0);function init() {
                this.initialize.apply(this, arguments);
            };Σ_α0.funcs["init"].prototype.position = null;Σ_α0.funcs["init"].prototype.lookAt = null;Σ_α0.funcs["init"].prototype.equator = null;Σ_α0.funcs["init"].prototype.up = null;Σ_α0.funcs["init"].prototype.screen = null;Σ_α0.funcs["init"].prototype.initialize = Σ.getFunction("Σ.α47-47");Σ_α0.funcs["init"].prototype.getRay = Σ.getFunction("Σ.α48-48");Σ_α0.funcs["init"].prototype.toString = Σ.getFunction("Σ.α49-49");}());(function α0(){var Σ_α0 = new Σ.Scope(this, Σ, α0, function(){ return [{}, {}] }, "α0-12").restore(Σ).hoist(init, Σ_α0);function init() {
                this.initialize.apply(this, arguments);
            };Σ_α0.funcs["init"].prototype.color = null;Σ_α0.funcs["init"].prototype.ambience = 0;Σ_α0.funcs["init"].prototype.initialize = Σ.getFunction("Σ.α50-50");}());(function α0(){var Σ_α0 = new Σ.Scope(this, Σ, α0, function(){ return [{}, {}] }, "α0-13").restore(Σ).hoist(init, Σ_α0);function init() {
                this.initialize.apply(this, arguments);
            };Σ_α0.funcs["init"].prototype.canvas = null;Σ_α0.funcs["init"].prototype.initialize = Σ.getFunction("Σ.α51-51");Σ_α0.funcs["init"].prototype.setPixel = Σ.getFunction("Σ.α52-52");Σ_α0.funcs["init"].prototype.renderScene = Σ.getFunction("Σ.α53-53");Σ_α0.funcs["init"].prototype.getPixelColor = Σ.getFunction("Σ.α54-54");Σ_α0.funcs["init"].prototype.testIntersection = Σ.getFunction("Σ.α55-55");Σ_α0.funcs["init"].prototype.getReflectionRay = Σ.getFunction("Σ.α56-56");Σ_α0.funcs["init"].prototype.rayTrace = Σ.getFunction("Σ.α57-57");}());(function BM_Start(){var Σ_BM_Start = new Σ.Scope(this, Σ, BM_Start, function(){ return [{}, {data:data,elapsed:elapsed,start:start,end:end,i:i}] }, "BM_Start-14").restore(Σ).hoist(doRun, Σ_BM_Start);function doRun() {
            BM_SetupFunc();
            Σ.console.log('Iteration : ' + i);
            BM_RunFunc();
            elapsed = Date.now() - start;
            BM_TearDownFunc();
            i++;
            if (i < BM_Iterations) {
                if (i === BM_Iterations / 2 + 1){
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
                var rms = BM_RMS ? BM_RMS() : 0;
                BM_Results.push({
                    time: usec,
                    latency: rms
                });
                process.exit();
            }
        };var data = Σ.addObject({ "runs" : 0,"elapsed" : 0}, "Σ/BM_Start-14.o9");var elapsed = 0;var start = 1580250833785;var end = null;var i = 250;}());var checkNumber = 2321;var Class = Σ.addObject({ "create" : Σ.getFunction("Σ.α0-0")}, "Σ.o0");var Flog = Σ.addObject({ "RayTracer" : Σ.addObject({ "Color" : Σ.getFunction("Σ/α0-0.init"),"Light" : Σ.getFunction("Σ/α0-1.init"),"Vector" : Σ.getFunction("Σ/α0-2.init"),"Ray" : Σ.getFunction("Σ/α0-3.init"),"Scene" : Σ.getFunction("Σ/α0-4.init"),"Material" : Σ.addObject({ "BaseMaterial" : Σ.getFunction("Σ/α0-5.init"),"Solid" : Σ.getFunction("Σ/α0-6.init"),"Chessboard" : Σ.getFunction("Σ/α0-7.init")}, "Σ.o3"),"Shape" : Σ.addObject({ "Sphere" : Σ.getFunction("Σ/α0-8.init"),"Plane" : Σ.getFunction("Σ/α0-9.init")}, "Σ.o4"),"IntersectionInfo" : Σ.getFunction("Σ/α0-10.init"),"Camera" : Σ.getFunction("Σ/α0-11.init"),"Background" : Σ.getFunction("Σ/α0-12.init"),"Engine" : Σ.getFunction("Σ/α0-13.init")}, "Σ.o2")}, "Σ.o1");var performance = Σ.addObject({ "now" : Σ.getFunction("Σ.α58-58")}, "Σ.o7");var BM_RunFunc = Σ.getFunction("Σ.renderScene");var BM_SetupFunc = Σ.getFunction("Σ.α59-59");var BM_TearDownFunc = Σ.getFunction("Σ.α60-60");var BM_RMS = undefined;var BM_Iterations = 500;var BM_Min_Iterations = 16;var BM_Results = [];Σ.setImmediate(Σ.getFunction("Σ/BM_Start-14.doRun"), "ezAR944g249"); }, 'mqtt://localhost', 'raytrace.js/raytrace.js.0', {});