import Room from "@/app/types/Room";
import {RoomType} from "@/app/types/roomType.enum";

const API_URL = process.env.NEXT_PUBLIC_API_URL;
const env = process.env.NEXT_PUBLIC_ENV;

const rooms = [
    {
        id: 1,
        name: "Room Alpha",
        privacy: RoomType.PUBLIC,
        createdAt: "Hace 2 horas",
    },
    {
        id: 2,
        name: "Room Beta",
        privacy: RoomType.PUBLIC,
        createdAt: "Hace 5 horas",
    },
    {
        id: 3,
        name: "Room Gamma",
        password: "123",
        privacy: RoomType.PRIVATE,
        createdAt: "Hace 1 día",
    },
    {
        id: 4,
        name: "Room Delta",
        privacy: RoomType.PUBLIC,
        createdAt: "Hace 3 días",
    },
    {
        id: 5,
        name: "Room Epsilon",
        privacy: RoomType.PUBLIC,
        createdAt: "Hace 6 horas",
    },
    {
        id: 6,
        name: "Room Zeta",
        password: "asd",
        privacy: RoomType.PRIVATE,
        createdAt: "Hace 2 días",
    },
]

export async function getRooms(): Promise<Room[]> {
    if(env=="DEV"){
        await new Promise((resolve) => setTimeout(resolve, 300))
        return rooms;
    }

    const res = await fetch(API_URL + "/rooms", {
        method: "GET",
    });
    if (!res.ok) {
        throw new Error("Error fetching messages");
    }

    return res.json();
}
