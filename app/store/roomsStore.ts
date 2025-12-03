import { create } from "zustand";
import {Room}from "@impostorcitos/shared";

interface RoomStore {
    rooms: Room[];
    setRooms: (rooms: Room[]) => void;
    addRoom: (room: Room) => void;
}

export const useRoomsStore = create<RoomStore>((set) => ({
    rooms: [],

    setRooms: (rooms) => set({ rooms }),

    addRoom: (room) =>
        set((state) => ({
            rooms: [...state.rooms, room],
        })),
}));
