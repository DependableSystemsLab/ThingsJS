var start = Date.now();
process.send({ tag: "mid" });
setTimeout(function(){ process.send({ tag: "end", elapsed: Date.now() - start }) }, 10000);