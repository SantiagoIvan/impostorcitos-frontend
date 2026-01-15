"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { audioService } from "@/app/services/AudioService";

type AudioContextType = {
    muted: boolean;
    toggleMute: () => void;
    playClick: () => void;
    playLobbyMusic: () => void;
    playGameMusic: () => void;
    stopMusic: () => void;
    playWinEffect: () => void;
    playLoseEffect: () => void;
};

export const AudioContext = createContext<AudioContextType | null>(null);

export const AudioProvider = ({ children }: { children: React.ReactNode }) => {
    const [muted, setMuted] = useState(false);


    useEffect(() => {
        audioService.loadSfx();
        const handleClick = () => {
            audioService.playSfx("click");
        };

        document.addEventListener("click", handleClick);

        return () => {
            document.removeEventListener("click", handleClick);
        };
    }, []);

    const toggleMute = () => {
        const next = !muted;
        setMuted(next);
        audioService.setMuted(next);
    };

    return (
        <AudioContext.Provider
            value={{
                muted,
                toggleMute,
                playClick: () => audioService.playSfx("click"),
                playLobbyMusic: () =>
                    audioService.playMusic("/audio/music/lobby.mp3"),
                playGameMusic: () =>
                    audioService.playMusic("/audio/music/suspense.mp3"),
                stopMusic: () =>
                    audioService.stopMusic(),
                playWinEffect: () => audioService.playSfx("win"),
                playLoseEffect: () => audioService.playSfx("lose"),
            }}
        >
            {children}
        </AudioContext.Provider>
    );
};
