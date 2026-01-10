"use client"

import {useEffect, useRef, useState} from "react"
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card"
import {Input} from "@/components/ui/input"
import {Badge} from "@/components/ui/badge"
import {ScrollArea} from "@/components/ui/scroll-area"
import {Circle, Search} from "lucide-react"
import {useRoomsStore} from "@/app/store/roomsStore"
import {defaultRoom, RoomDto, RoomType} from "@/lib"
import {useRoomsSocket} from "@/hooks/useRoomsSocket"
import ConfirmationRoomModal from "@/components/ConfirmationRoomModal"
import {toast} from "sonner"
import {RoomService} from "@/app/services/room.service";


export function RoomsPanel() {
    useRoomsSocket();
    const [searchQuery, setSearchQuery] = useState("")
    const rooms = useRoomsStore(state => state.rooms)
    const {setRooms} = useRoomsStore()
    const [selectedRoom, setSelectedRoom] = useState<RoomDto>(() => defaultRoom)
    const [selectedRoomModalOpen, setSelectedRoomModalOpen] = useState<boolean>(false)
    const bottomRef = useRef<HTMLDivElement | null>(null);

    const filterRooms = (rooms: RoomDto[], rawQuery: string): RoomDto[] => {
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

    const handleRoomClick = (room: RoomDto) => {
        if(room.players.length >= room.maxPlayers) {
            toast.error("Sala llena");
            return
        }
        setSelectedRoom(room)
        setSelectedRoomModalOpen(true)
    }


    useEffect(() => {
        bottomRef.current?.scrollIntoView({
            behavior: "smooth",
        });
    }, [rooms]);



    return (
        <>
            {/* CONTENEDOR DE LA LISTA DE ROOMS*/}
            <Card className="flex h-full flex-col">
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

                <CardContent className="flex-1 p-0 overflow-y-auto shrink-0">
                    <ScrollArea className="h-full ">
                        <div className="divide-y divide-border">
                            {filterRooms(rooms, searchQuery).map((room) => (
                                <div
                                    className="flex rooms-start gap-3 p-4 transition-colors hover:bg-muted/50 cursor-pointer"
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
                            <div ref={bottomRef}></div>
                        </div>
                    </ScrollArea>
                </CardContent>
            </Card>

            { /* MODAL DE CONFIRMACION*/}
            <ConfirmationRoomModal
                room={selectedRoom}
                open={selectedRoomModalOpen}
                setSelectedRoom={setSelectedRoom}
                setSelectedRoomModalOpen={setSelectedRoomModalOpen}
            />
        </>
    )
}
