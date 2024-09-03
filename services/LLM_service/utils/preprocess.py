

def split_into_articles(data, batch_size):
    """Splits data into articles."""
    return [' '.join(data[i:i + batch_size]) for i in range(0, len(data), batch_size)]