import { useEffect } from "react";
import {AnimatePresence, motion} from "framer-motion";

interface GameOverlayInfoProps {
    secretWord?: string;
    impostor: () => boolean;
    topic: string;
    onClose: () => void;
    show: boolean;
}

export default function GameInfoOverlay({
                                            secretWord,
                                            impostor,
                                            topic,
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
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4 sm:px-6"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                >
                    <motion.div
                        className="
          w-full
          max-w-sm sm:max-w-md md:max-w-lg
          bg-muted-foreground
          rounded-2xl
          p-5 sm:p-6 md:p-8
          shadow-xl
          text-center
          text-background
          space-y-4 sm:space-y-5
        "
                        initial={{ opacity: 0, scale: 0.85 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.85 }}
                        transition={{ duration: 0.4, ease: "easeOut" }}
                    >
                        <h2 className="text-lg sm:text-xl md:text-2xl font-bold">
                            Tópico: {topic}
                        </h2>

                        {!impostor() ? (
                            <motion.span
                                animate={{
                                    scale: [1, 1.08, 1],
                                    opacity: [1, 0.7, 1],
                                }}
                                transition={{
                                    duration: 1,
                                    repeat: Infinity,
                                    ease: "easeInOut",
                                }}
                                className="block font-semibold"
                            >
                                <p className="text-base sm:text-lg md:text-xl">
                                    Palabra secreta:{" "}
                                    <strong className="block sm:inline">{secretWord}</strong>
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
                                    duration: 1,
                                    times: [0, 0.12, 0.25, 0.45, 0.65, 0.85, 1],
                                    repeat: Infinity,
                                    ease: "easeInOut",
                                }}
                                className="
              text-red-500
              font-extrabold
              tracking-widest
              text-xl sm:text-2xl md:text-3xl
            "
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
