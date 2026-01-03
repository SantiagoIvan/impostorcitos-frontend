import { create } from "zustand";
import { persist } from "zustand/middleware";
import { disconnectSocket} from "@/app/services/socket.service";

type UserStore = {
    username: string;
    setUsername: (name: string) => void;
    clear: () => void;
    logout: () => void;
};

export const useUserStore = create<UserStore>()(
    persist(
        (set) => ({
            username: "",
            setUsername: (name) => set({ username: name }),
            clear: () => set({ username: "" }),
            logout: () => {
                disconnectSocket()
                set({
                    username: "",
                })
            },
        }),
        {
            name: "user-storage",
            partialize: (state) => ({
                username: state.username,
            }),
        }
    )
);
