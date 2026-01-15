"use client";

import { Volume2, VolumeX } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAudio } from "@/hooks/useAudio";

export const MuteButton = () => {
    const { ctx: {muted}, handleMusicClick } = useAudio();

    return (
        <Button
            variant="ghost"
            size="icon"
            onClick={handleMusicClick}
            aria-label="Mute audio"
        >
            {muted ? <VolumeX /> : <Volume2 />}
        </Button>
    );
};
