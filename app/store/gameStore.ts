import { create } from "zustand";
import {Game, defaultGame} from "@/lib";

interface GameStore {
    game: Game;
    setGame: (game: Game) => void;
}

export const useGameStore = create<GameStore>((set, get) => ({
    game: defaultGame,
    setGame: (game: Game) => set({ game })
}));
