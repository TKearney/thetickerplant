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
var y1Vals = [];
var y2Vals = [];
for(var i=0;i<data.length;i++){
//xVals.push(data[i].time);
y1Vals.push(data[i].lux);
y2Vals.push(data[i].IR);
}
//console.log(xVals)
//console.log(yVals)
  xScale.domain([data[0]["time"], data[data.length-1]["time"]]).range([0, width-(margin.top+margin.bottom)])
//console.log(xScale(100.0))
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
     .attr("class", "y1 axis")
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
      .text("IR");
    g.append("text")
      .attr("fill", "#000")
      .attr("transform", "translate("+[width/2-margin.left, height-margin.bottom]+")")
      .attr("text-anchor", "middle")
      .text("Time");
   
}

var line = d3.line()
    .x(function(d) { return xScale(d.time); }) // set the x values for the line generator
    .y(function(d) { return y1Scale(d.lux); }) // set the y values for the line generator 
    //.curve(d3.curveMonotoneX) // apply smoothing to the line

var line2 = d3.line()
    .x(function(d) { return xScale(d.time); })
    .y(function(d) { return y2Scale(d.IR); })

//setScale1()
initAxis()

  g.append("path")
      //.datum(data)
      .attr("fill", "none")
      .attr("stroke", "green")
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
