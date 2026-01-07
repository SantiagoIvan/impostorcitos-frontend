import z from "zod";
import { createRoomSchema } from "@/lib";

export type Topic = z.infer<typeof createRoomSchema>["topic"]