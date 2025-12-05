"use client"

import {ChatPanel} from "@/components/ChatPanel";
import { Button } from "@/components/ui/button";
import {useEffect, useState} from "react";
import {Player, Room} from "@/shared";
import {useSocket} from "@/hooks/useSocket";
import {useParams, useRouter} from "next/navigation";
import {useRoomsStore} from "@/app/store/roomsStore";
import {useUserStore} from "@/app/store/userStore";
import PlayersList from "@/components/PlayersList";

const WaitingRoom = () => {
    const { roomId } = useParams();
    const { username } = useUserStore();
    const { getRoomById } = useRoomsStore();
    const [currentRoom] = useState<Room>(() => getRoomById(typeof roomId === "string"? parseInt(roomId) : 0));
    const [ready, setReady] = useState<boolean>(false); // para el modal de creacion
    const router = useRouter();
    const {socket} = useSocket();

    useEffect(() => {
        console.log(currentRoom)
    }, [])



    const handleBack = () => {
        router.back()
    }

    const handleReady = () => {
        setReady((prevState) => !prevState);
    }
    const handleStart = () => {
        console.log("Game starting...")
    }
    return (
        <main className="flex flex-col bg-background gap-10 w-full m-10">
            {/* Rooms Panel */}
            <div className="flex gap-4 w-full">
                <div className="flex w-full flex-col lg:flex lg:w-1/2">
                    <PlayersList room={currentRoom} waitingRoomFlag={true}/>
                </div>
                {/* Chat Panel */}
                <div className="flex w-full flex-col lg:w-1/2">
                    <ChatPanel />
                </div>

            </div>
            <div className="flex gap-4 justify-around">
                <Button onClick={handleBack}>Volver al Lobby</Button>
                <Button onClick={handleReady}>{!ready? "Listo!" : "Noo, banca"}</Button>
                {username == currentRoom.admin.name && <Button onClick={handleStart}>Start</Button>}
            </div>
        </main>
    )
}

export default WaitingRoom;