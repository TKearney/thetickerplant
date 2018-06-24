#!/usr/bin/env python
import time
#TCP stuff
import socket
TCP_IP = '0.0.0.0'
TCP_PORT = 5008
BUFFER_SIZE = 80  # Normally 1024, but we want fast response
#global s
#print('binding')
#s.bind((TCP_IP, TCP_PORT))
#s.listen(1)
def connectUpstream():
    print('Connecting to upstream server')
    s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    print('binding')
    bound = False
    while not bound:
        try:
            s.bind((TCP_IP, TCP_PORT))
            bound = True
        except:
            print('Could not bind. Sleeping 1s and trying again.')
            time.sleep(1)
            pass
    s.listen(1)
    print('Bound. Awaiting connection...')
    global conn, addr
    conn, addr = s.accept()
    print('Connection address: ',addr)
    print('connection : ', conn)

connectUpstream()

def recvSensor():
    data = conn.recv(BUFFER_SIZE)
    if not data:
        print('not data')
        conn.shutdown(1)
        conn.close()
        connectUpstream()
    return data

#conn, addr = s.accept()
#print('Connection address:', addr)
# WS server that sends messages at random intervals
import asyncio
import datetime
import random
import websockets
async def sensor(websocket, path):
    while True:
        #now = datetime.datetime.utcnow().isoformat() + 'Z'
        #await websocket.send(now)
        #await asyncio.sleep(random.random() * 3)
        #data = conn.recv(BUFFER_SIZE)
        #print(data)
        data = recvSensor()
        print(data)
        await websocket.send(data.decode())

start_server = websockets.serve(sensor, '0.0.0.0', 5009)

asyncio.get_event_loop().run_until_complete(start_server)
asyncio.get_event_loop().run_forever()


#while 1:
#    data = conn.recv(BUFFER_SIZE)
#    if not data: break
#    print(data.decode())
    #conn.send(data)  # echo
#conn.close()
