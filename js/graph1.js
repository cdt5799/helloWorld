var offset = 50;
var r; // graph 2
var x = 50; // graph x pos
var y = 10; // graph y pos
var w = $(window).width(); // graph width
var h = $(window).height()/4; // graph height

var xdata = [0,6,12,18,24,30,36,42,48,54,60];

//userctrl
var pressureArr = new Array();
var pressureVal = 0;
var pColor = '#f0bf60'; // yellow
var presRadialVal = 0;

var tempArr = new Array();
var tempVal = 3;
var tColor = '#ED5C5E'; // red
var tempSliderVal = 100;

updateVal();

$(window).resize(function(){
	w = $(window).width();
});

$(document).ready(function(){
	//ui choice
	$('input[name=choice]').on('click', function(e) {
		var target = e.currentTarget;
		var controller = $(target).data('controller');
		$('.controllers').hide();
		$('.controllers[data-controller='+controller+']').show();
		$('.graphs').hide();
		$('.graphs[data-controller='+controller+']').show();
		graphNum = controller;
	});

	$('.levels').on('click', function() {
		// $(this) is the object you clicked
		var val = $(this).val();
		switch($(this).data('controller')) {
			case 'temp' :
				tempVal = val;
				break;
			case 'pressure' :
				pressureVal = val;
				break;
		}
	});
	//graph
	r = Raphael('graph1', w, h+offset);
	r.setViewBox(0,0,w+50,h,false);

	draw(r, pressureArr, tempArr, pColor, tColor);

	setInterval(function(){
		draw(r, pressureArr, tempArr, pColor, tColor);
	
		// updates until 5 minutes
		if(pressureArr.length < xdata.length) 
		{
			updateVal();
		}

		}, 6000);
});

//updates values of arrays
function updateVal()
{
	
	//temp,humid,press,wind values change according to the current val of slider/radial
	if(currentTemperature <= 16){ tempVal = 1; }
	else if(currentTemperature > 16 && currentTemperature <= 32) { tempVal = 2; }
	else { tempVal = 3; }
	tempArr.push(tempVal);
	
	
	if(currentPressure == 0){ pressureVal = 1; }
	else if(currentPressure == 1) { pressureVal = 3; }
	pressureArr.push(pressureVal);
}
	
function draw(graph, y1, y2, c1, c2) {
	console.log( "Drawing" );
	graph.clear();
	var g = graph.linechart(x, y, 
                    w-offset, h, 
                    xdata, // x values
                    [y1, y2], // y values
                    {
                        axis : '0 0 1 1',
                        symbol: 'circle',
						axisystep: 3,
						axisxstep: xdata.length-1,
						colors: [c1, c2]
                    });

	//y-axis labels
	g.axis[1].text.items[0].attr({'text': ''});
	g.axis[1].text.items[1].attr({'text': 'LOW', 'x': '38px'});
	g.axis[1].text.items[2].attr({'text': 'MED', 'x': '36px'});
	g.axis[1].text.items[3].attr({'text': 'HIGH', 'x': '40px'});

	// horizontal grid lines
	for (var i = 0; i < g.axis[1].text.items.length; i++) {
		graph.path(['M', x+10, g.axis[1].text.items[i].attrs.y, 'H', w-10]).attr({
			stroke : '#5A5B69'
		}).toBack();
	}

	// vertical grid lines
	for (var i = 0; i < g.axis[0].text.items.length; i++) {
		graph.path(['M', g.axis[0].text.items[i].attrs.x, y, 'V', h + y-10]).attr({
			stroke : '#5A5B69'
		}).toBack();
	}

	//x-axis labels
	//mins:secs converter
	for (var i = 0; i < g.axis[0].text.items.length; i++) {
		var min = Math.floor(xdata[i] / 60);
		var sec = xdata[i] % 60;	
		if(sec == 0) { sec = "00"; }
		if(sec < 10 && sec != 0){ sec = "0" + sec; }
		var txt = min + ":" + sec;
		g.axis[0].text.items[i].attr({'text': txt});
	}
}