import { useEffect } from "react";
import {useSocket} from "@/hooks/useSocket";
import {Game, GameEvents, Room, RoomEvents} from "@/shared";
import {useRoomsStore} from "@/app/store/roomsStore";
import {RoomService} from "@/app/services/room.service"
import {PlayerService} from "@/app/services/player.service";
import {useUserStore} from "@/app/store/userStore";


// En este hook puedo agregar otro tipo de eventos propios de un room, como por ejemplo algun audio como cuando
// mandas 11 por el chat de Age of Empires, o votar para echar a alguno que esta afk o nose.
export function useGameSync(roomId: string, handleAllReady :() => void) {
    const {socket} = useSocket();
    const {updateRoom} = useRoomsStore()
    const { username } = useUserStore()


    const emitPlayerReady = () => {
        socket.emit(GameEvents.PLAYER_READY, RoomService.createJoinRoomDto(roomId, username));
    }

    /*
    const emitUserReady = (username: string) => {
        socket.emit(RoomEvents.READY, RoomService.createJoinRoomDto(roomId, username));
    }*/

    useEffect(() => {
        socket.on(GameEvents.ALL_READY, handleAllReady)

        return () => {
            socket.off(GameEvents.ALL_READY, handleAllReady)
        };
    }, [socket, roomId]);

    return {
        emitPlayerReady,
    }
}
