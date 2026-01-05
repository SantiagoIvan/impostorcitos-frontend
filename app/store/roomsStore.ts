import { create } from "zustand";
import { RoomDto, defaultRoom} from "@/lib";
import {ParamValue} from "next/dist/server/request/params";

interface RoomStore {
    rooms: RoomDto[];
    setRooms: (rooms: RoomDto[]) => void;
    addRoom: (room: RoomDto) => void;
    getRoomById: (id?: ParamValue) => RoomDto;
    updateRoom: (room: RoomDto) => void;
}

export const useRoomsStore = create<RoomStore>((set, get) => ({
    rooms: [],

    setRooms: (rooms) => set({ rooms }),

    addRoom: (room) => {
        const rooms = useRoomsStore.getState().rooms
        if(rooms.some(r => r.id === room.id)) return console.warn(
            `El room con id ${room.id} ya existe en el store`
        )
        set((state) => ({
            rooms: [...state.rooms, room],
        }))
    },
    getRoomById: (roomId? : ParamValue) : RoomDto => get().rooms.find((room) => room.id === roomId) || defaultRoom,
    updateRoom: (updatedRoom: RoomDto) =>
        set((state) => {
                const copyRooms = [...state.rooms];
                for (let i = 0; i < copyRooms.length; i++) {
                    if (copyRooms[i].id === updatedRoom.id) {
                        copyRooms[i] = {...updatedRoom};
                    }
                }
                return {
                    rooms: copyRooms,
                }
            }
        ),

}));
