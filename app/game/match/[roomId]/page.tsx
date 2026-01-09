"use client"

import {useUserStore} from "@/app/store/userStore";
import {useGameSync} from "@/hooks/useGameSync";
import {useEffect, useState} from "react";
import {ChatPanel} from "@/components/ChatPanel";
import {useGameStore} from "@/app/store/gameStore";
import LoadingOverlay from "@/components/LoadingOverlay";
import GameInfoOverlay from "@/components/GameInfoOverlay";
import RoundsTable from "@/components/RoundsTable";
import {defaultGame, GamePhase, PlayerDto, Turn} from "@/lib";
import MyTurnWordInput from "@/components/MyTurnWordInput";
import {VotePlayerCard} from "@/components/VotePlayerCard";
import {DiscussionCard} from "@/components/DiscussionCard";
import {RoundResultDialog} from "@/components/RoundResultDialog";
import YouAreDeadCard from "@/components/youAreDeadCard";
import {Button} from "@/components/ui/button";
import {useRedirectToLobby} from "@/hooks/useRedirectToLobby";
import { Skull } from "lucide-react"
import {Card, CardContent} from "@/components/ui/card";
import { HardHat } from "lucide-react"
import UpdateTopicModal from "@/components/UpdateTopicModal";

const Game = () => {
    const { game, clearGameStore } = useGameStore()
    const { redirectToLobby} = useRedirectToLobby()
    const { username } = useUserStore()
    const [showGameInfo, setShowGameInfo] = useState<boolean>(true);
    const [showSelectTopicModal, setShowSelectTopicModal] = useState<boolean>(false);


    const getAlivePlayers = (): PlayerDto[] => game.room.players.filter((player: PlayerDto) => player.isAlive)

    const getPlayerTurn = (): Turn => game.currentTurn

    const handleOnRoundResultDialogClose = () => {
        setShowResults(false);
        setAllReady(false);
        if(roundResult?.winner) {
            emitPlayerLeftGame();
            redirectToLobby()
        } else emitNextRound();
    }

    const amIAlive = () : boolean => getAlivePlayers().some((player: PlayerDto) => player.name === username)
    const amIImpostor = () => game.impostor
    const amIAdmin = () => username === game.room.admin

    const handleLeaveGame = () => {
        clearGameStore()
        emitPlayerLeftGame()
        redirectToLobby()
    }

    const handlePlayAgain = () => {
        setShowResults(false);
        if(amIAdmin()){
            setShowSelectTopicModal(true)
        } else {
            setAllReady(false);
        }
    }

    // escuchar cambios de fase para cambiar UI
    const {
        emitPlayerReady,
        emitSubmitWord,
        emitDiscussionTimeEnded,
        emitSubmitVote,
        emitNextRound,
        allReady,
        setAllReady,
        setShowResults,
        showResults,
        roundResult,
        emitPlayerLeftGame,
        emitRestartGame
    } = useGameSync();

    const handleRestart = (newTopic: string, randomFlag: boolean) => {
        emitRestartGame(newTopic, randomFlag)
    }

    useEffect(() => {
        if(game.id === defaultGame.id) redirectToLobby()
        emitPlayerReady();
    }, [])

    return (
        <main className="flex flex-col bg-background gap-10 w-full m-10 items-center">
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
                    <div className="text-center text-foreground space-y-4 p- border-b-4 pb-4">
                        <h3 className="text-4xl font-extrabold">{`Topico: ${game.topic}`}</h3>
                        <h3 className={`text-2xl`}>
                            {amIImpostor() ? (
                                <Card className="mt-4 border-destructive/50 bg-destructive/10">
                                    <CardContent className="flex m-auto items-center gap-3 py-4">
                                        <Skull className="h-12 w-12 text-destructive" />
                                        <span className="text-xl font-semibold text-destructive">
                                            IMPOSTOR
                                          </span>
                                    </CardContent>
                                </Card>
                            ) : (
                                <Card className="mt-4 border-green-500/40 bg-green-500/10">
                                    <CardContent className="flex items-center m-auto gap-4 py-5">
                                        <HardHat className="h-12 w-12 text-green-600" />
                                        <span className="text-xl font-semibold text-green-700">
                                            {game.secretWord}
                                        </span>
                                    </CardContent>
                                </Card>
                            )
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
                            <>
                                <RoundResultDialog
                                    open={showResults}
                                    onClose={handleOnRoundResultDialogClose}
                                    result={roundResult}
                                    amIAdmin={amIAdmin()}
                                    onPlayAgain={handlePlayAgain}
                                    game={game}
                                />
                                <UpdateTopicModal
                                    open={showSelectTopicModal}
                                    setOpen={setShowSelectTopicModal}
                                    onSubmit={handleRestart}
                                />
                            </>

                        )}

                </div>
                {/* Chat Panel */}
                <div className="flex w-full flex-col lg:w-1/2">
                    <ChatPanel roomId={game.room.id} gameId={game.id}/>
                </div>

            </div>
            <Button className="cursor-pointer h-14 px-10 font-bold text-xl bg-red-400/80 hover:bg-red-700/80 w-1/3" onClick={handleLeaveGame}>Salir</Button>
        </main>
    )
}

export default Game