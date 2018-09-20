# BENCHMARK Apps 
This benchmark app is originated/referenced from [dreamlab RIOT benchmark]( https://github.com/dream-lab/riot-bench) which intend to test ThingsJs different function as IoT middleware project like scheduling job.

# Detail 
This benchmark app consists of four phases: ETL(Extraction, Transform and Load dataflow), STATS(Statistical Summarization dataflow), TRAIN(Model Training dataflow) and PRED(Predictive Analytics dataflow). We are using taxidata as example. In each phase, we will generate ETLSTATS_date.csv with the heap used, cpu used information for monitoring the effect. 


ETL: 
First parse the data from csv to key value data type and publish them line by line and then hash the data by different key value and join the data together. 
 ![FCAST](https://github.com/anshuiisc/FIG/blob/master/ETL-1.png)


STAT: 
Calculated the summary statistics for the data and fitted a simple linear regression model and then plotted the fitted model 
![FCAST](https://github.com/anshuiisc/FIG/blob/master/stats-1.png)


TRAIN: 
Use data to train the regression tree and multi-variate model and save it on global file system. For modeling, we currently use ‘c4.5’ package for J48decisiontree model and ‘ml-regression-multivariate-linear’ package for training. 
 ![FCAST](https://github.com/anshuiisc/FIG/blob/master/Train-1.png)

PRED:
Fetch the training model saved from file system in the TRAIN phase and predict the taxi fee by provided data and publish residual errors to mqtt. 
![FCAST](https://github.com/anshuiisc/FIG/blob/master/pred-1.png)

For message and data communication between components, we will use things-js pubsub channel. For measurements, we will generate csv for device stats like memory used, cpu etc and save in file system 


# Application to scheduler 
Instead of running components in each phase in order one by one, we plan to use our scheduler to schedule the running sequence of components on different engine worker according to its required memory, CPU, bandwidth, etc. so as to make the whole system more efficient. 

# Guide for user
Currently user has to set up the dependency for the benchmark on their worker folder by creating a empty package.json with ```vi package.json``` and ```npm link things-js``` to load all necessary node-modules. Moreover, since the global file system cannot save huge data. User had to put the needed data inside worker folder for running. which is TAXI_properties.json, TAXI_sample_data_senml.csv, taxi-metadata-fulldataset.txt and taxi-schema_with_annotation.csv, all of them are available in samples/IoTBench.
For the data and model generated during running process, we will save it to global file system in RIOT/ETL, RIOT/STAT, RIOT/TRAIN,RIOT/PRED.


All figures referenced from [dreamlab RIOT benchmark]( https://github.com/dream-lab/riot-bench)


