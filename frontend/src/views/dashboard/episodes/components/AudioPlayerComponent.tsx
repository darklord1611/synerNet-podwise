import React, { useRef, useImperativeHandle, forwardRef } from 'react';
import AudioPlayer from 'react-h5-audio-player';
import 'assets/css/player.css';

interface AudioPlayerComponentProps {
    episode: Espisode
}

export interface AudioPlayerRef {
    handleSeek: (time: number) => void;
}

export const AudioPlayerComponent = forwardRef<AudioPlayerRef, AudioPlayerComponentProps>(
    ({ episode }, ref) => {
        const playerRef = useRef<AudioPlayer | null>(null);

        useImperativeHandle(ref, () => ({
            handleSeek: (time: number) => {
                if (playerRef.current?.audio.current) {
                    playerRef.current.audio.current.currentTime = time;
                }
            }
        }));

        return (
            <AudioPlayer
                ref={playerRef}
                style={{ 
                    width: '800px', 
                    margin: 'auto',
                    position: 'fixed',
                    zIndex: 1000,
                    bottom: 5,
                    left: '50%',
                    transform: 'translateX(-40%)',
                }}
                layout='horizontal-reverse'
                header={`${episode.name} - ${episode.podcastName}`}
                autoPlay
                src="https://traffic.megaphone.fm/GLT5025099642.mp3?updated=1511216902"
                onPlay={e => console.log("onPlay")}
                // other props here
            />
        );
    }
);
