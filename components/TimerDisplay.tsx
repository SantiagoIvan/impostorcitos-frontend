import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface TimerDisplayProps {
    initialSeconds: number;
    onTimeOut: () => void;
}

export function TimerDisplay({ initialSeconds, onTimeOut }: TimerDisplayProps) {
    const [seconds, setSeconds] = useState(initialSeconds);

    useEffect(() => {
        if (seconds <= 0) {
            onTimeOut()
            return;
        }
        const interval = setInterval(() => setSeconds((s) => s - 1), 1000);
        return () => clearInterval(interval);
    }, [seconds]);

    if (seconds <= 0) return null;

    const isCritical = seconds <= 10;

    return (
        <AnimatePresence>
            <motion.div
                key="timer"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.25 }}
                className="mb-3 text-center font-semibold text-lg"
            >
                <motion.span
                    animate={
                        isCritical
                            ? {
                                scale: [1, 1.4, 1],
                                color: ["#dc2626", "#4c0d0d", "#dc2626"], // tonos de rojo
                            }
                            : { scale: 1, color: "#FFF" }
                    }
                    transition={
                        isCritical
                            ? {
                                duration: 0.8,
                                repeat: Infinity,
                                ease: "easeInOut",
                            }
                            : { duration: 0.2 }
                    }
                >
                    {seconds > 0? `Tiempo restante: ${seconds}s` : "Timeout!"}
                </motion.span>
            </motion.div>
        </AnimatePresence>
    );
}
