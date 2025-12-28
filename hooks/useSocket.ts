import { useEffect, useState } from "react";
import { getSocket } from "@/app/services/socket.service";

export const useSocket = () => {
    /*
        como no voy a modificarlo, ignoro el segundo elemento del useState que seria el setSocket.
        Si a useState acepta una funcion inicializadora. La ejecuta solo una vez cuando el componente se monta y no lo vuelve a ejecutar en cada rerender, lo cual
        termina siendo re util cuando tenemos un singleton dando vueltas. Getsocket es lo que devuelve la instancia del singleton
        y me asegura que me lo crea una sola vez
     */
    const [socket] = useState(() => getSocket());
    const [connected, setConnected] = useState(socket.connected);

    useEffect(() => {
        if (!socket.connected) socket.connect();

        const onConnect = () => setConnected(true);
        const onDisconnect = () => setConnected(false);

        socket.on("connect", onConnect);
        socket.on("disconnect", onDisconnect);

        return () => {
            socket.off("connect", onConnect);
            socket.off("disconnect", onDisconnect);
            // No desconectes si la app sigue activa
        };
    }, [socket]);

    const disconnect = () => socket.disconnect();

    return { socket, connected, disconnect };
};
