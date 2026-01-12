import { Bug } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"

interface BugReportButtonProps {
    onClick: () => void
}

function BugReportButton({ onClick }: BugReportButtonProps) {
    return (
        <div className="fixed top-4 right-4 z-50">
            <Tooltip>
                <TooltipTrigger asChild>
                    <Button
                        size="icon"
                        variant="destructive"
                        onClick={onClick}
                        className="h-12 w-12 rounded-full shadow-lg cursor-pointer"
                        aria-label="Reportar un bug"
                    >
                        <Bug className="h-5 w-5" />
                    </Button>
                </TooltipTrigger>
                <TooltipContent>Reportar bug</TooltipContent>
            </Tooltip>
        </div>
    )
}
export default BugReportButton