import {Room} from "@/shared";
import {Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle} from "@/components/ui/dialog";
import {Description} from "@radix-ui/react-dialog";
import PlayersList from "@/components/PlayersList";
import {Button} from "@/components/ui/button";

export default function ConfirmationRoomModal({room, open, onOpenChange, handleRoomConfirmed}: {room: Room, open: boolean, onOpenChange: () => void, handleRoomConfirmed: () => void}) {
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>{room.name}</DialogTitle>
                </DialogHeader>
                <Description>
                    Jugadores en espera
                </Description>
                {room.players.length === 0 && (
                    <p className="text-sm text-muted-foreground">No hay jugadores aún.</p>
                )}

                <PlayersList room={room}/>
                <DialogFooter>
                    <DialogClose asChild>
                        <Button variant="outline">Cancel</Button>
                    </DialogClose>
                    <Button onClick={handleRoomConfirmed}>Ingresar</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}