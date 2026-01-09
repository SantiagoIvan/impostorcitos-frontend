import {useContext} from "react";
import {ChatPanelContext} from "@/context/ChatPanelContext";

export function useChatPanel() {
    const context = useContext(ChatPanelContext);

    if (!context) {
        throw new Error(
            "useChatPanel debe usarse dentro de un ChatPanelProvider"
        );
    }

    return {
        open: context.open,
        isOpen: context.isOpen,
        close: context.close,
        toggle: context.toggle
    };
}
