"use client"

import {Button} from "@/components/ui/button";
import {ArrowRightIcon} from "lucide-react";
import {Input} from "@/components/ui/input";
import {Label} from "@/components/ui/label";
import {useUserStore} from "@/app/store/userStore";
import {useRouter} from "next/navigation";
import { toast } from "sonner"

export default function WelcomeScreen() {
    const {username, setUsername} = useUserStore();
    const router = useRouter();

    const continueToLobby = () => {
        if (username == "") {
            toast.error("Username is required");
        }else {
            router.push("/game/lobby");
        }
    }

  return (
    <div className="flex flex-col justify-center m-auto items-center h-screen">
        <h1 className="text-7xl">Impostorcitos</h1>
        <div className="mt-10 flex flex-col">
            <Label htmlFor="Impostorcitos">Ingrese un nombre</Label>
            <Input
                className="mt-4"
                id="name"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />
            <Button className="mt-10" onClick={continueToLobby}>
                Al lobby pete
                <ArrowRightIcon />
            </Button>
        </div>
    </div>
  );
}
