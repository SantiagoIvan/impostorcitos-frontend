import { io, Socket } from "socket.io-client";
import { ENV } from "@/app/config/env";
let socket: Socket | null = null;

export const getSocket = () => {
    if (!socket) {
        const userJsonString = localStorage.getItem("user-storage");
        //{"state":{"id":"X","username":"YYYYYY"},"version":0}
        const user = userJsonString ? JSON.parse(userJsonString) : { state: {id: "", username: ""}};

        console.log("ENV", ENV)

        socket = io(ENV.WS_URL!, {
            transports: ["websocket"],
            autoConnect: false,
            auth: {
                username: user.state.username,
                id: user.state.id
            }
        });
    }
    return socket;
};

export const disconnectSocket = () => {
    if(socket){
        socket.close();
        socket = null;
    }
};
