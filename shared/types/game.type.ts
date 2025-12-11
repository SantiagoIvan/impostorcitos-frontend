import {Round, Player, Room} from "@/shared";

export interface Game {
    id: string
    room: Room
    topic: string
    secretWord: string
    activePlayers: Player[]
    impostor: string
    rounds: Round[]
    impostorWonTheGame: boolean,
    nextTurnIndexPlayer: number
}