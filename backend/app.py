import io
import json
import os

import torch

from gluonnlp.data import SentencepieceTokenizer

from kogpt2.pytorch_kogpt2 import get_pytorch_kogpt2_model
from kogpt2.utils import get_tokenizer
from chat import response

from flask import Flask, jsonify, request
from flask import render_template

checkpoint_dir = 'models'
checkpoint_filename = 'KoGPT2_checkpoint.pt'

checkpoint_path = os.path.join(os.getcwd(), checkpoint_dir, checkpoint_filename)

model, vocab = get_pytorch_kogpt2_model()
model.load_state_dict(torch.load(checkpoint_path))

tok_path = get_tokenizer()
tokenizer = SentencepieceTokenizer(tok_path, num_best=0, alpha=0)

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
    a = response(msg, model, vocab, tokenizer)
    return jsonify(message=a)