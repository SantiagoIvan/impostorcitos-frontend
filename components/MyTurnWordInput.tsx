"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {AnimatePresence, motion } from "framer-motion";
import {TimerDisplay} from "@/components/TimerDisplay";
import {useGameStore} from "@/app/store/gameStore";
import {useUserStore} from "@/app/store/userStore";
import {useGameSync} from "@/hooks/useGameSync";

interface TurnInputProps {
    playerTurn: string;                  // determina si puedo jugar
    onSubmit: (word: string) => Promise<void> | void; // permite async
    onTimeOut: () => void;
}

export default function MyTurnWordInput({ playerTurn, onSubmit, onTimeOut }: TurnInputProps) {
    const [word, setWord] = useState("");
    const [wordSent, setWordSent] = useState(false);
    const [sending, setSending] = useState(false);
    const [timeout, setTimeout] = useState(false);
    const { game } = useGameStore();
    const { username } = useUserStore();

    const isMyTurn = () => playerTurn === username;

    const handleSubmit = async () => {
        if (!word.trim() || !isMyTurn()) return;

        setSending(true);
        setWordSent(true);
        try {
            await onSubmit(word.trim());
        } finally {
            setSending(false);
            setWord("");
        }
    };


    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter" && isMyTurn() && !sending) {
            handleSubmit();
        }
    };

    const handleTimeOut = () => {
        setTimeout(true) // asi bloqueo el input
        onTimeOut()
    }

    return (
        <div className="flex flex-col gap-2 items-center justify-center">
            {wordSent ?
                (<h1 className="text-2xl">Palabra enviada</h1>) : (
                <TimerDisplay
                    initialSeconds={game.room.moveTime}
                    onTimeOut={() => handleTimeOut()}
                />)}
            <AnimatePresence mode="wait">
                {isMyTurn() && (
                    <motion.div
                        key="turn-input-card"
                        initial={{ opacity: 0, scale: 0.85 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.85 }}
                        transition={{ duration: 0.35, ease: "easeOut" }}
                        className="w-full max-w-sm mx-auto"
                    >
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-center text-xl">
                                    Es tu turno
                                </CardTitle>
                            </CardHeader>

                            <CardContent className="flex flex-col gap-4">
                                <Input
                                    value={word}
                                    onChange={(e) => setWord(e.target.value)}
                                    onKeyDown={handleKeyDown}
                                    placeholder="Ingresá tu palabra..."
                                    disabled={sending || timeout || wordSent}
                                />
                            </CardContent>

                            <CardFooter>
                                <Button className={`w-full ${timeout && "bg-muted-foreground"}`} onClick={handleSubmit} disabled={sending || timeout || wordSent}>
                                    {sending ? "Enviando..." : "Jugar"}
                                </Button>
                            </CardFooter>
                        </Card>
                    </motion.div>
                )}

                {/* Vista cuando NO es tu turno */}
                {!isMyTurn() && (
                    <motion.div
                        key="waiting"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        transition={{ duration: 0.3 }}
                        className="w-full max-w-sm mx-auto"
                    >
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-center text-xl">Turno de {playerTurn}</CardTitle>
                            </CardHeader>
                        </Card>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
