	var dataset = [518, 509, 500, 491, 482, 472.8, 464, 455, 446, 437, 427.8, 464, 455, 446, 437, 427.8, 419, 410, 401, 392, 382.8, 374, 365, 356, 347, 337.9, 329, 320, 311, 302, 292.8, 284, 275, 266, 257, 247.8, 239, 230, 221, 212, 202.8, 194, 185, 176, 167, 158, 149, 140, 131, 122, 113];
        var barW = 87;
        var barH = 7.2;
        var barX = 164;
        var isDragging = false;
	var tempBoxY = 473;
	var tempText = "0";
	
		
        var svg = d3.select("#temp")
	    .append("svg")
	    .attr("width", 400)
	    .attr("height", 566);
        
        var g = d3.select("svg")
	    .append("g")
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
        
        //ff6a6a is red
        //a6a9a7 is gray
        
        g.selectAll("rect")
	    .data(dataset)
	    .enter()
	    .append("rect")
	    .attr("isRed","false")
	    .attr("x", barX)
	    .attr("y", function(d) {return d;})
	    .attr("number", function(d,i) { return(i); })
	    .attr("width", barW)
	    .attr("height", barH)
	    .style("fill", "#a6a9a7")
	    .on("mouseover",
		function (){
		    if (isDragging) {
			var currentRect = colorRects( dataset, d3.select(this));
			getCurrentVal(dataset, currentRect);
		    };
		})
	    .on("touchmove", function (){
		if (isDragging) {
		    var currentRect = colorRects( dataset, d3.select(this));
		    getCurrentVal(dataset, currentRect);

		};
	    });
		
	var g2 = d3.select("svg")
	    .append("g")
	    .attr("transform", "translate(245,"+tempBoxY+")")
	    .attr("transform-origin", "50,50");
		
	    g2.append("rect")
		.attr("x","27")
		.attr("y", "7.5")
		.attr("fill", " #666666")
		.attr("fill-opacity", "0.1")
		.attr("stroke", " #666666")
		.attr("width", "85")
		.attr("height", "50");

	 
    	    g2.append("polygon")
		.attr("fill", "#F2F2F2")
		.attr("fill-opacity", "0.7")
		.attr("stroke", " #666666")
		.attr("points", "26,57.2 4.7,44.9 26,32.6");
    
	    g2.append("text")
		.attr("x", "33")
		.attr("y", "50")
		.attr("font-size", "35pt")
		.text("0")
		.attr("class", "changeText")
		.attr("fill", "#666666")
		.attr("font-family", "gunarregular");

	function colorRects( rectDataSet, selectedRect ) {
	    selectedRect.style("fill", "#a6a9a7");
	    selectedRect.attr("isRed", "false");
	    for (var i = 0; i < rectDataSet.length; i++) {
		if ( d3.selectAll("rect")[0][i].getAttribute("y") >= selectedRect.attr("y") ) {
		    d3.selectAll("rect")[0][i].setAttribute("style","fill: #ff6a6a");
		    d3.selectAll("rect")[0][i].setAttribute("isRed", "true");
		}
		else{
		    d3.selectAll("rect")[0][i].setAttribute("style","fill: #a6a9a7");
		    d3.selectAll("rect")[0][i].setAttribute("isRed", "false");
		};
	    }
	    return selectedRect;
	}
		
	// find current value of the slider
	function getCurrentVal(data, selectedRect){
	    var sRect = selectedRect;
	    for(var i = 0; i < data.length; i++) {
		if( sRect.attr("y") == d3.selectAll("rect")[0][i].getAttribute("y") ) {
		    tempSliderVal = i+1;
		    currentTemperature = tempSliderVal;
		    console.log(currentTemperature);
		    tempBoxY = d3.selectAll("rect")[0][i].getAttribute("y");
		    var tempBoxInt = parseFloat(tempBoxY)-45;
		    g2.attr("transform", "translate(245,"+tempBoxInt+")");
		}
	    }
	    tempSliderVal = Math.round(tempSliderVal / data.length * 100);
	    tempText = tempSliderVal;
	    var tempTextDis = parseInt(tempText) -1;
	    g2.select("text.changeText").html(tempTextDis+"&#176;");
	}	