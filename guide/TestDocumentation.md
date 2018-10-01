### Test Documentation

####  ThingsJS
Test file(s): ```test/require-test.js```
* Require test: ```require('things-js')```
	* No error should be thrown
#### Code
Test file: ```test/Code-test.js```
* Output equivalency: ```Code.run```
	* Tests the output equivalency of instrumented ```things-js``` code versus raw code

#### Code Engine
Test file: ```test/CodeEngine-test.js```
* Initialization: ``` new CodeEngine()```:
	* Code Engine instance starts up and emits a ```'ready'``` signal
* ID assignment: ```CodeEngine.id```:
	* A unique ID is assigned to an initialized ```Code Engine``` object
* Pubsub assignment: ```CodeEngine.pubsub```
	* A ```pubsub``` object is assigned to an initialized ```Code Engine```
* Runs code: ```CodeEngine.run_code```
	* Runs a new code instance on the engine when the proper arguments are given
* Dies gracefully: ```CodeEngine.kill```
	* ```Code Engine``` exits and throws no errors
#### Pubsub
Test file: ```test/Pubsub-test.js```
* Initialization: ```new Pubsub()```
	* Pubsub instance starts up and emits a ```ready``` signal
* ID assignment: ```Pubsub.id```
	* A unique ID is assigned to an initialized ```Pubsub``` object 
* Subscription works: ```Pubsub.subscribe```
	* Handles single and multiple topic subscriptions
	* Receives messages for a topic it is subscribed to
	* Receives message in order
* Unsubscribe works: ```Pubsub.unsubscribe```
	* No longer receives messages for the topic it has unsubscribed from
* Publishes to subscribed node: ```Pubsub.publish```
	* Is able to publish data for a given topic to all node listening to the topic
* Dies gracefully on kill call: ```Pubsub.kill```
	* ```Pubsub``` exits and throws no errors
	
#### Dispatcher
Test file: ```test/Dispatcher-test.js```
* Initialization: ```new Dispatcher()```
	* ```Dispatcher``` instance starts up and emits a ```ready``` signal
* ID assignment: ```Dispatcher.id```
	* Dispatcher is assigned a unique ID
* Pubsub assignment: ```Dispatcher.pubsub```
	* Dispatcher is assigned a ```pubsub``` object
* Correct ```Code Engine``` view: ```Dispatcher.Engines```
	* Dispatcher detects the correct number of ```code engine``` instances in the network
* Correct ```Code Engine``` statuses: ```Dispatcher.Engines```
	* Dispatcher detects the correct status of ```idle``` ```code engine``` instances
* Run code on a ```Code Engine```: ```Dispatcher.runCode, Dispatcher.engines, Dispatcher.programs```
	* ```Code Engine``` returns a reply once code begins to execute
	* Dispatcher detects engines running code to have status ```busy```
	* Dispatcher detects new ```program``` running
	* Dispatcher receives any ```console output``` by the new code instance
* Migration between ```Code Engines```: ```Dispatcher.moveCode```, ```Dispatcher.engines```
	* ```Code Engine``` returns a reply once code migrates
	* ```Code Engine``` that migrates its code instance changes status to ```idle``` 
	* ```Code Engine``` that executes migrated snapshot changes status to ```busy```
	* Migrated code executes from where it left off
* Process control: ```Dispatcher.pauseCode, Dispatcher.resumeCode```
	* A ```Code Engine``` can receive consecutive ```pause``` and ```resume``` commands
	* Replies are received for each ```pause``` or ```resume``` command sent

#### Scheduler
Test file: ```test/Scheduler-test.js```
* First fit scheduling algorithm: ```Scheduler.algorithms['first_fit']```
	* Passes the base case scenario of 0 tasks and 0 devices
	* Throws an error when not enough memory exists for the given tasks and devices
	* Returns a correct mapping when enough memory exists for the given tasks and devices
* Computing actions to go from one mapping to another: ```Scheduler.computeActions```
	* Computes the correct ```run``` commands to initialize new code instances
	* Computes the correct ``kill`` commands to stop existing code instances
	* Computes the correct ``migrate`` command to move code instances
* Initialization: ```new Scheduler()```:
	* ```Scheduler``` instance starts up and emits a ```ready``` signal
* ID assignment: ```Scheduler.id```:
	* Scheduler is assigned a unique ID
* Scheduler logs itself booting as its first event: ```Scheduler.history```
	* The past history is non-empty
	* The first event log is the Scheduler booting
* Ignores rogue processes: ```Scheduler._assess```:
	* Does not return an error when assessing the current state of the network 
	* Ignores any processes without ```code engine``` owners
* Correct network view: ```Scheduler._assess```:
	* Detects when a ```Code Engine``` has died
	* Does not fail when nodes leave the network
* Handles an application request with no available devices: ```Scheduler.behaviours['run_application']```
	* Request times out
* Able to schedule an empty application (no components): ```Scheduler.behaviours['run_application']```
	* Sends back a reply over ```pubsub``` indicating success
* Able to schedule an application with components on a running device: ```Scheduler.behaviours['run_application']```
	* Sends back a reply over ```pubsub``` indicating successs
* Utilizes available ```Code Engines``` that join network by migrating code instances: ```Scheduler._assess```

#### Filesystem API
Test file: ```test/Filesystem-REST-test.js```
* Writes a new file: ```gfs.writeFile```
	* Execution causes no error
* Read an existing file: ```gfs.readFile```
	* File name and contents match the file to be expected
* Read a non-existent file: ```gfs.ReadFile```
	* Error is thrown
* Write an existing file: ```gfs.writeFile```
	* Content is overwritten 
* Append to a new file:  ```gfs.appendFile```
	* New file is created with the append content
* Append to an existing file: ```gfs.appendFile```
	* The existing content is not overwritten but appended to for as long as ```appendFile()``` is called
* Delete a non-existent file: ```gfs.deleteFile```
	* An error is thrown
* Delete an existing file: ```gfs.deleteFile```
	* The file no longer exists and cannot be read
	
#### Filesystem REST API
Test file: ```test/Filesystem-test.js```
* ```GET requests```:
	* Get the ```root``` directory
	* Get a file from the ```root``` directory
	* Get a folder from the ```root``` directory
	* Get a file from a subdirectory
* ```POST requests:```:
	* Create a file in the ```root``` directory
	* Create a folder in the ```root``` directory
	* Create a file in a subdirectory
* ```DELETE requests:```:
	* Delete a file from the ```root``` directory
	* Delete a non-empty folder