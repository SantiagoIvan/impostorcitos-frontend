"use client"

import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup, SidebarGroupContent,
    SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem,
} from "@/components/ui/sidebar"
import {useUserStore} from "@/app/store/userStore";
import {LogOut, PlusCircle} from "lucide-react";
import {usePathname, useRouter} from "next/navigation";
import {useRoomsStore} from "@/app/store/roomsStore";
import {useState} from "react";
import CreateRoomModal from "@/components/CreateRoomModal";
import JoinRoomModal from "@/components/JoinRoomModal";

export function AppSidebar() {
    const {username, logout} = useUserStore()
    const {setRooms} = useRoomsStore()
    const router = useRouter()
    const pathname = usePathname()
    const [openCreateDialog, setOpenCreateDialog] = useState(false)
    const [openJoinDialog, setOpenJoinDialog] = useState(false)

    const isLobby = () => pathname === "/game/lobby"
    const handleLogOut = () => {
        try{
            logout()
        }catch (e){
            console.log(e)
        }finally {
            router.push("/")
            setRooms([])
        }
    }

    const handleCreateGame = () => {
        setOpenCreateDialog(true)
    }
    const sidebarItemProps = "h-14 px-4 text-base font-medium gap-3 cursor-pointer"
    const handleJoinRoom = () => {
        setOpenJoinDialog(true)
    }



    return (
        <>
            <Sidebar>
                <SidebarHeader className="text-center font-extrabold">{username}</SidebarHeader>
                <SidebarContent>
                    <SidebarGroup>
                        <SidebarGroupContent>
                            <SidebarMenu>
                                {
                                    isLobby() && (
                                        <>
                                            <SidebarMenuItem>
                                                <SidebarMenuButton
                                                    onClick={handleCreateGame}
                                                    className={sidebarItemProps}
                                                >
                                                    <PlusCircle />
                                                    <span>Crear partida</span>
                                                </SidebarMenuButton>
                                            </SidebarMenuItem>
                                            <SidebarMenuItem>
                                                <SidebarMenuButton
                                                    onClick={handleJoinRoom}
                                                    className={sidebarItemProps}
                                                >
                                                    <PlusCircle />
                                                    <span>Unirse</span>
                                                </SidebarMenuButton>
                                            </SidebarMenuItem>
                                        </>
                                )}
                                <SidebarMenuItem >
                                    <SidebarMenuButton className={sidebarItemProps} onClick={handleLogOut}>
                                        <LogOut />
                                        <span>Logout</span>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            </SidebarMenu>
                        </SidebarGroupContent>
                    </SidebarGroup>
                </SidebarContent>
                <SidebarFooter />
            </Sidebar>
            {openCreateDialog && <CreateRoomModal open={openCreateDialog} onOpenChange={setOpenCreateDialog} />}
            {openJoinDialog && <JoinRoomModal open={openJoinDialog} setOpen={setOpenJoinDialog} />}
        </>
    )
}