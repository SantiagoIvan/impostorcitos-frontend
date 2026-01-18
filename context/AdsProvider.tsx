"use client"

import { ReactNode } from "react"
import { AdSenseScript } from "@/components/AdSenseScript"

interface Props {
    children: ReactNode
}

export function AdsProvider({ children }: Props) {
    return (
        <>
            <AdSenseScript />
            {children}
        </>
    )
}
