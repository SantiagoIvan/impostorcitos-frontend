"use client"

import {ChatPanel} from "@/components/ChatPanel";
import {RoomsPanel} from "@/components/RoomsPanel";
import { Button } from "@/components/ui/button";

const Lobby = () => {

    return (
        <main className="flex flex-col bg-background gap-10 w-full m-10">
            {/* Rooms Panel */}
            <div className="flex gap-4 w-full">
                <div className="flex w-full flex-col lg:flex lg:w-1/2">
                    <RoomsPanel />
                </div>
                {/* Chat Panel */}
                <div className="flex w-full flex-col lg:w-1/2">
                    <ChatPanel />
                </div>

            </div>
            <div className="flex gap-4 justify-around">
                <Button>Crear sala</Button>
                <Button>Unirse por ID</Button>
            </div>
        </main>
    )
}

export default Lobby;