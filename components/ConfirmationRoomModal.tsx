import {defaultRoom, Room} from "@/shared";
import {Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle} from "@/components/ui/dialog";
import {Description} from "@radix-ui/react-dialog";
import PlayersList from "@/components/PlayersList";
import {Button} from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function ConfirmationRoomModal(
    {room, open, setSelectedRoom, setSelectedRoomModalOpen}:
    {room: Room, open: boolean, setSelectedRoom: (room: Room) => void,setSelectedRoomModalOpen: (open: boolean) => void}
) {
    const router = useRouter();
    const handleRoomConfirmed = () => {
        setSelectedRoom(defaultRoom)
        setSelectedRoomModalOpen(false)
        router.push(`/game/room/${room.id}`)
    }

    const handleModalClose = () => {
        setSelectedRoomModalOpen(false)
        setSelectedRoom(defaultRoom)
    }
    return (
        <Dialog open={open} onOpenChange={handleModalClose}>
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