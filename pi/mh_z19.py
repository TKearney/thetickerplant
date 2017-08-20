# http://eleparts.co.kr/data/design/product_file/SENSOR/gas/MH-Z19_CO2%20Manual%20V2.pdf
# http://qiita.com/UedaTakeyuki/items/c5226960a7328155635f
import serial
import time

def init():
	print "opening port..."
	global ser
	ser = serial.Serial('/dev/ttyS0',
#  ser = serial.Serial('/dev/ttyAMA0',
		baudrate=9600,
		bytesize=serial.EIGHTBITS,
		parity=serial.PARITY_NONE,
		stopbits=serial.STOPBITS_ONE,
		timeout=1.0)
	print "serial defined"
	print "opened"
	print ser.isOpen()
    
def read(): 
	print "writing to serial"
	result=ser.write("\xff\x01\x86\x00\x00\x00\x00\x00\x79")
	print "reading from serial"
	s=ser.read(9)
	print "read"
	if s[0] == "\xff" and s[1] == "\x86":
		print {'co2': ord(s[2])*256 + ord(s[3])}
	return (ord(s[2])*256 + ord(s[3]))
#	return True
