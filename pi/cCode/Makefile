CC=gcc
#CFLAGS=-Wall -std=gnu99 -DKXVER=3
CFLAGS=-std=gnu99
DEPS=main.c 
DHT_DEPS=DHT/pi_2_dht_read.c DHT/common_dht_read.c DHT/pi_2_mmio.c
ADS_DEPS=ads1256/ads1256.c
TSL_DEPS=tsl2561/tsl2561.c
#DEPS=DHT/pi_2_dht_read.c DHT/common_dht_read.c DHT/pi_2_mmio.c
#TARGET=main
all:main.c 
	$(CC) $(CFLAGS) -o main $(DEPS) $(DHT_DEPS) $(ADS_DEPS) $(TSL_DEPS) -lbcm2835 -lm -lwiringPi
#	$(CC) $(CFLAGS) $(DEPS)
#default: main DHT/pi_2_dht_read.c
