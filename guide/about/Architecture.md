# System Architecture

A ThingsJS system consists of the following:

1. A set of **Workers** capable of running JavaScript *Programs*.
2. Capability to perform **platform-independent live-migration of a Process** from one Worker to another
3. A **Publish/Subscribe interface** accessible by all *Workers* in the system. At the higher-level, *ThingsJS does not assume a specific implementation of the interface*, but assumes per-topic FIFO message ordering guarantee. In the current version of ThingsJS, the Publish/Subscribe interface is centralized and uses the MQTT protocol.
4. A **Global File System accessible** by all *Workers*. At the higher-level, *ThingsJS does not assume a specific implementation of the file system*. In the current version, the file system is implemented through a central MongoDB service.
5. A **Scheduler service** that monitors the network of *Workers* and coordinates the allocation and migration of *Programs* between the *Workers*.


# Example Setup

A small ThingsJS system consisting of 3 different devices might look like this:

* 1 Raspberry Pi 3 running a ThingsJS Worker runtime.
* 1 Raspberry Pi Zero running a ThingsJS Worker runtime.
* 1 Desktop PC, running a ThingsJS Scheduler service, a Pub/Sub server, and the File Server.

A user of this system would make a request to the Scheduler service to run a Program, after which the Scheduler would decide which Raspberry Pi should run it. The Scheduler will send the Code to the target Worker via the Pub/Sub interface, and the selected Worker will execute the Program.