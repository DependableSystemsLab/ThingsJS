# ThingsJS VM Image

For your convenience, we provide a pre-built VM image that contains the following:

* [ThingsJS v2.0](https://github.com/DependableSystemsLab/ThingsJS/releases) with all Node.JS packages and other prerequisites (e.g., MongoDB, npm, MQTT broker)
  * Installed under `~/ThingsJS`
* Sample JavaScript components:
  * `factorial.js`: sample factorial application
  * `video_streamer.js`: emulates a video camera (from a local mp4 file), and streams the frames over a publish-subscribe channel
  * `motion_detector.js`: detects motion in the stream over the publish-subscribe channel
* The ThingsJS dashboard

The VM image provides a default install of Ubuntu 16.04 and the Chromium web browser to access the dashboard (note: if Chromium prompts you for a keyring password, simply hit the `Cancel` button -- you might have to press a few times).

You should have a recent version of VirtualBox, at least 4 GB of RAM and a dual-core processor (or better). It is also recommended that you enable Hardware Virtualization in your BIOS.

VM Credentials:
* Username: thingsmigrate
* Password: thingsmigrate

## Linux Terminal

To execute the following commands, you will have to use the Linux terminal (black screen shortcut in the Ubuntu toolbar). You will need to open multiple terminal tabs or windows to run multiple commands simultaneously -- to do so, you can use the `New Terminal` command form the `Terminal` menu (new window), or you can use the Ctrl+Shift+T shortcut (new tab).

## Launching the pub/sub broker

As described in more details in the [Getting Started](https://dependablesystemslab.github.io/ThingsJS/GettingStarted.html) page, the ThingsJS infrastructure and all applications/components use the publish/subscribe (MQTT) protocol. The ThingsJS MQTT broker must first be launched as follows. The terminal window must remain open.

```
~$ things-js pubsub
```

## Launching the dashboard service

To launch the dashboard service, open a new terminal tab/window, and type:

```
~$ things-js dashboard
```

Then, open the built-in Chromium web browser to `http://localhost:3000`

## Launching workers

Each IoT device typically hosts one worker, which can execute several ThingsJS components. In this VM, we have preconfigured three workers (to emulate three devices). The configuration files for these workers are located under: `~/ThingsJS-Workers`. To launch the workers, type each of the following commands in a new terminal:

```
~$ cd ~/ThingsJS-Workers
~$ things-js worker node_00.conf
~$ things-js worker node_01.conf
~$ things-js worker node_02.conf
```

The three devices should then appear in the `Home` tab of the dashboard.

## Source code for the sample applications

Under the `Files` tab, navigate to the `codes` directory. You'll be able to view the source code for the 3 sample applications.

## Interacting with the dashboard: launching, stopping, migrating applications

This demo allows you to launch, stop and migrate the three sample applications, observe the state of the workers and components, and view the output of the applications. Please follow the [dashboard instructions](https://dependablesystemslab.github.io/ThingsJS/tutorials/dashboard/Dashboard.html) for more details on how to use the dashboard.

You can try to do the following:
* Launching `factorial.js` and migrating it between two workers.
* Launching `video_streamer.js` and observing the output video stream.
* Launching `motion_detector.js` and observing the output video stream.
* Migrating the `video_streamer.js` and `motion_detector.js` components between workers.
* For all workers, observing the status and system metrics (e.g., CPU, memory), as well as the output and console output.
* Stopping the execution of the different components.

**Note**: for this demo, due to the fact that all workers run in the same VM, the scheduler is disabled. You have to launch the components manually onto the target devices.

**Important**: please shutdown the VM gracefully (using the top-right shutdown icon in Ubuntu) to avoid file system corruption.

## Resetting the VM to its default state (if something goes wrong!)

If anything goes wrong, you can use the Snapshots configuration page of the VM in VirtualBox (after having stopped it) to revert to the "ThingsJS V2 Demo Setup" snapshot. If prompted, please uncheck the box asking if you'd like to keep your changes.

## Previous VM Image (V1)

**Note**: these instructions apply to the version 2 of the VM image. To access version 1, you can restore snapshot "ThingsJS V1.0 Demo Setup".
