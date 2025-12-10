import { useEffect } from "react";
import {useSocket} from "@/hooks/useSocket";
import {Game, Room, RoomEvents} from "@/shared";
import {useRoomsStore} from "@/app/store/roomsStore";
import {RoomService} from "@/app/services/room.service"
import {useRouter} from "next/navigation";
import {useGameStore} from "@/app/store/gameStore";


// En este hook puedo agregar otro tipo de eventos propios de un room, como por ejemplo algun audio como cuando
// mandas 11 por el chat de Age of Empires, o votar para echar a alguno que esta afk o nose.
export function useWaitingRoomSocket(roomId: string) {
    const {socket} = useSocket();
    const {updateRoom} = useRoomsStore()
    const {setGame} = useGameStore()
    const router = useRouter()

    const handleUserReady = (room: Room) => {
        updateRoom(room);
    }
    const handleGameStarting = (newGame : Game) => {
        setGame(newGame)
        router.push(`/game/match/${newGame.id}`);
    }

    const emitUserReady = (username: string) => {
        socket.emit(RoomEvents.READY, RoomService.createJoinRoomDto(roomId, username));
    }
    const emitStartGame = (roomId: string) => {
        socket.emit(RoomEvents.START_GAME, roomId);
    }

    useEffect(() => {
        socket.on(RoomEvents.USER_READY, handleUserReady)
        socket.on(RoomEvents.REDIRECT_TO_GAME, handleGameStarting)

        return () => {
            socket.off(RoomEvents.USER_READY, handleUserReady);
            socket.off(RoomEvents.REDIRECT_TO_GAME, handleGameStarting);
        };
    }, [socket, roomId]);

    return {emitUserReady, emitStartGame}
}
