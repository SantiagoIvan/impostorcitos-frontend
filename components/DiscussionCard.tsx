import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {TimerDisplay} from "@/components/TimerDisplay";
import {useGameStore} from "@/app/store/gameStore";
import AnimatedFadeScaleComponent from "@/components/AnimatedFadeScaleComponent";
import {Button} from "@/components/ui/button";
import {useState} from "react";

export function DiscussionCard({onSubmit}: { onSubmit: () => void}) {
    const {game } = useGameStore();
    const [skip, setSkip] = useState(false);

    const handleSubmit = () => {
        setSkip(true);
        onSubmit()
    }

    return (
        <AnimatedFadeScaleComponent>
            <h1 className="text-2xl font-semibold text-center mb-3">Discusion</h1>
            <TimerDisplay
                startedAt={game.currentTurn.startedAt}
                duration={game.currentTurn.duration}
                onTimeOut={handleSubmit}
            />
            <Card className="w-full max-w-xl mx-auto shadow-md">
                <CardHeader>
                    <CardTitle className="text-center text-2xl font-semibold">
                        Discutan para decidir a quien echar
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <Button
                        className="w-full"
                        onClick={handleSubmit}
                        disabled={game.currentTurn.duration === 0 || skip}
                    >
                        Votemos
                    </Button>
                </CardContent>
            </Card>
        </AnimatedFadeScaleComponent>
    )
}