#!/bin/bash
ffmpeg -framerate 30 -i /media/usb/thetickerplant/pics/%*.jpg -c:v libx264 -profile:v high -crf 18 -pix_fmt yuv420p output.mp4
