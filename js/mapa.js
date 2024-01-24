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

            // Obtener la previsión del tiempo para la ubicación
            const previsionResponse = await fetch(`https://api.euskalmet.euskadi.eus/weatherapi/v1/forecast?lat=${ubicacion.latitud}&lon=${ubicacion.longitud}`);
            const previsionData = await previsionResponse.json();

            // Trabajar con la previsión del tiempo (aquí solo logueo para ejemplo)
            console.log(`Previsión para ${ubicacion.nombre}:`, previsionData);
        });
    } catch (error) {
        console.error('Error al obtener datos:', error);
    }
}


