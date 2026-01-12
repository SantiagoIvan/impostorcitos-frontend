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
import {useLoading} from "@/context/LoadingContext";
import CrewOrImpostorCard from "@/components/CrewOrImpostorCard";

const Game = () => {
    const { game, clearGameStore } = useGameStore()
    const { redirectToLobby} = useRedirectToLobby()
    const { username } = useUserStore()
    const [showGameInfo, setShowGameInfo] = useState<boolean>(true);
    const [showSelectTopicModal, setShowSelectTopicModal] = useState<boolean>(false);
    const {startLoading, stopLoading} = useLoading()


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
        <>
            <div className="w-full max-w-[80vw] mx-auto px-4 sm:px-6">
                <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 items-start justify-center min-w-0">
                {/* TITULO Y ROL EN EL JUEGO */}
                    <div className="flex w-full flex-col gap-6 lg:w-1/2">
                        <GameInfoOverlay
                            show={showGameInfo}
                            secretWord={game.secretWord}
                            impostor={amIImpostor}
                            topic={game.topic}
                            onClose={() => setShowGameInfo(false)}
                        />

                        {/* HEADER DEL JUEGO */}
                        <div className="text-center text-foreground space-y-3 border-b pb-4">
                            <h3 className="text-3xl sm:text-2xl md:text-3xl font-extrabold">
                                Tópico: {game.topic}
                            </h3>

                            <div className="text-xl sm:text-lg md:text-xl">
                                <CrewOrImpostorCard
                                    amIImpostor={amIImpostor}
                                    secretWord={game.secretWord}
                                />
                            </div>
                        </div>

                        {/* TABLA DE RONDAS */}
                        {game.moves.length > 0 && (
                            <RoundsTable moves={game.moves} />
                        )}

                        {/* CONTENIDO SEGÚN ESTADO */}
                        {!amIAlive() ? (
                            <YouAreDeadCard />
                        ) : (
                            <>
                                {game.currentPhase === GamePhase.PLAY && (
                                    <MyTurnWordInput
                                        playerTurn={getPlayerTurn()}
                                        onSubmit={emitSubmitWord}
                                    />
                                )}

                                {game.currentPhase === GamePhase.DISCUSSION && (
                                    <DiscussionCard
                                        onSubmit={emitDiscussionTimeEnded}
                                    />
                                )}

                                {game.currentPhase === GamePhase.VOTE && (
                                    <VotePlayerCard
                                        players={getAlivePlayers()}
                                        onVote={emitSubmitVote}
                                    />
                                )}
                            </>
                        )}
                    </div>
                </div>
            </div>

            {/* RESULTADOS DE RONDA */}
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

            {/* SALIR */}
            <div className="mt-6 flex justify-center px-4">
                <Button
                    className="
                        w-full sm:w-auto
                        h-14
                        px-10
                        text-lg sm:text-xl
                        font-bold
                        bg-red-400/80
                        hover:bg-red-700/80
                      "
                    onClick={handleLeaveGame}
                >
                    Salir
                </Button>
            </div>
        </>

    )
}

export default Game