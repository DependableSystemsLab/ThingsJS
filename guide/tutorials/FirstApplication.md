# Using a Pocket Beagle

PocketBeagle is an ultra-tiny-yet-complete open-source USB-key-fob computer. For more information on [Pocket Beagle](https://beagleboard.org/pocket)

## Setting up the Pocket beagle

* Install the debian image in 4GB or greater memory card from [here](https://beagleboard.org/latest-images).

* Plug in the PocketBeagle to the PC using the USB cable.

* You have two ways to use the PocketBeagle terminal
  * When the PocketBeagle is connected it automatically acquires the local IP of 192.168.7.1 or 192.168.6.1 depending on the Operating system. 192.168.7.1 is for Linux based distros. Going on the local IP we get access to Cloud9 IDE and Bonescript which comes preinstalled. You can directly run commands from the terminal provided in CLoud 9 IDE.

  * The second way to proceed is to ssh into the machine like any other embedded device.

  ```
  ~$ ssh debian@192.168.7.2

  ```
  The default password is temppwd

* For Ubuntu share internet from the host PC through USB, however, the internet connection is quite slow when we use internet over the USB. Hence, you can consider the option of cross-compiling it on the host PC and them using it on the PocketBeagle.

* Check your internet connection.

```
~$ ping 8.8.8.8

```

## Installing ThingsJS

* Clone the repository from github

```
~$ git clone https://github.com/DependableSystemsLab/ThingsJS.git

```

* Enter the cloned directory

```
~$ cd ThingJS

```

* Install ThingsJS

```
~$ sudo npm install -g

```

## Using ThingsJS

Now that ThingsJS is set up on the PocketBeagle, we can start using it.

* Starting a Pubsub Server

```
~$ things-js pubsub

```

* Starting MongoDB

```
~$ sudo service mongod start

```

Note: Since here we are not making use of the GUI, we have to manually start these two services in the terminal.

* Start ThingsJS

```
~$ thingsjs

```

This enters the ThingsJS console.

* To use the PocketBeagle as a worker follow the following steps

To start a ThingsJS worker, first you need to create a directory that will provide the NodeJS environment. This is because the worker needs to have a reference to the `things-js` module and any other npm modules that a ThingsJS user (developer) may require. If the worker cannot find a link to a `node_modules` directory, it will throw an error.

```
~$ mkdir hello_things
~$ cd hello_things
~$ npm link things-js

#create a config file for the worker first (e.g. node_00.conf)

~/hello_things$ things-js worker node_00.conf
```

The configuration file is a required argument for starting the worker. It should contain the following information:

```
{
    "pubsub_url": "mqtt://localhost",
    "id": "node_00",
    "device": "raspberry-pi3"
}
```

The PocketBeagle hence works with ThingsJS.
