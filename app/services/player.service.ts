import {Player} from "@/lib";

export const PlayerService = {
    createPlayer: (username: string) : Player => {
        return {
            name: username,
            isReady: false,
            hasPlayed: false,
            isAlive: true,
            skipPhase: false
        }
    }
}