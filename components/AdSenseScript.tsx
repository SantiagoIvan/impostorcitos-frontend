"use client"

import Script from "next/script"

export function AdSenseScript() {
    return (
        <Script
            async
            strategy="afterInteractive"
            src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4481887372195143"
            crossOrigin="anonymous"
        />
    )
}
