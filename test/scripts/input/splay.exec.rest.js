var pidusage = require('pidusage');
require('things-js/lib/core/Code').bootstrap(module, function(Σ){ Σ.setExtractor(function(){ return [{}, {kSplayTreeSize:kSplayTreeSize,kSplayTreeModifications:kSplayTreeModifications,kSplayTreePayloadDepth:kSplayTreePayloadDepth,splayTree:splayTree,splaySampleTimeStart:splaySampleTimeStart,splaySamples:splaySamples,splaySumOfSquaredPauses:splaySumOfSquaredPauses,performance:performance,BM_RunFunc:BM_RunFunc,BM_SetupFunc:BM_SetupFunc,BM_TearDownFunc:BM_TearDownFunc,BM_RMS:BM_RMS,BM_Iterations:BM_Iterations,BM_Min_Iterations:BM_Min_Iterations,BM_Results:BM_Results}] }).hoist(GeneratePayloadTree, Σ).hoist(GenerateKey, Σ).hoist(SplayRMS, Σ).hoist(SplayUpdateStats, Σ).hoist(InsertNewNode, Σ).hoist(SplaySetup, Σ).hoist(SplayTearDown, Σ).hoist(SplayRun, Σ).hoist(SplayTree, Σ).hoist(BM_Start, Σ);function GeneratePayloadTree(depth, tag) {
        var Σ_GeneratePayloadTree = new Σ.Scope(this, Σ, GeneratePayloadTree, function () {
            return [
                {
                    depth: depth,
                    tag: tag
                },
                {}
            ];
        });
        if (depth == 0) {
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
                string: 'String for key ' + tag + ' in leaf node'
            };
        } else {
            return {
                left: GeneratePayloadTree(depth - 1, tag),
                right: GeneratePayloadTree(depth - 1, tag)
            };
        }
    };function GenerateKey() {
        return Math.random();
    };function SplayRMS() {
        return Math.round(Math.sqrt(splaySumOfSquaredPauses / splaySamples) * 10000);
    };function SplayUpdateStats(time) {
        var Σ_SplayUpdateStats = new Σ.Scope(this, Σ, SplayUpdateStats, function () {
            return [
                { time: time },
                { pause: pause }
            ];
        });
        var pause = time - splaySampleTimeStart;
        splaySampleTimeStart = time;
        splaySamples++;
        splaySumOfSquaredPauses += pause * pause;
    };function InsertNewNode() {
        var Σ_InsertNewNode = new Σ.Scope(this, Σ, InsertNewNode, function () {
            return [
                {},
                {
                    key: key,
                    payload: payload
                }
            ];
        });
        var key;
        do {
            key = GenerateKey();
        } while (splayTree.find(key) != null);
        var payload = GeneratePayloadTree(kSplayTreePayloadDepth, String(key));
        splayTree.insert(key, payload);
        return key;
    };function SplaySetup() {
        var Σ_SplaySetup = new Σ.Scope(this, Σ, SplaySetup, function () {
            return [
                {},
                {}
            ];
        });
        if (!performance.now) {
            throw 'PerformanceNowUnsupported';
        }
        splayTree = new SplayTree();
        splaySampleTimeStart = performance.now();
        for (var i = 0; i < kSplayTreeSize; i++) {
            InsertNewNode();
            if ((i + 1) % 20 == 19) {
                SplayUpdateStats(performance.now());
            }
        }
    };function SplayTearDown() {
        var Σ_SplayTearDown = new Σ.Scope(this, Σ, SplayTearDown, function () {
            return [
                {},
                {
                    keys: keys,
                    length: length
                }
            ];
        });
        var keys = splayTree.exportKeys();
        splayTree = null;
        splaySamples = 0;
        splaySumOfSquaredPauses = 0;
        var length = keys.length;
        if (length != kSplayTreeSize) {
            throw new Error('Splay tree has wrong size');
        }
        for (var i = 0; i < length - 1; i++) {
            if (keys[i] >= keys[i + 1]) {
                throw new Error('Splay tree not sorted');
            }
        }
    };function SplayRun() {
        var Σ_SplayRun = new Σ.Scope(this, Σ, SplayRun, function () {
            return [
                {},
                {}
            ];
        });
        for (var i = 0; i < kSplayTreeModifications; i++) {
            var key = InsertNewNode();
            var greatest = splayTree.findGreatestLessThan(key);
            if (greatest == null) {
                splayTree.remove(key);
            } else {
                splayTree.remove(greatest.key);
            }
            ;
        }
        SplayUpdateStats(performance.now());
    };function SplayTree() {
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
            var Σ_BM_Start_doRun = new Σ.Scope(this, Σ_BM_Start, doRun, function () {
                return [
                    {},
                    {}
                ];
            });
            BM_SetupFunc();
            Σ.console.log('Iteration : ' + i);
            BM_RunFunc();
            elapsed = Date.now() - start;
            BM_TearDownFunc();
            i++;
            if (i < BM_Iterations) {
                if (i === BM_Iterations / 2 + 1) {
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
    };Σ.addFunction(function αUGwI() {
        return !this.root_;
    }, Σ, "αUGwI-LJjy82ce");Σ.addFunction(function α0wUE(key, value) {
        var Σ_α0wUE = new Σ.Scope(this, Σ, α0wUE, function () {
            return [
                {
                    key: key,
                    value: value
                },
                { node: node }
            ];
        });
        if (this.isEmpty()) {
            this.root_ = new SplayTree.Node(key, value);
            return;
        }
        this.splay_(key);
        if (this.root_.key == key) {
            return;
        }
        var node = new SplayTree.Node(key, value);
        if (key > this.root_.key) {
            node.left = this.root_;
            node.right = this.root_.right;
            this.root_.right = null;
        } else {
            node.right = this.root_;
            node.left = this.root_.left;
            this.root_.left = null;
        }
        this.root_ = node;
    }, Σ, "α0wUE-TQuiYUSg");Σ.addFunction(function αVFgF(key) {
        var Σ_αVFgF = new Σ.Scope(this, Σ, αVFgF, function () {
            return [
                { key: key },
                { removed: removed }
            ];
        });
        if (this.isEmpty()) {
            throw Error('Key not found: ' + key);
        }
        this.splay_(key);
        if (this.root_.key != key) {
            throw Error('Key not found: ' + key);
        }
        var removed = this.root_;
        if (!this.root_.left) {
            this.root_ = this.root_.right;
        } else {
            var right = this.root_.right;
            this.root_ = this.root_.left;
            this.splay_(key);
            this.root_.right = right;
        }
        return removed;
    }, Σ, "αVFgF-7Lt6ZoyN");Σ.addFunction(function αgzvP(key) {
        var Σ_αgzvP = new Σ.Scope(this, Σ, αgzvP, function () {
            return [
                { key: key },
                {}
            ];
        });
        if (this.isEmpty()) {
            return null;
        }
        this.splay_(key);
        return this.root_.key == key ? this.root_ : null;
    }, Σ, "αgzvP-Q0cp1zrk");Σ.addFunction(function αdz6D(opt_startNode) {
        var Σ_αdz6D = new Σ.Scope(this, Σ, αdz6D, function () {
            return [
                { opt_startNode: opt_startNode },
                { current: current }
            ];
        });
        if (this.isEmpty()) {
            return null;
        }
        var current = opt_startNode || this.root_;
        while (current.right) {
            current = current.right;
        }
        return current;
    }, Σ, "αdz6D-pqEaM0yq");Σ.addFunction(function αdbkc(key) {
        var Σ_αdbkc = new Σ.Scope(this, Σ, αdbkc, function () {
            return [
                { key: key },
                {}
            ];
        });
        if (this.isEmpty()) {
            return null;
        }
        this.splay_(key);
        if (this.root_.key < key) {
            return this.root_;
        } else if (this.root_.left) {
            return this.findMax(this.root_.left);
        } else {
            return null;
        }
    }, Σ, "αdbkc-UdvWyxC5");Σ.addFunction(function αB5uI() {
        var Σ_αB5uI = new Σ.Scope(this, Σ, αB5uI, function () {
            return [
                {},
                { result: result }
            ];
        });
        var result = [];
        if (!this.isEmpty()) {
            this.root_.traverse_(Σ_αB5uI.addFunction(function αMb6V(node) {
                var Σ_αB5uI_αMb6V = new Σ.Scope(this, Σ_αB5uI, αMb6V, function () {
                    return [
                        { node: node },
                        {}
                    ];
                });
                result.push(node.key);
            }, Σ_αB5uI));
        }
        return result;
    }, Σ, "αB5uI-suC5eqXp");Σ.addFunction(function αXZTJ(key) {
        var Σ_αXZTJ = new Σ.Scope(this, Σ, αXZTJ, function () {
            return [
                { key: key },
                {
                    dummy: dummy,
                    left: left,
                    right: right,
                    current: current
                }
            ];
        });
        if (this.isEmpty()) {
            return;
        }
        var dummy, left, right;
        dummy = left = right = new SplayTree.Node(null, null);
        var current = this.root_;
        while (true) {
            if (key < current.key) {
                if (!current.left) {
                    break;
                }
                if (key < current.left.key) {
                    var tmp = current.left;
                    current.left = tmp.right;
                    tmp.right = current;
                    current = tmp;
                    if (!current.left) {
                        break;
                    }
                }
                right.left = current;
                right = current;
                current = current.left;
            } else if (key > current.key) {
                if (!current.right) {
                    break;
                }
                if (key > current.right.key) {
                    var tmp = current.right;
                    current.right = tmp.left;
                    tmp.left = current;
                    current = tmp;
                    if (!current.right) {
                        break;
                    }
                }
                left.right = current;
                left = current;
                current = current.right;
            } else {
                break;
            }
        }
        left.right = current.left;
        right.left = current.right;
        current.left = dummy.right;
        current.right = dummy.left;
        this.root_ = current;
    }, Σ, "αXZTJ-LbdDEeQq");Σ.addFunction(function αQFhb(key, value) {
        var Σ_αQFhb = new Σ.Scope(this, Σ, αQFhb, function () {
            return [
                {
                    key: key,
                    value: value
                },
                {}
            ];
        });
        this.key = key;
        this.value = value;
    }, Σ, "αQFhb-JgUV6Fmx");Σ.addFunction(function αgqkY(f) {
        var Σ_αgqkY = new Σ.Scope(this, Σ, αgqkY, function () {
            return [
                { f: f },
                { current: current }
            ];
        });
        var current = this;
        while (current) {
            var left = current.left;
            if (left) {
                left.traverse_(f);
            }
            f(current);
            current = current.right;
        }
    }, Σ, "αgqkY-BXaBabqy");Σ.addFunction(function αAvNS() {
        return Date.now();
    }, Σ, "αAvNS-Oms4PXgv");(function BM_Start(){var Σ_BM_Start = new Σ.Scope(this, Σ, BM_Start, function(){ return [{}, {data:data,elapsed:elapsed,start:start,end:end,i:i}] }, "BM_Start-EmTVb5QJ").restore(Σ).hoist(doRun, Σ_BM_Start);function doRun() {
            var Σ_BM_Start_doRun = new Σ.Scope(this, Σ_BM_Start, doRun, function () {
                return [
                    {},
                    {}
                ];
            });
            BM_SetupFunc();
            Σ.console.log('Iteration : ' + i);
            BM_RunFunc();
            elapsed = Date.now() - start;
            BM_TearDownFunc();
            i++;
            if (i < BM_Iterations) {
                if (i === BM_Iterations / 2 + 1) {
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
        };var data = {"runs" : 0,"elapsed" : 0};var elapsed = 0;var start = 1560235870171;var end = null;var i = 150;}());Σ.funcs["SplayTree"].prototype.root_ = null;Σ.funcs["SplayTree"].prototype.isEmpty = Σ.getFunction("Σ.αUGwI-LJjy82ce");Σ.funcs["SplayTree"].prototype.insert = Σ.getFunction("Σ.α0wUE-TQuiYUSg");Σ.funcs["SplayTree"].prototype.remove = Σ.getFunction("Σ.αVFgF-7Lt6ZoyN");Σ.funcs["SplayTree"].prototype.find = Σ.getFunction("Σ.αgzvP-Q0cp1zrk");Σ.funcs["SplayTree"].prototype.findMax = Σ.getFunction("Σ.αdz6D-pqEaM0yq");Σ.funcs["SplayTree"].prototype.findGreatestLessThan = Σ.getFunction("Σ.αdbkc-UdvWyxC5");Σ.funcs["SplayTree"].prototype.exportKeys = Σ.getFunction("Σ.αB5uI-suC5eqXp");Σ.funcs["SplayTree"].prototype.splay_ = Σ.getFunction("Σ.αXZTJ-LbdDEeQq");Σ.funcs["SplayTree"].Node = Σ.getFunction("Σ.αQFhb-JgUV6Fmx");Σ.funcs["αQFhb-JgUV6Fmx"].prototype.left = null;Σ.funcs["αQFhb-JgUV6Fmx"].prototype.right = null;Σ.funcs["αQFhb-JgUV6Fmx"].prototype.traverse_ = Σ.getFunction("Σ.αgqkY-BXaBabqy");var kSplayTreeSize = 1000;var kSplayTreeModifications = 10;var kSplayTreePayloadDepth = 3;var splayTree = null;var splaySampleTimeStart = 1560235872400;var splaySamples = 0;var splaySumOfSquaredPauses = 0;var performance = {"now" : Σ.getFunction("Σ.αAvNS-Oms4PXgv")};var BM_RunFunc = Σ.getFunction("Σ.SplayRun");var BM_SetupFunc = Σ.getFunction("Σ.SplaySetup");var BM_TearDownFunc = Σ.getFunction("Σ.SplayTearDown");var BM_RMS = Σ.getFunction("Σ.SplayRMS");var BM_Iterations = 300;var BM_Min_Iterations = 16;var BM_Results = [];Σ.setImmediate(Σ.getFunction("Σ/BM_Start-EmTVb5QJ.doRun"), "9ka1FWCj"); }, 'mqtt://localhost', 'splay.js/gdNDH9Vb', {});