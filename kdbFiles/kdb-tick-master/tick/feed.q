/q tick/r.q [host]:port[:usr:pwd] [host]:port[:usr:pwd]
/2008.09.09 .k ->.q

if[not "w"=first string .z.o;system "sleep 1"];


/ get the ticker plant and history ports, defaults are 5010,5012
.u.x:.z.x,(count .z.x)_(":5010";":5012");

/ connect to ticker plant for (schema;(logcount;log))
h:hopen `$":",.u.x 0;
.z.ts:{h(`.u.upd;`test;(1?12:00:00.000;1?`AA`BB`CC;1?10.0;1?100.0));};
system "t 4000";
/h(`.u.sub;[`;`]);


