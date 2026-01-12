"use client"

import {useEffect, useState} from "react";
import { useUserStore } from "@/app/store/userStore";
import { useRouter } from "next/navigation";
import BugReportButton from "@/components/BugReportBtn";
import BugReportModal from "@/components/BugReportModal";


export function ProtectedLayout({ children }: {
    children: React.ReactNode;
}) {
    const { username } = useUserStore();
    const router = useRouter();

    const [mounted, setMounted] = useState(false);
    const [bugReportModal, setBugReportModal] = useState<boolean>(false);

    // 🔑 clave: esperar montaje en cliente
    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setMounted(true);
    }, []);

    useEffect(() => {
        if(!mounted) return
        if(!username) router.replace("/")
    }, [mounted, router, username]);

    if(!username) return null;
    return (
        <>
            {children}
            <BugReportButton onClick={() => setBugReportModal(true)} />
            <BugReportModal open={bugReportModal} onOpenChange={setBugReportModal} />
        </>
    )
}
