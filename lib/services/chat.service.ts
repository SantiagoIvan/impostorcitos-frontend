import Message from "@/app/types/Message";

const API_URL = process.env.NEXT_PUBLIC_API_URL;
const env = process.env.NEXT_PUBLIC_ENV;

const messages = [
    {
        id: 1,
        text: "¡Hola! ¿Cómo estás?",
        sender: "other",
        time: "10:30",
    },
    {
        id: 2,
        text: "Excelente, trabajando en el nuevo proyecto",
        sender: "random",
        time: "10:32",
    },
]

export async function getMessages(): Promise<Message[]> {
    if(env=="DEV"){
        await new Promise((resolve) => setTimeout(resolve, 300))
        return messages;
    }

    const res = await fetch(API_URL + "/messages", {
        method: "GET",
    });
    if (!res.ok) {
        throw new Error("Error fetching messages");
    }

    return res.json();
}
