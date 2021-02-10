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
datafile_filename = 'newChatbotData.csv'

checkpoint_path = os.path.join(os.getcwd(), checkpoint_dir, checkpoint_filename)
datafile_path = os.path.join(os.getcwd(), datafile_dir, datafile_filename)

# Hyperparameters
learning_rate = 3e-5
epochs = 3
batch_size = 128

# GPU availability
device = torch.device('cuda:0' if torch.cuda.is_available() else 'cpu')

# Model
model, vocab = get_pytorch_kogpt2_model()

try:
	model.load_state_dict(torch.load(checkpoint_path))

except:
	print("Unable to find checkpoint. If you saved checkpoint before, check checkpoint_path")

try:
	# Tokenizer
	tok_path = get_tokenizer()
	sentencepieceTokenizer = SentencepieceTokenizer(tok_path)

	# Dataset
	dataset = CharDataset(datafile_path, vocab, sentencepieceTokenizer)
	dataloader = DataLoader(dataset, batch_size=batch_size, shuffle=True, pin_memory=True)

	# Optimizer
	optimizer = torch.optim.Adam(model.parameters(), lr=learning_rate)

	# Train loop
	for epoch in range(epochs):

		for data in dataloader:

			optimizer.zero_grad()

			data = torch.stack(data)
			data = data.transpose(1,0)
	
			data = data.to(device)
			moedl = model.to(device)
	
			outputs = model(data, labels=data)
			loss, logits = outputs[:2]

			loss = loss.to(device)
	
			loss.backward()
	
			optimizer.step()

		if epoch % 2 == 0:
			print('epoch no.{0} loss = {1:.4f}'.format(epoch, loss))

	# Save
	model.to('cpu')
	torch.save(model.state_dict(), checkpoint_path)

except:
	print("Unable to find data files.")
