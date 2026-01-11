import {defaultRoom, RoomDto, RoomType} from "@/lib";
import {Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle} from "@/components/ui/dialog";
import {Description} from "@radix-ui/react-dialog";
import PlayersList from "@/components/PlayersList";
import {Button} from "@/components/ui/button";
import {useUserStore} from "@/app/store/userStore";
import {useState} from "react";
import {Input} from "@/components/ui/input";
import {RoomService} from "@/app/services/room.service";
import {useRouter} from "next/navigation";
import {Label} from "@radix-ui/react-menu";
import {toast} from "sonner";
import {useLoading} from "@/context/LoadingContext";

export default function ConfirmationRoomModal(
    {room, open, setSelectedRoom, setSelectedRoomModalOpen}:
    {room: RoomDto, open: boolean, setSelectedRoom: (room: RoomDto) => void,setSelectedRoomModalOpen: (open: boolean) => void}
) {
    const { username } = useUserStore()
    const {startLoading, stopLoading} = useLoading()
    const [password, setPassword] = useState("");
    const router = useRouter()

    const handleRoomConfirmed = async () => {
        try {
            startLoading()
            await RoomService.joinRoom({roomId: room.id, username, password })
            router.push(`/game/room/${room.id}`)
        }catch (e){
            console.error(e)
            toast.error("Error al ingresar a la partida")
        }finally {
            setSelectedRoom(defaultRoom) // cosa de volver al estado inicial
            setSelectedRoomModalOpen(false)
            setPassword("")
            stopLoading()
        }
    }
    const handleEnter = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter") {
            handleRoomConfirmed();
        }
    }

    const handleModalClose = () => {
        setSelectedRoomModalOpen(false)
        setSelectedRoom(defaultRoom)
    }

    return (
        <>
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

                    {room.privacy === RoomType.PRIVATE && (
                        <>
                            <Label>Ingrese Password</Label>
                            <Input
                                autoFocus={true}
                                placeholder="Ej: ABC123"
                                value={password}
                                onChange={(e) => setPassword(e.target.value.substring(0, 15).toLowerCase())}
                                onKeyDown={handleEnter}
                            />
                        </>
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