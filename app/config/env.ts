const required = (value: string | undefined, name: string): string => {
    if (!value) {
        throw new Error(`Missing env var: ${name}`);
    }
    return value;
};

export const ENV = {
    API_URL: process.env.NEXT_PUBLIC_BACKEND_API, // "http://api.impostorcitos.com/api"
    WS_URL: process.env.NEXT_PUBLIC_BACKEND_WS, // "http://api.impostorcitos.com",
    MIN_PLAYERS_QTY: process.env.NEXT_PUBLIC_MIN_PLAYERS_QTY,
    MAX_MESSAGE_LENGTH: process.env.MAX_MESSAGE_LENGTH,
    CLEANUP_JOB_INTERVAL: process.env.CLEANUP_JOB_INTERVAL,
    MESSAGE_TTL: process.env.MESSAGE_TTL,
} as const;

