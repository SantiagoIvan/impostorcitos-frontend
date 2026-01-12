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

import {PlayerDto, VoteDto} from "@/lib";
import {useUserStore} from "@/app/store/userStore";
import {TimerDisplay} from "@/components/TimerDisplay";
import {useGameStore} from "@/app/store/gameStore";
import AnimatedFadeScaleComponent from "@/components/AnimatedFadeScaleComponent";
import VotesTable from "@/components/VotesTable";

interface VotePlayerCardProps {
    players: PlayerDto[];
    onVote: (targetId: string) => void;
}

export function VotePlayerCard({ players, onVote }: VotePlayerCardProps) {
    const [open, setOpen] = useState(false);
    const [selectedPlayerId, setSelectedPlayerId] = useState<string>("");
    const [sent, setSent] = useState(false);
    const {username} = useUserStore()
    const { game } = useGameStore();

    const eligiblePlayers = players.filter((p) => p.name !== username && p.isConnected);

    const selectedPlayer = eligiblePlayers.find((p) => p.name === selectedPlayerId);

    const handleVote = () => {
        setSent(true);
        onVote(selectedPlayerId);
    };

    const getVotesFromCurrentRound = () => game.votes.filter((vote: VoteDto) => vote.roundId === game.currentRound)

    return (
        <AnimatedFadeScaleComponent>
            <div className="flex flex-col items-center gap-4 sm:gap-5 md:gap-6 px-4">
                <h1 className="text-3xl sm:text-2xl md:text-3xl font-semibold text-center">
                    Votación
                </h1>

                <VotesTable votes={getVotesFromCurrentRound()} />

                <TimerDisplay
                    startedAt={game.currentTurn.startedAt}
                    duration={game.currentTurn.duration}
                    onTimeOut={() => handleVote()}
                />

                <Card className="w-full max-w-sm sm:max-w-md mx-auto shadow-lg">
                    <CardHeader className="py-4 sm:py-5">
                        <CardTitle className="text-xl sm:text-lg md:text-xl text-center">
                            ¿Quién se va, papu?
                        </CardTitle>
                    </CardHeader>

                    <CardContent className="flex flex-col gap-4 sm:gap-5">
                        <Popover open={open} onOpenChange={setOpen}>
                            <PopoverTrigger asChild>
                                <Button
                                    variant="outline"
                                    role="combobox"
                                    className="w-full justify-between py-3 sm:py-2 text-base sm:text-sm"
                                    disabled={sent}
                                >
                                    {selectedPlayer ? selectedPlayer.name : "Elegí un jugador..."}
                                    <ChevronsUpDown className="opacity-50" size={14} />
                                </Button>
                            </PopoverTrigger>

                            <PopoverContent className="w-full p-0">
                                <Command>
                                    <CommandInput
                                        placeholder="Buscar jugador..."
                                        className="text-base sm:text-sm"
                                    />
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
                            className="w-full py-3 sm:py-2 text-base sm:text-sm"
                            variant="destructive"
                            disabled={!selectedPlayerId || sent}
                            onClick={handleVote}
                        >
                            {sent ? "Voto enviado" : "Votar"}
                        </Button>
                    </CardFooter>
                </Card>
            </div>
        </AnimatedFadeScaleComponent>

    );
}
