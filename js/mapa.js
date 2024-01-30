// Mapa
var map = L.map('map').setView([43.1924,-2.0850], 10);
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);


var nombresUbicaciones = []; // Variable para almacenar los nombres de ubicaciones

// Zonas
let cantabrianMountains = [];
let coastZone = [];
let donostialdea = [];
let ebroValley = [];
let greatBilbao = [];
let interiorBasins = [];
let pyrenees = [];
let southernMountain = [];
let vitoriaGasteiz = [];

var ubicacionesGuardadas;

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
      var guardados;

      // Eliminar eventos de clic existentes antes de agregar nuevos
      map.off('click', 'markerClick');

      // Recoger ubicaciones guardadas del Local Storage
      guardados = localStorage.getItem('guardados');
      ubicacionesGuardadas = guardados ? guardados.split(',') : [];

      data.ubicaciones.forEach(ubicacion => {
          // Crear marcador en el mapa
          var marker = L.marker([ubicacion.latitud, ubicacion.longitud]).addTo(map);
          marker.bindTooltip("<b>" + ubicacion.nombre + "</b><br>", {
              direction: 'top',
              offset: L.point(-15, -20)
          });

          // Agregar el nombre a la variable nombresUbicaciones
          nombresUbicaciones.push(ubicacion.nombre);

          // Verificar si la ubicación está guardada y agregar la clase
          if (ubicacionesGuardadas.includes(ubicacion.nombre)) {
              marker.getElement().classList.add('guardado');
          }

          // Agregar el evento de clic
          marker.on('click', function () {
              // Cambiar color
              if (marker.getElement().classList.contains('guardado')) {
                  marker.getElement().classList.remove('guardado');
                  // Eliminar la ubicación del arreglo de guardados
                  ubicacionesGuardadas = ubicacionesGuardadas.filter(nombre => nombre !== ubicacion.nombre);
              } else {
                  marker.getElement().classList.add('guardado');
                  // Agregar la ubicación al arreglo de guardados
                  ubicacionesGuardadas.push(ubicacion.nombre);
              }

              // Actualizar el localStorage
              localStorage.setItem('guardados', ubicacionesGuardadas.join(','));

          });
      });

  } catch (error) {
      // Manejar el error adecuadamente
  }
}

crearBalizas().then(() => {
  setTimeout(() => {
      console.log('Nombres de ubicaciones:', nombresUbicaciones);
  }, 2000);
});




























// PRUEBAS



const tokenEuskalmet = 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOiJtZXQwMS5hcGlrZXkiLCJpc3MiOiJJRVMgUExBSUFVTkRJIEJISSBJUlVOIiwiZXhwIjoyMjM4MTMxMDAyLCJ2ZXJzaW9uIjoiMS4wLjAiLCJpYXQiOjE2Mzk3NDc5MDcsImVtYWlsIjoiaWtiY3lAcGxhaWF1bmRpLm5ldCJ9.fXOiD4Q8EOwsHOow7UarFr99JLaFBJI4-5vdOPNmMevEo6_O6Iz26IceK9Ak0OzRvZ-BuGbYuH7PGfwEynMABv6OS-jav_KBEVbpVx4c78zzEXrt0OmLqILHKiR-wiunqt4z8lhsesjo92O1jmUrmxPOLeb5n8Y4maXW3x8u00CkkA_OIF9I7LlgiMMIiuhDgv7E2fRtdBzWg4sPqe6DindIpgb4ebWB1a297k_OiOSpkDC3y5fcD4bzOGVvLI0FTTwomrQXXxgHINAxG2AjUHeIi9_XwLea5oQy2UIUOyHhl7q3nJ4WEpnp0n33jh8GVmTcujYyHHMXb55We2xfjg';

async function regionesEuskalmet() {
  try {
    const respuesta = await fetch('https://api.euskadi.eus/euskalmet/geo/regions/basque_country/zones/', {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer ' + tokenEuskalmet
      },
    });

    const data = await respuesta.json();

    // Verificar si la respuesta tiene el formato esperado
    if (Array.isArray(data) && data.length > 0 && data[0].hasOwnProperty('regionZoneId')) {
      // Extraer los valores de regionZoneId y almacenarlos en un array
      const regionZoneIds = data.map(obj => obj.regionZoneId);

      // Imprimir el array resultante
      console.log(regionZoneIds);
    } else {
      console.log('La respuesta de la API no tiene el formato esperado.');
    }
  } catch (error) {
    console.log('Error al ver los datos:', error);
  }
}


// Llamar a la función
// regionesEuskalmet();

async function obtenerDatosPorZona() {
  
    // Lista de zonas
    const zonas = [
      'cantabrian_mountains',
      'cantabrian_valleys',
      'coast_zone',
      'donostialdea',
      'ebro_valley',
      'great_bilbao',
      'interior_basins',
      'pyrenees',
      'southern_mountain',
      'vitoria_gasteiz'
    ];
  
    // Objeto para almacenar las respuestas por zona
    const respuestasPorZona = {};
  
    // Realizar llamadas para cada zona
    for (const zona of zonas) {
      try {
        const respuesta = await fetch(`https://api.euskadi.eus/euskalmet/geo/regions/basque_country/zones/${zona}/locations`, {
          method: 'GET',
          headers: {
            'Authorization': 'Bearer ' + tokenEuskalmet
          },
        });
  
        const data = await respuesta.json();
  
        // Guardar la respuesta en el objeto con la clave como "regionZoneLocationId"
        respuestasPorZona[zona] = data;

        let i = 0;
        for(var infor of data){
            for(var nombres of nombresUbicaciones){

                if(infor["regionZoneLocationId"] == nombres){
                    console.log('si');
                }else{
                    console.log('no');
                }
            }
                
            console.log(`Datos para la zona ${zona}:`, infor["regionZoneLocationId"]);
            console.log(nombres);
        }
        
        console.log(`Datos para la zona ${zona}:`, data[0]["regionZoneLocationId"]);
      } catch (error) {
        console.log(`Error al obtener datos para la zona ${zona}:`, error);
      }
    }
  
    // Imprimir el objeto con todas las respuestas
    console.log('Respuestas por zona:', respuestasPorZona);
  }
  
  // Llamar a la función
  
    // setTimeout(() => {
    //     obtenerDatosPorZona();
    // }, 4010); 

