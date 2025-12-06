import { useEffect } from "react";
import {useSocket} from "@/hooks/useSocket";
import {useRoomsStore} from "@/app/store/roomsStore";

export function useWaitingRoomSocket(roomId?: string) {
    const {socket} = useSocket();



    useEffect(() => {
        // Aca escucharia por los ready y todo eso


        return () => {

        };
    }, [socket, roomId]);
}
