/q tick/r.q [host]:port[:usr:pwd] [host]:port[:usr:pwd]
/2008.09.09 .k ->.q

if[not "w"=first string .z.o;system "sleep 1"];

//Websocket handles list
wsHandles:`int$();
/.z.wo:{wsHandles::distinct wsHandles,.z.w;`connectionLog insert (.z.n;.z.u;"." sv string "i"$0x0 vs .z.a;.z.w;0Nn)};
.z.wo:{0N!"websocket Opened";wsHandles::distinct wsHandles,.z.w};
.z.wc:{wsHandles::wsHandles inter key .z.W};
/.z.wc:{wsHandles::wsHandles inter key .z.W;update timeClosed:.z.n from `connectionLog where null timeClosed,handle=.z.w};
epochMillis:{floor((`long$x)-`long$1970.01.01D00:00)div 1e9};
/epochMillishdb:{floor((`long$x)-`long$1970.01.01D00:00)%1e6};
.z.ws:{neg[.z.w]"\n" sv csv 0: @[getData;value x;{`$x}];};

//Any query to gateway just returns results:
/.z.pg:{getData[`int$x]};
/ get the hdb and rdb ports, defaults are 5002,5003
.u.x:.z.x,(count .z.x)_(":5002";":5003");
rdbHandle:hopen `$":",.u.x 1;
hdbHandle:hopen `$":",.u.x 2;
queryRDBStandard:{factor:300;0!update epochMillis time+.z.d from ?[metrics;enlist(>;(+;`.z.d;`time);(-;`.z.p;(*;x;0D01:00:00.000000000)));(enlist`time)!enlist($;"t";(xbar;(ceiling;(%;(count;`i);`factor));`time.second));((cols[metrics]except`sym`time)!{(avg;x)}each cols[metrics]except`sym`time)]};
queryHDBStandard:{bucket:0D00:00:01.000000000*(exec first x from select count i from metrics where (time+date)>.z.p-x*0D01:00:00.000000000)%150;0!update epochMillis time+"d"$date from ?[metrics;enlist(>;(+;`date;`time);(-;`.z.p;(*;x;0D01:00:00.000000000)));(enlist`time)!enlist($;"t";(xbar;(ceiling;`bucket);(+;`date;`time.second)));((cols[metrics]except`sym`time)!{(avg;x)}each cols[metrics]except`sym`time)]};
//queryStandard:{factor:500;0!update epochMillis time from ?[metrics;();(enlist`time)!enlist($;"t";(xbar;(ceiling;(%;`x;`factor));`time.second));((cols[metrics]except`sym`time)!{(avg;x)}each cols[metrics]except`sym`time)]};

//Until figuring out how to best structure query:
rdbHandle(set;`epochMillis;epochMillis);
hdbHandle(set;`epochMillis;epochMillis);
getData:{`time xasc uj[hdbHandle(queryHDBStandard;x);rdbHandle(queryRDBStandard;x)]};

/cd ../hdb/;
upd:{[x;y]{neg[y]last csv 0: update epochMillis time+.z.d,sym:` from x}[y;]each wsHandles};



/ end of day: save, clear, hdb reload
/.u.end:{t:tables`.;t@:where `g=attr each t@\:`sym;.Q.hdpf[`$":",.u.x 1;`:.;x;`sym];@[;`sym;`g#] each t;};

/ init schema and sync up from log file;cd to hdb(so client save can run)
.u.schemas:{(.[;();:;].)each x};
/.u.rep:{(.[;();:;].)each x;if[null first y;:()];-11!y;system "cd ",1_-10_string first reverse y};
/ HARDCODE \cd if other than logdir/db

/ connect to ticker plant for (schema;(logcount;log))
/(hopen `$":",.u.x 0)"(.u.sub[`;`];`.u `i`L)";
.u.schemas @(hopen `$":",.u.x 0)"(.u.sub[`;`])";
/h:hopen `$":",.u.x 0;
/h:hopen 
/h(`.u.sub;[`;`]);


