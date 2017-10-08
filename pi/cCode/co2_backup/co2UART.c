//program: co2UART
//compile with:	  gcc co2UART.cpp -o co2UART -lwiringPi
//run with:   	  sudo ./co2UART
//#include <iostream>
#include <wiringPi.h>      //only needed for the one sec delay
#include <wiringSerial.h>  //only needed for serialOpen
#include <unistd.h>        // needed for read and write
#include <stdio.h>
#include <math.h>
#include <string>
//using namespace std;

int main()
{

	int fd;  // Handler ID
	//if ((fd = serialOpen ("/dev/serial0", 9600)) < 0) // uses wiringSerial

	if ((fd = serialOpen ("/dev/ttyS0", 9600)) < 0) // uses wiringSerial
	{
		printf("Unable to open device");
		return 1 ;
	} else
	{
		printf("ttyAMA0 initialised ok\n");
	}
	char  cmd[9] = {0xFF,0x01,0x86,0x00,0x00,0x00,0x00,0x00,0x79};
	char cmd2[9];
	printf("CO2 UART is running\n");
	while(1)
	{
	  delay(2000);
	  write (fd,cmd,9);	//write 9 bytes in cmd to UART
	  read(fd,cmd2,9);	//read 9 bytes to cmd2 from UART
	  //for (int loop=0;loop<=8;loop++)
	//	prtinf(int)cmd2[loop] << "\t ";   // print all 9 bytes with decimal output
	 // printf("\n");  
	  //for (int loop=0;loop<=8;loop++)
	//	cout <<  std::hex << (int)cmd2[loop] << std::dec << "\t "; //hex valures for all 9 bytes read
	  printf("\n");
	  int High = (int) cmd2[2];
	  int Low = (int) cmd2[3];
	  int ppm = (256*High)+Low;    //ppm = (256*byte2)+byte3  remember bytes numbered 0-8
	  printf("\nppm = %i \n",ppm);
	  printf("--------------------------------------------------------------------\n");
	}
	return 0;
}
