#!/bin/bash
source configPi.cfg
cd qFiles/
echo starting tp
eval ${q} tick.q log . -p ${piTPPort} &
eval ${q} imageCapture.q -p ${piImagePort} &
cd ../
eval sudo ./main &
`#echo starting pyq process`
`#eval pyq dataCollect.py & `
