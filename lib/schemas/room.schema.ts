import { z } from "zod";
import {RoomType} from "@/lib";

export const createRoomSchema = z.object({
    admin: z.string(),
    name: z.string().min(3, "El nombre debe tener al menos 3 caracteres"),
    privacy: z.enum(RoomType),
    password: z.string().optional(),
    discussionTime: z.number().min(10, "Debe ser mayor a 10 segundos"),
    voteTime: z.number().min(10, "Debe ser mayor a 10 segundos"),
    moveTime: z.number().min(10, "Debe ser mayor a 10 segundos"),
    maxPlayers: z.number().min(3, "Debe permitir al menos 3 jugadores"),
}).refine(
    (data) =>
        data.privacy === RoomType.PUBLIC || (data.privacy === RoomType.PRIVATE && data.password?.length),
    {
        message: "La password es obligatoria para rooms privados",
        path: ["password"],
    }
);