import { create } from "zustand";
import {Room}from "@/shared";
import {defaultRoom} from "@/shared/defaultValues/room";

interface RoomStore {
    rooms: Room[];
    setRooms: (rooms: Room[]) => void;
    addRoom: (room: Room) => void;
    getRoomById: (id: number) => Room;
}

export const useRoomsStore = create<RoomStore>((set, get) => ({
    rooms: [],

    setRooms: (rooms) => set({ rooms }),

    addRoom: (room) =>
        set((state) => ({
            rooms: [...state.rooms, room],
        })),
    getRoomById: (roomId : number) : Room => get().rooms.find((room) => room.id === roomId) || defaultRoom,
}));
