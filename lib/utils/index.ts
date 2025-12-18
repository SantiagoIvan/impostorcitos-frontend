import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import {Move} from "@/lib";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Convierte una lista de RoundWordEntry en:
 * - players: array de { playerId, playerName }
 * - roundsCount: número máximo de rondas encontrado
 * - matrix: Record<playerId, string[]> donde cada array tiene length = roundsCount
 */
export function buildRoundTable(moves: Move[]) {
  // obtener conjunto de jugadores y su nombre (mantener orden de aparición)
  const players : string[] = moves.map((move: Move) => move.player)

  // número de rondas máximo round encontrado
  const roundsCount = moves.reduce((index, move) => Math.max(index, move.roundId), 0);

  // inicializar matriz vacía por jugador
  const matrix: Record<string, string[]> = {};
  for (const player of players) {
    if(matrix[player] == null) {
        matrix[player] = Array.from({ length: Math.max(roundsCount, 1) }).map(() => "");
    }
  }

  // poblar matriz
  for (const move of moves) {
    matrix[move.player][move.roundId - 1] = move.word;
  }

  return { players, roundsCount, matrix };
}
