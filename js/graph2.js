var offset = 50;
var r; // graph 1
var x = 50; // graph x pos
var y = 10; // graph y pos
var w = $(window).width(); // graph width
var h = $(window).height()/4; // graph height

var xdata = [0,6,12,18,24,30,36,42,48,54,60];

//userctrl
var humidArr = new Array();
var humidVal = 0;
var hColor = '#89d5da'; // blue
var humSliderVal = 0;

var windArr = new Array();
var windVal = 3;
var wColor = '#b49bff'; // purple
var windRadialVal = 0;

updateVal();

$(window).resize(function(){
	w = $(window).width();
});

$(document).ready(function(){
	

	$('.levels').on('click', function() {
		// $(this) is the object you clicked
		var val = $(this).val();
		switch($(this).data('controller')) {
			case 'humid' :
				humidVal = val;
				break;
			case 'wind' :
				windVal = val;
				break;
		}
	});
	//graph
	r = Raphael('graph2', w, h+offset);
	r.setViewBox(0,0,w+50,h,false);

	draw(r, humidArr, windArr, hColor, wColor);

	setInterval(function(){
	console.log(humidArr);
		draw(r, humidArr, windArr, hColor, wColor);
	
		// updates until 5 minutes
		if(humidArr.length < xdata.length) 
		{
			updateVal();
		}

		}, 6000);
});

//updates values of arrays
function updateVal()
{
	if(currentWind == 0){windVal =1;}
	else if(currentWind == 1){windVal = 2;}
	else{windVal = 3;}
	windArr.push(windVal)
	
	//temp,humid,press,wind values change according to the current val of slider/radial
	if(currentHumidity <= 33){ humidVal = 1; }
	else if(currentHumidity > 33 && currentHumidity <= 67) { humidVal = 2; }
	else{ humidVal = 3; }
	humidArr.push(humidVal);
}
	
function draw(graph, y1, y2, c1, c2) {
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