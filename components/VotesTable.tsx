"use client";

import React, {useEffect} from "react";
import {buildVotesTable, VoteDto} from "@/lib";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table";

interface Props {
    votes: VoteDto[];
    className?: string;
}

/**
 * Tabla: columnas = rondas, filas = jugadores.
 */
export default function VotesTable({ votes, className = "" }: Props) {
    const { votedPlayers, matrix } = buildVotesTable(votes);

    useEffect(() => {
        console.log("matrix", matrix)
        console.log("voted players", votedPlayers)
        console.log("votes", votes)
    }, [votes, votedPlayers, matrix]);
    return (
        <div className={`overflow-auto rounded-md border text-background ${className}`}>
            <Table className="min-w-full table-fixed">
                <TableHeader className="bg-foreground ">
                <TableRow>
                    <TableHead className="sticky left-0 z-10 px-4 py-2 text-left text-background font-bold">Jugador</TableHead>
                    <TableHead className="px-4 py-2 text-center text-background font-bold">Votos recibidos</TableHead>
                </TableRow>
                </TableHeader>

                <TableBody>
                {Object.keys(matrix).map((votedPlayer: string, id: number) => (
                    <TableRow key={id}>
                        <TableCell className="sticky left-0 z-0 text-foreground px-4 py-2 font-medium">{votedPlayer}</TableCell>
                        <TableCell className="px-4 py-2 text-center text-foreground">
                            <span className="inline-block rounded px-2 py-1 bg-foreground-muted">{matrix[votedPlayer]}</span>
                        </TableCell>
                    </TableRow>
                ))}

                {/* Si todavia nadie voto */}
                {votedPlayers.length === 0 && (
                    <TableRow>
                        <TableCell colSpan={1} className="px-4 py-6 text-center text-sm text-foreground">
                            Esperando votaciones...
                        </TableCell>
                    </TableRow>
                )}
                </TableBody>
            </Table>
        </div>
    );
}
