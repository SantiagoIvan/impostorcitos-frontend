"use client"

import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup, SidebarGroupContent,
    SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem,
} from "@/components/ui/sidebar"
import {useUserStore} from "@/app/store/userStore";
import {usePathname} from "next/navigation";

import {getNavigationItems} from "@/components/navigation/navigation.config";
import {useNavigationActions} from "@/hooks/useNavigationActions";

export function AppSidebar() {
    const {username} = useUserStore()
    const pathname = usePathname()
    const items = getNavigationItems(pathname).filter((item) =>
        item.visible(pathname)
    );
    const {actions} = useNavigationActions()

    const sidebarItemProps = "h-14 px-4 text-base font-medium gap-3 cursor-pointer"

    return (
        <>
            <Sidebar>
                <SidebarHeader className="text-center font-extrabold">{username}</SidebarHeader>
                <SidebarContent>
                    <SidebarGroup>
                        <SidebarGroupContent>
                            <SidebarMenu>
                                {items.map(({ id, label, icon: Icon }) => (
                                    <SidebarMenuItem key={id} >
                                        <SidebarMenuButton className={`${sidebarItemProps} ${id === "logout" && "text-destructive"}`} onClick={actions[id]}>
                                            <Icon className="h-5 w-5" />
                                            <span className="leading-none">{label}</span>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                ))}
                            </SidebarMenu>
                        </SidebarGroupContent>
                    </SidebarGroup>
                </SidebarContent>
                <SidebarFooter />
            </Sidebar>
        </>
    )
}