import React, { createContext, useRef, useContext, useState } from 'react';

// Create the context
const AudioContext = createContext();

// Create a provider component
export const AudioProvider = ({ children }) => {
    const audioRef = useRef(null); // Reference for the audio element
    const [currentTime, setCurrentTime] = useState(0); // Optional state to track time

    // Function to set audio time
    const jumpToTime = (time) => {
        if (audioRef.current) {
            audioRef.current.currentTime = time;
        }
    };

    return (
        <AudioContext.Provider value={{ audioRef, currentTime, setCurrentTime, jumpToTime }}>
            {children}
        </AudioContext.Provider>
    );
};

// Hook to use the AudioContext
export const useAudio = () => useContext(AudioContext);
