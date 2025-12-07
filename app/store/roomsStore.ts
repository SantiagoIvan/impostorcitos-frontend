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
    updateRoom: (room: Room) => void;
}

export const useRoomsStore = create<RoomStore>((set, get) => ({
    rooms: [],

    setRooms: (rooms) => set({ rooms }),

    addRoom: (room) =>
        set((state) => ({
            rooms: [...state.rooms, room],
        })),
    getRoomById: (roomId? : ParamValue) : Room => get().rooms.find((room) => room.id === roomId) || defaultRoom,
    updateRoom: (updatedRoom: Room) =>
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
