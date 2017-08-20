#!/bin/bash
source ../config.cfg
cd kdb-tick-master/
echo starting tp 
eval ${q} tick.q hdb ../ -p ${tpPort} -U ../../${kdbUserPassFile} &
echo starting rdb
eval ${q} tick/r.q localhost:${tpPort}:${user}:${pass} -p ${rdbPort} -U ../../${kdbUserPassFile} &
#eval ${q} tick/feed.q localhost:${tpPort}:${user}:${pass} &
