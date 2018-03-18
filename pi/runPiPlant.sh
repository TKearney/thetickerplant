#!/bin/bash
cd /home/pi/thetickerplant/pi/
source configPi.cfg
cd qFiles/
echo Checking connection to thetickerplant.com
until ping -c1 thetickerplant.com; do sleep 1; done
echo starting tp
${q} tick.q log . -p ${piTPPort} &>> ../log/tick.log & echo $! > ../pid/tick.pid
${q} imageCapture.q -p ${piImagePort} &>> ../log/imageCapture.log & echo $! > ../pid/imageCapture.pid
cd ../
sudo ./main &>> log/main.log & echo $! > pid/main.pid
#echo starting pyq process
#eval pyq dataCollect.py &`
