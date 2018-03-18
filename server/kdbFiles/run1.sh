#!/bin/bash
# run rdb demo

source ../config.cfg

D=~/q/start/tick
Q=~/q/l32/q
#cd ~/q/start/tick

# load each q process in a new terminal
f() {
# gnome-terminal -t "$1" --command="$Q $2"
 $Q $2 &>> ${LOGPATH}/${1}_"$(date +%Y-%m-%d_%H:%M)".log & echo $! > pid/${1}.pid
 sleep 0.25
}

# wait for listening port
w() {
for i in `seq 10 30`; do
  S=`netstat -lnt -A inet | grep ":$1"`
  if [ -n "$S" ]; then return 0; fi; sleep 0.25
done
}



case $1 in 
 "tick" ) f $1 "tick.q hdb ../ -p $TP_PORT -U $KDB_PERM_FILE ";w 5010 ;;
 "rdb" ) f $1 "tick/r.q :${TP_PORT}:${USER}:${PASS} :$HDB_PORT $HDB_DIR -p $RDB_PORT" ;;
 "hdb" ) f $1 "tick/hdb.q -p $HDB_PORT" ;;
 "gw" ) f $1 "tick/gw.q :${TP_PORT}:${USER}:${PASS} :${RDB_PORT}:${USER}:${PASS} :$HDB_PORT -p $GW_PORT" ;;
# "vwap" ) f $1 "$D/cx.q $1 -p 5017 -t 1000" ;;
# "show" ) f $1 "$D/cx.q $1" ;;
# "feed" ) f "feed" "$D/feed.q localhost:5010 -t 507" ;;
esac
