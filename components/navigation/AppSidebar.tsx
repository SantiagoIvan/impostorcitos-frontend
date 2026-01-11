"use client"

import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup, SidebarGroupContent,
    SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem,
} from "@/components/ui/sidebar"
import {useUserStore} from "@/app/store/userStore";
import {LogOut} from "lucide-react";
import { useRouter} from "next/navigation";
import {useRoomsStore} from "@/app/store/roomsStore";
import {disconnectSocket} from "@/app/services/socket.service";
import {AuthService} from "@/app/services/auth.service";

export function AppSidebar() {
    const {username, clear} = useUserStore()
    const {setRooms} = useRoomsStore()
    const router = useRouter()


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


    const sidebarItemProps = "h-14 px-4 text-base font-medium gap-3 cursor-pointer"

    return (
        <>
            <Sidebar>
                <SidebarHeader className="text-center font-extrabold">{username}</SidebarHeader>
                <SidebarContent>
                    <SidebarGroup>
                        <SidebarGroupContent>
                            <SidebarMenu>
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
        </>
    )
}