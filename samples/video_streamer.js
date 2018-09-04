/* Basic video streaming program that reads a video file and publishes individual frames as base64 string (png) to a Pub/sub channel (topic).
 * 
 * NOTE: This component has external dependencies:
 *     - ffmpeg on linux machines
 *     - libav-tools on raspberry pi
 * 
 * npm dependencies:
 *     - stream-buffers
 *     - fluent-ffmpeg
 * 
 * - Assumes the existence of a video file at "./data/sample.mp4"
 *   To use another file, replace the variable "source"
 * 
 */
/*things.meta
outputs:
  things-videostream/raw: image/png
*/
var fs = require('fs');
var sb = require('stream-buffers');
var ffmpeg = require('fluent-ffmpeg');
var things = require('things-js');

/* configurable variables */
var source = './data/sample.mp4';
var pubsub_url = 'mqtt://localhost';	//Change the URL to use a specific Pub/sub service.
var channel = 'things-videostream/raw';	//Change this topic to publish to another channel
var fps = 5;
/* end of configurable variables */

var pubsub = new things.Pubsub(pubsub_url);
//ffmpeg.setFfmpegPath('/usr/bin/avconv');		//Uncomment this line to run on raspberry pi
//ffmpeg.setFfprobePath('/usr/bin/avprobe');	//Uncomment this line to run on raspberry pi

function formatTime(ms){
	return ('00'+Math.floor((ms/1000) / 60).toString()).slice(-2)+":"+('00'+(Math.floor(ms/1000) % 60).toString()).slice(-2)+"."+('000'+(ms%1000)).slice(-3)
}

function captureFrame(time_ms){
	var timestamp = formatTime(time_ms);
	console.log('seeking - '+timestamp);
	return new Promise(function(resolve, reject){
		
		var outstream = new sb.WritableStreamBuffer({ initialSize: (160*1024), incrementAmount: (16*1024) });
			outstream.on('finish', function(){
				resolve(outstream.getContents());
			})
		
		var cmd = ffmpeg(source)
					.seekInput(time_ms/1000)
					.size('320x240')
					.outputOptions(['-vframes 1', '-f image2pipe', '-vcodec png'])
					.output(outstream)
					.noAudio()
					.on('start', function(rawcmd){
						//console.log(rawcmd);
					})
					.on('end', function(){
						console.log("Processing done "+time_ms);
					})
					.run();
	})
}

function streamVideo(duration, start, fps, callback){
	var interval = fps ? Math.round(1000/fps) : 500;
	var counter = 0;
	var offset = (start || 0) * 1000;
	
	function capture(){
		captureFrame(counter+offset)
			.then(function(frame){
				pubsub.publish(channel, frame, true);
			})
		counter += interval;
		
		setTimeout(capture, interval);
		
		if (counter > duration*1000){
			counter = 0; // loop again (start streaming from the beginning);
		}
	}
	capture();
}

pubsub.on('ready', function(){
    console.log("Pubsub connected");
    streamVideo(300, 0, fps);
});