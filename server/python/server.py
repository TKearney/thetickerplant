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

#handle websocket connections
connections = set()
n=0

async def recvSensor():
    data = conn.recv(BUFFER_SIZE)
    #print(data)
    if not data:
        print('not data')
        conn.shutdown(1)
        conn.close()
        connectUpstream()
    return data.decode()

data = recvSensor()
#conn, addr = s.accept()
#print('Connection address:', addr)
# WS server that sends messages at random intervals
import asyncio
import datetime
import random
import websockets
async def handler(websocket, path):
    #global n
    #n=n+1
    connections.add(websocket)
    #print("adding subscriber #", n)
    #try:
        #async for msg in websocket:
            #pass  # ignore
    #except websockets.ConnectionClosed:
        #pass
    #finally:
        #print("removing subscriber #", n)
        #connections.remove(websocket)
    print(connections)
    #data = recvSensor()
    #await websocket.send(data.decode())
    await asyncio.sleep(0.001)
    while True:
        await asyncio.sleep(0.01)
        #now = datetime.datetime.utcnow().isoformat() + 'Z'
        #await websocket.send(now)
        #await asyncio.sleep(random.random() * 3)
        #data = conn.recv(BUFFER_SIZE)
        #print(data)
        data = await recvSensor()
       #  = data.decode()
        print(data)
        #await websocket.send(data.decode())
        for websocket in connections:
            if not websocket.open:
                connections.remove(websocket)
                break                
            await websocket.send(data)

async def wsSend():
    print('wssend')
    asyncio.get_event_loop().run_forever()
    while True:
        print('recv data')
        await recvSensor()
        print(connections)
        for websocket in connections:
            websocket.send(recvSensor())
print('starting server')
start_server = websockets.serve(handler, '0.0.0.0', 5009)
print('A')
asyncio.get_event_loop().run_until_complete(start_server)
print('B')
asyncio.get_event_loop().run_forever()
    
print('C')

#loop = asyncio.get_event_loop()
#loop.run_until_complete(wsSend())
#print('D')
#loop.run_forever()
#print('E')
#try:
    #asyncio.ensure_future(wsSend())
    #data = asyncio.async(recvSensor())
    #wsSend()
    #loop.run_forever()
#except KeyboardInterrupt:
    #pass
#finally:
    #print('closing loop')
    #loop.close()
#asyncio.get_event_loop().run_forever()


#while 1:
    #data = recvSensor()

#    if not data: break
#    print(data.decode())
    #conn.send(data)  # echo
#conn.close()
