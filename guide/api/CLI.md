# CLI commands


## `things-js pubsub`

Options:

* [`-d` | `--debug`] - set debug flag to true


Description:

    Start a MOSCA Publish/Subscribe Server


Example:

```
~$ things-js pubsub
```


## `things-js dashboard`

Alias: `things-js dash`


Options:

* [`-c <conf_path>` | `--config <conf_path>`] - specify a configuration file to use

    The content of the file located at `<conf_path>` must be a json string. Default shown below:

```
{
	port: 3000,
	pubsub_url: 'mqtt://localhost',
	fs_db_url: 'mongodb://localhost:27017/things-js-fs'
}
```

Description:

    This command starts the web dashboard application, binding to port specified by `port`. It will use the Publish/Subscribe service located at `pubsub_url` and use Global File Storage service located at `fs_db_url`.


Example:

```
~$ things-js dash -c ./dashboard.conf
```


## `things-js worker <conf_path>`

Alias: `things-js engine <conf_path>`

    The content of the file located at `<conf_path>` must be a json string. Default shown below :

```
{
    "pubsub_url": "mqtt://localhost",
    "id": "engine-" + {randomly generated at runtime},
    "device": "raspberry-pi3"
}
```

Options:

* [`-d` | `--debug`] - set debug flag to true


Description:

    It starts a ThingsJS worker, connecting to Publish/Subscribe service at `pubsub_url`. If `id` is given in the configuration file, it will use that value. If not given, it will be generated randomly upon start.


Example:

```
~$ things-js worker ./pi-01.conf
```


## `things-js instrument <file_path>`

Alias: `things-js inst <file_path>`

Options:

* [`-s <save_path>` | `--save <save_path>`] - File path to optionally save instrumented code
* [`-p <pubsub_url>` | `--pubsub <pubsub_url>`] - Pubsub URL to use for the output program. Defaults to `mqtt://localhost`
* [`-d` | `--debug`] - set debug flag to true


Description:

    Instrument the JavaScript file located at `<file_path>` and write the instrumented source code to stdout.

Example:

```
~$ things-js inst ./myComponent.js > ./myComponent.things.js
```


## `things-js restore <file_path>`

Options:

* [`-s <save_path>` | `--save <save_path>`] - File path to optionally save instrumented code
* [`-d` | `--debug`] - set debug flag to true

Description:

    Restore the ThingsJS JSON snapshot file located at `<file_path>` and write the restored source code to stdout.

Example:

```
~$ things-js restore ./myComponent.json > ./myComponent.restored.js
```


## `things-js run <file_path>`

Options:

* [`-r` | `--restore`] - indicate that input `<file_path>` is a JSON snapshot
* [`-s <save_path>` | `--save <save_path>`] - File path to optionally save processed (instrumented/restored) code
* [`-p <pubsub_url>` | `--pubsub <pubsub_url>`] - Pubsub URL to use for the output program. Defaults to `mqtt://localhost`
* [`-d` | `--debug`] - set debug flag to true


Description:

    Instrument or Restore the input file located at `<file_path>` and then run the program. It should be noted that **this command will run the process without a CodeEngine instance**, so it will not be included during scheduling.


Example:

```
~$ things-js run ./myComponent.js
```


