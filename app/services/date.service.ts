export const DateService = {
    formatTime: (isoString: string) : string => {
        const date = new Date(isoString);
        return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    }
    // aca voy a agregar otra funcion para que me diga "hace 2 horas" y eso
}
