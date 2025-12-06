import {Player} from "@/shared";

export const PlayerService = {
    createPlayer: (username: string) : Player => {
        return {
            name: username,
            isReady: false,
        }
    }
}