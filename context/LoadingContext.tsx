"use client"

import {
    createContext,
    useCallback,
    useContext,
    useMemo,
    useState,
    ReactNode,
} from "react";

type LoadingContextType = {
    loading: boolean;
    startLoading: () => void;
    stopLoading: () => void;
};

const LoadingContext = createContext<LoadingContextType | null>(null);

export const LoadingProvider = ({ children }: { children: ReactNode }) => {
    const [count, setCount] = useState(0);

    const startLoading = useCallback(() => {
        setCount((c) => c + 1);
    }, []);

    const stopLoading = useCallback(() => {
        setCount((c) => Math.max(0, c - 1));
    }, []);


    const value = useMemo(
        () => ({
            loading: count > 0,
            startLoading,
            stopLoading,
        }),
        [count, startLoading, stopLoading]
    );

    return (
        <LoadingContext.Provider value={value}>
            {children}
        </LoadingContext.Provider>
    );
};

export const useLoading = () => {
    const context = useContext(LoadingContext);
    if (!context) {
        throw new Error(
            "useLoading must be used within a LoadingProvider"
        );
    }
    return context;
};
