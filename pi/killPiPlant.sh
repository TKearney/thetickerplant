#!/bin/bash
source config.cfg
echo killing pi tickerplant processes
echo 2user is: $(whoami)
pkill -U $(whoami) q
pkill -U $(whoami) main
