"use client";

import React from "react";
import {Move, buildRoundTable, PlayerDto} from "@/lib";
import {
    Table,
    TableBody,
    TableCell,
    TableRow,
    TableHead,
    TableHeader,
} from "@/components/ui/table"
import {useGameStore} from "@/app/store/gameStore";


interface Props {
    moves: Move[];
    className?: string;
}

/**
 * Tabla: columnas = rondas, filas = jugadores.
 */
export default function RoundsTable({ moves, className = "" }: Props) {
    const { players, roundsCount, matrix } = buildRoundTable(moves);
    const {game} = useGameStore()

    // encabezados de rondas
    const rounds = Array.from({ length: roundsCount }, (_, i) => i + 1);

    const markPlayerDeadOrAlive = (player: string) : string => {
        const playerFound = game.room.players.find((p: PlayerDto) => p.name === player)
        if(!playerFound) return ""

        return !playerFound.isAlive ? "bg-red-900/80 hover:bg-red-800/60" :
            "bg-green-900/90 hover:bg-green-800/60"
    }


    return (
        <div className={`overflow-auto rounded-md border text-background ${className}`}>
            <Table className="min-w-full ">
                <TableHeader className="bg-foreground">
                <TableRow>
                    <TableHead className="sticky left-0 z-10 px-4 py-2 text-left text-background font-bold">Jugador</TableHead>
                    {rounds.map((r) => (
                        <TableHead key={r} className="px-4 py-2 text-center text-background font-bold">Ronda {r}</TableHead>
                    ))}
                </TableRow>
                </TableHeader>

                <TableBody>
                {Object.keys(matrix).map((p) => (
                    <TableRow
                        key={p}
                        className={`${markPlayerDeadOrAlive(p)}`}
                    >
                        <TableCell className="sticky left-0 z-0 text-foreground px-4 py-2 font-medium">{p}</TableCell>

                        {Array.from({ length: roundsCount }).map((_, idx) => {
                            const val = matrix[p]?.[idx] ?? null;
                            return (
                                <TableCell key={idx} className="px-4 py-2 text-center text-foreground">
                                    {val ? (
                                        <span className="inline-block rounded px-2 py-1 bg-foreground-muted">{val}</span>
                                    ) : (
                                        <span className="text-sm text-gray-400">—</span>
                                    )}
                                </TableCell>
                            );
                        })}
                    </TableRow>
                ))}

                {/* Si no hay jugadores */}
                {players.length === 0 && (
                    <tr>
                        <td colSpan={roundsCount + 1} className="px-4 py-6 text-center text-sm text-gray-500">
                            No hay datos aún
                        </td>
                    </tr>
                )}
                </TableBody>
            </Table>
        </div>
    );
}
