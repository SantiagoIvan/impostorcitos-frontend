import { create } from "zustand";
import {JoinRoomDto, Room} from "@/shared";
import {defaultRoom} from "@/shared/defaultValues/room";
import {PlayerService} from "@/app/services/player.service";
import {ParamValue} from "next/dist/server/request/params";

interface RoomStore {
    rooms: Room[];
    setRooms: (rooms: Room[]) => void;
    addRoom: (room: Room) => void;
    getRoomById: (id?: ParamValue) => Room;
    addNewPlayerToRoom: (incomingPlayer: JoinRoomDto) => Room;
}

export const useRoomsStore = create<RoomStore>((set, get) => ({
    rooms: [],

    setRooms: (rooms) => set({ rooms }),

    addRoom: (room) =>
        set((state) => ({
            rooms: [...state.rooms, room],
        })),
    getRoomById: (roomId? : ParamValue) : Room => get().rooms.find((room) => room.id === roomId) || defaultRoom,
    addNewPlayerToRoom: (incomingPlayer: JoinRoomDto) => {
        const room = get().getRoomById(incomingPlayer.roomId)
        const newPlayer = PlayerService.createPlayer(incomingPlayer.username);
        room.players.push(newPlayer);
        return room;
    }
}));
