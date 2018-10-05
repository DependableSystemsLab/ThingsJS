# Live-migrating a JavaScript process

ThingsJS can be used to migrate a running Process from one Device to another in a stateful manner. For example, let's say we have a simple counter program with a variable `count` being incremented every second. After we run this program on Device A for 10 seconds, the variable `count` will have a value of `10`. If we then migrate this program to Device B, the program will resume from the same point, where `count` has the value `10`. In this tutorial, we will be performing live-migration of a simple Program, `factorial.js`, from one Worker to another.


## Setup/Requirement

* At least one machine, but preferably two machines to perform live-migration over the network
* Code for `factorial.js`


## Walk-through

We will refer to the two devices involved in this tutorial as Device A and B. We will assume that Device A has IP address `192.168.0.100` and Device B has IP address `192.168.0.200`.

1. First, we will need to set up the ThingsJS Workers. **On both Device A and B**, create a directory to use as the Worker's runtime environment.

```
~$ mkdir migration-tutorial
```


2. Navigate into the new directory and create the Worker configuration files **(for both Device A and B)**.

```
~$ cd migration-tutorial
~/migration-tutorial$ vim my-worker.conf
```


3. Configuration file should be a JSON string with the following properties: `pubsub_url`, `id`.

```
{
	"pubsub_url": "mqtt://192.168.0.100",
	"id": "worker-A"
}
```

The value of `pubsub_url` should be a URL to the Publish/Subscribe service. In this tutorial, we will be hosting the Pub/Sub service on Device A, so we use the URL `mqtt://192.168.0.100` - replace this with the public IP of *your Device A*. **`pubsub_url` should have the same value** on both Device A and B's configuration files, but **`id` should be assigned differently**.


4. Run the Publish/Subscribe service and verify that the workers connect okay.

On Device A only:

```
~$ things-js pubsub -d
```

Then on both devices:

```
~/migration-tutorial$ things-js worker my-worker.conf
```


5. On successful launch, you should see some messages on the console:

```
~/migration-tutorial$ things-js worker my-worker.conf
[Engine:worker-A] Initialized
[Engine:worker-A] connected to Pub/Sub at mqtt://192.168.0.100
```

If there is no message about connection to Pub/Sub, it is possible that the Pub/Sub service is not running, or that the configured IP address is not reachable.


6. We will use the ThingsJS CLI to control the workers for this tutorial. On any machine (it does not have to be Device A or B, it just needs to be able to reach the Pub/Sub service), enter the following CLI command to run `factorial.js` on worker A. **The working directory where the following command is entered must contain `factorial.js` source file.**

```
~$ things-js dispatch mqtt://192.168.0.100 run worker-A factorial.js
```

`things-js dispatch` is a command for performing `Dispatcher` operations. It will create a temporary `Dispatcher` object, connect to the Pub/Sub service, execute `Dispatcher` actions, then terminate. Supported `Dispatcher` actions are: `run`, `pause`, `resume`, `kill`, `migrate`. The signature for a `things-js dispatch` command is thus:

```
~$ things-js dispatch <pubsub_url> <action> [action_args...]
```

Once the above command is successfully run, the CLI should display an output like shown in the example below:
```
{ engine: 'worker-A',
  id: 'HwJIiOTD',
  pid: 9398,
  status: 'Running' }
```
The `id` field contains the ThingsJS Process ID (not the same as PID), which we need for controlling the `factorial.js` process. **Take note of this value.** (In the example it is `HwJIiOTD`)

On Device A's console, you should also see the output from `factorial.js`.


7. Next we will migrate the running `factorial.js` process from `worker-A` to `worker-B`. To do this, enter the following command:

```
~$ things-js dispatch mqtt://192.168.0.100 migrate worker-A worker-B factorial.js HwJIiOTD
```

The last argument here is the ThingsJS Process ID we noted in step 6. Once the command is successful, you should see Device B continuing execution of `factorial.js`.