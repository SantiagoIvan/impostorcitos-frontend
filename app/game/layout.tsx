import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/AppSidebar"
import {ProtectedLayout} from "@/components/ProtectedLayout";

export default function GameLayout({ children }: { children: React.ReactNode }) {
    return (
        <ProtectedLayout>
            <SidebarProvider>
                <AppSidebar />
                <SidebarTrigger />
                {children}
            </SidebarProvider>
        </ProtectedLayout>
    );
}