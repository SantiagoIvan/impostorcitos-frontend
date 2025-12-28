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

/*
    Si tuviera mas items le mando
const items = [
    {
        key: 1,
        title: "Logout",
        url: "/",
        icon: LogOut
    }

]
{items.map((item) => (
    <SidebarMenuItem key={item.key}>
        <SidebarMenuButton asChild>
            <a href={item.url}>
                <item.icon />
                <span>{item.title}</span>
            </a>
        </SidebarMenuButton>
    </SidebarMenuItem>
))}
*/

export function AppSidebar() {
    const {username, logout} = useUserStore()

    const handleLogOut = () => {
        logout()
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