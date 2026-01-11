import {Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle} from "@/components/ui/dialog";
import {Button} from "@/components/ui/button";
import {useUserStore} from "@/app/store/userStore";
import {useRoomsSocket} from "@/hooks/useRoomsSocket";
import {useState} from "react";
import LoadingOverlay from "@/components/LoadingOverlay";
import {Input} from "@/components/ui/input";
import {toast} from "sonner";
import {RoomService} from "@/app/services/room.service";
import {Label} from "@/components/ui/label";
import {useRoomsStore} from "@/app/store/roomsStore";
import {useRouter} from "next/navigation";

export default function JoinRoomModal(
    {open, setOpen}:
    {open: boolean,setOpen: (open: boolean) => void}
) {
    const {setCurrentRoom} = useRoomsStore()
    const { username } = useUserStore()
    const router = useRouter()
    const [loading, setLoading] = useState(false);
    const [roomId, setRoomId] = useState("");
    const [password, setPassword] = useState("");

    const handleJoinRoomSubmit = async () => {
        try {
            setLoading(true)
            const res = await RoomService.joinRoom({roomId, username, password})
            setCurrentRoom(res)
            router.push(`/game/room/${res.id}`)
        }catch (e: any){
            console.error(e)
            toast.error(`Error: ${e.response.data.message}`)
        }finally {
            setOpen(false)
            setLoading(false)
        }
    }

    const handleEnter = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter") {
            handleJoinRoomSubmit();
        }
    }
    const handleModalClose = () => {
        setOpen(false)
    }

    return (
        <>
            {loading && <LoadingOverlay show={loading} />}
            <Dialog open={open} onOpenChange={handleModalClose}>
                <DialogContent
                    className="
            w-[95vw]
            max-w-sm
            sm:max-w-[425px]
            px-4
            sm:px-6
        "
                >
                    <DialogHeader>
                        <DialogTitle className="text-lg sm:text-xl">
                            Unirse a partida
                        </DialogTitle>
                    </DialogHeader>

                    <Label htmlFor="roomId" className="mt-2">
                        Ingrese ID de partida
                    </Label>
                    <Input
                        autoFocus
                        placeholder="Ej: ABC123"
                        value={roomId}
                        className="mt-2"
                        onChange={(e) =>
                            setRoomId(
                                e.target.value.substring(0, 15).toLowerCase()
                            )
                        }
                        onKeyDown={handleEnter}
                    />
                    <Label htmlFor="password" className="mt-2">
                        Ingrese password (opcional)
                    </Label>
                    <Input
                        autoFocus
                        placeholder="Ej: pass123"
                        value={password}
                        className="mt-2"
                        onChange={(e) =>
                            setPassword(
                                e.target.value.substring(0, 15).toLowerCase()
                            )
                        }
                        onKeyDown={handleEnter}
                    />

                    <DialogFooter
                        className="
                flex
                flex-col-reverse
                gap-2
                sm:flex-row
                sm:justify-end
            "
                    >
                        <DialogClose asChild>
                            <Button
                                variant="outline"
                                className="w-full sm:w-auto"
                            >
                                Cancelar
                            </Button>
                        </DialogClose>

                        <Button
                            onClick={handleJoinRoomSubmit}
                            className="w-full sm:w-auto"
                        >
                            Ingresar
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

        </>
    )
}