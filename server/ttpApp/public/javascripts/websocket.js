var output=document.getElementById("out"),cmd="";
var ws,out=document.getElementById("out"),c=connect();
var data=[];
function connect()
{if ("WebSocket" in window)
{ws=new WebSocket('ws://thetickerplant.com:443');
ws.binaryType="arraybuffer";
out.value="connecting..." ;

ws.onopen=function(e){console.log("Connected");out.value="connected";send('1');connected()};
ws.onclose=function(e){out.value="disconnected";};
ws.onmessage=function(e){
	console.log("test on message");
	//console.log(e.data);
	//var t,d = JSON.parse(e.data);
	// we will use the variable t to build our HTML
	// we parse the JSON string into a JSON object using JSON.parse
	//if (typeof d == "object") { // either a table or dictionary
	//if (d.length) { // if d has a length it is a table
	// we will to iterate through the object wrapping it in the HTML table tags
	//data.push(d[0]);
	//for (var i = 0; i < d.length; i++) {
	//  d[i].time=new Date(d[i].time);
	//}
	//data = data.concat(e.data,"\n");
	if (data.length == 0){
		data = e.data;
		graphGen(data);
		//console.log(data);
	}else{
		data = data + "\n" + e.data;
		updateGraph(data);
	}
	//data.pop();
	//console.log(data);
	//data.splice(0,1);
	
	//graphGenTemp(data);
	//tableGen(d);
	//tabulate(data, ['time', 'lux','IR','UV', 'humidity', 'airTemp','waterTemp','co2','pH', 'weight']);
	//console.log(d);
	//console.log(data);
	//}
	//}
};
ws.onerror=function(e){out.value=e.data;};
}else alert("WebSockets not supported on your browser.");
}
function send(cmd)
{
ws.send(cmd);
//out.value="sent "+cmd;
return out.value;
}

function adjustLookback(lookback)
 {
  data = [];
//  console.log('getData['+lookback+']');
  ws.send(lookback);
}
$("#form1").submit(function(){
//console.log($("#form1 :input").val());
adjustLookback($("#form1 :input").val());
return false;
});

