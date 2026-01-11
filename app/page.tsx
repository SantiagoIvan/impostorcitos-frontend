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
import {useLoading} from "@/hooks/useLoading";
import LoadingOverlay from "@/components/LoadingOverlay";

export default function WelcomeScreen() {
    const {username, setUsername, clear, setUser} = useUserStore();
    const router = useRouter();
    const {loading, startLoading, stopLoading} = useLoading();

    const handleLogin = async () => {
        try{
            startLoading()
            if (username.trim() == "") {
                toast.error("Username is required");
                return
            }
            // pegarle al back
            const res = await AuthService.login(username);
            setUser(res.data.user)
            router.push("/game/lobby");

        }catch(err){
            stopLoading()
            console.log(err)
            // @ts-expect-error-para que no joda por el tipo del error
            toast.error(err.response.data.message);
            setUsername("");
        }
    }
    const handleEnter = async (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter") {
            await handleLogin();
        }
    }
    useEffect(() => {
        clear()
    }, []);

  return (
    <div className="flex min-h-screen flex-col justify-center items-center px-4 gap-8 sm:gap-10">
        {loading && <LoadingOverlay show={loading} />}
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold text-center">
            Impostorcitos
        </h1>

        <div className="mt-10 flex flex-col">
            <Label
                htmlFor="name"
                className="text-sm sm:text-base"
            >
                Ingrese un nombre
            </Label>
            <Input
                className="mt-4"
                id="name"
                value={username}
                onChange={(e) => {
                    setUsername(e.target.value.substring(0, 15))
                }}
                onKeyDown={handleEnter}
            />
            <Button className="mt-6 sm:mt-8 flex items-center justify-center gap-2" onClick={handleLogin}>
                Al lobby
                <ArrowRightIcon className="h-4 w-4"/>
            </Button>
        </div>
        <CafecitoBtn classname="mt-6 sm:mt-10"/>
    </div>
  );
}
