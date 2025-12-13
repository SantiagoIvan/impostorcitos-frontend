import {defaultRoom, PhaseGame} from "@/shared";

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
    currentPhase: PhaseGame.PLAY,
    currentRound: 0
}