

def split_into_articles(data, batch_size):
    """Splits data into articles."""
    if batch_size == 1:
        return data
    return [' '.join(data[i:i + batch_size]) for i in range(0, len(data), batch_size)]


def preprocess_chunks(data):
    total_chunks = data['utterances'][-1]['transcript'][-1]['chunk'] + 1
    chunks = ["" for _ in range(total_chunks)]
    timestamps = []

    for part in data['utterances']:
        for entry in part['transcript']:
            if chunks[entry['chunk']] == "":
                timestamps.append(part['start'])
            chunks[entry['chunk']] += " " + entry['text']

    chunks = [chunk.strip() for chunk in chunks]

    transcripts = {"transcript": [{"chunk": i, "timestamp": timestamps[i], "text": chunk} for i, chunk in enumerate(chunks)]}

    return transcripts