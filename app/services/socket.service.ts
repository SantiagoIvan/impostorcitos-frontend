import { io, Socket } from "socket.io-client";
const WS_URL = process.env.NEXT_PUBLIC_BACKEND_WS;

let socket: Socket | null = null;

// Aca ta el singleton
export const getSocket = () => {
    if (!socket) {
        socket = io(WS_URL!, {
            transports: ["websocket"],
            autoConnect: false
        });
    }
    return socket;
};
