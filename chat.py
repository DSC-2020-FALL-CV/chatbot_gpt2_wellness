import argparse
import logging

import gluonnlp as nlp
import numpy as np
import pandas as pd
import torch
from gluonnlp.data import SentencepieceTokenizer
from kogpt2.pytorch_kogpt2 import get_pytorch_kogpt2_model
from kogpt2.utils import get_tokenizer
from pytorch_lightning import Trainer
from pytorch_lightning.callbacks import ModelCheckpoint
from pytorch_lightning.core.lightning import LightningModule
from torch.utils.data import DataLoader, Dataset
from transformers.optimization import AdamW, get_cosine_schedule_with_warmup
from definitions import KoGPT2Chat

model_path = 'model/kogpt2_chatbot.ckpt'

model = KoGPT2Chat.load_from_checkpoint(model_path)

model.chat()
