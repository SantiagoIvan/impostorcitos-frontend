import { create } from "zustand";
import {Player, Room} from "@/shared";
import {defaultRoom} from "@/shared/defaultValues/room";

interface RoomStore {
    rooms: Room[];
    setRooms: (rooms: Room[]) => void;
    addRoom: (room: Room) => void;
    getRoomById: (id: string) => Room;
    addNewPlayerToRoom: (newPlayer: Player, roomId: string) => Room;
}

export const useRoomsStore = create<RoomStore>((set, get) => ({
    rooms: [],

    setRooms: (rooms) => set({ rooms }),

    addRoom: (room) =>
        set((state) => ({
            rooms: [...state.rooms, room],
        })),
    getRoomById: (roomId : string) : Room => get().rooms.find((room) => room.id === roomId) || defaultRoom,
    addNewPlayerToRoom: (newPlayer: Player, roomId: string) => {
        const room = get().getRoomById(roomId)
        room.players.push(newPlayer);
        return room;
    }
}));
