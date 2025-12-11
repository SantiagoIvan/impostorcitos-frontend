"use client"

import {useUserStore} from "@/app/store/userStore";
import {useGameSync} from "@/hooks/useGameSync";
import {useEffect, useState} from "react";
import {ChatPanel} from "@/components/ChatPanel";
import {useGameStore} from "@/app/store/gameStore";
import LoadingOverlay from "@/components/LoadingOverlay";
import GameInfoOverlay from "@/components/GameInfoOverlay";
import RoundsTable from "@/components/RoundsTable";
import {PhaseGame, Player} from "@/shared";
import MyTurnWordInput from "@/components/MyTurnWordInput";
import {VotePlayerCard} from "@/components/VotePlayerCard";


const Game = () => {
    const { game} = useGameStore()
    const { username } = useUserStore()
    const [allReady, setAllReady] = useState<boolean>(false);
    const [showGameInfo, setShowGameInfo] = useState<boolean>(true);
    const [phaseGame, setPhaseGame] = useState<PhaseGame>(PhaseGame.PLAY)
    const [word, setWord] = useState<string>("");
    const [timer, setTimer] = useState<number>(game.room.moveTime);

    const handleAllReady = () => {
        setAllReady(true);
    }

    const isMyTurn = (): boolean => game.nextTurnIndexPlayer === game.activePlayers.map((player: Player) => player.name).indexOf(username)

    const getAlivePlayers = (): Player[] => game.activePlayers.filter((player: Player) => player.isAlive)

    const getPlayerTurn = (): string => game.activePlayers[game.nextTurnIndexPlayer].name

    const {
        emitPlayerReady
    } = useGameSync(
        handleAllReady
    );

    useEffect(() => {
        console.log("game", game);
        emitPlayerReady();
    }, [])

    const amIImpostor = () => game.impostor === username

    return (
        <main className="flex flex-col bg-background gap-10 w-full m-10">
            <div className="flex gap-4 w-full">
                <LoadingOverlay
                    show={!allReady}
                    message="Esperando a los jugadores"
                />
                <div className="flex w-full flex-col lg:flex lg:w-1/2 gap-5">
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

                    {/* Tabla con palabras de cada jugador en cada ronda*/}
                    {game.moves.length > 0 && (<RoundsTable moves={game.moves} />)}

                    {/* TIMER DE CADA FASE*/}

                    { /* Titulo para visualizar si es mi turno*/}
                    {phaseGame === PhaseGame.PLAY && (
                        <MyTurnWordInput
                            isMyTurn={isMyTurn()}
                            onSubmit={async (word: string) => console.log("submit", word)}
                        />
                    )}

                    {/* Combobox para seleccionar jugador para eliminar */}
                    {phaseGame !== PhaseGame.VOTE && (
                        <VotePlayerCard
                            players={getAlivePlayers()}
                            onVote={async (playerName: string) => console.log("vote", playerName)}
                        />
                    )}

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