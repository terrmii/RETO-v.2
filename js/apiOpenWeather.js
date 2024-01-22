const apiOpenWeather = 'https://api.openweathermap.org/data/2.5/weather?q=';
const tokenApiOpenWeather = '253682c0bd759acfb4255d4aa08c3dd7'
const laravelApiTiempo = 'http://localhost:82';

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
        });

    } catch (error) {
        console.error(error);
    }
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
