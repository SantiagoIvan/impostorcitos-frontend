"use client"

import {useEffect, useRef, useState} from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Send } from "lucide-react"
import {useUserStore} from "@/app/store/userStore";
import {CreateMessageDto, Message, MessageEvents} from "@/lib"
import {useSocket} from "@/hooks/useSocket";
import {useMessagesStore} from "@/app/store/messageStore";
import {useMessagesSocket} from "@/hooks/useMessagesSocket";
import {DateService} from "@/app/services/date.service";


export function ChatPanel({roomId, gameId}: {roomId?: string, gameId?: string}) {
    useMessagesSocket(roomId)
    const {username} = useUserStore()
    const {socket} = useSocket();
    const {messages, clearMessages, setMessages} = useMessagesStore()
    const [inputValue, setInputValue] = useState("")
    const bottomRef = useRef<HTMLDivElement | null>(null);
    const NEXT_PUBLIC_MAX_MESSAGE_LENGTH = parseInt(process.env.NEXT_PUBLIC_MAX_MESSAGE_LENGTH || "80");

    const handleSendMessage = () => {
        if (inputValue.trim()) {
            const newMessage: CreateMessageDto = {
                roomId: roomId,
                gameId: gameId,
                text: inputValue,
                sender: username,
                createdAt: new Date().toISOString(),
            }
            socket.emit(MessageEvents.CREATE, newMessage)
            setInputValue("")
        }
    }

    const handleInputValueChange = (val: string) => {
        setInputValue(val.substring(0, NEXT_PUBLIC_MAX_MESSAGE_LENGTH))
    }

    useEffect(() => {
        bottomRef.current?.scrollIntoView({
            behavior: "smooth",
        });
    }, [messages]);

    useEffect(() => {
        clearMessages()
        const MESSAGE_TTL = parseInt(process.env.NEXT_PUBLIC_MESSAGE_TTL || "10000");
        const INTERVAL = parseInt(process.env.NEXT_PUBLIC_CLEANUP_JOB_INTERVAL || "10000");

        const id = setInterval(() => {
            setMessages(messages.filter(m => Date.now() - new Date(m.createdAt).getTime() <= MESSAGE_TTL))
        }, INTERVAL);

        return () => clearInterval(id);
    }, []);

    return (
        <Card className="flex h-full flex-col">
            <CardHeader className="border-b">
                <div className="flex items-center gap-3">
                    <Avatar>
                        <AvatarImage src="/placeholder.svg?height=40&width=40" />
                        <AvatarFallback className="bg-primary text-primary-foreground">Me</AvatarFallback>
                    </Avatar>
                    <div>
                        <CardTitle className="text-lg">Chat {!roomId? "general" : "room"}</CardTitle>
                        {/*<p className="text-sm text-muted-foreground">En línea</p> ESTO SE VA A SACAR DEL ESTADO DEL USUARIO*/}
                    </div>
                </div>
            </CardHeader>

            <CardContent className="flex flex-1 flex-col p-0 shrink-0 overflow-y-auto">
                <ScrollArea className="flex-1 p-4  min-h-0 ">
                    <div className="flex flex-col gap-4 ">
                        {messages.map((message) => (
                            <div key={message.id} className={`flex ${message.sender == username ? "justify-end" : "justify-start"}`}>
                                <div
                                    className={`max-w-[75%] rounded-lg whitespace-pre-wrap wrap-break-word px-4 py-2 ${
                                        message.sender == username ? "bg-primary text-primary-foreground" : "bg-muted text-foreground"
                                    }`}
                                >
                                    <span
                                        className="mt-1 block text-xs font-extrabold"
                                    >
                                        {message.sender}
                                    </span>
                                    <p className="text-sm leading-relaxed">{message.text}</p>
                                    <span
                                        className={`mt-1 block text-xs ${
                                            message.sender == username ? "text-primary-foreground/70" : "text-muted-foreground"
                                        }`}
                                    >
                                        {DateService.formatTime(message.createdAt)}
                                    </span>
                                </div>
                            </div>
                        ))}
                        <div ref={bottomRef}></div>
                    </div>
                </ScrollArea>

                <div className="border-t p-4 shrink-0">
                    <form
                        onSubmit={(e) => {
                            e.preventDefault()
                            handleSendMessage()
                        }}
                        className="flex gap-2"
                    >
                        <Input
                            placeholder="Escribe un mensaje..."
                            value={inputValue}
                            onChange={(e) => handleInputValueChange(e.target.value)}
                            className="flex-1"
                        />
                        <Button type="submit" size="icon">
                            <Send className="h-4 w-4" />
                            <span className="sr-only">Enviar mensaje</span>
                        </Button>
                    </form>
                </div>
            </CardContent>
        </Card>
    )
}
