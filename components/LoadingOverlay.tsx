"use client"
// components/LoadingOverlay.tsx
import { Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import {useLoading} from "@/context/LoadingContext";

interface LoadingOverlayProps {
    message?: string;
}

export default function LoadingOverlay({
                                           message = "Cargando..."
                                       }: LoadingOverlayProps) {
    const {loading} = useLoading()

    if(!loading) return null
    return (
        <AnimatePresence>
            {loading && (
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                    className="fixed inset-0 z-55 flex flex-col items-center justify-center bg-black/50 backdrop-blur-sm"
                >
                    <Loader2 className="h-12 w-12 animate-spin text-white" />
                    <p className="mt-4 text-white text-lg">{message}</p>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
