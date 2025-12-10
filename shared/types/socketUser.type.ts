import {Socket} from "socket.io-client";

export interface SocketUser {
    socket: Socket;
    username: string;
}