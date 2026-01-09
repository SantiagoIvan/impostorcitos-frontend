"use client"

import {Button} from "@/components/ui/button";
import {ArrowRightIcon} from "lucide-react";
import {Input} from "@/components/ui/input";
import {Label} from "@/components/ui/label";
import {useUserStore} from "@/app/store/userStore";
import {useRouter} from "next/navigation";
import { toast } from "sonner"
import {useEffect} from "react";
import {AuthService} from "@/app/services/auth.service";
import CafecitoBtn from "@/components/CafecitoBtn";

export default function WelcomeScreen() {
    const {username, setUsername, clear, setUser} = useUserStore();
    const router = useRouter();

    const handleLogin = async () => {
        try{
            if (username.trim() == "") {
                toast.error("Username is required");
                return
            }
            // pegarle al back
            const res = await AuthService.login(username);
            console.log(res);
            setUser(res.data.user)
            router.push("/game/lobby");

        }catch(err){
            console.log(err)
            // @ts-expect-error-para que no joda por el tipo del error
            toast.error(err.response.data.message);
            setUsername("");
        }
    }
    const handleEnter = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter") {
            handleLogin();
        }
    }
    useEffect(() => {
        clear()
    }, []);

  return (
    <div className="flex flex-col gap-10 justify-center m-auto items-center h-screen">
        <h1 className="text-7xl">Impostorcitos</h1>
        <div className="mt-10 flex flex-col">
            <Label htmlFor="Impostorcitos">Ingrese un nombre</Label>
            <Input
                className="mt-4"
                id="name"
                value={username}
                onChange={(e) => {
                    setUsername(e.target.value.substring(0, 15).toLowerCase())
                }}
                onKeyDown={handleEnter}
            />
            <Button className="mt-10" onClick={handleLogin}>
                Al lobby pete
                <ArrowRightIcon />
            </Button>
        </div>
        <CafecitoBtn />
    </div>
  );
}
