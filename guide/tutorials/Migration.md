# Live-migrating a JavaScript process

ThingsJS can be used to migrate a running Process from one Device to another in a stateful manner. For instance, a variable will retain its most recent value when it is resumed on a new Device instead of its initial value. In this tutorial, we will be performing live-migration of a simple Program - `factorial.js` - from one Worker to another.


## Setup/Requirement

* At least one machine, but preferably two machines to really observe the migration
* Code for `factorial.js`


## Walk-through

