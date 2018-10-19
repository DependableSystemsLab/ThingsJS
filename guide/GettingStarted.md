# Getting Started

ThingsJS is packaged as an NPM module; you will need to have Node.js installed on the machines you would like to use ThingsJS on.


## Installation

You can install via the following NPM command:

```
~$ sudo npm install -g things-js

```

* You may omit the `sudo` depending on your NodeJS install settings.
* **You need the `-g` (global installation) option for using the CLI**. If you don't plan on using the CLI, you can omit the `-g` option.


## Using the CLI

Commands available currently:
* `things-js pubsub` - Start a MQTT Publish/Subscribe Server
* `things-js dashboard` - Start the Web Dashboard
* `things-js worker {config}` - Start a ThingsJS worker
* `things-js instrument {code}` - Instrument the given user code into a live-migratable version.

### Starting a Pubsub Server

```
~$ things-js pubsub
```

### Starting the Web Dashboard

```
~$ things-js dash

#OR

~$ things-js dashboard
```

By default it connects to MQTT at `localhost:1883`, MongoDB at `localhost:27017/things_dashboard`, and listens on `localhost:3000`.
To start the dashboard with a different configuration, you can use the `-c` or `--config` options with the config file path provided as an argument.
e.g.
```
~$ things-js dash -c my_config.conf
```

This will start a web-application served at the specified port.
You can watch the demo of the Dashboard here:

<a href="http://ece.ubc.ca/~kumseok/assets/ThingsJS_Migration.mp4" target="_blank"><img src="http://ece.ubc.ca/~kumseok/assets/ThingsJS_Migration.png" 
alt="Demo Screenshot" width="427" height="240" border="10" /><p>Click Image to see Demo Video</p></a>


### Starting a ThingsJS worker:

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


To instrument raw JavaScript code into a "ThingJS-compatible" code:
```
~$ things-js inst my_code.js

#OR

~$ things-js instrument my_code.js
```
By default the output file will have the same file name, with the extension `.things.js`.
To specify the output file name, provide the optional argument with `-o` or `--output`.
e.g.
```
~$ things-js inst my_code.js -o my_code.instrumented.js
```

