import {api} from "@/app/services/api";
const WS_URL = process.env.NEXT_PUBLIC_BACKEND_WS;
const API_URL = process.env.NEXT_PUBLIC_BACKEND_API;

export const AuthService = {
    login: async (username: string) => {
        console.log("login", WS_URL, API_URL)
        return await api.post("/auth/login", {username});
    },
    logout: async (username: string) => {
        return await api.post("/auth/logout", {username});
    }
}