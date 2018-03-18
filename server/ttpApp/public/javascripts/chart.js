var seriesDict = {date: false, lux: true, visIR: false, IR: true, UV: false, humidity: true, airTemp: true, waterTemp: false, pH: false,EC: false,co2: true,weight: false};
var series = {date: [false,0], lux: [true,1], visIR: [false,2], IR: [true,3], UV: [false,4], humidity: [true,5], airTemp: [true,6], waterTemp: [false,7], pH: [false,8],EC: [false,9],co2: [true,10],weight: [false,11]};
function graphGen(data){
  g = new Dygraph(

    // containing div
    document.getElementById("chart"),data,

    {
      //stackedGraph: true,
      //title: "Title is here:"
      //visibility:[false,true,false,true,false,true,true,true,false,false,true,false],
      visibility: $.map(seriesDict, function(value, key) { return value }),
      yLabel: 'ylabel test',
      axis : {
        x : {
          valueFormatter: Dygraph.dateString_,
          valueParser: function (x) {return new Date(1000 * parseInt(x));},
          ticker: Dygraph.dateTicker,
          xlabel:'Time',

      }

    },

  });
}

function updateGraph(data){
  g.updateOptions( { 'file': data } );
}

function toggleSeries(key){
  //console.log(g);
  //console.log(series["lux"][0]);
  //var res = !seriesDict[key];
  //document.getElementById('sensorToggle').style.stroke='red';document.getElementById('visTooltip').style.visibility = "visible"
  //luxTxt
  series[key][0] = !series[key][0];
  console.log(g.visibility());
  g.setVisibility(series[key][1],series[key][0]);
  //g.setVisibility(parseInt(series[key][1]),series[key][0]);
  console.log(g.visibility());

  //g.setVisibility(0,false);
}
