"use client"

import {useUserStore} from "@/app/store/userStore";
import {useParams} from "next/navigation";

const Game = () => {
    const { username } = useUserStore()
    const {roomId} = useParams<{roomId: string}>();

    return (
        <main>
            <h1>{`Playing as ${username} in ${roomId}`}</h1>
        </main>
    )
}

export default Game