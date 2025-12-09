import { useEffect } from "react";
import {useSocket} from "@/hooks/useSocket";
import {Room, RoomEvents} from "@/shared";
import {useRoomsStore} from "@/app/store/roomsStore";
import {RoomService} from "@/app/services/room.service"


// En este hook puedo agregar otro tipo de eventos propios de un room, como por ejemplo algun audio como cuando
// mandas 11 por el chat de Age of Empires, o votar para echar a alguno que esta afk o nose.
export function useGameSync(roomId: string) {
    const {socket} = useSocket();
    const {updateRoom} = useRoomsStore()
    /*
    const handleUserReady = (room: Room) => {
        updateRoom(room);
    }

    const emitUserReady = (username: string) => {
        socket.emit(RoomEvents.READY, RoomService.createJoinRoomDto(roomId, username));
    }*/

    useEffect(() => {
        //socket.on(RoomEvents.USER_READY, handleUserReady)

        return () => {
            //socket.off(RoomEvents.USER_READY, handleUserReady);
        };
    }, [socket, roomId]);
}
