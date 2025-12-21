import { create } from "zustand";
import {GameDto, defaultGame} from "@/lib";

interface GameStore {
    game: GameDto;
    setGame: (game: GameDto) => void;
}

export const useGameStore = create<GameStore>((set, get) => ({
    game: defaultGame,
    setGame: (game: GameDto) => set({ game })
}));
