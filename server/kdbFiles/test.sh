#!/bin/bash
#procs = {"tick","rdb1","rdb2"}
#tick rdb1 rdb2 cep feed
if [[ ! -e tick.pid || ! -e rdb1.pid || ! -e rdb2.pid || ! -e cep.pid || ! -e feed.pid ]]; 
	then echo "no pid files exist"
#else
#	echo ".pid does not exist."
fi