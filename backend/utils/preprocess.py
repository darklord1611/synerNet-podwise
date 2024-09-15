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


def process_keypoints(summary, keypoints):
    titles = [outline["title"] for outline in summary["outlines"]]
    index = 0

    for i in range(len(keypoints["keypoints"])):
        for j in range(len(keypoints["keypoints"][i]["keypoint"]["points"])):
            keypoints["keypoints"][i]["keypoint"]["points"][j]["title"] = titles[index]
            index += 1
    
    return keypoints