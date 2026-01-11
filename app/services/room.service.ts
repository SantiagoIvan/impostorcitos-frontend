import {CreateRoomDto, JoinRoomDto} from "@/lib";
import {api} from "@/app/services/api";

export const RoomService = {
    setAdminRoom: (name: string, roomDto: CreateRoomDto)  => {
        return {...roomDto, admin: name}
    },
    createJoinRoomDto: (roomId: string, username: string) : JoinRoomDto => { return {roomId, username}},
    createRoom: async (createRoomDto: CreateRoomDto) => {
        const response = await api.post("/room", createRoomDto);
        return response.data;
    },
    getRooms: async () => {
        const response = await api.get("/room");
        return response.data;
    },
    joinRoom: async (joinRoomDto: JoinRoomDto) => {
        const response = await api.post("/room/join", joinRoomDto);
        console.log("Joined to room: ", response.data);
        return response.data;
    }
}