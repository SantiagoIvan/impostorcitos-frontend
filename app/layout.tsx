import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import {ThemeProvider} from "@/components/ui/ThemeProvider"
import {ModeToggle} from "@/components/ModeToggle";
import {Toaster} from "@/components/ui/sonner";
import {LoadingProvider} from "@/context/LoadingContext";
import LoadingOverlay from "@/components/LoadingOverlay";
import {AudioProvider} from "@/context/AudioContext";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Impostorcitos",
  description: "Impostorcitos",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
      <html lang="en" suppressHydrationWarning>
      <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
      <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
      >
          <AudioProvider>
              <LoadingProvider>
                  {/* Overlay global (nunca se desmonta) */}
                  <LoadingOverlay />

                  <div className="floating-button">
                      <ModeToggle />
                  </div>

                  {children}
              </LoadingProvider>
          </AudioProvider>
      </ThemeProvider>

      <Toaster />
      </body>
      </html>
  );
}
