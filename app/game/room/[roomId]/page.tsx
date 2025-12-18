"use client"

import {ChatPanel} from "@/components/ChatPanel";
import { Button } from "@/components/ui/button";
import {useEffect, useState} from "react";
import {useParams, useRouter} from "next/navigation";
import {useRoomsStore} from "@/app/store/roomsStore";
import {useUserStore} from "@/app/store/userStore";
import PlayersList from "@/components/PlayersList";
import {useRoomsSocket} from "@/hooks/useRoomsSocket";
import { RoomService } from "@/app/services/room.service";
import {useWaitingRoomSocket} from "@/hooks/useWaitingRoomSocket";
import {Player} from "@/lib";
import {toast} from "sonner";

const WaitingRoom = () => {
    const {roomId} = useParams<{roomId: string}>();
    const { username } = useUserStore();
    const { getRoomById } = useRoomsStore();
    const [ready, setReady] = useState<boolean>(false); // para setear ready o not ready
    const router = useRouter();
    const {emitLeaveEvent} = useRoomsSocket();
    const { emitUserReady, emitStartGame } = useWaitingRoomSocket(roomId)
    const MIN_PLAYERS_QUANTITY = process.env.NEXT_PUBLIC_MIN_PLAYERS_QTY as unknown as number;

    const handleBack = () => {
        emitLeaveEvent(RoomService.createJoinRoomDto(roomId, username));
        router.push("/game/lobby")
    }

    const handleReady = () => {
        setReady((prevState) => !prevState); // emitir evento asi se enteran todos
        emitUserReady(username)
    }
    const handleStart = () => {
        const currentRoom = getRoomById(roomId);
        if(currentRoom.players.some((player: Player) => !player.isReady )) {
            toast.error("Todos deben estar listos");
        }else if (currentRoom.players.length < MIN_PLAYERS_QUANTITY) {
            toast.error(`Debe haber un minimo de ${MIN_PLAYERS_QUANTITY} jugadores para comenzar`);
        } else {
            toast.message("Redireccionando a la partida...")
            emitStartGame(roomId); // En useWaitingRoomSocket tengo el listener para accionar cuando me llega el evento
        }
    }

    useEffect(() => {
        console.log("Pegarle al backend para ver si existe este roomId y sino hacer redirect")

    }, [roomId]);

    return (

            <main className="flex flex-col bg-background gap-10 w-full m-10">
                {/* Rooms Panel */}
                <div className="flex gap-4 w-full">
                    <div className="flex w-full flex-col lg:flex lg:w-1/2">
                        <PlayersList room={getRoomById(roomId)} waitingRoomFlag={true}/>
                    </div>
                    {/* Chat Panel */}
                    <div className="flex w-full flex-col lg:w-1/2">
                        <ChatPanel roomId={roomId}/>
                    </div>

                </div>
                <div className="flex gap-4 justify-around">
                    <Button onClick={handleBack}>Volver al Lobby</Button>
                    <Button onClick={handleReady}>{!ready ? "Listo!" : "Noo, banca"}</Button>
                    {username == getRoomById(roomId).admin && <Button onClick={handleStart}>Start</Button>}
                </div>
            </main>

    )
}

export default WaitingRoom;