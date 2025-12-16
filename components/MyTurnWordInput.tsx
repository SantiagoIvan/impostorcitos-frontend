"use client";

import {useEffect, useState} from "react";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {AnimatePresence, motion } from "framer-motion";
import {TimerDisplay} from "@/components/TimerDisplay";
import {useGameStore} from "@/app/store/gameStore";
import {useUserStore} from "@/app/store/userStore";
import AnimatedFadeScaleComponent from "@/components/AnimatedFadeScaleComponent";
import {Turn} from "@/shared";

interface TurnInputProps {
    playerTurn: Turn;
    onSubmit: (word: string) => Promise<void> | void; // permite async
    onTimeOut: () => void;
}

export default function MyTurnWordInput({ playerTurn, onSubmit, onTimeOut }: TurnInputProps) {
    const [word, setWord] = useState("");
    const [wordSent, setWordSent] = useState(false);
    const [sending, setSending] = useState(false);
    const [timeout, setTimeout] = useState(false);
    const { username } = useUserStore();

    const isMyTurn = () => playerTurn.player === username;

    const handleSubmit = async () => {
        if (!isMyTurn()) return;

        setSending(true);
        setWordSent(true);
        try {
            await onSubmit(word.trim());
        } finally {
            setSending(false);
            setWord("");
        }
    };


    const handleKeyDown = async (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter" && isMyTurn() && !sending) {
            await handleSubmit();
        }
    };

    const handleTimeOut = async () => {
        setTimeout(true) // asi bloqueo el input
        await handleSubmit()
    }


    return (
        <div className="flex flex-col gap-3 items-center justify-center">
            <h1 className="text-2xl font-semibold text-center">Juga una palabra</h1>
            {
                wordSent &&
                (<h1 className="text-xl font-semibold text-center">Palabra enviada</h1>)}
            <TimerDisplay
                startedAt={playerTurn.startedAt}
                duration={playerTurn.duration * 1000}
                onTimeOut={handleTimeOut}
            />
            {isMyTurn() ? (
                <AnimatedFadeScaleComponent>
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
                </AnimatedFadeScaleComponent>
            ) : (
                <AnimatedFadeScaleComponent>
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-center text-xl">Turno de {playerTurn.player}</CardTitle>
                        </CardHeader>
                    </Card>
                </AnimatedFadeScaleComponent>
            )}
        </div>
    );
}
