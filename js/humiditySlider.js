	var dataset = [[27.763, 414.6, 58.438], [81.763, 365.882, 107.155], [136.763, 318.787, 154.25], [190.763, 279.851, 193.187],
	       [244.763, 236.006, 237.031], [297.762, 188.101, 284.937], [350.762, 154.006, 319.031], [405.762, 106.131, 366.906],
	       [458.76, 59.038, 414]];
        var isDragging = false;

        var svg = d3.select("#humidity")
                             .append("svg")
                             .attr("width", 569)
                             .attr("height", 400);
                
                var g = d3.select("svg")
                        .append("g")
                        .attr("transform", "scale(0.9)")
                        .on("mousedown",
                            function(){
                                event.preventDefault();
                                isDragging = true;
                            })
                        .on("mouseup",
                            function(){
                                isDragging = false;                    
                            })
                        .on("touchstart",
                            function(){
                                event.preventDefault();
                                isDragging = true;
                            })
                        .on("touchend",
                            function(){
                                isDragging = false;   
                            });
        
                        
                g.selectAll("rect")
                        .data(dataset)
                        .enter()
                        .append("rect")
                        .attr("isBlue","false")
			.attr("number", function(d,i) {return i;})
                        .attr("x", function(d) { return d[0]; })
                        .attr("y", function(d) { return d[1]; })
                        .attr("width", 43)
                        .attr("height", function(d) { return d[2]; })
                        .style("fill", "#a6a9a7")
                        .on("mouseover",
                            function (d){
                                if (isDragging) {
                                    var currentRect = colorRects( dataset, d3.select(this));
                                    getCurrentVal(dataset, currentRect);
                                };
                        })
                            .on("touchmove", function (){
                            if (isDragging) {
                                colorRects( dataset, d3.select(this));
                            };
                        });
        
	function colorRects( rectDataSet, selectedRect) {
		    selectedRect.style("fill", "#a6a9a7");
		    selectedRect.attr("isBlue", "true");
		    for (var i = 0; i < rectDataSet.length; i++) {
			    if ( d3.selectAll("rect")[0][i].getAttribute("number") <= selectedRect.attr("number") ) {
				    d3.selectAll("rect")[0][i].setAttribute("style","fill: #89d5da");
                                    d3.selectAll("rect")[0][i].setAttribute("isBlue", "true");
			    }
			    else{
				    d3.selectAll("rect")[0][i].setAttribute("style","fill: #a6a9a7");
				    d3.selectAll("rect")[0][i].setAttribute("isBlue", "false");
			    };
		    }
			return selectedRect;
	    }
		
	//find current value of the slider
	function getCurrentVal(data, selectedRect){
		var sRect = selectedRect;
		for(var i = 0; i < data.length; i++) {
			if( sRect.attr("x") == d3.selectAll("rect")[0][i].getAttribute("x") ) {
				humiditySliderVal = i+1;
			}
		}
		humiditySliderVal = Math.round( ( humiditySliderVal / data.length ) * 100 );
		currentHumidity = humiditySliderVal;
		console.log(currentHumidity);
	}
 