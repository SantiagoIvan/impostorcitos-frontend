"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Search, Circle } from "lucide-react"

interface Item {
    id: number
    name: string
    password?: string
    privacy: "public" | "private"
    createdAt: string
}

export function RoomsPanel() {
    const [searchQuery, setSearchQuery] = useState("")
    const [items] = useState<Item[]>([
        {
            id: 1,
            name: "Room Alpha",
            privacy: "public",
            createdAt: "Hace 2 horas",
        },
        {
            id: 2,
            name: "Room Beta",
            privacy: "public",
            createdAt: "Hace 5 horas",
        },
        {
            id: 3,
            name: "Room Gamma",
            password: "123",
            privacy: "private",
            createdAt: "Hace 1 día",
        },
        {
            id: 4,
            name: "Room Delta",
            privacy: "public",
            createdAt: "Hace 3 días",
        },
        {
            id: 5,
            name: "Room Epsilon",
            privacy: "public",
            createdAt: "Hace 6 horas",
        },
        {
            id: 6,
            name: "Room Zeta",
            password: "asd",
            privacy: "private",
            createdAt: "Hace 2 días",
        },
    ])

    const filteredItems = items.filter(
        (item) =>
            item.name.toLowerCase().includes(searchQuery.toLowerCase())
    )

    const getPrivacyColor = (privacy: string) => {
        switch (privacy) {
            case "public":
                return "bg-green-500/10 text-green-600 dark:text-green-400 hover:bg-green-500/20"
            case "private":
                return "bg-rose-500/10 text-rose-600 dark:text-rose-400 hover:bg-rose-500/20"
            default:
                return "bg-muted text-muted-foreground"
        }
    }

    const getPrivacyDotColor = (privacy: string) => {
        switch (privacy) {
            case "public":
                return "text-green-500"
            case "private":
                return "text-rose-500"
            default:
                return "text-muted-foreground"
        }
    }

    return (
        <Card className="flex h-full flex-col cursor-pointer">
            <CardHeader className="border-b border-border">
                <CardTitle className="text-lg">Salas disponibles</CardTitle>
                <div className="relative mt-4">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                        placeholder="Buscar salas..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-9"
                    />
                </div>
            </CardHeader>

            <CardContent className="flex-1 p-0">
                <ScrollArea className="h-full">
                    <div className="divide-y divide-border">
                        {filteredItems.map((item) => (
                            <div key={item.id} className="flex items-start gap-3 p-4 transition-colors hover:bg-muted/50">
                                <Circle className={`mt-1 h-2 w-2 fill-current ${getPrivacyDotColor(item.privacy)}`} />
                                <div className="flex-1 space-y-1">
                                    <div className="flex items-center justify-between gap-2">
                                        <h3 className="font-medium leading-none">{item.name}</h3>
                                        <Badge variant="secondary" className={getPrivacyColor(item.privacy)}>
                                            {item.privacy}
                                        </Badge>
                                    </div>
                                    <p className="text-xs text-muted-foreground">{item.createdAt}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </ScrollArea>
            </CardContent>
        </Card>
    )
}
