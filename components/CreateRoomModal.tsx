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

import {createRoomSchema, CreateRoomDto, RoomType, topics} from "@/lib";
import {useUserStore} from "@/app/store/userStore";
import {RoomService} from "@/app/services/room.service";
import {useRoomsStore} from "@/app/store/roomsStore";
import {Checkbox} from "@/components/ui/checkbox";
import {useRouter} from "next/navigation";
import {useLoading} from "@/context/LoadingContext";

interface Props {
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export default function CreateRoomModal({ open, onOpenChange }: Props) {
    const { username } = useUserStore()
    const {addRoom} = useRoomsStore()
    const {startLoading, stopLoading} = useLoading()
    const router = useRouter()
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
            topic: topics[0],
            randomTopic: false,
            privacy: RoomType.PUBLIC,
            discussionTime: 30,
            voteTime: 20,
            moveTime: 20,
            maxPlayers: 5,
            password: "",
        },
    });

    const privacy = watch("privacy");

    const onSubmit = async (data: CreateRoomDto) => {
        try{
            startLoading()
            data = RoomService.setAdminRoom(username, data);
            const newRoom = await RoomService.createRoom(data)
            await RoomService.joinRoom({roomId: newRoom.id, username, password: data.password})
            addRoom(newRoom)
            router.push(`/game/room/${newRoom.id}`)
        }catch (e){
            console.error(e)
        }finally {
            onOpenChange(false);
            stopLoading();
        }
    };

    return (
        <>
            <Dialog open={open} onOpenChange={onOpenChange}>
                <DialogContent
                    className="
            w-[95vw]
            max-w-lg
            max-h-[90vh]
            overflow-y-auto
            px-4
            sm:px-6
            rounded-lg
        "
                >
                    <DialogHeader>
                        <DialogTitle className="text-xl sm:text-2xl">
                            Crear partida
                        </DialogTitle>
                    </DialogHeader>

                    <form
                        className="flex flex-col gap-4 sm:gap-5"
                        onSubmit={handleSubmit(onSubmit)}
                    >
                        {/* NOMBRE */}
                        <div className="flex flex-col gap-1">
                            <Label>Nombre</Label>
                            <Input
                                {...register("name")}
                                onChange={(e) =>
                                    setValue(
                                        "name",
                                        e.target.value.substring(0, 15).toLowerCase()
                                    )
                                }
                            />
                            {errors.name && (
                                <p className="text-red-600 text-sm">
                                    {errors.name.message}
                                </p>
                            )}
                        </div>

                        {/* PRIVACY */}
                        <div className="flex flex-col gap-1">
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
                            <div className="flex flex-col gap-1">
                                <Label>Password</Label>
                                <Input type="password" {...register("password")} />
                                {errors.password && (
                                    <p className="text-red-600 text-sm">
                                        {errors.password.message}
                                    </p>
                                )}
                            </div>
                        )}

                        {/* TIMES */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="flex flex-col gap-1">
                                <Label>Discusión (seg)</Label>
                                <Input
                                    type="number"
                                    {...register("discussionTime", {
                                        valueAsNumber: true,
                                    })}
                                />
                                {errors.discussionTime && (
                                    <p className="text-red-600 text-sm">
                                        {errors.discussionTime.message}
                                    </p>
                                )}
                            </div>

                            <div className="flex flex-col gap-1">
                                <Label>Votación (seg)</Label>
                                <Input
                                    type="number"
                                    {...register("voteTime", {
                                        valueAsNumber: true,
                                    })}
                                />
                                {errors.voteTime && (
                                    <p className="text-red-600 text-sm">
                                        {errors.voteTime.message}
                                    </p>
                                )}
                            </div>

                            <div className="flex flex-col gap-1">
                                <Label>Jugada (seg)</Label>
                                <Input
                                    type="number"
                                    {...register("moveTime", {
                                        valueAsNumber: true,
                                    })}
                                />
                                {errors.moveTime && (
                                    <p className="text-red-600 text-sm">
                                        {errors.moveTime.message}
                                    </p>
                                )}
                            </div>

                            <div className="flex flex-col gap-1">
                                <Label>Máx. jugadores</Label>
                                <Input
                                    type="number"
                                    {...register("maxPlayers", {
                                        valueAsNumber: true,
                                    })}
                                />
                                {errors.maxPlayers && (
                                    <p className="text-red-600 text-sm">
                                        {errors.maxPlayers.message}
                                    </p>
                                )}
                            </div>
                        </div>

                        {/* TOPIC */}
                        <div className="flex flex-col gap-2">
                            <Label>Tópico</Label>

                            <div className="flex flex-col sm:flex-row gap-3 sm:items-center">
                                <Select
                                    value={watch("topic")}
                                    onValueChange={(value) =>
                                        setValue("topic", value)
                                    }
                                    disabled={watch("randomTopic")}
                                >
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="Seleccionar tópico" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {topics.map((topic) => (
                                            <SelectItem key={topic} value={topic}>
                                                {topic}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>

                                <div className="flex items-center gap-2">
                                    <Checkbox
                                        checked={watch("randomTopic")}
                                        onCheckedChange={(checked) =>
                                            setValue(
                                                "randomTopic",
                                                Boolean(checked)
                                            )
                                        }
                                    />
                                    <Label className="cursor-pointer">
                                        Random
                                    </Label>
                                </div>
                            </div>

                            {errors.topic && (
                                <p className="text-red-600 text-sm">
                                    {errors.topic.message}
                                </p>
                            )}
                        </div>

                        <DialogFooter className="pt-4">
                            <Button type="submit" className="w-full sm:w-auto">
                                Crear
                            </Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>

        </>
    );
}