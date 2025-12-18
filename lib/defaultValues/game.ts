import {defaultRoom, GamePhase} from "@/lib";

export const defaultGame = {
    id: "",
    room: defaultRoom,
    topic: "",
    secretWord: "",
    activePlayers: [],
    impostor: "",
    moves: [],
    votes: [],
    impostorWonTheGame: false,
    nextTurnIndexPlayer: 0,
    currentTurn: {duration: 0, player: "", startedAt: 0},
    orderToPlay: [],
    currentPhase: GamePhase.PLAY,
    currentRound: 0
}