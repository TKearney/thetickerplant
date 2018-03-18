#!/bin/bash
# Add to crontab:
# * 22-16 * * * /home/pi/thetickerplant/pi/imageCapture.sh
raspistill -o test.jpg -w 640 -h 480
cp test.jpg /media/usb/thetickerplant/pics/plant_"$(date +%Y%m%d_%H%M)".jpg
scp -i TestSystem.pem test.jpg ec2-user@thetickerplant.com:thetickerplant/server/ttpApp/public/images/test.jpg
