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

parser = argparse.ArgumentParser(description='Simsimi based on KoGPT-2')

parser.add_argument('--sentiment',
                    type=str,
                    default='0',
                    help='sentiment for system. 0 is neutral, 1 is negative, 2 is positive.')

parser.add_argument('--max-epochs', type=int, default=2)

parser = KoGPT2Chat.add_model_specific_args(parser)
parser = Trainer.add_argparse_args(parser)
args = parser.parse_args()

checkpoint_callback = ModelCheckpoint(
            filepath='model/kogpt2_chatbot',
            verbose=True,
            save_last=True,
            monitor='loss',
            mode='min'
        )

model = KoGPT2Chat(args)
model.train()
trainer = Trainer.from_argparse_args(args,checkpoint_callback=checkpoint_callback, gradient_clip_val=1.0)
trainer.fit(model)
