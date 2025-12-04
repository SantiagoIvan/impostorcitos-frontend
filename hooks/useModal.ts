// hooks/useConfirm.ts
import { useState } from "react";

export function useConfirmationModal() {
    const [isOpen, setIsOpen] = useState(false);
    const [onConfirm, setOnConfirm] = useState<(() => void) | null>(null);

    const handleOpen = (callback: () => void) => {
        setOnConfirm(() => callback);
        setIsOpen(true);
    };

    const confirm = () => {
        if (onConfirm) onConfirm();
        setIsOpen(false);
    };

    const cancel = () => {
        setIsOpen(false);
        setOnConfirm(null);
    };

    return { isOpen, handleOpen, confirm, cancel };
}
