import { PlayerDto, RoomDto, Move, Vote, GamePhase, Turn} from "@/lib";

export interface Game {
    id: string
    room: RoomDto
    topic: string
    secretWord: string
    activePlayers: PlayerDto[]
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