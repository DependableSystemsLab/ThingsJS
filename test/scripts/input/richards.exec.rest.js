var pidusage = require('pidusage');
require('things-js/lib/core/Code').bootstrap(module, function(Σ){ Σ.setExtractor(function(){ return [{}, {COUNT:COUNT,EXPECTED_QUEUE_COUNT:EXPECTED_QUEUE_COUNT,EXPECTED_HOLD_COUNT:EXPECTED_HOLD_COUNT,ID_IDLE:ID_IDLE,ID_WORKER:ID_WORKER,ID_HANDLER_A:ID_HANDLER_A,ID_HANDLER_B:ID_HANDLER_B,ID_DEVICE_A:ID_DEVICE_A,ID_DEVICE_B:ID_DEVICE_B,NUMBER_OF_IDS:NUMBER_OF_IDS,KIND_DEVICE:KIND_DEVICE,KIND_WORK:KIND_WORK,STATE_RUNNING:STATE_RUNNING,STATE_RUNNABLE:STATE_RUNNABLE,STATE_SUSPENDED:STATE_SUSPENDED,STATE_HELD:STATE_HELD,STATE_SUSPENDED_RUNNABLE:STATE_SUSPENDED_RUNNABLE,STATE_NOT_HELD:STATE_NOT_HELD,DATA_SIZE:DATA_SIZE,performance:performance,BM_RunFunc:BM_RunFunc,BM_SetupFunc:BM_SetupFunc,BM_TearDownFunc:BM_TearDownFunc,BM_RMS:BM_RMS,BM_Iterations:BM_Iterations,BM_Min_Iterations:BM_Min_Iterations,BM_Results:BM_Results}] }).hoist(runRichards, Σ).hoist(Scheduler, Σ).hoist(TaskControlBlock, Σ).hoist(IdleTask, Σ).hoist(DeviceTask, Σ).hoist(WorkerTask, Σ).hoist(HandlerTask, Σ).hoist(Packet, Σ).hoist(BM_Start, Σ);function runRichards() {
        var Σ_runRichards = new Σ.Scope(this, Σ, runRichards, function () {
            return [
                {},
                {
                    scheduler: scheduler,
                    queue: queue
                }
            ];
        });
        var scheduler = new Scheduler();
        scheduler.addIdleTask(ID_IDLE, 0, null, COUNT);
        var queue = new Packet(null, ID_WORKER, KIND_WORK);
        queue = new Packet(queue, ID_WORKER, KIND_WORK);
        scheduler.addWorkerTask(ID_WORKER, 1000, queue);
        queue = new Packet(null, ID_DEVICE_A, KIND_DEVICE);
        queue = new Packet(queue, ID_DEVICE_A, KIND_DEVICE);
        queue = new Packet(queue, ID_DEVICE_A, KIND_DEVICE);
        scheduler.addHandlerTask(ID_HANDLER_A, 2000, queue);
        queue = new Packet(null, ID_DEVICE_B, KIND_DEVICE);
        queue = new Packet(queue, ID_DEVICE_B, KIND_DEVICE);
        queue = new Packet(queue, ID_DEVICE_B, KIND_DEVICE);
        scheduler.addHandlerTask(ID_HANDLER_B, 3000, queue);
        scheduler.addDeviceTask(ID_DEVICE_A, 4000, null);
        scheduler.addDeviceTask(ID_DEVICE_B, 5000, null);
        scheduler.schedule();
        if (scheduler.queueCount != EXPECTED_QUEUE_COUNT || scheduler.holdCount != EXPECTED_HOLD_COUNT) {
            var msg = 'Error during execution: queueCount = ' + scheduler.queueCount + ', holdCount = ' + scheduler.holdCount + '.';
            throw new Error(msg);
        }
    };function Scheduler() {
        this.queueCount = 0;
        this.holdCount = 0;
        this.blocks = new Array(NUMBER_OF_IDS);
        this.list = null;
        this.currentTcb = null;
        this.currentId = null;
    };function TaskControlBlock(link, id, priority, queue, task) {
        this.link = link;
        this.id = id;
        this.priority = priority;
        this.queue = queue;
        this.task = task;
        if (queue == null) {
            this.state = STATE_SUSPENDED;
        } else {
            this.state = STATE_SUSPENDED_RUNNABLE;
        }
    };function IdleTask(scheduler, v1, count) {
        this.scheduler = scheduler;
        this.v1 = v1;
        this.count = count;
    };function DeviceTask(scheduler) {
        this.scheduler = scheduler;
        this.v1 = null;
    };function WorkerTask(scheduler, v1, v2) {
        this.scheduler = scheduler;
        this.v1 = v1;
        this.v2 = v2;
    };function HandlerTask(scheduler) {
        this.scheduler = scheduler;
        this.v1 = null;
        this.v2 = null;
    };function Packet(link, id, kind) {
        this.link = link;
        this.id = id;
        this.kind = kind;
        this.a1 = 0;
        this.a2 = new Array(DATA_SIZE);
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
    };Σ.addFunction(function α0(id, priority, queue, count) {
        this.addRunningTask(id, priority, queue, new IdleTask(this, 1, count));
    }, Σ, "α0-0");Σ.addFunction(function α1(id, priority, queue) {
        this.addTask(id, priority, queue, new WorkerTask(this, ID_HANDLER_A, 0));
    }, Σ, "α1-1");Σ.addFunction(function α2(id, priority, queue) {
        this.addTask(id, priority, queue, new HandlerTask(this));
    }, Σ, "α2-2");Σ.addFunction(function α3(id, priority, queue) {
        this.addTask(id, priority, queue, new DeviceTask(this));
    }, Σ, "α3-3");Σ.addFunction(function α4(id, priority, queue, task) {
        this.addTask(id, priority, queue, task);
        this.currentTcb.setRunning();
    }, Σ, "α4-4");Σ.addFunction(function α5(id, priority, queue, task) {
        this.currentTcb = new TaskControlBlock(this.list, id, priority, queue, task);
        this.list = this.currentTcb;
        this.blocks[id] = this.currentTcb;
    }, Σ, "α5-5");Σ.addFunction(function α6() {
        this.currentTcb = this.list;
        while (this.currentTcb != null) {
            if (this.currentTcb.isHeldOrSuspended()) {
                this.currentTcb = this.currentTcb.link;
            } else {
                this.currentId = this.currentTcb.id;
                this.currentTcb = this.currentTcb.run();
            }
        }
    }, Σ, "α6-6");Σ.addFunction(function α7(id) {
        var Σ_α7 = new Σ.Scope(this, Σ, α7, function () {
            return [
                { id: id },
                { tcb: tcb }
            ];
        });
        var tcb = this.blocks[id];
        if (tcb == null) {
            return tcb;
        }
        tcb.markAsNotHeld();
        if (tcb.priority > this.currentTcb.priority) {
            return tcb;
        } else {
            return this.currentTcb;
        }
    }, Σ, "α7-7");Σ.addFunction(function α8() {
        this.holdCount++;
        this.currentTcb.markAsHeld();
        return this.currentTcb.link;
    }, Σ, "α8-8");Σ.addFunction(function α9() {
        this.currentTcb.markAsSuspended();
        return this.currentTcb;
    }, Σ, "α9-9");Σ.addFunction(function α10(packet) {
        var Σ_α10 = new Σ.Scope(this, Σ, α10, function () {
            return [
                { packet: packet },
                { t: t }
            ];
        });
        var t = this.blocks[packet.id];
        if (t == null) {
            return t;
        }
        this.queueCount++;
        packet.link = null;
        packet.id = this.currentId;
        return t.checkPriorityAdd(this.currentTcb, packet);
    }, Σ, "α10-10");Σ.addFunction(function α11() {
        this.state = STATE_RUNNING;
    }, Σ, "α11-11");Σ.addFunction(function α12() {
        this.state = this.state & STATE_NOT_HELD;
    }, Σ, "α12-12");Σ.addFunction(function α13() {
        this.state = this.state | STATE_HELD;
    }, Σ, "α13-13");Σ.addFunction(function α14() {
        return (this.state & STATE_HELD) != 0 || this.state == STATE_SUSPENDED;
    }, Σ, "α14-14");Σ.addFunction(function α15() {
        this.state = this.state | STATE_SUSPENDED;
    }, Σ, "α15-15");Σ.addFunction(function α16() {
        this.state = this.state | STATE_RUNNABLE;
    }, Σ, "α16-16");Σ.addFunction(function α17() {
        var Σ_α17 = new Σ.Scope(this, Σ, α17, function () {
            return [
                {},
                { packet: packet }
            ];
        });
        var packet;
        if (this.state == STATE_SUSPENDED_RUNNABLE) {
            packet = this.queue;
            this.queue = packet.link;
            if (this.queue == null) {
                this.state = STATE_RUNNING;
            } else {
                this.state = STATE_RUNNABLE;
            }
        } else {
            packet = null;
        }
        return this.task.run(packet);
    }, Σ, "α17-17");Σ.addFunction(function α18(task, packet) {
        if (this.queue == null) {
            this.queue = packet;
            this.markAsRunnable();
            if (this.priority > task.priority) {
                return this;
            }
        } else {
            this.queue = packet.addTo(this.queue);
        }
        return task;
    }, Σ, "α18-18");Σ.addFunction(function α19() {
        return 'tcb { ' + this.task + '@' + this.state + ' }';
    }, Σ, "α19-19");Σ.addFunction(function α20(packet) {
        this.count--;
        if (this.count == 0) {
            return this.scheduler.holdCurrent();
        }
        if ((this.v1 & 1) == 0) {
            this.v1 = this.v1 >> 1;
            return this.scheduler.release(ID_DEVICE_A);
        } else {
            this.v1 = this.v1 >> 1 ^ 53256;
            return this.scheduler.release(ID_DEVICE_B);
        }
    }, Σ, "α20-20");Σ.addFunction(function α21() {
        return 'IdleTask';
    }, Σ, "α21-21");Σ.addFunction(function α22(packet) {
        if (packet == null) {
            if (this.v1 == null) {
                return this.scheduler.suspendCurrent();
            }
            var v = this.v1;
            this.v1 = null;
            return this.scheduler.queue(v);
        } else {
            this.v1 = packet;
            return this.scheduler.holdCurrent();
        }
    }, Σ, "α22-22");Σ.addFunction(function α23() {
        return 'DeviceTask';
    }, Σ, "α23-23");Σ.addFunction(function α24(packet) {
        if (packet == null) {
            return this.scheduler.suspendCurrent();
        } else {
            if (this.v1 == ID_HANDLER_A) {
                this.v1 = ID_HANDLER_B;
            } else {
                this.v1 = ID_HANDLER_A;
            }
            packet.id = this.v1;
            packet.a1 = 0;
            for (var i = 0; i < DATA_SIZE; i++) {
                this.v2++;
                if (this.v2 > 26) {
                    this.v2 = 1;
                }
                packet.a2[i] = this.v2;
            }
            return this.scheduler.queue(packet);
        }
    }, Σ, "α24-24");Σ.addFunction(function α25() {
        return 'WorkerTask';
    }, Σ, "α25-25");Σ.addFunction(function α26(packet) {
        if (packet != null) {
            if (packet.kind == KIND_WORK) {
                this.v1 = packet.addTo(this.v1);
            } else {
                this.v2 = packet.addTo(this.v2);
            }
        }
        if (this.v1 != null) {
            var count = this.v1.a1;
            var v;
            if (count < DATA_SIZE) {
                if (this.v2 != null) {
                    v = this.v2;
                    this.v2 = this.v2.link;
                    v.a1 = this.v1.a2[count];
                    this.v1.a1 = count + 1;
                    return this.scheduler.queue(v);
                }
            } else {
                v = this.v1;
                this.v1 = this.v1.link;
                return this.scheduler.queue(v);
            }
        }
        return this.scheduler.suspendCurrent();
    }, Σ, "α26-26");Σ.addFunction(function α27() {
        return 'HandlerTask';
    }, Σ, "α27-27");Σ.addFunction(function α28(queue) {
        var Σ_α28 = new Σ.Scope(this, Σ, α28, function () {
            return [
                { queue: queue },
                {
                    peek: peek,
                    next: next
                }
            ];
        });
        this.link = null;
        if (queue == null) {
            return this;
        }
        var peek, next = queue;
        while ((peek = next.link) != null) {
            next = peek;
        }
        next.link = this;
        return queue;
    }, Σ, "α28-28");Σ.addFunction(function α29() {
        return 'Packet';
    }, Σ, "α29-29");Σ.addFunction(function α30() {
        return Date.now();
    }, Σ, "α30-30");Σ.addFunction(function α31() {
    }, Σ, "α31-31");Σ.addFunction(function α32() {
    }, Σ, "α32-32");(function BM_Start(){var Σ_BM_Start = new Σ.Scope(this, Σ, BM_Start, function(){ return [{}, {data:data,elapsed:elapsed,start:start,end:end,i:i}] }, "BM_Start-0").restore(Σ).hoist(doRun, Σ_BM_Start);function doRun() {
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
        };var data = Σ.addObject({ "runs" : 0,"elapsed" : 0}, "Σ/BM_Start-0.o2");var elapsed = 0;var start = 1580250822419;var end = null;var i = 1500;}());Σ.funcs["Scheduler"].prototype.addIdleTask = Σ.getFunction("Σ.α0-0");Σ.funcs["Scheduler"].prototype.addWorkerTask = Σ.getFunction("Σ.α1-1");Σ.funcs["Scheduler"].prototype.addHandlerTask = Σ.getFunction("Σ.α2-2");Σ.funcs["Scheduler"].prototype.addDeviceTask = Σ.getFunction("Σ.α3-3");Σ.funcs["Scheduler"].prototype.addRunningTask = Σ.getFunction("Σ.α4-4");Σ.funcs["Scheduler"].prototype.addTask = Σ.getFunction("Σ.α5-5");Σ.funcs["Scheduler"].prototype.schedule = Σ.getFunction("Σ.α6-6");Σ.funcs["Scheduler"].prototype.release = Σ.getFunction("Σ.α7-7");Σ.funcs["Scheduler"].prototype.holdCurrent = Σ.getFunction("Σ.α8-8");Σ.funcs["Scheduler"].prototype.suspendCurrent = Σ.getFunction("Σ.α9-9");Σ.funcs["Scheduler"].prototype.queue = Σ.getFunction("Σ.α10-10");Σ.funcs["TaskControlBlock"].prototype.setRunning = Σ.getFunction("Σ.α11-11");Σ.funcs["TaskControlBlock"].prototype.markAsNotHeld = Σ.getFunction("Σ.α12-12");Σ.funcs["TaskControlBlock"].prototype.markAsHeld = Σ.getFunction("Σ.α13-13");Σ.funcs["TaskControlBlock"].prototype.isHeldOrSuspended = Σ.getFunction("Σ.α14-14");Σ.funcs["TaskControlBlock"].prototype.markAsSuspended = Σ.getFunction("Σ.α15-15");Σ.funcs["TaskControlBlock"].prototype.markAsRunnable = Σ.getFunction("Σ.α16-16");Σ.funcs["TaskControlBlock"].prototype.run = Σ.getFunction("Σ.α17-17");Σ.funcs["TaskControlBlock"].prototype.checkPriorityAdd = Σ.getFunction("Σ.α18-18");Σ.funcs["TaskControlBlock"].prototype.toString = Σ.getFunction("Σ.α19-19");Σ.funcs["IdleTask"].prototype.run = Σ.getFunction("Σ.α20-20");Σ.funcs["IdleTask"].prototype.toString = Σ.getFunction("Σ.α21-21");Σ.funcs["DeviceTask"].prototype.run = Σ.getFunction("Σ.α22-22");Σ.funcs["DeviceTask"].prototype.toString = Σ.getFunction("Σ.α23-23");Σ.funcs["WorkerTask"].prototype.run = Σ.getFunction("Σ.α24-24");Σ.funcs["WorkerTask"].prototype.toString = Σ.getFunction("Σ.α25-25");Σ.funcs["HandlerTask"].prototype.run = Σ.getFunction("Σ.α26-26");Σ.funcs["HandlerTask"].prototype.toString = Σ.getFunction("Σ.α27-27");Σ.funcs["Packet"].prototype.addTo = Σ.getFunction("Σ.α28-28");Σ.funcs["Packet"].prototype.toString = Σ.getFunction("Σ.α29-29");var COUNT = 1000;var EXPECTED_QUEUE_COUNT = 2322;var EXPECTED_HOLD_COUNT = 928;var ID_IDLE = 0;var ID_WORKER = 1;var ID_HANDLER_A = 2;var ID_HANDLER_B = 3;var ID_DEVICE_A = 4;var ID_DEVICE_B = 5;var NUMBER_OF_IDS = 6;var KIND_DEVICE = 0;var KIND_WORK = 1;var STATE_RUNNING = 0;var STATE_RUNNABLE = 1;var STATE_SUSPENDED = 2;var STATE_HELD = 4;var STATE_SUSPENDED_RUNNABLE = 3;var STATE_NOT_HELD = -5;var DATA_SIZE = 4;var performance = Σ.addObject({ "now" : Σ.getFunction("Σ.α30-30")}, "Σ.o0");var BM_RunFunc = Σ.getFunction("Σ.runRichards");var BM_SetupFunc = Σ.getFunction("Σ.α31-31");var BM_TearDownFunc = Σ.getFunction("Σ.α32-32");var BM_RMS = undefined;var BM_Iterations = 3000;var BM_Min_Iterations = 16;var BM_Results = [];Σ.setImmediate(Σ.getFunction("Σ/BM_Start-0.doRun"), "pque4EDP1499"); }, 'mqtt://localhost', 'richards.js/richards.js.0', {});