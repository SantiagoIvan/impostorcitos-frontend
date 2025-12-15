import {AnimatePresence, motion } from "framer-motion"

export default function AnimatedFadeScaleComponent({children} : {children: React.ReactNode}) {
    return (
        <AnimatePresence mode="wait">
            <motion.div
                key="turn-input-card"
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.85 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
                className="w-full max-w-sm mx-auto"
            >
                {children}
        </motion.div>
        </AnimatePresence>
    )
}