"use client"

import {useEffect, useState} from "react";
import CreateRoomModal from "@/components/CreateRoomModal";
import JoinRoomModal from "@/components/JoinRoomModal";
import {Button} from "@/components/ui/button";
import CafecitoBtn from "@/components/CafecitoBtn";
import {useSocket} from "@/hooks/useSocket";
import {ENV} from "@/app/config/env";
import {useAudio} from "@/hooks/useAudio";
import {Badge} from "@/components/ui/badge";
import {useUserStore} from "@/app/store/userStore";

const Lobby = () => {
    const [openCreateDialog, setOpenCreateDialog] = useState(false)
    const [openJoinDialog, setOpenJoinDialog] = useState(false)
    const socket = useSocket()
    const {username} = useUserStore()

    const handleJoinRoom = () => {
        setOpenJoinDialog(true)
    }
    const handleCreateGame = () => {
        setOpenCreateDialog(true)
    }

    useEffect(() => {
        console.log(ENV)
        console.log("socket conectado:", socket.connected)
    }, []);

    return (
        <>
            <div className="flex min-h-screen items-center justify-center px-4">
                <div className="flex w-full max-w-md flex-col gap-6 ">
                    <div className="flex justify-center">
                        <Badge variant="secondary" className="text-sm">
                            Logueado como: <span className="ml-1 font-medium">{username}</span>
                        </Badge>
                    </div>
                    <Button
                        size="lg"
                        className="h-16 text-lg sm:text-xl"
                        onClick={handleCreateGame}
                    >
                        Crear partida
                    </Button>

                    <Button
                        size="lg"
                        variant="outline"
                        className="h-16 text-lg sm:text-xl"
                        onClick={handleJoinRoom}
                    >
                        Unirse
                    </Button>
                    <CafecitoBtn classname="mt-10"/>
                </div>
            </div>
            <CreateRoomModal open={openCreateDialog} onOpenChange={setOpenCreateDialog} />
            <JoinRoomModal open={openJoinDialog} setOpen={setOpenJoinDialog} />
        </>
    )
}

export default Lobby;