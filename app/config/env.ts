const required = (value: string | undefined, name: string): string => {
    if (!value) {
        throw new Error(`Missing env var: ${name}`);
    }
    return value;
};

export const ENV = {
    API_URL: required(
        process.env.NEXT_PUBLIC_BACKEND_API,
        "NEXT_PUBLIC_API_URL"
    ),
    WS_URL: required(process.env.NEXT_PUBLIC_BACKEND_WS, "NEXT_PUBLIC_WS_URL"),
    MIN_PLAYERS_QTY: parseInt(required(process.env.NEXT_PUBLIC_MIN_PLAYERS_QTY, "NEXT_PUBLIC_MIN_PLAYERS_QTY")),
    MAX_MESSAGE_LENGTH: parseInt(required(process.env.NEXT_PUBLIC_MAX_MESSAGE_LENGTH, "NEXT_PUBLIC_MAX_MESSAGE_LENGTH")),
    CLEANUP_JOB_INTERVAL: parseInt(required(process.env.NEXT_PUBLIC_CLEANUP_JOB_INTERVAL, "NEXT_PUBLIC_CLEANUP_JOB_INTERVAL")),
    MESSAGE_TTL: parseInt(required(process.env.NEXT_PUBLIC_MESSAGE_TTL, "NEXT_PUBLIC_MESSAGE_TTL")),
} as const;

