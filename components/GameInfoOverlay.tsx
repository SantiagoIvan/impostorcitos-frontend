import { useEffect } from "react";
import {AnimatePresence, motion} from "framer-motion";

interface GameOverlayInfoProps {
    secretWord: string;
    topic: string;
    impostor: boolean;
    onClose: () => void;
    show: boolean;
}

export default function GameInfoOverlay({
                                            secretWord,
                                            topic,
                                            impostor,
                                            onClose,
                                            show
                                        }: GameOverlayInfoProps) {

    // Auto-close a los 3 segundos
    useEffect(() => {
        const timer = setTimeout(() => {
            onClose();
        }, 3000);

        return () => clearTimeout(timer);
    }, [onClose]);

    return (
        <AnimatePresence>
            {show && (
                <motion.div
                    className="fixed inset-0 flex items-center justify-center bg-black/60 z-50"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                >
                    <motion.div
                        className="bg-foreground rounded-2xl p-8 shadow-xl text-center text-background space-y-4"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        transition={{ duration: 0.4, ease: "easeOut" }}
                    >
                        <h2 className="text-xl font-bold">Topico: {topic}</h2>

                        {!impostor ? (
                            <p className="text-lg">
                                Palabra secreta: <strong>{secretWord}</strong>
                            </p>
                        ) : (
                            <p className="text-lg text-red-600 font-semibold">
                                Sos el impostor
                            </p>
                        )}
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
