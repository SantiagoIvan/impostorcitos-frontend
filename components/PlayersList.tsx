import {defaultRoom, PlayerDto, RoomDto} from "@/lib";
import {CheckIcon, CrownIcon, XIcon} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default function PlayersList ({room = defaultRoom, waitingRoomFlag = false}   : {room: RoomDto, waitingRoomFlag?: boolean}) {

    return (
        room.players.length > 0 && (
            <Card className="w-full max-w-md mx-auto">
                <CardContent className="p-3 sm:p-4">
                    <ul className="space-y-2">
                        {room.players.map((player: PlayerDto) => {
                            const isAdmin = room.admin === player.name

                            return (
                                <li
                                    key={player.name}
                                    className="
                                      flex items-center justify-between
                                      rounded-md border bg-muted/50
                                      px-3 py-2
                                    "
                                >
                                    {/* Left side */}
                                    <div className="flex items-center gap-2 sm:gap-3 min-w-0">
                                        {isAdmin && (
                                            <CrownIcon className="h-4 w-4 text-yellow-500 shrink-0" />
                                        )}

                                        <span
                                            className="
                                              text-sm sm:text-base font-medium
                                              truncate
                                            "
                                        >
                                            {player.name}
                                        </span>
                                    </div>

                                    {/* Right side */}
                                    {waitingRoomFlag && (
                                        <div className="flex items-center gap-2 shrink-0">
                                            {player.isReady ? (
                                                <Badge
                                                    variant="secondary"
                                                    className="flex items-center gap-1 text-green-700"
                                                >
                                                    <CheckIcon className="h-3.5 w-3.5" />
                                                    <span className="hidden sm:inline">Listo</span>
                                                </Badge>
                                            ) : (
                                                <Badge
                                                    variant="secondary"
                                                    className="flex items-center gap-1 text-red-700"
                                                >
                                                    <XIcon className="h-3.5 w-3.5" />
                                                    <span className="hidden sm:inline">No listo</span>
                                                </Badge>
                                            )}
                                        </div>
                                    )}
                                </li>
                            )
                        })}
                    </ul>
                </CardContent>
            </Card>
        ))
}
