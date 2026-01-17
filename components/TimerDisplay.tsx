import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {useTimer} from "@/hooks/useTimer";

interface TimerDisplayProps {
    startedAt: number;
    onTimeOut: () => void;
    endsAt: number;
}

export function TimerDisplay({ startedAt, onTimeOut, endsAt }: TimerDisplayProps) {
    const duration = endsAt - startedAt;
    const { seconds, isFinished } = useTimer(endsAt);


    useEffect(() => {
        if (isFinished) {
            onTimeOut()
        }
        console.log(`startedAt: ${startedAt},  endsAt: ${endsAt}: Hay una diferencia de ${duration}`);
        console.log(`Sin embargo, entre Now: ${Date.now()} y endsAt hay una diferencia de ${endsAt - Date.now()}. `);
        console.log(`Seconds: ${seconds}`)

    }, [seconds, isFinished]);
    const isCritical = seconds <= 10;

    return (
        <AnimatePresence>
            <motion.div
                key="timer"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.25 }}
                className="mb-3 text-center font-semibold text-lg text-foreground"
            >
                {seconds > 0 ? (
                    <motion.span
                        animate={
                            isCritical
                                ? {
                                    scale: [1, 1.4, 1],
                                    color: ["#dc2626", "#4c0d0d", "#dc2626"], // tonos de rojo
                                }
                                : {scale: 1, color: "#FFF"}
                        }
                        transition={
                            isCritical
                                ? {
                                    duration: 0.8,
                                    repeat: Infinity,
                                    ease: "easeInOut",
                                }
                                : {duration: 0.2}
                        }
                    >
                        {`Tiempo restante: ${seconds}s`}
                    </motion.span>) : (
                        <motion.span
                            animate={{scale: 1, color: "#FFF"}}
                            transition={{duration: 0.2}}
                        >
                            Esperando al resto de los jugadores...
                        </motion.span>)}
            </motion.div>
        </AnimatePresence>
    );
}
