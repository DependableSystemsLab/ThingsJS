require('things-js/lib/core/Code').bootstrap(module, function(Σ){ Σ.setExtractor(function(){ return [{}, {kSplayTreeSize:kSplayTreeSize,kSplayTreeModifications:kSplayTreeModifications,kSplayTreePayloadDepth:kSplayTreePayloadDepth,splayTree:splayTree,splaySampleTimeStart:splaySampleTimeStart,splaySamples:splaySamples,splaySumOfSquaredPauses:splaySumOfSquaredPauses,performance:performance,BM_RunFunc:BM_RunFunc,BM_SetupFunc:BM_SetupFunc,BM_TearDownFunc:BM_TearDownFunc,BM_RMS:BM_RMS,BM_Iterations:BM_Iterations,BM_Min_Iterations:BM_Min_Iterations,BM_Results:BM_Results}] }).hoist(GeneratePayloadTree, Σ).hoist(GenerateKey, Σ).hoist(SplayRMS, Σ).hoist(SplayUpdateStats, Σ).hoist(InsertNewNode, Σ).hoist(SplaySetup, Σ).hoist(SplayTearDown, Σ).hoist(SplayRun, Σ).hoist(SplayTree, Σ).hoist(BM_Start, Σ);function GeneratePayloadTree(depth, tag) {
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
        var mid = null;
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
                if (i === BM_Iterations / 2 + 1) {
                    mid = Date.now();
                    process.send({ tag: 'mid' });
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
                process.send({ tag: 'end', elapsed: end - mid });
            }
        }
        Σ.setImmediate(doRun);
    };Σ.addFunction(function α0() {
        return !this.root_;
    }, Σ, "α0-0");Σ.addFunction(function α1(key, value) {
        var Σ_α1 = new Σ.Scope(this, Σ, α1, function () {
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
    }, Σ, "α1-1");Σ.addFunction(function α2(key) {
        var Σ_α2 = new Σ.Scope(this, Σ, α2, function () {
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
    }, Σ, "α2-2");Σ.addFunction(function α3(key) {
        if (this.isEmpty()) {
            return null;
        }
        this.splay_(key);
        return this.root_.key == key ? this.root_ : null;
    }, Σ, "α3-3");Σ.addFunction(function α4(opt_startNode) {
        var Σ_α4 = new Σ.Scope(this, Σ, α4, function () {
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
    }, Σ, "α4-4");Σ.addFunction(function α5(key) {
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
    }, Σ, "α5-5");Σ.addFunction(function α6() {
        var Σ_α6 = new Σ.Scope(this, Σ, α6, function () {
            return [
                {},
                { result: result }
            ];
        });
        var result = [];
        if (!this.isEmpty()) {
            this.root_.traverse_(Σ_α6.addFunction(function α7(node) {
                result.push(node.key);
            }, Σ_α6));
        }
        return result;
    }, Σ, "α6-6");Σ.addFunction(function α8(key) {
        var Σ_α8 = new Σ.Scope(this, Σ, α8, function () {
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
    }, Σ, "α8-7");Σ.addFunction(function α9(key, value) {
        this.key = key;
        this.value = value;
    }, Σ, "α9-8");Σ.addFunction(function α10(f) {
        var Σ_α10 = new Σ.Scope(this, Σ, α10, function () {
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
    }, Σ, "α10-9");Σ.addFunction(function α11() {
        return Date.now();
    }, Σ, "α11-10");(function BM_Start(){var Σ_BM_Start = new Σ.Scope(this, Σ, BM_Start, function(){ return [{}, {data:data,elapsed:elapsed,start:start,end:end,i:i}] }, "BM_Start-0").restore(Σ).hoist(doRun, Σ_BM_Start);function doRun() {
            BM_SetupFunc();
            Σ.console.log('Iteration : ' + i);
            BM_RunFunc();
            elapsed = Date.now() - start;
            BM_TearDownFunc();
            i++;
            if (i < BM_Iterations) {
                if (i === BM_Iterations / 2 + 1) {
                    mid = Date.now();
                    process.send({ tag: 'mid' });
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
                process.send({ tag: 'end', elapsed: end - mid });
            }
        };var data = Σ.addObject({ "runs" : 0,"elapsed" : 0}, "Σ/BM_Start-0.o2");var elapsed = 0;var start = 1580250806387;var mid = null;var end = null;var i = 1500;}());Σ.funcs["SplayTree"].prototype.root_ = null;Σ.funcs["SplayTree"].prototype.isEmpty = Σ.getFunction("Σ.α0-0");Σ.funcs["SplayTree"].prototype.insert = Σ.getFunction("Σ.α1-1");Σ.funcs["SplayTree"].prototype.remove = Σ.getFunction("Σ.α2-2");Σ.funcs["SplayTree"].prototype.find = Σ.getFunction("Σ.α3-3");Σ.funcs["SplayTree"].prototype.findMax = Σ.getFunction("Σ.α4-4");Σ.funcs["SplayTree"].prototype.findGreatestLessThan = Σ.getFunction("Σ.α5-5");Σ.funcs["SplayTree"].prototype.exportKeys = Σ.getFunction("Σ.α6-6");Σ.funcs["SplayTree"].prototype.splay_ = Σ.getFunction("Σ.α8-7");Σ.funcs["SplayTree"].Node = Σ.getFunction("Σ.α9-8");Σ.funcs["α9-8"].prototype.left = null;Σ.funcs["α9-8"].prototype.right = null;Σ.funcs["α9-8"].prototype.traverse_ = Σ.getFunction("Σ.α10-9");var kSplayTreeSize = 1000;var kSplayTreeModifications = 20;var kSplayTreePayloadDepth = 4;var splayTree = null;var splaySampleTimeStart = 1580250812557;var splaySamples = 0;var splaySumOfSquaredPauses = 0;var performance = Σ.addObject({ "now" : Σ.getFunction("Σ.α11-10")}, "Σ.o0");var BM_RunFunc = Σ.getFunction("Σ.SplayRun");var BM_SetupFunc = Σ.getFunction("Σ.SplaySetup");var BM_TearDownFunc = Σ.getFunction("Σ.SplayTearDown");var BM_RMS = Σ.getFunction("Σ.SplayRMS");var BM_Iterations = 3000;var BM_Min_Iterations = 16;var BM_Results = [];Σ.setImmediate(Σ.getFunction("Σ/BM_Start-0.doRun"), "s2vXnLk41499"); }, 'mqtt://localhost', 'splay.js/splay.js.0', {});