"use client";

import { createContext, useContext, useState, ReactNode } from "react";

type ChatPanelContextType = {
    isOpen: boolean;
    open: () => void;
    close: () => void;
    toggle: () => void;
};

const ChatPanelContext = createContext<ChatPanelContextType | undefined>(
    undefined
);

export function ChatPanelProvider({ children }: { children: ReactNode }) {
    const [isOpen, setIsOpen] = useState(false);

    const open = () => setIsOpen(true);
    const close = () => setIsOpen(false);
    const toggle = () => setIsOpen((prev) => !prev);

    return (
        <ChatPanelContext.Provider value={{ isOpen, open, close, toggle }}>
            {children}
        </ChatPanelContext.Provider>
);
}
