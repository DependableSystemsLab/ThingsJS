var Schedule = require('./Scheduler.js').Schedule;
var expect = require('chai').expect;
var should = require('chai').should();
var assert = require('assert');

describe('Schedule algorithm tests', function(){
	var self = this;

	describe('Basic tests', function(){

		it('Empty sets', function(){
			var deviceList = {};
			var componentList = {};
			var schedule = Schedule(deviceList, componentList, {});

			expect(schedule).to.equal(null);
		});

		function generalCases(){

			function general(devices, components){
				var devIds = Object.keys(devices);
				var compIds = Object.keys(components);

				it('General case ' + devIds.length + ' devices, ' + compIds.length + ' components', function(){
					var schedule = Schedule(devices, components);
					expect(schedule.mapping).to.contain.all.keys(devIds);
				});
			}

			var deviceList = {
				p0: { device_memory: 32942349 }
			};
			for(var i = 0; i < 100; i++){
				var componentList = {};
				for(var j = 0; j < i + 1; j++){
					componentList[j] = { heapUsed: 1 };
				}
				general(deviceList, componentList);
			}
		}
		generalCases();

		it('Close fit (devices have +10bytes more memory than components require)', function(){
			var deviceList = {
				p0: { device_memory: 100 },
				p1: { device_memory: 200 }
			};
			var componentList = {
				c1: { heapUsed: 90 },
				c2: { heapUsed: 190 }
			};
			var schedule = Schedule(deviceList, componentList, {});
			expect(schedule.mapping).to.exist;
			expect(schedule.mapping.p0).to.contain('c1');
			expect(schedule.mapping.p1).to.contain('c2');
		});

		it('Tight match (just enough memory per device)', function(){
			var deviceList = {
				p0: { device_memory: 100 },
				p1: { device_memor: 200 }
			};

			var componentList = {
				c1: { heapUsed: 100 },
				c2: { heapUsed: 200 }
			};
			var schedule = Schedule(deviceList, componentList, {});
			expect(schedule.mapping).to.exist;
			expect(schedule.mapping.p0).to.contain(['c1']);
			expect(schedule.mapping.p1).to.contain(['c2']);
		});

		it('Failure case (not enough memory on device)', function(){
			var deviceList = {
				p0: { device_memory: 100 }
			}

			var componentList = {
				c1: { heapUsed: 10000 }
			}
			var schedule = Schedule(deviceList, componentList, {});
			expect(schedule.mapping.p0).to.eql([]);
		});

		it('Advanced failure case', function(){
			var deviceList = {
				p0: { device_memory: 100 },
				p1: { device_memory: 200 },
				p2: { device_memory: 50 }
			}

			var componentList = {
				c1: { heapUsed: 10 },
				c2: { heapUsed: 190 },
				c3: { heapUsed: 90 },
				c4: { heapUsed: 100 }
			}

			var schedule = Schedule(deviceList, componentList, {});
			Object.keys(deviceList).forEach(function(deviceId){
				expect(schedule.mapping[deviceId]).to.eql([]);
			});
		});

		it('Real case', function(){
			var deviceList = 
			{
				"node_00":{"timestamp":1533071272092,"memory":{"rss":65863680,"heapTotal":42278912,"heapUsed":38585144,"external":36258685},"cpu":1.1,"device_memory":301497288},
				"node_01":{"timestamp":1533071271735,"memory":{"rss":62398464,"heapTotal":35987456,"heapUsed":32207280,"external":36225780},"cpu":0,"device_memory":23052288}
			}
			var componentList = 
			{
				"test.js*1":{"rss":61079552,"heapTotal":32743424,"heapUsed":28436734.4,"external":35726123.2},
				"test.js*3":{"rss":61105766.4,"heapTotal":31694848,"heapUsed":28678454.4,"external":35726513.2},
				"test.js*2":{"rss":61405593.6,"heapTotal":32219136,"heapUsed":28171822.4,"external":35725863.2},
				"test.js*4":{"rss":55379968,"heapTotal":31694848,"heapUsed":28006365.6,"external":35726086.8},
				"test.js*5":{"rss":56327372.8,"heapTotal":31694848,"heapUsed":28030102.4,"external":35726112.8},
				"test.js*6":{"rss":57156403.2,"heapTotal":32219136,"heapUsed":27924332,"external":35726372.8},
				"test.js*8":{"rss":59362918.4,"heapTotal":32219136,"heapUsed":27990732,"external":35726398.8},
				"test.js*7":{"rss":59977728,"heapTotal":31694848,"heapUsed":27712460,"external":35726398.8},
				"test.js*10":{"rss":51383500.8,"heapTotal":30121984,"heapUsed":26371667.2,"external":35718056},
				"test.js*9":{"rss":50692915.2,"heapTotal":29597696,"heapUsed":26118364.8,"external":35718056},
				"test.js*14":{"heapUsed":10},"test.js*15":{"heapUsed":10},"test.js*16":{"heapUsed":10}
			}

			var schedule = Schedule(deviceList, componentList, {});
			console.log(JSON.stringify(schedule));
		});
		

	});

});
