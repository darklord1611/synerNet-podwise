from pytube import YouTube

def download_metadata(url):
    # Tạo đối tượng YouTube
    video = YouTube(url)
    # Lấy metadata
    metadata = {
        'title': video.title,
        'length': video.length,  # Độ dài video (giây)
        'description': video.description,
        'publish_date': video.publish_date,
        'author': video.author,
    }
    print(metadata)
    return metadata

if __name__ == "__main__":
    download_metadata('https://www.youtube.com/watch?v=0LCgem1OAcE')
