import {defaultRoom, Player, Room} from "@/shared";
import {CheckIcon, XIcon} from "lucide-react";

export default function PlayersList ({room = defaultRoom, waitingRoomFlag = false}   : {room: Room, waitingRoomFlag?: boolean}) {

    return (
        <ul className="text-sm space-y-1">
            {room.players.map((player: Player, index: number) => (
                <li
                    key={index}
                    className="px-2 py-1 rounded bg-muted flex flex-row justify-between items-center"
                >
                    <p className="text-xl">{player.name}</p>
                    {/*
                        waitingRoomFlag &&
                        (player.isReady?
                                <CheckIcon className="w-5 h-full rounded-full text-green-800" /> :
                                <XIcon className="w-5 h-full rounded-full text-red-800" />
                        )
                    */}
                </li>
            ))}
        </ul>)
}
