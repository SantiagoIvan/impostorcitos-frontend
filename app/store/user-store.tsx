import { create } from "zustand";

type UserStore = {
    username: string;
    setUsername: (name: string) => void;
    clear: () => void;
};

export const useUserStore = create<UserStore>((set) => ({
    username: "",
    setUsername: (name) => set({ username: name }),
    clear: () => set({ username: "" }),
}));
