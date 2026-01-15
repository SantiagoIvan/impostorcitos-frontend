import {Dialog, DialogContent, DialogHeader, DialogTitle,} from "@/components/ui/dialog";
import {Card, CardContent} from "@/components/ui/card";
import {Button} from "@/components/ui/button";
import {AnimatePresence, motion} from "framer-motion";
import {GameDto, PlayerDto, RoundResult, Team} from "@/lib";
import {useEffect} from "react";
import {useAudio} from "@/hooks/useAudio";
import {useUserStore} from "@/app/store/userStore";

interface Props {
    open: boolean;
    onClose: () => void;
    result: RoundResult | undefined;
    onPlayAgain: () => void;
    amIAdmin: boolean;
    game: GameDto
}

export function RoundResultDialog({ open, onClose, result, onPlayAgain, game }: Props) {
    const {ctx: {playWinEffect, playLoseEffect}} = useAudio()
    const impostorWon = () => result?.winner?.team === Team.IMPOSTOR;
    const crewWon = () => result?.winner?.team === Team.CREW;
    const isAdminConnected = () => {
        const player = game.room.players.find((player:PlayerDto) => player.name === game.room.admin)
        return player?.isConnected
    }

    useEffect(() => {
        if(result?.winner?.team === Team.IMPOSTOR && game.impostor) {
            playLoseEffect()
        }
        if(result?.winner?.team === Team.CREW && !game.impostor) {
            playWinEffect()
        }
    }, [])

    if (!result) return null;
    return (
        <Dialog open={open} onOpenChange={onClose}>
            <AnimatePresence>
                {open && (
                    <DialogContent className="p-0 sm:p-0">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.92 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.92 }}
                            transition={{ duration: 0.25, ease: "easeOut" }}
                            className="
            w-full
            max-w-sm sm:max-w-md
            mx-auto
            bg-background
            rounded-xl
            text-center
            px-4 sm:px-6
            py-4 sm:py-6
          "
                        >
                            <DialogHeader>
                                <DialogTitle className="text-xl sm:text-lg md:text-xl font-semibold">
                                    Resultado de la ronda {result.roundId}
                                </DialogTitle>
                            </DialogHeader>

                            <Card
                                className={`mt-4 ${
                                    impostorWon()
                                        ? "border-destructive/50 bg-destructive/10"
                                        : crewWon()
                                            ? "border-green-500/40 bg-green-500/10"
                                            : ""
                                }`}
                            >
                                <CardContent className="p-4 sm:p-5 space-y-4">
                                    {result.wasTie && (
                                        <p className="text-lg sm:text-base md:text-lg font-semibold">
                                            Hubo un empate. Nadie fue expulsado.
                                        </p>
                                    )}

                                    {!result.wasTie && result.expelledPlayer && (
                                        <p className="text-lg sm:text-base md:text-lg font-semibold">
                                            Fue expulsado:{" "}
                                            <span className="text-red-500">
                    {result.expelledPlayer}
                  </span>
                                        </p>
                                    )}

                                    {result.winner && (
                                        <div className="space-y-2">
                                            <p className="text-xl sm:text-lg md:text-xl font-bold">
                                                Fin del juego
                                            </p>
                                            <p className="text-lg sm:text-base md:text-lg">
                                                {result.winner.message}
                                            </p>
                                        </div>
                                    )}
                                </CardContent>
                            </Card>

                            <div className="mt-6 flex flex-col sm:flex-row justify-center gap-3 sm:gap-4">
                                <Button onClick={onClose} className="w-full sm:w-auto">
                                    {!result.winner ? "Continuar" : "Salir del juego"}
                                </Button>

                                {result.winner && !game.aborted && isAdminConnected() && (
                                    <Button onClick={onPlayAgain} className="w-full sm:w-auto">
                                        Volver a jugar
                                    </Button>
                                )}
                            </div>
                        </motion.div>
                    </DialogContent>
                )}
            </AnimatePresence>
        </Dialog>

    );
}
