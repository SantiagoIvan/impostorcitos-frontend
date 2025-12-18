import { Player, Room, Move, Vote, GamePhase, Turn} from "@/lib";

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
    currentTurn: Turn
    orderToPlay: string[]
    currentPhase: GamePhase,
    currentRound: number
}