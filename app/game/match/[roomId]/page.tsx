"use client"

import {useUserStore} from "@/app/store/userStore";
import {useParams} from "next/navigation";
import {useGameSync} from "@/hooks/useGameSync";
import {useEffect, useState} from "react";
import {ChatPanel} from "@/components/ChatPanel";
import {useGameStore} from "@/app/store/gameStore";

const Game = () => {
    const { username } = useUserStore()
    const [allReady, setAllReady] = useState<boolean>(false);
    const { game} = useGameStore()

    const handleAllReady = () => {
        console.log("All Ready")
        setAllReady(true);
    }

    const {
        emitPlayerReady
    } = useGameSync(
        handleAllReady
    );

    useEffect(() => {
        console.log("Ready to play")
        emitPlayerReady();
    }, [])

    return (
        <main className="flex flex-col bg-background gap-10 w-full m-10">
            {/* Rooms Panel */}
            <div className="flex gap-4 w-full">
                <div className="flex w-full flex-col lg:flex lg:w-1/2">
                    <h1>{!allReady?`Esperando jugadores...` : `Listoo todos listos, arrancamos`}</h1>
                </div>
                {/* Chat Panel */}
                <div className="flex w-full flex-col lg:w-1/2">
                    <ChatPanel roomId={game.room.id}/>
                </div>

            </div>
        </main>
    )
}

export default Game