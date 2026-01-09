import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/navigation/AppSidebar"
import {ProtectedLayout} from "@/components/ProtectedLayout";
import {BottomBar} from "@/components/navigation/BottomBar";
import {ChatPanelProvider} from "@/context/ChatPanelContext";

export default function GameLayout({ children }: { children: React.ReactNode }) {
    return (
        <ProtectedLayout>
            <ChatPanelProvider>
                <SidebarProvider>
                    <div className="hidden md:block">
                        <AppSidebar />
                    </div>
                    {/* Header / trigger solo desktop */}
                    <div className="hidden md:block">
                        <SidebarTrigger />
                    </div>
                    <main className="flex-1 px-20 pb-16 md:pb-10 md:mx-auto">
                        {children}
                    </main>
                    {/* Bottom bar solo mobile */}
                    <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden">
                        <BottomBar />
                    </div>
                </SidebarProvider>
            </ChatPanelProvider>
        </ProtectedLayout>
    );
}