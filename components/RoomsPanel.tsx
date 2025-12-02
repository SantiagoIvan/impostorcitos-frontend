"use client"

import {useEffect, useState} from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Search, Circle } from "lucide-react"
import Room from "@/app/types/Room";
import {getRooms as getRoomsService} from "@/lib/services/room.service";
import {RoomType} from "@/app/types/roomType.enum";


export function RoomsPanel() {
    const [searchQuery, setSearchQuery] = useState("")
    const [rooms, setRooms] = useState<Room[]>([])

    const filteredRooms = rooms.filter(
        (room) =>
            room.name.toLowerCase().includes(searchQuery.toLowerCase())
    )

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

    useEffect(() => {
        const getRooms = async () => {
            const newRooms = await getRoomsService()
            setRooms(newRooms)
        }
        getRooms()
    }, [searchQuery])


    return (
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
                        {filteredRooms.map((room) => (
                            <div key={room.id} className="flex rooms-start gap-3 p-4 transition-colors hover:bg-muted/50">
                                <Circle className={`mt-1 h-2 w-2 fill-current ${getPrivacyDotColor(room.privacy)}`} />
                                <div className="flex-1 space-y-1">
                                    <div className="flex rooms-center justify-between gap-2">
                                        <h3 className="font-medium leading-none">{room.name}</h3>
                                        <Badge variant="secondary" className={getPrivacyColor(room.privacy)}>
                                            {room.privacy}
                                        </Badge>
                                    </div>
                                    <p className="text-xs text-muted-foreground">{room.createdAt}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </ScrollArea>
            </CardContent>
        </Card>
    )
}
