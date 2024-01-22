const apiOpenWeather = 'https://api.openweathermap.org/data/2.5/weather?q=';
const tokenApiOpenWeather = '253682c0bd759acfb4255d4aa08c3dd7'
const laravelApi = 'http://localhost:82';

async function recogerDatos() {

    console.log('antes de intentar')

    try {
        let respuesta = await fetch(apiOpenWeather + "donostia&appid=" + tokenApiOpenWeather + "&units=metric&lang=es", {
            method: "GET",
        });

        let data = await respuesta.json();
        console.log(data);

        // Llamar a enviarDatosALaravel con los datos obtenidos
        enviarDatosALaravel({
            nombre: data.name,
            temperatura: data.main.temp,
            humedad: data.main.humidity,
            viento: data.wind.speed,
            descripcion: data.weather[0].description,
            // Agrega otros campos según la estructura de tu modelo Laravel
        });

    } catch (error) {
        console.error(error);
    }
}

function enviarDatosALaravel(datos) {
    const urlLaravel = `${laravelApi}/api/datos-tiempo`;

    fetch(urlLaravel, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(datos),
    })
    .then(response => response.json())
    .then(responseData => {
        console.log(responseData);
    })
    .catch(error => console.error('Error:', error));
}