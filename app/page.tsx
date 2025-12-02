import {Button} from "@/components/ui/button";
import Image from "next/image";
import {ArrowUpIcon} from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col justify-center m-auto items-center">
        <h1 className="text-7xl">Impostorcitos</h1>
        <Button className="mt-10">
            Gogogooooooo
            <ArrowUpIcon />
        </Button>
    </div>
  );
}
