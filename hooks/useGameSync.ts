import {useEffect, useState} from "react";
import {useSocket} from "@/hooks/useSocket";
import {Game, GameEvents, GamePhase, RoundResult} from "@/shared";
import {useUserStore} from "@/app/store/userStore";
import {useGameStore} from "@/app/store/gameStore";


// En este hook puedo agregar otro tipo de eventos propios de un room, como por ejemplo algun audio como cuando
// mandas 11 por el chat de Age of Empires, o votar para echar a alguno que esta afk o nose.
export function useGameSync() {
    const {socket} = useSocket();
    const { username } = useUserStore()
    const { game, setGame, setTurn } = useGameStore()
    const [roundResult, setRoundResult] = useState<RoundResult>();
    const [showResults, setShowResults] = useState<boolean>(true);
    const [allReady, setAllReady] = useState<boolean>(false);

    const emitPlayerReady = () => {
        socket.emit(GameEvents.PLAYER_READY, {username, gameId: game.id});
    }
    const emitSubmitWord = (word: string) => {
        socket.emit(GameEvents.SUBMIT_WORD, {username, gameId: game.id, word})
    }
    const emitDiscussionTimeEnded = () => {
        socket.emit(GameEvents.DISCUSSION_TURN_END, {username, gameId: game.id})
    }
    const emitSubmitVote = (target: string) => {
        socket.emit(GameEvents.SUBMIT_VOTE, {username, gameId: game.id, targetPlayer: target})
    }
    const emitNextRound = () => {
        socket.emit(GameEvents.NEXT_ROUND, {username, gameId: game.id})
    }

    const handleRoundResult = ({game, roundResult} : {game: Game, roundResult: RoundResult}) => {
        updateGame(game)
        setRoundResult(roundResult)
        setShowResults(true)
    }

    const handleStartRound = (game: Game) => {
        setAllReady(true)
        updateGame(game)
    }

    const updateGame = (game: Game) => {
        setGame(game)
        setTurn(game.currentTurn)
    }

    const handleGameAborted = (game: Game) => {
        console.log(`Game avorted: ${game}`)
    }

    useEffect(() => {
        socket.on(GameEvents.START_ROUND, handleStartRound)

        // Para las jugadas realizadas
        socket.on(GameEvents.WORD_SUBMITTED, updateGame)

        // Para votacion
        socket.on(GameEvents.VOTE_TURN, updateGame)
        socket.on(GameEvents.VOTE_SUBMITTED, updateGame)

        // Para final de ronda
        socket.on(GameEvents.ROUND_RESULT, handleRoundResult)

        // Para final abrupto de juego
        socket.on(GameEvents.END_GAME, handleGameAborted)

        return () => {
            socket.off(GameEvents.START_ROUND, handleStartRound)
            socket.off(GameEvents.WORD_SUBMITTED, updateGame)
            socket.off(GameEvents.VOTE_TURN, updateGame)
            socket.off(GameEvents.VOTE_SUBMITTED, updateGame)
            socket.off(GameEvents.ROUND_RESULT, handleRoundResult)
            socket.off(GameEvents.END_GAME, handleGameAborted)
        };
    }, [socket]);

    return {
        emitPlayerReady,
        emitSubmitWord,
        emitDiscussionTimeEnded,
        emitSubmitVote,
        emitNextRound,
        roundResult,
        showResults,
        setShowResults,
        allReady
    }
}
