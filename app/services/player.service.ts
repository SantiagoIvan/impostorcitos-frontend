import {PlayerDto} from "@/lib";

export const PlayerService = {
    createPlayer: (username: string) : PlayerDto => {
        return {
            name: username,
            isReady: false,
            hasPlayed: false,
            isAlive: true,
            skipPhase: false
        }
    }
}