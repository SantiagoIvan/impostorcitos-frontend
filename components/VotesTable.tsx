"use client";

import React, {useEffect} from "react";
import {buildVotesTable, VoteDto} from "@/lib";

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
            <table className="min-w-full table-fixed">
                <thead className="bg-foreground">
                <tr>
                    <th className="sticky left-0 z-10 px-4 py-2 text-left">Jugador</th>
                    <th className="px-4 py-2 text-center">Votos recibidos</th>
                </tr>
                </thead>

                <tbody>
                {Object.keys(matrix).map((votedPlayer: string, id: number) => (
                    <tr key={id}>
                        <td className="sticky left-0 z-0 text-foreground px-4 py-2 font-medium">{votedPlayer}</td>
                        <td className="px-4 py-2 text-center text-foreground">
                            <span className="inline-block rounded px-2 py-1 bg-foreground-muted">{matrix[votedPlayer]}</span>
                        </td>
                    </tr>
                ))}

                {/* Si todavia nadie voto */}
                {votedPlayers.length === 0 && (
                    <tr>
                        <td colSpan={1} className="px-4 py-6 text-center text-sm text-gray-500">
                            Esperando votaciones...
                        </td>
                    </tr>
                )}
                </tbody>
            </table>
        </div>
    );
}
