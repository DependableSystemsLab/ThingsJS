(function(Σ) {
    Σ.hoist([
        [
            renderScene,
            Σ
        ]
    ]);
    Σ.refs.checkNumber = undefined;
    Σ.refs.Class = {
        create: Σ.addFunction(function αwRm5() {
            var Σ_0 = new Σ.Scope(this, αwRm5, '0', Σ, {}, []);
            return Σ_0.addFunction(function αZrUH() {
                var Σ_0_0 = new Σ.Scope(this, αZrUH, '0', Σ_0, {}, []);
                this.initialize.apply(this, arguments);
            }, Σ_0);
        }, Σ)
    };
    Object.extend = Σ.addFunction(function αFUxx(destination, source) {
        var Σ_1 = new Σ.Scope(this, αFUxx, '1', Σ, {
            destination: destination,
            source: source
        }, []);
        for (var property in source) {
            destination[property] = source[property];
        }
        return Σ_1.refs.destination;
    }, Σ);
    if (typeof Flog == 'undefined') {
        Σ.refs.Flog = {};
    }
    if (typeof Σ.refs.Flog.RayTracer == 'undefined') {
        Σ.refs.Flog.RayTracer = {};
    }
    Σ.refs.Flog.RayTracer.Color = Σ.refs.Class.create();
    Σ.refs.Flog.RayTracer.Color.prototype = {
        red: 0,
        green: 0,
        blue: 0,
        initialize: Σ.addFunction(function αVpcZ(r, g, b) {
            var Σ_2 = new Σ.Scope(this, αVpcZ, '2', Σ, {
                r: r,
                g: g,
                b: b
            }, []);
            if (!Σ_2.refs.r) {
                Σ_2.refs.r = 0;
            }
            if (!Σ_2.refs.g) {
                Σ_2.refs.g = 0;
            }
            if (!Σ_2.refs.b) {
                Σ_2.refs.b = 0;
            }
            this.red = Σ_2.refs.r;
            this.green = Σ_2.refs.g;
            this.blue = Σ_2.refs.b;
        }, Σ),
        add: Σ.addFunction(function αeKsH(c1, c2) {
            var Σ_3 = new Σ.Scope(this, αeKsH, '3', Σ, {
                c1: c1,
                c2: c2
            }, []);
            Σ_3.refs.result = new Σ.refs.Flog.RayTracer.Color(0, 0, 0);
            Σ_3.refs.result.red = Σ_3.refs.c1.red + Σ_3.refs.c2.red;
            Σ_3.refs.result.green = Σ_3.refs.c1.green + Σ_3.refs.c2.green;
            Σ_3.refs.result.blue = Σ_3.refs.c1.blue + Σ_3.refs.c2.blue;
            return Σ_3.refs.result;
        }, Σ),
        addScalar: Σ.addFunction(function αlvaW(c1, s) {
            var Σ_4 = new Σ.Scope(this, αlvaW, '4', Σ, {
                c1: c1,
                s: s
            }, []);
            Σ_4.refs.result = new Σ.refs.Flog.RayTracer.Color(0, 0, 0);
            Σ_4.refs.result.red = Σ_4.refs.c1.red + Σ_4.refs.s;
            Σ_4.refs.result.green = Σ_4.refs.c1.green + Σ_4.refs.s;
            Σ_4.refs.result.blue = Σ_4.refs.c1.blue + Σ_4.refs.s;
            Σ_4.refs.result.limit();
            return Σ_4.refs.result;
        }, Σ),
        subtract: Σ.addFunction(function αw3hK(c1, c2) {
            var Σ_5 = new Σ.Scope(this, αw3hK, '5', Σ, {
                c1: c1,
                c2: c2
            }, []);
            Σ_5.refs.result = new Σ.refs.Flog.RayTracer.Color(0, 0, 0);
            Σ_5.refs.result.red = Σ_5.refs.c1.red - Σ_5.refs.c2.red;
            Σ_5.refs.result.green = Σ_5.refs.c1.green - Σ_5.refs.c2.green;
            Σ_5.refs.result.blue = Σ_5.refs.c1.blue - Σ_5.refs.c2.blue;
            return Σ_5.refs.result;
        }, Σ),
        multiply: Σ.addFunction(function αfrXC(c1, c2) {
            var Σ_6 = new Σ.Scope(this, αfrXC, '6', Σ, {
                c1: c1,
                c2: c2
            }, []);
            Σ_6.refs.result = new Σ.refs.Flog.RayTracer.Color(0, 0, 0);
            Σ_6.refs.result.red = Σ_6.refs.c1.red * Σ_6.refs.c2.red;
            Σ_6.refs.result.green = Σ_6.refs.c1.green * Σ_6.refs.c2.green;
            Σ_6.refs.result.blue = Σ_6.refs.c1.blue * Σ_6.refs.c2.blue;
            return Σ_6.refs.result;
        }, Σ),
        multiplyScalar: Σ.addFunction(function αDKew(c1, f) {
            var Σ_7 = new Σ.Scope(this, αDKew, '7', Σ, {
                c1: c1,
                f: f
            }, []);
            Σ_7.refs.result = new Σ.refs.Flog.RayTracer.Color(0, 0, 0);
            Σ_7.refs.result.red = Σ_7.refs.c1.red * Σ_7.refs.f;
            Σ_7.refs.result.green = Σ_7.refs.c1.green * Σ_7.refs.f;
            Σ_7.refs.result.blue = Σ_7.refs.c1.blue * Σ_7.refs.f;
            return Σ_7.refs.result;
        }, Σ),
        divideFactor: Σ.addFunction(function αIT34(c1, f) {
            var Σ_8 = new Σ.Scope(this, αIT34, '8', Σ, {
                c1: c1,
                f: f
            }, []);
            Σ_8.refs.result = new Σ.refs.Flog.RayTracer.Color(0, 0, 0);
            Σ_8.refs.result.red = Σ_8.refs.c1.red / Σ_8.refs.f;
            Σ_8.refs.result.green = Σ_8.refs.c1.green / Σ_8.refs.f;
            Σ_8.refs.result.blue = Σ_8.refs.c1.blue / Σ_8.refs.f;
            return Σ_8.refs.result;
        }, Σ),
        limit: Σ.addFunction(function αUmX8() {
            var Σ_9 = new Σ.Scope(this, αUmX8, '9', Σ, {}, []);
            this.red = this.red > 0 ? this.red > 1 ? 1 : this.red : 0;
            this.green = this.green > 0 ? this.green > 1 ? 1 : this.green : 0;
            this.blue = this.blue > 0 ? this.blue > 1 ? 1 : this.blue : 0;
        }, Σ),
        distance: Σ.addFunction(function αA394(color) {
            var Σ_10 = new Σ.Scope(this, αA394, '10', Σ, {
                color: color
            }, []);
            Σ_10.refs.d = Math.abs(this.red - Σ_10.refs.color.red) + Math.abs(this.green - Σ_10.refs.color.green) + Math.abs(this.blue - Σ_10.refs.color.blue);
            return Σ_10.refs.d;
        }, Σ),
        blend: Σ.addFunction(function αe4wm(c1, c2, w) {
            var Σ_11 = new Σ.Scope(this, αe4wm, '11', Σ, {
                c1: c1,
                c2: c2,
                w: w
            }, []);
            Σ_11.refs.result = new Σ.refs.Flog.RayTracer.Color(0, 0, 0);
            Σ_11.refs.result = Σ.refs.Flog.RayTracer.Color.prototype.add(Σ.refs.Flog.RayTracer.Color.prototype.multiplyScalar(Σ_11.refs.c1, 1 - Σ_11.refs.w), Σ.refs.Flog.RayTracer.Color.prototype.multiplyScalar(Σ_11.refs.c2, Σ_11.refs.w));
            return Σ_11.refs.result;
        }, Σ),
        brightness: Σ.addFunction(function αsE7j() {
            var Σ_12 = new Σ.Scope(this, αsE7j, '12', Σ, {}, []);
            Σ_12.refs.r = Math.floor(this.red * 255);
            Σ_12.refs.g = Math.floor(this.green * 255);
            Σ_12.refs.b = Math.floor(this.blue * 255);
            return Σ_12.refs.r * 77 + Σ_12.refs.g * 150 + Σ_12.refs.b * 29 >> 8;
        }, Σ),
        toString: Σ.addFunction(function αoicq() {
            var Σ_13 = new Σ.Scope(this, αoicq, '13', Σ, {}, []);
            Σ_13.refs.r = Math.floor(this.red * 255);
            Σ_13.refs.g = Math.floor(this.green * 255);
            Σ_13.refs.b = Math.floor(this.blue * 255);
            return 'rgb(' + Σ_13.refs.r + ',' + Σ_13.refs.g + ',' + Σ_13.refs.b + ')';
        }, Σ)
    };
    if (typeof Σ.refs.Flog == 'undefined') {
        Σ.refs.Flog = {};
    }
    if (typeof Σ.refs.Flog.RayTracer == 'undefined') {
        Σ.refs.Flog.RayTracer = {};
    }
    Σ.refs.Flog.RayTracer.Light = Σ.refs.Class.create();
    Σ.refs.Flog.RayTracer.Light.prototype = {
        position: null,
        color: null,
        intensity: 10,
        initialize: Σ.addFunction(function αnT2K(pos, color, intensity) {
            var Σ_14 = new Σ.Scope(this, αnT2K, '14', Σ, {
                pos: pos,
                color: color,
                intensity: intensity
            }, []);
            this.position = Σ_14.refs.pos;
            this.color = Σ_14.refs.color;
            this.intensity = Σ_14.refs.intensity ? Σ_14.refs.intensity : 10;
        }, Σ),
        toString: Σ.addFunction(function α96eu() {
            var Σ_15 = new Σ.Scope(this, α96eu, '15', Σ, {}, []);
            return 'Light [' + this.position.x + ',' + this.position.y + ',' + this.position.z + ']';
        }, Σ)
    };
    if (typeof Σ.refs.Flog == 'undefined') {
        Σ.refs.Flog = {};
    }
    if (typeof Σ.refs.Flog.RayTracer == 'undefined') {
        Σ.refs.Flog.RayTracer = {};
    }
    Σ.refs.Flog.RayTracer.Vector = Σ.refs.Class.create();
    Σ.refs.Flog.RayTracer.Vector.prototype = {
        x: 0,
        y: 0,
        z: 0,
        initialize: Σ.addFunction(function αswJi(x, y, z) {
            var Σ_16 = new Σ.Scope(this, αswJi, '16', Σ, {
                x: x,
                y: y,
                z: z
            }, []);
            this.x = Σ_16.refs.x ? Σ_16.refs.x : 0;
            this.y = Σ_16.refs.y ? Σ_16.refs.y : 0;
            this.z = Σ_16.refs.z ? Σ_16.refs.z : 0;
        }, Σ),
        copy: Σ.addFunction(function αgvbV(vector) {
            var Σ_17 = new Σ.Scope(this, αgvbV, '17', Σ, {
                vector: vector
            }, []);
            this.x = Σ_17.refs.vector.x;
            this.y = Σ_17.refs.vector.y;
            this.z = Σ_17.refs.vector.z;
        }, Σ),
        normalize: Σ.addFunction(function αbVcs() {
            var Σ_18 = new Σ.Scope(this, αbVcs, '18', Σ, {}, []);
            Σ_18.refs.m = this.magnitude();
            return new Σ.refs.Flog.RayTracer.Vector(this.x / Σ_18.refs.m, this.y / Σ_18.refs.m, this.z / Σ_18.refs.m);
        }, Σ),
        magnitude: Σ.addFunction(function αsLdd() {
            var Σ_19 = new Σ.Scope(this, αsLdd, '19', Σ, {}, []);
            return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
        }, Σ),
        cross: Σ.addFunction(function αUjZM(w) {
            var Σ_20 = new Σ.Scope(this, αUjZM, '20', Σ, {
                w: w
            }, []);
            return new Σ.refs.Flog.RayTracer.Vector(-this.z * Σ_20.refs.w.y + this.y * Σ_20.refs.w.z, this.z * Σ_20.refs.w.x - this.x * Σ_20.refs.w.z, -this.y * Σ_20.refs.w.x + this.x * Σ_20.refs.w.y);
        }, Σ),
        dot: Σ.addFunction(function αP0MG(w) {
            var Σ_21 = new Σ.Scope(this, αP0MG, '21', Σ, {
                w: w
            }, []);
            return this.x * Σ_21.refs.w.x + this.y * Σ_21.refs.w.y + this.z * Σ_21.refs.w.z;
        }, Σ),
        add: Σ.addFunction(function αe3ud(v, w) {
            var Σ_22 = new Σ.Scope(this, αe3ud, '22', Σ, {
                v: v,
                w: w
            }, []);
            return new Σ.refs.Flog.RayTracer.Vector(Σ_22.refs.w.x + Σ_22.refs.v.x, Σ_22.refs.w.y + Σ_22.refs.v.y, Σ_22.refs.w.z + Σ_22.refs.v.z);
        }, Σ),
        subtract: Σ.addFunction(function αULE8(v, w) {
            var Σ_23 = new Σ.Scope(this, αULE8, '23', Σ, {
                v: v,
                w: w
            }, []);
            if (!Σ_23.refs.w || !Σ_23.refs.v) {
                throw 'Vectors must be defined [' + Σ_23.refs.v + ',' + Σ_23.refs.w + ']';
            }
            return new Σ.refs.Flog.RayTracer.Vector(Σ_23.refs.v.x - Σ_23.refs.w.x, Σ_23.refs.v.y - Σ_23.refs.w.y, Σ_23.refs.v.z - Σ_23.refs.w.z);
        }, Σ),
        multiplyVector: Σ.addFunction(function αIn7K(v, w) {
            var Σ_24 = new Σ.Scope(this, αIn7K, '24', Σ, {
                v: v,
                w: w
            }, []);
            return new Σ.refs.Flog.RayTracer.Vector(Σ_24.refs.v.x * Σ_24.refs.w.x, Σ_24.refs.v.y * Σ_24.refs.w.y, Σ_24.refs.v.z * Σ_24.refs.w.z);
        }, Σ),
        multiplyScalar: Σ.addFunction(function αYXCW(v, w) {
            var Σ_25 = new Σ.Scope(this, αYXCW, '25', Σ, {
                v: v,
                w: w
            }, []);
            return new Σ.refs.Flog.RayTracer.Vector(Σ_25.refs.v.x * Σ_25.refs.w, Σ_25.refs.v.y * Σ_25.refs.w, Σ_25.refs.v.z * Σ_25.refs.w);
        }, Σ),
        toString: Σ.addFunction(function αzrsJ() {
            var Σ_26 = new Σ.Scope(this, αzrsJ, '26', Σ, {}, []);
            return 'Vector [' + this.x + ',' + this.y + ',' + this.z + ']';
        }, Σ)
    };
    if (typeof Σ.refs.Flog == 'undefined') {
        Σ.refs.Flog = {};
    }
    if (typeof Σ.refs.Flog.RayTracer == 'undefined') {
        Σ.refs.Flog.RayTracer = {};
    }
    Σ.refs.Flog.RayTracer.Ray = Σ.refs.Class.create();
    Σ.refs.Flog.RayTracer.Ray.prototype = {
        position: null,
        direction: null,
        initialize: Σ.addFunction(function αF1pb(pos, dir) {
            var Σ_27 = new Σ.Scope(this, αF1pb, '27', Σ, {
                pos: pos,
                dir: dir
            }, []);
            this.position = Σ_27.refs.pos;
            this.direction = Σ_27.refs.dir;
        }, Σ),
        toString: Σ.addFunction(function α8BbV() {
            var Σ_28 = new Σ.Scope(this, α8BbV, '28', Σ, {}, []);
            return 'Ray [' + this.position + ',' + this.direction + ']';
        }, Σ)
    };
    if (typeof Σ.refs.Flog == 'undefined') {
        Σ.refs.Flog = {};
    }
    if (typeof Σ.refs.Flog.RayTracer == 'undefined') {
        Σ.refs.Flog.RayTracer = {};
    }
    Σ.refs.Flog.RayTracer.Scene = Σ.refs.Class.create();
    Σ.refs.Flog.RayTracer.Scene.prototype = {
        camera: null,
        shapes: [],
        lights: [],
        background: null,
        initialize: Σ.addFunction(function αHNhH() {
            var Σ_29 = new Σ.Scope(this, αHNhH, '29', Σ, {}, []);
            this.camera = new Σ.refs.Flog.RayTracer.Camera(new Σ.refs.Flog.RayTracer.Vector(0, 0, -5), new Σ.refs.Flog.RayTracer.Vector(0, 0, 1), new Σ.refs.Flog.RayTracer.Vector(0, 1, 0));
            this.shapes = new Array();
            this.lights = new Array();
            this.background = new Σ.refs.Flog.RayTracer.Background(new Σ.refs.Flog.RayTracer.Color(0, 0, 0.5), 0.2);
        }, Σ)
    };
    if (typeof Σ.refs.Flog == 'undefined') {
        Σ.refs.Flog = {};
    }
    if (typeof Σ.refs.Flog.RayTracer == 'undefined') {
        Σ.refs.Flog.RayTracer = {};
    }
    if (typeof Σ.refs.Flog.RayTracer.Material == 'undefined') {
        Σ.refs.Flog.RayTracer.Material = {};
    }
    Σ.refs.Flog.RayTracer.Material.BaseMaterial = Σ.refs.Class.create();
    Σ.refs.Flog.RayTracer.Material.BaseMaterial.prototype = {
        gloss: 2,
        transparency: 0,
        reflection: 0,
        refraction: 0.5,
        hasTexture: false,
        initialize: Σ.addFunction(function αKjas() {
            var Σ_30 = new Σ.Scope(this, αKjas, '30', Σ, {}, []);
        }, Σ),
        getColor: Σ.addFunction(function αgWd8(u, v) {
            var Σ_31 = new Σ.Scope(this, αgWd8, '31', Σ, {
                u: u,
                v: v
            }, []);
        }, Σ),
        wrapUp: Σ.addFunction(function αS0PT(t) {
            var Σ_32 = new Σ.Scope(this, αS0PT, '32', Σ, {
                t: t
            }, []);
            Σ_32.refs.t = Σ_32.refs.t % 2;
            if (Σ_32.refs.t < -1) {
                Σ_32.refs.t += 2;
            }
            if (Σ_32.refs.t >= 1) {
                Σ_32.refs.t -= 2;
            }
            return Σ_32.refs.t;
        }, Σ),
        toString: Σ.addFunction(function αY8Jd() {
            var Σ_33 = new Σ.Scope(this, αY8Jd, '33', Σ, {}, []);
            return 'Material [gloss=' + this.gloss + ', transparency=' + this.transparency + ', hasTexture=' + this.hasTexture + ']';
        }, Σ)
    };
    if (typeof Σ.refs.Flog == 'undefined') {
        Σ.refs.Flog = {};
    }
    if (typeof Σ.refs.Flog.RayTracer == 'undefined') {
        Σ.refs.Flog.RayTracer = {};
    }
    Σ.refs.Flog.RayTracer.Material.Solid = Σ.refs.Class.create();
    Σ.refs.Flog.RayTracer.Material.Solid.prototype = Object.extend(new Σ.refs.Flog.RayTracer.Material.BaseMaterial(), {
        initialize: Σ.addFunction(function αCfH5(color, reflection, refraction, transparency, gloss) {
            var Σ_34 = new Σ.Scope(this, αCfH5, '34', Σ, {
                color: color,
                reflection: reflection,
                refraction: refraction,
                transparency: transparency,
                gloss: gloss
            }, []);
            this.color = Σ_34.refs.color;
            this.reflection = Σ_34.refs.reflection;
            this.transparency = Σ_34.refs.transparency;
            this.gloss = Σ_34.refs.gloss;
            this.hasTexture = false;
        }, Σ),
        getColor: Σ.addFunction(function α9jwe(u, v) {
            var Σ_35 = new Σ.Scope(this, α9jwe, '35', Σ, {
                u: u,
                v: v
            }, []);
            return this.color;
        }, Σ),
        toString: Σ.addFunction(function αc61N() {
            var Σ_36 = new Σ.Scope(this, αc61N, '36', Σ, {}, []);
            return 'SolidMaterial [gloss=' + this.gloss + ', transparency=' + this.transparency + ', hasTexture=' + this.hasTexture + ']';
        }, Σ)
    });
    if (typeof Σ.refs.Flog == 'undefined') {
        Σ.refs.Flog = {};
    }
    if (typeof Σ.refs.Flog.RayTracer == 'undefined') {
        Σ.refs.Flog.RayTracer = {};
    }
    Σ.refs.Flog.RayTracer.Material.Chessboard = Σ.refs.Class.create();
    Σ.refs.Flog.RayTracer.Material.Chessboard.prototype = Object.extend(new Σ.refs.Flog.RayTracer.Material.BaseMaterial(), {
        colorEven: null,
        colorOdd: null,
        density: 0.5,
        initialize: Σ.addFunction(function α2tml(colorEven, colorOdd, reflection, transparency, gloss, density) {
            var Σ_37 = new Σ.Scope(this, α2tml, '37', Σ, {
                colorEven: colorEven,
                colorOdd: colorOdd,
                reflection: reflection,
                transparency: transparency,
                gloss: gloss,
                density: density
            }, []);
            this.colorEven = Σ_37.refs.colorEven;
            this.colorOdd = Σ_37.refs.colorOdd;
            this.reflection = Σ_37.refs.reflection;
            this.transparency = Σ_37.refs.transparency;
            this.gloss = Σ_37.refs.gloss;
            this.density = Σ_37.refs.density;
            this.hasTexture = true;
        }, Σ),
        getColor: Σ.addFunction(function αDADJ(u, v) {
            var Σ_38 = new Σ.Scope(this, αDADJ, '38', Σ, {
                u: u,
                v: v
            }, []);
            Σ_38.refs.t = this.wrapUp(Σ_38.refs.u * this.density) * this.wrapUp(Σ_38.refs.v * this.density);
            if (Σ_38.refs.t < 0) {
                return this.colorEven;
            } else {
                return this.colorOdd;
            }
        }, Σ),
        toString: Σ.addFunction(function αkJae() {
            var Σ_39 = new Σ.Scope(this, αkJae, '39', Σ, {}, []);
            return 'ChessMaterial [gloss=' + this.gloss + ', transparency=' + this.transparency + ', hasTexture=' + this.hasTexture + ']';
        }, Σ)
    });
    if (typeof Σ.refs.Flog == 'undefined') {
        Σ.refs.Flog = {};
    }
    if (typeof Σ.refs.Flog.RayTracer == 'undefined') {
        Σ.refs.Flog.RayTracer = {};
    }
    if (typeof Σ.refs.Flog.RayTracer.Shape == 'undefined') {
        Σ.refs.Flog.RayTracer.Shape = {};
    }
    Σ.refs.Flog.RayTracer.Shape.Sphere = Σ.refs.Class.create();
    Σ.refs.Flog.RayTracer.Shape.Sphere.prototype = {
        initialize: Σ.addFunction(function αfgW5(pos, radius, material) {
            var Σ_40 = new Σ.Scope(this, αfgW5, '40', Σ, {
                pos: pos,
                radius: radius,
                material: material
            }, []);
            this.radius = Σ_40.refs.radius;
            this.position = Σ_40.refs.pos;
            this.material = Σ_40.refs.material;
        }, Σ),
        intersect: Σ.addFunction(function αvVuH(ray) {
            var Σ_41 = new Σ.Scope(this, αvVuH, '41', Σ, {
                ray: ray
            }, []);
            Σ_41.refs.info = new Σ.refs.Flog.RayTracer.IntersectionInfo();
            Σ_41.refs.info.shape = this;
            Σ_41.refs.dst = Σ.refs.Flog.RayTracer.Vector.prototype.subtract(Σ_41.refs.ray.position, this.position);
            Σ_41.refs.B = Σ_41.refs.dst.dot(Σ_41.refs.ray.direction);
            Σ_41.refs.C = Σ_41.refs.dst.dot(Σ_41.refs.dst) - this.radius * this.radius;
            Σ_41.refs.D = Σ_41.refs.B * Σ_41.refs.B - Σ_41.refs.C;
            if (Σ_41.refs.D > 0) {
                Σ_41.refs.info.isHit = true;
                Σ_41.refs.info.distance = -Σ_41.refs.B - Math.sqrt(Σ_41.refs.D);
                Σ_41.refs.info.position = Σ.refs.Flog.RayTracer.Vector.prototype.add(Σ_41.refs.ray.position, Σ.refs.Flog.RayTracer.Vector.prototype.multiplyScalar(Σ_41.refs.ray.direction, Σ_41.refs.info.distance));
                Σ_41.refs.info.normal = Σ.refs.Flog.RayTracer.Vector.prototype.subtract(Σ_41.refs.info.position, this.position).normalize();
                Σ_41.refs.info.color = this.material.getColor(0, 0);
            } else {
                Σ_41.refs.info.isHit = false;
            }
            return Σ_41.refs.info;
        }, Σ),
        toString: Σ.addFunction(function α4lWr() {
            var Σ_42 = new Σ.Scope(this, α4lWr, '42', Σ, {}, []);
            return 'Sphere [position=' + this.position + ', radius=' + this.radius + ']';
        }, Σ)
    };
    if (typeof Σ.refs.Flog == 'undefined') {
        Σ.refs.Flog = {};
    }
    if (typeof Σ.refs.Flog.RayTracer == 'undefined') {
        Σ.refs.Flog.RayTracer = {};
    }
    if (typeof Σ.refs.Flog.RayTracer.Shape == 'undefined') {
        Σ.refs.Flog.RayTracer.Shape = {};
    }
    Σ.refs.Flog.RayTracer.Shape.Plane = Σ.refs.Class.create();
    Σ.refs.Flog.RayTracer.Shape.Plane.prototype = {
        d: 0,
        initialize: Σ.addFunction(function αRDWE(pos, d, material) {
            var Σ_43 = new Σ.Scope(this, αRDWE, '43', Σ, {
                pos: pos,
                d: d,
                material: material
            }, []);
            this.position = Σ_43.refs.pos;
            this.d = Σ_43.refs.d;
            this.material = Σ_43.refs.material;
        }, Σ),
        intersect: Σ.addFunction(function αGT2A(ray) {
            var Σ_44 = new Σ.Scope(this, αGT2A, '44', Σ, {
                ray: ray
            }, []);
            Σ_44.refs.info = new Σ.refs.Flog.RayTracer.IntersectionInfo();
            Σ_44.refs.Vd = this.position.dot(Σ_44.refs.ray.direction);
            if (Σ_44.refs.Vd == 0) {
                return Σ_44.refs.info;
            }
            Σ_44.refs.t = -(this.position.dot(Σ_44.refs.ray.position) + this.d) / Σ_44.refs.Vd;
            if (Σ_44.refs.t <= 0) {
                return Σ_44.refs.info;
            }
            Σ_44.refs.info.shape = this;
            Σ_44.refs.info.isHit = true;
            Σ_44.refs.info.position = Σ.refs.Flog.RayTracer.Vector.prototype.add(Σ_44.refs.ray.position, Σ.refs.Flog.RayTracer.Vector.prototype.multiplyScalar(Σ_44.refs.ray.direction, Σ_44.refs.t));
            Σ_44.refs.info.normal = this.position;
            Σ_44.refs.info.distance = Σ_44.refs.t;
            if (this.material.hasTexture) {
                Σ_44.refs.vU = new Σ.refs.Flog.RayTracer.Vector(this.position.y, this.position.z, -this.position.x);
                Σ_44.refs.vV = Σ_44.refs.vU.cross(this.position);
                Σ_44.refs.u = Σ_44.refs.info.position.dot(Σ_44.refs.vU);
                Σ_44.refs.v = Σ_44.refs.info.position.dot(Σ_44.refs.vV);
                Σ_44.refs.info.color = this.material.getColor(Σ_44.refs.u, Σ_44.refs.v);
            } else {
                Σ_44.refs.info.color = this.material.getColor(0, 0);
            }
            return Σ_44.refs.info;
        }, Σ),
        toString: Σ.addFunction(function αq78R() {
            var Σ_45 = new Σ.Scope(this, αq78R, '45', Σ, {}, []);
            return 'Plane [' + this.position + ', d=' + this.d + ']';
        }, Σ)
    };
    if (typeof Σ.refs.Flog == 'undefined') {
        Σ.refs.Flog = {};
    }
    if (typeof Σ.refs.Flog.RayTracer == 'undefined') {
        Σ.refs.Flog.RayTracer = {};
    }
    Σ.refs.Flog.RayTracer.IntersectionInfo = Σ.refs.Class.create();
    Σ.refs.Flog.RayTracer.IntersectionInfo.prototype = {
        isHit: false,
        hitCount: 0,
        shape: null,
        position: null,
        normal: null,
        color: null,
        distance: null,
        initialize: Σ.addFunction(function αfMHq() {
            var Σ_46 = new Σ.Scope(this, αfMHq, '46', Σ, {}, []);
            this.color = new Σ.refs.Flog.RayTracer.Color(0, 0, 0);
        }, Σ),
        toString: Σ.addFunction(function α82FG() {
            var Σ_47 = new Σ.Scope(this, α82FG, '47', Σ, {}, []);
            return 'Intersection [' + this.position + ']';
        }, Σ)
    };
    if (typeof Σ.refs.Flog == 'undefined') {
        Σ.refs.Flog = {};
    }
    if (typeof Σ.refs.Flog.RayTracer == 'undefined') {
        Σ.refs.Flog.RayTracer = {};
    }
    Σ.refs.Flog.RayTracer.Camera = Σ.refs.Class.create();
    Σ.refs.Flog.RayTracer.Camera.prototype = {
        position: null,
        lookAt: null,
        equator: null,
        up: null,
        screen: null,
        initialize: Σ.addFunction(function αfIYs(pos, lookAt, up) {
            var Σ_48 = new Σ.Scope(this, αfIYs, '48', Σ, {
                pos: pos,
                lookAt: lookAt,
                up: up
            }, []);
            this.position = Σ_48.refs.pos;
            this.lookAt = Σ_48.refs.lookAt;
            this.up = Σ_48.refs.up;
            this.equator = Σ_48.refs.lookAt.normalize().cross(this.up);
            this.screen = Σ.refs.Flog.RayTracer.Vector.prototype.add(this.position, this.lookAt);
        }, Σ),
        getRay: Σ.addFunction(function αlCdm(vx, vy) {
            var Σ_49 = new Σ.Scope(this, αlCdm, '49', Σ, {
                vx: vx,
                vy: vy
            }, []);
            Σ_49.refs.pos = Σ.refs.Flog.RayTracer.Vector.prototype.subtract(this.screen, Σ.refs.Flog.RayTracer.Vector.prototype.subtract(Σ.refs.Flog.RayTracer.Vector.prototype.multiplyScalar(this.equator, Σ_49.refs.vx), Σ.refs.Flog.RayTracer.Vector.prototype.multiplyScalar(this.up, Σ_49.refs.vy)));
            Σ_49.refs.pos.y = Σ_49.refs.pos.y * -1;
            Σ_49.refs.dir = Σ.refs.Flog.RayTracer.Vector.prototype.subtract(Σ_49.refs.pos, this.position);
            Σ_49.refs.ray = new Σ.refs.Flog.RayTracer.Ray(Σ_49.refs.pos, Σ_49.refs.dir.normalize());
            return Σ_49.refs.ray;
        }, Σ),
        toString: Σ.addFunction(function αwv6l() {
            var Σ_50 = new Σ.Scope(this, αwv6l, '50', Σ, {}, []);
            return 'Ray []';
        }, Σ)
    };
    if (typeof Σ.refs.Flog == 'undefined') {
        Σ.refs.Flog = {};
    }
    if (typeof Σ.refs.Flog.RayTracer == 'undefined') {
        Σ.refs.Flog.RayTracer = {};
    }
    Σ.refs.Flog.RayTracer.Background = Σ.refs.Class.create();
    Σ.refs.Flog.RayTracer.Background.prototype = {
        color: null,
        ambience: 0,
        initialize: Σ.addFunction(function αvKiC(color, ambience) {
            var Σ_51 = new Σ.Scope(this, αvKiC, '51', Σ, {
                color: color,
                ambience: ambience
            }, []);
            this.color = Σ_51.refs.color;
            this.ambience = Σ_51.refs.ambience;
        }, Σ)
    };
    if (typeof Σ.refs.Flog == 'undefined') {
        Σ.refs.Flog = {};
    }
    if (typeof Σ.refs.Flog.RayTracer == 'undefined') {
        Σ.refs.Flog.RayTracer = {};
    }
    Σ.refs.Flog.RayTracer.Engine = Σ.refs.Class.create();
    Σ.refs.Flog.RayTracer.Engine.prototype = {
        canvas: null,
        initialize: Σ.addFunction(function αIirk(options) {
            var Σ_52 = new Σ.Scope(this, αIirk, '52', Σ, {
                options: options
            }, []);
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
            }, Σ_52.refs.options || {});
            this.options.canvasHeight /= this.options.pixelHeight;
            this.options.canvasWidth /= this.options.pixelWidth;
        }, Σ),
        setPixel: Σ.addFunction(function αZyDB(x, y, color) {
            var Σ_53 = new Σ.Scope(this, αZyDB, '53', Σ, {
                x: x,
                y: y,
                color: color
            }, []);
            Σ_53.refs.pxW = undefined, Σ_53.refs.pxH = undefined;
            Σ_53.refs.pxW = this.options.pixelWidth;
            Σ_53.refs.pxH = this.options.pixelHeight;
            if (this.canvas) {
                this.canvas.fillStyle = Σ_53.refs.color.toString();
                this.canvas.fillRect(Σ_53.refs.x * Σ_53.refs.pxW, Σ_53.refs.y * Σ_53.refs.pxH, Σ_53.refs.pxW, Σ_53.refs.pxH);
            } else {
                if (Σ_53.refs.x === Σ_53.refs.y) {
                    Σ.refs.checkNumber += Σ_53.refs.color.brightness();
                }
            }
        }, Σ),
        renderScene: Σ.addFunction(function α8r3Z(scene, canvas) {
            var Σ_54 = new Σ.Scope(this, α8r3Z, '54', Σ, {
                scene: scene,
                canvas: canvas
            }, []);
            Σ.refs.checkNumber = 0;
            if (Σ_54.refs.canvas) {
                this.canvas = Σ_54.refs.canvas.getContext('2d');
            } else {
                this.canvas = null;
            }
            Σ_54.refs.canvasHeight = this.options.canvasHeight;
            Σ_54.refs.canvasWidth = this.options.canvasWidth;
            for (Σ_54.refs.y = 0; Σ_54.refs.y < Σ_54.refs.canvasHeight; Σ_54.refs.y++) {
                for (Σ_54.refs.x = 0; Σ_54.refs.x < Σ_54.refs.canvasWidth; Σ_54.refs.x++) {
                    Σ_54.refs.yp = Σ_54.refs.y * 1 / Σ_54.refs.canvasHeight * 2 - 1;
                    Σ_54.refs.xp = Σ_54.refs.x * 1 / Σ_54.refs.canvasWidth * 2 - 1;
                    Σ_54.refs.ray = Σ_54.refs.scene.camera.getRay(Σ_54.refs.xp, Σ_54.refs.yp);
                    Σ_54.refs.color = this.getPixelColor(Σ_54.refs.ray, Σ_54.refs.scene);
                    this.setPixel(Σ_54.refs.x, Σ_54.refs.y, Σ_54.refs.color);
                }
            }
            if (Σ.refs.checkNumber !== 2321) {
                throw new Error('Scene rendered incorrectly');
            }
        }, Σ),
        getPixelColor: Σ.addFunction(function αV4QT(ray, scene) {
            var Σ_55 = new Σ.Scope(this, αV4QT, '55', Σ, {
                ray: ray,
                scene: scene
            }, []);
            Σ_55.refs.info = this.testIntersection(Σ_55.refs.ray, Σ_55.refs.scene, null);
            if (Σ_55.refs.info.isHit) {
                Σ_55.refs.color = this.rayTrace(Σ_55.refs.info, Σ_55.refs.ray, Σ_55.refs.scene, 0);
                return Σ_55.refs.color;
            }
            return Σ_55.refs.scene.background.color;
        }, Σ),
        testIntersection: Σ.addFunction(function α17aV(ray, scene, exclude) {
            var Σ_56 = new Σ.Scope(this, α17aV, '56', Σ, {
                ray: ray,
                scene: scene,
                exclude: exclude
            }, []);
            Σ_56.refs.hits = 0;
            Σ_56.refs.best = new Σ.refs.Flog.RayTracer.IntersectionInfo();
            Σ_56.refs.best.distance = 2000;
            for (Σ_56.refs.i = 0; Σ_56.refs.i < Σ_56.refs.scene.shapes.length; Σ_56.refs.i++) {
                Σ_56.refs.shape = Σ_56.refs.scene.shapes[Σ_56.refs.i];
                if (Σ_56.refs.shape != Σ_56.refs.exclude) {
                    Σ_56.refs.info = Σ_56.refs.shape.intersect(Σ_56.refs.ray);
                    if (Σ_56.refs.info.isHit && Σ_56.refs.info.distance >= 0 && Σ_56.refs.info.distance < Σ_56.refs.best.distance) {
                        Σ_56.refs.best = Σ_56.refs.info;
                        Σ_56.refs.hits++;
                    }
                }
            }
            Σ_56.refs.best.hitCount = Σ_56.refs.hits;
            return Σ_56.refs.best;
        }, Σ),
        getReflectionRay: Σ.addFunction(function αtqI4(P, N, V) {
            var Σ_57 = new Σ.Scope(this, αtqI4, '57', Σ, {
                P: P,
                N: N,
                V: V
            }, []);
            Σ_57.refs.c1 = -Σ_57.refs.N.dot(Σ_57.refs.V);
            Σ_57.refs.R1 = Σ.refs.Flog.RayTracer.Vector.prototype.add(Σ.refs.Flog.RayTracer.Vector.prototype.multiplyScalar(Σ_57.refs.N, 2 * Σ_57.refs.c1), Σ_57.refs.V);
            return new Σ.refs.Flog.RayTracer.Ray(Σ_57.refs.P, Σ_57.refs.R1);
        }, Σ),
        rayTrace: Σ.addFunction(function α27Vg(info, ray, scene, depth) {
            var Σ_58 = new Σ.Scope(this, α27Vg, '58', Σ, {
                info: info,
                ray: ray,
                scene: scene,
                depth: depth
            }, []);
            Σ_58.refs.color = Σ.refs.Flog.RayTracer.Color.prototype.multiplyScalar(Σ_58.refs.info.color, Σ_58.refs.scene.background.ambience);
            Σ_58.refs.oldColor = Σ_58.refs.color;
            Σ_58.refs.shininess = Math.pow(10, Σ_58.refs.info.shape.material.gloss + 1);
            for (Σ_58.refs.i = 0; Σ_58.refs.i < Σ_58.refs.scene.lights.length; Σ_58.refs.i++) {
                Σ_58.refs.light = Σ_58.refs.scene.lights[Σ_58.refs.i];
                Σ_58.refs.v = Σ.refs.Flog.RayTracer.Vector.prototype.subtract(Σ_58.refs.light.position, Σ_58.refs.info.position).normalize();
                if (this.options.renderDiffuse) {
                    Σ_58.refs.L = Σ_58.refs.v.dot(Σ_58.refs.info.normal);
                    if (Σ_58.refs.L > 0) {
                        Σ_58.refs.color = Σ.refs.Flog.RayTracer.Color.prototype.add(Σ_58.refs.color, Σ.refs.Flog.RayTracer.Color.prototype.multiply(Σ_58.refs.info.color, Σ.refs.Flog.RayTracer.Color.prototype.multiplyScalar(Σ_58.refs.light.color, Σ_58.refs.L)));
                    }
                }
                if (Σ_58.refs.depth <= this.options.rayDepth) {
                    if (this.options.renderReflections && Σ_58.refs.info.shape.material.reflection > 0) {
                        Σ_58.refs.reflectionRay = this.getReflectionRay(Σ_58.refs.info.position, Σ_58.refs.info.normal, Σ_58.refs.ray.direction);
                        Σ_58.refs.refl = this.testIntersection(Σ_58.refs.reflectionRay, Σ_58.refs.scene, Σ_58.refs.info.shape);
                        if (Σ_58.refs.refl.isHit && Σ_58.refs.refl.distance > 0) {
                            Σ_58.refs.refl.color = this.rayTrace(Σ_58.refs.refl, Σ_58.refs.reflectionRay, Σ_58.refs.scene, Σ_58.refs.depth + 1);
                        } else {
                            Σ_58.refs.refl.color = Σ_58.refs.scene.background.color;
                        }
                        Σ_58.refs.color = Σ.refs.Flog.RayTracer.Color.prototype.blend(Σ_58.refs.color, Σ_58.refs.refl.color, Σ_58.refs.info.shape.material.reflection);
                    }
                }
                Σ_58.refs.shadowInfo = new Σ.refs.Flog.RayTracer.IntersectionInfo();
                if (this.options.renderShadows) {
                    Σ_58.refs.shadowRay = new Σ.refs.Flog.RayTracer.Ray(Σ_58.refs.info.position, Σ_58.refs.v);
                    Σ_58.refs.shadowInfo = this.testIntersection(Σ_58.refs.shadowRay, Σ_58.refs.scene, Σ_58.refs.info.shape);
                    if (Σ_58.refs.shadowInfo.isHit && Σ_58.refs.shadowInfo.shape != Σ_58.refs.info.shape) {
                        Σ_58.refs.vA = Σ.refs.Flog.RayTracer.Color.prototype.multiplyScalar(Σ_58.refs.color, 0.5);
                        Σ_58.refs.dB = 0.5 * Math.pow(Σ_58.refs.shadowInfo.shape.material.transparency, 0.5);
                        Σ_58.refs.color = Σ.refs.Flog.RayTracer.Color.prototype.addScalar(Σ_58.refs.vA, Σ_58.refs.dB);
                    }
                }
                if (this.options.renderHighlights && !Σ_58.refs.shadowInfo.isHit && Σ_58.refs.info.shape.material.gloss > 0) {
                    Σ_58.refs.Lv = Σ.refs.Flog.RayTracer.Vector.prototype.subtract(Σ_58.refs.info.shape.position, Σ_58.refs.light.position).normalize();
                    Σ_58.refs.E = Σ.refs.Flog.RayTracer.Vector.prototype.subtract(Σ_58.refs.scene.camera.position, Σ_58.refs.info.shape.position).normalize();
                    Σ_58.refs.H = Σ.refs.Flog.RayTracer.Vector.prototype.subtract(Σ_58.refs.E, Σ_58.refs.Lv).normalize();
                    Σ_58.refs.glossWeight = Math.pow(Math.max(Σ_58.refs.info.normal.dot(Σ_58.refs.H), 0), Σ_58.refs.shininess);
                    Σ_58.refs.color = Σ.refs.Flog.RayTracer.Color.prototype.add(Σ.refs.Flog.RayTracer.Color.prototype.multiplyScalar(Σ_58.refs.light.color, Σ_58.refs.glossWeight), Σ_58.refs.color);
                }
            }
            Σ_58.refs.color.limit();
            return Σ_58.refs.color;
        }, Σ)
    };

    function renderScene() {
        var Σ_59 = new Σ.Scope(this, renderScene, '59', Σ, {}, []);
        Σ_59.refs.scene = new Σ.refs.Flog.RayTracer.Scene();
        Σ_59.refs.scene.camera = new Σ.refs.Flog.RayTracer.Camera(new Σ.refs.Flog.RayTracer.Vector(0, 0, -15), new Σ.refs.Flog.RayTracer.Vector(-0.2, 0, 5), new Σ.refs.Flog.RayTracer.Vector(0, 1, 0));
        Σ_59.refs.scene.background = new Σ.refs.Flog.RayTracer.Background(new Σ.refs.Flog.RayTracer.Color(0.5, 0.5, 0.5), 0.4);
        Σ_59.refs.sphere = new Σ.refs.Flog.RayTracer.Shape.Sphere(new Σ.refs.Flog.RayTracer.Vector(-1.5, 1.5, 2), 1.5, new Σ.refs.Flog.RayTracer.Material.Solid(new Σ.refs.Flog.RayTracer.Color(0, 0.5, 0.5), 0.3, 0, 0, 2));
        Σ_59.refs.sphere1 = new Σ.refs.Flog.RayTracer.Shape.Sphere(new Σ.refs.Flog.RayTracer.Vector(1, 0.25, 1), 0.5, new Σ.refs.Flog.RayTracer.Material.Solid(new Σ.refs.Flog.RayTracer.Color(0.9, 0.9, 0.9), 0.1, 0, 0, 1.5));
        Σ_59.refs.plane = new Σ.refs.Flog.RayTracer.Shape.Plane(new Σ.refs.Flog.RayTracer.Vector(0.1, 0.9, -0.5).normalize(), 1.2, new Σ.refs.Flog.RayTracer.Material.Chessboard(new Σ.refs.Flog.RayTracer.Color(1, 1, 1), new Σ.refs.Flog.RayTracer.Color(0, 0, 0), 0.2, 0, 1, 0.7));
        Σ_59.refs.scene.shapes.push(Σ_59.refs.plane);
        Σ_59.refs.scene.shapes.push(Σ_59.refs.sphere);
        Σ_59.refs.scene.shapes.push(Σ_59.refs.sphere1);
        Σ_59.refs.light = new Σ.refs.Flog.RayTracer.Light(new Σ.refs.Flog.RayTracer.Vector(5, 10, -1), new Σ.refs.Flog.RayTracer.Color(0.8, 0.8, 0.8));
        Σ_59.refs.light1 = new Σ.refs.Flog.RayTracer.Light(new Σ.refs.Flog.RayTracer.Vector(-3, 5, -15), new Σ.refs.Flog.RayTracer.Color(0.8, 0.8, 0.8), 100);
        Σ_59.refs.scene.lights.push(Σ_59.refs.light);
        Σ_59.refs.scene.lights.push(Σ_59.refs.light1);
        Σ_59.refs.imageWidth = 100;
        Σ_59.refs.imageHeight = 100;
        Σ_59.refs.pixelSize = '5,5'.split(',');
        Σ_59.refs.renderDiffuse = true;
        Σ_59.refs.renderShadows = true;
        Σ_59.refs.renderHighlights = true;
        Σ_59.refs.renderReflections = true;
        Σ_59.refs.rayDepth = 2;
        Σ_59.refs.raytracer = new Σ.refs.Flog.RayTracer.Engine({
            canvasWidth: Σ_59.refs.imageWidth,
            canvasHeight: Σ_59.refs.imageHeight,
            pixelWidth: Σ_59.refs.pixelSize[0],
            pixelHeight: Σ_59.refs.pixelSize[1],
            'renderDiffuse': Σ_59.refs.renderDiffuse,
            'renderHighlights': Σ_59.refs.renderHighlights,
            'renderShadows': Σ_59.refs.renderShadows,
            'renderReflections': Σ_59.refs.renderReflections,
            'rayDepth': Σ_59.refs.rayDepth
        });
        Σ_59.refs.raytracer.renderScene(Σ_59.refs.scene, null, 0);
    }
}(require('things-js').bootstrap('mqtt://localhost', 'raytrace.js')));