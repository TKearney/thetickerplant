#!/bin/bash
sudo service nginx restart
cd ttpApp/
nohup npm start &
cd ../kdbFiles/
./run.sh
