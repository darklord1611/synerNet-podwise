

def split_into_articles(data, batch_size):
    """Splits data into articles."""
    if batch_size == 1:
        return data
    return [' '.join(data[i:i + batch_size]) for i in range(0, len(data), batch_size)]