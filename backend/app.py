import io
import json

from flask import Flask, jsonify, request
from flask import render_template

app = Flask(__name__)

host_addr = "0.0.0.0"
port_num = "5000"

if __name__ == '__main__':
    app.run(host=host_addr, port = port_num)

@app.route('/')
def hello_world():
    return 'hello, world!'


@app.route('/message', methods=['POST'])
def getmessage():
    inputs = request.get_json()
    msg = inputs['message']
    print(msg)
    return jsonify(message= msg + "에게 message from flask")