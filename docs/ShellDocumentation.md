### Shell Commands

#### Application specific commands:
i```run_app <scheduler id> <local application json path>```
> Errors returned: timeout, invalid config
* Schedule an application specified in an application json file
* Scheduler must be running with id passed in

```pause_app <scheduler id> <application token>```
> Errors returned: timeout
* Pause an application specified by its application token

```resume_app <scheduler id> <application token>```
> Errors returned: timeout
* Resume a paused application specified by its application token

```kill_app <scheduler id> <application token>```
> Errors returned: timeout
* Kill an application specified by its application token

#### Global filesystem specific commands:

```pwd```
> Errors returned: cannot connect to the GFS
* Print the current working directory

```rm <global path>```
> Errors returned: Cannot connect to the GFS, path does not exist
* Remove a file or directory 

```mkdir <global path>```
> Errors returned: Cannot connect to the GFS, path does not exist, path already exists
* Make a new directory 

```touch <global path> <local file path>```
> Errors returned: Cannot connect to the GFS, problem reading file, path already exists
* Create a new file that contains contents from a local file into the global filesystem

```cat <global path>```
> Errors returned: Cannot connect to the GFS, not a file
* View the contents of a file 

```ls```
> Errors returned: Cannot connect to the GFS
* List the files and folders in the current directory

```cd <relative global path>```
> Errors returned: Cannot connect to the GFS, not a directory
* Change the current working directory 

#### Program and device discovery commands:

```devices```
* Print out a list of current devices on the network

```resource <engine id>```
> Errors returned: Engine does not exist
* Print out the most recent resource report of a code engine

```programs```
* Print out a list of running programs on the network

```preresource <code name> <instance id>```
> Errors returned: instance does not exist
* Print out the most recent resource report of a running program

#### Dispatcher specific commands:

```run <engine id> <local file path>```
* Run a local code snippet on a code engine

```kill <code name> <instance id>```
* Kill a running code instance 

```pause <engine id> <code name> <instance id>```
* Pause a running code instance on an engine

```migrate <from id> <to id> <code name> <instance id>```
* Migrate a code instance between two engines






