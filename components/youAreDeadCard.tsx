import {Card, CardHeader, CardTitle} from "@/components/ui/card";

export default function YouAreDeadCard() {
    return (
        <Card className="w-full max-w-sm sm:max-w-md md:max-w-xl mx-auto shadow-md">
            <CardHeader className="py-4 sm:py-6 md:py-8">
                <CardTitle
                    className="
                        text-center
                        font-semibold
                        text-red-900
                        text-3xl sm:text-2xl md:text-3xl
                      "
                >
                    Estás muerto
                </CardTitle>
            </CardHeader>
        </Card>


    )
}