

def split_into_articles(data, batch_size):
    """Splits data into articles."""
    if batch_size == 1:
        return data
    return [' '.join(data[i:i + batch_size]) for i in range(0, len(data), batch_size)]


def preprocess_chunks(data):
    total_chunks = data['utterances'][-1]['transcript'][-1]['chunk'] + 1

    chunks = ["" for _ in range(total_chunks)]

    for part in data['utterances']:
        for piece in part['transcript']:
            chunks[piece['chunk']] += ' ' + piece['text']
    
    chunks = [chunk.strip() for chunk in chunks]

    return chunks