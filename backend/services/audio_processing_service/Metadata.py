from pytube import YouTube
import yt_dlp

def download_metadata(url):
    # Tạo đối tượng YouTube
    try:
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
    except Exception as e:
        print(e)
        return None
    

def download_metadata_v2(video_url):
    try:
        # Define options for yt-dlp
        ydl_opts = {
            'quiet': True,  # Suppress console output
            'skip_download': True,  # Skip downloading the video
            'cookiefile': "./cookies.txt",  # Use cookies if necessary
        }

        # Use yt-dlp to fetch metadata
        with yt_dlp.YoutubeDL(ydl_opts) as ydl:
            info = ydl.extract_info(video_url, download=False)
        
        # Extract desired metadata
        metadata = {
            'title': info.get('title'),
            'description': info.get('description'),
            'author': info.get('uploader'),
            'publish_date': info.get('upload_date'),
            'length': info.get('duration'),  # In seconds
        }

        # Print metadata
        print("Metadata:", metadata)
        return metadata

    except Exception as e:
        print(f"An error occurred: {e}")
        return None

if __name__ == "__main__":
    download_metadata('https://www.youtube.com/watch?v=0LCgem1OAcE')