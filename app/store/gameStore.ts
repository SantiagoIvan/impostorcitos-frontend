import { create } from "zustand";
import {defaultTurn, Game, Turn} from "@/shared";
import {defaultGame} from "@/shared";

interface GameStore {
    game: Game;
    setGame: (game: Game) => void;
}

export const useGameStore = create<GameStore>((set, get) => ({
    game: defaultGame,
    setGame: (game: Game) => set({ game })
}));
