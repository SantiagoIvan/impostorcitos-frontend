import { useEffect } from "react";
import {useSocket} from "@/hooks/useSocket";
import {JoinRoomDto, RoomEvents} from "@/shared";
import {useRoomsStore} from "@/app/store/roomsStore";
import {useUserStore} from "@/app/store/userStore";

export function useWaitingRoomSocket(roomId?: string) {
    const {username} = useUserStore()
    const {addNewPlayerToRoom} = useRoomsStore()
    const {socket} = useSocket();

    const handleNewPlayerJoined = (newPlayer: JoinRoomDto) => {
        console.log("Joined", newPlayer);
        console.log("me", username);
    }

    useEffect(() => {
        // Escuchar evento global
        socket.on(RoomEvents.JOINED, handleNewPlayerJoined);
        socket.emit(RoomEvents.JOIN, {roomId, username});

        return () => {
            socket.off(RoomEvents.JOINED, handleNewPlayerJoined);
        };
    }, [socket, roomId]);
}
