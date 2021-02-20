# Import library
import os
import torch
from torch.utils.data import DataLoader
from gluonnlp.data import SentencepieceTokenizer
from kogpt2.pytorch_kogpt2 import get_pytorch_kogpt2_model
from kogpt2.utils import get_tokenizer
from dataset import CharDataset

# File path
checkpoint_dir = 'models'
checkpoint_filename = 'KoGPT2_checkpoint.pt'

datafile_dir = 'data'
train_datafile_filename = 'train.csv'
val_datafile_filename = 'val.csv'

checkpoint_path = os.path.join(os.getcwd(), checkpoint_dir, checkpoint_filename)

train_datafile_path = os.path.join(os.getcwd(), datafile_dir, train_datafile_filename)
val_datafile_path = os.path.join(os.getcwd(), datafile_dir, val_datafile_filename)

# Hyperparameters
learning_rate = 3e-5
epochs = 100
batch_size = 256
overfitting_check_limit = 3

# GPU availability
device = torch.device('cuda:0' if torch.cuda.is_available() else 'cpu')

# Model
model, vocab = get_pytorch_kogpt2_model()

try:
	model.load_state_dict(torch.load(checkpoint_path))

except:
	print("Unable to find checkpoint. If you saved checkpoint before, check checkpoint_path")

model = model.to(device)

# Tokenizer
tok_path = get_tokenizer()
sentencepieceTokenizer = SentencepieceTokenizer(tok_path, num_best=0, alpha=0)

# Dataset
train_dataset = CharDataset(train_datafile_path, vocab, sentencepieceTokenizer)
train_dataloader = DataLoader(train_dataset, batch_size=batch_size, shuffle=True, pin_memory=True)
	
val_dataset = CharDataset(val_datafile_path, vocab, sentencepieceTokenizer)
val_dataloader = DataLoader(val_dataset, batch_size=batch_size, shuffle=False, pin_memory=True)

# Optimizer
optimizer = torch.optim.Adam(model.parameters(), lr=learning_rate)

count = 0
past_val_loss = 0

# Train loop
for epoch in range(epochs):
	sum_train_loss = 0
	sum_val_loss = 0
	
	for train_data in train_dataloader:

		optimizer.zero_grad()

		train_data = torch.stack(train_data)
		train_data = train_data.transpose(1,0)

		train_data = train_data.to(device)
	
		outputs = model(train_data, labels=train_data)
		train_loss, _ = outputs[:2]

		sum_train_loss += train_loss

		train_loss = train_loss.to(device)
	
		train_loss.backward()
	
		optimizer.step()

	with torch.no_grad():
		for val_data in val_dataloader:

			val_data = torch.stack(val_data)
			val_data = val_data.transpose(1,0)
	
			val_data = val_data.to(device)
	
			outputs = model(val_data, labels=val_data)
			val_loss, _ = outputs[:2]

			sum_val_loss += val_loss

	print('epoch no.{0} sum_train_loss = {1:.4f}, sum_val_loss = {2:.4f}'.format(epoch, sum_train_loss, sum_val_loss))

	if(past_val_loss < sum_val_loss):
		count = count + 1
	else:
		count = 0

	past_val_loss = sum_val_loss

	if(count >= overfitting_check_limit):
		print("Early stopping.")
		break

# Save
model.to('cpu')
torch.save(model.state_dict(), checkpoint_path)
