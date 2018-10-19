# Developer Documentation for ThingsJS

ThingsJS contains of five main capabilities.

* Set of workers
* Platform-independent live Migration
* Publish-Subscribe interface, which acts as a communication channel between all the worker nodes.
* A scheduler service which schedules and manages the migration of processes between the workers.
* A global file system which is accessible by all the workers


The above five features have been have been implemented in the lib/core folder.

There are six main files which implement the objects of ThingsJS

##Code.js
 The Code.js file is used to instrument the code when we need to migrate the processes from one worker node to another. It contains the functions which snapshots the processes so that we can continue running the process from the point when we migrated it.

##CodeEngine.js
 A CodeEngine instance connects to the Publish/Subscribe service at the provided URL. It  provides the functions to run, restore, migrate and kill the code.

##Dispatcher.js
 It consists of two components Engine and Program. Engine provides a client-side interface for CodeEngine. Program provides a client-side interface for CodeEngine. Similar object is defined in the client-side library "things.js"CodeEngine instances in the network (i.e. connected to the same Pub/Sub service). It provides features to run, move, spawn, pause the codes.

##Pubsub.js
 It contains the Pubsub client and server code. It contains the code for the workers to subscribe, unsubscribe and publish the messages.

##Scheduler.js
 A scheduler monitors CodeEngine and Program instances on the network, triggering live-migration of a Process if needed. It is the subclass of dispatcher. It follows a greedy algorithm to schedule the processes on the workers.

##GFS.js
The GFS contains the code for reading, writing, appending and other operations that can be performed by the worker nodes on the GFS by the worker nodes.


For further information regarding the functions please refer the documentation of the individual ThingsJS objects.
