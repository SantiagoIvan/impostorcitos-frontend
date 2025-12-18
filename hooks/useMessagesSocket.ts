// services/useMessagesSocket.ts
import { useEffect } from "react";
import { useSocket } from "@/hooks/useSocket";
import { useMessagesStore } from "@/app/store/messageStore";
import { MessageEvents, Message } from "@/lib"

// proximamente le agrego un room Id para poder hacerlo multiroom
export function useMessagesSocket(roomId?: string) {
    const { socket } = useSocket();
    const { addMessage } = useMessagesStore();

    const handleMessageCreated = (msg: Message) => {
        addMessage(msg);
    }
    useEffect(() => {
        if (!socket) return;

        // Escuchar nuevos mensajes creados
        socket.on(MessageEvents.CREATED, handleMessageCreated);

        return () => {
            socket.off(MessageEvents.CREATED, handleMessageCreated);
        };
    }, [socket, roomId]);
}
