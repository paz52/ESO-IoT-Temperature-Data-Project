# python 3.6

import random
import time
import json

from paho.mqtt import client as mqtt_client
import socket
import serial
hostMACAddress = 'f6:a6:b6:b0:24:f3' # The MAC address of a Bluetooth adapter on the server. The server might have multiple Bluetooth adapters.

broker = 'broker.emqx.io'
port = 1883
topic = "/mqtt/camera/1"
# generate client ID with pub prefix randomly
client_id = f'python-mqtt-{random.randint(0, 1000)}'
# username = 'emqx'
# password = 'public'

def connect_mqtt():
    def on_connect(client, userdata, flags, rc):
        if rc == 0:
            print("Connected to MQTT Broker!")
        else:
            print("Failed to connect, return code %d\n", rc)

    client = mqtt_client.Client(client_id)
    client.on_connect = on_connect
    client.connect(broker, port)
    return client


def publish(client):
    msg_count = 0

    with serial.Serial('COM3', 115200, timeout=5) as ser:
        while True:
            line = ser.readline()   
            data = line.decode("utf-8")

            if "ERROR" in data:
                print(data)
            else:
                dataArray = data.split(",")
                if len(dataArray) == 768:
                    imagen = list(map(float, dataArray))
                    print(list(imagen))
                    data = {"cameraId":1,"data":imagen}
                    msg = json.dumps(data)
                    result = client.publish(topic, msg)
                    status = result[0]
                    if status == 0:
                        print(f"Send `{msg}` to topic `{topic}`")
                    else:
                        print(f"Failed to send message to topic {topic}")

                #else:
                    #print("Invalid read:", data)

def run():
    client = connect_mqtt()
    client.loop_start()
    publish(client)


if __name__ == '__main__':
    run()