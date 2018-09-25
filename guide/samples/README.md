# Samples

#### Factorial

A basic factorial program written using an asynchronous loop to yield control to Pub/Sub listeners. This component is mainly used for doing health checks on the system.


#### Video Streamer

**Depends on:** `stream-buffers`, `fluent-ffmpeg`

This Component reads from a video source at `/data/sample.mp4` and then publishes the video stream to `things-videostream/raw`.


#### Motion Detector

**Depends on:** `jimp`

This Component subscribes to the video stream at `things-videostream/raw` and performs image differencing on subsequent frames. It publishes the diff-images as a stream to `things-videostream/motion`. If the image difference is larger than a specified threshold, it will publish a message to `things-videostream/alarm`.