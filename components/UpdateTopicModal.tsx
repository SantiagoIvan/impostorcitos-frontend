import {Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle} from "@/components/ui/dialog";
import {Button} from "@/components/ui/button";
import {useState} from "react";
import LoadingOverlay from "@/components/LoadingOverlay";
import {Label} from "@/components/ui/label";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import {topics} from "@/lib";
import {Checkbox} from "@/components/ui/checkbox";
import {useLoading} from "@/context/LoadingContext";

export default function UpdateTopicModal(
    {open, setOpen, onSubmit}:
    {open: boolean,setOpen: (open: boolean) => void, onSubmit: (topic: string, randomFlag: boolean) => void}
) {
    const {startLoading,stopLoading} = useLoading()
    const [newTopic, setNewTopic] = useState(topics[0] as string);
    const [randomFlag, setRandomFlag] = useState(false);

    const handleOnSubmit = async () => {
        try {
            startLoading()
            onSubmit(newTopic, randomFlag)
        }catch (e){
            console.error(e)
        }finally {
            setOpen(false)
            stopLoading()
        }
    }

    const handleModalClose = () => {
        setOpen(false)
    }

    return (
        <>
            <Dialog open={open} onOpenChange={handleModalClose}>
                <DialogContent
                    className="
                      w-full
                      max-w-sm sm:max-w-md
                      px-4 sm:px-6
                      py-4 sm:py-6
                    "
                >
                    <DialogHeader>
                        <DialogTitle className="text-xl sm:text-lg md:text-xl">
                            Seleccioná un nuevo tópico
                        </DialogTitle>
                    </DialogHeader>

                    {/* TOPIC + RANDOM */}
                    <div className="flex flex-col gap-4">
                        <Label>Tópico</Label>

                        {/* Selector + Random */}
                        <div className="flex flex-col sm:flex-row gap-4">
                            {/* TOPIC */}
                            <div className="flex flex-col gap-2 flex-1">
                                <Select
                                    value={newTopic}
                                    onValueChange={(value) => setNewTopic(value)}
                                    disabled={randomFlag}
                                >
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="Seleccionar tópico" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {topics.map((topic) => (
                                            <SelectItem key={topic} value={topic}>
                                                {topic}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>

                            {/* RANDOM */}
                            <div className="flex items-center gap-2 sm:pt-6">
                                <Checkbox
                                    className="cursor-pointer"
                                    checked={randomFlag}
                                    onCheckedChange={(checked) =>
                                        setRandomFlag(Boolean(checked))
                                    }
                                />
                                <Label>Random</Label>
                            </div>
                        </div>
                    </div>

                    <DialogFooter className="mt-6 flex flex-col-reverse sm:flex-row gap-3">
                        <DialogClose asChild>
                            <Button variant="outline" className="w-full sm:w-auto">
                                Cancelar
                            </Button>
                        </DialogClose>

                        <Button
                            onClick={handleOnSubmit}
                            className="w-full sm:w-auto"
                        >
                            Confirmar
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

        </>
    )
}