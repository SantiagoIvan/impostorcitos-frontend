import { useEffect } from "react";
import {useSocket} from "@/hooks/useSocket";
import {JoinRoomDto, RoomDto, RoomEvents} from "@/lib";
import {useRoomsStore} from "@/app/store/roomsStore";

export function useRoomsSocket() {
    const {setRooms, addRoom, updateRoom} = useRoomsStore()
    const {socket} = useSocket();

    const handleAddRoom = (room: RoomDto) => {
        addRoom(room);
    }
    const handleSetRooms = (rooms: RoomDto[]) => {
        setRooms(rooms);
    }
    const handleNewPlayerJoined = (room: RoomDto) => {
        updateRoom(room);
    }
    const handleUserLeft = (room: RoomDto) => {
        updateRoom(room);
    }

    const emitLeaveEvent = (outcomingPlayer: JoinRoomDto) => {
        socket.emit(RoomEvents.LEAVE, outcomingPlayer);
    }

    useEffect(() => {
        // Escuchar evento global
        socket.on(RoomEvents.LIST, handleSetRooms);
        socket.on(RoomEvents.CREATED, handleAddRoom);
        socket.on(RoomEvents.JOINED, handleNewPlayerJoined);
        socket.on(RoomEvents.USER_LEFT, handleUserLeft);


        return () => {
            socket.off(RoomEvents.LIST, handleSetRooms);
            socket.off(RoomEvents.CREATED, handleAddRoom);
            socket.off(RoomEvents.JOINED, handleNewPlayerJoined);
            socket.off(RoomEvents.USER_LEFT, handleUserLeft);
        };
    }, [socket, setRooms, addRoom]);

    return { emitLeaveEvent }
}
