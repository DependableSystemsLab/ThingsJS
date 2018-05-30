var pidusage = require('pidusage');
(function(Σ) {
    Σ.setExtractor(function() {
        return this.capture({}, {
            kSplayTreeSize: kSplayTreeSize,
            kSplayTreeModifications: kSplayTreeModifications,
            kSplayTreePayloadDepth: kSplayTreePayloadDepth,
            splayTree: splayTree,
            splaySampleTimeStart: splaySampleTimeStart,
            splaySamples: splaySamples,
            splaySumOfSquaredPauses: splaySumOfSquaredPauses,
            performance: performance,
            BM_RunFunc: BM_RunFunc,
            BM_SetupFunc: BM_SetupFunc,
            BM_TearDownFunc: BM_TearDownFunc,
            BM_RMS: BM_RMS,
            BM_Iterations: BM_Iterations,
            BM_Min_Iterations: BM_Min_Iterations,
            BM_Results: BM_Results
        });
    }).hoist(GeneratePayloadTree, Σ).hoist(GenerateKey, Σ).hoist(SplayRMS, Σ).hoist(SplayUpdateStats, Σ).hoist(InsertNewNode, Σ).hoist(SplaySetup, Σ).hoist(SplayTearDown, Σ).hoist(SplayRun, Σ).hoist(SplayTree, Σ).hoist(BM_Start, Σ);
    var kSplayTreeSize = 1000;
    var kSplayTreeModifications = 10;
    var kSplayTreePayloadDepth = 3;
    var splayTree = null;
    var splaySampleTimeStart = 0;

    function GeneratePayloadTree(depth, tag) {
        var Σ_GeneratePayloadTree = new Σ.Scope(this, Σ, GeneratePayloadTree, function() {
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
    }

    function GenerateKey() {
        var Σ_GenerateKey = new Σ.Scope(this, Σ, GenerateKey, function() {
            return this.capture({}, {});
        });
        return Math.random();
    }
    var splaySamples = 0;
    var splaySumOfSquaredPauses = 0;

    function SplayRMS() {
        var Σ_SplayRMS = new Σ.Scope(this, Σ, SplayRMS, function() {
            return this.capture({}, {});
        });
        return Math.round(Math.sqrt(splaySumOfSquaredPauses / splaySamples) * 10000);
    }

    function SplayUpdateStats(time) {
        var Σ_SplayUpdateStats = new Σ.Scope(this, Σ, SplayUpdateStats, function() {
            return this.capture({
                time: time
            }, {
                pause: pause
            });
        });
        var pause = time - splaySampleTimeStart;
        splaySampleTimeStart = time;
        splaySamples++;
        splaySumOfSquaredPauses += pause * pause;
    }

    function InsertNewNode() {
        var Σ_InsertNewNode = new Σ.Scope(this, Σ, InsertNewNode, function() {
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
    }

    function SplaySetup() {
        var Σ_SplaySetup = new Σ.Scope(this, Σ, SplaySetup, function() {
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
    }

    function SplayTearDown() {
        var Σ_SplayTearDown = new Σ.Scope(this, Σ, SplayTearDown, function() {
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
    }

    function SplayRun() {
        var Σ_SplayRun = new Σ.Scope(this, Σ, SplayRun, function() {
            return this.capture({}, {});
        });
        for (var i = 0; i < kSplayTreeModifications; i++) {
            var key = InsertNewNode();
            var greatest = splayTree.findGreatestLessThan(key);
            if (greatest == null) {
                splayTree.remove(key);
            } else {
                splayTree.remove(greatest.key);
            };
        }
        SplayUpdateStats(performance.now());
    }

    function SplayTree() {
        var Σ_SplayTree = new Σ.Scope(this, Σ, SplayTree, function() {
            return this.capture({}, {});
        });
    };
    SplayTree.prototype.root_ = null;
    SplayTree.prototype.isEmpty = Σ.addFunction(function αZTeD() {
        var Σ_αZTeD = new Σ.Scope(this, Σ, αZTeD, function() {
            return this.capture({}, {});
        });
        return !this.root_;
    }, Σ);
    SplayTree.prototype.insert = Σ.addFunction(function αEXEt(key, value) {
        var Σ_αEXEt = new Σ.Scope(this, Σ, αEXEt, function() {
            return this.capture({}, {});
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
    }, Σ);
    SplayTree.prototype.remove = Σ.addFunction(function α9gU4(key) {
        var Σ_α9gU4 = new Σ.Scope(this, Σ, α9gU4, function() {
            return this.capture({}, {});
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
    }, Σ);
    SplayTree.prototype.find = Σ.addFunction(function αccui(key) {
        var Σ_αccui = new Σ.Scope(this, Σ, αccui, function() {
            return this.capture({}, {});
        });
        if (this.isEmpty()) {
            return null;
        }
        this.splay_(key);
        return this.root_.key == key ? this.root_ : null;
    }, Σ);
    SplayTree.prototype.findMax = Σ.addFunction(function αi3KN(opt_startNode) {
        var Σ_αi3KN = new Σ.Scope(this, Σ, αi3KN, function() {
            return this.capture({}, {});
        });
        if (this.isEmpty()) {
            return null;
        }
        var current = opt_startNode || this.root_;
        while (current.right) {
            current = current.right;
        }
        return current;
    }, Σ);
    SplayTree.prototype.findGreatestLessThan = Σ.addFunction(function αUURb(key) {
        var Σ_αUURb = new Σ.Scope(this, Σ, αUURb, function() {
            return this.capture({}, {});
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
    }, Σ);
    SplayTree.prototype.exportKeys = Σ.addFunction(function αv8wj() {
        var Σ_αv8wj = new Σ.Scope(this, Σ, αv8wj, function() {
            return this.capture({}, {});
        });
        var result = [];
        if (!this.isEmpty()) {
            this.root_.traverse_(Σ_αv8wj.addFunction(function αNqyg(node) {
                var Σ_αv8wj_αNqyg = new Σ.Scope(this, Σ_αv8wj, αNqyg, function() {
                    return this.capture({}, {});
                });
                result.push(node.key);
            }, Σ_αv8wj));
        }
        return result;
    }, Σ);
    SplayTree.prototype.splay_ = Σ.addFunction(function αOyq9(key) {
        var Σ_αOyq9 = new Σ.Scope(this, Σ, αOyq9, function() {
            return this.capture({}, {});
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
    }, Σ);
    SplayTree.Node = Σ.addFunction(function αnAKA(key, value) {
        var Σ_αnAKA = new Σ.Scope(this, Σ, αnAKA, function() {
            return this.capture({}, {});
        });
        this.key = key;
        this.value = value;
    }, Σ);
    SplayTree.Node.prototype.left = null;
    SplayTree.Node.prototype.right = null;
    SplayTree.Node.prototype.traverse_ = Σ.addFunction(function αNp38(f) {
        var Σ_αNp38 = new Σ.Scope(this, Σ, αNp38, function() {
            return this.capture({}, {});
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
    }, Σ);
    var performance = {};
    performance.now = Σ.addFunction(function αpPuY() {
        var Σ_αpPuY = new Σ.Scope(this, Σ, αpPuY, function() {
            return this.capture({}, {});
        });
        return Date.now();
    }, Σ);
    var BM_RunFunc = SplayRun;
    var BM_SetupFunc = SplaySetup;
    var BM_TearDownFunc = SplayTearDown;
    var BM_RMS = SplayRMS;
    var BM_Iterations = 300;
    var BM_Min_Iterations = 16;
    var BM_Results = [];

    function BM_Start() {
        var Σ_BM_Start = new Σ.Scope(this, Σ, BM_Start, function() {
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
            var Σ_BM_Start_doRun = new Σ.Scope(this, Σ_BM_Start, doRun, function() {
                return this.capture({}, {});
            });
            BM_SetupFunc();
            Σ.console.log('Iteration : ' + i);
            BM_RunFunc();
            elapsed = Date.now() - start;
            BM_TearDownFunc();
            i++;
            if (i < BM_Iterations) {
                if (i === BM_Iterations / 2 + 1){
                    (function report(){
                        pidusage.stat(process.pid, function(err, stat) {
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
    }
    BM_Start();
}(require('things-js').bootstrap('mqtt://localhost', 'splay.js')));