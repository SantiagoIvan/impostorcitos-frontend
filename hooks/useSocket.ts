import { useEffect, useState } from "react";
import { getSocket } from "@/app/services/socket.service";
import {useRouter} from "next/navigation";
import {useUserStore} from "@/app/store/userStore";

export const useSocket = () => {
    /*
        como no voy a modificarlo, ignoro el segundo elemento del useState que seria el setSocket.
        Si a useState acepta una funcion inicializadora. La ejecuta solo una vez cuando el componente se monta y no lo vuelve a ejecutar en cada rerender, lo cual
        termina siendo re util cuando tenemos un singleton dando vueltas. Getsocket es lo que devuelve la instancia del singleton
        y me asegura que me lo crea una sola vez
     */
    const [socket] = useState(() => getSocket());
    const [connected, setConnected] = useState(socket.connected);
    const router = useRouter()
    const {clear, setServerOffset} = useUserStore()

    const onabortSession = () => {
        clear()
        router.replace("/");
    }

    useEffect(() => {
        if (!socket.connected) socket.connect();
        console.log("Socket connected: ", socket.connected);

        const onConnect = () => setConnected(true);
        const onDisconnect = () => setConnected(false);
        const handleServerTime = ({serverNow}: {serverNow: number}) => {
            console.log("ServerNow: ", serverNow);
            const offset = serverNow - Date.now();
            console.log("offset: ", offset);
            setServerOffset(offset);

        };

        socket.on("connect", onConnect);
        socket.on("disconnect", onDisconnect);
        socket.on("abort_session", onabortSession);
        socket.on("SERVER_TIME", handleServerTime);

        return () => {
            socket.off("connect", onConnect);
            socket.off("disconnect", onDisconnect);
        };
    }, [socket]);

    const disconnect = () => socket.disconnect();

    return { socket, connected, disconnect };
};
