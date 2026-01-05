"use client"

import {ChatPanel} from "@/components/ChatPanel";
import {RoomsPanel} from "@/components/RoomsPanel";

const Lobby = () => {

    return (
        <main className="flex flex-col bg-background gap-10 w-full m-10 h-full">
            {/* Rooms Panel */}
            <div className="flex gap-4 w-full h-[75dvh]">
                <div className="flex w-full flex-col lg:flex lg:w-1/2">
                    <RoomsPanel />
                </div>
                {/* Chat Panel */}
                <div className="flex w-full flex-col lg:w-1/2 ">
                    <ChatPanel />
                </div>
            </div>
        </main>
    )
}

export default Lobby;