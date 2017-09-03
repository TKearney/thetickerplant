//var svg = d3.select("svg"),
//    margin = {top: 20, right: 20, bottom: 30, left: 50},
//    width = +svg.attr("width") - margin.left - margin.right,
//    height = +svg.attr("height") - margin.top - margin.bottom,
//    g = svg.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");
var width = document.querySelector("svg").clientWidth
//var width=960;
var height = document.querySelector("svg").clientHeight
var margin = {top:50, left:50, bottom:50, right:50 }

var parseTime = d3.timeParse("%d-%b-%y");
var svg = d3.select("#example1")
g = svg.append("g")
  .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
               
var xScale = d3.scaleLinear()
var yScale = d3.scaleLinear()
var zScale = d3.scaleLinear()
        
var xAxisCall = d3.axisBottom().tickFormat(d3.timeFormat("%H:%M:%S"))
var yAxisCall = d3.axisLeft()
var zAxisCall = d3.axisRight()
    
    

function setScale1(data){
var zVals = [];
var yVals = [];
for(var i=0;i<data.length;i++){
//xVals.push(data[i].time);
yVals.push(data[i].lux);
zVals.push(data[i].IR);
}
//console.log(xVals)
//console.log(yVals)
  xScale.domain([data[0]["time"], data[data.length-1]["time"]]).range([0, width-(margin.top+margin.bottom)])
  yScale.domain([d3.min(yVals.concat(zVals)), d3.max(yVals.concat(zVals))]).range([height-(margin.top+margin.bottom), 0])
  xAxisCall.scale(xScale)
  yAxisCall.scale(yScale)    
}
function updateAxis(){
  var t = d3.transition()
   .duration(500)
        
  svg.select(".x")
    .transition(t)
    .call(xAxisCall)
        
  svg.select(".y")
    .transition(t)
    .call(yAxisCall)
       
}  

function initAxis()
{
  xScale.domain([Date.now()-50, Date.now()]).range([0, width-(margin.top+margin.bottom)])
  yScale.domain([0, 100]).range([height-(margin.top+margin.bottom), 0])
  xAxisCall.scale(xScale)
  yAxisCall.scale(yScale)

//orig
  svg.append("g")
    .attr("class", "x axis")
     .attr("transform", "translate("+[margin.left, height-margin.top]+")")
       .call(xAxisCall);
        
  svg.append("g")
     .attr("class", "y axis")
     .attr("transform", "translate("+[margin.left, margin.top]+")")
       .call(yAxisCall)
    g.append("text")
      .attr("fill", "#000")
      //.attr("transform", "rotate(90)translate("+[width/2, height/2]+")")
      //.attr("transform", "translate("+[0-margin.left, height/2]+"), rotate(-90)")
      .attr("transform", "translate("+[-40, height/2-margin.top]+")rotate(-90)")
      //.attr("y", 0 - margin.left)
      //.attr("dy", "0.71em")
      .attr("text-anchor", "middle")
      .text("Brightness");
    g.append("text")
      .attr("fill", "#000")
      //.attr("transform", "rotate(90)")
      .attr("transform", "translate("+[width/2-margin.left, height-margin.bottom]+")")
      //.attr("y", 0 - margin.left)
      //.attr("dy", "0.71em")
      .attr("text-anchor", "middle")
      .text("Time");
    g.append("text")
      .attr("fill", "#008000")
      //.attr("transform", "translate("+[width-margin.left-margin.right, height/2]+")")
      .attr("text-anchor", "start")
      .attr("id", "luxText")
      .text("Lux");
    g.append("text")
      .attr("fill", "#F00")
      //.attr("transform", "translate("+[width-margin.left-margin.right, height/2]+")")
      .attr("text-anchor", "start")
      .attr("id", "IRtext")
      .text("IR");
   
}

var line = d3.line()
    .x(function(d) { return xScale(d.time); }) // set the x values for the line generator
    .y(function(d) { return yScale(d.lux); }) // set the y values for the line generator 
    .curve(d3.curveMonotoneX) // apply smoothing to the line

var line2 = d3.line()
    .x(function(d) { return xScale(d.time); })
    .y(function(d) { return yScale(d.IR); })

//setScale1()
initAxis()

  g.append("path")
      //.datum(data)
      .attr("fill", "none")
      .attr("stroke", "green")
      .attr("stroke-linejoin", "round")
      .attr("stroke-linecap", "round")
      .attr("stroke-width", 1.5)
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
      .call(d3.axisLeft(yScale))
//    .append("text")
//      .attr("fill", "#000")
      //.attr("transform", "translate("+[width/2, height/2]+")", "rotate(-90)")
      //.attr("transform", "rotate(-90)")
      //.attr("y", 6)
      //.attr("dy", "0.71em")
//      .attr("text-anchor", "end")
//      .text("Lux");

g.select("#line")
  .datum(data)
  .transition()
    .attr("d", line);

g.select("#line2")
  .datum(data)
  .transition()
    .attr("d", line2);

g.select("#luxText")
  .datum(data)
  .attr("transform","translate("+[width-margin.left-margin.right+5, yScale(data[data.length -1].lux)]+")")
  .attr("dy", ".35em")
g.select("#IRtext")
  .datum(data)
  .attr("transform","translate("+[width-margin.left-margin.right+5, yScale(data[data.length -1].IR)]+")")
  .attr("dy", ".35em")

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
