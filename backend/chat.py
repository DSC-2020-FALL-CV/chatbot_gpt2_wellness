# Import library
import os
import torch
import torch.nn.functional as F
from gluonnlp.data import SentencepieceTokenizer
from kogpt2.pytorch_kogpt2 import get_pytorch_kogpt2_model
from kogpt2.utils import get_tokenizer

# File path
checkpoint_dir = 'models'
checkpoint_filename = 'KoGPT2_checkpoint.pt'

checkpoint_path = os.path.join(os.getcwd(), checkpoint_dir, checkpoint_filename)

# Load Model, tokenizer
model, vocab = get_pytorch_kogpt2_model()

try:
	model.load_state_dict(torch.load(checkpoint_path))

except:
	print("Unable to find checkpoint. If you don't have pre-trained model, run train code first.")

# Tokens
U_TKN = '<usr>'
S_TKN = '<sys>'
EOS = '</s>'

# Get toeknizer
tok_path = get_tokenizer()
tokenizer = SentencepieceTokenizer(tok_path, num_best=0, alpha=0)

# Chat loop
while 1:
	# Get user input
	q = input('user > ').strip()

	# Break condition
	if q == 'quit':
		break

	# Tokenize user input
	q_tokenized = tokenizer(q)

	# Variables to hold model output
	a = ''
	a_tokenized = []

	while 1:
		# Set up input with previous outputs
		input_ids = torch.LongTensor(
			[vocab[U_TKN]] 
			+ vocab[q_tokenized] 
			+ vocab[EOS, S_TKN]
			+ vocab[a_tokenized]).unsqueeze(dim=0)

		# Generate output
		logits, _ = model(input_ids)
		gen = vocab.to_tokens(torch.argmax(logits, dim=-1).squeeze().numpy().tolist())[-1]

		# Break condition
		if gen == EOS:
			break
		
		# Tokenize model output
		a += gen.replace('▁', ' ')
		a_tokenized = tokenizer(a)
	
	print("model > {}".format(a.strip()))
