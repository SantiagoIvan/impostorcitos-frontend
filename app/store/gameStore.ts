import { create } from "zustand";
import {defaultTurn, Game, Turn} from "@/shared";
import {defaultGame} from "@/shared";

interface GameStore {
    game: Game;
    currentTurn: Turn;
    setGame: (game: Game) => void;
    setTurn: (newTurn: Turn) => void;
}

export const useGameStore = create<GameStore>((set, get) => ({
    game: defaultGame,
    setGame: (game: Game) => set({ game }),
    currentTurn: defaultTurn,
    setTurn: (newTurn: Turn) => set({currentTurn: {...newTurn}})
}));
