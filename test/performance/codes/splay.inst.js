(function(Σ) {
    Σ.hoist([
        GeneratePayloadTree,
        GenerateKey,
        SplayRMS,
        SplayUpdateStats,
        InsertNewNode,
        SplaySetup,
        SplayTearDown,
        SplayRun,
        SplayTree,
        BM_Start
    ]);
    Σ.refs.kSplayTreeSize = 8000;
    Σ.refs.kSplayTreeModifications = 80;
    Σ.refs.kSplayTreePayloadDepth = 5;
    Σ.refs.splayTree = null;
    Σ.refs.splaySampleTimeStart = 0;

    function GeneratePayloadTree(depth, tag) {
        var Σ_0 = new Σ.Scope(this, GeneratePayloadTree, '0', Σ, {
            depth: depth,
            tag: tag
        }, []);
        if (Σ_0.refs.depth == 0) {
            return {
                array: [
                    0,
                    1,
                    2,
                    3,
                    4,
                    5,
                    6,
                    7,
                    8,
                    9
                ],
                string: 'String for key ' + Σ_0.refs.tag + ' in leaf node'
            };
        } else {
            return {
                left: Σ.refs.GeneratePayloadTree(Σ_0.refs.depth - 1, Σ_0.refs.tag),
                right: Σ.refs.GeneratePayloadTree(Σ_0.refs.depth - 1, Σ_0.refs.tag)
            };
        }
    }

    function GenerateKey() {
        var Σ_1 = new Σ.Scope(this, GenerateKey, '1', Σ, {}, []);
        return Math.random();
    }
    Σ.refs.splaySamples = 0;
    Σ.refs.splaySumOfSquaredPauses = 0;

    function SplayRMS() {
        var Σ_2 = new Σ.Scope(this, SplayRMS, '2', Σ, {}, []);
        return Math.round(Math.sqrt(Σ.refs.splaySumOfSquaredPauses / Σ.refs.splaySamples) * 10000);
    }

    function SplayUpdateStats(time) {
        var Σ_3 = new Σ.Scope(this, SplayUpdateStats, '3', Σ, {
            time: time
        }, []);
        Σ_3.refs.pause = Σ_3.refs.time - Σ.refs.splaySampleTimeStart;
        Σ.refs.splaySampleTimeStart = Σ_3.refs.time;
        Σ.refs.splaySamples++;
        Σ.refs.splaySumOfSquaredPauses += Σ_3.refs.pause * Σ_3.refs.pause;
    }

    function InsertNewNode() {
        var Σ_4 = new Σ.Scope(this, InsertNewNode, '4', Σ, {}, []);
        Σ_4.refs.key = undefined;
        do {
            Σ_4.refs.key = Σ.refs.GenerateKey();
        } while (Σ.refs.splayTree.find(Σ_4.refs.key) != null);
        Σ_4.refs.payload = Σ.refs.GeneratePayloadTree(Σ.refs.kSplayTreePayloadDepth, String(Σ_4.refs.key));
        Σ.refs.splayTree.insert(Σ_4.refs.key, Σ_4.refs.payload);
        return Σ_4.refs.key;
    }

    function SplaySetup() {
        var Σ_5 = new Σ.Scope(this, SplaySetup, '5', Σ, {}, []);
        if (!Σ.refs.performance.now) {
            throw 'PerformanceNowUnsupported';
        }
        Σ.refs.splayTree = new Σ.refs.SplayTree();
        Σ.refs.splaySampleTimeStart = Σ.refs.performance.now();
        for (Σ_5.refs.i = 0; Σ_5.refs.i < Σ.refs.kSplayTreeSize; Σ_5.refs.i++) {
            Σ.refs.InsertNewNode();
            if ((Σ_5.refs.i + 1) % 20 == 19) {
                Σ.refs.SplayUpdateStats(Σ.refs.performance.now());
            }
        }
    }

    function SplayTearDown() {
        var Σ_6 = new Σ.Scope(this, SplayTearDown, '6', Σ, {}, []);
        Σ_6.refs.keys = Σ.refs.splayTree.exportKeys();
        Σ.refs.splayTree = null;
        Σ.refs.splaySamples = 0;
        Σ.refs.splaySumOfSquaredPauses = 0;
        Σ_6.refs.length = Σ_6.refs.keys.length;
        if (Σ_6.refs.length != Σ.refs.kSplayTreeSize) {
            throw new Error('Splay tree has wrong size');
        }
        for (Σ_6.refs.i = 0; Σ_6.refs.i < Σ_6.refs.length - 1; Σ_6.refs.i++) {
            if (Σ_6.refs.keys[Σ_6.refs.i] >= Σ_6.refs.keys[Σ_6.refs.i + 1]) {
                throw new Error('Splay tree not sorted');
            }
        }
    }

    function SplayRun() {
        var Σ_7 = new Σ.Scope(this, SplayRun, '7', Σ, {}, []);
        for (Σ_7.refs.i = 0; Σ_7.refs.i < Σ.refs.kSplayTreeModifications; Σ_7.refs.i++) {
            Σ_7.refs.key = Σ.refs.InsertNewNode();
            Σ_7.refs.greatest = Σ.refs.splayTree.findGreatestLessThan(Σ_7.refs.key);
            if (Σ_7.refs.greatest == null) {
                Σ.refs.splayTree.remove(Σ_7.refs.key);
            } else {
                Σ.refs.splayTree.remove(Σ_7.refs.greatest.key);
            }
        }
        Σ.refs.SplayUpdateStats(Σ.refs.performance.now());
    }

    function SplayTree() {
        var Σ_8 = new Σ.Scope(this, SplayTree, '8', Σ, {}, []);
    };
    Σ.refs.SplayTree.prototype.root_ = null;
    Σ.refs.SplayTree.prototype.isEmpty = Σ.addFunction(function α7rye() {
        var Σ_9 = new Σ.Scope(this, α7rye, '9', Σ, {}, []);
        return !this.root_;
    });
    Σ.refs.SplayTree.prototype.insert = Σ.addFunction(function αVaAw(key, value) {
        var Σ_10 = new Σ.Scope(this, αVaAw, '10', Σ, {
            key: key,
            value: value
        }, []);
        if (this.isEmpty()) {
            this.root_ = new Σ.refs.SplayTree.Node(Σ_10.refs.key, Σ_10.refs.value);
            return;
        }
        this.splay_(Σ_10.refs.key);
        if (this.root_.key == Σ_10.refs.key) {
            return;
        }
        Σ_10.refs.node = new Σ.refs.SplayTree.Node(Σ_10.refs.key, Σ_10.refs.value);
        if (Σ_10.refs.key > this.root_.key) {
            Σ_10.refs.node.left = this.root_;
            Σ_10.refs.node.right = this.root_.right;
            this.root_.right = null;
        } else {
            Σ_10.refs.node.right = this.root_;
            Σ_10.refs.node.left = this.root_.left;
            this.root_.left = null;
        }
        this.root_ = Σ_10.refs.node;
    });
    Σ.refs.SplayTree.prototype.remove = Σ.addFunction(function αz9xw(key) {
        var Σ_11 = new Σ.Scope(this, αz9xw, '11', Σ, {
            key: key
        }, []);
        if (this.isEmpty()) {
            throw Error('Key not found: ' + key);
        }
        this.splay_(Σ_11.refs.key);
        if (this.root_.key != Σ_11.refs.key) {
            throw Error('Key not found: ' + key);
        }
        Σ_11.refs.removed = this.root_;
        if (!this.root_.left) {
            this.root_ = this.root_.right;
        } else {
            Σ_11.refs.right = this.root_.right;
            this.root_ = this.root_.left;
            this.splay_(Σ_11.refs.key);
            this.root_.right = Σ_11.refs.right;
        }
        return Σ_11.refs.removed;
    });
    Σ.refs.SplayTree.prototype.find = Σ.addFunction(function αf6pZ(key) {
        var Σ_12 = new Σ.Scope(this, αf6pZ, '12', Σ, {
            key: key
        }, []);
        if (this.isEmpty()) {
            return null;
        }
        this.splay_(Σ_12.refs.key);
        return this.root_.key == key ? this.root_ : null;
    });
    Σ.refs.SplayTree.prototype.findMax = Σ.addFunction(function αf3db(opt_startNode) {
        var Σ_13 = new Σ.Scope(this, αf3db, '13', Σ, {
            opt_startNode: opt_startNode
        }, []);
        if (this.isEmpty()) {
            return null;
        }
        Σ_13.refs.current = Σ_13.refs.opt_startNode || this.root_;
        while (Σ_13.refs.current.right) {
            Σ_13.refs.current = Σ_13.refs.current.right;
        }
        return Σ_13.refs.current;
    });
    Σ.refs.SplayTree.prototype.findGreatestLessThan = Σ.addFunction(function αa6FH(key) {
        var Σ_14 = new Σ.Scope(this, αa6FH, '14', Σ, {
            key: key
        }, []);
        if (this.isEmpty()) {
            return null;
        }
        this.splay_(Σ_14.refs.key);
        if (this.root_.key < Σ_14.refs.key) {
            return this.root_;
        } else if (this.root_.left) {
            return this.findMax(this.root_.left);
        } else {
            return null;
        }
    });
    Σ.refs.SplayTree.prototype.exportKeys = Σ.addFunction(function αaWs1() {
        var Σ_15 = new Σ.Scope(this, αaWs1, '15', Σ, {}, []);
        Σ_15.refs.result = [];
        if (!this.isEmpty()) {
            this.root_.traverse_(Σ_15.addFunction(function αtYkp(node) {
                var Σ_15_0 = new Σ.Scope(this, αtYkp, '0', Σ_15, {
                    node: node
                }, []);
                Σ_15.refs.result.push(Σ_15_0.refs.node.key);
            }));
        }
        return Σ_15.refs.result;
    });
    Σ.refs.SplayTree.prototype.splay_ = Σ.addFunction(function αPfOV(key) {
        var Σ_16 = new Σ.Scope(this, αPfOV, '16', Σ, {
            key: key
        }, []);
        if (this.isEmpty()) {
            return;
        }
        Σ_16.refs.dummy = undefined, Σ_16.refs.left = undefined, Σ_16.refs.right = undefined;
        Σ_16.refs.dummy = Σ_16.refs.left = Σ_16.refs.right = new Σ.refs.SplayTree.Node(null, null);
        Σ_16.refs.current = this.root_;
        while (true) {
            if (Σ_16.refs.key < Σ_16.refs.current.key) {
                if (!Σ_16.refs.current.left) {
                    break;
                }
                if (Σ_16.refs.key < Σ_16.refs.current.left.key) {
                    Σ_16.refs.tmp = Σ_16.refs.current.left;
                    Σ_16.refs.current.left = Σ_16.refs.tmp.right;
                    Σ_16.refs.tmp.right = Σ_16.refs.current;
                    Σ_16.refs.current = Σ_16.refs.tmp;
                    if (!Σ_16.refs.current.left) {
                        break;
                    }
                }
                Σ_16.refs.right.left = Σ_16.refs.current;
                Σ_16.refs.right = Σ_16.refs.current;
                Σ_16.refs.current = Σ_16.refs.current.left;
            } else if (Σ_16.refs.key > Σ_16.refs.current.key) {
                if (!Σ_16.refs.current.right) {
                    break;
                }
                if (Σ_16.refs.key > Σ_16.refs.current.right.key) {
                    Σ_16.refs.tmp = Σ_16.refs.current.right;
                    Σ_16.refs.current.right = Σ_16.refs.tmp.left;
                    Σ_16.refs.tmp.left = Σ_16.refs.current;
                    Σ_16.refs.current = Σ_16.refs.tmp;
                    if (!Σ_16.refs.current.right) {
                        break;
                    }
                }
                Σ_16.refs.left.right = Σ_16.refs.current;
                Σ_16.refs.left = Σ_16.refs.current;
                Σ_16.refs.current = Σ_16.refs.current.right;
            } else {
                break;
            }
        }
        Σ_16.refs.left.right = Σ_16.refs.current.left;
        Σ_16.refs.right.left = Σ_16.refs.current.right;
        Σ_16.refs.current.left = Σ_16.refs.dummy.right;
        Σ_16.refs.current.right = Σ_16.refs.dummy.left;
        this.root_ = Σ_16.refs.current;
    });
    Σ.refs.SplayTree.Node = Σ.addFunction(function αxLPG(key, value) {
        var Σ_17 = new Σ.Scope(this, αxLPG, '17', Σ, {
            key: key,
            value: value
        }, []);
        this.key = Σ_17.refs.key;
        this.value = Σ_17.refs.value;
    });
    Σ.refs.SplayTree.Node.prototype.left = null;
    Σ.refs.SplayTree.Node.prototype.right = null;
    Σ.refs.SplayTree.Node.prototype.traverse_ = Σ.addFunction(function αuHX1(f) {
        var Σ_18 = new Σ.Scope(this, αuHX1, '18', Σ, {
            f: f
        }, []);
        Σ_18.refs.current = this;
        while (Σ_18.refs.current) {
            Σ_18.refs.left = Σ_18.refs.current.left;
            if (Σ_18.refs.left) {
                Σ_18.refs.left.traverse_(Σ_18.refs.f);
            }
            Σ_18.refs.f(Σ_18.refs.current);
            Σ_18.refs.current = Σ_18.refs.current.right;
        }
    });
    Σ.refs.performance = {};
    Σ.refs.performance.now = Σ.addFunction(function α7h1L() {
        var Σ_19 = new Σ.Scope(this, α7h1L, '19', Σ, {}, []);
        return Date.now();
    });
    Σ.refs.BM_RunFunc = Σ.refs.SplayRun;
    Σ.refs.BM_SetupFunc = Σ.refs.SplaySetup;
    Σ.refs.BM_TearDownFunc = Σ.refs.SplayTearDown;
    Σ.refs.BM_RMS = Σ.refs.SplayRMS;
    Σ.refs.BM_Iterations = 100;
    Σ.refs.BM_Min_Iterations = 16;
    Σ.refs.BM_Results = [];

    function BM_Start() {
        var Σ_20 = new Σ.Scope(this, BM_Start, '20', Σ, {}, [doRun]);
        Σ_20.refs.data = {
            runs: 0,
            elapsed: 0
        };
        Σ_20.refs.elapsed = 0;
        Σ_20.refs.start = Date.now();
        Σ_20.refs.end = null;
        Σ_20.refs.i = 0;

        function doRun() {
            var Σ_20_0 = new Σ.Scope(this, doRun, '0', Σ_20, {}, []);
            Σ.refs.BM_SetupFunc();
            Σ.log('Iteration : ' + Σ_20.refs.i);
            Σ.refs.BM_RunFunc();
            Σ_20.refs.elapsed = Date.now() - Σ_20.refs.start;
            Σ.refs.BM_TearDownFunc();
            Σ_20.refs.i++;
            if (Σ_20.refs.i < Σ.refs.BM_Iterations) {
                Σ.setImmediate(Σ_20.refs.doRun);
            } else {
                if (Σ_20.refs.data != null) {
                    Σ_20.refs.data.runs += Σ_20.refs.i;
                    Σ_20.refs.data.elapsed += Σ_20.refs.elapsed;
                }
                Σ.log('Runs: ' + Σ_20.refs.data.runs + '\t|\tElapsed: ' + Σ_20.refs.data.elapsed);
                Σ_20.refs.end = Date.now();
                Σ.log('Total time : ' + (Σ_20.refs.end - Σ_20.refs.start) + ' ms');
                Σ_20_0.refs.usec = Σ_20.refs.data.elapsed * 1000 / Σ_20.refs.data.runs;
                Σ_20_0.refs.rms = BM_RMS ? BM_RMS() : 0;
                Σ.refs.BM_Results.push({
                    time: Σ_20_0.refs.usec,
                    latency: Σ_20_0.refs.rms
                });
            }
        }
        Σ.setImmediate(Σ_20.refs.doRun);
    }
    Σ.refs.BM_Start();
}(require('things-js').bootstrap('mqtt://localhost', 'splay.js')));