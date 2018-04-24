function Planner(jobs, workers, constraints){
	this.jobs = jobs || {};
	this.workers = workers || {};
	this.constraints = constraints || {};
}
Planner.prototype.createSchedule = function(algorithm){
	algorithm = algorithm || 'naive';
	return Planner.Algorithm[algorithm](this);
}
Planner.Algorithm = {
	naive: function(self){
		var sched = new Schedule();
		var busy = [];
		var wlen = Object.keys(self.workers).length;
		Object.values(self.jobs).forEach(function(job){
			if (busy.length === wlen) busy = [];
			for (var id in self.workers){
				if (busy.indexOf(self.workers[id]) < 0){
					busy.push(self.workers[id]);
					sched.addTask(id, 'run_code', job.name);
					break;
				}
			}
		})
		return sched;
	}
}

function Schedule(){
	this.done = [];
	this.pending = [];
}
Schedule.prototype.addTask = function(worker, command, job){
	this.pending.push({ 
		worker: worker,
		command: command,
		job: job
	})
}


Schedule.Planner = Planner;


module.exports = Schedule;