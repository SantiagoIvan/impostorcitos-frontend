import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import {RoundResult} from "@/lib";

interface Props {
    open: boolean;
    onClose: () => void;
    result: RoundResult | undefined;
}

export function RoundResultDialog({ open, onClose, result }: Props) {
    if (!result) return null;

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

                                <Card className="mt-4">
                                    <CardContent className="p-2 space-y-4">
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

                                <Button
                                    className="mt-4 w-full"
                                    onClick={onClose}
                                >
                                    Continuar
                                </Button>
                            </div>
                        </motion.div>
                    </DialogContent>
                )}
            </AnimatePresence>
        </Dialog>
    );
}
