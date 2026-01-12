import { Card, CardContent } from "./ui/card"
import {HardHat, Skull} from "lucide-react";

const CrewOrImpostorCard = ({amIImpostor, secretWord}: {amIImpostor: () => boolean, secretWord?: string}) => {
    return (
        <Card
            className={`mt-4 mx-auto w-1/2 ${amIImpostor()? "border-destructive/50 bg-destructive/10 " : "border-green-500/40 bg-green-500/10"}`}
        >
            <CardContent
                className="
                      flex items-center justify-center
                      gap-2 sm:gap-3
                      py-3 sm:py-4
                      px-4 sm:px-6
                "
            >
                {amIImpostor()? (
                    <>
                        <Skull className="h-10 w-10 sm:h-10 sm:w-10 md:h-12 md:w-12 text-destructive" />
                        <span className="font-semibold text-destructive text-2xl sm:text-lg md:text-xl">
                          IMPOSTOR
                        </span>
                    </>
                ) : (
                    <>
                        <HardHat className="h-12 w-12 text-green-600" />
                        <span className="text-xl font-semibold text-green-700">
                            {secretWord}
                        </span>
                    </>
                )}
            </CardContent>
        </Card>
    )
}

export default CrewOrImpostorCard