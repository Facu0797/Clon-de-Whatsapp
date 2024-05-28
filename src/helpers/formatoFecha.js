export const formatearFecha = (fecha) => {
    const date = new Date(fecha);

    let hora = date.getHours(fecha);
    let minutos = date.getMinutes(fecha);
    let tiempo = `${hora}:${minutos}`;

    const option = {
        month: "long",
        day: "numeric"
    }

    const newDate = date.toLocaleDateString("fr-EU", option);

    return `${newDate} - ${tiempo}`;
}