/* Basic motion detector program that consumes the video stream coming from video_streamer.js and detects motion.
 * The algorithm is very simple; it keeps an array of images and uses the jimp library
 * to get the image difference. It publishes the difference to a Pub/sub channel (topic)
 * It compares 3 frames, computing 2 deltas. If both deltas are above the threshold, meaning there was significant
 * change in the frames for 3 consecutive fraems, it will publish an alarm message.
 * 
 * npm dependencies:
 *     - jimp
 * 
 */
/*things.meta
inputs:
  things-videostream/raw: image/png
outputs:
  things-videostream/motion: image/png
  things-videostream/alarm: application/json
*/
var fs = require('fs');
var jimp = require('jimp');
var things = require('things-js');

/* configurable variables */
var pubsub_url = 'mqtt://localhost';
var source_channel = 'things-videostream/raw';		// Video channel to process
var monitor_channel = 'things-videostream/motion';	// channel to publish image differences
var alarm_channel = 'things-videostream/alarm';
var threshold = 0.10;
/* end of configurable variables */

var pubsub = new things.Pubsub(pubsub_url);

function formatTime(ms){
	return ('00'+Math.floor((ms/1000) / 60).toString()).slice(-2)+":"+('00'+(Math.floor(ms/1000) % 60).toString()).slice(-2)+"."+('000'+(ms%1000)).slice(-3)
}

var frames = [];

function detectMotion(bufs){
	if (bufs.length > 3){
		var frame1 = jimp.read(Buffer.from(bufs[0], 'base64')); // jimp.read returns a promise
		var frame2 = jimp.read(Buffer.from(bufs[1], 'base64'));
		var frame3 = jimp.read(Buffer.from(bufs[2], 'base64'));
		
		function sendDiff(vals){
			var diff12 = jimp.diff(vals[0], vals[1]);
			var diff23 = jimp.diff(vals[1], vals[2]);
			
				diff23.image.getBuffer(jimp.MIME_PNG, function(err, buf){
					if (!err){
						pubsub.publish(monitor_channel, buf, true);
					}
				});
				
				if (diff12.percent > threshold && diff23.percent > threshold){
					console.log((new Date().toISOString())+" Motion Detected !!!");
					pubsub.publish(alarm_channel, true);
				}
				else {
					pubsub.publish(alarm_channel, false);
				}
		}
		
		Promise.all([frame1, frame2, frame3]).then(sendDiff); // run sendDiff when all frames are ready
	}
}

function getFrame(data){
	if (frames.length > 3){
		frames.shift();
	}
	frames.push(data.toString('base64'));
}

pubsub.on('ready', function(){
    console.log("Pubsub connected");
    pubsub.subscribe(source_channel, getFrame);
});

setInterval(function(){
	detectMotion(frames);
}, 500);