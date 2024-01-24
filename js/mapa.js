// Mapa
var map = L.map('map').setView([43.1924,-2.0850], 10);
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);


async function crearBalizas() {
    try {
        const response = await fetch(`${laravelApi}/api/obtener-ubicaciones`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json; charset=UTF-8',
                'X-Requested-With': 'XMLHttpRequest'
            },
        });

        const data = await response.json();

        // Por ejemplo, puedes recorrer los datos y mostrarlos en la consola
        data.ubicaciones.forEach(async ubicacion => {


            // Crear marcador en el mapa
            var marker = L.marker([ubicacion.latitud, ubicacion.longitud]).addTo(map);
            marker.bindTooltip("<b>"+ubicacion.nombre+"</b><br>",{
                direction : 'top',
                offset: L.point(-15, -20)
            });

        });
    } catch (error) {
        console.error('Error al obtener datos:', error);
    }
}

async function pruebaEuskalmet(){

    const tokenEuskalmet = 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOiJtZXQwMS5hcGlrZXkiLCJpc3MiOiJJRVMgUExBSUFVTkRJIEJISSBJUlVOIiwiZXhwIjoyMjM4MTMxMDAyLCJ2ZXJzaW9uIjoiMS4wLjAiLCJpYXQiOjE2Mzk3NDc5MDcsImVtYWlsIjoiaWtiY3lAcGxhaWF1bmRpLm5ldCJ9.fXOiD4Q8EOwsHOow7UarFr99JLaFBJI4-5vdOPNmMevEo6_O6Iz26IceK9Ak0OzRvZ-BuGbYuH7PGfwEynMABv6OS-jav_KBEVbpVx4c78zzEXrt0OmLqILHKiR-wiunqt4z8lhsesjo92O1jmUrmxPOLeb5n8Y4maXW3x8u00CkkA_OIF9I7LlgiMMIiuhDgv7E2fRtdBzWg4sPqe6DindIpgb4ebWB1a297k_OiOSpkDC3y5fcD4bzOGVvLI0FTTwomrQXXxgHINAxG2AjUHeIi9_XwLea5oQy2UIUOyHhl7q3nJ4WEpnp0n33jh8GVmTcujYyHHMXb55We2xfjg';

    try {
        const respuesta = await fetch('https://api.euskadi.eus/euskalmet/weather/regions/basque_country/zones/coast_zone/locations/irun/forecast/at/2023/12/18/for/20231219',{
            method: 'GET',
            headers: {
                'Authorization': 'Bearer '+tokenEuskalmet
            },
        });

        const data = await respuesta.json();

        console.log(data);

    } catch (error) {
        console.log('Error al ver los datos:', error)
    }

}
