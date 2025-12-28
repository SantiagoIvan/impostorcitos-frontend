import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/AppSidebar"
import {ProtectedRoute} from "@/components/ProtectedRoute";

export default function GameLayout({ children }: { children: React.ReactNode }) {
    return (
        <ProtectedRoute>
            <SidebarProvider>
                <AppSidebar />
                <SidebarTrigger />
                {children}
            </SidebarProvider>
        </ProtectedRoute>
    );
}