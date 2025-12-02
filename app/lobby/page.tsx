"use client"

import {useUserStore} from "@/app/store/user-store";

const Lobby = () => {
    const {username} = useUserStore()

    return (
        <div>
            <h1>Bienvenido {username}</h1>
        </div>
    )
}

export default Lobby;