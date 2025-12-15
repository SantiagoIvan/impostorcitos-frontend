"use client";

import { useState} from "react";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
    Command,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandEmpty,
    CommandList,
} from "@/components/ui/command";
import {
    Popover,
    PopoverTrigger,
    PopoverContent,
} from "@/components/ui/popover";

import { ChevronsUpDown } from "lucide-react";

import { Player } from "@/shared";
import {useUserStore} from "@/app/store/userStore";
import {TimerDisplay} from "@/components/TimerDisplay";
import {useGameStore} from "@/app/store/gameStore";
import AnimatedFadeScaleComponent from "@/components/AnimatedFadeScaleComponent";

interface VotePlayerCardProps {
    players: Player[];
    onVote: (targetId: string) => void;
}

export function VotePlayerCard({ players, onVote }: VotePlayerCardProps) {
    const [open, setOpen] = useState(false);
    const [selectedPlayerId, setSelectedPlayerId] = useState<string>("");
    const [sent, setSent] = useState(false);
    const {username} = useUserStore()
    const { game } = useGameStore();

    const eligiblePlayers = players.filter((p) => p.name !== username);

    const selectedPlayer = eligiblePlayers.find((p) => p.name === selectedPlayerId);

    const handleVote = () => {
        setSent(true);
        onVote(selectedPlayerId);
    };

    return (
        <AnimatedFadeScaleComponent>

            <h1 className="text-2xl font-semibold text-center mb-3">Votacion</h1>

            <TimerDisplay
                initialSeconds={game.room.voteTime}
                onTimeOut={handleVote}
            />
            <Card className="w-full max-w-sm mx-auto shadow-lg">
                <CardHeader>
                    <CardTitle className="text-lg text-center">Quien se va, papu?</CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col gap-4">
                    {/* Command + Combobox Selector */}
                    <Popover open={open} onOpenChange={setOpen}>
                        <PopoverTrigger asChild>
                            <Button
                                variant="outline"
                                role="combobox"
                                className="w-full justify-between"
                                disabled={sent}
                            >
                                {selectedPlayer ? selectedPlayer.name : "Elegí un jugador..."}
                                <ChevronsUpDown className="opacity-50" size={14} />
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-full p-0">
                            <Command>
                                <CommandInput placeholder="Buscar jugador..." />
                                <CommandList>
                                    <CommandEmpty>No se encontró jugador</CommandEmpty>
                                    <CommandGroup>
                                        {eligiblePlayers.map((player) => (
                                            <CommandItem
                                                key={player.name}
                                                value={player.name}
                                                onSelect={() => {
                                                    setSelectedPlayerId(player.name);
                                                    setOpen(false);
                                                }}
                                            >
                                                {player.name}
                                            </CommandItem>
                                        ))}
                                    </CommandGroup>
                                </CommandList>
                            </Command>
                        </PopoverContent>
                    </Popover>
                </CardContent>
                <CardFooter>
                    <Button
                        className="w-full"
                        variant="destructive"
                        disabled={!selectedPlayerId || sent}
                        onClick={handleVote}
                    >
                        {sent ? "Voto enviado" : "Votar"}
                    </Button>
                </CardFooter>
            </Card>
        </AnimatedFadeScaleComponent>
    );
}
