# Import library
import pandas as pd
from torch.utils.data import Dataset

# Tokens
U_TKN = '<usr>'
S_TKN = '<sys>'
EOS = '</s>'

# Define class
class CharDataset(Dataset):
    def __init__(self, file_path, vocab, tokenizer):
        self.data = []
        self.vocab = vocab
        self.tokenizer = tokenizer

        df = pd.read_csv(file_path, encoding='cp949')

        tmp = []

        for _, row in df.iterrows():
            q_toked = [U_TKN] + self.tokenizer(row['Q']) + [EOS]
            a_toked = [S_TKN] + self.tokenizer(row['A']) + [EOS]
            toked = q_toked + a_toked

            self.data.append(self.vocab[toked])

    def __len__(self):
        return len(self.data)

    def __getitem__(self, index):
        item = self.data[index]
        return item
