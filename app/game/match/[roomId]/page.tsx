"use client"

import {useUserStore} from "@/app/store/userStore";
import {useParams} from "next/navigation";
import {useGameSync} from "@/hooks/useGameSync";
import {useEffect, useState} from "react";

const Game = () => {
    const { username } = useUserStore()
    const {roomId} = useParams<{roomId: string}>();
    const [allReady, setAllReady] = useState<boolean>(false);

    const handleAllReady = () => {
        setAllReady(true);
    }

    const {
        emitPlayerReady
    } = useGameSync(
        roomId,
        handleAllReady
    );

    useEffect(() => {
        emitPlayerReady();
    }, [])

    return (
        <main className="text-center">
            <h1 className="text-center">{`Playing as ${username} in ${roomId}. Waiting for players...`}</h1>
        </main>
    )
}

export default Game