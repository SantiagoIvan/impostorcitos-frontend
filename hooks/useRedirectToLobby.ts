"use client";

import { useRouter } from "next/navigation";

export const useRedirectToLobby = () => {
    const router = useRouter();

    const redirectToLobby = () => {
        router.replace("/game/lobby");
    };

    return { redirectToLobby };
};
