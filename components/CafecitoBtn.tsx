import { Button } from "@/components/ui/button"

export default function CafecitoBtn() {
    return (
        <Button
            variant="outline"
            className="
                px-6 py-3
                text-base
                border-2
              border-[#4e342e]
              bg-[#efebe9]
              hover:bg-[#e0d6d1]
                transition-colors
            "
            asChild
            >
            <a
            href="https://cafecito.app/nucadelchiquitapia"
            target="_blank"
            rel="noopener noreferrer"
                >
            ☕ Invitame un cafecito
            </a>
        </Button>
    )
}