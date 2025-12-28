import { create } from "zustand";
import { persist } from "zustand/middleware";
import { disconnectSocket} from "@/app/services/socket.service";

type UserStore = {
    username: string;
    setUsername: (name: string) => void;
    clear: () => void;
    isAuthenticated: boolean;
    hasHydrated: boolean;
    login: (username: string) => void;
    logout: () => void;
};

export const useUserStore = create<UserStore>()(
    persist(
        (set) => ({
            username: "",
            setUsername: (name) => set({ username: name }),
            clear: () => set({ username: "", isAuthenticated: false }),
            isAuthenticated: false,
            login: (username) =>
                set({
                    username,
                    isAuthenticated: true,
                    hasHydrated: true
                }),
            logout: () => {
                disconnectSocket()
                set({
                    username: "",
                    isAuthenticated: false,
                })
            },
            hasHydrated: false,
        }),
        {
            name: "user-storage",
            partialize: (state) => ({
                username: state.username,
            }),
            onRehydrateStorage: () => (state) => {
                if (state?.username) {
                    state.isAuthenticated = true
                    state.hasHydrated = true
                }
            },
        }
    )
);
