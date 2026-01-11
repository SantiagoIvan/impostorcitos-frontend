import { useEffect } from "react";
import {useSocket} from "@/hooks/useSocket";
import {GameDto, JoinRoomDto, RoomDto, RoomEvents, UpdateTopicDto} from "@/lib";
import {useRoomsStore} from "@/app/store/roomsStore";
import {useRouter} from "next/navigation";
import {useGameStore} from "@/app/store/gameStore";
import {useRedirectToLobby} from "@/hooks/useRedirectToLobby";


// En este hook puedo agregar otro tipo de eventos propios de un room, como por ejemplo algun audio como cuando
// mandas 11 por el chat de Age of Empires, o votar para echar a alguno que esta afk o nose.
export function useWaitingRoomSocket(roomId: string) {
    const {socket} = useSocket();
    const {setCurrentRoom} = useRoomsStore()
    const {setGame} = useGameStore()
    const router = useRouter()
    const {redirectToLobby} = useRedirectToLobby()

    const handleUserReady = (room: RoomDto) => {
        console.log("User ready: ", room)
        setCurrentRoom(room);
    }
    const handleGameStarting = (newGame : GameDto) => {
        setGame(newGame)
        router.push(`/game/match/${newGame.id}`);
    }
    const handleAbortRoom = () => {
        redirectToLobby()
    }
    const handleUpdatedTopic = (room: RoomDto) => {
        console.log("Updated topic: ", room)
        setCurrentRoom(room);
    }
    const handleNewPlayerJoined = (room: RoomDto) => {
        console.log("New player joined: ", room)
        setCurrentRoom(room);
    }
    const handleUserLeft = (room: RoomDto) => {
        console.log("User left room: ", room)
        setCurrentRoom(room);
    }

    const emitUserReady = (username: string) => {
        socket.emit(RoomEvents.READY, {roomId, username});
    }
    const emitStartGame = (roomId: string) => {
        socket.emit(RoomEvents.START_GAME, roomId);
    }
    const emitLeaveEvent = (outcomingPlayer: JoinRoomDto) => {
        console.log("Emitting leave event: ", outcomingPlayer)
        socket.emit(RoomEvents.LEAVE, outcomingPlayer);
    }
    const emitUpdateTopic = (topic: string, randomFlag: boolean) => {
        const msg: UpdateTopicDto = {
            roomId: roomId,
            newTopic: topic,
            randomFlag: randomFlag
        }
        socket.emit(RoomEvents.UPDATE_TOPIC, msg);
    }

    useEffect(() => {
        if (!socket) {
            console.error("Socket not connected yet")
            return;
        }
        socket.on(RoomEvents.USER_READY, handleUserReady)
        socket.on(RoomEvents.USER_LEFT, handleUserLeft);
        socket.on(RoomEvents.REDIRECT_TO_GAME, handleGameStarting)
        socket.on(RoomEvents.ABORT_ROOM, handleAbortRoom)
        socket.on(RoomEvents.UPDATED_TOPIC, handleUpdatedTopic)
        socket.on(RoomEvents.JOINED, handleNewPlayerJoined);

        return () => {
            socket.off(RoomEvents.USER_READY, handleUserReady);
            socket.off(RoomEvents.REDIRECT_TO_GAME, handleGameStarting);
        };
    }, [socket, roomId]);

    return {emitUserReady, emitStartGame, emitUpdateTopic, emitLeaveEvent}
}
