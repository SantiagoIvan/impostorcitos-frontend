"use client"

import {ChatPanel} from "@/components/ChatPanel";
import {RoomsPanel} from "@/components/RoomsPanel";
import { Button } from "@/components/ui/button";
import { useState} from "react";
import CreateRoomModal from "@/components/CreateRoomModal";

const Lobby = () => {
    const [openCreateDialog, setOpenCreateDialog] = useState(false); // para el modal de creacion
    const [openJoinDialog, setOpenJoinDialog] = useState(false); // para el modal de unirse con algun codigo falopa


    const handleJoinRoom = () => {
        console.log("Join Room");
    }

    return (
        <main className="flex flex-col bg-background gap-10 w-full m-10 h-full">
            {/* Rooms Panel */}
            <div className="flex gap-4 w-full h-[75dvh]">
                <div className="flex w-full flex-col lg:flex lg:w-1/2">
                    <RoomsPanel />
                </div>
                {/* Chat Panel */}
                <div className="flex w-full flex-col lg:w-1/2 ">
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