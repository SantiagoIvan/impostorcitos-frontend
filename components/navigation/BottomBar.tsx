"use client";

import { LogOut, PlusCircle, LogIn } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export function BottomBar() {
    const pathname = usePathname();
    const router = useRouter();

    const isLobby = pathname === "/game/lobby";

    const handleLogout = () => {
        // lógica de logout (ej: clear token, call API, etc)
        router.push("/login");
    };

    return (
        <nav className="h-16 border-t bg-background px-4">
            <div className="flex h-full items-center justify-around">

                {isLobby && (
                    <>
                        <Button
                            variant="ghost"
                            className="flex h-full flex-col items-center justify-center gap-1 text-xs"
                            onClick={() => router.push("/lobby/create")}
                        >
                            <PlusCircle className="h-5 w-5" />
                            Crear
                        </Button>

                        <Button
                            variant="ghost"
                            className="flex h-full flex-col items-center justify-center gap-1 text-xs"
                            onClick={() => router.push("/lobby/join")}
                        >
                            <LogIn className="h-5 w-5" />
                            Unirse
                        </Button>
                    </>
                )}

                <Button
                    variant="ghost"
                    className="flex h-full flex-col items-center justify-center gap-1 text-xs text-destructive"
                    onClick={handleLogout}
                >
                    <LogOut className="h-5 w-5" />
                    Salir
                </Button>
            </div>
        </nav>
    );
}
