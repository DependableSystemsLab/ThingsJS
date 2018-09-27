# Using a Beaglebone Black

BeagleBone Black is a low-cost, community-supported development platform for developers and hobbyists. Boot Linux in under 10 seconds and get started on development in less than 5 minutes with just a single USB cable. For more information on [Beaglebone Black](https://beagleboard.org/black)

A beaglebone black is one of the powerful devices in the world of embedded systems with 4GB 8-bit eMMC on-board flash storage, 3D graphics accelerator,NEON floating-point accelerator, 2x PRU 32-bit microcontrollers.

## Setting up the Beaglebone Black

* Plug in the Beaglebone Black to the PC using the USB cable. The BBB comes pre booted with a Linux image. There is no need for a memory card for booting a BBB.

* You have two ways to use the Beaglebone Black terminal
  * When the Beaglebone Black is connected it automatically acquires the local IP of 192.168.7.1 or 192.168.6.1 depending on the Operating system. 192.168.7.1 is for Linux based distros. Going on the local IP we get access to Cloud9 IDE and Bonescript which comes preinstalled. You can directly run commands from the terminal provided in CLoud 9 IDE.

  * The second way to proceed is to ssh into the machine like any other embedded device.

  ```
  ~$ ssh debian@192.168.7.2

  ```
  The default password is temppwd

* For Ubuntu share internet from the host PC through USB, however, the internet connection is quite slow when we use internet over the USB. Hence, you can consider the option of cross-compiling it on the host PC and them using it on the Beaglebone Black.

*There is an Ethernet port provided in the BBB which is advised for getting better internet speed.

* Check your internet connection.

```
~$ ping 8.8.8.8

```



* Install ThingsJS using the Getting started steps.
```

```

The configuration file is a required argument for starting the worker. It should contain the following information:

```
{
    "pubsub_url": "mqtt://localhost",
    "id": "node_00",
    "device": "BBB"
}
```

The Beaglebone Black hence works with ThingsJS.
