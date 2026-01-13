const required = (value: string | undefined, name: string): string => {
    if (!value) {
        throw new Error(`Missing env var: ${name}`);
    }
    return value;
};
/*
API_URL: "https://api.impostorcitos.com/api",
WS_URL: "https://api.impostorcitos.com",

API_URL: process.env.NEXT_PUBLIC_BACKEND_API,
WS_URL: process.env.NEXT_PUBLIC_BACKEND_WS,

API_URL: "http://localhost:4000/api",
WS_URL: "http://localhost:4000",
 */

export const ENV = {
    API_URL: process.env.NEXT_PUBLIC_BACKEND_API,
    WS_URL: process.env.NEXT_PUBLIC_BACKEND_WS,
    MIN_PLAYERS_QTY: process.env.NEXT_PUBLIC_MIN_PLAYERS_QTY || 3,
    MAX_MESSAGE_LENGTH: process.env.NEXT_PUBLIC_MAX_MESSAGE_LENGTH || 80,
    CLEANUP_JOB_INTERVAL: process.env.NEXT_PUBLIC_CLEANUP_JOB_INTERVAL || 300000,
    MESSAGE_TTL: process.env.NEXT_PUBLIC_MESSAGE_TTL || 300000,
} as const;

