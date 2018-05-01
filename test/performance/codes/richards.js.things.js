(function(Σ) {
    Σ.hoist([
        [
            runRichards,
            Σ
        ],
        [
            Scheduler,
            Σ
        ],
        [
            TaskControlBlock,
            Σ
        ],
        [
            IdleTask,
            Σ
        ],
        [
            DeviceTask,
            Σ
        ],
        [
            WorkerTask,
            Σ
        ],
        [
            HandlerTask,
            Σ
        ],
        [
            Packet,
            Σ
        ]
    ]);

    function runRichards() {
        var Σ_0 = new Σ.Scope(this, runRichards, '0', Σ, {}, []);
        Σ_0.refs.scheduler = new Σ.refs.Scheduler();
        Σ_0.refs.scheduler.addIdleTask(Σ.refs.ID_IDLE, 0, null, Σ.refs.COUNT);
        Σ_0.refs.queue = new Σ.refs.Packet(null, Σ.refs.ID_WORKER, Σ.refs.KIND_WORK);
        Σ_0.refs.queue = new Σ.refs.Packet(Σ_0.refs.queue, Σ.refs.ID_WORKER, Σ.refs.KIND_WORK);
        Σ_0.refs.scheduler.addWorkerTask(Σ.refs.ID_WORKER, 1000, Σ_0.refs.queue);
        Σ_0.refs.queue = new Σ.refs.Packet(null, Σ.refs.ID_DEVICE_A, Σ.refs.KIND_DEVICE);
        Σ_0.refs.queue = new Σ.refs.Packet(Σ_0.refs.queue, Σ.refs.ID_DEVICE_A, Σ.refs.KIND_DEVICE);
        Σ_0.refs.queue = new Σ.refs.Packet(Σ_0.refs.queue, Σ.refs.ID_DEVICE_A, Σ.refs.KIND_DEVICE);
        Σ_0.refs.scheduler.addHandlerTask(Σ.refs.ID_HANDLER_A, 2000, Σ_0.refs.queue);
        Σ_0.refs.queue = new Σ.refs.Packet(null, Σ.refs.ID_DEVICE_B, Σ.refs.KIND_DEVICE);
        Σ_0.refs.queue = new Σ.refs.Packet(Σ_0.refs.queue, Σ.refs.ID_DEVICE_B, Σ.refs.KIND_DEVICE);
        Σ_0.refs.queue = new Σ.refs.Packet(Σ_0.refs.queue, Σ.refs.ID_DEVICE_B, Σ.refs.KIND_DEVICE);
        Σ_0.refs.scheduler.addHandlerTask(Σ.refs.ID_HANDLER_B, 3000, Σ_0.refs.queue);
        Σ_0.refs.scheduler.addDeviceTask(Σ.refs.ID_DEVICE_A, 4000, null);
        Σ_0.refs.scheduler.addDeviceTask(Σ.refs.ID_DEVICE_B, 5000, null);
        Σ_0.refs.scheduler.schedule();
        if (Σ_0.refs.scheduler.queueCount != Σ.refs.EXPECTED_QUEUE_COUNT || Σ_0.refs.scheduler.holdCount != Σ.refs.EXPECTED_HOLD_COUNT) {
            Σ_0.refs.msg = 'Error during execution: queueCount = ' + Σ_0.refs.scheduler.queueCount + ', holdCount = ' + Σ_0.refs.scheduler.holdCount + '.';
            throw new Error(Σ_0.refs.msg);
        }
    }
    Σ.refs.COUNT = 1000;
    Σ.refs.EXPECTED_QUEUE_COUNT = 2322;
    Σ.refs.EXPECTED_HOLD_COUNT = 928;

    function Scheduler() {
        var Σ_1 = new Σ.Scope(this, Scheduler, '1', Σ, {}, []);
        this.queueCount = 0;
        this.holdCount = 0;
        this.blocks = new Array(Σ.refs.NUMBER_OF_IDS);
        this.list = null;
        this.currentTcb = null;
        this.currentId = null;
    }
    Σ.refs.ID_IDLE = 0;
    Σ.refs.ID_WORKER = 1;
    Σ.refs.ID_HANDLER_A = 2;
    Σ.refs.ID_HANDLER_B = 3;
    Σ.refs.ID_DEVICE_A = 4;
    Σ.refs.ID_DEVICE_B = 5;
    Σ.refs.NUMBER_OF_IDS = 6;
    Σ.refs.KIND_DEVICE = 0;
    Σ.refs.KIND_WORK = 1;
    Σ.refs.Scheduler.prototype.addIdleTask = Σ.addFunction(function α6jA4(id, priority, queue, count) {
        var Σ_2 = new Σ.Scope(this, α6jA4, '2', Σ, {
            id: id,
            priority: priority,
            queue: queue,
            count: count
        }, []);
        this.addRunningTask(Σ_2.refs.id, Σ_2.refs.priority, Σ_2.refs.queue, new Σ.refs.IdleTask(this, 1, Σ_2.refs.count));
    }, Σ);
    Σ.refs.Scheduler.prototype.addWorkerTask = Σ.addFunction(function αDQuQ(id, priority, queue) {
        var Σ_3 = new Σ.Scope(this, αDQuQ, '3', Σ, {
            id: id,
            priority: priority,
            queue: queue
        }, []);
        this.addTask(Σ_3.refs.id, Σ_3.refs.priority, Σ_3.refs.queue, new Σ.refs.WorkerTask(this, Σ.refs.ID_HANDLER_A, 0));
    }, Σ);
    Σ.refs.Scheduler.prototype.addHandlerTask = Σ.addFunction(function αAPla(id, priority, queue) {
        var Σ_4 = new Σ.Scope(this, αAPla, '4', Σ, {
            id: id,
            priority: priority,
            queue: queue
        }, []);
        this.addTask(Σ_4.refs.id, Σ_4.refs.priority, Σ_4.refs.queue, new Σ.refs.HandlerTask(this));
    }, Σ);
    Σ.refs.Scheduler.prototype.addDeviceTask = Σ.addFunction(function αmOaQ(id, priority, queue) {
        var Σ_5 = new Σ.Scope(this, αmOaQ, '5', Σ, {
            id: id,
            priority: priority,
            queue: queue
        }, []);
        this.addTask(Σ_5.refs.id, Σ_5.refs.priority, Σ_5.refs.queue, new Σ.refs.DeviceTask(this));
    }, Σ);
    Σ.refs.Scheduler.prototype.addRunningTask = Σ.addFunction(function αjcGP(id, priority, queue, task) {
        var Σ_6 = new Σ.Scope(this, αjcGP, '6', Σ, {
            id: id,
            priority: priority,
            queue: queue,
            task: task
        }, []);
        this.addTask(Σ_6.refs.id, Σ_6.refs.priority, Σ_6.refs.queue, Σ_6.refs.task);
        this.currentTcb.setRunning();
    }, Σ);
    Σ.refs.Scheduler.prototype.addTask = Σ.addFunction(function α9h6k(id, priority, queue, task) {
        var Σ_7 = new Σ.Scope(this, α9h6k, '7', Σ, {
            id: id,
            priority: priority,
            queue: queue,
            task: task
        }, []);
        this.currentTcb = new Σ.refs.TaskControlBlock(this.list, Σ_7.refs.id, Σ_7.refs.priority, Σ_7.refs.queue, Σ_7.refs.task);
        this.list = this.currentTcb;
        this.blocks[Σ_7.refs.id] = this.currentTcb;
    }, Σ);
    Σ.refs.Scheduler.prototype.schedule = Σ.addFunction(function α7gbI() {
        var Σ_8 = new Σ.Scope(this, α7gbI, '8', Σ, {}, []);
        this.currentTcb = this.list;
        while (this.currentTcb != null) {
            if (this.currentTcb.isHeldOrSuspended()) {
                this.currentTcb = this.currentTcb.link;
            } else {
                this.currentId = this.currentTcb.id;
                this.currentTcb = this.currentTcb.run();
            }
        }
    }, Σ);
    Σ.refs.Scheduler.prototype.release = Σ.addFunction(function αOKhC(id) {
        var Σ_9 = new Σ.Scope(this, αOKhC, '9', Σ, {
            id: id
        }, []);
        Σ_9.refs.tcb = this.blocks[Σ_9.refs.id];
        if (Σ_9.refs.tcb == null) {
            return Σ_9.refs.tcb;
        }
        Σ_9.refs.tcb.markAsNotHeld();
        if (Σ_9.refs.tcb.priority > this.currentTcb.priority) {
            return Σ_9.refs.tcb;
        } else {
            return this.currentTcb;
        }
    }, Σ);
    Σ.refs.Scheduler.prototype.holdCurrent = Σ.addFunction(function α2lwn() {
        var Σ_10 = new Σ.Scope(this, α2lwn, '10', Σ, {}, []);
        this.holdCount++;
        this.currentTcb.markAsHeld();
        return this.currentTcb.link;
    }, Σ);
    Σ.refs.Scheduler.prototype.suspendCurrent = Σ.addFunction(function αzZjU() {
        var Σ_11 = new Σ.Scope(this, αzZjU, '11', Σ, {}, []);
        this.currentTcb.markAsSuspended();
        return this.currentTcb;
    }, Σ);
    Σ.refs.Scheduler.prototype.queue = Σ.addFunction(function αjmhL(packet) {
        var Σ_12 = new Σ.Scope(this, αjmhL, '12', Σ, {
            packet: packet
        }, []);
        Σ_12.refs.t = this.blocks[Σ_12.refs.packet.id];
        if (Σ_12.refs.t == null) {
            return Σ_12.refs.t;
        }
        this.queueCount++;
        Σ_12.refs.packet.link = null;
        Σ_12.refs.packet.id = this.currentId;
        return Σ_12.refs.t.checkPriorityAdd(this.currentTcb, Σ_12.refs.packet);
    }, Σ);

    function TaskControlBlock(link, id, priority, queue, task) {
        var Σ_13 = new Σ.Scope(this, TaskControlBlock, '13', Σ, {
            link: link,
            id: id,
            priority: priority,
            queue: queue,
            task: task
        }, []);
        this.link = Σ_13.refs.link;
        this.id = Σ_13.refs.id;
        this.priority = Σ_13.refs.priority;
        this.queue = Σ_13.refs.queue;
        this.task = Σ_13.refs.task;
        if (Σ_13.refs.queue == null) {
            this.state = Σ.refs.STATE_SUSPENDED;
        } else {
            this.state = Σ.refs.STATE_SUSPENDED_RUNNABLE;
        }
    }
    Σ.refs.STATE_RUNNING = 0;
    Σ.refs.STATE_RUNNABLE = 1;
    Σ.refs.STATE_SUSPENDED = 2;
    Σ.refs.STATE_HELD = 4;
    Σ.refs.STATE_SUSPENDED_RUNNABLE = Σ.refs.STATE_SUSPENDED | Σ.refs.STATE_RUNNABLE;
    Σ.refs.STATE_NOT_HELD = ~Σ.refs.STATE_HELD;
    Σ.refs.TaskControlBlock.prototype.setRunning = Σ.addFunction(function αyrWN() {
        var Σ_14 = new Σ.Scope(this, αyrWN, '14', Σ, {}, []);
        this.state = Σ.refs.STATE_RUNNING;
    }, Σ);
    Σ.refs.TaskControlBlock.prototype.markAsNotHeld = Σ.addFunction(function αGL7z() {
        var Σ_15 = new Σ.Scope(this, αGL7z, '15', Σ, {}, []);
        this.state = this.state & Σ.refs.STATE_NOT_HELD;
    }, Σ);
    Σ.refs.TaskControlBlock.prototype.markAsHeld = Σ.addFunction(function αoH6o() {
        var Σ_16 = new Σ.Scope(this, αoH6o, '16', Σ, {}, []);
        this.state = this.state | Σ.refs.STATE_HELD;
    }, Σ);
    Σ.refs.TaskControlBlock.prototype.isHeldOrSuspended = Σ.addFunction(function αzC81() {
        var Σ_17 = new Σ.Scope(this, αzC81, '17', Σ, {}, []);
        return (this.state & Σ.refs.STATE_HELD) != 0 || this.state == Σ.refs.STATE_SUSPENDED;
    }, Σ);
    Σ.refs.TaskControlBlock.prototype.markAsSuspended = Σ.addFunction(function α31D4() {
        var Σ_18 = new Σ.Scope(this, α31D4, '18', Σ, {}, []);
        this.state = this.state | Σ.refs.STATE_SUSPENDED;
    }, Σ);
    Σ.refs.TaskControlBlock.prototype.markAsRunnable = Σ.addFunction(function αsxu3() {
        var Σ_19 = new Σ.Scope(this, αsxu3, '19', Σ, {}, []);
        this.state = this.state | Σ.refs.STATE_RUNNABLE;
    }, Σ);
    Σ.refs.TaskControlBlock.prototype.run = Σ.addFunction(function α5PDt() {
        var Σ_20 = new Σ.Scope(this, α5PDt, '20', Σ, {}, []);
        Σ_20.refs.packet = undefined;
        if (this.state == Σ.refs.STATE_SUSPENDED_RUNNABLE) {
            Σ_20.refs.packet = this.queue;
            this.queue = Σ_20.refs.packet.link;
            if (this.queue == null) {
                this.state = Σ.refs.STATE_RUNNING;
            } else {
                this.state = Σ.refs.STATE_RUNNABLE;
            }
        } else {
            Σ_20.refs.packet = null;
        }
        return this.task.run(Σ_20.refs.packet);
    }, Σ);
    Σ.refs.TaskControlBlock.prototype.checkPriorityAdd = Σ.addFunction(function αYAn1(task, packet) {
        var Σ_21 = new Σ.Scope(this, αYAn1, '21', Σ, {
            task: task,
            packet: packet
        }, []);
        if (this.queue == null) {
            this.queue = Σ_21.refs.packet;
            this.markAsRunnable();
            if (this.priority > Σ_21.refs.task.priority) {
                return this;
            }
        } else {
            this.queue = Σ_21.refs.packet.addTo(this.queue);
        }
        return Σ_21.refs.task;
    }, Σ);
    Σ.refs.TaskControlBlock.prototype.toString = Σ.addFunction(function αPyZF() {
        var Σ_22 = new Σ.Scope(this, αPyZF, '22', Σ, {}, []);
        return 'tcb { ' + this.task + '@' + this.state + ' }';
    }, Σ);

    function IdleTask(scheduler, v1, count) {
        var Σ_23 = new Σ.Scope(this, IdleTask, '23', Σ, {
            scheduler: scheduler,
            v1: v1,
            count: count
        }, []);
        this.scheduler = Σ_23.refs.scheduler;
        this.v1 = Σ_23.refs.v1;
        this.count = Σ_23.refs.count;
    }
    Σ.refs.IdleTask.prototype.run = Σ.addFunction(function α1JfV(packet) {
        var Σ_24 = new Σ.Scope(this, α1JfV, '24', Σ, {
            packet: packet
        }, []);
        this.count--;
        if (this.count == 0) {
            return this.scheduler.holdCurrent();
        }
        if ((this.v1 & 1) == 0) {
            this.v1 = this.v1 >> 1;
            return this.scheduler.release(Σ.refs.ID_DEVICE_A);
        } else {
            this.v1 = this.v1 >> 1 ^ 53256;
            return this.scheduler.release(Σ.refs.ID_DEVICE_B);
        }
    }, Σ);
    Σ.refs.IdleTask.prototype.toString = Σ.addFunction(function α3MWF() {
        var Σ_25 = new Σ.Scope(this, α3MWF, '25', Σ, {}, []);
        return 'IdleTask';
    }, Σ);

    function DeviceTask(scheduler) {
        var Σ_26 = new Σ.Scope(this, DeviceTask, '26', Σ, {
            scheduler: scheduler
        }, []);
        this.scheduler = Σ_26.refs.scheduler;
        this.v1 = null;
    }
    Σ.refs.DeviceTask.prototype.run = Σ.addFunction(function α2RO1(packet) {
        var Σ_27 = new Σ.Scope(this, α2RO1, '27', Σ, {
            packet: packet
        }, []);
        if (Σ_27.refs.packet == null) {
            if (this.v1 == null) {
                return this.scheduler.suspendCurrent();
            }
            Σ_27.refs.v = this.v1;
            this.v1 = null;
            return this.scheduler.queue(Σ_27.refs.v);
        } else {
            this.v1 = Σ_27.refs.packet;
            return this.scheduler.holdCurrent();
        }
    }, Σ);
    Σ.refs.DeviceTask.prototype.toString = Σ.addFunction(function αdqZn() {
        var Σ_28 = new Σ.Scope(this, αdqZn, '28', Σ, {}, []);
        return 'DeviceTask';
    }, Σ);

    function WorkerTask(scheduler, v1, v2) {
        var Σ_29 = new Σ.Scope(this, WorkerTask, '29', Σ, {
            scheduler: scheduler,
            v1: v1,
            v2: v2
        }, []);
        this.scheduler = Σ_29.refs.scheduler;
        this.v1 = Σ_29.refs.v1;
        this.v2 = Σ_29.refs.v2;
    }
    Σ.refs.WorkerTask.prototype.run = Σ.addFunction(function αSxp3(packet) {
        var Σ_30 = new Σ.Scope(this, αSxp3, '30', Σ, {
            packet: packet
        }, []);
        if (Σ_30.refs.packet == null) {
            return this.scheduler.suspendCurrent();
        } else {
            if (this.v1 == Σ.refs.ID_HANDLER_A) {
                this.v1 = Σ.refs.ID_HANDLER_B;
            } else {
                this.v1 = Σ.refs.ID_HANDLER_A;
            }
            Σ_30.refs.packet.id = this.v1;
            Σ_30.refs.packet.a1 = 0;
            for (Σ_30.refs.i = 0; Σ_30.refs.i < Σ.refs.DATA_SIZE; Σ_30.refs.i++) {
                this.v2++;
                if (this.v2 > 26) {
                    this.v2 = 1;
                }
                Σ_30.refs.packet.a2[Σ_30.refs.i] = this.v2;
            }
            return this.scheduler.queue(Σ_30.refs.packet);
        }
    }, Σ);
    Σ.refs.WorkerTask.prototype.toString = Σ.addFunction(function αLN0c() {
        var Σ_31 = new Σ.Scope(this, αLN0c, '31', Σ, {}, []);
        return 'WorkerTask';
    }, Σ);

    function HandlerTask(scheduler) {
        var Σ_32 = new Σ.Scope(this, HandlerTask, '32', Σ, {
            scheduler: scheduler
        }, []);
        this.scheduler = Σ_32.refs.scheduler;
        this.v1 = null;
        this.v2 = null;
    }
    Σ.refs.HandlerTask.prototype.run = Σ.addFunction(function αLucR(packet) {
        var Σ_33 = new Σ.Scope(this, αLucR, '33', Σ, {
            packet: packet
        }, []);
        if (Σ_33.refs.packet != null) {
            if (Σ_33.refs.packet.kind == Σ.refs.KIND_WORK) {
                this.v1 = Σ_33.refs.packet.addTo(this.v1);
            } else {
                this.v2 = Σ_33.refs.packet.addTo(this.v2);
            }
        }
        if (this.v1 != null) {
            Σ_33.refs.count = this.v1.a1;
            Σ_33.refs.v = undefined;
            if (Σ_33.refs.count < Σ.refs.DATA_SIZE) {
                if (this.v2 != null) {
                    Σ_33.refs.v = this.v2;
                    this.v2 = this.v2.link;
                    Σ_33.refs.v.a1 = this.v1.a2[Σ_33.refs.count];
                    this.v1.a1 = Σ_33.refs.count + 1;
                    return this.scheduler.queue(Σ_33.refs.v);
                }
            } else {
                Σ_33.refs.v = this.v1;
                this.v1 = this.v1.link;
                return this.scheduler.queue(Σ_33.refs.v);
            }
        }
        return this.scheduler.suspendCurrent();
    }, Σ);
    Σ.refs.HandlerTask.prototype.toString = Σ.addFunction(function αGHLa() {
        var Σ_34 = new Σ.Scope(this, αGHLa, '34', Σ, {}, []);
        return 'HandlerTask';
    }, Σ);
    Σ.refs.DATA_SIZE = 4;

    function Packet(link, id, kind) {
        var Σ_35 = new Σ.Scope(this, Packet, '35', Σ, {
            link: link,
            id: id,
            kind: kind
        }, []);
        this.link = Σ_35.refs.link;
        this.id = Σ_35.refs.id;
        this.kind = Σ_35.refs.kind;
        this.a1 = 0;
        this.a2 = new Array(Σ.refs.DATA_SIZE);
    }
    Σ.refs.Packet.prototype.addTo = Σ.addFunction(function αPX5q(queue) {
        var Σ_36 = new Σ.Scope(this, αPX5q, '36', Σ, {
            queue: queue
        }, []);
        this.link = null;
        if (Σ_36.refs.queue == null) {
            return this;
        }
        Σ_36.refs.peek = undefined, Σ_36.refs.next = Σ_36.refs.queue;
        while ((Σ_36.refs.peek = Σ_36.refs.next.link) != null) {
            Σ_36.refs.next = Σ_36.refs.peek;
        }
        Σ_36.refs.next.link = this;
        return Σ_36.refs.queue;
    }, Σ);
    Σ.refs.Packet.prototype.toString = Σ.addFunction(function α1xpn() {
        var Σ_37 = new Σ.Scope(this, α1xpn, '37', Σ, {}, []);
        return 'Packet';
    }, Σ);
}(require('things-js').bootstrap('mqtt://localhost', 'richards.js')));