//var svg = d3.select("svg"),
//    margin = {top: 20, right: 20, bottom: 30, left: 50},
//    width = +svg.attr("width") - margin.left - margin.right,
//    height = +svg.attr("height") - margin.top - margin.bottom,
//    g = svg.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");
var width = document.querySelector("svg").clientWidth
//var width=960;
var height = document.querySelector("svg").clientHeight
var margin = {top:50, left:50, bottom:50, right:100 }

var parseTime = d3.timeParse("%d-%b-%y");
var svg = d3.select("#light")
g = svg.append("g")
  .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
             
var xScale = d3.scaleLinear()
var y1Scale = d3.scaleLinear()
var y2Scale = d3.scaleLinear()
        
var xAxisCall = d3.axisBottom().tickFormat(d3.timeFormat("%H:%M"))
var y1AxisCall = d3.axisLeft()
var y2AxisCall = d3.axisRight()
    

function setScale1(data){
var xVals = [];
var y1Vals = [];
var y2Vals = [];
for(var i=0;i<data.length;i++){
xVals.push(data[i].time);
y1Vals.push(data[i].lux);
y2Vals.push(data[i].IR);
}
//console.log(xVals)
//console.log(yVals)
  xScale.domain([data[0]["time"], data[data.length-1]["time"]]).range([0, width-(margin.top+margin.bottom)])
  y1Scale.domain(d3.extent(y1Vals)).range([height-(margin.top+margin.bottom), 0])
  y2Scale.domain(d3.extent(y2Vals)).range([height-(margin.top+margin.bottom), 0])
  xAxisCall.scale(xScale)
  y1AxisCall.scale(y1Scale)    
  y2AxisCall.scale(y2Scale)    
}
function updateAxis(){
  var t = d3.transition();
   //.attr("transform","translate("+xScale(-1) + ")");
   //.duration(500);
        
  svg.select(".x")
    .transition(t)
    .call(xAxisCall)
        
  svg.select(".y")
    .transition(t)
    .call(y1AxisCall)
       
  svg.select(".y1")
    .transition(t)
    .call(y2AxisCall)
}
//var focus = svg.append('g').style('display', 'none');
var focus = svg.append('g');
  focus.append('line')
    .attr('id', 'focusLineX')
    .attr('stroke','steelblue')
    .attr('stroke-width','2px')
    .attr('class', 'focusLine');
  focus.append('line')
    .attr('id', 'focusLineY1')
    .attr('stroke','#A5BE00')
    .attr('opacity',0.5)
    .style('stroke-dasharray', ("3, 3"))
    .attr('stroke-width','2px')
    .attr('class', 'focusLine');
  focus.append('line')
    .attr('id', 'focusLineY2')
    .attr('stroke','red')
    .attr('opacity',0.5)
    .style('stroke-dasharray', ("3, 3"))
    .attr('stroke-width','2px')
    .attr('class', 'focusLine');
  focus.append('circle')
    .attr('id', 'focusCircle1')
    .attr('r', 3)
    .attr('cx',-10)
    .attr('class', 'circle focusCircle');
  focus.append('circle')
    .attr('id', 'focusCircle2')
    .attr('r', 3)
    .attr('cx',-10)
    .attr('class', 'circle focusCircle');

var bisectDate = d3.bisector(function(d) { return d.time; }).left;

function mousemove() {
      var mouse = d3.mouse(this);

/*          i = bisectDate(data, x0, 1),
          d0 = data[i - 1],
          d1 = data[i],
          d = x0 - d0.year > d1.year - x0 ? d1 : d0;
      focus.attr("transform", "translate(" + x(d.year) + "," + y(d.value) + ")");*/
                    var mouse = d3.mouse(this);
                    var mouseDate = xScale.invert(mouse[0]);
                    var i = bisectDate(data, mouseDate); // returns the index to the current data item

                    var d0 = data[i - 1]
                    var d1 = data[i];
                    // work out which date value is closest to the mouse
                    var d = mouseDate - d0[0] > d1[0] - mouseDate ? d1 : d0;
                    var x = xScale(d.time);
                    var y1 = y1Scale(d.lux);
                    var y2 = y2Scale(d.IR);

                   focus.select('#focusCircle1')
                        .attr('cx', x+margin.left)
                        .attr('cy', y1+margin.top);
                   focus.select('#focusCircle2')
                        .attr('cx', x+margin.left)
                        .attr('cy', y2+margin.top);
                    focus.select('#focusLineX')
                        .attr('x1', x+margin.left).attr('y1', margin.top)
                        .attr('x2', x+margin.left).attr('y2', height-margin.top);
                    focus.select('#focusLineY1')
                        .attr('x1', margin.left).attr('y1', y1+margin.top)
                        .attr('x2', width-margin.left).attr('y2', y1+margin.top);
                    focus.select('#focusLineY2')
                        .attr('x1', margin.left).attr('y1', y2+margin.top)
                        .attr('x2', width-margin.left).attr('y2', y2+margin.top);
      g.select("#txt1")
	.text(" lux= "+d.lux+" IR= "+d.IR+" \n\r Time= "+d.time);
//  window.alert("chart mouse");
//      focus.select(".x-hover-line").attr("y2", height - y(d.value));
//      focus.select(".y-hover-line").attr("x2", width + width);
}
function initAxis()
{
  xScale.domain([Date.now()-50, Date.now()]).range([0, width-(margin.top+margin.bottom)])
  y1Scale.domain([0, 100]).range([height-(margin.top+margin.bottom), 0])
  y2Scale.domain([0, 100]).range([height-(margin.top+margin.bottom), 0])
  xAxisCall.scale(xScale)
  y1AxisCall.scale(y1Scale)
  y2AxisCall.scale(y2Scale)

//orig
  svg.append("g")
    .attr("class", "x axis")
     .attr("transform", "translate("+[margin.left, height-margin.top]+")")
       .call(xAxisCall);
        
  svg.append("g")
     .attr("class", "y axis")
     .attr("transform", "translate("+[margin.left, margin.top]+")")
       .call(y1AxisCall);
  svg.append("g")
     .attr("class", 'y1 axis')
     .style('text','red')
     .attr("transform", "translate("+[width-margin.left, margin.top]+")")
       .call(y2AxisCall)
    g.append("text")
      .attr("fill", "#008000")
      .attr("transform", "translate("+[-40, height/2-margin.top]+")rotate(-90)")
      .attr("text-anchor", "middle")
      .text("Lux");
    g.append("text")
      .attr("fill", "#F00")
      .attr("transform", "translate("+[width-margin.left-10, height/2-margin.top]+")rotate(90)")
      .attr("text-anchor", "middle")
      .style('fill', 'red')
      .text("IR");
    g.append("text")
      .attr("fill", "#000")
      .attr("transform", "translate("+[width/2-margin.left, height-margin.bottom]+")")
      .attr("text-anchor", "middle")
      .text("Time");
  svg.append("rect") 
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
      .attr("class", "overlay")
      .attr('opacity', "0")
      .attr("width", width-margin.right)
      .attr("height", height-margin.bottom-margin.top)
      .on("mouseover", function() { focus.style("display", null); })
      .on("mouseout", function() { focus.style("display", "none"); })
      .on("mousemove", mousemove);

   g.append("text")
    .attr("id", "txt1")
    //.text("This is a test.");
}

var line = d3.line()
    .x(function(d) { return xScale(d.time); }) // set the x values for the line generator
    .y(function(d) { return y1Scale(d.lux); }) // set the y values for the line generator 
    .curve(d3.curveMonotoneX) // apply smoothing to the line

var line2 = d3.line()
    .x(function(d) { return xScale(d.time); })
    .y(function(d) { return y2Scale(d.IR); })
    .curve(d3.curveMonotoneX) // apply smoothing to the line

//setScale1()
initAxis()

  g.append("path")
      //.datum(data)
      .attr("fill", "none")
      .attr("stroke", "#A5BE00")
      .attr("stroke-linejoin", "round")
      .attr("stroke-linecap", "round")
      .attr("stroke-width", 1)
      .attr("id", "line")
  g.append("path")
      .attr("fill", "none")
      .attr("stroke", "red")
      .attr("stroke-linejoin", "round")
      .attr("stroke-linecap", "round")
      .attr("strike-width", 1.5)
      .attr("id", "line2")
      //.attr("d", line);

//  g.append("g")
    //.call(d3.axisLeft(yScale))
//    .append("text")
//      .attr("fill", "#000")
      //.attr("transform", "rotate(90)")
//      .attr("transform", "translate("+[0-margin.left, height/2]+")", "rotate(-90)")
      //.attr("y", 0 - margin.left)
      //.attr("dy", "0.71em")
//      .attr("text-anchor", "middle")
//      .text("Lux");
//g.append("g")
//  .append("text")
//      .attr("fill", "#000")
//      .attr("transform", "ro")
//      .attr("transform", "translate("+[width/2, height-margin.top]+")")
      //.attr("x", 0 + margin.left)
      //.attr("y", 0 + height)
//      .attr("dx", "0.71em")
//      .attr("text-anchor", "middle")
//      .text("Time");
//d3.tsv("data.tsv", function(d) {
//  d.date = parseTime(d.date);
//  d.close = +d.close;
//  return d;
//}, function(error, data) {
function graphGen(data){
//  if (error) throw error;
setScale1(data)
updateAxis()
svg.select("rect")
  .on("mousemove", mousemove);
  //x.domain(d3.extent(data, function(d) { return d.time; }));
  //y.domain(d3.extent(data, function(d) { return d.lux; }));

  g.select("g")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(xScale))
    .select(".domain")
      .remove()
      

  g.select("g")
      .call(d3.axisLeft(y1Scale));
  g.select("g")
      .call(d3.axisRight(y2Scale));

g.select("#line")
  .datum(data)
  .transition()
    .attr("d", line);

//g.select("#line2")
//  .transition()
//    .attr("transform", "translate("+ xScale(-1) + ")");
//g.select("#line2")
  //.datum(data)
  //.transition()
    //.attr("d", line2);
    //.attr({"d": line2});
g.select("#line2")
  .datum(data)
  .transition()
    .attr("d",line2);
//g.select("#line2")
//  .datum(data)
//  .transition()
//.attrTween("transform", function() {
//  return function(t) {
//    return "translate(" + [-((width-margin.left-margin.right)/data.length)*t,0]+")";
//  };
//})
//  .attr("d", line2)
//    .on("start",tick);
//g.active("#line2")
//  .attr("transform","translate(" + xScale(-1) + ",0)")
//  .transition()


//    .attr("d", line2);
//  g.select("path")
//      .datum(data)
//      .attr("fill", "none")
 //     .attr("stroke", "steelblue")
   //   .attr("stroke-linejoin", "round")
     // .attr("stroke-linecap", "round")
    //  .attr("stroke-width", 1.5)
  //    .attr("d", line);
};
