import torch

def response(msg, model, vocab, tokenizer):
	
	# Tokens
	U_TKN = '<usr>'
	S_TKN = '<sys>'
	EOS = '</s>'

	msg_tokenized = tokenizer(msg)

	a = ''
	a_tokenized = []

	while 1:
		# Set up input with previous outputs
		input_ids = torch.LongTensor(
			[vocab[U_TKN]] 
			+ vocab[msg_tokenized] 
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

	return a