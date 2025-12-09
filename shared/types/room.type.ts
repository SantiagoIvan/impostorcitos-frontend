import { RoomType } from "@/shared"
import {Player} from "@/shared"

export interface Room {
    id: string
    admin: string,
    name: string
    password?: string
    privacy: RoomType
    createdAt: string
    discussionTime: number // tiempo para discusion en segundos
    voteTime: number // tiempo para votar en segundos
    moveTime: number // tiempo para hacer tu jugada: elegir palabra
    maxPlayers: number
    players: Player[]
}