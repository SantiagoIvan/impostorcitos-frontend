"use client";

import { useEffect, useState } from "react";
import {getSocket, initSocket} from "./socket.service";

export function useSocket() {
    const [socket] = useState(() => getSocket());

    useEffect(() => {
        if(!socket) initSocket();
        if (!socket?.connected) socket?.connect();

        return () => {
            // No lo desconectamos si queremos que sea global,
            // solo removemos listeners locales.
            socket?.removeAllListeners();
        };
    }, [socket]);

    return socket;
}
