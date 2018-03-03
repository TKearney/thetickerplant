#!/bin/bash
sudo service nginx restart
cd ttpApp/
#nohup npm start &
nohup nodemon start &
cd ../kdbFiles/
./run.sh
