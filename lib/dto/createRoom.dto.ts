import {z} from "zod"
import {createRoomSchema} from "@/lib";

export type CreateRoomDto = z.infer<typeof createRoomSchema>;