"use client"

import {ChatPanel} from "@/components/ChatPanel";
import { Button } from "@/components/ui/button";
import {useEffect, useState} from "react";
import {Room} from "@/shared";
import {useParams, useRouter} from "next/navigation";
import {useRoomsStore} from "@/app/store/roomsStore";
import {useUserStore} from "@/app/store/userStore";
import PlayersList from "@/components/PlayersList";
import {useRoomsSocket} from "@/hooks/useRoomsSocket";

const WaitingRoom = () => {
    const { roomId } = useParams();
    const { username } = useUserStore();
    const { getRoomById, rooms } = useRoomsStore();
    const [ready, setReady] = useState<boolean>(false); // para setear ready o not ready
    const router = useRouter();
    useRoomsSocket(); // equis de

    const handleBack = () => {
        router.back() // emitir user_left
    }

    const handleReady = () => {
        setReady((prevState) => !prevState); // emitir evento asi se enteran todos
    }
    const handleStart = () => {
        console.log("Game starting...") // emitir un evento
    }


    return (

            <main className="flex flex-col bg-background gap-10 w-full m-10">
                {/* Rooms Panel */}
                <div className="flex gap-4 w-full">
                    <div className="flex w-full flex-col lg:flex lg:w-1/2">
                        <PlayersList room={getRoomById(roomId)} waitingRoomFlag={true}/>
                    </div>
                    {/* Chat Panel */}
                    <div className="flex w-full flex-col lg:w-1/2">
                        <ChatPanel/>
                    </div>

                </div>
                <div className="flex gap-4 justify-around">
                    <Button onClick={handleBack}>Volver al Lobby</Button>
                    <Button onClick={handleReady}>{!ready ? "Listo!" : "Noo, banca"}</Button>
                    {username == getRoomById(roomId).admin.name && <Button onClick={handleStart}>Start</Button>}
                </div>
            </main>

    )
}

export default WaitingRoom;