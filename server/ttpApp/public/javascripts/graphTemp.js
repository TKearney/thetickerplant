//var svg = d3.select("svg"),
//    margin = {top: 20, right: 20, bottom: 30, left: 50},
//    width = +svg.attr("width") - margin.left - margin.right,
//    height = +svg.attr("height") - margin.top - margin.bottom,
//    g = svg.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");
var width = document.querySelector("svg").clientWidth
//var width=960;
var height = document.querySelector("svg").clientHeight
//var margin = {top:50, left:50, bottom:50, right:100 }

var parseTime = d3.timeParse("%d-%b-%y");
var svgTemp = d3.select("#temp")
//g1 = svgTemp.append("g")
  .append("g")
  //.attr("transform", "translate(" + margin.left + "," + margin.top + ")");
               
var xScale = d3.scaleLinear()
var y1ScaleTemp = d3.scaleLinear()
var y2ScaleTemp = d3.scaleLinear()
        
var xAxisCall = d3.axisBottom().tickFormat(d3.timeFormat("%H:%M"))
var y1AxisCallTemp = d3.axisLeft()
var y2AxisCallTemp = d3.axisRight()
    
    

function setScaleTemp(data){
var y1ValsTemp = [];
var y2ValsTemp = [];
for(var i=0;i<data.length;i++){
//xVals.push(data[i].time);
y1ValsTemp.push(data[i].airTemp);
y2ValsTemp.push(data[i].waterTemp);
}
//console.log(xVals)
//console.log(yVals)
  xScale.domain([data[0]["time"], data[data.length-1]["time"]]).range([0, width-(margin.top+margin.bottom)])
//console.log(xScale(100.0))
  y1ScaleTemp.domain(d3.extent(y1ValsTemp)).range([height-(margin.top+margin.bottom), 0])
  y2ScaleTemp.domain(d3.extent(y2ValsTemp)).range([height-(margin.top+margin.bottom), 0])
  xAxisCall.scale(xScale)
  y1AxisCallTemp.scale(y1ScaleTemp)    
  y2AxisCallTemp.scale(y2ScaleTemp)    
}
function updateAxisTemp(){
  var t = d3.transition();
   //.attr("transform","translate("+xScale(-1) + ")");
   //.duration(500);
        
  svgTemp.select(".x")
    .transition(t)
    .call(xAxisCall)
        
  svgTemp.select(".yTemp")
    .transition(t)
    .call(y1AxisCallTemp)
       
  svgTemp.select(".y1Temp")
    .transition(t)
    .call(y2AxisCallTemp)
}  

function initAxis()
{
  xScale.domain([Date.now()-50, Date.now()]).range([0, width-(margin.top+margin.bottom)])
  y1ScaleTemp.domain([0, 100]).range([height-(margin.top+margin.bottom), 0])
  y2ScaleTemp.domain([0, 100]).range([height-(margin.top+margin.bottom), 0])
  xAxisCall.scale(xScale)
  y1AxisCallTemp.scale(y1ScaleTemp)
  y2AxisCallTemp.scale(y2ScaleTemp)

//orig
  svgTemp.append("g")
    .attr("class", "x axis")
     .attr("transform", "translate("+[margin.left, height-margin.top]+")")
       .call(xAxisCall);
        
  svgTemp.append("g")
     .attr("class", "yTemp axis")
     .attr("transform", "translate("+[margin.left, margin.top]+")")
       .call(y1AxisCallTemp);
  svgTemp.append("g")
     .attr("class", "y1Temp axis")
     .attr("transform", "translate("+[width-margin.left, margin.top]+")")
       .call(y2AxisCallTemp);
  svgTemp.append("text")
      .attr("fill", "#008000")
      .attr("transform", "translate("+[margin.left-40, height/2]+")rotate(-90)")
      .attr("text-anchor", "middle")
      .text("Air Temp");
  svgTemp.append("text")
      .attr("fill", "#F00")
//      .attr("transform", "translate("+margin.left+","+margin.top+")")
      .attr("transform", "translate("+[width-10, height/2]+")rotate(90)")
      .attr("text-anchor", "middle")
      .text("Water Temp");
   //svgTemp.append("text")
   //   .attr("fill", "#000")
   //   .attr("transform", "translate("+[width/2-margin.left, height-margin.bottom]+")")
   //   .attr("text-anchor", "middle")
   //   .text("Time");
   
}

var lineAirTemp = d3.line()
    .x(function(d) { return xScale(d.time); }) // set the x values for the line generator
    .y(function(d) { return y1ScaleTemp(d.airTemp); }) // set the y values for the line generator 
    .curve(d3.curveMonotoneX) // apply smoothing to the line

var lineWaterTemp = d3.line()
    .x(function(d) { return xScale(d.time); })
    .y(function(d) { return y2ScaleTemp(d.waterTemp); })
    .curve(d3.curveMonotoneX) // apply smoothing to the line

//setScale1()
initAxis()

  svgTemp.append("path")
    //.datum(data)
      .attr("fill", "none")
      .attr("stroke", "#A5BE00")
      .attr("stroke-linejoin", "round")
      .attr("stroke-linecap", "round")
      .attr("stroke-width", 1)
      .attr("id", "lineAirTemp");
  svgTemp.append("path")
      .attr("fill", "none")
      .attr("stroke", "red")
      .attr("stroke-linejoin", "round")
      .attr("stroke-linecap", "round")
      .attr("strike-width", 1.5)
      .attr("id", "lineWaterTemp")
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
function graphGenTemp(data){
//  if (error) throw error;
setScaleTemp(data)
updateAxisTemp()
  //x.domain(d3.extent(data, function(d) { return d.time; }));
  //y.domain(d3.extent(data, function(d) { return d.lux; }));

  svgTemp.select("g")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(xScale))
    .select(".domain")
      .remove()
      

  svgTemp.select("g")
      .call(d3.axisLeft(y1ScaleTemp));
  svgTemp.select("g")
      .call(d3.axisRight(y2ScaleTemp));

svgTemp.select("#lineAirTemp")
  .attr("transform", "translate("+margin.left+","+margin.top+")")
  .datum(data)
  .transition()
    .attr("d", lineAirTemp);

//g.select("#line2")
//  .transition()
//    .attr("transform", "translate("+ xScale(-1) + ")");
//g.select("#line2")
  //.datum(data)
  //.transition()
    //.attr("d", line2);
    //.attr({"d": line2});
svgTemp.select("#lineWaterTemp")
  .attr("transform", "translate("+margin.left+","+margin.top+")")
  .datum(data)
  .transition()
    .attr("d",lineWaterTemp);
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
