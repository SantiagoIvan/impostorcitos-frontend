"use client";

import { useState} from "react";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {TimerDisplay} from "@/components/TimerDisplay";
import {useUserStore} from "@/app/store/userStore";
import AnimatedFadeScaleComponent from "@/components/AnimatedFadeScaleComponent";
import {Turn} from "@/lib";

interface TurnInputProps {
    playerTurn: Turn;
    onSubmit: (word: string) => Promise<void> | void;
}

export default function MyTurnWordInput({ playerTurn, onSubmit }: TurnInputProps) {
    const [word, setWord] = useState("");
    const [wordSent, setWordSent] = useState(false);
    const [sending, setSending] = useState(false);
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
        await handleSubmit()
    }


    return (
        <div className="flex flex-col items-center justify-center gap-4 sm:gap-5 md:gap-6 px-4">
            <h1 className="text-3xl sm:text-2xl md:text-3xl font-semibold text-center">
                Jugá una palabra
            </h1>

            {wordSent && (
                <h2 className="text-xl sm:text-lg md:text-xl font-semibold text-center text-muted-foreground">
                    Palabra enviada
                </h2>
            )}

            <TimerDisplay
                startedAt={playerTurn.startedAt}
                endsAt={playerTurn.endsAt}
                onTimeOut={handleTimeOut}
            />

            {isMyTurn() ? (
                <AnimatedFadeScaleComponent>
                    <Card className="w-full max-w-sm sm:max-w-md md:max-w-lg">
                        <CardHeader className="py-4 sm:py-5">
                            <CardTitle className="text-center text-2xl sm:text-xl md:text-2xl">
                                Es tu turno
                            </CardTitle>
                        </CardHeader>

                        <CardContent className="flex flex-col gap-4 sm:gap-5">
                            <Input
                                value={word}
                                onChange={(e) =>
                                    setWord(e.target.value.substring(0, 15).toLowerCase())
                                }
                                onKeyDown={handleKeyDown}
                                placeholder="Ingresá tu palabra..."
                                disabled={sending || wordSent}
                                className="text-base sm:text-sm md:text-base"
                            />
                        </CardContent>

                        <CardFooter>
                            <Button
                                className="w-full bg-foreground py-2 sm:py-3"
                                onClick={handleSubmit}
                                disabled={sending || wordSent}
                            >
                                {sending ? "Enviando..." : "Jugar"}
                            </Button>
                        </CardFooter>
                    </Card>
                </AnimatedFadeScaleComponent>
            ) : (
                <AnimatedFadeScaleComponent>
                    <Card className="w-full max-w-sm sm:max-w-md md:max-w-lg">
                        <CardHeader className="py-4 sm:py-5">
                            <CardTitle className="text-center text-2xl sm:text-xl md:text-2xl">
                                Turno de {playerTurn.player}
                            </CardTitle>
                        </CardHeader>
                    </Card>
                </AnimatedFadeScaleComponent>
            )}
        </div>

    );
}
