# ThingsJS
ThingsJS is a framework for running JavaScript applications on IoT devices such as Raspberry PIs

* NOTE: This repository is currently under active development and contents are subject to breaking changes.

## Dependencies

* The ThingsJS framework uses Pub/Sub as its main communication mechanism and assumes existence of an active Pub/Sub service. Either **Mosquitto**, or **Mosca** will do. 

* For running the Dashboard web-application, **MongoDB** is required as the Dashboard uses it to store the end-user code.


## Getting Started

For trying out the framework, you can follow the steps below:

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

3. Along with the API provided, CLI is included for easy use.
Commands available currently:
* things-js dashboard
* things-js worker {config}
* things-js instrument {code}


* 3.a) To start the Dashboard Application:
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

* 3.b) To start a ThingsJS worker:
```
~$ things-js worker node_00.conf
```
The configuration file is a required argument for starting the worker. It should contain the following information:
```
{
    "pubsub_url": "mqtt://localhost",
    "node_id": "node_00",
    "device": "raspberry-pi3"
}
```

* 3.c) To instrument raw JavaScript code into a "ThingJS-compatible" code:
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