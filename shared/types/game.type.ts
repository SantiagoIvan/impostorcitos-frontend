import { Player, Room, Move, Vote, GamePhase} from "@/shared";

export interface Game {
    id: string
    room: Room
    topic: string
    secretWord: string
    activePlayers: Player[]
    impostor: string
    moves: Move[],
    votes: Vote[],
    impostorWonTheGame: boolean,
    nextTurnIndexPlayer: number,
    orderToPlay: string[]
    currentPhase: GamePhase,
    currentRound: number
}