import os
import yt_dlp
from config import FFMPEG_PATH

def download_audio_from_youtube(video_url, output_format='wav', output_dir='./data'):
    if not os.path.exists(output_dir):
        os.makedirs(output_dir)

    # Define the output file template with an appropriate extension
    output_file_template = os.path.join(output_dir, 'audio.%(ext)s')

    # Update yt-dlp options
    ydl_opts = {
        'format': 'bestaudio/best',  # Ensure the best audio format
        'outtmpl': output_file_template,  # Dynamic output filename
        'postprocessors': [{
            'key': 'FFmpegExtractAudio',
            'preferredcodec': output_format,  # Convert to specified audio format
            'preferredquality': '192',  # Audio quality
        }],
        'cookiefile': "./cookies.txt",  # Use cookies if necessary
        'ffmpeg-location': FFMPEG_PATH,  # Specify ffmpeg location
        'noplaylist': True,  # Only download a single video, not a playlist
        'extractor-args': 'youtube:player_client=web',  # Override player client to prevent API issues
        'rm-cache-dir': True,  # Clear yt-dlp cache to avoid stale data
        'verbose': True,  # Enable verbose output for debugging
    }

    try:
        # Execute download
        with yt_dlp.YoutubeDL(ydl_opts) as ydl:
            ydl.download([video_url])

        # Construct downloaded file name
        downloaded_file = os.path.join(output_dir, f"audio.{output_format}")
        print(f"Audio extraction complete! File saved at: {downloaded_file}")
        return downloaded_file

    except Exception as e:
        print(f"An error occurred during the download: {e}")
        return None
