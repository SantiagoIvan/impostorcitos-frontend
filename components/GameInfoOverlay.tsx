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
                                <motion.span
                                    animate={{
                                        scale: [1, 1.08, 1],
                                        opacity: [1, 0.7, 1],
                                    }}
                                    transition={{
                                        duration: 1,
                                        repeat: Infinity,
                                        ease: "easeInOut"
                                    }}
                                    className="font-semibold text-xl"
                                >
                                    <p className="text-lg">
                                        Palabra secreta: <strong>{secretWord}</strong>
                                    </p>
                                </motion.span>

                        ) : (
                            <motion.span
                                initial={{ scale: 0.8, opacity: 0 }}
                                animate={{
                                    scale: [1, 1.25, 1, 1.15, 1, 1.1, 1],
                                    opacity: [0, 1, 1, 1, 1, 1, 0],
                                }}
                                transition={{
                                    duration: 1,      // ritmo general
                                    times: [0, 0.12, 0.25, 0.45, 0.65, 0.85, 1],
                                    repeat: Infinity,
                                    ease: "easeInOut",
                                }}
                                className="text-red-500 font-extrabold text-3xl tracking-widest"
                            >
                                Sos el impostor
                            </motion.span>
                        )}
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
