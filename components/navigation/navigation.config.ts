import { LogOut, PlusCircle, LogIn, MessageCircle  } from "lucide-react";

export type NavActionId = "create" | "join" | "chat" | "logout";

export type NavItem = {
    id: NavActionId;
    label: string;
    icon: any;
    visible: (pathname: string) => boolean;
};

export const getNavigationItems = (
    pathname: string,
): NavItem[] => [
    {
        id: "chat",
        label: "Chat",
        icon: MessageCircle,
        visible: () => pathname.startsWith("/game"),
    },
    {
        id: "create",
        label: "Crear",
        icon: PlusCircle,
        visible: () => pathname === "/game/lobby",
    },
    {
        id: "join",
        label: "Unirse",
        icon: LogIn,
        visible: () => pathname === "/game/lobby",
    },
    {
        id: "logout",
        label: "Salir",
        icon: LogOut,
        visible: () => pathname.startsWith("/game"),
    },
];
