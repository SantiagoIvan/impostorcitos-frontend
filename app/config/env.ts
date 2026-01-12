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
    API_URL: "https://api.impostorcitos.com/api",//process.env.NEXT_PUBLIC_BACKEND_API,
    WS_URL: "https://api.impostorcitos.com", //process.env.NEXT_PUBLIC_BACKEND_WS,
    MIN_PLAYERS_QTY: process.env.NEXT_PUBLIC_MIN_PLAYERS_QTY,
    MAX_MESSAGE_LENGTH: process.env.MAX_MESSAGE_LENGTH,
    CLEANUP_JOB_INTERVAL: process.env.CLEANUP_JOB_INTERVAL,
    MESSAGE_TTL: process.env.MESSAGE_TTL,
} as const;

