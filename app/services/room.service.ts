import {CreateRoomDto, JoinRoomDto, RoomDto} from "@/lib";
import {api} from "@/app/services/api";

export const RoomService = {
    setAdminRoom: (name: string, roomDto: CreateRoomDto)  => {
        return {...roomDto, admin: name}
    },
    createJoinRoomDto: (roomId: string, username: string) : JoinRoomDto => { return {roomId, username}},
    createRoom: async (createRoomDto: CreateRoomDto) => {
        const response = await api.post("/room", createRoomDto);
        return response.data;
    }
}