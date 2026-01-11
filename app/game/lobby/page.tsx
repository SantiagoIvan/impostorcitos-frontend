"use client"

import {useState} from "react";
import CreateRoomModal from "@/components/CreateRoomModal";
import JoinRoomModal from "@/components/JoinRoomModal";

const Lobby = () => {
    const [openCreateDialog, setOpenCreateDialog] = useState(false)
    const [openJoinDialog, setOpenJoinDialog] = useState(false)

    const handleJoinRoom = () => {
        setOpenJoinDialog(true)
    }
    const handleCreateGame = () => {
        setOpenCreateDialog(true)
    }

    return (
        <>

            <CreateRoomModal open={openCreateDialog} onOpenChange={setOpenCreateDialog} />
            <JoinRoomModal open={openJoinDialog} setOpen={setOpenJoinDialog} />
            {/* Rooms Panel
            <div className="flex gap-4 w-full h-[85dvh]">
                <div className="flex w-full flex-col lg:flex lg:w-1/2">
                    <RoomsPanel />
                </div>
            */}
            {/* Chat Panel
                <div className="flex w-full flex-col lg:w-1/2 ">
                    <ChatPanel />
                </div>
            </div>
            */}
        </>
    )
}

export default Lobby;