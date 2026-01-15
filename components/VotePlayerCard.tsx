"use client";

import {useEffect, useState} from "react";
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
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";

interface VotePlayerCardProps {
    players: PlayerDto[];
    onVote: (targetName: string) => void;
}

export function VotePlayerCard({ players, onVote }: VotePlayerCardProps) {
    const [selectedPlayerName, setSelectedPlayerName] = useState<string>("");
    const [sent, setSent] = useState(false);
    const {username} = useUserStore()
    const { game } = useGameStore();

    const eligiblePlayers = () => players.filter((p) => p.name !== username && p.isConnected);

    const selectedPlayer = () => eligiblePlayers().find((p) => p.name === selectedPlayerName);

    const handleVote = () => {
        setSent(true);
        if(sent){
            onVote(selectedPlayerName);
            console.log("you vote for ", selectedPlayerName, selectedPlayer());
        }else{
            onVote(selectedPlayerName);
        }
    };

    const getVotesFromCurrentRound = () => game.votes.filter((vote: VoteDto) => vote.roundId === game.currentRound)

    useEffect(() => {
        console.log("[VotePlayerCard] players: ", players);
        console.log("[VotePlayerCard] eligible players:", eligiblePlayers());
        console.log("[VotePlayerCard] selectedPlayer:", selectedPlayer);
    }, [])
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
                        <Select
                            value={selectedPlayer()?.name}
                            onValueChange={(value) => setSelectedPlayerName(value)}
                            disabled={sent}
                        >
                            <SelectTrigger className="w-full py-3 sm:py-2 text-base sm:text-sm">
                                <SelectValue placeholder="Elegí un jugador..." />
                            </SelectTrigger>

                            <SelectContent>
                                {eligiblePlayers().map((player) => (
                                    <SelectItem key={player.name} value={player.name}>
                                        {player.name}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </CardContent>

                    <CardFooter>
                        <Button
                            className="w-full py-3 sm:py-2 text-base sm:text-sm"
                            variant="destructive"
                            disabled={!selectedPlayerName || sent}
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
