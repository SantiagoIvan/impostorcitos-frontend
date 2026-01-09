import { RoomDto, Move, VoteDto, GamePhase, Turn} from "@/lib";

export interface GameDto {
    id: string
    room: RoomDto
    topic: string
    secretWord?: string
    moves: Move[],
    votes: VoteDto[],
    impostor: boolean,
    impostorWonTheGame: boolean,
    nextTurnIndexPlayer: number,
    currentTurn: Turn
    orderToPlay: string[]
    currentPhase: GamePhase,
    currentRound: number
    aborted?: boolean
}