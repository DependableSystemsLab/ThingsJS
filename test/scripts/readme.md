This directory contains scripts used to measure the performance of ThingsJS framework.

* `full-cycle.js` - Used to test the migration of a single program, starting from instrumentation, execution, snapshot, and restoration.

E.g.
```
~$ node full-cycle.js factorial.js
```
The above will instrument factorial.js, execute it, then take a snapshot after 3 seconds. Then the snapshot will be restored and executed for another 3 seconds.


* `instrument.js` - Measures time taken to instrument the input JavaScript code and the size of the instrumented code.

* `snapshot.js` - Measures time taken to serialize the program state into a JSON snapshot and the size of the snapshot.

* `restoration.js` - Measures time taken to restore (generate code) program from a snapshot and the size of the restored code.

* `execution.js` - Measures memory and CPU usage, as well as the time taken to run the program until completion.






* `instrumentation-time.js` - Measures time taken to instrument the input JavaScript code.

E.g.
```
~$ node instrumentation-time.js 200 test1
```
The above will measure instrumentation time for each benchmark 200 times, then produce a CSV file `instrumentation-time.test1.csv in the `result` directory.


* `snapshot-time.js` - Measures time taken to serialize the program state into a JSON snapshot. Since the snapshot command is received asynchronously through Pubsub or IPC, we cannot normally assume that the snapshot is taken at the same point in the program. To establish determinism, we use as input crafted versions of the program, which invokes the snapshot function at a pre-defined point in the program.

E.g.
```
~$ node snapshot-time.js 200 test1
```




* `restoration-time.js` - Measures time taken to restore (generate code) program from a snapshot.

E.g.
```
~$ node restoration-time.js 200 test1
```


* `execution-time.js` - Measures execution time for raw code, instrumented code, and restored code. Since a restored program starts from the second half of the program (e.g, if we're measuring a for loop from i=0 to i=100, restored program would start from i=50), we measure time taken to complete the second half of the program for fair comparison between the three versions of a program. This script will take a long time to complete, as it needs to actually run the programs from start to finish.

E.g.
```
~$ node execution-time.js 200 test1
```


* `resource-usage.js` - Measures memory and CPU usage for raw code, instrumented code, and restored code. For the same reason as above, we consider only the second half of the program for fair comparison.

E.g.
```
~$ node resource-usage.js 200 test1
```


* `multi-hop.js` - Measures resource usage of a program over multiple migrations across 3 devices. This script requires multiple ThingsJS workers running, and will run for 1 hour. The program will be migrated every 1 minute. One thing to note is that each process will be using slightly more resource than it normally would, as the resource usage is collected by the process itself using `process.memoryUsage()` and communicated to this script via Pubsub.