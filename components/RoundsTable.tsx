// components/RoundsTable.tsx
"use client";

import React, {useEffect} from "react";
import {Move, buildRoundTable} from "@/lib";

interface Props {
    moves: Move[];
    className?: string;
}

/**
 * Tabla: columnas = rondas, filas = jugadores.
 */
export default function RoundsTable({ moves, className = "" }: Props) {
    const { players, roundsCount, matrix } = buildRoundTable(moves);

    // encabezados de rondas
    const rounds = Array.from({ length: roundsCount }, (_, i) => i + 1);

    return (
        <div className={`overflow-auto rounded-md border text-background ${className}`}>
            <table className="min-w-full table-fixed">
                <thead className="bg-foreground">
                <tr>
                    <th className="sticky left-0 z-10 px-4 py-2 text-left">Jugador</th>
                    {rounds.map((r) => (
                        <th key={r} className="px-4 py-2 text-center">Ronda {r}</th>
                    ))}
                </tr>
                </thead>

                <tbody>
                {Object.keys(matrix).map((p) => (
                    <tr key={p}>
                        <td className="sticky left-0 z-0 text-foreground px-4 py-2 font-medium">{p}</td>

                        {Array.from({ length: roundsCount }).map((_, idx) => {
                            const val = matrix[p]?.[idx] ?? null;
                            return (
                                <td key={idx} className="px-4 py-2 text-center text-foreground">
                                    {val ? (
                                        <span className="inline-block rounded px-2 py-1 bg-foreground-muted">{val}</span>
                                    ) : (
                                        <span className="text-sm text-gray-400">—</span>
                                    )}
                                </td>
                            );
                        })}
                    </tr>
                ))}

                {/* Si no hay jugadores */}
                {players.length === 0 && (
                    <tr>
                        <td colSpan={roundsCount + 1} className="px-4 py-6 text-center text-sm text-gray-500">
                            No hay datos aún
                        </td>
                    </tr>
                )}
                </tbody>
            </table>
        </div>
    );
}
