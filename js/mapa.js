var map = L.map('map').setView([43.3224,-1.9850], 9);
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

// MARCADORES

// San Sebastian
var marker = L.marker([43.3224, -1.9850]).addTo(map);
marker.bindTooltip("<b>San Sebastian</b><br>Esta es una etiqueta pop-up.",{
    direction : 'top',
    offset: L.point(-15, -20)
});

// Bilbao
var marker = L.marker([43.2642,-2.9333]).addTo(map);
marker.bindTooltip("<b>Bilbao</b><br>Esta es una etiqueta pop-up.",{
    direction : 'top',
    offset: L.point(-15, -20)
});

// Eibar
var marker = L.marker([43.1842,-2.4706]).addTo(map);
marker.bindTooltip("<b>Bilbao</b><br>Esta es una etiqueta pop-up.",{
    direction : 'top',
    offset: L.point(-15, -20)
});

