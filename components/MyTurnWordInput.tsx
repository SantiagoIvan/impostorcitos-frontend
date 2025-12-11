"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {AnimatePresence, motion } from "framer-motion";

interface TurnInputProps {
    isMyTurn: boolean;                  // determina si puedo jugar
    onSubmit: (word: string) => Promise<void> | void; // permite async
}

export default function MyTurnWordInput({ isMyTurn, onSubmit }: TurnInputProps) {
    const [word, setWord] = useState("");
    const [sending, setSending] = useState(false);

    const handleSubmit = async () => {
        if (!word.trim() || !isMyTurn) return;

        setSending(true);

        try {
            await onSubmit(word.trim());
        } finally {
            setSending(false);
            setWord("");
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter" && isMyTurn && !sending) {
            handleSubmit();
        }
    };

    return (
        <AnimatePresence mode="wait">
            {isMyTurn && (
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
                                disabled={sending}
                            />
                        </CardContent>

                        <CardFooter>
                            <Button className="w-full" onClick={handleSubmit} disabled={sending}>
                                {sending ? "Enviando..." : "Jugar"}
                            </Button>
                        </CardFooter>
                    </Card>
                </motion.div>
            )}

            {/* Vista cuando NO es tu turno */}
            {!isMyTurn && (
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
                            <CardTitle className="text-center text-xl">Esperando tu turno...</CardTitle>
                        </CardHeader>
                    </Card>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
