"use client"

import { useEffect } from "react"

interface Props {
    slot: string
}

export function AdBanner({ slot }: Props) {
    useEffect(() => {
        try {
            // @ts-ignore
            (window.adsbygoogle = window.adsbygoogle || []).push({})
        } catch {}
    }, [])

    return (
        <ins
            className="adsbygoogle block"
            data-ad-client="ca-pub-4481887372195143"
            data-ad-slot={slot}
            data-ad-format="auto"
            data-full-width-responsive="true"
        />
    )
}
