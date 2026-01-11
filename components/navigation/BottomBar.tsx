"use client";

import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import CreateRoomModal from "@/components/CreateRoomModal";
import JoinRoomModal from "@/components/JoinRoomModal";
import {getNavigationItems} from "@/components/navigation/navigation.config";
import {cn} from "@/lib";
import {useNavigationActions} from "@/hooks/useNavigationActions";

export function BottomBar() {
    const pathname = usePathname()
    const {actions, openJoinDialog, openCreateDialog, setOpenJoinDialog, setOpenCreateDialog} = useNavigationActions()

    const items = getNavigationItems(pathname).filter((item) =>
        item.visible(pathname)
    );


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
