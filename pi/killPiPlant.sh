#!/bin/bash
source configPi.cfg
echo killing pi tickerplant processes
echo 2user is: $(whoami)
pkill -F pid/tick.pid
pkill -F pid/imageCapture.pid
sudo pkill -F pid/main.pid
