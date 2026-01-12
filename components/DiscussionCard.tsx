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
            <div className="flex flex-col items-center gap-4 sm:gap-5 md:gap-6 px-4">
                <h1 className="text-3xl sm:text-2xl md:text-3xl font-semibold text-center">
                    Discusión
                </h1>

                <TimerDisplay
                    startedAt={game.currentTurn.startedAt}
                    duration={game.currentTurn.duration}
                    onTimeOut={handleSubmit}
                />

                <Card className="w-full max-w-sm sm:max-w-md md:max-w-xl mx-auto shadow-md">
                    <CardHeader className="py-4 sm:py-5 md:py-6">
                        <CardTitle className="text-center font-semibold text-xl sm:text-lg md:text-2xl">
                            Discutan para decidir a quién echar
                        </CardTitle>
                    </CardHeader>

                    <CardContent className="pt-2">
                        <Button
                            className="w-full py-3 sm:py-2 text-base sm:text-sm md:text-base"
                            onClick={handleSubmit}
                            disabled={game.currentTurn.duration === 0 || skip}
                        >
                            Votemos
                        </Button>
                    </CardContent>
                </Card>
            </div>
        </AnimatedFadeScaleComponent>

    )
}