#!/bin/bash
source ../config.cfg
cd kdb-tick-master/
echo starting tp 
eval ${q} tick.q hdb ../ -p ${tpPort} -U ../../${kdbUserPassFile} &
echo starting rdb
eval ${q} tick/r.q localhost:${tpPort}:${user}:${pass} :${hdbPort} -p ${rdbPort} -U ../../${kdbUserPassFile} &
echo starting hdb
eval ${q} hdb.q -p ${hdbPort} &
echo starting gw
eval ${q} tick/gw.q localhost:${tpPort}:${user}:${pass} localhost:${rdbPort}:${user}:${pass} localhost:${hdbPort} -p ${gwPort} &
#eval ${q} tick/feed.q localhost:${tpPort}:${user}:${pass} &
