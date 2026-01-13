import { RoomType} from "@/lib";

export const defaultRoom = {
    id: "",
    admin: "",
    name: "",
    password: "",
    privacy: RoomType.PUBLIC,
    createdAt: "",
    discussionTime: 0,
    voteTime: 0,
    moveTime: 0,
    maxPlayers: 0,
    players: [],
    randomTopic: false,
    topic: "",
}