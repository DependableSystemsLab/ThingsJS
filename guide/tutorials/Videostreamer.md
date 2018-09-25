# Building your first First Application

##Experimental setup

* This tutorial aims to build a surveillance system with three (Atleast) different devices.
The different samples being used here have been explained in the Samples section.
We use the Video streamer and the Motion detector in these applications.

* We use the Video streamer to stream live video using the FFmpeg module. We used a video file to capture
individual frames and run over the Pub Sub channel. The cloud server was used to run this application.

* Since the surveillance is bound because of the hardware component we use the motion detector.js file which
computes the difference between the array of images. We migrate the motiondetector.js file over different devices
as the motiondetector code is not bound to one system.

###Step 1: Experiment setup ThingsJS

* Choose devices > 3, for the purpose of this tutorial we chose 3 devices, Raspberry Pi 0,3 and the
Cloud server.
* Install ThingsJS on the three devices and get the server or the Things migrate manager running.
Start the worker nodes, Rpi 0 and 3 in this case.

###Step 2: Migrate

* Following the CLI instructions or the Dashboard instructions try migratind the file from on device to another
and enjoy as this happens at the click of a button.

* Try running some other basic codes on the worker nodes along with the motion detector. The scheduler will automatically schedule the processes according to the memory available in the devices.
