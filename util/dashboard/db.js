var mongo = require('mongodb');

function DashboardDatabase(host){
	this.host = host;
	this.db = undefined;
	
	this.initialize();
};
DashboardDatabase.prototype.initialize = function(){
	var self = this;
	mongo.MongoClient.connect(self.host, function(err, db){
		if (err){
			throw err;
		}
		console.log("Connected to MongoDB at "+self.host);
		self.db = db;
		
	});
};
DashboardDatabase.prototype.onMessage = function(topic, message){
	var self = this;
	if (topic === "smartjs-engine-registry"){
		self.updateEngine(message);
	}
	else {
		self.addMessage(topic, message);
	}
};
DashboardDatabase.prototype.addMessage = function(topic, message){
	var collection = this.db.collection(topic);
	message.dtstamp = Date.now();
	return collection.insertOne(message);
};
DashboardDatabase.prototype.getMessages = function(topic, backtrack){
	var collection = this.db.collection(topic);
	var filter = {};
	if (backtrack){
		filter.dtstamp = { $gte: Date.now() - (backtrack * 1000) } // backtrack is in seconds
	}
	return collection.find(filter).toArray();
};
//DashboardDatabase.prototype.addEngine = function(engine){
//	var self = this;
//	return new Promise(function(resolve, reject){
//		var collection = self.db.collection("smartjs-engine-registry");
//		engine._id = engine.id;
//		collection.insertOne(engine, function(err, result){
//			if (err){
//				reject(err);
//			}
//			else {
////				console.log("[DB] : Engine "+engine.id+" successfully added!");
//				resolve(result);
//			}
//		});	
//	});
//};
DashboardDatabase.prototype.updateEngine = function(engine){
	engine.dtstamp = Date.now();
	return this.db.collection("smartjs-engine-registry").updateOne({ _id: engine.id },
								{ $set: engine },
								{ upsert: true });
};
DashboardDatabase.prototype.deleteEngine = function(engine){
	return this.db.collection("smartjs-engine-registry").deleteOne({ _id: engine.id });
};
DashboardDatabase.prototype.saveCode = function(name, code){
	var self = this;
	var data = { name: name, code: code, dtstamp: Date.now() };
	return new Promise(function(resolve, reject){
		self.db.collection("smartjs-raw-code").updateOne({ _id: name },
				{ $set: data }, { upsert: true }).then(function(result){
					resolve(data);
				}, function(error){
					reject(error);
				})
	});
};
DashboardDatabase.prototype.getCode = function(name){
	return this.db.collection("smartjs-raw-code").findOne({ _id: name });
};
DashboardDatabase.prototype.getAllCode = function(){
	return this.db.collection("smartjs-raw-code").find().toArray();
};

module.exports = DashboardDatabase;