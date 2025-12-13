import { useEffect } from "react";
import {useSocket} from "@/hooks/useSocket";
import {Game, GameEvents} from "@/shared";
import {useUserStore} from "@/app/store/userStore";
import {useGameStore} from "@/app/store/gameStore";


// En este hook puedo agregar otro tipo de eventos propios de un room, como por ejemplo algun audio como cuando
// mandas 11 por el chat de Age of Empires, o votar para echar a alguno que esta afk o nose.
export function useGameSync(handleAllReady :() => void) {
    const {socket} = useSocket();
    const { username } = useUserStore()
    const { game, setGame } = useGameStore()


    const emitPlayerReady = () => {
        socket.emit(GameEvents.PLAYER_READY, {username, gameId: game.id});
    }
    const emitSubmitWord = (word: string) => {
        console.log("Enviando word: ", word)
        socket.emit(GameEvents.SUBMIT_WORD, {username, gameId: game.id, word})
    }
    const emitDiscussionTimeEnded = () => {
        console.log("Enviando turno de discusion terminado")
        socket.emit(GameEvents.DISCUSSION_TURN_END, {username, gameId: game.id})
    }
    const emitSubmitVote = (target: string) => {
        socket.emit(GameEvents.SUBMIT_VOTE, {username, gameId: game.id, targetPlayer: target})
    }


    useEffect(() => {
        socket.on(GameEvents.ALL_READY, handleAllReady)

        // Para las jugadas realizadas
        socket.on(GameEvents.WORD_INPUT_TURN, (game: Game) => {console.log("Recibi word Input Turn", game); setGame(game)})
        socket.on(GameEvents.WORD_SUBMITTED, (game: Game) => {
            console.log("Recibi word submitted", game);
            setGame(game)
        })

        // Para votacion
        socket.on(GameEvents.VOTE_TURN, (game: Game) => {console.log("Vote time: ", game); setGame(game)})

        // Para condicion de victoria
        socket.on(GameEvents.VOTE_SUBMITTED, (game: Game) => {console.log("Vote submitted", game); setGame(game)})

        return () => {
            socket.off(GameEvents.ALL_READY, handleAllReady)
        };
    }, [socket]);

    return {
        emitPlayerReady,
        emitSubmitWord,
        emitDiscussionTimeEnded,
        emitSubmitVote
    }
}
