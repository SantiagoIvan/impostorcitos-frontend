import { useEffect } from "react";
import {useSocket} from "@/app/services/useSocket";
import {Room, RoomEvents} from "@/shared";

export function useRoomsSocket(onUpdate: (rooms: Room[]) => void) {
    const socket = useSocket();
    useEffect(() => {
        // Escuchar evento global
        socket?.on(RoomEvents.LIST, onUpdate);

        return () => {
            socket?.off("rooms:update");
        };
    }, [onUpdate]);
}
