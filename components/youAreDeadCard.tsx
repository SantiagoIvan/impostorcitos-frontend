import {Card, CardHeader, CardTitle} from "@/components/ui/card";

export default function YouAreDeadCard() {
    return (
        <Card className="w-full max-w-xl mx-auto shadow-md">
            <CardHeader>
                <CardTitle className="text-center text-2xl font-semibold text-red-900">
                    Estas muerto
                </CardTitle>
            </CardHeader>
        </Card>
    )
}