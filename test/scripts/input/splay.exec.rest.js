var pidusage = require('pidusage');
require('things-js/lib/core/Code').bootstrap(module, function(Σ){ Σ.setExtractor(function(){ return this.capture({}, {kSplayTreeSize:kSplayTreeSize,kSplayTreeModifications:kSplayTreeModifications,kSplayTreePayloadDepth:kSplayTreePayloadDepth,splayTree:splayTree,splaySampleTimeStart:splaySampleTimeStart,splaySamples:splaySamples,splaySumOfSquaredPauses:splaySumOfSquaredPauses,performance:performance,BM_RunFunc:BM_RunFunc,BM_SetupFunc:BM_SetupFunc,BM_TearDownFunc:BM_TearDownFunc,BM_RMS:BM_RMS,BM_Iterations:BM_Iterations,BM_Min_Iterations:BM_Min_Iterations,BM_Results:BM_Results}) }).hoist(GeneratePayloadTree, Σ).hoist(GenerateKey, Σ).hoist(SplayRMS, Σ).hoist(SplayUpdateStats, Σ).hoist(InsertNewNode, Σ).hoist(SplaySetup, Σ).hoist(SplayTearDown, Σ).hoist(SplayRun, Σ).hoist(SplayTree, Σ).hoist(BM_Start, Σ);function GeneratePayloadTree(depth, tag) {
        var Σ_GeneratePayloadTree = new Σ.Scope(this, Σ, GeneratePayloadTree, function () {
            return this.capture({
                depth: depth,
                tag: tag
            }, {});
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
            return this.capture({ time: time }, { pause: pause });
        });
        var pause = time - splaySampleTimeStart;
        splaySampleTimeStart = time;
        splaySamples++;
        splaySumOfSquaredPauses += pause * pause;
    };function InsertNewNode() {
        var Σ_InsertNewNode = new Σ.Scope(this, Σ, InsertNewNode, function () {
            return this.capture({}, {
                key: key,
                payload: payload
            });
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
            return this.capture({}, {});
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
            return this.capture({}, {
                keys: keys,
                length: length
            });
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
            return this.capture({}, {});
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
            return this.capture({}, {
                data: data,
                elapsed: elapsed,
                start: start,
                end: end,
                i: i
            });
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
                return this.capture({}, {});
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
    };Σ.addFunction(function αSmBS() {
        return !this.root_;
    }, Σ, "αSmBS-yUbL642o");Σ.addFunction(function αWXSY(key, value) {
        var Σ_αWXSY = new Σ.Scope(this, Σ, αWXSY, function () {
            return this.capture({
                key: key,
                value: value
            }, { node: node });
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
    }, Σ, "αWXSY-zDHxodtZ");Σ.addFunction(function α6kzZ(key) {
        var Σ_α6kzZ = new Σ.Scope(this, Σ, α6kzZ, function () {
            return this.capture({ key: key }, { removed: removed });
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
    }, Σ, "α6kzZ-lErPeWEc");Σ.addFunction(function αV2zN(key) {
        var Σ_αV2zN = new Σ.Scope(this, Σ, αV2zN, function () {
            return this.capture({ key: key }, {});
        });
        if (this.isEmpty()) {
            return null;
        }
        this.splay_(key);
        return this.root_.key == key ? this.root_ : null;
    }, Σ, "αV2zN-Deu8YqTy");Σ.addFunction(function αg0Xg(opt_startNode) {
        var Σ_αg0Xg = new Σ.Scope(this, Σ, αg0Xg, function () {
            return this.capture({ opt_startNode: opt_startNode }, { current: current });
        });
        if (this.isEmpty()) {
            return null;
        }
        var current = opt_startNode || this.root_;
        while (current.right) {
            current = current.right;
        }
        return current;
    }, Σ, "αg0Xg-VLj8nNRz");Σ.addFunction(function αYYRH(key) {
        var Σ_αYYRH = new Σ.Scope(this, Σ, αYYRH, function () {
            return this.capture({ key: key }, {});
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
    }, Σ, "αYYRH-BTxgF3XS");Σ.addFunction(function αEQ6D() {
        var Σ_αEQ6D = new Σ.Scope(this, Σ, αEQ6D, function () {
            return this.capture({}, { result: result });
        });
        var result = [];
        if (!this.isEmpty()) {
            this.root_.traverse_(Σ_αEQ6D.addFunction(function α5it6(node) {
                var Σ_αEQ6D_α5it6 = new Σ.Scope(this, Σ_αEQ6D, α5it6, function () {
                    return this.capture({ node: node }, {});
                });
                result.push(node.key);
            }, Σ_αEQ6D));
        }
        return result;
    }, Σ, "αEQ6D-2BLENrK9");Σ.addFunction(function αzunu(key) {
        var Σ_αzunu = new Σ.Scope(this, Σ, αzunu, function () {
            return this.capture({ key: key }, {
                dummy: dummy,
                left: left,
                right: right,
                current: current
            });
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
    }, Σ, "αzunu-o5b8TCIj");Σ.addFunction(function αq6aR(key, value) {
        var Σ_αq6aR = new Σ.Scope(this, Σ, αq6aR, function () {
            return this.capture({
                key: key,
                value: value
            }, {});
        });
        this.key = key;
        this.value = value;
    }, Σ, "αq6aR-uaqytMJ1");Σ.addFunction(function αNXmP(f) {
        var Σ_αNXmP = new Σ.Scope(this, Σ, αNXmP, function () {
            return this.capture({ f: f }, { current: current });
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
    }, Σ, "αNXmP-p9xmcbga");Σ.addFunction(function αulkG() {
        return Date.now();
    }, Σ, "αulkG-NxK6M6nQ");(function BM_Start(){var Σ_BM_Start = new Σ.Scope(this, Σ, BM_Start, function(){ return this.capture({}, {data:data,elapsed:elapsed,start:start,end:end,i:i}) }, "BM_Start-uxBgmjNa").restore(Σ).hoist(doRun, Σ_BM_Start);function doRun() {
            var Σ_BM_Start_doRun = new Σ.Scope(this, Σ_BM_Start, doRun, function () {
                return this.capture({}, {});
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
        };var data = {runs : 0,elapsed : 0};var elapsed = 0;var start = 1560111051116;var end = null;var i = 150;}());Σ.funcs["SplayTree"].prototype.root_ = null;Σ.funcs["SplayTree"].prototype.isEmpty = Σ.getFunction("Σ.αSmBS-yUbL642o");Σ.funcs["SplayTree"].prototype.insert = Σ.getFunction("Σ.αWXSY-zDHxodtZ");Σ.funcs["SplayTree"].prototype.remove = Σ.getFunction("Σ.α6kzZ-lErPeWEc");Σ.funcs["SplayTree"].prototype.find = Σ.getFunction("Σ.αV2zN-Deu8YqTy");Σ.funcs["SplayTree"].prototype.findMax = Σ.getFunction("Σ.αg0Xg-VLj8nNRz");Σ.funcs["SplayTree"].prototype.findGreatestLessThan = Σ.getFunction("Σ.αYYRH-BTxgF3XS");Σ.funcs["SplayTree"].prototype.exportKeys = Σ.getFunction("Σ.αEQ6D-2BLENrK9");Σ.funcs["SplayTree"].prototype.splay_ = Σ.getFunction("Σ.αzunu-o5b8TCIj");Σ.funcs["SplayTree"].Node = Σ.getFunction("Σ.αq6aR-uaqytMJ1");Σ.funcs["αq6aR-uaqytMJ1"].prototype.left = null;Σ.funcs["αq6aR-uaqytMJ1"].prototype.right = null;Σ.funcs["αq6aR-uaqytMJ1"].prototype.traverse_ = Σ.getFunction("Σ.αNXmP-p9xmcbga");var kSplayTreeSize = 1000;var kSplayTreeModifications = 10;var kSplayTreePayloadDepth = 3;var splayTree = null;var splaySampleTimeStart = 1560111054278;var splaySamples = 0;var splaySumOfSquaredPauses = 0;var performance = {now : Σ.getFunction("Σ.αulkG-NxK6M6nQ")};var BM_RunFunc = Σ.getFunction("Σ.SplayRun");var BM_SetupFunc = Σ.getFunction("Σ.SplaySetup");var BM_TearDownFunc = Σ.getFunction("Σ.SplayTearDown");var BM_RMS = Σ.getFunction("Σ.SplayRMS");var BM_Iterations = 300;var BM_Min_Iterations = 16;var BM_Results = [];Σ.setImmediate(Σ.getFunction("Σ/BM_Start-uxBgmjNa.doRun"), "d98fit8Y"); }, 'mqtt://localhost', 'splay.js/92TqKYP1', {});