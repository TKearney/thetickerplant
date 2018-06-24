#!/bin/bash
# run rdb demo

#P=~/q/start/tick/run1.sh
P=./run1.sh
source ../config.cfg

usage() {
  echo "Usage: `basename $0` {START|STOP|TEST} {ALL|tick|rdb|hdb|gw}" >&2
  echo "       tick.pid is a file that contains the pid of the currently running tick process" >&2
}

# At least two arguments are required.
if [[ -z "${1}" || -z "${2}" ]]; then
  usage
  exit 1
fi

if [ $1 == "START" ]; then
	if [ $2 == "ALL" ]; then
		for f in tick rdb hdb gw
		do 
			if [ -e pid/${f}.pid ]; then
					echo "${f}.pid already exists. Exiting." 1>&2;
					exit 2
			fi
			$P $f; done;
	else
		if [[ -e pid/${2}.pid ]]; then
			echo "${2}.pid already exists. Exiting." 1>&2;
			exit 2
		fi
		$P $2
	fi;
elif [ $1 == "STOP" ]; then
	if [ $2 == "ALL" ]; then
		for f in tick rdb hdb gw
		do
			if [ -e pid/${f}.pid ]; then
				echo "Killing process ${f}." 1>&2;
				pkill -F pid/${f}.pid
				rm pid/${f}.pid
			fi
		done;
	else
		if [[ -e pid/${2}.pid ]]; then
			echo "Killing process ${2}"
			pkill -F pid/${2}.pid
			#rm pid/${2}.pid
		fi
	fi
elif [ $1 == "TEST" ]; then
	for f in tick rdb hdb gw
	do
		if [ -e pid/${f}.pid ]; then
			PID=`cat pid/${f}.pid`
			echo "${f} has pid file with PID $PID"
			if ps -fp $PID; then
				echo -e "And is running.\n"
			else
				echo "But is not running anymore."
			fi;
		else
			echo "${f} has no pid file"
		fi;
	done;
	if [[ ! -e pid/tick.pid && ! -e pid/rdb.pid && ! -e pid/hdb.pid && ! -e pid/gw.pid ]]; then 
		echo "No pid files exist."
	fi;
	
else
	echo "Not a valid command - {START|STOP|TEST}";
fi;

#fi;
#for f in ticker rdb1 rdb2 cep feed
#for f in ticker rdb1
#do $P $f; done
