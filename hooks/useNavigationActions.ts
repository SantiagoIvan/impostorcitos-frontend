"use client";

import { useRouter } from "next/navigation";
import { useChatPanel } from "@/hooks/useChatPanel";
import { NavActionId } from "@/components/navigation/navigation.config";
import {useState} from "react";
import {AuthService} from "@/app/services/auth.service";
import {disconnectSocket} from "@/app/services/socket.service";
import {useUserStore} from "@/app/store/userStore";
import {useRoomsStore} from "@/app/store/roomsStore";
import {useLoading} from "@/context/LoadingContext";
import {useAudio} from "@/hooks/useAudio";

export function useNavigationActions() {
    const router = useRouter();
    const [openJoinDialog, setOpenJoinDialog] = useState(false);
    const [openCreateDialog, setOpenCreateDialog] = useState(false);
    const { username, clear } = useUserStore()
    const { setRooms, clearCurrentRoom } = useRoomsStore()
    const {startLoading, stopLoading} = useLoading()
    const {ctx} = useAudio()


    const handleJoinRoomClick = () => {
        setOpenJoinDialog(true)
    }
    const handleCreateGameClick = () => {
        setOpenCreateDialog(true)
    }
    const handleLogOut = async () => {
        try{
            startLoading()
            await AuthService.logout(username)
            clear()
            disconnectSocket()
        }catch (e){
            console.log(e)
        }finally {
            stopLoading()
            router.push("/")
            setRooms([])
            clearCurrentRoom()
            ctx.stopMusic()
        }
    }

    const handleDonate = () => {
        window.open("https://cafecito.app/santudev", "_blank")
    }

    const actions: Record<NavActionId, () => void> = {
        create: handleCreateGameClick,
        join: handleJoinRoomClick,
        logout: handleLogOut,
        donate: handleDonate
    };

    return {
        actions: actions,
        openJoinDialog,
        openCreateDialog,
        setOpenCreateDialog,
        setOpenJoinDialog,
    };
}
