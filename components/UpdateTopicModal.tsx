import {Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle} from "@/components/ui/dialog";
import {Button} from "@/components/ui/button";
import {useState} from "react";
import LoadingOverlay from "@/components/LoadingOverlay";
import {Label} from "@/components/ui/label";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import {topics} from "@/lib";
import {Checkbox} from "@/components/ui/checkbox";

export default function UpdateTopicModal(
    {open, setOpen, onSubmit}:
    {open: boolean,setOpen: (open: boolean) => void, onSubmit: (topic: string, randomFlag: boolean) => void}
) {
    const [loading, setLoading] = useState(false);
    const [newTopic, setNewTopic] = useState(topics[0] as string);
    const [randomFlag, setRandomFlag] = useState(false);

    const handleOnSubmit = async () => {
        try {
            setLoading(true)
            onSubmit(newTopic, randomFlag)
        }catch (e){
            console.error(e)
        }finally {
            setOpen(false)
            setLoading(false)
        }
    }

    const handleModalClose = () => {
        setOpen(false)
    }

    return (
        <>
            {loading && <LoadingOverlay show={loading} />}
            <Dialog open={open} onOpenChange={handleModalClose}>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Seleccione un nuevo topico</DialogTitle>
                    </DialogHeader>

                    {/* TOPIC + RANDOM */}
                    <div className="flex flex-col gap-4 item-form">
                        {/* TOPIC */}
                        <Label>Tópico</Label>
                        <div className="flex flex-row gap-4">
                            <div className="flex flex-col gap-2">
                                <Select
                                    value={newTopic}
                                    onValueChange={(value) => setNewTopic(value)}
                                    disabled={randomFlag}
                                >
                                    <SelectTrigger>
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
                            <div className="flex items-center gap-2 pb-1 ">
                                <Checkbox
                                    checked={randomFlag}
                                    onCheckedChange={(checked) =>
                                        setRandomFlag(Boolean(checked))
                                    }
                                />
                                <Label className="cursor-pointer">Random</Label>
                            </div>
                        </div>
                    </div>
                    <DialogFooter>
                        <DialogClose asChild>
                            <Button variant="outline">Cancel</Button>
                        </DialogClose>
                        <Button onClick={handleOnSubmit}>Confirmar</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    )
}