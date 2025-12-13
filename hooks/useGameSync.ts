import { useEffect } from "react";
import {useSocket} from "@/hooks/useSocket";
import { GameEvents} from "@/shared";
import {useUserStore} from "@/app/store/userStore";
import {useGameStore} from "@/app/store/gameStore";


// En este hook puedo agregar otro tipo de eventos propios de un room, como por ejemplo algun audio como cuando
// mandas 11 por el chat de Age of Empires, o votar para echar a alguno que esta afk o nose.
export function useGameSync(handleAllReady :() => void) {
    const {socket} = useSocket();
    const { username } = useUserStore()
    const { game } = useGameStore()


    const emitPlayerReady = () => {
        socket.emit(GameEvents.PLAYER_READY, {username, gameId: game.id});
    }
    const handleWordInputTurn = (username: string) => {
        console.log("Le toca a ", username)
    }

    useEffect(() => {
        socket.on(GameEvents.ALL_READY, handleAllReady)

        // Para las jugadas realizadas
        socket.on(GameEvents.WORD_INPUT_TURN, handleWordInputTurn)


        // Para discusion

        // Para votacion

        // Para condicion de victoria

        return () => {
            socket.off(GameEvents.ALL_READY, handleAllReady)
        };
    }, [socket]);

    return {
        emitPlayerReady,
    }
}
