"use client"

import {ChatPanel} from "@/components/ChatPanel";
import {RoomsPanel} from "@/components/RoomsPanel";
import { Button } from "@/components/ui/button";
import {useEffect, useState} from "react";
import {initSocket} from "@/app/services/socket.service";
import {Room, SocketEvents, RoomEvents} from "@/shared";
import {useRoomsStore} from "@/app/store/roomsStore";
import CreateRoomModal from "@/components/CreateRoomModal";
import {useRoomsSocket} from "@/hooks/useRoomsSocket";

const Lobby = () => {
    const {setRooms, addRoom, rooms} = useRoomsStore()
    const [openCreateDialog, setOpenCreateDialog] = useState(false); // para el modal de creacion
    const [openJoinDialog, setOpenJoinDialog] = useState(false); // para el modal de unirse

    useRoomsSocket((updatedRooms) => {
        setRooms(updatedRooms);
    });

    useEffect(() => {
        const socket = initSocket()
        socket.on(SocketEvents.CONNECT, () => {
            console.log("Connected!");
        })

        return () => {
            // cleanup al desmontar
            socket.off(RoomEvents.LIST);
            socket.disconnect();
        };
    }, [])

    const handleCreateRoom = () => {
        console.log("Create Room");
    }
    const handleJoinRoom = () => {
        console.log("Join Room");
    }

    return (
        <main className="flex flex-col bg-background gap-10 w-full m-10">
            {/* Rooms Panel */}
            <div className="flex gap-4 w-full">
                <div className="flex w-full flex-col lg:flex lg:w-1/2">
                    <RoomsPanel />
                </div>
                {/* Chat Panel */}
                <div className="flex w-full flex-col lg:w-1/2">
                    <ChatPanel />
                </div>

            </div>
            <div className="flex gap-4 justify-around">
                <Button onClick={() => setOpenCreateDialog(true)}>Crear sala</Button>
                <Button onClick={handleJoinRoom}>Unirse por ID</Button>
                {openCreateDialog && <CreateRoomModal open={openCreateDialog} onOpenChange={setOpenCreateDialog} />}
            </div>
        </main>
    )
}

export default Lobby;