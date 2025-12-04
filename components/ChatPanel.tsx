"use client"

import {useEffect, useState} from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Send } from "lucide-react"
import {useUserStore} from "@/app/store/userStore";
import {CreateMessageDto, MessageEvents} from "@/shared"
import {useSocket} from "@/hooks/useSocket";
import {useMessagesStore} from "@/app/store/messageStore";
import {useMessagesSocket} from "@/hooks/useMessagesSocket";
import {DateService} from "@/app/services/date.service";


export function ChatPanel() {
    const {username} = useUserStore()
    const {socket} = useSocket();
    const {messages} = useMessagesStore()
    const [inputValue, setInputValue] = useState("")
    useMessagesSocket()

    const handleSendMessage = () => {
        if (inputValue.trim()) {
            const newMessage: CreateMessageDto = {
                // proximamente esto tendria el room id seteado en el chatpanel, asi puedo reutilizarlo.
                text: inputValue,
                sender: username,
                createdAt: new Date().toLocaleTimeString("es-ES", {
                    hour: "2-digit",
                    minute: "2-digit",
                }),
            }
            socket.emit(MessageEvents.CREATE, newMessage)
            setInputValue("")
        }
    }

    return (
        <Card className="flex h-full flex-col">
            <CardHeader className="border-b border-border">
                <div className="flex items-center gap-3">
                    <Avatar>
                        <AvatarImage src="/placeholder.svg?height=40&width=40" />
                        <AvatarFallback className="bg-primary text-primary-foreground">Me</AvatarFallback>
                    </Avatar>
                    <div>
                        <CardTitle className="text-lg">Chat general</CardTitle>
                        {/*<p className="text-sm text-muted-foreground">En línea</p> ESTO SE VA A SACAR DEL ESTADO DEL USUARIO*/}
                    </div>
                </div>
            </CardHeader>

            <CardContent className="flex flex-1 flex-col p-0">
                <ScrollArea className="flex-1 p-4">
                    <div className="flex flex-col gap-4">
                        {messages.map((message) => (
                            <div key={message.id} className={`flex ${message.sender == username ? "justify-end" : "justify-start"}`}>
                                <div
                                    className={`max-w-[75%] rounded-lg px-4 py-2 ${
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
                    </div>
                </ScrollArea>

                <div className="border-t border-border p-4">
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
                            onChange={(e) => setInputValue(e.target.value)}
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
