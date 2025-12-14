import {useEffect, useState} from "react";
import {useSocket} from "@/hooks/useSocket";
import {Game, GameEvents, RoundResult} from "@/shared";
import {useUserStore} from "@/app/store/userStore";
import {useGameStore} from "@/app/store/gameStore";


// En este hook puedo agregar otro tipo de eventos propios de un room, como por ejemplo algun audio como cuando
// mandas 11 por el chat de Age of Empires, o votar para echar a alguno que esta afk o nose.
export function useGameSync() {
    const {socket} = useSocket();
    const { username } = useUserStore()
    const { game, setGame } = useGameStore()
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
        setGame(game)
        setRoundResult(roundResult)
        setShowResults(true)
    }

    const handleAllReady = () => {
        setAllReady(true)
    }


    useEffect(() => {
        socket.on(GameEvents.ALL_READY, handleAllReady)

        // Para las jugadas realizadas
        socket.on(GameEvents.WORD_INPUT_TURN, (game: Game) => { setGame(game) })
        socket.on(GameEvents.WORD_SUBMITTED, (game: Game) => { setGame(game) })

        // Para votacion
        socket.on(GameEvents.VOTE_TURN, (game: Game) => { setGame(game) })
        socket.on(GameEvents.VOTE_SUBMITTED, (game: Game) => { setGame(game) })

        // Para final de ronda
        socket.on(GameEvents.ROUND_RESULT, handleRoundResult)

        // Para final abrupto de juego
        socket.on(GameEvents.END_GAME, () => {
            console.log("Se aborto la sesion de juego")
        })

        return () => {
            socket.off(GameEvents.ALL_READY, handleAllReady)
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
