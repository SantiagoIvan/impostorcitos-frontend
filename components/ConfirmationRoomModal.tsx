import {defaultRoom, RoomDto, RoomEvents} from "@/lib";
import {Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle} from "@/components/ui/dialog";
import {Description} from "@radix-ui/react-dialog";
import PlayersList from "@/components/PlayersList";
import {Button} from "@/components/ui/button";
import { useRouter } from "next/navigation";
import {useSocket} from "@/hooks/useSocket";
import {useUserStore} from "@/app/store/userStore";
import {RoomService} from "@/app/services/room.service";
import {useRoomsSocket} from "@/hooks/useRoomsSocket";
import {useState} from "react";
import LoadingOverlay from "@/components/LoadingOverlay";

export default function ConfirmationRoomModal(
    {room, open, setSelectedRoom, setSelectedRoomModalOpen}:
    {room: RoomDto, open: boolean, setSelectedRoom: (room: RoomDto) => void,setSelectedRoomModalOpen: (open: boolean) => void}
) {
    const {joinRoom} = useRoomsSocket()
    const { username } = useUserStore()
    const [loading, setLoading] = useState(false);

    const handleRoomConfirmed = async () => {
        try {
            setLoading(true)
            setSelectedRoom(defaultRoom) // cosa de volver al estado inicial
            joinRoom({username, roomId: room.id })
        }catch (e){
            console.error(e)
        }finally {
            setSelectedRoomModalOpen(false)
            setLoading(false)
        }
    }

    const handleModalClose = () => {
        setSelectedRoomModalOpen(false)
        setSelectedRoom(defaultRoom)
    }

    return (
        <>
            {loading && <LoadingOverlay show={loading} />}
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
        </>
    )
}