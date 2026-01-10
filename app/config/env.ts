const required = (value: string | undefined, name: string): string => {
    if (!value) {
        throw new Error(`Missing env var: ${name}`);
    }
    return value;
};

export const ENV = {
    API_URL: "http://localhost:4000/api",
    WS_URL: "http://localhost:4000",
    MIN_PLAYERS_QTY: 3,
    MAX_MESSAGE_LENGTH: 50,
    CLEANUP_JOB_INTERVAL: 20000,
    MESSAGE_TTL: 50000,
} as const;

