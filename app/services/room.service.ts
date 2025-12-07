import {CreateRoomDto, JoinRoomDto} from "@/shared";

export const RoomService = {
    setAdminRoom: (name: string, roomDto: CreateRoomDto)  => {
        return {...roomDto, admin: name}
    },
    createJoinRoomDto: (roomId: string, username: string) : JoinRoomDto => { return {roomId, username}}
}