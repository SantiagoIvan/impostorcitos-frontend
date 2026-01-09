import {Dialog, DialogContent, DialogHeader, DialogTitle,} from "@/components/ui/dialog";
import {Card, CardContent} from "@/components/ui/card";
import {Button} from "@/components/ui/button";
import {AnimatePresence, motion} from "framer-motion";
import {GameDto, PlayerDto, RoundResult, Team} from "@/lib";

interface Props {
    open: boolean;
    onClose: () => void;
    result: RoundResult | undefined;
    onPlayAgain: () => void;
    amIAdmin: boolean;
    game: GameDto
}

export function RoundResultDialog({ open, onClose, result, onPlayAgain, game }: Props) {
    if (!result) return null;

    const impostorWon = () => result.winner?.team === Team.IMPOSTOR;
    const crewWon = () => result.winner?.team === Team.CREW;
    const isAdminConnected = () => {
        const player = game.room.players.find((player:PlayerDto) => player.name === game.room.admin)
        return player?.isConnected
    }

    return (
        <Dialog open={open} onOpenChange={onClose}>
            <AnimatePresence>
                {open && (
                    <DialogContent>
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            transition={{
                                duration: 0.25,
                                ease: "easeOut",
                            }}
                            className="max-w-md text-center bg-background rounded-lg"
                        >
                            <div>
                                <DialogHeader>
                                    <DialogTitle>
                                        Resultado de la ronda {result.roundId}
                                    </DialogTitle>
                                </DialogHeader>

                                <Card className={`mt-4 ${impostorWon() ? "border-destructive/50 bg-destructive/10"
                                    : crewWon() ? "border-green-500/40 bg-green-500/10" : ""}`}>
                                    <CardContent
                                        className={`p-2 space-y-4 `}
                                    >
                                        {result.wasTie && (
                                            <p className="text-lg font-semibold">
                                                Hubo un empate. Nadie fue expulsado.
                                            </p>
                                        )}

                                        {!result.wasTie && result.expelledPlayer && (
                                            <p className="text-lg font-semibold">
                                                Fue expulsado:{" "}
                                                <span className="text-red-500">
                                                    {result.expelledPlayer}
                                                </span>
                                            </p>
                                        )}

                                        {result.winner && (
                                            <div className="space-y-2">
                                                <p className="text-xl font-bold">
                                                    Fin del juego
                                                </p>
                                                <p className="text-lg">
                                                    {result.winner.message}
                                                </p>
                                            </div>
                                        )}
                                    </CardContent>
                                </Card>
                                <div className="flex justify-center gap-4">

                                    <Button
                                        className="mt-4"
                                        onClick={onClose}
                                    >
                                        {!result.winner? `Continuar` : "Salir del juego"}
                                    </Button>
                                    {result.winner && !game.aborted && isAdminConnected() &&
                                        (<Button
                                            className="mt-4"
                                            onClick={onPlayAgain}
                                        >
                                            Volver a jugar
                                        </Button>)
                                    }
                                </div>
                            </div>
                        </motion.div>
                    </DialogContent>
                )}
            </AnimatePresence>
        </Dialog>
    );
}
