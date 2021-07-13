# python3.6

import random
import requests 
import json

from paho.mqtt import client as mqtt_client


broker = 'broker.emqx.io'
port = 1883
topic = "/mqtt/camera/1"
# generate client ID with pub prefix randomly
client_id = f'python-mqtt-{random.randint(0, 100)}'
# username = 'emqx'
# password = 'public'


def connect_mqtt() -> mqtt_client:
    def on_connect(client, userdata, flags, rc):
        if rc == 0:
            print("Connected to MQTT Broker!")
        else:
            print("Failed to connect, return code %d\n", rc)

    client = mqtt_client.Client(client_id)
    client.on_connect = on_connect
    client.connect(broker, port)
    return client


def subscribe(client: mqtt_client):
    def on_message(client, userdata, msg):
        #print(f"Received `{msg.payload.decode()}` from `{msg.topic}` topic")
        sendData(msg.payload.decode())

    client.subscribe(topic)
    client.on_message = on_message
    

def run():
    client = connect_mqtt()
    subscribe(client)
    client.loop_forever()

def sendData(msg):
    data = json.loads(msg)
    #Mapeo de datos de la cámara al json del post va aquí.
    postData = json.dumps(data)
    API_ENDPOINT = "http://localhost:3000/temperature"
    #print(data)
    r = requests.post(url = API_ENDPOINT, json = data) 
    # extracting response text  
    pastebin_url = r.text 
    print("The pastebin URL is:%s"%pastebin_url) 




if __name__ == '__main__':
    run()