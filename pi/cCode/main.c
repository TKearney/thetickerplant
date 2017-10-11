
#include "DHT/pi_2_dht_read.h"
#include "tsl2561/tsl2561.h"
#include <stdlib.h>
#include <bcm2835.h>
#include <stdio.h>
#include <ctype.h>
#include <unistd.h>
#include <string.h>
#include <math.h>
#include <errno.h>
#include <netdb.h>
#include <sys/types.h>
#include <netinet/in.h>
#include <sys/socket.h>
#include <arpa/inet.h>
//#include <wiringPi.h>
#include <wiringSerial.h>

//int tsl_add=0x29;
//char *i2c_device = "/dev/i2c-1";
//void *tsl = tsl2561_init(tsl_add, i2c_device);

#define PORT "5001" /* the port client will be connecting to */
#define MAXDATASIZE 100 /* max number of bytes we can get at once */

#define tsl_add 0x29
char *i2c_device = "/dev/i2c-1";

int mhz19_handle;
char mhz19_cmd[9] = {0xFF,0x01,0x86,0x00,0x00,0x00,0x00,0x00,0x79};
char mhz19_cmd2[9];
	float hum, airTemp;
	int32_t adc[8];
	int ch0, IR,ppm;
	long lux;


//Socket inits:
    int sockfd, numbytes, new_fd;  /* listen on sock_fd, new connection on new_fd */
    char buf[MAXDATASIZE];
    struct addrinfo hints, their_addr, *servinfo, *p;
    int rv;
    char s[INET6_ADDRSTRLEN];
        socklen_t sin_size;


/* get sockaddr, IPv4 or IPv6: */
void *get_in_addr(struct sockaddr *sa)
{
    if (sa->sa_family == AF_INET) {
        return &(((struct sockaddr_in*)sa)->sin_addr);
    }

    return &(((struct sockaddr_in6*)sa)->sin6_addr);
}
int socket_connect(void){

    memset(&hints, 0, sizeof hints);
    hints.ai_family = AF_INET;
    hints.ai_socktype = SOCK_STREAM;

    if ((rv = getaddrinfo("localhost", PORT, &hints, &servinfo)) != 0) {
        fprintf(stderr, "getaddrinfo: %s\n", gai_strerror(rv));
        return 1;
    }

    //* loop through all the results and connect to the first we can */
    for(p = servinfo; p != NULL; p = p->ai_next) {
        if ((sockfd = socket(p->ai_family, p->ai_socktype,
                p->ai_protocol)) == -1) {
            perror("client: socket");
            continue;
        }

        if (connect(sockfd, p->ai_addr, p->ai_addrlen) == -1) {
            close(sockfd);
            perror("client: connect");
            continue;
        }

        break;
    }

    if (p == NULL) {
        fprintf(stderr, "client: failed to connect\n");
        return 2;
    }

    inet_ntop(p->ai_family, get_in_addr((struct sockaddr *)p->ai_addr),
            s, sizeof s);
    printf("client: connecting to %s\n", s);

    freeaddrinfo(servinfo); /* all done with this structure */

        printf("Up to here... \n");
         /* ----------------------------------------------
                sin_size = sizeof their_addr;
        new_fd = accept(sockfd, (struct sockaddr *)&their_addr, &sin_size);
        if (new_fd == -1) {
            perror("accept");
            /* continue;
        }
                */
        inet_ntop(their_addr.ai_family,
                /* inet_ntop(their_addr.ss_family, */
            get_in_addr((struct sockaddr *)&their_addr),
            s, sizeof s);
        printf("server: got connection from %s\n", s);

        //if (!fork()) { // this is the child process
            //close(sockfd); // child doesn't need the listener
            if (send(sockfd, "Administrator:password\3\0", 24, 0) == -1)
                perror("send");

        if ((numbytes = recv(sockfd, buf, MAXDATASIZE-1, 0)) == -1) {
        perror("recv");
        exit(1);
    }
    return 0;
}
int sendData(){

    //char test[] = {0x010000000d000000fa01000000};
    //0x01 - little endian
    //000000
    //19000000 - message length
    //00 - type (list)
    //00 - attributes
    //01000000 - list length (1)
    //04 - type (byte vector)
    //00 - attributes
    //05000000 - vector length (5)
    //0001020304 - the 5 bytes
	const char *src = "0100000087000000000003000000f52e752e75706400f56d6574726963730000000d000000f090b1a26968300000f56368696c693100fa00000000fa00000000fa00000000f70000000000000000f70000000000000000f70000000000000000f70000000000000000f70000000000000000f70000000000000000fb0000f70000000000000000";
	//const char *src = "010000001f000000000003000000f573657400f56100f90200000000000000";
	//char endian,fill,typeList,typeSym,totalLen,list1Len,cols,attrib,time,sym,lux,visIR,IR,UV,humidity,airTemp,waterTemp,pH,EC,co2,weight;
	//const char *src = "0011223344";
	//endian = 0x01;
	//fill = 0x000000;
	//totalLen = 0x43;
	//cols = 0x04;
	//attrib = 0x00;
	//list1Len = 0x03000000;
	char buffer[135];
	char *dst = buffer;
	char *end = buffer + sizeof(buffer);
	unsigned int u;
	uint8_t i;

	while (dst < end && sscanf(src, "%2x", &u) == 1)
	{
        *dst++ = u;
        src += 2;
	}

	for (dst = buffer; dst < end; dst++){
		printf("%d: %c (%d, 0x%02x)\n", dst - buffer,
			(isprint(*dst) ? *dst : '.'), *dst, *dst);	
	}
    //{0x01, 0x00, 0x00, 0x00, 0x23, 0x00, 0x00, 0x00, 0x00, 0x00, 0x03, 0x00, 0x00, 0x00, 0x0a, 0x00, 0x03, 0x00, 0x00, 0x00, 0x73, 0x65, 0x74, 0xf5, 0x61, 0x00, 0xf9, 0x02, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00}
    //char test[] = {0x01, 0x00, 0x00, 0x00, 0x23, 0x00, 0x00, 0x00, 0x00, 0x00, 0x03, 0x00, 0x00, 0x00, 0x0a, 0x00, 0x03, 0x00, 0x00, 0x00, 0x73, 0x65, 0x74, 0xf5, 0x61, 0x00, 0xf9, 0x02, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00};
	//char test[] = {0x01,0x00,0x00,0x00,0x43,0x00,0x00,0x00,0x00,0x00,0x03,0x00,0x00,0x00,0xf5,0x2e,0x75,0x2e,0x75,0x70,0x64,0x00,0xf5,0x74,0x61,0x62,0x00,0x00,0x00,0x04,0x00,0x00,0x00,0xf5,0x63,0x68,0x69,0x6c,0x69,0x00,0xf0,0xd8,0x0c,0xe2,0xa6,0x32,0x2d,0x00,0x00,0xf9,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0xf7,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00};
	//(`.u.upd;`tab;(`chili1;.z.n;0j;0f));          
	//if (send(sockfd, test, 32, 0) == -1)
	//buffer[55] = 0x01;
	//char luxArray[4];
	//sprintf(luxByte, "%ld", lux);
	// convert from an unsigned long int to a 4-byte array
	//luxArray[3] = (int)((lux >> 24) & 0xFF) ;
	//luxArray[2] = (int)((lux >> 16) & 0xFF) ;
	//luxArray[1] = (int)((lux >> 8) & 0XFF);
	//luxArray[0] = (int)((lux & 0XFF));
	char lux_pos,visIR_pos,IR_pos,UV_pos,humidity_pos,airTemp_pos,waterTemp_pos,pH_pos,EC_pos,co2_pos,weight_pos,Ki,Kf,Ks;
	lux_pos=55;
	visIR_pos=60;
	IR_pos=65;
	UV_pos=70;
	humidity_pos=79;
	airTemp_pos=88;
	waterTemp_pos=97;
	pH_pos=106;
	EC_pos=115;
	co2_pos=124;
	weight_pos=127;
	Ki=4;
	Kf=8;
	Ks=2;
	
	double humidity=hum;
	char humByte[sizeof(double)];
	memcpy(humByte, &humidity, sizeof(double));
	double air=airTemp;
	char airByte[sizeof(double)];
	memcpy(airByte, &air, sizeof(double));
	

	//char *p;
	//p=buffer[lux_pos];
	//p*=lux;
	for (i=0;i<Ki;i++){
		buffer[lux_pos+i] = (int)((lux >> 8*i) & 0xFF) ;
		printf("luxByte = %d, 0x%02x \r\n", buffer[lux_pos+i]);
	}
	
	for (i=0;i<Ki;i++){
		buffer[IR_pos+i] = (int)((IR >> 8*i) & 0xFF) ;
		printf("IR = %d \r\n", buffer[IR_pos+i]);
	}
	for (i=0;i<Kf;i++){
		//buffer[humidity_pos+i] = (int)((((long)humidity) >> 8*i) & 0xFF) ;
		buffer[humidity_pos+i] = (int)humByte[i];
		printf("humidity = %d \r\n", buffer[humidity_pos+i]);
	}
	for (i=0;i<Kf;i++){
	//	buffer[airTemp_pos+i] = (int)((((int32_t)airTemp) >> 8*i) & 0xFF) ;
		buffer[airTemp_pos+i] = (int)airByte[i];
		printf("airTemp = %d \r\n", buffer[airTemp_pos+i]);
	}
	for (i=0;i<Ks;i++){
		buffer[co2_pos+i] = (int)((ppm >> 8*i) & 0xFF) ;
		printf("co2 = %d \r\n", buffer[co2_pos+i]);
	}
	for (i=0;i<sizeof(buffer);i++){
		printf("buff = %d: %c (%d, 0x%02x)\n", buffer[i]);
	}
        //if (send(sockfd, test, sizeof(test), 0) == -1)
        if (send(sockfd, buffer, sizeof(buffer), 0) == -1)
                perror("send");
        /* ----------------------------------------------*/

    //if ((numbytes = recv(sockfd, buf, MAXDATASIZE-1, 0)) == -1) {
    //    perror("recv");
    //    exit(1);
    //}

    buf[numbytes] = '\0';

    printf("client: received '%s'\n",buf);

	return 0;

}

void tsl_init(void *tsl){

	tsl2561_enable_autogain(tsl);
	tsl2561_set_integration_time(tsl, TSL2561_INTEGRATION_TIME_13MS);
	if(tsl == NULL){//Check is error is present
	exit(1);
	}

}

void mh_z19_init(void){
	if ((mhz19_handle = serialOpen ("/dev/ttyS0", 9600)) < 0) // uses wiringSerial
	{
		printf("Unable to open device");
		return 1;
	} else
	{
		printf("ttyS0 initialized ok\n");
	}
	printf("CO2 UART is running\n");
	
}


int main(void){
	uint8_t i;
	void *tsl = tsl2561_init(tsl_add, i2c_device);
	socket_connect();
	tsl_init(tsl);
	ads1256_init();
	mh_z19_init();
	//delay(2000);
	while(1){
		delay(2000);
		write(mhz19_handle,mhz19_cmd,9);
		read(mhz19_handle,mhz19_cmd2,9);
		printf("mh z19 reading done\n");
		ppm = (256*((int) mhz19_cmd2[2]))+((int)mhz19_cmd2[3]);
		printf("ppm = %i \n", ppm);
	
		tsl2561_luminosity(tsl, &ch0, &IR);
		lux = tsl2561_compute_lux(tsl, ch0, IR);
		tsl2561_gain_normalize(tsl, &ch0, &IR);
		printf("lux %lu, ch0: %i, IR: %i \r\n", lux, ch0, IR);
		usleep(3 * 100 * 1000);


		//int32_t adc;

		ads1256_read(6, &adc);
		for (i=0; i<8; i++)
		{
			printf("ADC %i is : %i\r\n",i, adc[i]);
		}

		pi_2_dht_read(22, 23, &hum, &airTemp);
		printf("humidity is: %f and temp is %f", hum, airTemp);
		sendData();
	}

	close(sockfd);

	ads1256_end();
	tsl2561_close(tsl);
	i2c_device = NULL;

	return 0;

}
