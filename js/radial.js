$("#windDial")
	.knob({
		min : 0, 
		max : 3, 
		angleOffset : 60, 
		angleArc : 360, 
		stopper : true, 
		readOnly : false, 
		cursor : 105,  
		lineCap : 'butt', 
		thickness : '0.12', 
		width : 400,
		height: 400,
		displayInput : false, 
		fgColor : '#b49bff', 
		inputColor : '#b49bff', 
		font : 'Arial', 
		fontWeight : 'normal', 
		bgColor : '#d7d3f6',
		release : 
			function (v) {
				if( v == 3 || v == 0) {
					$("#windDial")
						.val(0)
						.trigger('change');
						v = 0;
						$('#windPointer').rotate({ 
							angle:60
						});
				}
				else if (v == 2){
					$('#windPointer').rotate({
						angle: -60,
						center: ["50%","80%"]
					});
				}
				else if (v ==1) {
					$('#windPointer').rotate({
						angle: 180,
						center: ["50%","80%"]
					});
				}
				console.log( "Wind set to: " + v );
				currentWind = v;
			}
	}
);
$("#pressureDial")
	.knob({
		min : 0, 
		max : 2, 
		angleOffset : 90, 
		angleArc : 360, 
		stopper : true, 
		readOnly : false, 
		cursor : 157.5,  
		lineCap : 'butt', 
		thickness : '0.12', 
		width : 400,
		height: 400,
		displayInput : false, 
		fgColor : '#f0bf60', 
                inputColor : '#f0bf60',
		font : 'Arial', 
		fontWeight : 'normal', 
                bgColor : '#f4e8c9',
		release : 
			function (v) {
				if( v == 2 || v==0) {
					$("#pressureDial")
						.val(0)
						.trigger('change');
						v = 0;
						$('#pressurePointer').rotate({ 
							angle:90
						});
				}
				else if (v == 1){
					$('#pressurePointer').rotate({
						angle: -90,
						center: ["50%","80%"]
					});
				}
				console.log( "Pressure set to: " + v );
				currentPressure = v;
			}
	}
);

$('.dial').trigger('configure', {
    'change': function (v) {
    }
});

