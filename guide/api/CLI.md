# CLI commands

* [`things-js pubsub`](#things-js-pubsub) - Start a MQTT Publish/Subscribe Server
* [`things-js dashboard`](#things-js-dashboard) - Start a ThingsJS Web Dashboard server
* [`things-js worker`](#things-js-worker-confpath) - Start a ThingsJS Worker process
* [`things-js instrument`](#things-js-instrument-filepath) - Instrument a given JavaScript file to make it migratable
* [`things-js restore`](#things-js-restore-filepath) - Restore program code from a given JSON snapshot file
* [`things-js run`](#things-js-run-filepath) - Run a JavaScript program as a ThingsJS process
* [`things-js dispatch`](#things-js-dispatch-pubsuburl-ctrl-args) - Control ThingsJS workers and processes using Dispatcher commands
* [`things-js scheduler`](#things-js-scheduler-confpath) - Start a ThingsJS Scheduler processs

---

## `things-js pubsub`

> Start a MOSCA Publish/Subscribe Server, binding to port 1883 (MQTT).

**Options:**

* [`-d` | `--debug`] - set debug flag to true, and messages will be printed to the stdout


**Example:**

```
~$ things-js pubsub
```

---

## `things-js dashboard`

**Alias:** `things-js dash`

> This command starts the web dashboard application, binding to port specified by `port`. It will use the Publish/Subscribe service located at `pubsub_url` and use Global File Storage service located at `fs_db_url`.

**Options:**

* [`-c <conf_path>` | `--config <conf_path>`] - specify a configuration file to use

The content of the file located at `<conf_path>` must be a json string. Default shown below:

```
{
	port: 3000,
	pubsub_url: 'mqtt://localhost',
	fs_db_url: 'mongodb://localhost:27017/things-js-fs'
}
```

**Example:**

```
~$ things-js dash -c ./dashboard.conf
```

---

## `things-js worker <conf_path>`

**Alias:** `things-js engine <conf_path>`

The content of the file located at `<conf_path>` must be a json string. Default shown below :

```
{
    "pubsub_url": "mqtt://localhost",
    "id": "engine-" + {randomly generated at runtime},
    "device": "raspberry-pi3"
}
```

> It starts a ThingsJS worker, connecting to Publish/Subscribe service at `pubsub_url`. If `id` is given in the configuration file, it will use that value. If not given, it will be generated randomly upon start.

**Options:**

* [`-d` | `--debug`] - set debug flag to true


**Example:**

```
~$ things-js worker ./pi-01.conf
```

---

## `things-js instrument <file_path>`

**Alias:** `things-js inst <file_path>`

> Instrument the JavaScript file located at `<file_path>` and write the instrumented source code to stdout.

**Options:**

* [`-s <save_path>` | `--save <save_path>`] - File path to optionally save instrumented code
* [`-p <pubsub_url>` | `--pubsub <pubsub_url>`] - Pubsub URL to use for the output program. Defaults to `mqtt://localhost`
* [`-d` | `--debug`] - set debug flag to true

**Example:**

```
~$ things-js inst ./myComponent.js > ./myComponent.things.js
```

---

## `things-js restore <file_path>`

> Restore the ThingsJS JSON snapshot file located at `<file_path>` and write the restored source code to stdout.

**Options:**

* [`-s <save_path>` | `--save <save_path>`] - File path to optionally save instrumented code
* [`-d` | `--debug`] - set debug flag to true


**Example:**

```
~$ things-js restore ./myComponent.json > ./myComponent.restored.js
```

---

## `things-js run <file_path>`

> Instrument or Restore the input file located at `<file_path>` and then run the program. It should be noted that **this command will run the process without a CodeEngine instance**, so it will not be included during scheduling.

**Options:**

* [`-r` | `--restore`] - indicate that input `<file_path>` is a JSON snapshot
* [`-s <save_path>` | `--save <save_path>`] - File path to optionally save processed (instrumented/restored) code
* [`-p <pubsub_url>` | `--pubsub <pubsub_url>`] - Pubsub URL to use for the output program. Defaults to `mqtt://localhost`
* [`-d` | `--debug`] - set debug flag to true


**Example:**

```
~$ things-js run ./myComponent.js
```

---

## `things-js dispatch <pubsub_url> <ctrl> [args...]`

> Send `Dispatcher` commands over the Pub/Sub interface to control the ThingsJS workers

* `pubsub_url` is the URL of the MQTT Pub/Sub service (e.g. `mqtt://localhost`); any worker connected to the same Pub/Sub server can be controlled.

* `ctrl` and `[args...]` specify what `Dispatcher` command to issue. The following commands are available:
    * `run <engine_id> <file_path>` - Run a JavaScript program found at `<file_path>` on `<engine_id>`. Upon success, a `<process_id>` for the newly started process will be returned.
    * `pause <process_id>` - Pause the process with ThingsJS process id `<process_id>`
    * `resume <process_id>` - Resume the process with ThingsJS process id `<process_id>`
    * `kill <process_id>` - Kill the process with ThingsJS process id `<process_id>`
    * `migrate <from_engine> <to_engine> <code_name> <process_id>` - Live-migrate the process with ThingsJS process id `<process_id>` and name `<code_name>` from `<from_engine>` to `<to_engine>`.

**Example:**

```
~$ things-js dispatch mqtt://localhost run pi-01 factorial.js
```
In the above example, `<pubsub_url>` = `mqtt://localhost`, `<ctrl>` = `run`, `[args...]` = `pi-01 factorial.js`. This command will run `factorial.js` on Worker `pi-01`.

---

## `things-js scheduler <conf_path>`

**Alias:** `things-js sched <conf_path>`

The content of the file located at `<conf_path>` must be a json string. Default shown below :

```
{
    "pubsub_url": "mqtt://localhost",
    "id": "things-scheduler"
}
```

> It starts a ThingsJS scheduler, connecting to Publish/Subscribe service at `pubsub_url`.

**Example:**

```
~$ things-js scheduler ./scheduler.conf
```

---