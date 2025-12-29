"use client"

import {useUserStore} from "@/app/store/userStore";
import {useGameSync} from "@/hooks/useGameSync";
import {useEffect, useState} from "react";
import {ChatPanel} from "@/components/ChatPanel";
import {useGameStore} from "@/app/store/gameStore";
import LoadingOverlay from "@/components/LoadingOverlay";
import GameInfoOverlay from "@/components/GameInfoOverlay";
import RoundsTable from "@/components/RoundsTable";
import {GamePhase, PlayerDto, Turn} from "@/lib";
import MyTurnWordInput from "@/components/MyTurnWordInput";
import {VotePlayerCard} from "@/components/VotePlayerCard";
import {DiscussionCard} from "@/components/DiscussionCard";
import {useRouter} from "next/navigation";
import {RoundResultDialog} from "@/components/RoundResultDialog";
import YouAreDeadCard from "@/components/youAreDeadCard";
import {Button} from "@/components/ui/button";
import {useRedirectToLobby} from "@/hooks/useRedirectToLobby";


const Game = () => {
    const { game, clearGameStore } = useGameStore()
    const { redirectToLobby} = useRedirectToLobby()
    const { username } = useUserStore()
    const [showGameInfo, setShowGameInfo] = useState<boolean>(true);


    const getAlivePlayers = (): PlayerDto[] => game.room.players.filter((player: PlayerDto) => player.isAlive)

    const getPlayerTurn = (): Turn => game.currentTurn

    const handleOnRounResultDialogClose = () => {
        setShowResults(false);
        if(roundResult?.winner) redirectToLobby()
        else emitNextRound();
    }

    const amIAlive = () : boolean => getAlivePlayers().some((player: PlayerDto) => player.name === username)
    const amIImpostor = () => game.impostor

    const handleLeaveGame = () => {
        clearGameStore()
        emitPlayerLeftGame()
        redirectToLobby()

    }
    // escuchar cambios de fase para cambiar UI
    const {
        emitPlayerReady,
        emitSubmitWord,
        emitDiscussionTimeEnded,
        emitSubmitVote,
        emitNextRound,
        allReady,
        setShowResults,
        showResults,
        roundResult,
        emitPlayerLeftGame
    } = useGameSync();

    useEffect(() => {
        emitPlayerReady();
    }, [])

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
                        impostor={amIImpostor}
                        topic={game.topic}
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

                    {/* Si estas muerto, se muestra la carata de muerto nomas y los resultados al final de cada ronda*/}
                    {!amIAlive() ? <YouAreDeadCard /> : (
                    <>
                        {game.currentPhase === GamePhase.PLAY && (
                            <MyTurnWordInput
                                playerTurn={getPlayerTurn()}
                                onSubmit={emitSubmitWord}
                            />
                        )}

                        {/* Combobox para seleccionar jugador para eliminar */}
                        {game.currentPhase === GamePhase.DISCUSSION && (
                            <DiscussionCard
                                onSubmit={emitDiscussionTimeEnded}
                            />
                        )}

                        {/* Combobox para seleccionar jugador para eliminar */}
                        {game.currentPhase === GamePhase.VOTE && (
                            <VotePlayerCard
                                players={getAlivePlayers()}
                                onVote={emitSubmitVote}
                            />
                        )}
                    </>
                    )}

                        {/* Combobox para seleccionar jugador para eliminar */}
                        {game.currentPhase === GamePhase.ROUND_RESULT && (
                            <RoundResultDialog
                                open={showResults}
                                onClose={handleOnRounResultDialogClose}
                                result={roundResult}
                            />

                        )}

                </div>
                {/* Chat Panel */}
                <div className="flex w-full flex-col lg:w-1/2">
                    <ChatPanel roomId={game.room.id} gameId={game.id}/>
                </div>

            </div>
            <Button className="max-w-20 text-center" onClick={handleLeaveGame}>Salir del juego</Button>
        </main>
    )
}

export default Game