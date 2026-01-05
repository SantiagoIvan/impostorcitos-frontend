import {api} from "@/app/services/api";

export const AuthService = {
    login: async (username: string) => {
        return await api.post("/auth/login", {username});
    },
    logout: async (username: string) => {
        return await api.post("/auth/logout", {username});
    }
}