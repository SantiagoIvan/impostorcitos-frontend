"use client"

import {useUserStore} from "@/app/store/userStore";
import {useParams} from "next/navigation";
import {useGameSync} from "@/hooks/useGameSync";
import {useEffect, useState} from "react";
import {ChatPanel} from "@/components/ChatPanel";
import {useGameStore} from "@/app/store/gameStore";
import LoadingOverlay from "@/components/LoadingOverlay";
import GameInfoOverlay from "@/components/GameInfoOverlay";


const Game = () => {
    const { username } = useUserStore()
    const [allReady, setAllReady] = useState<boolean>(false);
    const [showGameInfo, setShowGameInfo] = useState<boolean>(true);
    const { game} = useGameStore()

    const handleAllReady = () => {

        setAllReady(true);
    }

    const {
        emitPlayerReady
    } = useGameSync(
        handleAllReady
    );

    useEffect(() => {
        console.log(game);
        emitPlayerReady();
    }, [])

    const amIImpostor = () => game.impostor === username

    return (
        <main className="flex flex-col bg-background gap-10 w-full m-10">
            {/* Rooms Panel */}
            <div className="flex gap-4 w-full">
                <LoadingOverlay
                    show={!allReady}
                    message="Esperando a los jugadores"
                />
                <div className="flex w-full flex-col lg:flex lg:w-1/2">
                    <GameInfoOverlay
                        show={showGameInfo}
                        secretWord={game.secretWord}
                        topic={game.topic}
                        impostor={game.impostor === username}
                        onClose={() => setShowGameInfo(false)}
                    />
                    <div className="text-center text-foreground space-y-4 p-10 border-b-4">
                        <h3 className="text-4xl font-extrabold">{`Topico: ${game.topic}`}</h3>
                        <h3 className={`text-2xl ${amIImpostor() && "text-red-900" }`}>
                            {
                                !amIImpostor()? `Palabra secreta: ${game.secretWord}` : "Sos el impostor"
                            }
                        </h3>
                    </div>
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