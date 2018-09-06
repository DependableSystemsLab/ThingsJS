# System Architecture

A ThingsJS system consists of the following:

1. A set of [**Workers**](#workers) capable of running JavaScript *Programs*.
2. Capability to perform **[platform-independent live-migration](#platform-independent-live-migration-support) of a JavaScript Process** from one *Worker* to another
3. A [**Publish/Subscribe interface**](#publishsubscribe-interface) through which all *Workers* in the system communicate.
4. A [**Scheduler service**](#scheduler-service) that monitors the system and coordinates the allocation and migration of *Processes* between the *Workers*.
5. A [**Global File System**](#global-file-system) accessible by all *Workers*.


## Workers

A ThingsJS *Worker* is a high-level term used to refer to an instance of `CodeEngine`, which implements the ThingsJS runtime system. A *Worker* receives control messages via the Pub/Sub interface and carries out tasks such as running or migrating a Program. Technically, it is a JavaScript daemon process running on a single machine.

Each *Worker* is capable of:

* instrumenting raw input code into a live-migratable version,
* running a *Program* as a child *Process*,
* producing a snapshot of a running *Process*, and
* restoring a *Process* from an input snapshot.


## Platform-independent Live-migration Support

In order to address reliability concerns, the ThingsJS *Scheduler* monitors all the *Devices* and *Processes* in the network and adjusts the *Schedule* - i.e. assignment of *Processes* to *Devices*. In certain cases, a *Process* might have to be killed because of low resource or reboot after update, but an *Application* may require that that *Process* never terminate. Therefore, stateful live-migration support is critical in ThingsJS for flexible scheduling.

IoT systems are heterogeneous and will remain thus in the future; we do not make any assumptions about the underlying hardwares in the system. However, ThingsJS does assume that each *Device* in the network is equipped with a JavaScript engine that implements ECMAScript 5 Standard. ThingsJS live-migration mechanism is implemented purely at the JavaScript layer through code instrumentation, and involves no modifcation to the underlying VM (i.e. JS engine).


## Publish/Subscribe Interface

While the physical links between the machines will constitute some kind of a tree-like network, ThingsJS does not make any assumptions about the network layer. ThingsJS assumes that there is a Publish/Subscribe service reachable by every Worker, and all communication happens through this software-defined interface. Furthermore, ThingsJS does not assume a specific implementation of the interface, but only assumes per-topic FIFO message ordering guarantee. In the current version of ThingsJS, the Publish/Subscribe interface is centralized and uses the MQTT protocol.

An example of how ThingsJS uses the Pub/Sub interface:

1. A Worker named `camera-1` boots up.
2. `camera-1` subscribes to topic `camera-1/cmd` to receive control messages.
3. `camera-1` publishes its status to topic `engine-registry` to notify other Workers that it is online.
4. The *Scheduler* decides to run `video-streamer.js` on `camera-1`.
5. The *Scheduler* publishes a message to topic `camera-1/cmd` to request `camera-1` to run `video-streamer.js`. The message contains the control keyword `run` along with the code of `video-streamer.js`.
6. Upon receiving the message, `camera-1` instruments the code and then executes the instrumented code as a child process.


## Scheduler Service

At the bare minimum, a network of ThingsJS *Workers* and a Publish/Subscribe server is enough to build a working IoT system. However, with this minimal setup, coordinating the execution and migration of different *Programs* across the *Devices* is a manual effort. When there is a large number of *Devices* and *Programs*, which is a more realistic IoT setup, manual coordination becomes impractical. In its simplest form, the problem of assigning *Programs* to *Devices* boils down to the [bin-packing problem](https://en.wikipedia.org/wiki/Bin_packing_problem). Therefore we need an automated way to manage the system.

ThingsJS assumes that there is a *Scheduler* Service that:

* has a global view of the network,
* can send commands to any *Worker*,
* makes scheduling decisions according to some user-defined policy, and
* can accept requests from an end-user of the system to make changes to the current *Schedule*

While ThingsJS expects there to be a *Scheduler*, it does not assume how it is implemented. The default scheduling algorithm included in the framework is a greedy first-fit algorithm, but the user can (and should be able to) specify what algorithm the *Scheduler* should use. In addition, the *Scheduler* could be centralized or decentralized, but ThingsJS does not assume either and only expects an interface to use the service.


## Global File System

Although it is not critical for an IoT system to have a shared file system, a lot of things become easy when it does have one. For example, creating a log for recording events across the network becomes much easier when all the *Workers* are writing to the same log file (or at least, the same file as far as the programmer is concerned). In addition, a *Global File System* is a good place to store the *Application* code shared by all the *Workers*.

Similar to many other concepts in ThingsJS, we do not assume a specific implementation of the file system; it could be centralized or distributed. In the current version, the file system is implemented through a central MongoDB service with a RESTful API.


# Example Setup

A small ThingsJS system consisting of 3 different devices might look like this:

* 1 Raspberry Pi 3 running a ThingsJS Worker runtime.
* 1 Raspberry Pi Zero running a ThingsJS Worker runtime.
* 1 Desktop PC, running a ThingsJS Scheduler service, a Pub/Sub server, and the File Server.

A user of this system would make a request to the Scheduler service to run a Program, after which the Scheduler would decide which Raspberry Pi should run it. The Scheduler will send the Code to the target Worker via the Pub/Sub interface, and the selected Worker will execute the Program.