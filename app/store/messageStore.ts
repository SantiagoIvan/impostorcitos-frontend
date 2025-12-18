import { create } from "zustand";
import { Message } from "@/lib";

interface MessageStore {
    messages: Message[];
    setMessages: (messages: Message[]) => void;
    addMessage: (message: Message) => void;
    clearMessages: () => void;
}

export const useMessagesStore = create<MessageStore>((set) => ({
    messages: [],
    setMessages: (messages) => set({ messages }),
    addMessage: (message) =>
        set((state) => ({
            messages: [...state.messages, message],
        })),
    clearMessages: () => set({ messages: [] }), // por ahi estas funciones extras las uso en el futuro
}));
