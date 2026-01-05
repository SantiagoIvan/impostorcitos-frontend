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
import {useRouter} from "next/navigation";
import {useRoomsStore} from "@/app/store/roomsStore";

export function AppSidebar() {
    const {username, logout} = useUserStore()
    const {setRooms} = useRoomsStore()
    const router = useRouter()

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

    return (
        <Sidebar>
            <SidebarHeader className="text-center font-extrabold">{username}</SidebarHeader>
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            <SidebarMenuItem >
                                <SidebarMenuButton onClick={handleLogOut}>
                                    <LogOut className="h-5 w-5" />
                                    <span>Logout</span>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
            <SidebarFooter />
        </Sidebar>
    )
}