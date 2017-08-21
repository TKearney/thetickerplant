#!/usr/bin/python
# TSL2561 I2C Light-To-Digital converter library for the Raspberry Pi.
# Datasheet: https://www.adafruit.com/datasheets/TSL2561.pdf
#
# This library is based on the work by Cedric Maion https://github.com/cmaion/TSL2561
#
# Read http://www.dexterindustries.com/topic/greehouse-project/ for the forum discussion about the sensor

from time import sleep
import smbus
from Adafruit_I2C import Adafruit_I2C
import RPi.GPIO as GPIO
from smbus import SMBus
from pyq import q,K
import sys
import Adafruit_DHT
import lightSensors
import ads1256
import mh_z19
import waterTemp

# Initializes the ADC using py-ads1256 library function
# First argument: GAIN. The second: SPS
# Possible settings:
# GAIN values:  1,  2,  4,  8,  16,  32,  64
# SPS values:   2d5,  5,  10,  15,  25,  30,  50,  60,  100,
# SPS values:   500, 1000,  2000,  3750,  7500,  15000,  30000
#ads1256.start("1","2d5")

def init():
	print "Initializing"
	lightSensors.powerUp()
	lightSensors.setTintAndGain()
	lightSensors.writeRegister(lightSensors.TSL2561_Interrupt, 0x00)
	lightSensors.powerDown()
	ads1256.start("1","5")
	mh_z19.init()
	print "Connecting to TP"
	q.h=q.hopen(':thetickerplant.com:5001:username:password')
	print "Connected"

def publishToTp():
	print "Getting Readings"
	q.lux=lightSensors.readVisibleLux()
	q.visIR=lightSensors.channel0
	q.IR=lightSensors.channel1
	humidity, airTemp=Adafruit_DHT.read_retry(Adafruit_DHT.AM2302, 23)
	q.UV=K.float(ads1256.read_channel(0)/(2**13))
	q.UV=q('UV%20')
	q.pH=K.float(ads1256.read_channel(2))
	q.co2=K.short(mh_z19.read())
	q.waterTemp=waterTemp.read_temp()
	#if humidity is not None and airTemp is not None:
    	#	print('Air Temp={0:0.1f}*  Humidity={1:0.1f}%'.format(airTemp, humidity))
	#else:
    	#	print('Failed to get reading...')
	q.humidity=humidity
	q.airTemp=airTemp
	print "Sending to TP"
	q('h(`.u.upd;`metrics;(.z.n;`chili1;lux;visIR;IR;UV;humidity;airTemp;waterTemp;0Nf;0Nf;co2;0nf))')
	print "Sent to TP"

def main():
	init()
#	t = threading.Timer(5, publishToTp)
#	t.start()
	while (True):
#		print("Lux: %i [Vis+IR=%i, IR=%i @ Gain=%ix, Timing=%.1fms]" % (readVisibleLux(), channel0, channel1, gain_m, timing_ms))
#		q.lux=readVisibleLux()
#		q.visIr=channel0
#		q.ir=channel1
#		q('h(`.u.upd;`light;(.z.n;`plant1;lux;visIr;ir))')
		publishToTp()
		sleep(2)

if __name__ == "__main__":
        main()
