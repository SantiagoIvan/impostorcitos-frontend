"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Search, Circle } from "lucide-react"
import {useRoomsStore} from "@/app/store/roomsStore";
import {defaultRoom, Player, Room, RoomType} from "@/shared"
import {useRoomsSocket} from "@/hooks/useRoomsSocket";
import {
    Dialog, DialogClose,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "./ui/button"
import {useRouter} from "next/navigation";
import {Description} from "@radix-ui/react-dialog";
import PlayersList from "@/components/PlayersList";
import ConfirmationRoomModal from "@/components/ConfirmationRoomModal";


export function RoomsPanel() {
    useRoomsSocket();
    const [searchQuery, setSearchQuery] = useState("")
    const rooms = useRoomsStore(state => state.rooms)
    const [selectedRoom, setSelectedRoom] = useState<Room>(() => defaultRoom)
    const [selectedRoomModalOpen, setSelectedRoomModalOpen] = useState<boolean>(false)
    const router = useRouter();


    const filterRooms = (rooms: Room[], rawQuery: string): Room[] => {
        const query = rawQuery.toLowerCase().trim();
        if (!query) return rooms;

        return rooms.filter((room) =>
            room.name.toLowerCase().includes(query) ||
            room.privacy.toLowerCase().includes(query)
        );
    };

    const getPrivacyColor = (privacy: string) => {
        switch (privacy) {
            case RoomType.PUBLIC:
                return "bg-green-500/10 text-green-600 dark:text-green-400 hover:bg-green-500/20"
            case RoomType.PRIVATE:
                return "bg-rose-500/10 text-rose-600 dark:text-rose-400 hover:bg-rose-500/20"
            default:
                return "bg-muted text-muted-foreground"
        }
    }

    const getPrivacyDotColor = (privacy: string) => {
        switch (privacy) {
            case RoomType.PUBLIC:
                return "text-green-500"
            case RoomType.PRIVATE:
                return "text-rose-500"
            default:
                return "text-muted-foreground"
        }
    }

    const handleRoomClick = (room: Room) => {
        setSelectedRoom(room)
        setSelectedRoomModalOpen(true)
    }

    const handleRoomConfirmed = () => {
        setSelectedRoom(defaultRoom)
        setSelectedRoomModalOpen(false)
        router.push(`/game/room/${selectedRoom?.id}`);
    }

    const handleModalClose = () => {
        setSelectedRoomModalOpen(false)
        setSelectedRoom(defaultRoom)
    }

    return (
        <>
            {/* CONTENEDOR DE LA LISTA DE ROOMS*/}
            <Card className="flex h-full flex-col cursor-pointer">
                <CardHeader className="border-b border-border">
                    <CardTitle className="text-lg">Salas disponibles</CardTitle>
                    <div className="relative mt-4">
                        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                        <Input
                            placeholder="Buscar salas..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="pl-9"
                        />
                    </div>
                </CardHeader>

                <CardContent className="flex-1 p-0">
                    <ScrollArea className="h-full">
                        <div className="divide-y divide-border">
                            {filterRooms(rooms, searchQuery).map((room) => (
                                <div
                                    className="flex rooms-start gap-3 p-4 transition-colors hover:bg-muted/50"
                                    onClick={() => handleRoomClick(room)}
                                    key={room.id}
                                >
                                    <Circle className={`mt-1 h-2 w-2 fill-current ${getPrivacyDotColor(room.privacy)}`} />
                                    <div className="flex-1 space-y-1">
                                        <div className="flex rooms-center justify-between gap-2">
                                            <h3 className="font-medium leading-none">{room.name}</h3>
                                            <Badge variant="secondary" className={getPrivacyColor(room.privacy)}>
                                                {room.privacy}
                                            </Badge>
                                        </div>
                                        <p className="text-xs text-muted-foreground">{`${room.players.length}/${room.maxPlayers}`}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </ScrollArea>
                </CardContent>
            </Card>

            { /* MODAL DE CONFIRMACION*/}
            <ConfirmationRoomModal
                room={selectedRoom}
                open={selectedRoomModalOpen}
                onOpenChange={handleModalClose}
                handleRoomConfirmed={handleRoomConfirmed}
            />
        </>
    )
}
