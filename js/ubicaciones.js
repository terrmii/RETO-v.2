var horaVer = document.getElementById('hora');

function obtenerHora() {
    var ahora = new Date();

    var horas = ahora.getHours();
    var minutos = ahora.getMinutes();

    // Formato de 24 horas
    horas = horas < 10 ? '0' + horas : horas;
    minutos = minutos < 10 ? '0' + minutos : minutos;

    var horaFormato24 = horas + ':' + minutos;

    horaVer.innerHTML = horaFormato24;
}

// Actualizar la hora cada 15 segundos
setInterval(obtenerHora, 15000);

obtenerHora();

function obtenerFecha() {
    var ahora = new Date();

    var dia = ahora.getDate();
    var mes = ahora.getMonth() + 1; // ¡Recuerda que los meses comienzan desde 0!
    var anio = ahora.getFullYear();

    // Formato de fecha dd.mm.yyyy
    var fechaFormato = `${dia < 10 ? '0' + dia : dia}.${mes < 10 ? '0' + mes : mes}.${anio}`;

    // Insertar la fecha en el elemento con la clase "col"
    document.getElementById('fecha').innerHTML = fechaFormato;
}

// Llamar a la función para obtener y mostrar la fecha actual
obtenerFecha();