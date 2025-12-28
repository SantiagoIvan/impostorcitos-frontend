"use client"

import { useEffect } from "react";
import { useUserStore } from "@/app/store/userStore";
import { useRouter } from "next/navigation";


export function ProtectedLayout({ children }: {
    children: React.ReactNode;
}) {
    const { isAuthenticated, hasHydrated } = useUserStore();
    const router = useRouter();

    useEffect(() => {
        if (!hasHydrated) return;

        if (!isAuthenticated) {
            router.replace("/");
        }
    }, [hasHydrated, isAuthenticated, router]);

    // Mientras no esté hidratado, no renderizamos nada
    if (!hasHydrated) {
        return null;
    }

    // Si ya hidrató pero no está autenticado, evitamos render
    if (!isAuthenticated) {
        return null;
    }

    return <>{children}</>;
}
