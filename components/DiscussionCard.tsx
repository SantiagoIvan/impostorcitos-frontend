import {Card, CardHeader, CardTitle} from "@/components/ui/card";
import {TimerDisplay} from "@/components/TimerDisplay";
import {useGameStore} from "@/app/store/gameStore";
import AnimatedFadeScaleComponent from "@/components/AnimatedFadeScaleComponent";

export function DiscussionCard({onTimeOut}: { onTimeOut: () => void}) {
    const {game, currentTurn } = useGameStore();

    const handleOnTimeOut = () => {
        onTimeOut()
    }

    return (
        <AnimatedFadeScaleComponent>
            <h1 className="text-2xl font-semibold text-center mb-3">Discusion</h1>
            <TimerDisplay
                startedAt={currentTurn.startedAt}
                duration={currentTurn.duration}
                onTimeOut={handleOnTimeOut}
            />
            <Card className="w-full max-w-xl mx-auto shadow-md">
                <CardHeader>
                    <CardTitle className="text-center text-2xl font-semibold">
                        Discutan para decidir a quien echar
                    </CardTitle>
                </CardHeader>
            </Card>
        </AnimatedFadeScaleComponent>
    )
}