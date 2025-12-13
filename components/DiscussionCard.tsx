import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {TimerDisplay} from "@/components/TimerDisplay";
import {useGameStore} from "@/app/store/gameStore";

export function DiscussionCard({onTimeOut}: { onTimeOut: () => void}) {
    const { game } = useGameStore();

    // ontimeout emitir evento
    const handleOnTimeOut = () => {
        console.log("discussion time out")
        onTimeOut()
    }

    return (
        <>
            <TimerDisplay
                initialSeconds={game.room.discussionTime}
                onTimeOut={handleOnTimeOut}
            />
            <Card className="w-full max-w-xl mx-auto shadow-md">
                <CardHeader>
                    <CardTitle className="text-center text-2xl font-semibold">
                        Momento para discutir a quien echamos
                    </CardTitle>
                </CardHeader>

                <CardContent className="text-center text-muted-foreground">
                    Conversen entre ustedes y decidan a quién quieren expulsar.
                </CardContent>
            </Card>
        </>
    )
}