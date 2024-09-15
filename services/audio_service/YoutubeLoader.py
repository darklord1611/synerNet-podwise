import yt_dlp
import os

def download_audio_from_youtube(video_url, output_format='wav', output_dir='./data'):
    if not os.path.exists(output_dir):
        os.makedirs(output_dir)

    output_file_template = os.path.join(output_dir, 'audio')
    ydl_opts = {
        'format': 'bestaudio',  # Tải xuống chất lượng âm thanh tốt nhất
        'outtmpl': output_file_template,  # Cố định tên file đầu ra
        'postprocessors': [{
            'key': 'FFmpegExtractAudio',
            'preferredcodec': output_format,  # Chuyển đổi sang định dạng .wav
            'preferredquality': '192',
        }],
        'cookiefile': "./cookies.txt",
        'ffmpeg-location': './ffmpeg',
        'noplaylist': True
    }

    # Thực thi tải xuống
    with yt_dlp.YoutubeDL(ydl_opts) as ydl:
        result = ydl.download([video_url])

    downloaded_files = ydl.prepare_filename({
        'title': 'unknown',
        'ext': output_format
    })
    downloaded_files = downloaded_files+ "." + output_format
    print(f"Trích xuất âm thanh hoàn tất! File đã được lưu tại: {downloaded_files}")
    return downloaded_files