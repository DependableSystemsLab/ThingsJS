** This documentation is outdated **

# engine

This module contains objects that enable a ThingsJS application to interact with user-provided code at runtime. It uses `pubsub` to communicate with other nodes.


## Dependencies

* `../pubsub`
    * `CodeEngine` uses the Pubsub network to issue and receive commands
    * `Code` uses the Pubsub mechanism to pause the instrumented user code
    * The instrumented user code uses the Pubsub mechanism to receive "snapshot" command from the `Code` object
    
## Modules

1. `Code.js` - module for manipulating user code
2. `CodeEngine.js` - module for running different `Code` instances, runs on an IoT node
3. `Dispatcher.js` - module for managing a system of `CodeEngine` nodes by sending commands via Pubsub
4. `Scope.js` - object that is injected into the instrumented user code to capture the internal runtime scope.


### Code.js

This script implements the `Code` class to be used by `CodeEngine`.

A `Code` object will instrument the user code by injecting some ThingsJS modules into the user code, which allows the user code to be controlled by the `Code` object. A ThingsJS application can just use this object to interact with the underlying user code.

It exposes the following API:

* (constructor) `Code(sourcePath, pubsub)`
    * `sourcePath`: path of the raw user code
    * `pubsub`: the Pubsub object that this `Code` object uses to interact with the instrumented code, and the `CodeEngine` that this object is run within.

* `Code.prototype.initialize(sourcePath, pubsub)`
    * called by the constructor (no need to call it explicitly)
    * this function will begin the instrumentation of the user code located at `sourcePath`.
    * at the time of instrumentation, the pubsub's pubsubUrl is injected

* `Code.prototype.run()`
    * this function will execute the instrumented code; the instrumented code will start executing in the same process

* `Code.prototype.pause()`
    * this function will stop the execution of the instrumented code
    * pausing the execution is done through the Pubsub mechanism, because there is no way to do this through regular JavaScript API
    * The steps are thus:
        1. The `Code` object will publish a "snapshot" command to the topic that the instrumented code is subscribed to (e.g. `code-${codeId}/cmd`)
        2. The instrumented code, which is already subscribed to the said topic, will call `MigratorJs.snapshot()` and create a serialized snapshot.
        3. The instrumented code will then publish the serialized snapshot to `code-${codeId}/snapshots` topic
        4. The `Code`, which is already subscribed to the said topic, will receive the serialized snapshot as a pubsub message
    * Because of the asynchronous nature of this `pause()` call, it will create a deferred `Promise` object and store it in `this.$paused` variable
    * The snapshot will be available when `this.$paused` is resolved, and can be used by passing in a callback function with signature `function(snapshot)` to `this.$paused.then(callback)`

* `Code.prototype.saveToFile(filename)`
    * `filename`: path where the instrumented code will be saved
    * this function is used to write the instrumented code into a file

* `Code.prototype.getLastSnapshot()`
    * this function returns the most recent snapshot of the code

* `Code.prototype.saveLastSnapshot(filename)`
    * `filename`: path where the snapshot will be saved
    * this function is used to write the most recent snapshot into a file
    
* `Code.restoreCode(snapshot, funcMapString)`
    * `snapshot`: serialized string of the snapshot
    * `funcMapString`: serialized string of function definitions that is generated at the time of instrumentation
    * this is a "static" function, and is used to restore code from the given arguments
    * this is static because the restored code is oblivious of the original code and thus decoupled from any `Code` object


### CodeEngine.js

This script implements the `CodeEngine` class to be used by a ThingsJS application.

A `CodeEngine` object uses the Pubsub network to communicate with other `CodeEngine` objects running on different IoT nodes.
This object uses the `Code` module internally to instrument the user code and run them.
In short, `CodeEngine` is the "engine" that a ThingsJS application can use to run, pause, and transfer code to other "engine"s

It exposes the following API:

* (constructor) `CodeEngine(config, options)`
    * `config`: configuration object containing initialization parameters (e.g. `pubsubUrl`)
    * (optional) `options`: optional parameters used in `CodeEngine.prototype.initialize` - mainly for debugging
    
* `CodeEngine.prototype.initialize(config, options)`
    * called by the constructor (no need to call it explicitly)
    * this function will initialize the pubsub object
    * Upon connecting to the Pubsub broker, it will report its ID (e.g. `engine-01`)
    
* `CodeEngine.prototype.runCode(arguments)`
    * `arguments`: a dictionary
        * `source`: source code, it can be the string version of the code, or a path to the code. By default, it expects the string code.
        * (optional) `fromLocalPath`: should be set to `true`, if the `source` parameter is a path
        * (optional) `saveCode`: if set to `true`, it will save the instrumented code - extension will be `.things.js`
    * this function will create a new `Code` object, then run the code
    * returns the newly created `Code` ID
    
* `CodeEngine.prototype.pauseCode(codeId)`
    * `codeId`: the string ID of the `Code` that one wants to pause
    * this function will pause the execution of the user code identified by the `codeId`
    * this function can be executed via issuing Pubsub command `pause_code`
    
* `CodeEngine.prototype.restoreCode(arguments)`
    * `arguments`: a dictionary
        * `snapshot`: serialized string of the snapshot
        * `functionMap`: serialized function definition
    * this function will restore the user code from the serialized state information and resume execution
    * this function can be executed via issuing Pubsub command `restore_code`
    
* `CodeEngine.prototype.migrateCode(arguments)`
    * `arguments`: a dictionary
        * `targetId`: the ID of the target `CodeEngine` that the code should be transferred to
        * `codeId`: the ID of the `Code` that one wishes to migrate
    * this function transfers the snapshot of the `Code` with id=`codeId` to the `CodeEngine` with id=`targetId` 
    * this function can be executed via issuing Pubsub command `migrate_code`
    
* `CodeEngine.prototype.getRunData()`
    * returns the latest run data (metadata about the runtime), which also contains the snapshot
    
#### CodeEngine Pubsub API

**engine-${nodeId}/cmd**
the message sent to this Pubsub topic have the following signature:
{ `command`: `${command_name}`,
  `arguments`: `$(command_argument}` }

* run_code(arguments={ source, fromLocalPath, saveCode })
    * this command will execute `CodeEngine.prototype.runCode(arguments)`

* pause_code(arguments=codeId)
    * this command will execute `CodeEngine.prototype.pauseCode(codeId)`
    
* restore_code(arguments={ snapshot, functionMap })
    * this command will execute `CodeEngine.prototype.restoreCode(arguments)`

* migrate_code(arguments={ targetId, codeId })
    * this command will execute `CodeEngine.prototype.migrateCode(arguments)`

    
### Dispatcher.js

This script implements the `Dispatcher` class to be used by a ThingsJS application.

A `Dispatcher` object uses the Pubsub network to communicate with other `CodeEngine` objects running on different IoT nodes.
This object is used to send commands to and receive messages from different `CodeEngine` nodes running on the same Pubsub network. 

It exposes the following API:

* (constructor) `Dispatcher(config)`
    * `config`: configuration object containing initialization parameters (e.g. `pubsubUrl`)
    
* `Dispatcher.prototype.initialize(config)`
    * called by the constructor (no need to call it explicitly)
    * this function will initialize the pubsub object

* `Dispatcher.prototype.sendCommand(targetId, command, arguments)`
    * `targetId`: the ID of the target `CodeEngine` to send the command to (e.g. `engine-01`)
    * `command`: the command string (refer to [`CodeEngine` Pubsub API](#codeengine-pubsub-api))
    * `arguments`: the command arguments to send
    * this function is used to send a pubsub command to a `CodeEngine` node through the pubsub
    * the list of commands that can be sent is explained in [`CodeEngine` Pubsub API](#codeengine-pubsub-api)

* `Dispatcher.prototype.runCode(targetId, codePath, codeSource)`
    * `targetId`: the ID of the target `CodeEngine` to run the code on
    * `codePath`: string path of the code
    * (optional) `codeSource`: it can be either `"repository"` or `"target-filesystem"`, if omitted, code will be loaded from `localhost` filesystem
    * this function can be called to execute code located at `codePath` on a `CodeEngine` with ID=`targetId` 

* `Dispatcher.prototype.migrateCode(fromId, toId, codeId)`
    * `fromId`: the ID of the `CodeEngine` to move the code from
    * `toId`: the ID of the `CodeEngine` to move the code to
    * `codeId`: the ID of the `Code` to move
    * this function will send a command to `CodeEngine`[`fromId`] to pause execution of `Code`[`codeId`] and migrate the snapshot to `CodeEngine`[`toId`]


### Scope.js

This script implements the `Scope` class, which is injected into the instrumented version of the user code.
A ThingsJS developer should never have to use this object directly, and is only internally used by Code and the instrumented code itself.

API description will be provided in the future, when the API is stable.

    
## Usage Example


### Using CodeEngine

For this example, we will assume that the Pubsub service runs at IP `192.168.0.10`

On one device (e.g. raspberry-A), one can create the following script (filename: `original-worker.js`):
```
var CodeEngine = require('../../lib/engine/CodeEngine.js');

// config should be loaded via ConfigValidator, but here we're hard-coding just for testing
var config = { pubsubUrl: 'mqtt://192.168.0.10' };

var engine = new CodeEngine(config);

var codeId = engine.runCode('user-code.js');

setTimeout(function(){
	
	engine.pauseCode(codeId);
	
	engine.migrateCode({ targetId: "engine-worker01", codeId: codeId });
	
}, 3000);
```

On another device (e.g. raspberry-B), one can have the following script (filename: `neighbor-worker.js`):
```
var CodeEngine = require('../../lib/engine/CodeEngine.js');

var config = { pubsubUrl: 'mqtt://192.168.0.10', nodeId: 'worker01' };

var engine = new CodeEngine(config);
```

raspberry-B will be idle when you run the command:
```
raspberry-B$ node neighbor-worker.js
```


On raspberry-A, running the command:
```
raspberry-A$ node original-worker.js
```
will start running the user script. After 3000ms, it will pause the code and then transfer the code to raspberry-B


### Using Dispatcher

For this example, we will assume that the Pubsub service runs at IP `192.168.0.10`

On two different "worker" devices (e.g. node-A, node-B), one can create the following script (filename: `worker.js`):

**node-A >> worker.js**
```
var CodeEngine = require('../../lib/engine/CodeEngine.js');
var config = { pubsubUrl: 'mqtt://192.168.0.10', nodeId: 'worker01' };
var engine = new CodeEngine(config);
```

**node-B >> worker.js**
```
var CodeEngine = require('../../lib/engine/CodeEngine.js');
var config = { pubsubUrl: 'mqtt://192.168.0.10', nodeId: 'worker02' };
var engine = new CodeEngine(config);
```

Both node-A and node-B will be idle when you run the command on the respective devices:
```
~$ node worker.js
```


On a device that will act as the "dispatcher", one can create the following script (filename: `master.js`):

```
var Dispatcher = require('../../lib/engine/Dispatcher.js');

var config = { pubsubUrl: 'mqtt://192.168.0.10' };

var dispatcher = new Dispatcher(config);

dispatcher.$ready
.then(function(){

    dispatcher.runCode("engine-worker01", 'user-code.js')
    .then(function(codeId){
    
        // migrate after 3 seconds
        setTimeout(function(){
        
            dispatcher.migrateCode("engine-worker01", "engine-worker02", codeId);
            .then(function(result){
                // Do something after migration
            });
            		
        }, 3000);
        
    });
    
});

```

On the "dispatcher" device, running the command:
```
~$ node master.js
```
will start running the script. First it will send `user-code.js` to node-A to run it. After 3000ms, it will send a "migrate" command to node-A to stop executing the code and move the snapshot to node-B. Upon receiving this command, node-A will pause and send the snapshot to node-B, after which node-B will continue execution of the code.


## Limitations

Limitations described here will be dealt with as the project develops:

* `if` statements must be enclosed in curly brackets, so does `else`. (`Code` issue)