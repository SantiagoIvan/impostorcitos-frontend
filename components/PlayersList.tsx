import {defaultRoom, PlayerDto, RoomDto} from "@/lib";
import {CheckIcon, XIcon} from "lucide-react";

export default function PlayersList ({room = defaultRoom, waitingRoomFlag = false}   : {room: RoomDto, waitingRoomFlag?: boolean}) {

    return (
        room.players.length > 0 && (
        <ul className="text-sm space-y-1">
            {room.players.map((player: PlayerDto) => {
                return (
                    <li
                    key={player.name}
                    className="px-2 py-1 rounded bg-muted flex flex-row justify-between items-center"
                >
                    <p className="text-xl">{player.name}</p>
                    {
                        waitingRoomFlag &&
                        (player.isReady?
                                <CheckIcon className="w-5 h-full rounded-full text-green-800" /> :
                                <XIcon className="w-5 h-full rounded-full text-red-800" />
                        )
                    }
                </li>
                )
            })}
        </ul>))
}
