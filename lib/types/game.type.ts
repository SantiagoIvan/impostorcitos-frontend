import { RoomDto, Move, Vote, GamePhase, Turn} from "@/lib";

export interface GameDto {
    id: string
    room: RoomDto
    topic: string
    secretWord?: string
    moves: Move[],
    votes: Vote[],
    impostorWonTheGame: boolean,
    nextTurnIndexPlayer: number,
    currentTurn: Turn
    orderToPlay: string[]
    currentPhase: GamePhase,
    currentRound: number
}