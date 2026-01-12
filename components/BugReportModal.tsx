import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import {useState} from "react";
import {toast} from "sonner";
import {useLoading} from "@/context/LoadingContext";
import {BugReporteService} from "@/app/services/bugReport.service";

interface BugReportModalProps {
    open: boolean
    onOpenChange: (open: boolean) => void
}

function BugReportModal({ open, onOpenChange }: BugReportModalProps) {
    const [report, setReport] = useState<string>("")
    const {startLoading, stopLoading} = useLoading()

    const handleSendReport = async () => {
        try{
            startLoading()
            await BugReporteService.sendReport(report)
            toast.success("Bug report sent successfully")
        }catch(err){
            console.error(err)
            toast.error("Error al cargar bug")
        }finally {
            stopLoading()
            onOpenChange(false)
            setReport("")
        }
    }

    const handleEnter = async (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if(e.key === "Enter"){
            await handleSendReport()
        }
    }
    
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>Reportar un bug</DialogTitle>
                </DialogHeader>

                <Textarea
                    placeholder="Describí el problema con el mayor detalle posible..."
                    className="min-h-[120px]"
                    value={report}
                    onChange={(e) => setReport(e.target.value.substring(0,250))}
                    onKeyDown={handleEnter}
                />

                <DialogFooter>
                    <Button variant="outline" onClick={() => onOpenChange(false)}>
                        Cancelar
                    </Button>
                    <Button onChange={handleSendReport}>Enviar</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
export default BugReportModal
