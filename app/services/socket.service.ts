"use client"

import { io, Socket } from "socket.io-client";

const WS_URL = process.env.NEXT_PUBLIC_BACKEND_WS;


let socket: Socket | null = null;

export function initSocket() {
    if(!socket){
        socket = io(WS_URL, {
            transports: ["websocket"]
        });
    }
    if(!socket.connected){
        socket.connect();
    }
    return socket;
}

export function getSocket() {
    return socket;
}
