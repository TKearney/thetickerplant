/*
 * ADS1256_test.c:
 *	Very simple program to test the serial port. Expects
 *	the port to be looped back to itself
 *
 */
 
/*
             define from bcm2835.h                       define from Board DVK511
                 3.3V | | 5V               ->                 3.3V | | 5V
    RPI_V2_GPIO_P1_03 | | 5V               ->                  SDA | | 5V 
    RPI_V2_GPIO_P1_05 | | GND              ->                  SCL | | GND
       RPI_GPIO_P1_07 | | RPI_GPIO_P1_08   ->                  IO7 | | TX
                  GND | | RPI_GPIO_P1_10   ->                  GND | | RX
       RPI_GPIO_P1_11 | | RPI_GPIO_P1_12   ->                  IO0 | | IO1
    RPI_V2_GPIO_P1_13 | | GND              ->                  IO2 | | GND
       RPI_GPIO_P1_15 | | RPI_GPIO_P1_16   ->                  IO3 | | IO4
                  VCC | | RPI_GPIO_P1_18   ->                  VCC | | IO5
       RPI_GPIO_P1_19 | | GND              ->                 MOSI | | GND
       RPI_GPIO_P1_21 | | RPI_GPIO_P1_22   ->                 MISO | | IO6
       RPI_GPIO_P1_23 | | RPI_GPIO_P1_24   ->                  SCK | | CE0
                  GND | | RPI_GPIO_P1_26   ->                  GND | | CE1

::if your raspberry Pi is version 1 or rev 1 or rev A
RPI_V2_GPIO_P1_03->RPI_GPIO_P1_03
RPI_V2_GPIO_P1_05->RPI_GPIO_P1_05
RPI_V2_GPIO_P1_13->RPI_GPIO_P1_13
::
*/

//#include <bcm2835.h>  
#include <bcm2835.h>
#include <stdio.h>
#include <unistd.h>
#include <string.h>
#include <math.h>
#include <errno.h>
#include "ads1256.c"
#include "k.h"

//CS      -----   SPICS  
//DIN     -----   MOSI
//DOUT  -----   MISO
//SCLK   -----   SCLK
//DRDY  -----   ctl_IO     data  starting
//RST     -----   ctl_IO     reset



#define  DRDY  RPI_GPIO_P1_11         //P0
#define  RST  RPI_GPIO_P1_12     //P1
#define	SPICS	RPI_GPIO_P1_15	//P3

#define CS_1() bcm2835_gpio_write(SPICS,HIGH)
#define CS_0()  bcm2835_gpio_write(SPICS,LOW)

#define DRDY_IS_LOW()	((bcm2835_gpio_lev(DRDY)==0))

#define RST_1() 	bcm2835_gpio_write(RST,HIGH);
#define RST_0() 	bcm2835_gpio_write(RST,LOW);



/* Unsigned integer types  */
#define uint8_t unsigned char
#define uint16_t unsigned short    
#define uint32_t unsigned long     






/*
*********************************************************************************************************
*	name: main
*	function:  
*	parameter: NULL
*	The return value:  NULL
*********************************************************************************************************
*/

K  init(void)
{
      uint8_t id;
    if (!bcm2835_init())
        return ki(1);
    bcm2835_spi_begin();
    bcm2835_spi_setBitOrder(BCM2835_SPI_BIT_ORDER_LSBFIRST );      // The default
    bcm2835_spi_setDataMode(BCM2835_SPI_MODE1);                   // The default
    bcm2835_spi_setClockDivider(BCM2835_SPI_CLOCK_DIVIDER_1024); // The default
    bcm2835_gpio_fsel(SPICS, BCM2835_GPIO_FSEL_OUTP);//
    bcm2835_gpio_write(SPICS, HIGH);
    bcm2835_gpio_fsel(DRDY, BCM2835_GPIO_FSEL_INPT);
    bcm2835_gpio_set_pud(DRDY, BCM2835_GPIO_PUD_UP);    	
    //ADS1256_WriteReg(REG_MUX,0x01);
    //ADS1256_WriteReg(REG_ADCON,0x20);
   // ADS1256_CfgADC(ADS1256_GAIN_1, ADS1256_15SPS);
   id = ADS1256_ReadChipID();
   printf("\r\n");
   printf("ID=\r\n");  
	if (id != 3)
	{
		printf("Error, ASD1256 Chip ID = 0x%d\r\n", (int)id);
	}
	else
	{
		printf("Ok, ASD1256 Chip ID = 0x%d\r\n", (int)id);
	}
  	ADS1256_CfgADC(ADS1256_GAIN_1, ADS1256_15SPS);
       ADS1256_StartScan(0);
	
    return ki(0);
}

K getVal(void){

  	int32_t adc[8];
	int32_t volt[8];
	uint8_t i;
	uint8_t ch_num;
	int32_t iTemp;
	ch_num=1;
	while((ADS1256_Scan() == 0));
		for (i = 0; i < ch_num; i++)
		{
			adc[i] = ADS1256_GetAdc(i);
              	 volt[i] = (adc[i] * 100) / 167;	
		}
		
		for (i = 0; i < ch_num; i++)
		{
	                printf("%d= %8ld", (int)i,  (long)adc[i]);                

	                iTemp = volt[i];	/* uV  */
					if (iTemp < 0)
					{
						iTemp = -iTemp;
	                  		  	printf(" (-%ld.%03ld %03ld V) \r\n", iTemp /1000000, (iTemp%1000000)/1000, iTemp%1000);
					}
					else
					{
	                    			printf(" ( %ld.%03ld %03ld V) \r\n", iTemp /1000000, (iTemp%1000000)/1000, iTemp%1000);                    
					}
					
		}
			printf("\33[%dA", (int)ch_num);  
		bsp_DelayUS(10000);
	return ki(iTemp);
}

K closeADC(void){
    bcm2835_spi_end();
    bcm2835_close();
 return ki(0);
}
