import { Player, Room, Move, Vote, PhaseGame} from "@/shared";

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
    currentPhase: PhaseGame,
    currentRound: number
}