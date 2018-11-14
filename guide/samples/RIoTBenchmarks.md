# BENCHMARK Apps 
This benchmark app is originated/referenced from [dreamlab RIOT benchmark]( https://github.com/dream-lab/riot-bench) which intend to test ThingsJs different function as IoT middleware project like scheduling job.

# Detail 
This benchmark app consists of four phases: ETL(Extraction, Transform and Load dataflow), STATS(Statistical Summarization dataflow), TRAIN(Model Training dataflow) and PRED(Predictive Analytics dataflow). We are using taxidata as example. In each phase, we will generate ETLSTATS_date.csv with the heap used, cpu used information for monitoring the effect. 


ETL: 
First parse the data from csv to key value data type and publish them line by line and then hash the data by different key value and join the data together. 
 ![FCAST](https://raw.githubusercontent.com/anshuiisc/FIG/master/ETL-1.png)


STAT: 
Calculated the summary statistics for the data and fitted a simple linear regression model and then plotted the fitted model. For plotting, user had to put the graph folder in workers space, open the plot.html inside
the folder will generate the plot dynamically. 

![FCAST](https://raw.githubusercontent.com/anshuiisc/FIG/master/stats-1.png)



TRAIN: 
Use data to train the regression tree and multi-variate model and save it on global file system. For modeling, we currently use ‘c4.5’ package for J48decisiontree model and ‘ml-regression-multivariate-linear’ package for training. 
 ![FCAST](https://raw.githubusercontent.com/anshuiisc/FIG/master/Train-1.png)

PRED:
Fetch the training model saved from file system in the TRAIN phase and predict the taxi fee by provided data and publish residual errors to mqtt. 
![FCAST](https://raw.githubusercontent.com/anshuiisc/FIG/master/pred-1.png)

For message and data communication between components, we will use things-js pubsub channel. For measurements, we will generate csv for device stats like memory used, cpu etc and save in file system 


# Application to scheduler 
Instead of running components in each phase in order one by one, we plan to use our scheduler to schedule the running sequence of components on different engine workers according to its required memory, CPU, bandwidth, etc. so as to make the whole system more efficient. 

# Guide for user
Currently user has to set up the dependency for the benchmark on their worker folder by creating a empty package.json with ```vi package.json``` and ```npm link things-js``` to load all necessary node-modules. 
All necessary data and properties files are stored in global file systems, which also act as a communication
channel for writing and reading models during the training and predicting phase. User can also use GFS api to change the taxi data for their own training. There is an automation script benchmark.js in samples folder which can automatically trigger scheduling the components by command ```node benchamrk.js ETL/STAT/TRAIN/PRED```.

All figures referenced from [dreamlab RIOT benchmark]( https://github.com/dream-lab/riot-bench)
