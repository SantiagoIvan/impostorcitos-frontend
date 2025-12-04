import { useEffect } from "react";
import {useSocket} from "@/hooks/useSocket";
import {Room, RoomEvents} from "@/shared";
import {useRoomsStore} from "@/app/store/roomsStore";

export function useRoomsSocket() {
    const {setRooms, addRoom} = useRoomsStore()
    const {socket} = useSocket();

    const handleAddRoom = (room: Room) => {
        addRoom(room);
    }
    const handleSetRooms = (rooms: Room[]) => {
        setRooms(rooms);
    }

    useEffect(() => {
        // Escuchar evento global
        socket.on(RoomEvents.LIST, handleSetRooms);
        socket.on(RoomEvents.CREATED, handleAddRoom);

        return () => {
            socket.off(RoomEvents.LIST, handleSetRooms);
            socket.off(RoomEvents.CREATED, handleAddRoom);
        };
    }, [socket, setRooms, addRoom]);
}
