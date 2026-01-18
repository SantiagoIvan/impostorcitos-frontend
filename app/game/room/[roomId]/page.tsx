"use client"

import {ChatPanel} from "@/components/ChatPanel";
import { Button } from "@/components/ui/button";
import {useEffect, useState} from "react";
import {useParams} from "next/navigation";
import {useRoomsStore} from "@/app/store/roomsStore";
import {useUserStore} from "@/app/store/userStore";
import PlayersList from "@/components/PlayersList";
import {useWaitingRoomSocket} from "@/hooks/useWaitingRoomSocket";
import {toast} from "sonner";
import {useRedirectToLobby} from "@/hooks/useRedirectToLobby";
import {ArrowLeft, PenIcon} from "lucide-react";
import UpdateTopicModal from "@/components/UpdateTopicModal";
import {defaultRoom, PlayerDto} from "@/lib";
import {RoomService} from "@/app/services/room.service";
import {useLoading} from "@/context/LoadingContext";

const greenStyle = "bg-emerald-500/80 hover:bg-green-800/80"
const redStyle = "bg-red-400/80 hover:bg-red-800/80"

const WaitingRoom = () => {
    const {roomId} = useParams<{roomId: string}>();
    const { username } = useUserStore();
    const { clearCurrentRoom, currentRoom, setCurrentRoom } = useRoomsStore();
    const [ready, setReady] = useState<boolean>(false); // para setear ready o not ready
    const { redirectToLobby } = useRedirectToLobby()
    const { emitUserReady, emitStartGame, emitUpdateTopic, emitLeaveEvent } = useWaitingRoomSocket(roomId)
    const MIN_PLAYERS_QUANTITY = process.env.NEXT_PUBLIC_MIN_PLAYERS_QTY as unknown as number;
    const [showEditTopicModal, setShowEditTopicModal] = useState<boolean>(false);
    const {startLoading, stopLoading} = useLoading()

    const handleBack = () => {
        emitLeaveEvent({roomId, username});
        clearCurrentRoom();
        redirectToLobby()
    }

    const handleReady = () => {
        setReady((prevState) => !prevState); // emitir evento asi se enteran todos
        emitUserReady(username)
    }

    const getTopic = () => {
        return currentRoom?.randomTopic ? "Random": currentRoom?.topic
    }
    const allReady = () => currentRoom?.players?.every((player: PlayerDto) => player.isReady)

    const minPlayersRequired = () => currentRoom?.players?.length >= MIN_PLAYERS_QUANTITY

    const canStartGame = () => allReady() && minPlayersRequired()

    const amIAdmin = () => username === currentRoom?.admin

    const handleStart = () => {
        if(!allReady()) {
            toast.error("Todos deben estar listos");
            return
        }
        if(!minPlayersRequired()) {
            toast.error(`Debe haber un minimo de ${MIN_PLAYERS_QUANTITY} jugadores para comenzar`);
        } else {
            toast.message("Redireccionando a la partida...")
            emitStartGame(roomId); // En useWaitingRoomSocket tengo el listener para accionar cuando me llega el evento
        }
    }

    const handleNewTopicConfirmed = (selectedTopic: string, randomFlag: boolean) => {
        try{
            emitUpdateTopic(selectedTopic, randomFlag)
        }catch (e){
            console.error(e)
        }
    }

    useEffect(() => {
        const loadRoom = async () => {
            try{
                startLoading();
                const room = await RoomService.getRoomById(roomId);
                setCurrentRoom(room)
            }catch (e) {
                stopLoading();
                console.log(e)
                redirectToLobby()
            }
        }

        loadRoom();
    }, []);

    return (
        <>
            {showEditTopicModal &&
                <UpdateTopicModal
                    open={showEditTopicModal}
                    setOpen={setShowEditTopicModal}
                    onSubmit={handleNewTopicConfirmed}
                />
            }
            <div className="flex flex-col justify-around min-h-full gap-10 w-full max-w-1/3 min-w-100 mx-auto ">
                <div className="flex gap-10 text-left ">
                    <ArrowLeft className="h-20 w-20 cursor-pointer" onClick={handleBack}/>
                    <div className="flex flex-col justify-center gap-2 w-full mx-10 border-b-4 pb-4" >
                        <h1 className="text-2xl my-auto font-extrabold">Sala {currentRoom.name}</h1>
                        <h3 className="text-xl font-semibold text-green-700">ID: {roomId}</h3>
                        <div className="flex flex-row justify-between">
                            <h3 className="text-xl font-semibold text-green-700">Topico: {getTopic()}</h3>
                            {amIAdmin() &&
                                (<Button
                                    onClick={() => setShowEditTopicModal(true)}
                                    className="cursor-pointer"
                                >
                                    <PenIcon className="h-5 w-5"/>
                                </Button>
                                )
                            }

                        </div>
                    </div>
                </div>
                <div className="flex w-full flex-col lg:flex">
                    <PlayersList room={currentRoom} waitingRoomFlag={true}/>
                </div>
                <div className="flex gap-4 justify-center">
                    <Button className={`h-14 w-20px px-10 font-bold text-xl cursor-pointer ${!ready? `${greenStyle}` : `${redStyle}`}`} onClick={handleReady}>{!ready ? "Listo!" : "Noo, banca"}</Button>
                    {amIAdmin() && <Button className={`h-14 w-20px px-10 font-bold text-xl cursor-pointer ${canStartGame()? `${greenStyle}` : `${redStyle}`}`} onClick={handleStart}>Start</Button>}
                </div>
            </div>
        </>

    )
}

export default WaitingRoom;