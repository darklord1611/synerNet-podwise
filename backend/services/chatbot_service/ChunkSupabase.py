from supabase import create_client, Client
import json
from config import SUPABASE_KEY, SUPABASE_URL
supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY)


# Lấy dữ liệu từ bảng 'json_data'
def get_json_data(table_name):
    response = supabase.table(table_name).select("*").execute()
    if response.data:
        print("Data fetched successfully")
        # Ghi dữ liệu vào file JSON
        with open("responsedata.json", "w") as f:
            json.dump(response.data, f, indent=4)
        return response.data
    else:
        print("Error fetching data:", response)

def transform(data):
    out = []
    tmp_data = data.copy()
    print(tmp_data)
    tmp_data = tmp_data[0]['transcript']
    for utt in tmp_data['utterances']:
        utt_text = ''
        for sentence in utt['transcripts']:
            utt_text += sentence + ' '
        out.append({'start': utt['start'], 'end': utt['end'], 'text': utt_text, 'speaker': utt['speaker']})
    return out

def create_chunk_for_rag(data, chunk_size = 250):
    chunks = []
    chunk = {'start': data[0]['start'], 'end': data[0]['end'], 'text': data[0]['text'], 'speaker': data[0]['speaker']}
    for utt in data:
        if len(chunk['text'].split(' ')) + len(utt['text'].split(' ')) > chunk_size:
            chunks.append(chunk)
            chunk = {'start': utt['start'], 'end': utt['end'], 'text': utt['text'], 'speaker': utt['speaker']}
        else:
            chunk['end'] = utt['end']
            chunk['text'] += utt['text']

    with open("chunks.json", "w") as f:
        json.dump(chunks, f, indent=4)

    return chunks


# Gọi các hàm trên
if __name__ == "__main__":
    # Lấy dữ liệu từ bảng
    data = get_json_data("episode_summaries")
    out = transform(data)
    chunks = create_chunk_for_rag(out, 250)


