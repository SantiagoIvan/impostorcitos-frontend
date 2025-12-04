import {CreateRoomDto} from "@/shared";

export const RoomService = {
    setAdminRoom: (name: string, roomDto: CreateRoomDto)  => {
        return {...roomDto, admin: name}
    }
}