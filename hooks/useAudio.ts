import {useContext} from "react";
import {AudioContext} from "@/context/AudioContext";

export const useAudio = () => {
    const ctx = useContext(AudioContext);

    const handleMusicClick = () => {
        ctx?.toggleMute()
    }

    if (!ctx) {
        throw new Error("useAudio must be used within AudioProvider");
    }
    return {
        ctx,
        handleMusicClick,
    };
};