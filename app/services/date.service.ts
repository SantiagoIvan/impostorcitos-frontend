export const DateService = {
    formatTime: (isoString: string) : string => {
        const date = new Date(isoString);
        return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    }
}
