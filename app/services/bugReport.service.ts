import {api} from "@/app/services/api";


export const BugReporteService = {
    sendReport: async (report: string) => {
        return await api.post("/report", {report});
    },
}