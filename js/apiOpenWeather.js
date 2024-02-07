const apiOpenWeather = 'https://api.openweathermap.org/data/2.5/weather?q=';
const tokenApiOpenWeather = '253682c0bd759acfb4255d4aa08c3dd7'
const laravelApiTiempo = 'http://10.10.17.96:82';

var ciudades = ['donostia', 'irun', 'hondarribia', 'errenteria']

async function recogerDatos() {
    console.log('antes de intentar');

    for (const ciudad of ciudades) {
        
            try {
            // Obtener datos de la API externa
            let respuestaExterna = await fetch(apiOpenWeather + ciudad +"&appid=" + tokenApiOpenWeather + "&units=metric&lang=es", {
                method: "GET",
            });
            
            let datosExterna = await respuestaExterna.json();
            console.log('Datos externos:', datosExterna);
            
            // Enviar datos a Laravel
            enviarDatosALaravel({
                nombre: datosExterna.name,
                temperatura: datosExterna.main.temp,
                humedad: datosExterna.main.humidity,
                viento: datosExterna.wind.speed,
                descripcion: datosExterna.weather[0].description,
            });
            
            // Obtener datos de la API de Laravel
            let respuestaLaravel = await fetch(`${laravelApiTiempo}/api/datos-tiempo`, {
                method: "GET",
            });
            
            let datosLaravel = await respuestaLaravel.json();
            console.log('Datos de Laravel:', datosLaravel);
            
            // Mostrar los datos en tu página HTML
            mostrarDatosEnPagina(datosLaravel.datos_tiempo);
            
        } catch (error) {
            console.error(error);
        }
    }
}

function mostrarDatosEnPagina(datos) {
    // Aquí puedes manipular el DOM para mostrar los datos en tu página
    // Por ejemplo, puedes agregar los datos a una tabla HTML
    const tabla = document.getElementById('tablaDatos');
    tabla.innerHTML = ''; // Limpiar la tabla antes de agregar nuevos datos

    datos.forEach(dato => {
        const fila = tabla.insertRow();
        const celdaNombre = fila.insertCell(0);
        const celdaTemperatura = fila.insertCell(1);
        const celdaHumedad = fila.insertCell(2);
        const celdaViento = fila.insertCell(3);
        const celdaDescripcion = fila.insertCell(4);

        celdaNombre.textContent = dato.nombre;
        celdaTemperatura.textContent = dato.temperatura;
        celdaHumedad.textContent = dato.humedad;
        celdaViento.textContent = dato.viento;
        celdaDescripcion.textContent = dato.descripcion;
        // Agrega otras celdas según la estructura de tus datos
    });
}


async function enviarDatosALaravel(datos) {
    const urlLaravel = `${laravelApiTiempo}/api/datos-tiempo`;

    try {
        const response = await fetch(urlLaravel, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(datos),
        });

        const responseData = await response.json();
        console.log(responseData);
    } catch (error) {
        console.error('Error:', error);
    }
}
