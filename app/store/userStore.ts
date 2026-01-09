import { create } from "zustand";
import { persist } from "zustand/middleware";

type UserStore = {
    id: string;
    username: string;
    setUsername: (name: string) => void;
    setUser: ({id, username}: {id: string, username: string}) => void;
    clear: () => void;
};

export const useUserStore = create<UserStore>()(
    persist(
        (set) => ({
            id: "",
            username: "",
            setUsername: (name) => set({ username: name }),
            clear: () => set({ id: "", username: "" }),
            setUser: ({id, username}:{id: string, username: string}) => set({id, username}),
        }),
        {
            name: "user-storage",
            partialize: (state) => ({
                id: state.id,
                username: state.username,
            }),
        }
    )
);
