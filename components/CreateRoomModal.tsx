"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectTrigger,
    SelectValue,
    SelectContent,
    SelectItem,
} from "@/components/ui/select";

import { createRoomSchema, CreateRoomDto, RoomType } from "@/lib";
import {useUserStore} from "@/app/store/userStore";
import {RoomService} from "@/app/services/room.service";
import {useRoomsStore} from "@/app/store/roomsStore";
import {useState} from "react";
import LoadingOverlay from "@/components/LoadingOverlay";
import {useRoomsSocket} from "@/hooks/useRoomsSocket";

interface Props {
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export default function CreateRoomModal({ open, onOpenChange }: Props) {
    const { username } = useUserStore()
    const {addRoom} = useRoomsStore()
    const {joinRoom} = useRoomsSocket()
    const [loading, setLoading] = useState(false);
    const {
        register,
        handleSubmit,
        setValue,
        watch,
        formState: { errors },
    } = useForm<CreateRoomDto>({
        resolver: zodResolver(createRoomSchema),
        defaultValues: {
            admin: "",
            name: "",
            privacy: RoomType.PUBLIC,
            discussionTime: 20,
            voteTime: 11,
            moveTime: 11,
            maxPlayers: 10,
            password: "",
        },
    });

    const privacy = watch("privacy");

    const onSubmit = async (data: CreateRoomDto) => {
        try{
            setLoading(true)
            data = RoomService.setAdminRoom(username, data);
            const newRoom = await RoomService.createRoom(data)
            addRoom(newRoom)
            joinRoom({roomId: newRoom.id, username})
        }catch (e){
            console.error(e)
        }finally {
            onOpenChange(false);
            setLoading(false);
        }
    };

    return (
        <>
            {loading && <LoadingOverlay show={loading} />}
            <Dialog open={open} onOpenChange={onOpenChange}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Crear Room</DialogTitle>
                    </DialogHeader>

                    <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
                        {/* NOMBRE */}
                        <div className="item-form">
                            <Label>Nombre</Label>
                            <Input
                                {...register("name")}
                                onChange={(e) => {
                                    setValue("name", e.target.value.substring(0, 15).toLowerCase())
                                }}
                            />
                            {errors.name && (
                                <p className="text-red-600 text-sm">{errors.name.message}</p>
                            )}
                        </div>

                        {/* PRIVACY */}
                        <div className="item-form">
                            <Label>Privacidad</Label>
                            <Select
                                defaultValue={RoomType.PUBLIC}
                                value={privacy}
                                onValueChange={(value: RoomType) =>
                                    setValue("privacy", value)
                                }
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Elegir privacidad" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="public">Pública</SelectItem>
                                    <SelectItem value="private">Privada</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        {/* PASSWORD */}
                        {privacy === RoomType.PRIVATE && (
                            <div className="item-form">
                                <Label>Password</Label>
                                <Input type="password" {...register("password")} />
                                {errors.password && (
                                    <p className="text-red-600 text-sm">{errors.password.message}</p>
                                )}
                            </div>
                        )}

                        {/* DISCUSSION TIME */}
                        <div className="item-form">
                            <Label>Tiempo de discusión (seg)</Label>
                            <Input type="number" {...register("discussionTime", { valueAsNumber: true })} />
                            {errors.discussionTime && (
                                <p className="text-red-600 text-sm">{errors.discussionTime.message}</p>
                            )}
                        </div>

                        {/* VOTE TIME */}
                        <div className="item-form">
                            <Label>Tiempo para votar (seg)</Label>
                            <Input type="number" {...register("voteTime", { valueAsNumber: true })} />
                            {errors.voteTime && (
                                <p className="text-red-600 text-sm">{errors.voteTime.message}</p>
                            )}
                        </div>

                        {/* GAME TIME */}
                        <div className="item-form">
                            <Label>Tiempo de juego (seg)</Label>
                            <Input type="number" {...register("moveTime", { valueAsNumber: true })} />
                            {errors.moveTime && (
                                <p className="text-red-600 text-sm">{errors.moveTime.message}</p>
                            )}
                        </div>

                        {/* MAX PLAYERS */}
                        <div className="item-form">
                            <Label>Límite de jugadores</Label>
                            <Input type="number" {...register("maxPlayers", { valueAsNumber: true })} />
                            {errors.maxPlayers && (
                                <p className="text-red-600 text-sm">{errors.maxPlayers.message}</p>
                            )}
                        </div>

                        <DialogFooter>
                            <Button type="submit">Crear</Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
        </>
    );
}
