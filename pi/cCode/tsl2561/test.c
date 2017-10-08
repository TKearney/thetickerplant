#include "tsl2561.h"
#include <stdlib.h>
#include <stdio.h>
#include <unistd.h>

/*
 * Example
 */
int main(int argc, char **argv) {
//	int address = 0x39;
	int address = 0x29;
	char *i2c_device = "/dev/i2c-1";

	void *tsl = tsl2561_init(address, i2c_device);
	tsl2561_enable_autogain(tsl);
	tsl2561_set_integration_time(tsl, TSL2561_INTEGRATION_TIME_13MS);
 
	if(tsl == NULL){ // check if error is present
		exit(1);
	} 
	
	int c, ch0, ch1;
	long lux;
	for(c = 0; c < 100; c++){
		tsl2561_luminosity(tsl, &ch0, &ch1);
		lux = tsl2561_compute_lux(tsl, ch0, ch1);
		tsl2561_gain_normalize(tsl, &ch0, &ch1);
		//lux = tsl2561_lux(tsl);
		printf("lux %lu, ch0: %i, ch1: %i \r\n", lux, ch0, ch1);
		usleep(3 * 100 * 1000);
	}
	
	tsl2561_close(tsl);
	i2c_device = NULL;
	return 0;
}
