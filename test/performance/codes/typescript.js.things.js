(function(Σ) {
    Σ.hoist([
        [
            setupTypescript,
            Σ
        ],
        [
            tearDownTypescript,
            Σ
        ],
        [
            runTypescript,
            Σ
        ],
        [
            createCompiler,
            Σ
        ]
    ]);

    function setupTypescript() {
        var Σ_0 = new Σ.Scope(this, setupTypescript, '0', Σ, {}, []);
    }

    function tearDownTypescript() {
        var Σ_1 = new Σ.Scope(this, tearDownTypescript, '1', Σ, {}, []);
        compiler_input = null;
    }
    Σ.refs.parseErrors = [];

    function runTypescript() {
        var Σ_2 = new Σ.Scope(this, runTypescript, '2', Σ, {}, []);
        Σ_2.refs.compiler = Σ.refs.createCompiler();
        Σ_2.refs.compiler.addUnit(compiler_input, 'compiler_input.ts');
        Σ.refs.parseErrors = [];
        Σ_2.refs.compiler.reTypeCheck();
        Σ_2.refs.compiler.emit({
            createFile: Σ_2.addFunction(function αLYPZ(fileName) {
                var Σ_2_0 = new Σ.Scope(this, αLYPZ, '0', Σ_2, {
                    fileName: fileName
                }, []);
                return Σ.refs.outfile;
            }, Σ_2),
            fileExists: Σ_2.addFunction(function αoj8s(path) {
                var Σ_2_1 = new Σ.Scope(this, αoj8s, '1', Σ_2, {
                    path: path
                }, []);
                return false;
            }, Σ_2),
            directoryExists: Σ_2.addFunction(function αJ1mk(path) {
                var Σ_2_2 = new Σ.Scope(this, αJ1mk, '2', Σ_2, {
                    path: path
                }, []);
                return false;
            }, Σ_2),
            resolvePath: Σ_2.addFunction(function αHIFx(path) {
                var Σ_2_3 = new Σ.Scope(this, αHIFx, '3', Σ_2, {
                    path: path
                }, []);
                return Σ_2_3.refs.path;
            }, Σ_2)
        });
        if (Σ.refs.parseErrors.length != 192 && Σ.refs.parseErrors.length != 193) {
            throw new Error('Parse errors.');
        }
        Σ_2.refs.compiler = null;
    }
    Σ.refs.outfile = {
        checksum: -412589664,
        cumulative_checksum: 0,
        Write: Σ.addFunction(function αteLq(s) {
            var Σ_3 = new Σ.Scope(this, αteLq, '3', Σ, {
                s: s
            }, []);
            this.Verify(Σ_3.refs.s);
        }, Σ),
        WriteLine: Σ.addFunction(function αSJvs(s) {
            var Σ_4 = new Σ.Scope(this, αSJvs, '4', Σ, {
                s: s
            }, []);
            this.Verify(Σ_4.refs.s + '\n');
        }, Σ),
        Close: Σ.addFunction(function α17IT() {
            var Σ_5 = new Σ.Scope(this, α17IT, '5', Σ, {}, []);
            if (this.checksum != this.cumulative_checksum) {
                throw new Error('Wrong checksum.');
            }
            this.cumulative_checksum = 0;
        }, Σ),
        Verify: Σ.addFunction(function αpPXq(s) {
            var Σ_6 = new Σ.Scope(this, αpPXq, '6', Σ, {
                s: s
            }, []);
            for (Σ_6.refs.i = 0; Σ_6.refs.i < Σ_6.refs.s.length; Σ_6.refs.i++) {
                Σ_6.refs.c = Σ_6.refs.s.charCodeAt(Σ_6.refs.i);
                this.cumulative_checksum = this.cumulative_checksum << 1 ^ Σ_6.refs.c;
            }
        }, Σ)
    };
    Σ.refs.outerr = {
        checksum: 0,
        cumulative_checksum: 0,
        Write: Σ.addFunction(function αfR9x(s) {
            var Σ_7 = new Σ.Scope(this, αfR9x, '7', Σ, {
                s: s
            }, []);
            this.Verify(Σ_7.refs.s);
        }, Σ),
        WriteLine: Σ.addFunction(function αHjbL(s) {
            var Σ_8 = new Σ.Scope(this, αHjbL, '8', Σ, {
                s: s
            }, []);
            this.Verify(Σ_8.refs.s + '\n');
        }, Σ),
        Close: Σ.addFunction(function α16A5() {
            var Σ_9 = new Σ.Scope(this, α16A5, '9', Σ, {}, []);
            if (this.checksum != this.cumulative_checksum) {
                throw new Error('Wrong checksum.');
            }
            this.cumulative_checksum = 0;
        }, Σ),
        Verify: Σ.addFunction(function αnWLV(s) {
            var Σ_10 = new Σ.Scope(this, αnWLV, '10', Σ, {
                s: s
            }, []);
            for (Σ_10.refs.i = 0; Σ_10.refs.i < Σ_10.refs.s.length; Σ_10.refs.i++) {
                Σ_10.refs.c = Σ_10.refs.s.charCodeAt(Σ_10.refs.i);
                this.cumulative_checksum = this.cumulative_checksum << 1 ^ Σ_10.refs.c;
            }
        }, Σ)
    };

    function createCompiler() {
        var Σ_11 = new Σ.Scope(this, createCompiler, '11', Σ, {}, []);
        Σ_11.refs.settings = new TypeScript.CompilationSettings();
        Σ_11.refs.settings.codeGenTarget = TypeScript.CodeGenTarget.ES5;
        Σ_11.refs.compiler = new TypeScript.TypeScriptCompiler(Σ.refs.outerr, new TypeScript.NullLogger(), Σ_11.refs.settings);
        Σ_11.refs.compiler.setErrorCallback(Σ_11.addFunction(function αADvS(start, len, message) {
            var Σ_11_0 = new Σ.Scope(this, αADvS, '0', Σ_11, {
                start: start,
                len: len,
                message: message
            }, []);
            Σ.refs.parseErrors.push({
                start: Σ_11_0.refs.start,
                len: Σ_11_0.refs.len,
                message: Σ_11_0.refs.message
            });
        }, Σ_11));
        Σ_11.refs.compiler.parser.errorRecovery = true;
        Σ_11.refs.compiler.typeCheck();
        return Σ_11.refs.compiler;
    }
}(require('things-js').bootstrap('mqtt://localhost', 'typescript.js')));