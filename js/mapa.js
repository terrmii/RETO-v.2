var map = L.map('map').setView([43.3224,-1.9850], 13);
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

// Crear un marcador con una etiqueta pop-up
var marker = L.marker([43.3224, -1.9850]).addTo(map);
marker.bindPopup("<b>Mi Marcador</b><br>Esta es una etiqueta pop-up.");

