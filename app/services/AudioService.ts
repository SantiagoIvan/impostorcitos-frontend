import { Howl, Howler } from "howler";

class AudioService {
    private music: Howl | null = null;
    private sfx: Record<string, Howl> = {};
    private muted = false;

    constructor() {
        Howler.volume(0.5);
    }

    loadSfx() {
        this.sfx.click = new Howl({ src: ["/audio/sfx/click.mp3"] });
        this.sfx.win = new Howl({ src: ["/audio/sfx/win.wmp3"] });
        this.sfx.lose = new Howl({ src: ["/audio/sfx/lose.mp3"] });
    }

    playSfx(name: keyof typeof this.sfx) {
        if (!this.muted) {
            this.sfx[name]?.play();
        }
    }

    playMusic(src: string) {
        if (this.music) {
            this.music.stop();
        }

        this.music = new Howl({
            src: [src],
            loop: true,
            volume: 0.3,
        });

        if (!this.muted) {
            this.music.play();
        }
    }

    stopMusic() {
        this.music?.stop();
        this.music = null;
    }

    setMuted(value: boolean) {
        this.muted = value;
        Howler.mute(value);
    }

    isMuted() {
        return this.muted;
    }
}

export const audioService = new AudioService();
