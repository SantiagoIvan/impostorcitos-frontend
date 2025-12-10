// components/LoadingOverlay.tsx
import { Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface LoadingOverlayProps {
    show: boolean;
    message?: string;
}

export default function LoadingOverlay({
                                           show,
                                           message = "Cargando..."
                                       }: LoadingOverlayProps) {
    return (
        <AnimatePresence>
            {show && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.4 }}
                    className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/50 backdrop-blur-sm"
                >
                    <Loader2 className="h-12 w-12 animate-spin text-white" />
                    <p className="mt-4 text-white text-lg">{message}</p>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
