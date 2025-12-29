import { create } from "zustand";
import {GameDto, defaultGame, VoteDto} from "@/lib";

interface GameStore {
    game: GameDto;
    setGame: (game: GameDto) => void;
    updateVotes: (votes: VoteDto[]) => void;
}

export const useGameStore = create<GameStore>((set, get) => ({
    game: defaultGame,
    setGame: (game: GameDto) => set({ game }),
    updateVotes: (votes: VoteDto[]) => set({ game: {...get().game, votes}}),
}));
