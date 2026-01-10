"use client";

import { useRouter } from "next/navigation";
import { useChatPanel } from "@/hooks/useChatPanel";
import { NavActionId } from "@/components/navigation/navigation.config";
import {useState} from "react";
import {AuthService} from "@/app/services/auth.service";
import {disconnectSocket} from "@/app/services/socket.service";
import {useUserStore} from "@/app/store/userStore";
import {useRoomsStore} from "@/app/store/roomsStore";

export function useNavigationActions() {
    const router = useRouter();
    const { toggle: toggleChat } = useChatPanel();
    const [openJoinDialog, setOpenJoinDialog] = useState(false);
    const [openCreateDialog, setOpenCreateDialog] = useState(false);
    const {isOpen, close} = useChatPanel()
    const { username, clear } = useUserStore()
    const { setRooms } = useRoomsStore()


    const handleJoinRoomClick = () => {
        setOpenJoinDialog(true)
    }
    const handleCreateGameClick = () => {
        setOpenCreateDialog(true)
    }
    const handleLogOut = async () => {
        try{
            await AuthService.logout(username)
            clear()
            disconnectSocket()
        }catch (e){
            console.log(e)
        }finally {
            router.push("/")
            setRooms([])
        }
    }
    const actions: Record<NavActionId, () => void> = {
        create: handleCreateGameClick,
        join: handleJoinRoomClick,
        chat: toggleChat,
        logout: handleLogOut,
    };

    return {
        actions: actions,
        openJoinDialog,
        openCreateDialog,
        setOpenCreateDialog,
        setOpenJoinDialog,
        isOpen,
        close
    };
}
