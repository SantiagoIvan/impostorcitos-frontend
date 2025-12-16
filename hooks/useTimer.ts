import { useEffect, useState } from 'react';

export function useTimer(endTime: number) {
    const [timeLeftMs, setTimeLeftMs] = useState<number>(() =>
        Math.max(0, endTime - Date.now())
    );

    useEffect(() => {
        const update = () => {
            const remaining = Math.max(0, endTime - Date.now());
            setTimeLeftMs(remaining);
        };

        update()
        const interval = setInterval(update, 100);

        return () => clearInterval(interval);
    }, [endTime]); // 👈 clave: depende del timestamp

    return {
        timeLeftMs,
        seconds: Math.ceil(timeLeftMs / 1000),
        isFinished: timeLeftMs <= 0
    };
}