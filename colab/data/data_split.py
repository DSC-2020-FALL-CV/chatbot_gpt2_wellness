import pandas as pd
import numpy as np

df = pd.read_csv('newChatbotData.csv', encoding='cp949')
df['split'] = np.random.randn(df.shape[0], 1)

msk = np.random.rand(len(df)) <= 0.7

train = df[msk]
test = df[~msk]

train.to_csv('train.csv', index = False, encoding='cp949')
test.to_csv('test.csv', index = False, encoding='cp949')