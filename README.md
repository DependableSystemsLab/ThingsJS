# ThingsJS
ThingsJS is a framework for running JavaScript applications on IoT devices such as Raspberry PIs

* NOTE: This repository is currently under active development and contents are subject to breaking changes. Please *DO NOT USE* in production.


## Directory Structure

```
/bin
/docs
/lib
    /engine
    /pubsub
/util
    /dashboard
/samples

```
This repository is organized thus:

1. [`bin`](bin/) contains the `things-js` CLI (shell script) that is installed with the package. Also contains default config files.
2. [`docs`](docs/) contains all the documentations and references (PDF, txt, md, docx, etc.)
3. [`lib`](lib/) contains the core ThingsJS code
    1. [`engine`](lib/engine/) contains the main ThingsJS objects such as `CodeEngine`, `Dispatcher`, `Code`, and `Scope`.
    2. [`pubsub`](lib/pubsub/) contains the wrapper object around the `mqtt` module that is used as the main mode of communication in ThingsJS
4. [`util`](util/) contains apps and debug tools built using ThingsJS library
    1. [`dashboard`](lib/dashboard/) contains the ThingsJS Dashboard application; it is an `express` web-application
5. [`samples`](samples/) contains raw JavaScript sample code (non-instrumented) that can be dispatched to ThingsJS workers.


## Dependencies

* The ThingsJS framework uses MQTT Pub/Sub as its main communication mechanism and assumes the existence of an active MQTT service. Either **Mosquitto**, or **Mosca** will do. The Pub/Sub service is referenced only by the URL (e.g. `mqtt://localhost`) within the ThingsJS framework and does not assume any specific implementation of the service.

* For running the Dashboard web-application, **MongoDB** is required as the Dashboard uses it to store the end-user code.


## Getting Started

For trying out the framework, you can follow the steps below:

### Installation

#### Option 1

1. `git clone` this repository
```
~$ git clone https://github.com/karthikp-ubc/ThingsJS.git
```

2. `npm install -g` to install the package. (download all the npm dependencies and link the CLI tool)
You may need to put `sudo` depending on your installation of NodeJS.
You need the `-g` (global installation) option for using the CLI. If you don't plan on using the CLI, you can omit the `-g` option. 
```
~$ cd ThingsJS
~/ThingsJS$ npm install -g
```

#### Option 2

1. Install via npm
```
~$ sudo npm install -g things-js
```
You may omit the `sudo` depending on your NodeJS install settings.


#### Using the CLI

Along with the API provided, CLI is included for easy use.
Commands available currently:
* things-js dashboard
* things-js worker {config}
* things-js instrument {code}


1. To start the Dashboard Application:
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

2. Running a ThingsJS worker:

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
    "node_id": "node_00",
    "device": "raspberry-pi3"
}
```


3. To instrument raw JavaScript code into a "ThingJS-compatible" code:
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


## License

MIT