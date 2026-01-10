"use client";

import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import {useState} from "react";
import CreateRoomModal from "@/components/CreateRoomModal";
import JoinRoomModal from "@/components/JoinRoomModal";
import {getNavigationItems} from "@/components/navigation/navigation.config";
import {cn} from "@/lib";
import {useNavigationActions} from "@/hooks/useNavigationActions";
import {Sheet, SheetContent, SheetHeader, SheetTitle} from "@/components/ui/sheet";
import {VisuallyHidden} from "@radix-ui/react-visually-hidden";
import {ChatPanel} from "@/components/ChatPanel";
import {useGameStore} from "@/app/store/gameStore";

export function BottomBar() {
    const pathname = usePathname()
    const {game} = useGameStore()
    const {actions, openJoinDialog, openCreateDialog, setOpenJoinDialog, setOpenCreateDialog, isOpen, close} = useNavigationActions()

    const items = getNavigationItems(pathname).filter((item) =>
        item.visible(pathname)
    );
    const getRoomId = () =>
        pathname.split("/").some((p) => p.startsWith("room")) ? pathname.split("/").pop() : ""

    return (
        <>
            <nav className="h-16 border-t bg-background px-4">
                <div className="flex h-16 items-center justify-around bg-background px-2">
                    {items.map(({ id, label, icon: Icon }) => (
                        <Button
                            key={id}
                            variant="ghost"
                            size="sm"
                            onClick={actions[id]}
                            className={cn(
                                "flex h-full flex-col items-center justify-center gap-1 rounded-none text-xs",
                                id === "logout" && "text-destructive"
                            )}
                        >
                            <Icon className="h-5 w-5" />
                            <span className="leading-none">{label}</span>
                        </Button>
                    ))}
                </div>
            </nav>
            <CreateRoomModal open={openCreateDialog} onOpenChange={setOpenCreateDialog} />
            <JoinRoomModal open={openJoinDialog} setOpen={setOpenJoinDialog} />
            {/*<Sheet open={isOpen} onOpenChange={close}>
                <SheetContent side="bottom" className="h-[85vh] mx-16">
                    <SheetHeader>
                        <SheetTitle>
                            <VisuallyHidden>Chat</VisuallyHidden>
                        </SheetTitle>
                    </SheetHeader>

                    <ChatPanel roomId={getRoomId()} gameId={game.id}/>
                </SheetContent>
            </Sheet>*/}
        </>
    );
}
