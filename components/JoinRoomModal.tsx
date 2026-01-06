import {Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle} from "@/components/ui/dialog";
import {Button} from "@/components/ui/button";
import {useUserStore} from "@/app/store/userStore";
import {useRoomsSocket} from "@/hooks/useRoomsSocket";
import {useState} from "react";
import LoadingOverlay from "@/components/LoadingOverlay";
import {Input} from "@/components/ui/input";

export default function JoinRoomModal(
    {open, setOpen}:
    {open: boolean,setOpen: (open: boolean) => void}
) {
    const {joinRoom} = useRoomsSocket()
    const { username } = useUserStore()
    const [loading, setLoading] = useState(false);
    const [roomId, setRoomId] = useState("");

    const handleJoinRoomSubmit = async () => {
        try {
            setLoading(true)
            joinRoom({username, roomId })
        }catch (e){
            console.error(e)
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
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Ingrese ID de partida</DialogTitle>
                    </DialogHeader>
                    <Input
                        autoFocus={true}
                        placeholder="Ej: ABC123"
                        value={roomId}
                        onChange={(e) => setRoomId(e.target.value.substring(0, 15).toLowerCase())}
                        onKeyDown={handleEnter}
                    />
                    <DialogFooter>
                        <DialogClose asChild>
                            <Button variant="outline">Cancel</Button>
                        </DialogClose>
                        <Button onClick={handleJoinRoomSubmit}>Ingresar</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    )
}