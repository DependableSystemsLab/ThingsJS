var dataset = [];

window.onload = function(){
	var fields = {};

	var ctx = document.getElementById('chart');
	setInterval(function(){
		getPoints();

		function makePoints(obj, field){
			var keys = Object.keys(obj);
			var xVal, yVal

			return { x: obj['ts'], y: obj[field] };
		}

		dataset.forEach(function(data){
			var keys = Object.keys(data);
			var fieldIndex = keys[0] == 'ts' ? 1 : 0;
			var field = Object.keys(data)[fieldIndex];

			var pt = makePoints(data, field);
			if(field in fields){
				fields[field].push(pt);
			}
			else{
				fields[field] = [pt];
			}
		});

		for(field in fields){
			if(!document.getElementById(field)){
				var canvas = document.createElement('canvas');
				canvas.id = field;
				canvas.style.width = '200px';
				canvas.style.height = '300px';
				document.body.appendChild(canvas);
			}
			var data = { datasets: [{ label: field, data: fields[field] }]};
			var element = document.getElementById(field);
			var stackedLine = new Chart(element, {
			    type: 'scatter',
			    data: data,
			    options: {
			        scales: {
			            yAxes: [{
			                stacked: true
			            }]
			        }
			    }
			});
		}


	}, 5000);

}

function getPoints(){
	var req = new XMLHttpRequest();
<<<<<<< HEAD
	req.open('GET', 'http://localhost:3000/points');
=======
	req.open('GET', 'http://localhost:5000/points');
>>>>>>> dev
	req.onreadystatechange = function(){
		if(req.readyState === 4 && req.status === 200){
			dataset = JSON.parse(req.responseText);
		}
	}
	req.send();
<<<<<<< HEAD
}
=======
}
>>>>>>> dev
