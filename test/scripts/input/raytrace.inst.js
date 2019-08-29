require('things-js/lib/core/Code').bootstrap(module, function (Σ) {
    Σ.setExtractor(function () {
        return [
            {},
            {
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
            }
        ];
    }).hoist(renderScene, Σ).hoist(BM_Start, Σ);
    var checkNumber;
    var Class = {
        create: Σ.addFunction(function α9sel() {
            var Σ_α9sel = new Σ.Scope(this, Σ, α9sel, function () {
                return [
                    {},
                    {}
                ];
            });
            return Σ_α9sel.addFunction(function αKvfs() {
                this.initialize.apply(this, arguments);
            }, Σ_α9sel);
        }, Σ)
    };
    Object.extend = Σ.addFunction(function αxDjx(destination, source) {
        var Σ_αxDjx = new Σ.Scope(this, Σ, αxDjx, function () {
            return [
                {
                    destination: destination,
                    source: source
                },
                { property: property }
            ];
        });
        for (var property in source) {
            destination[property] = source[property];
        }
        return destination;
    }, Σ);
    if (typeof Flog == 'undefined') {
        var Flog = {};
    }
    if (typeof Flog.RayTracer == 'undefined') {
        Flog.RayTracer = {};
    }
    Flog.RayTracer.Color = Class.create();
    Flog.RayTracer.Color.prototype = {
        red: 0,
        green: 0,
        blue: 0,
        initialize: Σ.addFunction(function α7KtG(r, g, b) {
            var Σ_α7KtG = new Σ.Scope(this, Σ, α7KtG, function () {
                return [
                    {
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
        }, Σ),
        add: Σ.addFunction(function αfVaX(c1, c2) {
            var Σ_αfVaX = new Σ.Scope(this, Σ, αfVaX, function () {
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
        }, Σ),
        addScalar: Σ.addFunction(function αtZr5(c1, s) {
            var Σ_αtZr5 = new Σ.Scope(this, Σ, αtZr5, function () {
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
        }, Σ),
        subtract: Σ.addFunction(function αFZB8(c1, c2) {
            var Σ_αFZB8 = new Σ.Scope(this, Σ, αFZB8, function () {
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
        }, Σ),
        multiply: Σ.addFunction(function αyUM0(c1, c2) {
            var Σ_αyUM0 = new Σ.Scope(this, Σ, αyUM0, function () {
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
        }, Σ),
        multiplyScalar: Σ.addFunction(function αKRWX(c1, f) {
            var Σ_αKRWX = new Σ.Scope(this, Σ, αKRWX, function () {
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
        }, Σ),
        divideFactor: Σ.addFunction(function α3aWZ(c1, f) {
            var Σ_α3aWZ = new Σ.Scope(this, Σ, α3aWZ, function () {
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
        }, Σ),
        limit: Σ.addFunction(function αmaVe() {
            this.red = this.red > 0 ? this.red > 1 ? 1 : this.red : 0;
            this.green = this.green > 0 ? this.green > 1 ? 1 : this.green : 0;
            this.blue = this.blue > 0 ? this.blue > 1 ? 1 : this.blue : 0;
        }, Σ),
        distance: Σ.addFunction(function αXN7z(color) {
            var Σ_αXN7z = new Σ.Scope(this, Σ, αXN7z, function () {
                return [
                    { color: color },
                    { d: d }
                ];
            });
            var d = Math.abs(this.red - color.red) + Math.abs(this.green - color.green) + Math.abs(this.blue - color.blue);
            return d;
        }, Σ),
        blend: Σ.addFunction(function αMnhP(c1, c2, w) {
            var Σ_αMnhP = new Σ.Scope(this, Σ, αMnhP, function () {
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
        }, Σ),
        brightness: Σ.addFunction(function α6aTB() {
            var Σ_α6aTB = new Σ.Scope(this, Σ, α6aTB, function () {
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
        }, Σ),
        toString: Σ.addFunction(function αmZH5() {
            var Σ_αmZH5 = new Σ.Scope(this, Σ, αmZH5, function () {
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
        }, Σ)
    };
    if (typeof Flog == 'undefined') {
        var Flog = {};
    }
    if (typeof Flog.RayTracer == 'undefined') {
        Flog.RayTracer = {};
    }
    Flog.RayTracer.Light = Class.create();
    Flog.RayTracer.Light.prototype = {
        position: null,
        color: null,
        intensity: 10,
        initialize: Σ.addFunction(function αS0TF(pos, color, intensity) {
            var Σ_αS0TF = new Σ.Scope(this, Σ, αS0TF, function () {
                return [
                    {
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
        }, Σ),
        toString: Σ.addFunction(function αl33E() {
            return 'Light [' + this.position.x + ',' + this.position.y + ',' + this.position.z + ']';
        }, Σ)
    };
    if (typeof Flog == 'undefined') {
        var Flog = {};
    }
    if (typeof Flog.RayTracer == 'undefined') {
        Flog.RayTracer = {};
    }
    Flog.RayTracer.Vector = Class.create();
    Flog.RayTracer.Vector.prototype = {
        x: 0,
        y: 0,
        z: 0,
        initialize: Σ.addFunction(function αGbPW(x, y, z) {
            var Σ_αGbPW = new Σ.Scope(this, Σ, αGbPW, function () {
                return [
                    {
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
        }, Σ),
        copy: Σ.addFunction(function α7S7c(vector) {
            var Σ_α7S7c = new Σ.Scope(this, Σ, α7S7c, function () {
                return [
                    { vector: vector },
                    {}
                ];
            });
            this.x = vector.x;
            this.y = vector.y;
            this.z = vector.z;
        }, Σ),
        normalize: Σ.addFunction(function αgaIa() {
            var Σ_αgaIa = new Σ.Scope(this, Σ, αgaIa, function () {
                return [
                    {},
                    { m: m }
                ];
            });
            var m = this.magnitude();
            return new Flog.RayTracer.Vector(this.x / m, this.y / m, this.z / m);
        }, Σ),
        magnitude: Σ.addFunction(function αGOlW() {
            return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
        }, Σ),
        cross: Σ.addFunction(function αvBBq(w) {
            var Σ_αvBBq = new Σ.Scope(this, Σ, αvBBq, function () {
                return [
                    { w: w },
                    {}
                ];
            });
            return new Flog.RayTracer.Vector(-this.z * w.y + this.y * w.z, this.z * w.x - this.x * w.z, -this.y * w.x + this.x * w.y);
        }, Σ),
        dot: Σ.addFunction(function αAWdJ(w) {
            var Σ_αAWdJ = new Σ.Scope(this, Σ, αAWdJ, function () {
                return [
                    { w: w },
                    {}
                ];
            });
            return this.x * w.x + this.y * w.y + this.z * w.z;
        }, Σ),
        add: Σ.addFunction(function α5gIT(v, w) {
            var Σ_α5gIT = new Σ.Scope(this, Σ, α5gIT, function () {
                return [
                    {
                        v: v,
                        w: w
                    },
                    {}
                ];
            });
            return new Flog.RayTracer.Vector(w.x + v.x, w.y + v.y, w.z + v.z);
        }, Σ),
        subtract: Σ.addFunction(function αzA8b(v, w) {
            var Σ_αzA8b = new Σ.Scope(this, Σ, αzA8b, function () {
                return [
                    {
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
        }, Σ),
        multiplyVector: Σ.addFunction(function αmkfE(v, w) {
            var Σ_αmkfE = new Σ.Scope(this, Σ, αmkfE, function () {
                return [
                    {
                        v: v,
                        w: w
                    },
                    {}
                ];
            });
            return new Flog.RayTracer.Vector(v.x * w.x, v.y * w.y, v.z * w.z);
        }, Σ),
        multiplyScalar: Σ.addFunction(function αcdPq(v, w) {
            var Σ_αcdPq = new Σ.Scope(this, Σ, αcdPq, function () {
                return [
                    {
                        v: v,
                        w: w
                    },
                    {}
                ];
            });
            return new Flog.RayTracer.Vector(v.x * w, v.y * w, v.z * w);
        }, Σ),
        toString: Σ.addFunction(function αj8X5() {
            return 'Vector [' + this.x + ',' + this.y + ',' + this.z + ']';
        }, Σ)
    };
    if (typeof Flog == 'undefined') {
        var Flog = {};
    }
    if (typeof Flog.RayTracer == 'undefined') {
        Flog.RayTracer = {};
    }
    Flog.RayTracer.Ray = Class.create();
    Flog.RayTracer.Ray.prototype = {
        position: null,
        direction: null,
        initialize: Σ.addFunction(function α9PHe(pos, dir) {
            var Σ_α9PHe = new Σ.Scope(this, Σ, α9PHe, function () {
                return [
                    {
                        pos: pos,
                        dir: dir
                    },
                    {}
                ];
            });
            this.position = pos;
            this.direction = dir;
        }, Σ),
        toString: Σ.addFunction(function αSZlR() {
            return 'Ray [' + this.position + ',' + this.direction + ']';
        }, Σ)
    };
    if (typeof Flog == 'undefined') {
        var Flog = {};
    }
    if (typeof Flog.RayTracer == 'undefined') {
        Flog.RayTracer = {};
    }
    Flog.RayTracer.Scene = Class.create();
    Flog.RayTracer.Scene.prototype = {
        camera: null,
        shapes: [],
        lights: [],
        background: null,
        initialize: Σ.addFunction(function αR3lE() {
            this.camera = new Flog.RayTracer.Camera(new Flog.RayTracer.Vector(0, 0, -5), new Flog.RayTracer.Vector(0, 0, 1), new Flog.RayTracer.Vector(0, 1, 0));
            this.shapes = new Array();
            this.lights = new Array();
            this.background = new Flog.RayTracer.Background(new Flog.RayTracer.Color(0, 0, 0.5), 0.2);
        }, Σ)
    };
    if (typeof Flog == 'undefined') {
        var Flog = {};
    }
    if (typeof Flog.RayTracer == 'undefined') {
        Flog.RayTracer = {};
    }
    if (typeof Flog.RayTracer.Material == 'undefined') {
        Flog.RayTracer.Material = {};
    }
    Flog.RayTracer.Material.BaseMaterial = Class.create();
    Flog.RayTracer.Material.BaseMaterial.prototype = {
        gloss: 2,
        transparency: 0,
        reflection: 0,
        refraction: 0.5,
        hasTexture: false,
        initialize: Σ.addFunction(function αW799() {
        }, Σ),
        getColor: Σ.addFunction(function αet5Y(u, v) {
            var Σ_αet5Y = new Σ.Scope(this, Σ, αet5Y, function () {
                return [
                    {
                        u: u,
                        v: v
                    },
                    {}
                ];
            });
        }, Σ),
        wrapUp: Σ.addFunction(function αQERX(t) {
            var Σ_αQERX = new Σ.Scope(this, Σ, αQERX, function () {
                return [
                    { t: t },
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
        }, Σ),
        toString: Σ.addFunction(function αKcNi() {
            return 'Material [gloss=' + this.gloss + ', transparency=' + this.transparency + ', hasTexture=' + this.hasTexture + ']';
        }, Σ)
    };
    if (typeof Flog == 'undefined') {
        var Flog = {};
    }
    if (typeof Flog.RayTracer == 'undefined') {
        Flog.RayTracer = {};
    }
    Flog.RayTracer.Material.Solid = Class.create();
    Flog.RayTracer.Material.Solid.prototype = Object.extend(new Flog.RayTracer.Material.BaseMaterial(), {
        initialize: Σ.addFunction(function α9C5A(color, reflection, refraction, transparency, gloss) {
            var Σ_α9C5A = new Σ.Scope(this, Σ, α9C5A, function () {
                return [
                    {
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
        }, Σ),
        getColor: Σ.addFunction(function αBNdF(u, v) {
            var Σ_αBNdF = new Σ.Scope(this, Σ, αBNdF, function () {
                return [
                    {
                        u: u,
                        v: v
                    },
                    {}
                ];
            });
            return this.color;
        }, Σ),
        toString: Σ.addFunction(function αJZ2J() {
            return 'SolidMaterial [gloss=' + this.gloss + ', transparency=' + this.transparency + ', hasTexture=' + this.hasTexture + ']';
        }, Σ)
    });
    if (typeof Flog == 'undefined') {
        var Flog = {};
    }
    if (typeof Flog.RayTracer == 'undefined') {
        Flog.RayTracer = {};
    }
    Flog.RayTracer.Material.Chessboard = Class.create();
    Flog.RayTracer.Material.Chessboard.prototype = Object.extend(new Flog.RayTracer.Material.BaseMaterial(), {
        colorEven: null,
        colorOdd: null,
        density: 0.5,
        initialize: Σ.addFunction(function αYEv8(colorEven, colorOdd, reflection, transparency, gloss, density) {
            var Σ_αYEv8 = new Σ.Scope(this, Σ, αYEv8, function () {
                return [
                    {
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
        }, Σ),
        getColor: Σ.addFunction(function αg7J0(u, v) {
            var Σ_αg7J0 = new Σ.Scope(this, Σ, αg7J0, function () {
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
        }, Σ),
        toString: Σ.addFunction(function αIKis() {
            return 'ChessMaterial [gloss=' + this.gloss + ', transparency=' + this.transparency + ', hasTexture=' + this.hasTexture + ']';
        }, Σ)
    });
    if (typeof Flog == 'undefined') {
        var Flog = {};
    }
    if (typeof Flog.RayTracer == 'undefined') {
        Flog.RayTracer = {};
    }
    if (typeof Flog.RayTracer.Shape == 'undefined') {
        Flog.RayTracer.Shape = {};
    }
    Flog.RayTracer.Shape.Sphere = Class.create();
    Flog.RayTracer.Shape.Sphere.prototype = {
        initialize: Σ.addFunction(function αo3Tq(pos, radius, material) {
            var Σ_αo3Tq = new Σ.Scope(this, Σ, αo3Tq, function () {
                return [
                    {
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
        }, Σ),
        intersect: Σ.addFunction(function αW5wG(ray) {
            var Σ_αW5wG = new Σ.Scope(this, Σ, αW5wG, function () {
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
        }, Σ),
        toString: Σ.addFunction(function α7oDp() {
            return 'Sphere [position=' + this.position + ', radius=' + this.radius + ']';
        }, Σ)
    };
    if (typeof Flog == 'undefined') {
        var Flog = {};
    }
    if (typeof Flog.RayTracer == 'undefined') {
        Flog.RayTracer = {};
    }
    if (typeof Flog.RayTracer.Shape == 'undefined') {
        Flog.RayTracer.Shape = {};
    }
    Flog.RayTracer.Shape.Plane = Class.create();
    Flog.RayTracer.Shape.Plane.prototype = {
        d: 0,
        initialize: Σ.addFunction(function αfdiL(pos, d, material) {
            var Σ_αfdiL = new Σ.Scope(this, Σ, αfdiL, function () {
                return [
                    {
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
        }, Σ),
        intersect: Σ.addFunction(function αXEnw(ray) {
            var Σ_αXEnw = new Σ.Scope(this, Σ, αXEnw, function () {
                return [
                    { ray: ray },
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
        }, Σ),
        toString: Σ.addFunction(function αn5d7() {
            return 'Plane [' + this.position + ', d=' + this.d + ']';
        }, Σ)
    };
    if (typeof Flog == 'undefined') {
        var Flog = {};
    }
    if (typeof Flog.RayTracer == 'undefined') {
        Flog.RayTracer = {};
    }
    Flog.RayTracer.IntersectionInfo = Class.create();
    Flog.RayTracer.IntersectionInfo.prototype = {
        isHit: false,
        hitCount: 0,
        shape: null,
        position: null,
        normal: null,
        color: null,
        distance: null,
        initialize: Σ.addFunction(function αyO0S() {
            this.color = new Flog.RayTracer.Color(0, 0, 0);
        }, Σ),
        toString: Σ.addFunction(function αkBvq() {
            return 'Intersection [' + this.position + ']';
        }, Σ)
    };
    if (typeof Flog == 'undefined') {
        var Flog = {};
    }
    if (typeof Flog.RayTracer == 'undefined') {
        Flog.RayTracer = {};
    }
    Flog.RayTracer.Camera = Class.create();
    Flog.RayTracer.Camera.prototype = {
        position: null,
        lookAt: null,
        equator: null,
        up: null,
        screen: null,
        initialize: Σ.addFunction(function αJCvr(pos, lookAt, up) {
            var Σ_αJCvr = new Σ.Scope(this, Σ, αJCvr, function () {
                return [
                    {
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
        }, Σ),
        getRay: Σ.addFunction(function αb4SD(vx, vy) {
            var Σ_αb4SD = new Σ.Scope(this, Σ, αb4SD, function () {
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
        }, Σ),
        toString: Σ.addFunction(function αAEbv() {
            return 'Ray []';
        }, Σ)
    };
    if (typeof Flog == 'undefined') {
        var Flog = {};
    }
    if (typeof Flog.RayTracer == 'undefined') {
        Flog.RayTracer = {};
    }
    Flog.RayTracer.Background = Class.create();
    Flog.RayTracer.Background.prototype = {
        color: null,
        ambience: 0,
        initialize: Σ.addFunction(function αwMk3(color, ambience) {
            var Σ_αwMk3 = new Σ.Scope(this, Σ, αwMk3, function () {
                return [
                    {
                        color: color,
                        ambience: ambience
                    },
                    {}
                ];
            });
            this.color = color;
            this.ambience = ambience;
        }, Σ)
    };
    if (typeof Flog == 'undefined') {
        var Flog = {};
    }
    if (typeof Flog.RayTracer == 'undefined') {
        Flog.RayTracer = {};
    }
    Flog.RayTracer.Engine = Class.create();
    Flog.RayTracer.Engine.prototype = {
        canvas: null,
        initialize: Σ.addFunction(function α62MX(options) {
            var Σ_α62MX = new Σ.Scope(this, Σ, α62MX, function () {
                return [
                    { options: options },
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
        }, Σ),
        setPixel: Σ.addFunction(function αAMhZ(x, y, color) {
            var Σ_αAMhZ = new Σ.Scope(this, Σ, αAMhZ, function () {
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
        }, Σ),
        renderScene: Σ.addFunction(function αy91q(scene, canvas) {
            var Σ_αy91q = new Σ.Scope(this, Σ, αy91q, function () {
                return [
                    {
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
        }, Σ),
        getPixelColor: Σ.addFunction(function α4OIU(ray, scene) {
            var Σ_α4OIU = new Σ.Scope(this, Σ, α4OIU, function () {
                return [
                    {
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
        }, Σ),
        testIntersection: Σ.addFunction(function αsVgd(ray, scene, exclude) {
            var Σ_αsVgd = new Σ.Scope(this, Σ, αsVgd, function () {
                return [
                    {
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
        }, Σ),
        getReflectionRay: Σ.addFunction(function αzjsi(P, N, V) {
            var Σ_αzjsi = new Σ.Scope(this, Σ, αzjsi, function () {
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
        }, Σ),
        rayTrace: Σ.addFunction(function α9nbh(info, ray, scene, depth) {
            var Σ_α9nbh = new Σ.Scope(this, Σ, α9nbh, function () {
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
        }, Σ)
    };
    function renderScene() {
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
    }
    var performance = {};
    performance.now = Σ.addFunction(function αfGJp() {
        return Date.now();
    }, Σ);
    var BM_RunFunc = renderScene;
    var BM_SetupFunc = Σ.addFunction(function αaG9b() {
    }, Σ);
    var BM_TearDownFunc = Σ.addFunction(function αHoOd() {
    }, Σ);
    var BM_RMS = undefined;
    var BM_Iterations = 500;
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
        var data = {
            runs: 0,
            elapsed: 0
        };
        var elapsed = 0;
        var start = Date.now();
        var end = null;
        var i = 0;
        function doRun() {
            var Σ_BM_Start_doRun = new Σ.Scope(this, Σ_BM_Start, doRun, function () {
                return [
                    {},
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
    }
    BM_Start();
}, 'mqtt://localhost', 'raytrace.js', {});
